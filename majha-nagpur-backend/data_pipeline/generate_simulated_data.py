import json
import os
import random
from datetime import datetime, timedelta

def get_random_date():
    now = datetime.now()
    return (now - timedelta(days=random.randint(0, 30), hours=random.randint(0, 24))).isoformat()

def generate_data():
    service_categories = [
        "grievance_redressal",
        "water_and_drainage",
        "sanitation_services",
        "roads_and_transport",
        "street_lighting",
        "health_services",
        "property_tax",
        "building_permissions",
        "birth_death_certificates",
        "trade_license",
        "water_tax_payment",
        "public_safety"
    ]
    statuses = ["pending", "in_progress", "resolved"]
    
    # 1. Service Requests
    service_requests = []
    for i in range(1, 421):
        ward = random.randint(1, 13)
        # Introduce bias for Ward 8 (Sanitation) & Ward 12 (Roads)
        if random.random() < 0.25:
            ward = 8
            cat = "sanitation_services"
        elif random.random() < 0.15:
            ward = 12
            cat = "roads_and_transport"
        elif random.random() < 0.1:
            ward = 5
            cat = "street_lighting"
        else:
            cat = random.choice(service_categories)
            
        service_requests.append({
            "request_id": 2000 + i,
            "service_type": cat,
            "user_id": random.randint(1, 1000),
            "ward": ward,
            "latitude": 21.1458 + random.uniform(-0.06, 0.06),
            "longitude": 79.0882 + random.uniform(-0.06, 0.06),
            "timestamp": get_random_date(),
            "status": random.choice(statuses)
        })

    # 2. Traffic Sensors
    traffic_sensors = [
        {"sensor_id": "TRF_21", "location": "Sitabuldi Junction", "ward": 8, "vehicle_count": random.randint(300, 450), "average_speed": random.randint(10, 20), "timestamp": datetime.now().isoformat()},
        {"sensor_id": "TRF_17", "location": "Wardha Road", "ward": 10, "vehicle_count": random.randint(250, 400), "average_speed": random.randint(15, 30), "timestamp": datetime.now().isoformat()}
    ]

    # 3. AQI Sensors
    aqi_sensors = [
        {"sensor_id": "AQI_08", "ward": 8, "AQI": random.randint(140, 165), "PM2_5": random.randint(70, 90), "PM10": random.randint(110, 130), "timestamp": datetime.now().isoformat()},
        {"sensor_id": "AQI_12", "ward": 12, "AQI": random.randint(120, 140), "PM2_5": random.randint(60, 80), "PM10": random.randint(90, 110), "timestamp": datetime.now().isoformat()}
    ]

    # Analytics Aggregation
    ward_8_sanitation = len([r for r in service_requests if r['ward'] == 8 and r['service_type'] == 'sanitation_services'])
    ward_12_roads = len([r for r in service_requests if r['ward'] == 12 and r['service_type'] == 'roads_and_transport'])

    analytics = {
        "service_usage_distribution": {
            "results": [
                { "service": "Water & Drainage", "usage_percent": 35 },
                { "service": "Sanitation Services", "usage_percent": 28 },
                { "service": "Roads & Transport", "usage_percent": 15 },
                { "service": "Street Lighting", "usage_percent": 10 },
                { "service": "Health Services", "usage_percent": 7 },
                { "service": "Other Services", "usage_percent": 5 }
            ]
        },
        "ward_problem_analysis": {
            "results": [
                {"ward": 8, "top_issue": "Sanitation complaints", "count": ward_8_sanitation},
                {"ward": 12, "top_issue": "Road damage reports", "count": ward_12_roads}
            ]
        },
        "traffic_congestion_prediction": {
            "model": "RandomForestRegressor",
            "example_predictions": [
                {"location": "Sitabuldi Junction", "time": "18:00", "congestion_level": "High"},
                {"location": "Wardha Road", "time": "18:00", "congestion_level": "Medium"}
            ]
        },
        "pollution_forecast": {
            "model": "Prophet",
            "example_predictions": [
                {"ward": 8, "forecast_time": (datetime.now() + timedelta(hours=2)).isoformat(), "predicted_AQI": 162, "risk_level": "Unhealthy"}
            ]
        },
        "ai_generated_insights": [
             "Sanitation complaints increasing rapidly in Ward 8",
             "Traffic congestion predicted near Sitabuldi between 5PM and 7PM",
             "Air pollution expected to exceed AQI 160 tonight in Ward 8",
             "Street lighting issues rising in Ward 5"
        ]
    }

    dataset = {
        "project_name": "MajhaNagpur Civic Services Data Simulator",
        "city_context": {"city": "Nagpur", "wards": 13},
        "datasets": {
            "service_requests": service_requests,
            "traffic_sensors": traffic_sensors,
            "air_quality_sensors": aqi_sensors
        },
        "analytics": analytics,
        "dashboard_metrics": {
            "total_service_requests": len(service_requests),
            "pending_requests": len([r for r in service_requests if r['status'] == 'pending']),
            "in_progress": len([r for r in service_requests if r['status'] == 'in_progress']),
            "resolved_requests": len([r for r in service_requests if r['status'] == 'resolved'])
        }
    }

    file_path = os.path.join(os.path.dirname(__file__), 'synthetic_nagpur_data.json')
    with open(file_path, "w") as f:
        json.dump(dataset, f, indent=2)
    
    print("Civic Services Synthetic dataset successfully generated at data_pipeline/synthetic_nagpur_data.json")

if __name__ == "__main__":
    generate_data()

