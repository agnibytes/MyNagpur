'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem, Divider, Card, CardContent, CircularProgress, Stepper, Step, StepLabel, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';

export default function BirthCertificatePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({ childName: '', dateOfBirth: '', gender: '', fatherName: '', motherName: '', placeOfBirth: '', ward: '' });
    const [applicationId, setApplicationId] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) { router.push('/auth/login'); }
        else { setUser(JSON.parse(storedUser)); setLoading(false); }
    }, [router]);

    const handleChange = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = () => {
        setActiveStep(1);
        setTimeout(() => { setApplicationId(`BC/UMR/2026/${Math.floor(Math.random() * 9000) + 1000}`); setSubmitted(true); setActiveStep(2); }, 2000);
    };

    const isFormValid = formData.childName && formData.dateOfBirth && formData.gender && formData.fatherName && formData.motherName;
    const steps = ['Fill Application', 'Processing', 'Submitted'];

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;

    return (
        <div className="flex flex-col">
            <Box sx={{ background: 'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)', color: '#fff', py: 3, borderBottom: '4px solid #FF9933' }}>
                <Container maxWidth="lg">
                    <Button component={Link} href="/dashboard" startIcon={<ArrowBackIcon />} sx={{ color: '#fff', mb: 2 }}>Back to Dashboard</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DescriptionIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Birth Certificate</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>जन्म प्रमाणपत्र | Apply online</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper sx={{ p: 3, mb: 3, borderRadius: 0, boxShadow: 3 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>{steps.map((l) => <Step key={l}><StepLabel>{l}</StepLabel></Step>)}</Stepper>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        {activeStep === 0 && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3 }}>
                                <Box sx={{ bgcolor: '#388e3c', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>📝 Application Form</Typography></Box>
                                <Box sx={{ p: 3 }}>
                                    <Alert severity="info" sx={{ mb: 3 }}>Fill all required details. Certificate ready in 7 working days.</Alert>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}><TextField fullWidth required label="Child's Full Name" value={formData.childName} onChange={handleChange('childName')} /></Grid>
                                        <Grid item xs={6}><TextField fullWidth required type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange('dateOfBirth')} /></Grid>
                                        <Grid item xs={6}><FormControl fullWidth required><InputLabel>Gender</InputLabel><Select value={formData.gender} label="Gender" onChange={handleChange('gender')}><MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem><MenuItem value="Other">Other</MenuItem></Select></FormControl></Grid>
                                        <Grid item xs={6}><TextField fullWidth required label="Father's Name" value={formData.fatherName} onChange={handleChange('fatherName')} /></Grid>
                                        <Grid item xs={6}><TextField fullWidth required label="Mother's Name" value={formData.motherName} onChange={handleChange('motherName')} /></Grid>
                                        <Grid item xs={6}><FormControl fullWidth><InputLabel>Place of Birth</InputLabel><Select value={formData.placeOfBirth} label="Place of Birth" onChange={handleChange('placeOfBirth')}><MenuItem value="Hospital">Hospital</MenuItem><MenuItem value="Home">Home</MenuItem></Select></FormControl></Grid>
                                        <Grid item xs={6}><FormControl fullWidth><InputLabel>Ward</InputLabel><Select value={formData.ward} label="Ward" onChange={handleChange('ward')}>{[...Array(13)].map((_, i) => <MenuItem key={i + 1} value={i + 1}>Ward {i + 1}</MenuItem>)}</Select></FormControl></Grid>
                                    </Grid>
                                    <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!isFormValid} sx={{ mt: 3, bgcolor: '#388e3c', fontWeight: 'bold', py: 1.5 }}>Submit Application</Button>
                                </Box>
                            </Paper>
                        )}
                        {activeStep === 1 && <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 0, boxShadow: 3 }}><CircularProgress size={60} sx={{ color: '#388e3c', mb: 2 }} /><Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c' }}>Submitting...</Typography></Paper>}
                        {activeStep === 2 && submitted && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3 }}>
                                <Box sx={{ bgcolor: '#388e3c', p: 3, color: '#fff', textAlign: 'center' }}><CheckCircleIcon sx={{ fontSize: 60, mb: 1 }} /><Typography variant="h5" sx={{ fontWeight: 'bold' }}>Application Submitted!</Typography></Box>
                                <Box sx={{ p: 3 }}>
                                    <Alert severity="success" sx={{ mb: 3 }}>Note your Application ID for tracking.</Alert>
                                    <Card sx={{ bgcolor: '#e8f5e9', mb: 3, border: '2px solid #388e3c' }}><CardContent sx={{ textAlign: 'center' }}><Typography variant="body2">Application ID</Typography><Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c', my: 1 }}>{applicationId}</Typography><Chip label="Processing" color="warning" size="small" /><Divider sx={{ my: 2 }} /><Typography variant="body2">Expected: 7 Working Days</Typography></CardContent></Card>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button variant="outlined" startIcon={<DownloadIcon />} fullWidth sx={{ borderColor: '#388e3c', color: '#388e3c' }}>Download Acknowledgment</Button>
                                        <Button variant="contained" component={Link} href="/dashboard" fullWidth sx={{ bgcolor: '#FF9933', color: '#000' }}>Back to Dashboard</Button>
                                    </Box>
                                </Box>
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, mb: 3 }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Required Documents</Typography></Box>
                            <Box sx={{ p: 2 }}>{['Hospital Discharge Summary', "Parent's Aadhaar Card", 'Address Proof'].map((d, i) => <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}><CheckCircleIcon sx={{ color: '#388e3c', fontSize: 18 }} /><Typography variant="body2">{d}</Typography></Box>)}</Box>
                        </Paper>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3 }}>
                            <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>📞 Contact</Typography></Box>
                            <Box sx={{ p: 2 }}><Typography variant="body2" sx={{ mb: 1 }}><strong>Helpline:</strong> 1800-XXX-XXXX</Typography><Typography variant="body2"><strong>Email:</strong> birth@nagpurnp.gov.in</Typography></Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
