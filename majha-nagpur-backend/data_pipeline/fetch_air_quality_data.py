import os
import json
import requests
from datetime import datetime

API_URL = "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645&offset=0&limit=all&format=json"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Store raw dataset locally in backend/data/
DATA_DIR = os.path.join(BASE_DIR, 'data')
RAW_FILE = os.path.join(DATA_DIR, 'india_air_quality.json')
PROCESSED_FILE = os.path.join(DATA_DIR, 'national_processed_aqi.json')

os.makedirs(DATA_DIR, exist_ok=True)

# Important pollutants to filter
FILTERED_POLLUTANTS = ["PM2.5", "PM10", "NO2", "SO2", "CO", "NH3"]

def fetch_data():
    print(f"Fetching data from {API_URL}...")
    try:
        response = requests.get(API_URL, timeout=60)
        response.raise_for_status()
        data = response.json()
        print(f"Downloaded {len(data.get('records', []))} records.")
        
        # Store locally
        with open(RAW_FILE, 'w') as f:
            json.dump(data, f)
        
        return data.get('records', [])
    except Exception as e:
        print(f"Failed to fetch data: {e}")
        # Try loading from local file if exists
        if os.path.exists(RAW_FILE):
            print("Loading from local cached file.")
            with open(RAW_FILE, 'r') as f:
                return json.load(f).get('records', [])
        return []

def preprocess_data(records):
    print("Preprocessing data...")
    cleaned_records = []
    
    stats = {'total': len(records), 'valid': 0, 'invalid': 0, 'filtered': 0}
    
    for r in records:
        try:
            # Check required keys
            if not all(k in r for k in ('country', 'state', 'city', 'station', 'pollutant_id', 'avg_value')):
                stats['invalid'] += 1
                continue
                
            pollutant = str(r['pollutant_id']).upper().strip()
            
            # Filter important pollutants
            if pollutant not in FILTERED_POLLUTANTS:
                stats['filtered'] += 1
                continue
            
            avg_val = r.get('avg_value')
            min_val = r.get('min_value')
            max_val = r.get('max_value')
            
            if avg_val is None or avg_val == 'NA' or str(avg_val).strip() == '':
                stats['invalid'] += 1
                continue
                
            try:
                avg_val = float(avg_val)
                min_val = float(min_val) if min_val not in (None, 'NA', '') else avg_val
                max_val = float(max_val) if max_val not in (None, 'NA', '') else avg_val
            except ValueError:
                stats['invalid'] += 1
                continue
            
            lat, lon = None, None
            if r.get('latitude') and r.get('longitude') and r.get('latitude') != 'NA' and r.get('longitude') != 'NA':
                try:
                    lat = float(r['latitude'])
                    lon = float(r['longitude'])
                except ValueError:
                    pass
            
            cleaned_records.append({
                'state': r.get('state', '').strip(),
                'city': r.get('city', '').strip(),
                'station': r.get('station', '').strip(),
                'pollutant': pollutant,
                'min_value': min_val,
                'max_value': max_val,
                'avg_value': avg_val,
                'last_update': r.get('last_update', ''),
                'latitude': lat,
                'longitude': lon
            })
            stats['valid'] += 1
        except Exception as e:
            stats['invalid'] += 1
            continue

    print(f"Preprocessing complete. Total: {stats['total']}, Valid: {stats['valid']}, Filtered: {stats['filtered']}, Invalid: {stats['invalid']}")
    return cleaned_records

