'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Grid, Typography, Box, Paper, Chip, Avatar,
    Button, List, ListItem, ListItemIcon, ListItemText, Divider,
    TextField
} from '@mui/material';
import dynamic from 'next/dynamic';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Icons
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TrafficIcon from '@mui/icons-material/Traffic';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MapIcon from '@mui/icons-material/Map';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LogoutIcon from '@mui/icons-material/Logout';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SensorsIcon from '@mui/icons-material/Sensors';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Register Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

// Maps
const NagpurHeatmap = dynamic(() => import('../../components/ai/NagpurHeatmap'), { ssr: false });

// Portal Styles
const portalCardStyle = {
    bgcolor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: 2,
    color: '#333',
    height: '100%',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};

const portalHeaderStyle = {
    bgcolor: '#f8f9fa',
    borderBottom: '1px solid #eee',
    p: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: '#1f4e9e'
};

const primaryBlue = '#1f4e9e';
const orangeAccent = '#ff8c00';

export default function CityIntelligenceConsole() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Data States
    const [hotspots, setHotspots] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [liveAlerts, setLiveAlerts] = useState([]);
    const [aiRecommendations, setAiRecommendations] = useState([]);
    const [cityHealthScore, setCityHealthScore] = useState(0);
    const [activeComplaintsCount, setActiveComplaintsCount] = useState(176);
    
    // National AQI States
    const [nationalSummary, setNationalSummary] = useState(null);
    const [nationalStations, setNationalStations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('govtUserInfo');
        if (!storedUser) {
            router.push('/government');
            return;
        }
        setUser(JSON.parse(storedUser));
        
        fetchCityIntelligence();
        fetchNationalAQI();
        
        const interval = setInterval(simulateIncomingComplaint, 15000);
        return () => clearInterval(interval);
    }, [router]);

    const fetchNationalAQI = async () => {
        try {
            const sumRes = await fetch('http://localhost:8000/api/airquality/national-summary');
            if (sumRes.ok) {
                const sumData = await sumRes.json();
                setNationalSummary(sumData);
            }
            
            const stationsRes = await fetch('http://localhost:8000/api/airquality/stations');
            if (stationsRes.ok) {
                const stationsData = await stationsRes.json();
                setNationalStations(stationsData);
            }
        } catch (e) {
            console.error("Failed to fetch National AQI data", e);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const res = await fetch(`http://localhost:8000/api/airquality/search?q=${searchQuery}`);
            if (res.ok) {
                const data = await res.json();
                setSearchResults(data);
            }
        } catch (e) {
            console.error("Search failed", e);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('govtUserInfo');
        localStorage.removeItem('userMode');
        router.push('/government');
    };

    // Simulated Citizen Complaint Feed
    const [liveComplaints, setLiveComplaints] = useState([
        { id: 'CMP_20341', cat: 'Pothole', loc: 'Sitabuldi', time: new Date(Date.now() - 600000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
        { id: 'CMP_20340', cat: 'Garbage', loc: 'Dharampeth', time: new Date(Date.now() - 1200000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    ]);

    const simulateIncomingComplaint = () => {
        const cats = ['Water Leak', 'Streetlight', 'Traffic', 'Garbage'];
        const locs = ['Manewada', 'Civil Lines', 'Hingna', 'Sadar'];
        const newComplaint = {
            id: `CMP_${Math.floor(Math.random() * 90000) + 10000}`,
            cat: cats[Math.floor(Math.random() * cats.length)],
            loc: locs[Math.floor(Math.random() * locs.length)],
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        setLiveComplaints(prev => [newComplaint, ...prev].slice(0, 5));
        setActiveComplaintsCount(prev => prev + 1);
    };

    const fetchCityIntelligence = async () => {
        let openAqData = [];
        try {
            const res = await fetch('https://api.openaq.org/v2/latest?city=Nagpur');
            const json = await res.json();
            if (json && json.results && json.results.length > 0) {
                openAqData = json.results;
            } else {
                openAqData = generateMockOpenAQ();
            }
        } catch(e) {
            openAqData = generateMockOpenAQ();
        }

        processIntelligence(openAqData);
    };

    const generateMockOpenAQ = () => {
        return [
            { location: 'Hingna Industrial Area', measurements: [{parameter: 'pm25', value: 74}, {parameter: 'pm10', value: 108}] },
            { location: 'Sitabuldi', measurements: [{parameter: 'pm25', value: 55}, {parameter: 'pm10', value: 93}] },
            { location: 'Dharampeth', measurements: [{parameter: 'pm25', value: 42}, {parameter: 'pm10', value: 66}] },
            { location: 'Civil Lines', measurements: [{parameter: 'pm25', value: 35}, {parameter: 'pm10', value: 50}] },
            { location: 'Manewada', measurements: [{parameter: 'pm25', value: 48}, {parameter: 'pm10', value: 74}] },
            { location: 'Mihan', measurements: [{parameter: 'pm25', value: 68}, {parameter: 'pm10', value: 92}] }
        ];
    };

    const processIntelligence = (sensorData) => {
        const calculatedHotspots = sensorData.map(node => {
            const pm25 = node.measurements.find(m => m.parameter === 'pm25')?.value || 0;
            const pm10 = node.measurements.find(m => m.parameter === 'pm10')?.value || 0;
            const aqi = pm25 + pm10;
            let status = 'Good';
            if (aqi > 150) status = 'Critical';
            else if (aqi > 100) status = 'Poor';
            else if (aqi > 50) status = 'Moderate';

            let complaints = Math.floor(Math.random() * 30) + 5;
            if (node.location === 'Dharampeth') complaints += 25;

            return {
                name: node.location,
                pm25: Math.round(pm25),
                pm10: Math.round(pm10),
                aqi: Math.round(aqi),
                status,
                complaints,
                lat: node.coordinates?.latitude || null,
                lon: node.coordinates?.longitude || null
            };
        });

        calculatedHotspots.sort((a,b) => b.aqi - a.aqi);
        setHotspots(calculatedHotspots);

        const builtDistricts = calculatedHotspots.map(h => {
             const trafficLevel = h.name === 'Sitabuldi' ? 'High' : (h.aqi > 120 ? 'High' : 'Medium');
             const waterAlerts = h.name === 'Manewada' ? 2 : Math.floor(Math.random() * 2);
             const issue = 
                h.name === 'Dharampeth' ? 'Garbage Overflow' : 
                h.name === 'Sitabuldi' ? 'Traffic Congestion' : 
                h.name === 'Manewada' ? 'Water Leakage' :
                h.aqi > 150 ? 'Industrial Pollution' : 'Streetlights';

             const sensorAlertsMultiplier = (trafficLevel === 'High' ? 2 : 1) + waterAlerts;
             const priority = ((h.complaints/50) * 0.4) + ((sensorAlertsMultiplier/4) * 0.3) + ((h.aqi/200) * 0.2) + 0.1;

             return {
                 name: h.name,
                 complaints: h.complaints,
                 issue: issue,
                 aqi: h.aqi,
                 traffic: trafficLevel,
                 waterAlerts: waterAlerts,
                 priority: Math.min(priority, 1.0).toFixed(2),
                 status: priority > 0.7 ? 'critical' : priority > 0.5 ? 'warning' : 'normal'
             };
        });

        builtDistricts.sort((a, b) => b.priority - a.priority);
        setDistricts(builtDistricts.slice(0, 5));

        const avgAqi = calculatedHotspots.reduce((sum, h) => sum + h.aqi, 0) / (calculatedHotspots.length || 1);
        const healthScore = Math.round(((150 - Math.min(avgAqi, 150)) / 1.5) * 0.4 + (75 * 0.3) + (82 * 0.3));
        setCityHealthScore(healthScore);

        const generatedAlerts = [];
        if (calculatedHotspots[0]) {
            generatedAlerts.push({ icon: <CloudQueueIcon color="error"/>, title: 'AQI Level Critical', loc: calculatedHotspots[0].name, val: `AQI ${calculatedHotspots[0].aqi}`, time: 'Just now' });
        }
        generatedAlerts.push({ icon: <DeleteOutlineIcon color="warning"/>, title: 'Waste Bin Full', loc: 'Dharampeth Ward 12', val: 'Fill Level 94%', time: '5m ago' });
        generatedAlerts.push({ icon: <TrafficIcon color="error"/>, title: 'Traffic Congestion', loc: 'Sitabuldi Chowk', val: '140 vehicles/min', time: '12m ago' });
        if (builtDistricts.find(d => d.name === 'Manewada')) {
            generatedAlerts.push({ icon: <WaterDropIcon color="info"/>, title: 'Water Pressure Drop', loc: 'Manewada Sector 3', val: 'Leak Prob: 0.68', time: '22m ago' });
        }
        setLiveAlerts(generatedAlerts);

        const recs = [];
        const topDistrict = builtDistricts[0];
        if (topDistrict) {
            if (topDistrict.issue.includes('Garbage')) recs.push(`Deploy 2 additional garbage trucks to ${topDistrict.name}`);
            if (topDistrict.issue.includes('Traffic')) recs.push(`Install temporary traffic control at ${topDistrict.name} intersection`);
            if (topDistrict.issue.includes('Water')) recs.push(`Schedule water pipeline inspection in ${topDistrict.name} sector`);
        }
        if (calculatedHotspots[0]?.aqi > 150) {
            recs.push(`Increase pollution monitoring & dust control near ${calculatedHotspots[0].name}`);
        }
        recs.push("Schedule pothole repairs for main ward connectors before monsoon");
        setAiRecommendations(recs);
    };

    // --- Charts Configurations ---
    const complaintsChartData = {
        labels: ['Garbage', 'Traffic', 'Potholes', 'Water Leak', 'Streetlights'],
        datasets: [{
            label: 'Total Complaints',
            data: [84, 52, 37, 28, 19],
            backgroundColor: primaryBlue,
            borderRadius: 4
        }]
    };

    const pollutionTrendsData = {
        labels: ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', 'Now'],
        datasets: [
            {
                label: 'City Avg AQI',
                data: [65, 85, 120, 110, 105, 125],
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: '#eee' }, ticks: { color: '#666' } },
            x: { grid: { display: false }, ticks: { color: '#666' } }
        }
    };

    // --- Helper for Icons ---
    const getIssueIcon = (issue) => {
        if (issue.includes('Garbage')) return <DeleteOutlineIcon sx={{ color: orangeAccent }} />;
        if (issue.includes('Traffic')) return <TrafficIcon sx={{ color: orangeAccent }} />;
        if (issue.includes('Water')) return <WaterDropIcon sx={{ color: orangeAccent }} />;
        return <CloudQueueIcon sx={{ color: orangeAccent }} />;
    };

    const getStatusColor = (val, type) => {
        if (type === 'health') {
            if (val > 80) return '#4caf50';
            if (val > 50) return '#ff9800';
            return '#d32f2f';
        }
        if (type === 'alerts') {
            if (val === 0) return '#4caf50';
            if (val < 3) return '#ff9800';
            return '#d32f2f';
        }
        return primaryBlue;
    };

    const renderPriorityChip = (status) => {
        const config = {
            critical: { color: 'error', label: 'CRITICAL', icon: <ReportProblemIcon fontSize="inherit" /> },
            warning: { color: 'warning', label: 'ATTENTION', icon: <WarningAmberIcon fontSize="inherit" /> },
            normal: { color: 'success', label: 'STABLE', icon: <VerifiedUserIcon fontSize="inherit" /> }
        };
        const { color, label, icon } = config[status] || config.normal;
        return (
            <Chip 
                size="small" 
                color={color} 
                label={label} 
                icon={icon}
                sx={{ fontWeight: 'bold', fontSize: '0.65rem' }} 
            />
        );
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f9', pb: 4 }}>
            {/* 1. City Status Overview Header */}
            <Box sx={{ bgcolor: primaryBlue, color: '#fff', pt: 6, pb: 8, mb: -4 }}>
                <Container maxWidth="xl">
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} md={7}>
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>
                                Nagpur City Intelligence
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                                Official Command & Control Center • Operational Monitoring
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ textAlign: { md: 'right' } }}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, bgcolor: 'rgba(255,255,255,1)', p: 1.5, borderRadius: 3, boxShadow: 4, border: '2px solid #fff' }}>
                                <Avatar sx={{ bgcolor: orangeAccent, width: 48, height: 48, fontSize: '1.2rem', fontWeight: 'bold' }}>{user?.name?.[0]}</Avatar>
                                <Box sx={{ textAlign: 'left', color: '#333' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>{user?.name}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Government Administrator</Typography>
                                </Box>
                                <Button size="small" onClick={handleLogout} sx={{ ml: 1, minWidth: 40, color: 'text.secondary' }}>
                                    <LogoutIcon fontSize="small" />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="xl">
                {/* 1. City Status Overview Metrics - LARGE CARDS */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={2.4}>
                        <Paper sx={{ ...portalCardStyle, p: 3, textAlign: 'center', borderTop: `6px solid ${primaryBlue}`, height: 'auto' }}>
                            <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>City Sector</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: primaryBlue }}>Central</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2.4}>
                        <Paper sx={{ ...portalCardStyle, p: 3, textAlign: 'center', borderTop: `6px solid ${orangeAccent}`, height: 'auto' }}>
                            <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Active Complaints</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: orangeAccent }}>{activeComplaintsCount}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2.4}>
                        <Paper sx={{ ...portalCardStyle, p: 3, textAlign: 'center', borderTop: `6px solid ${getStatusColor(districts.filter(d => d.priority > 0.7).length + 2, 'alerts')}`, height: 'auto' }}>
                            <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Critical Alerts</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: getStatusColor(districts.filter(d => d.priority > 0.7).length + 2, 'alerts') }}>
                                {districts.filter(d => d.priority > 0.7).length + 2}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2.4}>
                        <Paper sx={{ ...portalCardStyle, p: 3, textAlign: 'center', borderTop: `6px solid #666`, height: 'auto' }}>
                            <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Wards Affected</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>{districts.length}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2.4}>
                        <Paper sx={{ ...portalCardStyle, p: 3, textAlign: 'center', borderTop: `6px solid ${getStatusColor(cityHealthScore, 'health')}`, height: 'auto' }}>
                            <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>City Health Index</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: getStatusColor(cityHealthScore, 'health') }}>{cityHealthScore}%</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    {/* LEFT COLUMN: Critical Real-time Data (Alerts + Insights) */}
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={4} direction="column">
                            {/* 2. Critical Real-time Alerts */}
                            <Grid item>
                                <Paper sx={{ ...portalCardStyle, borderTop: '6px solid #d32f2f' }}>
                                    <Box sx={{ ...portalHeaderStyle, bgcolor: '#fff5f5' }}>
                                        <ReportProblemIcon sx={{ color: '#d32f2f' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>Live Critical Alerts</Typography>
                                    </Box>
                                    <List sx={{ p: 0 }}>
                                        {liveAlerts.map((alert, i) => (
                                            <ListItem key={i} sx={{ 
                                                borderBottom: '1px solid #eee', 
                                                bgcolor: alert.title.includes('Critical') || alert.val.includes('94%') ? '#fff0f0' : 'transparent',
                                                '&:hover': { bgcolor: '#fdfdfd' }
                                            }}>
                                                <ListItemIcon sx={{ minWidth: 40 }}>{alert.icon}</ListItemIcon>
                                                <ListItemText 
                                                    primary={<Typography variant="body2" sx={{ fontWeight: 'bold', color: alert.title.includes('Critical') ? '#d32f2f' : '#333' }}>{alert.title}</Typography>}
                                                    secondary={<Typography variant="caption" sx={{ fontWeight: 500 }}>{alert.loc} • <span style={{ color: alert.val.includes('Critical') ? '#d32f2f' : 'inherit' }}>{alert.val}</span></Typography>}
                                                />
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>{alert.time}</Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>

                            {/* 7. AI Actionable Recommendations */}
                            <Grid item>
                                <Paper sx={{ ...portalCardStyle, borderLeft: `6px solid ${orangeAccent}` }}>
                                    <Box sx={portalHeaderStyle}>
                                        <SmartToyIcon sx={{ color: orangeAccent }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Operational AI Recommendations</Typography>
                                    </Box>
                                    <Box sx={{ p: 3 }}>
                                        {aiRecommendations.map((rec, i) => (
                                            <Paper key={i} elevation={0} sx={{ 
                                                p: 2, mb: 2, 
                                                bgcolor: '#fffbf2', 
                                                border: '1px solid #ffe8cc',
                                                borderRadius: 2, 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 2 
                                            }}>
                                                <ArrowUpwardIcon sx={{ color: orangeAccent }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#914d00' }}>{rec}</Typography>
                                            </Paper>
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* 8. Citizen Activity Feed */}
                            <Grid item>
                                <Paper sx={portalCardStyle}>
                                    <Box sx={portalHeaderStyle}>
                                        <EditNoteIcon />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Citizen Activities</Typography>
                                    </Box>
                                    <Box sx={{ maxHeight: 350, overflowY: 'auto' }}>
                                        <List sx={{ p: 0 }}>
                                            {liveComplaints.map((c, i) => (
                                                <ListItem key={i} sx={{ borderBottom: '1px solid #eee' }}>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: primaryBlue }}>{c.cat}</Typography>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{c.time}</Typography>
                                                        </Box>
                                                        <Typography variant="caption" color="textSecondary" display="block">Location: <strong>{c.loc}</strong></Typography>
                                                        <Typography variant="caption" color="textSecondary">Log ID: {c.id}</Typography>
                                                    </Box>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* RIGHT COLUMN: Analytical Intelligence (AQI + Districts) */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={4} direction="column">
                            {/* 3. Nagpur Air Quality Monitoring */}
                            <Grid item>
                                <Paper sx={{ ...portalCardStyle, overflow: 'hidden' }}>
                                    <Box sx={portalHeaderStyle}>
                                        <CloudQueueIcon />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Nagpur Air Quality Monitoring</Typography>
                                    </Box>
                                    {/* Summary Bar */}
                                    <Box sx={{ bgcolor: '#eff6ff', px: 3, py: 1.5, display: 'flex', gap: 4, borderBottom: '1px solid #dbeafe' }}>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#1e40af', fontWeight: 'bold' }}>AVERAGE AQI</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3a8a' }}>
                                                {Math.round(hotspots.reduce((a,b)=>a+b.aqi,0)/hotspots.length) || 138}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#1e40af', fontWeight: 'bold' }}>HIGHEST POLLUTION AREA</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3a8a' }}>
                                                {hotspots.length > 0 ? hotspots[0].name : "MIHAN Industrial Zone"}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#1e40af', fontWeight: 'bold' }}>STATIONS ACTIVE</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3a8a' }}>{hotspots.length || 4}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ height: 450 }}>
                                        <NagpurHeatmap hotspots={hotspots} loading={hotspots.length === 0} />
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* 4. District Detail Problems */}
                            <Grid item>
                                <Paper sx={portalCardStyle}>
                                    <Box sx={portalHeaderStyle}>
                                        <LocationCityIcon />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Local Infrastructure & Problem Tracking</Typography>
                                    </Box>
                                    <Box sx={{ p: 3 }}>
                                        <Grid container spacing={2}>
                                            {districts.map((d, i) => (
                                                <Grid item xs={12} sm={6} key={i}>
                                                    <Paper elevation={0} sx={{ 
                                                        p: 2.5, 
                                                        bgcolor: '#fafafa', 
                                                        border: '1px solid #eee', 
                                                        borderRadius: 3,
                                                        borderLeft: `5px solid ${d.status === 'critical' ? '#d32f2f' : d.status === 'warning' ? orangeAccent : '#4caf50'}`,
                                                        height: '100%'
                                                    }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                                            <Typography variant="h6" sx={{ fontWeight: 800, color: primaryBlue }}>{d.name}</Typography>
                                                            {renderPriorityChip(d.status)}
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                            {getIssueIcon(d.issue)}
                                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#555' }}>{d.issue}</Typography>
                                                        </Box>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="caption" color="text.secondary">Complaints</Typography>
                                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{d.complaints}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="caption" color="text.secondary">AQI Level</Typography>
                                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{d.aqi}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="caption" color="text.secondary">Traffic Status</Typography>
                                                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: d.traffic === 'High' ? '#d32f2f' : 'inherit' }}>{d.traffic}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="caption" color="text.secondary">Priority Score</Typography>
                                                                <Typography variant="body1" sx={{ fontWeight: 900, color: d.priority > 0.7 ? '#d32f2f' : '#333' }}>{d.priority}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* 5. National Air Quality Intelligence Section */}
                            <Grid item>
                                <Paper sx={{ ...portalCardStyle, borderTop: `6px solid ${primaryBlue}` }}>
                                    <Box sx={{ ...portalHeaderStyle, bgcolor: '#fff' }}>
                                        <CloudQueueIcon />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>National Air Quality Intelligence (India)</Typography>
                                        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                                            <TextField 
                                                size="small" 
                                                variant="outlined"
                                                placeholder="Search city, state, or station..." 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                                sx={{ minWidth: 300, '& .MuiOutlinedInput-root': { borderRadius: 10, bgcolor: '#f8f9fa' } }}
                                            />
                                            <Button variant="contained" onClick={handleSearch} sx={{ borderRadius: 10, bgcolor: primaryBlue, px: 3 }}>Search</Button>
                                        </Box>
                                    </Box>
                                    
                                    {/* Panel 1: National AQI Summary Bar */}
                                    {nationalSummary && (
                                        <Box sx={{ display: 'flex', gap: 1, p: 3, bgcolor: '#f1f5f9' }}>
                                            <Grid container spacing={2}>
                                                {[
                                                    { label: 'Total Stations', val: nationalSummary.overview.total_stations, color: primaryBlue },
                                                    { label: 'Cities Covered', val: nationalSummary.overview.total_cities, color: primaryBlue },
                                                    { label: 'States Covered', val: nationalSummary.overview.total_states, color: primaryBlue },
                                                    { label: 'Most Polluted City', val: nationalSummary.overview.highest_pollution_city, color: '#d32f2f' },
                                                    { label: 'Most Polluted State', val: nationalSummary.overview.highest_pollution_state, color: '#d32f2f' }
                                                ].map((stat, i) => (
                                                    <Grid item xs={6} md={2.4} key={i}>
                                                        <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase' }}>{stat.label}</Typography>
                                                            <Typography variant="h6" sx={{ fontWeight: 800, color: stat.color }}>{stat.val}</Typography>
                                                        </Paper>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    )}

                                    <Grid container spacing={0}>
                                        {/* Panel 2: India Pollution Map */}
                                        <Grid item xs={12} lg={8}>
                                            <Box sx={{ height: 600 }}>
                                                <NagpurHeatmap hotspots={nationalStations.map(s => ({
                                                    name: s.station,
                                                    city: s.city,
                                                    aqi: s.aqi,
                                                    status: s.status,
                                                    lat: s.latitude,
                                                    lon: s.longitude,
                                                    lastUpdate: s.last_update,
                                                    pollutant: s.dominant_pollutant
                                                }))} />
                                            </Box>
                                        </Grid>

                                        {/* Panel 3: Search Feature & AI Insights */}
                                        <Grid item xs={12} lg={4}>
                                            <Box sx={{ p: 3, bgcolor: '#fff', borderLeft: '1px solid #eee', height: 600, overflowY: 'auto' }}>
                                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 900, color: primaryBlue, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <SmartToyIcon fontSize="small" /> AI NATIONAL TREND DISCOVERY
                                                </Typography>
                                                {nationalSummary?.insights.map((insight, i) => (
                                                    <Paper key={i} elevation={0} sx={{ p: 2, mb: 1.5, bgcolor: '#f8fafc', borderLeft: `4px solid ${primaryBlue}`, borderRadius: '0 8px 8px 0' }}>
                                                        <Typography variant="body2" sx={{ lineHeight: 1.5, fontWeight: 500 }}>{insight}</Typography>
                                                    </Paper>
                                                ))}

                                                {searchResults.length > 0 && (
                                                    <Box sx={{ mt: 3, borderTop: '2px dashed #eee', pt: 2 }}>
                                                        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 900, color: orangeAccent }}>SEARCH RESULTS ({searchResults.length})</Typography>
                                                        {searchResults.map((res, i) => (
                                                            <Paper key={i} elevation={0} sx={{ p: 1.5, mb: 1.5, border: '1px solid #f0f0f0', borderRadius: 2, '&:hover': { bgcolor: '#fefefe', borderColor: orangeAccent } }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 'bold', color: primaryBlue }}>{res.city}, {res.state}</Typography>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{res.station}</Typography>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
                                                                    <Typography variant="caption">AVG AQI: <strong style={{color: res.color}}>{res.aqi}</strong></Typography>
                                                                    <Chip size="small" label={res.dominant_pollutant} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 900 }} />
                                                                </Box>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', display: 'block', mt: 0.5 }}>Coords: {res.latitude}, {res.longitude}</Typography>
                                                            </Paper>
                                                        ))}
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* 6. Analytics Section (Charts) */}
                            <Grid item>
                                <Paper sx={portalCardStyle}>
                                    <Box sx={portalHeaderStyle}>
                                        <ReportProblemIcon />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Analytical Intelligence Overview</Typography>
                                    </Box>
                                    <Grid container sx={{ p: 3 }} spacing={4}>
                                        <Grid item xs={12} lg={6}>
                                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: 'text.secondary' }}>COMPLAINTS BY CATEGORY</Typography>
                                            <Box sx={{ height: 250 }}>
                                                <Bar data={complaintsChartData} options={chartOptions} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: 'text.secondary' }}>CITY AQI TREND (24H)</Typography>
                                            <Box sx={{ height: 250 }}>
                                                <Line data={pollutionTrendsData} options={chartOptions} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
