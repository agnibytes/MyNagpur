from fastapi import APIRouter, HTTPException, Query
import json
import os

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_FILE = os.path.join(BASE_DIR, 'data', 'national_processed_aqi.json')

def load_data():
    if not os.path.exists(PROCESSED_FILE):
        return None
    with open(PROCESSED_FILE, 'r') as f:
        return json.load(f)

@router.get("/national-summary")
async def get_national_summary():
    data = load_data()
    if not data:
        raise HTTPException(status_code=404, detail="Processed air quality data not found")
    return {
        "overview": data.get("overview"),
        "insights": data.get("insights"),
        "state_rankings": data.get("state_rankings", []),
        "city_rankings": data.get("city_rankings", [])
    }

@router.get("/stations")
async def get_stations():
    data = load_data()
    if not data:
        raise HTTPException(status_code=404, detail="Processed air quality data not found")
    return data.get("stations", [])

@router.get("/hotspots")
async def get_hotspots():
    data = load_data()
    if not data:
        raise HTTPException(status_code=404, detail="Processed air quality data not found")
    return data.get("hotspots", [])

@router.get("/search")
async def search_air_quality(q: str = Query(..., min_length=1)):
    data = load_data()
    if not data:
        raise HTTPException(status_code=404, detail="Processed air quality data not found")
    
    query = q.lower().strip()
    results = []
    
    # Search in stations
    for s in data.get("stations", []):
        if (query in s['station'].lower() or 
            query in s['city'].lower() or 
            query in s['state'].lower() or
            query in str(s.get('dominant_pollutant', '')).lower()):
            results.append(s)
            
    return results

@router.get("/state/{state_name}")
async def get_state_aqi(state_name: str):
    data = load_data()
    if not data:
        raise HTTPException(status_code=404, detail="Processed air quality data not found")
    
    # Check in rankings
    for s in data.get("state_rankings", []):
        if s['state'].lower() == state_name.lower():
            return s
            
    raise HTTPException(status_code=404, detail=f"State '{state_name}' not found")

@router.get("/city/{city_name}")
async def get_city_aqi(city_name: str):
    data = load_data()
    if not data:
        raise HTTPException(status_code=404, detail="Processed air quality data not found")
    
    # Check in rankings
    for c in data.get("city_rankings", []):
        if c['city'].lower() == city_name.lower():
            # Find monitoring stations in this city
            city_stations = [s for s in data.get("stations", []) if s['city'].lower() == city_name.lower()]
            return {
                "city_details": c,
                "stations": city_stations
            }
            
    raise HTTPException(status_code=404, detail=f"City '{city_name}' not found")
