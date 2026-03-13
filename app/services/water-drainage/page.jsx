'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, TextField, Button, Typography, Box, Alert, MenuItem,
    Grid, Divider, Card, CardContent, Chip, LinearProgress, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle,
    DialogContent, DialogActions, FormControl, InputLabel, Select, Tabs, Tab
} from '@mui/material';
import Link from 'next/link';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
}

export default function WaterDrainagePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [complaintDialog, setComplaintDialog] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Form state
    const [complaint, setComplaint] = useState({
        issueType: '',
        location: '',
        ward: '',
        description: '',
        urgency: 'medium'
    });

    // Mock data for water supply schedule
    const waterSchedule = [
        { ward: 'Ward 1', morning: '6:00 AM - 8:00 AM', evening: '5:00 PM - 7:00 PM', status: 'Normal' },
        { ward: 'Ward 2', morning: '6:30 AM - 8:30 AM', evening: '5:30 PM - 7:30 PM', status: 'Normal' },
        { ward: 'Ward 3', morning: '7:00 AM - 9:00 AM', evening: '6:00 PM - 8:00 PM', status: 'Maintenance' },
        { ward: 'Ward 4', morning: '6:00 AM - 8:00 AM', evening: '5:00 PM - 7:00 PM', status: 'Normal' },
        { ward: 'Ward 5', morning: '6:30 AM - 8:30 AM', evening: '5:30 PM - 7:30 PM', status: 'Normal' },
        { ward: 'Ward 6', morning: '7:00 AM - 9:00 AM', evening: '6:00 PM - 8:00 PM', status: 'Low Pressure' },
    ];

    // Mock complaints
    const [complaints, setComplaints] = useState([
        { id: 'WD/2026/001', type: 'Pipeline Leakage', location: 'Gandhi Chowk, Ward 2', date: '15 Jan 2026', status: 'In Progress', progress: 60 },
        { id: 'WD/2026/002', type: 'No Water Supply', location: 'Station Road, Ward 4', date: '14 Jan 2026', status: 'Resolved', progress: 100 },
        { id: 'WD/2026/003', type: 'Sewer Overflow', location: 'Main Market, Ward 1', date: '13 Jan 2026', status: 'Pending', progress: 20 },
    ]);

    const issueTypes = [
        { value: 'no_water', label: 'No Water Supply / पाणी पुरवठा नाही' },
        { value: 'low_pressure', label: 'Low Water Pressure / कमी पाणी दाब' },
        { value: 'dirty_water', label: 'Dirty/Contaminated Water / गलिच्छ पाणी' },
        { value: 'pipeline_leak', label: 'Pipeline Leakage / पाइपलाइन गळती' },
        { value: 'sewer_overflow', label: 'Sewer Overflow / गटार ओव्हरफ्लो' },
        { value: 'drainage_block', label: 'Drainage Blockage / निकास अडथळा' },
        { value: 'manhole_issue', label: 'Manhole Problem / मॅनहोल समस्या' },
        { value: 'other', label: 'Other / इतर' },
    ];

    const wards = Array.from({ length: 13 }, (_, i) => ({
        value: `Ward ${i + 1}`,
        label: `Ward ${i + 1} - वार्ड ${i + 1}`
    }));

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setComplaint(prev => ({ ...prev, ward: parsed.ward || 'Ward 1' }));
        }
        setLoading(false);
    }, []);

    const handleSubmitComplaint = async () => {
        if (!complaint.issueType || !complaint.location || !complaint.description) {
            setError('Please fill all required fields');
            return;
        }

        setSubmitLoading(true);
        setError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newComplaint = {
            id: `WD/2026/${String(complaints.length + 4).padStart(3, '0')}`,
            type: issueTypes.find(t => t.value === complaint.issueType)?.label.split('/')[0].trim() || complaint.issueType,
            location: complaint.location,
            date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'Pending',
            progress: 10
        };

        setComplaints(prev => [newComplaint, ...prev]);
        setComplaintDialog(false);
        setComplaint({ issueType: '', location: '', ward: user?.ward || 'Ward 1', description: '', urgency: 'medium' });
        setSuccess(`Complaint registered successfully! Your complaint ID is ${newComplaint.id}`);
        setSubmitLoading(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <LinearProgress sx={{ width: 200 }} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            {/* Header */}
            <Box sx={{ bgcolor: '#0288d1', py: 3, borderBottom: '4px solid #FF9933' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#fff' }}>
                        <Button
                            component={Link}
                            href="/services"
                            startIcon={<ArrowBackIcon />}
                            sx={{ color: '#fff', mr: 2 }}
                        >
                            Back
                        </Button>
                        <WaterDropIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Water & Drainage Services</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>पाणी व निचरा सेवा | Nagpur Municipal Corporation</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Quick Stats */}
            <Box sx={{ bgcolor: '#e3f2fd', py: 2, borderBottom: '1px solid #90caf9' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {[
                            { label: 'Total Connections', value: '12,450', icon: <PlumbingIcon />, color: '#1565c0' },
                            { label: 'Active Complaints', value: complaints.filter(c => c.status !== 'Resolved').length, icon: <ReportProblemIcon />, color: '#f57c00' },
                            { label: 'Resolved This Month', value: '234', icon: <CheckCircleIcon />, color: '#388e3c' },
                            { label: 'Avg Resolution Time', value: '48 hrs', icon: <ScheduleIcon />, color: '#7b1fa2' },
                        ].map((stat, i) => (
                            <Grid item xs={6} sm={3} key={i}>
                                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: stat.color }}>{stat.value}</Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>{stat.label}</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

                <Grid container spacing={3}>
                    {/* Left Column - Quick Actions */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ mb: 3, overflow: 'hidden' }}>
                            <Box sx={{ bgcolor: '#0288d1', color: '#fff', p: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>🚰 Quick Actions</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<ReportProblemIcon />}
                                    onClick={() => setComplaintDialog(true)}
                                    sx={{ mb: 2, bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
                                >
                                    Report Water/Drainage Issue
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    component={Link}
                                    href="/services/water-bill"
                                    startIcon={<WaterDropIcon />}
                                    sx={{ mb: 2, color: '#0288d1', borderColor: '#0288d1' }}
                                >
                                    Pay Water Bill
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    component={Link}
                                    href="/services/track-application"
                                    startIcon={<HistoryIcon />}
                                    sx={{ color: '#388e3c', borderColor: '#388e3c' }}
                                >
                                    Track Complaint Status
                                </Button>
                            </Box>
                        </Paper>

                        {/* Emergency Contact */}
                        <Paper sx={{ bgcolor: '#ffebee', border: '2px solid #d32f2f' }}>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold', mb: 1 }}>
                                    🚨 Emergency Helpline
                                </Typography>
                                <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                                    1800-XXX-XXXX
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666' }}>
                                    24x7 Available for Pipeline Burst / Sewer Overflow
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right Column - Main Content */}
                    <Grid item xs={12} md={8}>
                        <Paper>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                variant="fullWidth"
                                sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f9f9f9' }}
                            >
                                <Tab icon={<ScheduleIcon />} label="Water Schedule" iconPosition="start" />
                                <Tab icon={<HistoryIcon />} label="My Complaints" iconPosition="start" />
                                <Tab icon={<InfoIcon />} label="Information" iconPosition="start" />
                            </Tabs>

                            <Box sx={{ p: 3 }}>
                                {/* Water Schedule Tab */}
                                <TabPanel value={tab} index={0}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#0288d1' }}>
                                        📅 Daily Water Supply Schedule
                                    </Typography>
                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Ward</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Morning</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Evening</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {waterSchedule.map((row, i) => (
                                                    <TableRow key={i} hover sx={{ bgcolor: user?.ward === row.ward ? '#fff8e1' : 'inherit' }}>
                                                        <TableCell sx={{ fontWeight: user?.ward === row.ward ? 'bold' : 'normal' }}>
                                                            {row.ward}
                                                            {user?.ward === row.ward && <Chip label="Your Ward" size="small" sx={{ ml: 1, bgcolor: '#FF9933', color: '#fff' }} />}
                                                        </TableCell>
                                                        <TableCell>{row.morning}</TableCell>
                                                        <TableCell>{row.evening}</TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={row.status}
                                                                size="small"
                                                                color={row.status === 'Normal' ? 'success' : row.status === 'Maintenance' ? 'warning' : 'error'}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        <strong>Note:</strong> Water supply timings may vary during maintenance or emergencies. For real-time updates, check the mobile app.
                                    </Alert>
                                </TabPanel>

                                {/* My Complaints Tab */}
                                <TabPanel value={tab} index={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                                            📋 My Water/Drainage Complaints
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<ReportProblemIcon />}
                                            onClick={() => setComplaintDialog(true)}
                                            sx={{ bgcolor: '#d32f2f' }}
                                        >
                                            New Complaint
                                        </Button>
                                    </Box>
                                    {complaints.length === 0 ? (
                                        <Alert severity="info">No complaints found. Click "New Complaint" to report an issue.</Alert>
                                    ) : (
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>Issue Type</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>Progress</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {complaints.map((row) => (
                                                        <TableRow key={row.id} hover>
                                                            <TableCell sx={{ color: '#0288d1', fontWeight: 'bold' }}>{row.id}</TableCell>
                                                            <TableCell>{row.type}</TableCell>
                                                            <TableCell>{row.location}</TableCell>
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
                                                                                bgcolor: row.progress === 100 ? '#388e3c' : '#0288d1'
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{row.progress}%</Typography>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    label={row.status}
                                                                    size="small"
                                                                    icon={row.status === 'Resolved' ? <CheckCircleIcon /> : <PendingIcon />}
                                                                    color={row.status === 'Resolved' ? 'success' : row.status === 'In Progress' ? 'warning' : 'default'}
                                                                    variant="outlined"
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </TabPanel>

                                {/* Information Tab */}
                                <TabPanel value={tab} index={2}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#0288d1' }}>
                                        ℹ️ Water & Drainage Information
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {[
                                            { title: 'Water Source', value: 'Wainganga River', icon: '🌊' },
                                            { title: 'Treatment Plant', value: 'Kapsi WTP', icon: '🏭' },
                                            { title: 'Daily Supply', value: '15 MLD', icon: '💧' },
                                            { title: 'Coverage', value: '98%', icon: '📊' },
                                            { title: 'Drainage Network', value: '45 KM', icon: '🛤️' },
                                            { title: 'STP Capacity', value: '5 MLD', icon: '♻️' },
                                        ].map((item, i) => (
                                            <Grid item xs={6} sm={4} key={i}>
                                                <Card variant="outlined">
                                                    <CardContent sx={{ textAlign: 'center' }}>
                                                        <Typography variant="h3">{item.icon}</Typography>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>{item.title}</Typography>
                                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0288d1' }}>{item.value}</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Divider sx={{ my: 3 }} />

                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Water Quality Standards</Typography>
                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: '#e8f5e9' }}>
                                                    <TableCell>Parameter</TableCell>
                                                    <TableCell>Standard</TableCell>
                                                    <TableCell>Current Reading</TableCell>
                                                    <TableCell>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {[
                                                    { param: 'pH Level', std: '6.5-8.5', current: '7.2', ok: true },
                                                    { param: 'Chlorine (mg/L)', std: '0.2-0.5', current: '0.3', ok: true },
                                                    { param: 'TDS (mg/L)', std: '<500', current: '320', ok: true },
                                                    { param: 'Turbidity (NTU)', std: '<5', current: '2.1', ok: true },
                                                ].map((row, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.param}</TableCell>
                                                        <TableCell>{row.std}</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>{row.current}</TableCell>
                                                        <TableCell>
                                                            <Chip label={row.ok ? 'Safe' : 'Check'} size="small" color={row.ok ? 'success' : 'error'} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Complaint Dialog */}
                <Dialog open={complaintDialog} onClose={() => setComplaintDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ bgcolor: '#0288d1', color: '#fff' }}>
                        <WaterDropIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Report Water/Drainage Issue
                    </DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        <Grid container spacing={2} sx={{ mt: 0.5 }}>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel>Issue Type / समस्या प्रकार</InputLabel>
                                    <Select
                                        value={complaint.issueType}
                                        label="Issue Type / समस्या प्रकार"
                                        onChange={e => setComplaint({ ...complaint, issueType: e.target.value })}
                                    >
                                        {issueTypes.map(type => (
                                            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Ward / वार्ड</InputLabel>
                                    <Select
                                        value={complaint.ward}
                                        label="Ward / वार्ड"
                                        onChange={e => setComplaint({ ...complaint, ward: e.target.value })}
                                    >
                                        {wards.map(w => (
                                            <MenuItem key={w.value} value={w.value}>{w.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Urgency / तातडी</InputLabel>
                                    <Select
                                        value={complaint.urgency}
                                        label="Urgency / तातडी"
                                        onChange={e => setComplaint({ ...complaint, urgency: e.target.value })}
                                    >
                                        <MenuItem value="low">Low / कमी</MenuItem>
                                        <MenuItem value="medium">Medium / मध्यम</MenuItem>
                                        <MenuItem value="high">High / उच्च</MenuItem>
                                        <MenuItem value="emergency">Emergency / आणीबाणी</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Location / ठिकाण"
                                    placeholder="Enter exact address or landmark"
                                    value={complaint.location}
                                    onChange={e => setComplaint({ ...complaint, location: e.target.value })}
                                    InputProps={{
                                        startAdornment: <LocationOnIcon sx={{ mr: 1, color: '#666' }} />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    multiline
                                    rows={3}
                                    label="Description / वर्णन"
                                    placeholder="Describe the issue in detail..."
                                    value={complaint.description}
                                    onChange={e => setComplaint({ ...complaint, description: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setComplaintDialog(false)}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmitComplaint}
                            disabled={submitLoading}
                            startIcon={<SendIcon />}
                            sx={{ bgcolor: '#0288d1' }}
                        >
                            {submitLoading ? 'Submitting...' : 'Submit Complaint'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
