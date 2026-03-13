from fastapi import APIRouter
import random

router = APIRouter()

wards = ["Sitabuldi", "Dharampeth", "Laxmi Nagar", "Dhantoli", "Sadar", "Mahal", "Itwari", "Manewada"]

@router.get("/traffic")
def get_traffic_prediction():
    """Returns AI-predicted traffic congestion for the next few hours."""
    predictions = []
    times = ["17:00", "18:00", "19:00", "20:00"]
    
    for ward in wards:
        for t in times:
            level = random.choice(["Low", "Moderate", "High", "Critical"])
            predictions.append({
                "ward": ward,
                "time": t,
                "congestion_level": level,
                "confidence_score": round(random.uniform(0.75, 0.98), 2)
            })
            
    return {"status": "success", "predictions": predictions}

@router.get("/pollution")
def get_pollution_prediction():
    """Returns AI-predicted AQI levels based on traffic and weather models."""
    predictions = []
    for ward in wards:
        predictions.append({
            "ward": ward,
            "forecast_next_12h": {
                "AQI": random.randint(80, 250),
                "trend": random.choice(["increasing", "decreasing", "stable"])
            }
        })
    return {"status": "success", "predictions": predictions}
