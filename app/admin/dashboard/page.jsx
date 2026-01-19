'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, Typography, Box, Grid, Card, CardContent,
    Button, Chip, LinearProgress, Divider, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import Link from 'next/link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('adminUserInfo');
        if (!storedUser) {
            router.push('/admin');
            return;
        }
        setUser(JSON.parse(storedUser));
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('adminUserInfo');
        router.push('/admin');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#0d0d0d' }}>
                <LinearProgress sx={{ width: 200 }} color="success" />
            </Box>
        );
    }

    const systemStats = [
        { label: 'Server Status', value: 'Online', icon: <StorageIcon />, color: '#4caf50' },
        { label: 'Security', value: 'Secure', icon: <SecurityIcon />, color: '#2196f3' },
        { label: 'CPU Usage', value: '23%', icon: <SpeedIcon />, color: '#ff9800' },
        { label: 'Active Users', value: 156, icon: <PeopleIcon />, color: '#9c27b0' },
    ];

    const recentLogs = [
        { time: '17:05:32', user: 'govtadmin@umrednp.gov.in', action: 'Login Success', status: 'success' },
        { time: '17:02:15', user: 'sysadmin@umrednp.gov.in', action: 'Database Backup', status: 'success' },
        { time: '16:58:44', user: '192.168.1.45', action: 'Failed Login Attempt', status: 'error' },
        { time: '16:45:21', user: 'System', action: 'Auto Maintenance', status: 'info' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#0d0d0d' }}>
            {/* Header */}
            <Box sx={{ bgcolor: '#1a1a2e', py: 2, borderBottom: '2px solid #138808' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#fff' }}>
                            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: '#138808' }} />
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Admin Panel</Typography>
                                <Typography variant="caption" sx={{ color: '#888' }}>System Administration</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#fff' }}>
                    Welcome, {user?.name}
                </Typography>

                {/* System Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {systemStats.map((stat, i) => (
                        <Grid item xs={6} md={3} key={i}>
                            <Card sx={{ bgcolor: '#1a1a2e', border: `1px solid ${stat.color}40` }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: stat.color }}>{stat.value}</Typography>
                                    <Typography variant="body2" sx={{ color: '#888' }}>{stat.label}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {/* Quick Actions */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, bgcolor: '#1a1a2e' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
                                <SettingsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Quick Actions
                            </Typography>
                            <Divider sx={{ mb: 2, borderColor: '#333' }} />
                            <Grid container spacing={2}>
                                {[
                                    { label: 'User Management', color: '#2196f3' },
                                    { label: 'System Settings', color: '#ff9800' },
                                    { label: 'Database Backup', color: '#4caf50' },
                                    { label: 'View Logs', color: '#9c27b0' },
                                ].map((action, i) => (
                                    <Grid item xs={6} key={i}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                py: 1.5,
                                                color: action.color,
                                                borderColor: action.color,
                                                '&:hover': { bgcolor: `${action.color}20` }
                                            }}
                                        >
                                            {action.label}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Recent Logs */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, bgcolor: '#1a1a2e' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
                                📋 Recent Activity Logs
                            </Typography>
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
                                        {recentLogs.map((log, i) => (
                                            <TableRow key={i}>
                                                <TableCell sx={{ color: '#666', borderColor: '#333', fontFamily: 'monospace' }}>{log.time}</TableCell>
                                                <TableCell sx={{ color: '#aaa', borderColor: '#333' }}>{log.user}</TableCell>
                                                <TableCell sx={{ borderColor: '#333' }}>
                                                    <Chip
                                                        label={log.action}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: log.status === 'success' ? '#1b5e20' : log.status === 'error' ? '#b71c1c' : '#0d47a1',
                                                            color: '#fff',
                                                            fontSize: '0.7rem'
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
            </Container>
        </Box>
    );
}
