'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Tooltip } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getLivePollution } from '../../utils/aiApi';

// Nagpur Center
const center = [21.1458, 79.0882];
const wardCoordinates = {
    "Sitabuldi": [21.1402, 79.0818],
    "Dharampeth": [21.1432, 79.0583],
    "Laxmi Nagar": [21.1278, 79.0664],
    "Dhantoli": [21.1328, 79.0841],
    "Sadar": [21.1593, 79.0805],
    "Mahal": [21.1432, 79.1028],
    "Itwari": [21.1554, 79.1121],
    "Manewada": [21.1044, 79.0963]
};

export default function NagpurHeatmap({ hotspots = [], loading = false, title = "Nagpur Pollution Risk Map" }) {
  const getAqiColor = (aqi) => {
    if (aqi < 50) return '#4caf50'; // Green
    if (aqi <= 100) return '#ffeb3b'; // Yellow
    if (aqi <= 150) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, height: '100%', alignItems: 'center' }}><CircularProgress /></Box>;

  return (
    <Box sx={{ flexGrow: 1, borderRadius: 2, overflow: 'hidden', position: 'relative', height: '100%', minHeight: 400 }}>
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {hotspots.map((item, idx) => {
            const coords = item.lat && item.lon ? [item.lat, item.lon] : wardCoordinates[item.name];
            if (!coords) return null;
            
            return (
              <CircleMarker
                key={idx}
                center={coords}
                radius={12}
                fillColor={getAqiColor(item.aqi || 0)}
                color="#fff"
                weight={2}
                opacity={1}
                fillOpacity={0.8}
              >
                <Popup>
                  <Box sx={{ p: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>{item.name}</Typography>
                    <Typography variant="caption" display="block">AQI: <strong>{item.aqi || 'N/A'}</strong></Typography>
                    <Typography variant="caption" display="block">Status: <span style={{ color: getAqiColor(item.aqi || 0), fontWeight: 'bold' }}>{item.status || 'Unknown'}</span></Typography>
                    {item.pollutant && <Typography variant="caption" display="block">Primary Pollutant: {item.pollutant}</Typography>}
                    {item.lastUpdate && <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.8 }}>Updated: {item.lastUpdate}</Typography>}
                  </Box>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
    </Box>
  );
}
