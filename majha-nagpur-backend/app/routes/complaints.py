import json
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter()

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'data_pipeline', 'synthetic_nagpur_data.json')

class Complaint(BaseModel):
    type: str
    subType: Optional[str] = None
    description: str
    address: str
    landmark: Optional[str] = None
    ward: str
    ai_priority: Optional[dict] = None

@router.post("/")
async def submit_complaint(complaint: Complaint, user_id: int = 1):
    try:
        # Load existing data
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                data = json.load(f)
        else:
            raise HTTPException(status_code=404, detail="System dataset not found.")

        # Assign request_id
        new_request_id = len(data.get("datasets", {}).get("service_requests", [])) + 2001
        
        # Determine service mapping
        mapping = {
            'road': 'roads_and_transport',
            'water_supply': 'water_and_drainage',
            'drainage': 'water_and_drainage',
            'streetlight': 'street_lighting',
            'garbage': 'sanitation_services',
            'sanitation': 'sanitation_services',
            'encroachment': 'grievance_redressal',
            'other': 'grievance_redressal'
        }
        
        service_type = mapping.get(complaint.type, 'grievance_redressal')
        ward_num = int(complaint.ward.replace('Ward ', '')) if 'Ward' in complaint.ward else 1
        
        # Create new record
        new_record = {
            "request_id": new_request_id,
            "service_type": service_type,
            "user_id": user_id,
            "ward": ward_num,
            "description": complaint.description,
            "address": complaint.address,
            "landmark": complaint.landmark,
            "latitude": 21.1458,  # Mock coords for the center
            "longitude": 79.0882,
            "timestamp": datetime.now().isoformat(),
            "status": "pending",
            "ai_priority": complaint.ai_priority
        }
        
        # Append and save
        if "datasets" in data and "service_requests" in data["datasets"]:
             data["datasets"]["service_requests"].append(new_record)
             # Update metrics
             data["dashboard_metrics"]["total_service_requests"] += 1
             data["dashboard_metrics"]["pending_requests"] += 1
             
             with open(DATA_FILE, 'w') as f:
                 json.dump(data, f, indent=2)
                 
        return {"status": "success", "message": "Complaint registered successfully", "data": new_record}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}")
async def get_user_complaints(user_id: int):
    try:
        if not os.path.exists(DATA_FILE):
            return {"status": "success", "data": []}
            
        with open(DATA_FILE, 'r') as f:
             data = json.load(f)
             
        requests = data.get("datasets", {}).get("service_requests", [])
        
        # Filter by user_id
        user_requests = [req for req in requests if req.get("user_id") == user_id]
        
        # Sort by timestamp descending
        user_requests.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        
        return {"status": "success", "data": user_requests}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
