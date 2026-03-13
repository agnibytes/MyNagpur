'use client';

import { useState } from 'react';
import {
    Container, Grid, Paper, Typography, Box, Button, Divider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Card, CardContent, LinearProgress, Avatar, IconButton,
    Tab, Tabs, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ConstructionIcon from '@mui/icons-material/Construction';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import dynamic from 'next/dynamic';

// New AI Components with dynamic import to prevent SSR issues
const AiInsightsPanel = dynamic(() => import('../components/ai/AiInsightsPanel'), { ssr: false });
const NagpurHeatmap = dynamic(() => import('../components/ai/NagpurHeatmap'), { ssr: false });
const PredictionDashboard = dynamic(() => import('../components/ai/PredictionDashboard'), { ssr: false });

export default function NagpurGovDashboard() {
    const [selectedWard, setSelectedWard] = useState('all');
    const [tabValue, setTabValue] = useState(0);

    // Mock data for demonstration
    const overviewStats = [
        { label: 'Total Citizens', value: '12,456', icon: <PeopleIcon />, color: '#1a4e8e', trend: '+234 this month' },
        { label: 'Active Complaints', value: '89', icon: <ReportProblemIcon />, color: '#d32f2f', trend: '-12 from yesterday' },
        { label: 'Resolved This Month', value: '342', icon: <CheckCircleIcon />, color: '#388e3c', trend: '+28%' },
        { label: 'Revenue Collected', value: '₹18.5L', icon: <AccountBalanceWalletIcon />, color: '#FF9933', trend: '+15% vs last month' },
    ];

    const wardPerformance = [
        { ward: 1, score: 92, complaints: 12, resolved: 10, revenue: '₹1.8L', status: 'Excellent' },
        { ward: 2, score: 88, complaints: 18, resolved: 15, revenue: '₹1.5L', status: 'Good' },
        { ward: 3, score: 95, complaints: 8, resolved: 8, revenue: '₹2.1L', status: 'Excellent' },
        { ward: 4, score: 78, complaints: 25, resolved: 18, revenue: '₹1.2L', status: 'Needs Attention' },
        { ward: 5, score: 85, complaints: 15, resolved: 12, revenue: '₹1.6L', status: 'Good' },
        { ward: 6, score: 91, complaints: 10, resolved: 9, revenue: '₹1.9L', status: 'Excellent' },
        { ward: 7, score: 82, complaints: 20, resolved: 16, revenue: '₹1.4L', status: 'Good' },
        { ward: 8, score: 75, complaints: 28, resolved: 20, revenue: '₹1.1L', status: 'Needs Attention' },
        { ward: 9, score: 89, complaints: 14, resolved: 12, revenue: '₹1.7L', status: 'Good' },
        { ward: 10, score: 93, complaints: 9, resolved: 9, revenue: '₹2.0L', status: 'Excellent' },
        { ward: 11, score: 86, complaints: 16, resolved: 13, revenue: '₹1.5L', status: 'Good' },
        { ward: 12, score: 80, complaints: 22, resolved: 17, revenue: '₹1.3L', status: 'Good' },
        { ward: 13, score: 90, complaints: 11, resolved: 10, revenue: '₹1.8L', status: 'Excellent' },
    ];

    const recentComplaints = [
        { id: 'CMP/2026/1234', type: 'Water Supply', ward: 4, date: '15 Jan 2026', status: 'Pending', priority: 'High' },
        { id: 'CMP/2026/1233', type: 'Street Light', ward: 8, date: '15 Jan 2026', status: 'In Progress', priority: 'Medium' },
        { id: 'CMP/2026/1232', type: 'Garbage Collection', ward: 2, date: '14 Jan 2026', status: 'Pending', priority: 'High' },
        { id: 'CMP/2026/1231', type: 'Road Repair', ward: 5, date: '14 Jan 2026', status: 'Resolved', priority: 'Low' },
        { id: 'CMP/2026/1230', type: 'Drainage', ward: 4, date: '14 Jan 2026', status: 'In Progress', priority: 'High' },
        { id: 'CMP/2026/1229', type: 'Water Supply', ward: 8, date: '13 Jan 2026', status: 'Pending', priority: 'Medium' },
    ];

    const serviceMetrics = [
        { service: 'Water Supply', availability: 94, complaints: 23, resolved: 18, icon: <WaterDropIcon /> },
        { service: 'Sanitation', availability: 89, complaints: 34, resolved: 28, icon: <CleaningServicesIcon /> },
        { service: 'Street Lighting', availability: 96, complaints: 15, resolved: 14, icon: <LightbulbIcon /> },
        { service: 'Road Maintenance', availability: 82, complaints: 42, resolved: 31, icon: <ConstructionIcon /> },
    ];

    const recentActivities = [
        { type: 'registration', text: 'New citizen registered from Ward 5', time: '10 mins ago' },
        { type: 'complaint', text: 'Complaint CMP/2026/1234 escalated to Supervisor', time: '25 mins ago' },
        { type: 'payment', text: 'Property Tax payment of ₹4,500 received', time: '1 hour ago' },
        { type: 'resolved', text: 'Complaint CMP/2026/1231 marked as resolved', time: '2 hours ago' },
        { type: 'registration', text: 'New citizen registered from Ward 3', time: '3 hours ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Excellent': return '#388e3c';
            case 'Good': return '#1a4e8e';
            case 'Needs Attention': return '#d32f2f';
            default: return '#666';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'error';
            case 'Medium': return 'warning';
            case 'Low': return 'success';
            default: return 'default';
        }
    };

    const getComplaintStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'success';
            case 'In Progress': return 'warning';
            case 'Pending': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            {/* Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 100%)',
                color: '#fff',
                py: 2,
                borderBottom: '4px solid #FF9933'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LocationCityIcon sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    Nagpur Municipal Corporation - Government Dashboard
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    नागपूर महानगरपालिका | Administrative Control Panel
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                startIcon={<RefreshIcon />}
                                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}
                                variant="outlined"
                                size="small"
                            >
                                Refresh Data
                            </Button>
                            <Button
                                startIcon={<DownloadIcon />}
                                sx={{ bgcolor: '#FF9933', color: '#000', '&:hover': { bgcolor: '#e68a00' } }}
                                variant="contained"
                                size="small"
                            >
                                Export Report
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Stats Overview */}
            <Box sx={{ bgcolor: '#fff', py: 2, borderBottom: '1px solid #ddd', boxShadow: 1 }}>
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        {overviewStats.map((stat, i) => (
                            <Grid item xs={6} sm={3} key={i}>
                                <Paper sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    borderLeft: `4px solid ${stat.color}`,
                                    borderRadius: 0,
                                    transition: '0.2s',
                                    '&:hover': { boxShadow: 3 }
                                }}>
                                    <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                                        {stat.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: stat.color }}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            {stat.label}
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block', color: stat.trend.includes('+') ? '#388e3c' : '#d32f2f', fontSize: '0.7rem' }}>
                                            {stat.trend}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Smart City AI Analytics Section */}
            <Container maxWidth="xl" sx={{ pt: 3, pb: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1a4e8e', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LightbulbIcon sx={{ color: '#FF9933' }}/> Smart City AI Analytics
                </Typography>
                <Grid container spacing={3}>
                    {/* Insights Panel (1/3 width) */}
                    <Grid item xs={12} lg={4}>
                        <AiInsightsPanel />
                    </Grid>
                    
                    {/* Prediction Dashboard (1/3 width) */}
                    <Grid item xs={12} lg={4}>
                        <PredictionDashboard />
                    </Grid>
                    
                    {/* Heatmap (1/3 width) */}
                    <Grid item xs={12} lg={4}>
                        <NagpurHeatmap />
                    </Grid>
                </Grid>
            </Container>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Grid container spacing={3}>

                    {/* Ward Performance Table */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DashboardIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ward-wise Performance</Typography>
                                </Box>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <Select
                                        value={selectedWard}
                                        onChange={(e) => setSelectedWard(e.target.value)}
                                        sx={{ bgcolor: '#fff', borderRadius: 0 }}
                                    >
                                        <MenuItem value="all">All Wards</MenuItem>
                                        {[...Array(136)].map((_, i) => (
                                            <MenuItem key={i + 1} value={i + 1}>Ward {i + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <TableContainer sx={{ maxHeight: 400 }}>
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Ward</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Complaints</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Resolved</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Revenue</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {wardPerformance
                                            .filter(w => selectedWard === 'all' || w.ward === selectedWard)
                                            .map((row) => (
                                                <TableRow key={row.ward} hover>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Ward {row.ward}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={row.score}
                                                                sx={{
                                                                    width: 60, height: 8, borderRadius: 4,
                                                                    bgcolor: '#e0e0e0',
                                                                    '& .MuiLinearProgress-bar': { bgcolor: getStatusColor(row.status) }
                                                                }}
                                                            />
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{row.score}%</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{row.complaints}</TableCell>
                                                    <TableCell sx={{ color: '#388e3c', fontWeight: 'bold' }}>{row.resolved}</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>{row.revenue}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={row.status}
                                                            size="small"
                                                            sx={{ bgcolor: getStatusColor(row.status), color: '#fff', fontWeight: 'bold', fontSize: '0.7rem' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton size="small" sx={{ color: '#1a4e8e' }}>
                                                            <VisibilityIcon fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Service Metrics */}
                    <Grid item xs={12} lg={4}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd', height: '100%' }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Service Delivery Metrics</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {serviceMetrics.map((service, i) => (
                                    <Box key={i} sx={{ mb: 2.5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#e8f4fc', color: '#1a4e8e' }}>
                                                {service.icon}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', flexGrow: 1 }}>{service.service}</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: service.availability >= 90 ? '#388e3c' : '#FF9933' }}>
                                                {service.availability}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={service.availability}
                                            sx={{
                                                height: 8, borderRadius: 4, bgcolor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': { bgcolor: service.availability >= 90 ? '#388e3c' : '#FF9933', borderRadius: 4 }
                                            }}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                            <Typography variant="caption" sx={{ color: '#666' }}>Complaints: {service.complaints}</Typography>
                                            <Typography variant="caption" sx={{ color: '#388e3c' }}>Resolved: {service.resolved}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Recent Complaints */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#b71c1c', color: '#fff', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ReportProblemIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Complaints</Typography>
                                </Box>
                                <Button size="small" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined">
                                    View All
                                </Button>
                            </Box>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Complaint ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Ward</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentComplaints.map((row) => (
                                            <TableRow key={row.id} hover>
                                                <TableCell sx={{ fontWeight: 500, color: '#1a4e8e' }}>{row.id}</TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>Ward {row.ward}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>
                                                    <Chip label={row.priority} size="small" color={getPriorityColor(row.priority)} variant="outlined" />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.status}
                                                        size="small"
                                                        color={getComplaintStatusColor(row.status)}
                                                        icon={row.status === 'Resolved' ? <CheckCircleIcon /> : <PendingIcon />}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Recent Activities */}
                    <Grid item xs={12} lg={4}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#138808', color: '#fff', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <NotificationsActiveIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Activities</Typography>
                            </Box>
                            <Box sx={{ p: 0 }}>
                                {recentActivities.map((activity, i) => (
                                    <Box key={i} sx={{ p: 2, borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none' } }}>
                                        <Typography variant="body2">{activity.text}</Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>{activity.time}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', py: 2, mt: 4, textAlign: 'center' }}>
                <Typography variant="body2">
                    © 2026 Nagpur Municipal Corporation | Government Dashboard | For Official Use Only
                </Typography>
            </Box>
        </Box>
    );
}