def generate_insights(records):
    print("Generating National AQI insights and rankings...")
    
    state_data = {}
    city_data = {}
    station_data = {}
    
    for r in records:
        row = dict(r)
        state_name = row.get('state', 'Unknown')
        city_name = row.get('city', 'Unknown')
        station_name = row.get('station', 'Unknown')
        pollutant_id = row.get('pollutant', 'Unknown')
        current_avg = float(row.get('avg_value', 0.0))
        
        # 1. State Pollution Ranking (Avg Pollutant Level)
        if state_name not in state_data:
            state_data[state_name] = {'sum': 0.0, 'count': 0}
        state_data[state_name]['sum'] += current_avg
        state_data[state_name]['count'] += 1
        
        # 2. City Pollution Ranking
        city_key = f"{city_name}, {state_name}"
        if city_key not in city_data:
            city_data[city_key] = {'city': city_name, 'state': state_name, 'sum': 0.0, 'count': 0}
        city_data[city_key]['sum'] += current_avg
        city_data[city_key]['count'] += 1
        
        # 3. Station Data (for Mapping & Tooltips)
        station_key = f"{station_name}, {city_name}"
        if station_key not in station_data:
            station_data[station_key] = {
                'station': station_name, 
                'city': city_name, 
                'state': state_name,
                'latitude': row.get('latitude'),
                'longitude': row.get('longitude'),
                'sum': 0.0, 
                'count': 0,
                'readings': []
            }
        
        st_block = station_data[station_key]
        st_block['sum'] += current_avg
        st_block['count'] += 1
        st_block['readings'].append({
            'pollutant': pollutant_id,
            'avg_value': current_avg,
            'min_value': row.get('min_value'),
            'max_value': row.get('max_value'),
            'last_update': row.get('last_update')
        })

    # State Rankings
    state_rankings = []
    for s_name, s_val in state_data.items():
        avg = round(s_val['sum'] / s_val['count'], 2) if s_val['count'] > 0 else 0
        state_rankings.append({'state': s_name, 'aqi': avg})
    state_rankings.sort(key=lambda x: x['aqi'], reverse=True)
    
    # City Rankings
    city_rankings = []
    for c_key, c_val in city_data.items():
        avg = round(c_val['sum'] / c_val['count'], 2) if c_val['count'] > 0 else 0
        city_rankings.append({'city': c_val['city'], 'state': c_val['state'], 'aqi': avg})
    city_rankings.sort(key=lambda x: x['aqi'], reverse=True)
    
    # Processed Stations for Map
    stations = []
    for stk, st_info in station_data.items():
        if st_info['count'] > 0:
            avg_aqi = round(st_info['sum'] / st_info['count'], 2)
            
            # Marker colors based on AQI
            if avg_aqi <= 50:
                st_status, st_color = "Good", "green"
            elif avg_aqi <= 100:
                st_status, st_color = "Moderate", "yellow"
            elif avg_aqi <= 150:
                st_status, st_color = "Unhealthy", "orange"
            else:
                st_status, st_color = "Hazardous", "red"
                
            # Find dominant pollutant for station
            dom_pollutant = "N/A"
            if st_info['readings']:
                dom_pollutant = max(st_info['readings'], key=lambda x: x['avg_value'])['pollutant']

            stations.append({
                'station': st_info['station'],
                'city': st_info['city'],
                'state': st_info['state'],
                'latitude': st_info.get('latitude'),
                'longitude': st_info.get('longitude'),
                'aqi': avg_aqi,
                'status': st_status,
                'color': st_color,
                'dominant_pollutant': dom_pollutant,
                'last_update': st_info['readings'][0]['last_update'] if st_info['readings'] else "N/A",
                'readings': st_info['readings']
            })
    stations.sort(key=lambda x: x['aqi'], reverse=True)

    # 4. Pollution Hotspots (Top 10 most polluted stations)
    hotspots = stations[:10]

    # AI Insight Discovery
    insight_list = []
    if city_rankings:
        top_city = city_rankings[0]
        insight_list.append(f"Highest pollution detected in {top_city['city']} ({top_city['state']}) with AQI {top_city['aqi']}.")
    
    if state_rankings:
        top_state = state_rankings[0]
        insight_list.append(f"State level alert: {top_state['state']} is currently the most polluted state at {top_state['aqi']} avg AQI.")
        
    insight_list.append(f"Analyzing {len(stations)} stations across India to detect environmental anomalies.")
    insight_list.append("Particulate matter (PM2.5/PM10) remains the primary contributor in urban clusters.")

    final_overview = {
        'total_stations': len(stations),
        'total_cities': len(city_rankings),
        'total_states': len(state_rankings),
        'highest_pollution_city': city_rankings[0]['city'] if city_rankings else 'N/A',
        'highest_pollution_state': state_rankings[0]['state'] if state_rankings else 'N/A'
    }

    return {
        'overview': final_overview,
        'state_rankings': state_rankings[:10], # Top 10 for charts/lists
        'city_rankings': city_rankings[:10],   # Top 10 for charts/lists
        'stations': stations,
        'hotspots': hotspots,
        'insights': insight_list
    }

def main():
    records = fetch_data()
    if not records:
        print("No records fetched.")
        return
        
    cleaned = preprocess_data(records)
    processed = generate_insights(cleaned)
    
    with open(PROCESSED_FILE, 'w') as f:
        json.dump(processed, f, indent=4)
    print(f"Saved processed data to {PROCESSED_FILE}")

if __name__ == "__main__":
    main()
