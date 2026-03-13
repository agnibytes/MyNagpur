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

export default function NagpurHeatmap() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const resp = await getLivePollution();
      setData(resp.data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const getAqiColor = (aqi) => {
    if (aqi < 50) return '#4caf50'; // Green
    if (aqi < 150) return '#ffeb3b'; // Yellow
    if (aqi < 250) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Paper sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column' }} elevation={3}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        🌡️ Nagpur Pollution Risk Map
      </Typography>
      <Box sx={{ flexGrow: 1, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {data.map((item, idx) => {
            const coords = wardCoordinates[item.ward];
            if (!coords) return null;
            return (
              <CircleMarker
                key={idx}
                center={coords}
                radius={Math.min(item.AQI / 4, 30)}
                fillColor={getAqiColor(item.AQI)}
                color={getAqiColor(item.AQI)}
                weight={1}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <strong>{item.ward}</strong><br/>
                  AQI: {item.AQI} ({item.status})<br/>
                  PM2.5: {item.PM2_5}
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </Box>
    </Paper>
  );
}
