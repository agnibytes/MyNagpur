import json
import os
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Construct path to the generated json relative to this file
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'data_pipeline', 'synthetic_nagpur_data.json')

@router.get("/")
async def get_synthetic_data():
    """Returns the generated synthetic datasets for MajhaNagpur UI."""
    try:
        if not os.path.exists(DATA_FILE):
            raise HTTPException(status_code=404, detail="Synthetic data file not found. Please run the generation script.")
            
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            
        return {
            "status": "success",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading dataset: {str(e)}")

@router.get("/dashboard")
async def get_dashboard_data():
    """Returns only the analytics and dashboard specific data."""
    try:
        if not os.path.exists(DATA_FILE):
             raise HTTPException(status_code=404, detail="Synthetic data file not found.")
             
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            
        return {
            "status": "success",
            "analytics": data.get("analytics_outputs", {}),
            "dashboard_stats": data.get("dashboard_data", {})
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading dataset: {str(e)}")
