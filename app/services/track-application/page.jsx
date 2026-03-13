'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid, TextField, Button, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress, LinearProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function TrackApplicationPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applicationId, setApplicationId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searching, setSearching] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) { router.push('/auth/login'); }
        else { setUser(JSON.parse(storedUser)); setLoading(false); }
    }, [router]);

    const sampleApplications = [
        { id: 'BC/UMR/2026/1234', type: 'Birth Certificate', date: '10 Jan 2026', status: 'Processing', progress: 50, expectedDate: '17 Jan 2026' },
        { id: 'APP/2026/001', type: 'Trade License Renewal', date: '10 Jan 2026', status: 'In Process', progress: 60, expectedDate: '20 Jan 2026' },
        { id: 'APP/2026/045', type: 'Building Permission', date: '05 Jan 2026', status: 'Approved', progress: 100, expectedDate: 'Completed' },
        { id: 'GRV/2026/089', type: 'Grievance - Water Supply', date: '12 Jan 2026', status: 'Under Review', progress: 30, expectedDate: '22 Jan 2026' },
    ];

    const handleSearch = () => {
        setSearching(true);
        setTimeout(() => {
            const found = sampleApplications.find(app => app.id.toLowerCase() === applicationId.toLowerCase());
            setSearchResult(found || { notFound: true });
            setSearching(false);
        }, 1000);
    };

    const getStatusColor = (status) => {
        if (status === 'Approved' || status === 'Completed') return 'success';
        if (status === 'Processing' || status === 'In Process') return 'warning';
        return 'info';
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;

    return (
        <div className="flex flex-col">
            <Box sx={{ background: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)', color: '#fff', py: 3, borderBottom: '4px solid #FF9933' }}>
                <Container maxWidth="lg">
                    <Button component={Link} href="/dashboard" startIcon={<ArrowBackIcon />} sx={{ color: '#fff', mb: 2 }}>Back to Dashboard</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AssignmentIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Track Application</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>अर्ज ट्रॅक करा | Check your application status</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, mb: 3 }}>
                            <Box sx={{ bgcolor: '#7b1fa2', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>🔍 Search Application</Typography></Box>
                            <Box sx={{ p: 3 }}>
                                <Alert severity="info" sx={{ mb: 3 }}>Enter your Application ID to check status</Alert>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField fullWidth label="Application ID" placeholder="e.g., BC/UMR/2026/1234" value={applicationId} onChange={(e) => setApplicationId(e.target.value)} />
                                    <Button variant="contained" onClick={handleSearch} disabled={!applicationId.trim() || searching} startIcon={searching ? <CircularProgress size={20} /> : <SearchIcon />} sx={{ bgcolor: '#7b1fa2', px: 4 }}>Search</Button>
                                </Box>
                            </Box>
                        </Paper>

                        {searchResult && !searchResult.notFound && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3 }}>
                                <Box sx={{ bgcolor: '#388e3c', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>✅ Application Found</Typography></Box>
                                <Box sx={{ p: 3 }}>
                                    <TableContainer><Table>
                                        <TableBody>
                                            <TableRow><TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Application ID</TableCell><TableCell sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>{searchResult.id}</TableCell></TableRow>
                                            <TableRow><TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Type</TableCell><TableCell>{searchResult.type}</TableCell></TableRow>
                                            <TableRow><TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Submission Date</TableCell><TableCell>{searchResult.date}</TableCell></TableRow>
                                            <TableRow><TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Status</TableCell><TableCell><Chip label={searchResult.status} color={getStatusColor(searchResult.status)} icon={searchResult.progress === 100 ? <CheckCircleIcon /> : <PendingIcon />} /></TableCell></TableRow>
                                            <TableRow><TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Progress</TableCell><TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><LinearProgress variant="determinate" value={searchResult.progress} sx={{ flexGrow: 1, height: 10, borderRadius: 5 }} /><Typography sx={{ fontWeight: 'bold' }}>{searchResult.progress}%</Typography></Box></TableCell></TableRow>
                                            <TableRow><TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Expected Completion</TableCell><TableCell sx={{ color: '#e65100', fontWeight: 'bold' }}>{searchResult.expectedDate}</TableCell></TableRow>
                                        </TableBody>
                                    </Table></TableContainer>
                                </Box>
                            </Paper>
                        )}
                        {searchResult?.notFound && <Alert severity="warning" sx={{ mt: 2 }}>No application found with ID: {applicationId}</Alert>}

                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, mt: 3 }}>
                            <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>📋 Your Recent Applications</Typography></Box>
                            <TableContainer><Table size="small">
                                <TableHead><TableRow sx={{ bgcolor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell></TableRow></TableHead>
                                <TableBody>
                                    {sampleApplications.map((app) => (
                                        <TableRow key={app.id} hover onClick={() => { setApplicationId(app.id); setSearchResult(app); }} sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f3e5f5' } }}>
                                            <TableCell sx={{ color: '#7b1fa2', fontWeight: 500 }}>{app.id}</TableCell>
                                            <TableCell>{app.type}</TableCell>
                                            <TableCell>{app.date}</TableCell>
                                            <TableCell><Chip label={app.status} size="small" color={getStatusColor(app.status)} variant="outlined" /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table></TableContainer>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, mb: 3 }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}><AccessTimeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Processing Times</Typography></Box>
                            <Box sx={{ p: 2 }}>{[{ type: 'Birth Certificate', days: '7 days' }, { type: 'Trade License', days: '10 days' }, { type: 'Building Permission', days: '15 days' }, { type: 'Grievance', days: '3-7 days' }].map((item, i) => <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, pb: 1.5, borderBottom: '1px dashed #ddd' }}><Typography variant="body2">{item.type}</Typography><Chip label={item.days} size="small" sx={{ bgcolor: '#e8f4fc' }} /></Box>)}</Box>
                        </Paper>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3 }}>
                            <Box sx={{ bgcolor: '#7b1fa2', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>📞 Helpdesk</Typography></Box>
                            <Box sx={{ p: 2 }}><Typography variant="body2" sx={{ mb: 1 }}><strong>Helpline:</strong> 1800-XXX-XXXX</Typography><Typography variant="body2"><strong>Email:</strong> track@nagpurnp.gov.in</Typography></Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
