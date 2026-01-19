'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, Typography, Box, Grid, Card, CardContent,
    Button, Chip, LinearProgress, Divider
} from '@mui/material';
import Link from 'next/link';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function GovernmentDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
                    Welcome, {user?.name}
                </Typography>

                {/* Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat, i) => (
                        <Grid item xs={6} md={3} key={i}>
                            <Card sx={{ borderTop: `4px solid ${stat.color}` }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>{stat.value}</Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>{stat.label}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Quick Actions */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        <AssignmentIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Quick Actions
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        {[
                            { label: 'View All Complaints', href: '/government/complaints', color: '#f57c00' },
                            { label: 'Ward Performance', href: '/government/wards', color: '#1565c0' },
                            { label: 'Citizen Database', href: '/government/citizens', color: '#388e3c' },
                            { label: 'Reports & Analytics', href: '/government/reports', color: '#7b1fa2' },
                        ].map((action, i) => (
                            <Grid item xs={6} md={3} key={i}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    component={Link}
                                    href={action.href}
                                    sx={{
                                        py: 2,
                                        color: action.color,
                                        borderColor: action.color,
                                        '&:hover': { bgcolor: action.color, color: '#fff' }
                                    }}
                                >
                                    {action.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}
