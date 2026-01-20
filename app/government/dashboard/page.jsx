'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, Typography, Box, Grid, Card, CardContent,
    Button, Chip, LinearProgress, Divider, Alert, Tab, Tabs
} from '@mui/material';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideocamIcon from '@mui/icons-material/Videocam';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SettingsIcon from '@mui/icons-material/Settings';

// Dynamic imports for client-side only components
const CCTVMonitor = dynamic(() => import('../../components/CCTVMonitor'), { ssr: false });
const UmredInfrastructureMap = dynamic(() => import('../../components/UmredInfrastructureMap'), { ssr: false });

export default function GovernmentDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('govtUserInfo');
        if (!storedUser) {
            router.push('/government');
            return;
        }
        setUser(JSON.parse(storedUser));
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('govtUserInfo');
        router.push('/government');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <LinearProgress sx={{ width: 200 }} />
            </Box>
        );
    }

    const stats = [
        { label: 'Total Complaints', value: 1234, icon: <ReportProblemIcon />, color: '#f57c00' },
        { label: 'Resolved', value: 1089, icon: <CheckCircleIcon />, color: '#388e3c' },
        { label: 'Pending', value: 145, icon: <PendingIcon />, color: '#d32f2f' },
        { label: 'Active Citizens', value: 12450, icon: <GroupIcon />, color: '#1565c0' },
    ];

    // Updated quick actions with government-specific links
    const quickActions = [
        { label: 'View All Complaints', href: '/government/complaints', color: '#f57c00', icon: <ReportProblemIcon /> },
        { label: 'Ward Performance', href: '/umred-gov-dashboard', color: '#1565c0', icon: <DashboardIcon /> },
        { label: 'Citizen Database', href: '/government/citizens', color: '#388e3c', icon: <PersonSearchIcon /> },
        { label: 'Reports & Analytics', href: '/government/reports', color: '#7b1fa2', icon: <AnalyticsIcon /> },
    ];

    // Additional quick actions
    const additionalActions = [
        { label: 'CCTV Monitoring', href: '#cctv', color: '#d32f2f', icon: <VideocamIcon />, isAnchor: true },
        { label: 'Infrastructure Map', href: '#map', color: '#0288d1', icon: <MapIcon />, isAnchor: true },
        { label: 'Command Center', href: '/command-center', color: '#512da8', icon: <SettingsIcon /> },
    ];

    const handleAnchorClick = (anchor) => {
        const element = document.querySelector(anchor);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            {/* Header */}
            <Box sx={{ bgcolor: '#1a4e8e', py: 2, borderBottom: '4px solid #FF9933' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#fff' }}>
                            <AccountBalanceIcon sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Government Portal</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>Umred Nagar Parishad</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip label={user?.email} sx={{ bgcolor: '#fff', color: '#1a4e8e' }} />
                            <Button
                                variant="outlined"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                                sx={{ color: '#fff', borderColor: '#fff' }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1a4e8e' }}>
                    Welcome, {user?.name || 'Government Official'}
                </Typography>

                {/* Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat, i) => (
                        <Grid item xs={6} md={3} key={i}>
                            <Card sx={{ borderTop: `4px solid ${stat.color}` }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>{stat.value.toLocaleString()}</Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>{stat.label}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Quick Actions */}
                <Paper sx={{ p: 3, mb: 4, boxShadow: 4, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AssignmentIcon sx={{ color: '#1a4e8e' }} />
                        Quick Actions
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    {/* Primary Quick Actions */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {quickActions.map((action, i) => (
                            <Grid item xs={6} md={3} key={i}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    component={Link}
                                    href={action.href}
                                    startIcon={action.icon}
                                    sx={{
                                        py: 2,
                                        px: 2,
                                        color: action.color,
                                        borderColor: action.color,
                                        borderWidth: 2,
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        boxShadow: `0 4px 12px ${action.color}20`,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            bgcolor: action.color,
                                            color: '#fff',
                                            borderColor: action.color,
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 8px 24px ${action.color}40`,
                                        }
                                    }}
                                >
                                    {action.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Featured Actions with Gradients */}
                    <Typography variant="subtitle2" sx={{ mb: 2, color: '#666', fontWeight: 600 }}>
                        Featured Services
                    </Typography>
                    <Grid container spacing={2}>
                        {additionalActions.map((action, i) => (
                            <Grid item xs={12} md={4} key={i}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    component={action.isAnchor ? 'button' : Link}
                                    href={action.isAnchor ? undefined : action.href}
                                    onClick={action.isAnchor ? () => handleAnchorClick(action.href) : undefined}
                                    startIcon={action.icon}
                                    sx={{
                                        py: 2,
                                        px: 3,
                                        background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                                        color: '#fff',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        boxShadow: `0 6px 20px ${action.color}40`,
                                        border: 'none',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: '-100%',
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                            transition: 'left 0.5s',
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 12px 32px ${action.color}60`,
                                            '&::before': {
                                                left: '100%',
                                            }
                                        }
                                    }}
                                >
                                    {action.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Tabs for Dashboard Sections */}
                <Paper sx={{ mb: 4 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, v) => setActiveTab(v)}
                        sx={{
                            borderBottom: '2px solid #eee',
                            '& .MuiTab-root': { fontWeight: 'bold' }
                        }}
                    >
                        <Tab icon={<VideocamIcon />} label="CCTV Monitoring" iconPosition="start" />
                        <Tab icon={<MapIcon />} label="Infrastructure Map" iconPosition="start" />
                    </Tabs>

                    <Box sx={{ p: 2 }}>
                        {activeTab === 0 && (
                            <Box id="cctv">
                                <CCTVMonitor />
                            </Box>
                        )}
                        {activeTab === 1 && (
                            <Box id="map">
                                <UmredInfrastructureMap />
                            </Box>
                        )}
                    </Box>
                </Paper>

                {/* Alert Section */}
                <Paper sx={{ p: 3, mb: 4, bgcolor: '#fff3e0', border: '1px solid #ffe0b2' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#e65100' }}>
                        ⚠️ System Alerts
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Alert severity="warning" sx={{ mb: 1 }}>
                                Ward 4: 5 pending complaints exceed SLA threshold
                            </Alert>
                            <Alert severity="info" sx={{ mb: 1 }}>
                                Scheduled maintenance: Water supply Ward 9 - Tomorrow 10AM-2PM
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Alert severity="error" sx={{ mb: 1 }}>
                                Street light #7 (Ward 3) - Requires maintenance
                            </Alert>
                            <Alert severity="success">
                                Revenue collection: Target achieved for current month
                            </Alert>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

            {/* Footer */}
            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', py: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                    © 2026 Umred Nagar Parishad | Government Dashboard | For Official Use Only
                </Typography>
            </Box>
        </Box>
    );
}
