from fastapi import APIRouter
import random
from datetime import datetime

router = APIRouter()

# Mock data generation for demo purposes
wards = ["Sitabuldi", "Dharampeth", "Laxmi Nagar", "Dhantoli", "Sadar", "Mahal", "Itwari", "Manewada"]

@router.get("/live")
def get_live_traffic():
    """Returns real-time simulated traffic data across Nagpur wards."""
    data = []
    for ward in wards:
        data.append({
            "ward": ward,
            "vehicle_count": random.randint(500, 3000),
            "average_speed_kmh": random.randint(15, 60),
            "congestion_level": random.choice(["Low", "Moderate", "High", "Severe"]),
            "timestamp": datetime.now().isoformat()
        })
    return {"status": "success", "data": data}
