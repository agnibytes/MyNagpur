'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, Button, Alert,
    Card, CardContent, CircularProgress, LinearProgress, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Tooltip, Badge
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Simulated live data
const generateLiveData = () => ({
    timestamp: new Date().toLocaleTimeString('en-IN'),
    visitors: Math.floor(1200 + Math.random() * 300),
    activeComplaints: Math.floor(45 + Math.random() * 20),
    resolvedToday: Math.floor(12 + Math.random() * 8),
    revenueToday: Math.floor(75000 + Math.random() * 25000),
    waterSupplyStatus: Math.random() > 0.1 ? 'normal' : 'disrupted',
    streetlightsActive: Math.floor(95 + Math.random() * 5),
    pendingApplications: Math.floor(28 + Math.random() * 15)
});

// Ward-wise performance data
const wardData = [
    { ward: 1, complaints: 12, resolved: 8, revenue: 125000, status: 'good' },
    { ward: 2, complaints: 8, resolved: 7, revenue: 98000, status: 'good' },
    { ward: 3, complaints: 15, resolved: 6, revenue: 112000, status: 'warning' },
    { ward: 4, complaints: 22, resolved: 10, revenue: 145000, status: 'critical' },
    { ward: 5, complaints: 6, resolved: 5, revenue: 78000, status: 'good' },
    { ward: 6, complaints: 18, resolved: 12, revenue: 134000, status: 'warning' },
    { ward: 7, complaints: 9, resolved: 8, revenue: 89000, status: 'good' },
    { ward: 8, complaints: 11, resolved: 9, revenue: 102000, status: 'good' },
    { ward: 9, complaints: 25, resolved: 8, revenue: 156000, status: 'critical' },
    { ward: 10, complaints: 7, resolved: 6, revenue: 67000, status: 'good' },
    { ward: 11, complaints: 14, resolved: 11, revenue: 118000, status: 'good' },
    { ward: 12, complaints: 10, resolved: 8, revenue: 94000, status: 'good' },
    { ward: 13, complaints: 16, resolved: 9, revenue: 128000, status: 'warning' }
];

// Anomaly alerts
const anomalyAlerts = [
    { id: 1, type: 'critical', message: 'Ward 4: Unusual spike in water complaints (+150%)', time: '2 min ago', icon: <WaterDropIcon /> },
    { id: 2, type: 'warning', message: 'Ward 9: Revenue collection 40% below target', time: '15 min ago', icon: <ReceiptIcon /> },
    { id: 3, type: 'critical', message: 'Streetlight failure detected: Main Road, Ward 6', time: '23 min ago', icon: <ElectricBoltIcon /> },
    { id: 4, type: 'info', message: 'System: AI model detected seasonal pattern shift', time: '1 hour ago', icon: <TrendingUpIcon /> },
    { id: 5, type: 'warning', message: 'Ward 3: SLA breach risk for 3 pending complaints', time: '1.5 hours ago', icon: <AccessTimeIcon /> }
];

// Recent incidents
const recentIncidents = [
    { id: 'GRV-012026-00142', type: 'Road Damage', ward: 4, status: 'in_progress', priority: 'high', assignee: 'Roads Dept' },
    { id: 'GRV-012026-00138', type: 'Water Leakage', ward: 9, status: 'assigned', priority: 'critical', assignee: 'Water Supply' },
    { id: 'GRV-012026-00135', type: 'Garbage Issue', ward: 3, status: 'in_progress', priority: 'medium', assignee: 'Sanitation' },
    { id: 'GRV-012026-00131', type: 'Street Light', ward: 6, status: 'assigned', priority: 'high', assignee: 'Electrical' },
    { id: 'GRV-012026-00128', type: 'Drainage', ward: 4, status: 'in_progress', priority: 'critical', assignee: 'Water Supply' }
];

const statusColors = { good: '#388e3c', warning: '#f57c00', critical: '#d32f2f' };
const priorityColors = { low: '#388e3c', medium: '#1976d2', high: '#f57c00', critical: '#d32f2f' };
const alertColors = { critical: '#ffebee', warning: '#fff3e0', info: '#e3f2fd' };
const alertBorders = { critical: '#d32f2f', warning: '#f57c00', info: '#1976d2' };

