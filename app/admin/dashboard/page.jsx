'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Grid, Paper, Typography, Box, Button, Divider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Card, CardContent, LinearProgress, Avatar, IconButton,
    Switch, Alert, List, ListItem, ListItemText, ListItemIcon,
    CircularProgress, Skeleton, Snackbar
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import CloudIcon from '@mui/icons-material/Cloud';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import BugReportIcon from '@mui/icons-material/BugReport';
import SpeedIcon from '@mui/icons-material/Speed';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import TerminalIcon from '@mui/icons-material/Terminal';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [lastRefresh, setLastRefresh] = useState(null);

    // Real data states
    const [systemHealth, setSystemHealth] = useState({
        status: 'Loading...',
        uptime: '-',
        nodeVersion: '-',
        mongoVersion: '-',
        environment: '-',
    });

    const [serverMetrics, setServerMetrics] = useState([
        { label: 'CPU Usage', value: 0, unit: '%', status: 'healthy', icon: <MemoryIcon /> },
        { label: 'Memory Usage', value: 0, unit: '%', status: 'healthy', icon: <StorageIcon /> },
        { label: 'Disk Usage', value: 0, unit: '%', status: 'healthy', icon: <CloudIcon /> },
        { label: 'Network I/O', value: 0, unit: 'MB/s', status: 'healthy', icon: <SpeedIcon /> },
    ]);

    const [userStats, setUserStats] = useState({
        total: 0,
        citizens: 0,
        officials: 0,
        admins: 0,
        newToday: 0,
        newThisWeek: 0,
        activeNow: 0,
    });

    const [databaseStats, setDatabaseStats] = useState({
        collections: [],
        totalSize: '-',
        connections: 0,
        lastBackup: '-',
    });

    // Real API Metrics State
    const [apiMetricsReal, setApiMetricsReal] = useState({
        totalRequests: { today: 0, week: 0, month: 0 },
        avgResponseTime: '0ms',
        successRate: 100,
        endpoints: []
    });

    const [actionLoading, setActionLoading] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [activityLogs, setActivityLogs] = useState([]);

    // Auth Check
    useEffect(() => {
        const storedUser = localStorage.getItem('adminUserInfo');
        if (!storedUser) {
            router.push('/admin');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('adminUserInfo');
        router.push('/admin');
    };

    // Fetch system stats
    const fetchSystemStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/stats/system`);
            const data = await res.json();
            if (data.success) {
                setSystemHealth({
                    status: data.data.status,
                    uptime: data.data.systemInfo.uptime,
                    nodeVersion: data.data.systemInfo.nodeVersion,
                    mongoVersion: data.data.systemInfo.mongoVersion,
                    environment: data.data.systemInfo.environment,
                });
                setServerMetrics([
                    { label: 'CPU Usage', value: data.data.metrics[0].value, unit: '%', status: data.data.metrics[0].status, icon: <MemoryIcon /> },
                    { label: 'Memory Usage', value: data.data.metrics[1].value, unit: '%', status: data.data.metrics[1].status, icon: <StorageIcon /> },
                    { label: 'Disk Usage', value: data.data.metrics[2].value, unit: '%', status: data.data.metrics[2].status, icon: <CloudIcon /> },
                    { label: 'Network I/O', value: data.data.metrics[3].value, unit: 'MB/s', status: data.data.metrics[3].status, icon: <SpeedIcon /> },
                ]);
            }
        } catch (err) {
            console.error('Error fetching system stats:', err);
        }
    };

    const fetchActivityLogs = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/admin/logs`);
            const data = await res.json();
            if (data.success) {
                setActivityLogs(data.activityLogs || []);
            }
        } catch (err) {
            console.error('Error fetching activity logs:', err);
        }
    };

    // Fetch user stats
    const fetchUserStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/stats/users`);
            const data = await res.json();
            if (data.success) {
                setUserStats(data.data);
            }
        } catch (err) {
            console.error('Error fetching user stats:', err);
        }
    };

    // Fetch database stats
    const fetchDatabaseStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/stats/database`);
            const data = await res.json();
            if (data.success) {
                setDatabaseStats({
                    collections: data.data.collections,
                    totalSize: data.data.totalSize,
                    connections: data.data.connections,
                    lastBackup: data.data.lastBackup,
                });
            }
        } catch (err) {
            console.error('Error fetching database stats:', err);
        }
    };

    // Fetch API Performance
    const fetchApiPerformance = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/admin/performance`);
            const data = await res.json();
            if (data.success) {
                setApiMetricsReal(data.data);
            }
        } catch (err) {
            console.error('Error fetching API performance:', err);
        }
    };

    // Quick Action Handler
    const handleQuickAction = async (actionId, endpoint, label) => {
        if (actionLoading) return;
        setActionLoading(actionId);

        try {
            const res = await fetch(`${API_BASE}/api/admin/${endpoint}`, { method: 'POST' });
            const data = await res.json();

            setNotification({
                open: true,
                message: data.message || `${label} executed successfully`,
                severity: data.success ? 'success' : 'error'
            });

            // Refresh stats if relevant
            if (endpoint === 'clear-cache' || endpoint === 'trigger-backup') {
                fetchAllData(true);
            }

        } catch (err) {
            setNotification({
                open: true,
                message: `Failed to execute ${label}`,
                severity: 'error'
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleViewLogs = async () => {
        setActionLoading('logs');
        try {
            const res = await fetch(`${API_BASE}/api/admin/logs`);
            const data = await res.json();
            if (data.success) {
                console.log('Server Logs:', data.logs);
                setNotification({
                    open: true,
                    message: `fetched ${data.logs.length} log lines. Check browser console.`,
                    severity: 'info'
                });
            }
        } catch (err) {
            setNotification({ open: true, message: 'Failed to fetch logs', severity: 'error' });
        } finally {
            setActionLoading(null);
        }
    };

    // Fetch all data
    const fetchAllData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setError(null);

        try {
            await Promise.all([
                fetchSystemStats(),
                fetchUserStats(),
                fetchDatabaseStats(),
                fetchApiPerformance(),
                fetchActivityLogs()
            ]);
            setLastRefresh(new Date());
        } catch (err) {
            setError('Failed to fetch some data. Retrying...');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Initial load and auto-refresh every 1 second for sensitive monitoring
    useEffect(() => {
        if (localStorage.getItem('adminUserInfo')) {
            fetchAllData();
            const interval = setInterval(() => fetchAllData(true), 1000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getMetricColor = (value, type = 'percent') => {
        if (type === 'percent') {
            if (value < 50) return '#388e3c';
            if (value < 80) return '#FF9933';
            return '#d32f2f';
        }
        return '#1a4e8e';
    };

    const quickActions = [
        { id: 'cache', label: 'Clear Cache', icon: <DeleteSweepIcon />, color: '#d32f2f', action: () => handleQuickAction('cache', 'clear-cache', 'Clear Cache') },
        { id: 'backup', label: 'Trigger Backup', icon: <BackupIcon />, color: '#388e3c', action: () => handleQuickAction('backup', 'trigger-backup', 'Backup') },
        { id: 'restart', label: 'Restart Server', icon: <RestartAltIcon />, color: '#FF9933', action: () => handleQuickAction('restart', 'restart-server', 'Restart') },
        { id: 'logs', label: 'View Logs', icon: <TerminalIcon />, color: '#1a4e8e', action: handleViewLogs },
        { id: 'notify', label: 'Send Notification', icon: <NotificationsIcon />, color: '#7b1fa2', action: () => handleQuickAction('notify', 'send-notification', 'Notification') },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon />, color: '#666', action: () => setNotification({ open: true, message: 'Settings panel coming soon', severity: 'info' }) },
    ];

    // Show loading state
    if (loading && !user) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ color: '#4caf50', mb: 2 }} />
                    <Typography sx={{ color: '#fff' }}>Verifying Access...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
            {/* Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)',
                color: '#fff',
                py: 2,
                borderBottom: '2px solid #333'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#d32f2f', width: 48, height: 48 }}>
                                <AdminPanelSettingsIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {user?.name || 'Admin'} Dashboard
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888' }}>
                                    System Monitoring & Maintenance Panel
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                                icon={<CheckCircleIcon sx={{ color: '#4caf50 !important' }} />}
                                label={systemHealth.status}
                                sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', fontWeight: 'bold', border: '1px solid #4caf50' }}
                            />

                            <Chip
                                label="● LIVE"
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(76, 175, 80, 0.2)',
                                    color: '#4caf50',
                                    fontWeight: 'bold',
                                    border: '1px solid #4caf50',
                                    animation: 'pulse 1s infinite',
                                    '@keyframes pulse': {
                                        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                        '50%': { opacity: 0.7, transform: 'scale(1.05)' }
                                    }
                                }}
                            />

                            <Chip
                                label={user?.role === 'super_admin' ? 'SUPER ADMIN' : 'SYSTEM ADMIN'}
                                sx={{ bgcolor: user?.role === 'super_admin' ? '#d32f2f' : '#138808', color: '#fff' }}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                                sx={{ color: '#888', borderColor: '#444' }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Grid container spacing={3}>

                    {/* System Status */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CodeIcon sx={{ color: '#4caf50' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>System Status</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {serverMetrics.map((metric, i) => (
                                        <Grid item xs={6} sm={3} key={i}>
                                            <Box sx={{
                                                textAlign: 'center',
                                                p: 2,
                                                bgcolor: '#252525',
                                                borderRadius: 1,
                                                transition: 'all 0.3s ease-in-out',
                                                border: '1px solid transparent',
                                                '&:hover': {
                                                    bgcolor: '#2a2a2a',
                                                    borderColor: getMetricColor(metric.value),
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}>
                                                <Avatar sx={{
                                                    bgcolor: 'transparent',
                                                    color: getMetricColor(metric.value),
                                                    width: 40,
                                                    height: 40,
                                                    margin: '0 auto',
                                                    mb: 1,
                                                    transition: 'all 0.3s ease-in-out'
                                                }}>
                                                    {metric.icon}
                                                </Avatar>
                                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: getMetricColor(metric.value) }}>
                                                    {metric.value}{metric.unit}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#888' }}>{metric.label}</Typography>
                                                <Typography variant="caption" display="block" sx={{ color: metric.status === 'healthy' ? '#4caf50' : '#d32f2f', mt: 0.5 }}>
                                                    ● {metric.status}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>

                        {/* User Statistics Row */}
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PeopleIcon sx={{ color: '#2196f3' }} />
                                            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>User Statistics</Typography>
                                        </Box>
                                        <Chip label="Total Users" size="small" sx={{ bgcolor: '#2196f3', color: '#fff' }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                                        <Box>
                                            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>{userStats.citizens}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Citizens</Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#333' }} />
                                        <Box>
                                            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>{userStats.officials}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Officials</Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#333' }} />
                                        <Box>
                                            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>{userStats.admins}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Admins</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ p: 2, bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <TrendingUpIcon sx={{ color: '#ff9800' }} />
                                            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>Growth</Typography>
                                        </Box>
                                        <Chip label="This Week" size="small" sx={{ bgcolor: '#ff9800', color: '#fff' }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                                        <Box>
                                            <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>+{userStats.newToday}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>New Today</Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#333' }} />
                                        <Box>
                                            <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 'bold' }}>+{userStats.newThisWeek}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>New This Week</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Quick Actions (Use 4 columns to match simplified layout from feedback if needed, but keeping 6 Grid for now) */}
                    <Grid item xs={12} lg={4}>
                        <Paper sx={{ p: 0, bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2, height: '100%' }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SettingsIcon sx={{ color: '#fff' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>Quick Actions</Typography>
                            </Box>
                            <Grid container spacing={1} sx={{ p: 2 }}>
                                {quickActions.map((action) => (
                                    <Grid item xs={6} key={action.id}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={action.action}
                                            disabled={actionLoading !== null}
                                            sx={{
                                                flexDirection: 'column',
                                                py: 2,
                                                color: action.color,
                                                borderColor: action.color + '40',
                                                bgcolor: action.color + '05',
                                                '&:hover': {
                                                    bgcolor: action.color + '15',
                                                    borderColor: action.color
                                                },
                                                opacity: actionLoading && actionLoading !== action.id ? 0.5 : 1
                                            }}
                                        >
                                            {actionLoading === action.id ? <CircularProgress size={24} sx={{ color: action.color }} /> : action.icon}
                                            <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 'bold' }}>{action.label}</Typography>
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* API Performance */}
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon sx={{ color: '#7b1fa2' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>API Performance</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>{apiMetricsReal.totalRequests.today.toLocaleString()}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Today</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>{apiMetricsReal.avgResponseTime}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Avg Time</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{apiMetricsReal.successRate}%</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Success</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                {apiMetricsReal.endpoints.map((ep, i) => (
                                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #333' }}>
                                        <Typography variant="caption" sx={{ color: '#fff', fontFamily: 'monospace' }}>{ep.method} {ep.path}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="caption" sx={{ color: '#888' }}>{ep.avgTime}</Typography>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: ep.status === 'healthy' ? '#4caf50' : '#FF9933' }} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Recent Activity Logs */}
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeIcon sx={{ color: '#FF9933' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>Recent Activity Logs</Typography>
                            </Box>
                            <Box sx={{ p: 0 }}>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: '#888', borderColor: '#333' }}>Time</TableCell>
                                                <TableCell sx={{ color: '#888', borderColor: '#333' }}>User/IP</TableCell>
                                                <TableCell sx={{ color: '#888', borderColor: '#333' }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {activityLogs.length > 0 ? activityLogs.map((log) => (
                                                <TableRow key={log.id} hover sx={{ '&:hover': { bgcolor: '#252525' } }}>
                                                    <TableCell sx={{ color: '#fff', borderColor: '#333', fontFamily: 'monospace' }}>{log.time}</TableCell>
                                                    <TableCell sx={{ color: '#bbb', borderColor: '#333' }}>{log.user}</TableCell>
                                                    <TableCell sx={{ borderColor: '#333' }}>
                                                        <Chip
                                                            label={log.action}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: log.status === 'Success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                                                                color: log.status === 'Success' ? '#4caf50' : '#d32f2f',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan={3} sx={{ color: '#666', textAlign: 'center', py: 3, borderColor: '#333' }}>
                                                        No recent activity detected
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ bgcolor: '#0a0a0a', borderTop: '1px solid #333', color: '#666', py: 2, mt: 4, textAlign: 'center' }}>
                <Typography variant="body2">
                    Admin Dashboard v1.1.0 | Majha Umred Project | Developer Access Only
                </Typography>
                {/* Notification Snackbar */}
                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={() => setNotification({ ...notification, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setNotification({ ...notification, open: false })}
                        severity={notification.severity}
                        sx={{ width: '100%', bgcolor: '#1e1e1e', color: '#fff', border: '1px solid #333' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}
