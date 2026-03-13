import json
import os
import random
from datetime import datetime, timedelta

def get_random_date(days_back=30):
    now = datetime.now()
    return (now - timedelta(days=random.randint(0, days_back), hours=random.randint(0, 24), minutes=random.randint(0, 60))).isoformat()

def generate_city_scale_data():
    WARDS = 13
    
    # --- 1. Citizen Complaints (50,000 records) ---
    print("Generating 50,000 Citizen Complaints...")
    categories = ["Garbage Overflow", "Potholes", "Water Leak", "Street Light Issue", "Illegal Parking", "Stray Animals"]
    locations = ["Dharampeth", "Sitabuldi", "Manewada", "Sadar", "Mahal", "Itwari", "Wardhman Nagar", "Khamla"]
    statuses = ["Pending", "In Progress", "Resolved", "Resolved"]
    
    citizen_complaints = []
    for i in range(1, 50001):
        # Hotspot generation: Ward 12 has more Garbage and Water issues
        ward = random.randint(1, WARDS)
        loc = random.choice(locations)
        cat = random.choice(categories)
        
        if random.random() < 0.15:
            ward = 12
            loc = "Dharampeth"
            cat = random.choice(["Garbage Overflow", "Water Leak"])
            
        citizen_complaints.append({
            "complaint_id": f"CMP_{200000+i}",
            "location": loc,
            "ward": ward,
            "category": cat,
            "timestamp": get_random_date(60),
            "latitude": 21.1458 + random.uniform(-0.06, 0.06),
            "longitude": 79.0882 + random.uniform(-0.06, 0.06),
            "status": random.choice(statuses)
        })

    # --- 2. Traffic Sensors (100 intersections, 500 readings each = 50,000 records) ---
    print("Generating Traffic Sensor Data...")
    traffic_sensors = []
    for i in range(1, 101):
        loc = random.choice(locations)
        for _ in range(500):
            # Simulate Sitabuldi Chowk congestion
            if loc == "Sitabuldi" and random.random() < 0.3:
                count = random.randint(120, 200)
                speed = random.randint(5, 18)  # Congested
            else:
                count = random.randint(20, 100)
                speed = random.randint(20, 60)
                
            traffic_sensors.append({
                "intersection_id": f"TRF_{i:03d}",
                "location": loc,
                "vehicle_count": count,
                "avg_speed": speed,
                "congestion_score": round(float(count) / max(float(speed), 1.0), 2),
                "timestamp": get_random_date(7)
            })

    # --- 3. Air Pollution (AQI) Sensors (20 stations, 1000 readings = 20,000 records) ---
    print("Generating Air Pollution Data...")
    aqi_sensors = []
    for i in range(1, 21):
        loc = random.choice(locations)
        for _ in range(1000):
            # Simulate MIHAN / Industrial high pollution
            is_industrial = (loc in ["MIDC", "MIHAN", "Sitabuldi"])
            base_aqi = random.randint(110, 170) if is_industrial else random.randint(60, 120)
            
            aqi_sensors.append({
                "station_id": f"AQI_{i:02d}",
                "location": loc,
                "AQI": base_aqi,
                "PM2_5": int(float(base_aqi) * random.uniform(0.4, 0.6)),
                "PM10": int(float(base_aqi) * random.uniform(0.7, 0.9)),
                "NO2": random.randint(10, 50),
                "CO": round(float(random.uniform(0.1, 2.0)), 2),
                "timestamp": get_random_date(14)
            })

    # --- 4. Smart Waste Bins (1000 bins) ---
    print("Generating Smart Waste Bin Data...")
    waste_bins = []
    for i in range(1, 1001):
        loc = random.choice(locations)
        # Hotspot Dharampeth has fuller bins
        fill_level = random.randint(70, 100) if loc == "Dharampeth" and random.random() < 0.4 else random.randint(10, 80)
        waste_bins.append({
            "bin_id": f"BIN_{i:04d}",
            "location": loc,
            "fill_level": f"{fill_level}%",
            "needs_pickup": fill_level > 80,
            "last_collection": get_random_date(2)
        })

    # --- 5. Water Monitoring Sensors (500 pipelines) ---
    print("Generating Water Monitoring Data...")
    water_sensors = []
    for i in range(1, 501):
        loc = random.choice(locations)
        # Manewada has more leaks
        is_leak = (loc == "Manewada" and random.random() < 0.2)
        pressure = random.randint(30, 45) if is_leak else random.randint(50, 70)
        leak_prob = round(random.uniform(0.6, 0.95), 2) if is_leak else round(random.uniform(0.01, 0.2), 2)
        
        water_sensors.append({
            "pipeline_id": f"PIPE_{i:04d}",
            "zone": loc,
            "pressure_psi": pressure,
            "flow_rate_lps": random.randint(100, 500) if not is_leak else random.randint(50, 90),
            "leak_probability": leak_prob,
            "timestamp": get_random_date(1)
        })

    # --- 6. Energy Grid Sensors (50 substations) ---
    print("Generating Energy Grid Data...")
    energy_sensors = []
    for i in range(1, 51):
        load = random.randint(40, 95)
        energy_sensors.append({
            "station_id": f"SUB_{i:02d}",
            "zone": random.choice(locations),
            "power_consumption_mw": random.randint(10, 50),
            "voltage_kv": random.choice([11, 33, 132]),
            "load_percentage": f"{load}%",
            "overload_risk": load > 85,
            "timestamp": get_random_date(1)
        })

    # --- 7. Analytics Engine Output (Example Insights) ---
    print("Generating AI Insights...")
    ai_insights = [
        "AQI increased 17% near MIHAN industrial zone between 8 AM and 11 AM. 24-hr forecast: Unhealthy.",
        "High waste accumulation detected in Dharampeth (85% bins > 80% full). Recommend additional garbage truck deployment.",
        "Severe traffic congestion at Sitabuldi Chowk (Avg speed 12 km/h). Deploying traffic officers recommended.",
        "High leak probability (0.82) detected in Manewada Sector 4 water pipeline. Inspection required.",
        "Ward 12 shows a 45% increase in combined Garbage and Water complaints over the last 72 hours."
    ]

    dataset = {
        "project_name": "MajhaNagpur Smart City Data Simulation",
        "total_records": len(citizen_complaints) + len(traffic_sensors) + len(aqi_sensors) + len(waste_bins) + len(water_sensors) + len(energy_sensors),
        "data_sources": {
            "citizen_complaints": citizen_complaints,
            "iot_traffic_sensors": traffic_sensors,
            "iot_air_pollution": aqi_sensors,
            "iot_smart_waste_bins": waste_bins,
            "iot_water_monitoring": water_sensors,
            "iot_energy_grid": energy_sensors
        },
        "ai_analytics_output": {
            "critical_insights": ai_insights,
            "congestion_hotspots": ["Sitabuldi", "Sadar"],
            "pollution_hotspots": ["MIHAN", "Sitabuldi"],
            "maintenance_priorities": {
                "waste_collection": "Dharampeth",
                "water_pipeline": "Manewada"
            }
        }
    }

    file_path = os.path.join(os.path.dirname(__file__), 'synthetic_nagpur_data.json')
    print(f"Writing {dataset['total_records']} records to JSON...")
    with open(file_path, "w") as f:
        json.dump(dataset, f, indent=2)
    
    print(f"Successfully generated massive city-scale dataset ({dataset['total_records']} records)")
    print(f"Saved to: {file_path}")

if __name__ == "__main__":
    generate_city_scale_data()