export default function CommandCenterPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liveData, setLiveData] = useState(generateLiveData());
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
        } else {
            const userData = JSON.parse(storedUser);
            if (userData.role === 'citizen') {
                router.push('/dashboard');
            } else {
                setUser(userData);
                setLoading(false);
            }
        }
    }, [router]);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveData(generateLiveData());
            setLastRefresh(new Date());
        }, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        setLiveData(generateLiveData());
        setLastRefresh(new Date());
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="flex flex-col" style={{ backgroundColor: '#0a1929', minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1a237e 0%, #0d1b3e 100%)',
                color: '#fff',
                py: 2,
                borderBottom: '3px solid #FF9933'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                                component={Link}
                                href="/nagpur-gov-dashboard"
                                startIcon={<ArrowBackIcon />}
                                sx={{ color: '#fff' }}
                            >
                                Back
                            </Button>
                            <DashboardIcon sx={{ fontSize: 36 }} />
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    UMRED NEXUS Command Center
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                    Real-time City Operations Dashboard
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                                icon={<AccessTimeIcon />}
                                label={`Last updated: ${liveData.timestamp}`}
                                sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                            />
                            <Badge badgeContent={anomalyAlerts.filter(a => a.type === 'critical').length} color="error">
                                <NotificationsActiveIcon />
                            </Badge>
                            <IconButton onClick={handleRefresh} sx={{ color: '#fff' }}>
                                <RefreshIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ py: 3 }}>
                {/* Live Metrics Row */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                        { label: 'Active Users', value: liveData.visitors, icon: <PeopleIcon />, color: '#4caf50', trend: '+12%' },
                        { label: 'Open Complaints', value: liveData.activeComplaints, icon: <ReportProblemIcon />, color: '#ff9800', trend: '-5%' },
                        { label: 'Resolved Today', value: liveData.resolvedToday, icon: <CheckCircleIcon />, color: '#2196f3', trend: '+18%' },
                        { label: 'Revenue Today', value: `₹${(liveData.revenueToday / 1000).toFixed(0)}K`, icon: <ReceiptIcon />, color: '#9c27b0', trend: '+8%' },
                        { label: 'Pending Apps', value: liveData.pendingApplications, icon: <AccessTimeIcon />, color: '#00bcd4', trend: '-3%' },
                        { label: 'Streetlights', value: `${liveData.streetlightsActive}%`, icon: <ElectricBoltIcon />, color: '#ffc107', trend: 'stable' }
                    ].map((metric, i) => (
                        <Grid item xs={6} sm={4} md={2} key={i}>
                            <Card sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Box sx={{ color: metric.color }}>{metric.icon}</Box>
                                        <Typography variant="caption" sx={{ color: '#8892b0' }}>{metric.label}</Typography>
                                    </Box>
                                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                        {metric.value}
                                    </Typography>
                                    <Chip
                                        size="small"
                                        label={metric.trend}
                                        icon={metric.trend.startsWith('+') ? <TrendingUpIcon /> : metric.trend.startsWith('-') ? <TrendingDownIcon /> : null}
                                        sx={{
                                            mt: 0.5,
                                            bgcolor: metric.trend.startsWith('+') ? 'rgba(76,175,80,0.2)' : metric.trend.startsWith('-') ? 'rgba(244,67,54,0.2)' : 'rgba(158,158,158,0.2)',
                                            color: metric.trend.startsWith('+') ? '#4caf50' : metric.trend.startsWith('-') ? '#f44336' : '#9e9e9e',
                                            fontSize: '0.7rem'
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {/* Anomaly Alerts */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2, height: '100%' }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <WarningIcon sx={{ color: '#f44336' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    AI Anomaly Alerts
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, maxHeight: 350, overflow: 'auto' }}>
                                {anomalyAlerts.map((alert) => (
                                    <Box
                                        key={alert.id}
                                        sx={{
                                            p: 1.5,
                                            mb: 1.5,
                                            bgcolor: alertColors[alert.type],
                                            borderLeft: `4px solid ${alertBorders[alert.type]}`,
                                            borderRadius: 1
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                            <Box sx={{ color: alertBorders[alert.type], mt: 0.3 }}>{alert.icon}</Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                                                    {alert.message}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#666' }}>
                                                    {alert.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Ward Performance Map */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2, height: '100%' }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon sx={{ color: '#4caf50' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Ward Performance
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={1}>
                                    {wardData.map((ward) => (
                                        <Grid item xs={4} key={ward.ward}>
                                            <Tooltip title={`Complaints: ${ward.complaints} | Resolved: ${ward.resolved} | Revenue: ₹${(ward.revenue / 1000).toFixed(0)}K`}>
                                                <Box sx={{
                                                    p: 1,
                                                    textAlign: 'center',
                                                    bgcolor: statusColors[ward.status] + '20',
                                                    border: `2px solid ${statusColors[ward.status]}`,
                                                    borderRadius: 1,
                                                    cursor: 'pointer',
                                                    '&:hover': { bgcolor: statusColors[ward.status] + '40' }
                                                }}>
                                                    <Typography variant="caption" sx={{ color: '#8892b0' }}>Ward</Typography>
                                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                                        {ward.ward}
                                                    </Typography>
                                                    <Chip
                                                        size="small"
                                                        label={ward.complaints}
                                                        sx={{ bgcolor: statusColors[ward.status], color: '#fff', fontSize: '0.65rem', height: 18 }}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    {['good', 'warning', 'critical'].map((status) => (
                                        <Box key={status} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: statusColors[status] }} />
                                            <Typography variant="caption" sx={{ color: '#8892b0', textTransform: 'capitalize' }}>{status}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Active Incidents */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2, height: '100%' }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ReportProblemIcon sx={{ color: '#ff9800' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Active Incidents
                                </Typography>
                            </Box>
                            <TableContainer sx={{ maxHeight: 350 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>ID</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Type</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Priority</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentIncidents.map((incident) => (
                                            <TableRow key={incident.id} hover sx={{ '&:hover': { bgcolor: '#1e3a5f' } }}>
                                                <TableCell sx={{ color: '#ccd6f6', borderColor: '#1e3a5f', fontSize: '0.75rem' }}>
                                                    {incident.id.slice(-5)}
                                                </TableCell>
                                                <TableCell sx={{ color: '#fff', borderColor: '#1e3a5f' }}>
                                                    <Box>
                                                        <Typography variant="body2">{incident.type}</Typography>
                                                        <Typography variant="caption" sx={{ color: '#8892b0' }}>Ward {incident.ward}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Chip
                                                        size="small"
                                                        label={incident.priority}
                                                        sx={{
                                                            bgcolor: priorityColors[incident.priority] + '30',
                                                            color: priorityColors[incident.priority],
                                                            fontWeight: 'bold',
                                                            fontSize: '0.65rem'
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>

                {/* System Status */}
                <Paper sx={{ mt: 3, p: 2, bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#8892b0', mb: 1 }}>System Status</Typography>
                    <Grid container spacing={2}>
                        {[
                            { name: 'API Server', status: 'online', load: 34 },
                            { name: 'Database', status: 'online', load: 42 },
                            { name: 'AI Engine', status: 'online', load: 67 },
                            { name: 'Payment Gateway', status: 'online', load: 12 },
                            { name: 'SMS Service', status: 'online', load: 8 }
                        ].map((sys, i) => (
                            <Grid item xs={6} sm={4} md={2.4} key={i}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 16 }} />
                                    <Typography variant="body2" sx={{ color: '#fff' }}>{sys.name}</Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={sys.load}
                                    sx={{
                                        mt: 0.5,
                                        bgcolor: '#1e3a5f',
                                        '& .MuiLinearProgress-bar': { bgcolor: sys.load > 80 ? '#f44336' : sys.load > 50 ? '#ff9800' : '#4caf50' }
                                    }}
                                />
                                <Typography variant="caption" sx={{ color: '#8892b0' }}>{sys.load}% load</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
