from fastapi import APIRouter
import random
from datetime import datetime

router = APIRouter()

wards = ["Sitabuldi", "Dharampeth", "Laxmi Nagar", "Dhantoli", "Sadar", "Mahal", "Itwari", "Manewada"]

@router.get("/live")
def get_live_pollution():
    """Returns real-time simulated AQI data across Nagpur wards."""
    data = []
    for ward in wards:
        aqi = random.randint(40, 300)
        status = "Good" if aqi < 50 else "Moderate" if aqi < 150 else "Poor" if aqi < 250 else "Severe"
        data.append({
            "ward": ward,
            "AQI": aqi,
            "PM2_5": random.randint(10, 150),
            "PM10": random.randint(20, 250),
            "status": status,
            "timestamp": datetime.now().isoformat()
        })
    return {"status": "success", "data": data}
