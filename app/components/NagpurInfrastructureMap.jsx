'use client';

import { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Paper, FormControlLabel, Switch, Chip, IconButton,
    Tooltip, Grid, Divider
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MapIcon from '@mui/icons-material/Map';
import StreetviewIcon from '@mui/icons-material/Streetview';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LayersIcon from '@mui/icons-material/Layers';

// Nagpur center coordinates
const NAGPUR_CENTER = [21.1458, 79.0882];

// Infrastructure data for Nagpur
const infrastructureData = {
    // Important locations/landmarks
    locations: [
        { id: 1, name: 'Nagpur Municipal Corporation', type: 'government', lat: 21.1575, lng: 79.0821, ward: 1 },
        { id: 2, name: 'GMC Hospital', type: 'hospital', lat: 21.1390, lng: 79.0960, ward: 25 },
        { id: 3, name: 'Nagpur Railway Station', type: 'transport', lat: 21.1524, lng: 79.0881, ward: 10 },
        { id: 4, name: 'Sitabuldi Interchange', type: 'transport', lat: 21.1470, lng: 79.0815, ward: 5 },
        { id: 5, name: 'Laxminarayan Institute', type: 'education', lat: 21.1350, lng: 79.0650, ward: 42 },
        { id: 6, name: 'Dharampeth Market', type: 'commercial', lat: 21.1420, lng: 79.0680, ward: 8 },
        { id: 7, name: 'Ambazari Water Works', type: 'utility', lat: 21.1300, lng: 79.0450, ward: 55 },
        { id: 8, name: 'Zero Mile Stone', type: 'government', lat: 21.1480, lng: 79.0805, ward: 1 },
    ],

    // Street light locations
    streetLights: [
        { id: 1, lat: 21.1458, lng: 79.0882, status: 'active', ward: 10 },
        { id: 2, lat: 21.1470, lng: 79.0815, status: 'active', ward: 5 },
        { id: 3, lat: 21.1524, lng: 79.0881, status: 'inactive', ward: 10 },
        { id: 4, lat: 21.1575, lng: 79.0821, status: 'active', ward: 1 },
    ],

    // Water pipe network (line coordinates)
    waterPipes: [
        { id: 1, coords: [[21.1300, 79.0450], [21.1400, 79.0600], [21.1458, 79.0882]], type: 'main', ward: '55-10' },
    ],

    // Electric lines network
    electricLines: [
        { id: 1, coords: [[20.8550, 79.3200], [20.8520, 79.3250], [20.8500, 79.3290]], type: 'high', ward: '3-7' },
        { id: 2, coords: [[20.8500, 79.3290], [20.8480, 79.3310], [20.8450, 79.3340]], type: 'high', ward: '6-13' },
        { id: 3, coords: [[20.8500, 79.3290], [20.8510, 79.3310], [20.8515, 79.3320]], type: 'low', ward: '6' },
        { id: 4, coords: [[20.8450, 79.3340], [20.8420, 79.3360], [20.8400, 79.3380]], type: 'high', ward: '13' },
    ],

    // Roads
    roads: [
        { id: 1, coords: [[20.8550, 79.3150], [20.8500, 79.3250], [20.8480, 79.3300], [20.8420, 79.3380]], type: 'major', name: 'Main Road' },
        { id: 2, coords: [[20.8400, 79.3250], [20.8450, 79.3280], [20.8500, 79.3290], [20.8550, 79.3280]], type: 'major', name: 'Ring Road' },
        { id: 3, coords: [[20.8480, 79.3280], [20.8490, 79.3320], [20.8485, 79.3350]], type: 'minor', name: 'Market Street' },
        { id: 4, coords: [[20.8510, 79.3250], [20.8530, 79.3280], [20.8540, 79.3310]], type: 'minor', name: 'School Road' },
    ]
};

// Location type icons and colors
const locationStyles = {
    government: { color: '#1a4e8e', icon: '🏛️' },
    hospital: { color: '#d32f2f', icon: '🏥' },
    transport: { color: '#f57c00', icon: '🚌' },
    education: { color: '#7b1fa2', icon: '🏫' },
    commercial: { color: '#388e3c', icon: '🏪' },
    utility: { color: '#0288d1', icon: '🏭' },
};

export default function NagpurInfrastructureMap({ compact = false }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [layers, setLayers] = useState({
        roads: true,
        locations: true,
        streetLights: false,
        waterPipes: false,
        electricLines: false,
    });
    const [layerObjects, setLayerObjects] = useState({});

    // Initialize map
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Dynamic import of Leaflet
        const initMap = async () => {
            const L = (await import('leaflet')).default;
            await import('leaflet/dist/leaflet.css');

            if (mapInstanceRef.current) return;
            if (!mapRef.current) return;

            // Create map
            const map = L.map(mapRef.current, {
                center: NAGPUR_CENTER,
                zoom: 15,
                zoomControl: false,
            });

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            mapInstanceRef.current = map;

            // Create layer groups
            const layerGroups = {
                roads: L.layerGroup(),
                locations: L.layerGroup(),
                streetLights: L.layerGroup(),
                waterPipes: L.layerGroup(),
                electricLines: L.layerGroup(),
            };

            // Add roads layer
            infrastructureData.roads.forEach(road => {
                const polyline = L.polyline(road.coords, {
                    color: road.type === 'major' ? '#333' : '#666',
                    weight: road.type === 'major' ? 5 : 3,
                    opacity: 0.8,
                }).bindPopup(`<b>${road.name}</b><br/>Type: ${road.type}`);
                layerGroups.roads.addLayer(polyline);
            });

            // Add locations layer
            infrastructureData.locations.forEach(loc => {
                const style = locationStyles[loc.type] || { color: '#666', icon: '📍' };
                const marker = L.marker([loc.lat, loc.lng], {
                    icon: L.divIcon({
                        html: `<div style="font-size: 24px;">${style.icon}</div>`,
                        className: 'custom-div-icon',
                        iconSize: [30, 30],
                        iconAnchor: [15, 15],
                    })
                }).bindPopup(`
                    <b>${loc.name}</b><br/>
                    Type: ${loc.type}<br/>
                    Ward: ${loc.ward}
                `);
                layerGroups.locations.addLayer(marker);
            });

            // Add street lights layer
            infrastructureData.streetLights.forEach(light => {
                const color = light.status === 'active' ? '#ffc107' :
                    light.status === 'inactive' ? '#666' : '#ff9800';
                const circle = L.circleMarker([light.lat, light.lng], {
                    radius: 6,
                    fillColor: color,
                    color: '#333',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                }).bindPopup(`
                    <b>Street Light #${light.id}</b><br/>
                    Status: ${light.status}<br/>
                    Ward: ${light.ward}
                `);
                layerGroups.streetLights.addLayer(circle);
            });

            // Add water pipes layer
            infrastructureData.waterPipes.forEach(pipe => {
                const polyline = L.polyline(pipe.coords, {
                    color: pipe.type === 'main' ? '#1976d2' : '#64b5f6',
                    weight: pipe.type === 'main' ? 4 : 2,
                    opacity: 0.8,
                    dashArray: pipe.type === 'secondary' ? '5, 5' : null,
                }).bindPopup(`
                    <b>Water Pipe</b><br/>
                    Type: ${pipe.type}<br/>
                    Ward: ${pipe.ward}
                `);
                layerGroups.waterPipes.addLayer(polyline);
            });

            // Add electric lines layer
            infrastructureData.electricLines.forEach(line => {
                const polyline = L.polyline(line.coords, {
                    color: line.type === 'high' ? '#d32f2f' : '#ff9800',
                    weight: line.type === 'high' ? 3 : 2,
                    opacity: 0.8,
                }).bindPopup(`
                    <b>Electric Line</b><br/>
                    Type: ${line.type} voltage<br/>
                    Ward: ${line.ward}
                `);
                layerGroups.electricLines.addLayer(polyline);
            });

            // Add default layers to map
            layerGroups.roads.addTo(map);
            layerGroups.locations.addTo(map);

            setLayerObjects(layerGroups);
            setMapReady(true);
        };

        initMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Handle layer toggle
    const toggleLayer = (layerName) => {
        const newState = !layers[layerName];
        setLayers(prev => ({ ...prev, [layerName]: newState }));

        if (mapInstanceRef.current && layerObjects[layerName]) {
            if (newState) {
                layerObjects[layerName].addTo(mapInstanceRef.current);
            } else {
                layerObjects[layerName].remove();
            }
        }
    };

    // Zoom controls
    const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
    const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
    const handleReset = () => {
        mapInstanceRef.current?.setView(NAGPUR_CENTER, 15);
    };

    const layerConfig = [
        { key: 'roads', label: 'Roads', icon: <StreetviewIcon />, color: '#333' },
        { key: 'locations', label: 'Locations', icon: <LocationOnIcon />, color: '#1a4e8e' },
        { key: 'streetLights', label: 'Street Lights', icon: <LightbulbIcon />, color: '#ffc107' },
        { key: 'waterPipes', label: 'Water Pipes', icon: <WaterDropIcon />, color: '#1976d2' },
        { key: 'electricLines', label: 'Electric Lines', icon: <ElectricBoltIcon />, color: '#d32f2f' },
    ];

    return (
        <Paper sx={{
            p: 2,
            border: '1px solid #ddd',
            borderRadius: 0,
            boxShadow: 3,
            bgcolor: '#fff'
        }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                borderBottom: '2px solid #FF9933',
                pb: 1,
                flexWrap: 'wrap',
                gap: 1
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MapIcon sx={{ color: '#1a4e8e' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                        Nagpur Infrastructure Map
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title="Zoom In">
                        <IconButton size="small" onClick={handleZoomIn} sx={{ bgcolor: '#e8f4fc' }}>
                            <ZoomInIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom Out">
                        <IconButton size="small" onClick={handleZoomOut} sx={{ bgcolor: '#e8f4fc' }}>
                            <ZoomOutIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reset View">
                        <IconButton size="small" onClick={handleReset} sx={{ bgcolor: '#e8f4fc' }}>
                            <RestartAltIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Layer Controls */}
            <Box sx={{
                mb: 2,
                p: 1,
                bgcolor: '#f5f5f5',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
                    <LayersIcon sx={{ color: '#666', fontSize: 18 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#666' }}>
                        Layers:
                    </Typography>
                </Box>
                {layerConfig.map(layer => (
                    <Chip
                        key={layer.key}
                        size="small"
                        icon={layer.icon}
                        label={compact ? '' : layer.label}
                        onClick={() => toggleLayer(layer.key)}
                        sx={{
                            bgcolor: layers[layer.key] ? layer.color : '#e0e0e0',
                            color: layers[layer.key] ? '#fff' : '#666',
                            fontWeight: 'bold',
                            '& .MuiChip-icon': {
                                color: layers[layer.key] ? '#fff' : '#666',
                            },
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                opacity: 0.8,
                            }
                        }}
                    />
                ))}
            </Box>

            {/* Map Container */}
            <Box
                ref={mapRef}
                sx={{
                    height: compact ? 300 : 450,
                    borderRadius: 1,
                    border: '2px solid #e0e0e0',
                    bgcolor: '#e8f4fc',
                }}
            />

            {/* Legend */}
            {!compact && (
                <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #eee' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>
                        Map Legend:
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 20, height: 4, bgcolor: '#333', borderRadius: 1 }} />
                                <Typography variant="caption">Major Road</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 20, height: 3, bgcolor: '#1976d2', borderRadius: 1 }} />
                                <Typography variant="caption">Main Water Pipe</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 20, height: 3, bgcolor: '#d32f2f', borderRadius: 1 }} />
                                <Typography variant="caption">High Voltage Line</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 10, height: 10, bgcolor: '#ffc107', borderRadius: '50%' }} />
                                <Typography variant="caption">Active Light</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 10, height: 10, bgcolor: '#666', borderRadius: '50%' }} />
                                <Typography variant="caption">Inactive Light</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <span style={{ fontSize: 14 }}>🏛️🏥🚌</span>
                                <Typography variant="caption">Landmarks</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Paper>
    );
}
