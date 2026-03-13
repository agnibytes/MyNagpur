import os
import json
from fastapi import APIRouter, HTTPException
import google.generativeai as genai

router = APIRouter()

# Configure Gemini AI using the environment variable passed from docker-compose
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Using gemini-1.5-flash which is fast and supports JSON response format
    model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})
else:
    model = None

# Fallback data if API key is missing or request fails
fallback_insights = [
    {"type": "traffic_warning", "message": "High congestion expected near Wardha Road at 6 PM.", "severity": "high"},
    {"type": "pollution_alert", "message": "Pollution likely to increase in Ward 12 due to heavy traffic density.", "severity": "medium"},
    {"type": "transport_recommendation", "message": "Increase bus frequency on Route 8.", "severity": "info"}
]

@router.get("/")
async def get_city_insights():
    """Returns actionable urban insights generated currently by the Gemini AI engine."""
    if not model:
        return {"status": "success", "insights": fallback_insights, "note": "Using fallback; GEMINI_API_KEY not found"}

    prompt = """
    You are the AI urban planner for the Nagpur Municipal Corporation smart city project.
    Analyze hypothetical current conditions for Nagpur and generate exactly 3 contextual urban insights.
    The response must be valid JSON in this exact structure:
    {
      "insights": [
        {
          "type": "traffic_warning | pollution_alert | transport_recommendation | event_alert",
          "message": "Specific, actionable insight regarding Nagpur (e.g. Sitabuldi area, Wardha Road, etc.)",
          "severity": "high | medium | low | info"
        }
      ]
    }
    """
    
    try:
        response = model.generate_content(prompt)
        ai_data = json.loads(response.text)
        return {"status": "success", "insights": ai_data.get("insights", fallback_insights)}
    except Exception as e:
        print(f"Gemini AI Error: {e}")
        return {"status": "success", "insights": fallback_insights, "note": "Using fallback due to API error"}

