'use client';

import { useEffect, useState } from 'react';
import {
    Container, Grid, Paper, Typography, Box, CircularProgress,
    Button, Divider, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, Card, CardContent, Avatar, LinearProgress,
    List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DescriptionIcon from '@mui/icons-material/Description';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
        } else {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', gap: 2 }}>
                <CircularProgress size={60} sx={{ color: '#FF9933' }} />
                <Typography variant="body1" sx={{ color: '#666' }}>Loading Dashboard...</Typography>
            </Box>
        );
    }

    const applications = [
        { id: 'APP/2026/001', type: 'Trade License Renewal', date: '10 Jan 2026', status: 'In Process', progress: 60 },
        { id: 'APP/2026/045', type: 'Building Permission', date: '05 Jan 2026', status: 'Approved', progress: 100 },
        { id: 'APP/2026/089', type: 'Water Connection', date: '12 Jan 2026', status: 'Pending Review', progress: 30 },
    ];

    const payments = [
        { id: 'TXN88291', type: 'Property Tax', amount: '₹ 2,400', date: '12 Dec 2025', status: 'Success' },
        { id: 'TXN88102', type: 'Water Bill', amount: '₹ 450', date: '10 Nov 2025', status: 'Success' },
        { id: 'TXN87932', type: 'Trade License Fee', amount: '₹ 1,200', date: '05 Oct 2025', status: 'Success' },
    ];

    const wardStats = [
        { label: 'Total Complaints', value: 156, color: '#1a4e8e' },
        { label: 'Resolved', value: 142, color: '#138808' },
        { label: 'Pending', value: 14, color: '#FF9933' },
        { label: 'Satisfaction Rate', value: '91%', color: '#b71c1c' },
    ];

    const announcements = [
        { text: 'Door-to-door waste collection timing changed to 7:00 AM', date: '15 Jan 2026', priority: 'high' },
        { text: 'Property tax last date extended to 31st January', date: '14 Jan 2026', priority: 'medium' },
        { text: 'Water supply maintenance scheduled for Ward 4 on 16th Jan', date: '13 Jan 2026', priority: 'low' },
    ];

    const quickActions = [
        { label: 'Pay Property Tax', icon: <HomeWorkIcon />, color: '#1a4e8e', href: '/services/property-tax' },
        { label: 'Pay Water Bill', icon: <WaterDropIcon />, color: '#0288d1', href: '/services/water-bill' },
        { label: 'File Grievance', icon: <ReportProblemIcon />, color: '#d32f2f', href: '/services' },
        { label: 'Birth Certificate', icon: <DescriptionIcon />, color: '#388e3c', href: '/services/birth-certificate' },
        { label: 'Track Application', icon: <AssignmentIcon />, color: '#7b1fa2', href: '/services/track-application' },
        { label: 'Download Receipt', icon: <PaymentIcon />, color: '#FF9933', href: '/services/download-receipt' },
    ];

    return (
        <div className="flex flex-col">
            {/* Dashboard Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 100%)',
                color: '#fff',
                py: 3,
                borderBottom: '4px solid #FF9933'
            }}>
                <Container maxWidth="xl">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <DashboardIcon sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        Citizen Dashboard
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        नागरिक डॅशबोर्ड | Nagpur Municipal Corporation
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box
                                component={Link}
                                href="/profile"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    p: 1.5,
                                    borderRadius: 1,
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            >
                                <Avatar sx={{ width: 50, height: 50, bgcolor: '#FF9933', fontSize: '1.5rem' }}>
                                    {user?.name?.charAt(0) || 'U'}
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user?.name || 'User'}</Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>Ward No: {user?.ward || 'N/A'}</Typography>
                                </Box>
                                <Chip
                                    icon={<VerifiedIcon sx={{ color: '#fff !important' }} />}
                                    label="Verified"
                                    size="small"
                                    sx={{ bgcolor: '#138808', color: '#fff', fontWeight: 'bold' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Ward Stats Bar */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 2, borderBottom: '1px solid #ddd' }}>
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        {wardStats.map((stat, i) => (
                            <Grid item xs={6} sm={3} key={i}>
                                <Paper sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderLeft: `4px solid ${stat.color}`,
                                    borderRadius: 0,
                                    transition: '0.2s',
                                    '&:hover': { boxShadow: 3 }
                                }}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        {stat.label}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container spacing={3}>

                    {/* LEFT COLUMN: Profile & Quick Actions */}
                    <Grid item xs={12} md={3}>

                        {/* Profile Card */}
                        <Paper sx={{ overflow: 'hidden', mb: 3, borderRadius: 0, boxShadow: 3, border: '1px solid #ddd', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                            <Box
                                component={Link}
                                href="/profile"
                                sx={{
                                    bgcolor: '#1a4e8e',
                                    p: 2,
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: '#0d2e5a'
                                    }
                                }}
                            >
                                <PersonIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>My Profile</Typography>
                                <EditIcon sx={{ ml: 'auto', fontSize: '1rem' }} />
                            </Box>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Box
                                    component={Link}
                                    href="/profile"
                                    sx={{
                                        display: 'block',
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                >
                                    <Avatar sx={{ width: 80, height: 80, margin: '0 auto', bgcolor: '#FF9933', fontSize: '2rem', boxShadow: 3 }}>
                                        {user?.name?.charAt(0) || 'U'}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#1a4e8e' }}>{user?.name || 'User'}</Typography>
                                    <Chip label={`Ward ${user?.ward || 'N/A'}`} size="small" sx={{ mt: 1, bgcolor: '#e8f4fc', color: '#1a4e8e', fontWeight: 'bold' }} />
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>Profile Completion</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={85}
                                            sx={{ flexGrow: 1, height: 8, borderRadius: 4, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#138808' } }}
                                        />
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#138808' }}>85%</Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Box sx={{ bgcolor: '#e8f5e9', p: 1.5, borderRadius: 1 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c' }}>0</Typography>
                                            <Typography variant="caption">Pending Dues</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ bgcolor: '#e8f4fc', p: 1.5, borderRadius: 1 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>3</Typography>
                                            <Typography variant="caption">Active Apps</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 2 }} />

                                <Button
                                    component={Link}
                                    href="/profile"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<EditIcon />}
                                    sx={{
                                        bgcolor: '#1a4e8e',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            bgcolor: '#0d2e5a'
                                        }
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Paper>

                        {/* Quick Actions */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Actions</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={1.5}>
                                    {quickActions.map((action, i) => (
                                        <Grid item xs={6} key={i}>
                                            <Button
                                                component={Link}
                                                href={action.href}
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    py: 1.5,
                                                    height: '100%',
                                                    color: action.color,
                                                    borderColor: '#eee',
                                                    borderRadius: 0,
                                                    '&:hover': { bgcolor: '#f5f5f5', borderColor: action.color }
                                                }}
                                            >
                                                <Box sx={{ mb: 0.5 }}>{action.icon}</Box>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.65rem' }}>{action.label}</Typography>
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>

                    </Grid>

                    {/* CENTER COLUMN: Applications & Payments */}
                    <Grid item xs={12} md={6}>

                        {/* Notifications */}
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#b71c1c', p: 2, color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <NotificationsActiveIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Important Announcements</Typography>
                                <Chip label={announcements.length} size="small" sx={{ ml: 'auto', bgcolor: '#fff', color: '#b71c1c', fontWeight: 'bold' }} />
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {announcements.map((item, i) => (
                                    <ListItem key={i} sx={{ borderBottom: '1px solid #eee', py: 1.5, bgcolor: item.priority === 'high' ? '#fff8e1' : 'transparent' }}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            {item.priority === 'high' ? (
                                                <NotificationsActiveIcon color="warning" fontSize="small" />
                                            ) : (
                                                <ArrowRightIcon fontSize="small" sx={{ color: '#666' }} />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            secondary={item.date}
                                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                                            secondaryTypographyProps={{ fontSize: '0.75rem' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Applications */}
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AssignmentIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>My Applications</Typography>
                                </Box>
                                <Button size="small" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined">View All</Button>
                            </Box>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Application ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Progress</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {applications.map((row) => (
                                            <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#e8f4fc' } }}>
                                                <TableCell sx={{ fontWeight: 500, color: '#1a4e8e' }}>{row.id}</TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell sx={{ width: 120 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={row.progress}
                                                            sx={{
                                                                flexGrow: 1,
                                                                height: 6,
                                                                borderRadius: 3,
                                                                bgcolor: '#e0e0e0',
                                                                '& .MuiLinearProgress-bar': {
                                                                    bgcolor: row.progress === 100 ? '#388e3c' : '#FF9933'
                                                                }
                                                            }}
                                                        />
                                                        <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 30 }}>{row.progress}%</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.status}
                                                        size="small"
                                                        icon={row.status === 'Approved' ? <CheckCircleIcon /> : <PendingIcon />}
                                                        color={row.status === 'Approved' ? 'success' : row.status === 'In Process' ? 'warning' : 'default'}
                                                        variant="outlined"
                                                        sx={{ fontWeight: 'bold' }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        {/* Payments */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#138808', color: '#fff', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PaymentIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Payment History</Typography>
                                </Box>
                                <Button size="small" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} variant="outlined">View All</Button>
                            </Box>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Receipt No</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {payments.map((row) => (
                                            <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: '#e8f5e9' } }}>
                                                <TableCell sx={{ fontWeight: 500, color: '#388e3c' }}>{row.id}</TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>{row.amount}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.status}
                                                        size="small"
                                                        icon={<CheckCircleIcon />}
                                                        color="success"
                                                        sx={{ fontWeight: 'bold' }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                    </Grid>

                    {/* RIGHT COLUMN: Ward Performance */}
                    <Grid item xs={12} md={3}>

                        {/* Ward Performance */}
                        <Paper sx={{ overflow: 'hidden', mb: 3, borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ward {user?.ward || 'N/A'} Performance</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {[
                                    { label: 'Sanitation', value: 92, color: '#388e3c' },
                                    { label: 'Water Supply', value: 88, color: '#0288d1' },
                                    { label: 'Street Lighting', value: 95, color: '#f9a825' },
                                    { label: 'Road Condition', value: 78, color: '#FF9933' },
                                    { label: 'Grievance Resolution', value: 91, color: '#1a4e8e' },
                                ].map((item, i) => (
                                    <Box key={i} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.label}</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: item.color }}>{item.value}%</Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={item.value}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': { bgcolor: item.color, borderRadius: 4 }
                                            }}
                                        />
                                    </Box>
                                ))}

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ textAlign: 'center', bgcolor: '#e8f5e9', p: 2, borderRadius: 1 }}>
                                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#388e3c' }}>A+</Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>Overall Ward Grade</Typography>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Help Desk */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>📞 Help Desk</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Toll Free:</strong> 1800-XXX-XXXX
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Office:</strong> 07116-222XXX
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    <strong>Email:</strong> helpdesk@nagpurnp.gov.in
                                </Typography>
                                <Button
                                    component={Link}
                                    href="/contact"
                                    variant="contained"
                                    fullWidth
                                    sx={{ bgcolor: '#FF9933', color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#e68a00' } }}
                                >
                                    Contact Us
                                </Button>
                            </Box>
                        </Paper>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
