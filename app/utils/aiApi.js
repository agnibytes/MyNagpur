import axios from 'axios';

const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000/api';

// Create an axios instance with a timeout to quickly fallback to mock data if backend isn't ready
const aiClient = axios.create({
  baseURL: AI_API_URL,
  timeout: 3000, 
});

// Helper for generic fallback
const fetchWithFallback = async (endpoint, fallbackData) => {
  try {
    const response = await aiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.warn(`[AI Config] Using fallback data for ${endpoint}`);
    return fallbackData;
  }
};

export const getCityInsights = async () => {
  const fallback = {
    status: "success",
    insights: [
      { type: "traffic_warning", message: "High congestion expected near Wardha Road at 6 PM.", severity: "high" },
      { type: "pollution_alert", message: "Pollution likely to increase in Ward 12 due to heavy traffic density.", severity: "medium" },
      { type: "transport_recommendation", message: "Bus overload on Route 12: consider increasing frequency.", severity: "high" }
    ]
  };
  return fetchWithFallback('/insights', fallback);
};

export const getLiveTraffic = async () => {
  const fallback = {
    status: "success",
    data: [
      { ward: "Sitabuldi", vehicle_count: 2450, congestion_level: "High", average_speed_kmh: 18 },
      { ward: "Dharampeth", vehicle_count: 1200, congestion_level: "Moderate", average_speed_kmh: 35 },
      { ward: "Manewada", vehicle_count: 3100, congestion_level: "Severe", average_speed_kmh: 12 },
    ]
  };
  return fetchWithFallback('/traffic/live', fallback);
};

export const getTrafficPredictions = async () => {
    const fallback = {
        status: "success",
        predictions: [
            { ward: "Sitabuldi", time: "17:00", congestion_level: "Critical", confidence_score: 0.92 },
            { ward: "Sitabuldi", time: "18:00", congestion_level: "High", confidence_score: 0.88 },
            { ward: "Manewada", time: "17:00", congestion_level: "High", confidence_score: 0.85 },
        ]
    };
    return fetchWithFallback('/predictions/traffic', fallback);
};

export const getLivePollution = async () => {
  const fallback = {
    status: "success",
    data: [
      { ward: "Sitabuldi", AQI: 180, PM2_5: 90, status: "Poor" },
      { ward: "Dharampeth", AQI: 95, PM2_5: 45, status: "Moderate" },
      { ward: "Manewada", AQI: 210, PM2_5: 110, status: "Severe" },
    ]
  };
  return fetchWithFallback('/pollution/live', fallback);
};
