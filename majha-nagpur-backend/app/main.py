from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.routes import traffic, pollution, predictions, insights, mock_data, auth, complaints, national_aqi

app = FastAPI(
    title="MajhaNagpur Smart City AI Backend",
    description="Backend API for MajhaNagpur Urban Insights and AI Predictions",
    version="1.0.0"
)

# Allow CORS for frontend dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to actual frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(traffic.router, prefix="/api/traffic", tags=["Traffic"])
app.include_router(pollution.router, prefix="/api/pollution", tags=["Pollution"])
app.include_router(predictions.router, prefix="/api/predictions", tags=["Predictions"])
app.include_router(insights.router, prefix="/api/insights", tags=["Insights"])
app.include_router(mock_data.router, prefix="/api/mock-data", tags=["Mock Data"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(complaints.router, prefix="/api/complaints", tags=["Complaints"])
app.include_router(national_aqi.router, prefix="/api/airquality", tags=["National Air Quality"])

@app.get("/")
def read_root():
    return {"status": "online", "message": "MajhaNagpur Smart City AI Backend is running"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }
