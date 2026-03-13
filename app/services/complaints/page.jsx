'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, TextField, Button, Alert,
    FormControl, InputLabel, Select, MenuItem, Divider, Card, CardContent,
    CircularProgress, Stepper, Step, StepLabel, Chip, LinearProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function ComplaintsPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [complaintData, setComplaintData] = useState(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        type: '',
        subType: '',
        description: '',
        address: '',
        landmark: '',
        ward: '',
        images: []
    });

    const complaintTypes = [
        { value: 'road', label: 'Road / Pothole', subTypes: ['Pothole', 'Road Damage', 'Speed Breaker Issue', 'Road Marking'] },
        { value: 'water_supply', label: 'Water Supply', subTypes: ['No Water', 'Low Pressure', 'Contaminated', 'Pipe Leakage', 'Meter Issue'] },
        { value: 'drainage', label: 'Drainage / Sewage', subTypes: ['Blockage', 'Overflow', 'Bad Odor', 'Manhole Issue'] },
        { value: 'streetlight', label: 'Street Light', subTypes: ['Not Working', 'Flickering', 'New Installation Request'] },
        { value: 'garbage', label: 'Garbage Collection', subTypes: ['Missed Collection', 'Irregular Collection', 'Dumping Issue'] },
        { value: 'sanitation', label: 'Sanitation / Public Toilet', subTypes: ['Cleaning Required', 'Not Functional', 'Water Issue'] },
        { value: 'encroachment', label: 'Encroachment', subTypes: ['Footpath', 'Public Road', 'Government Land'] },
        { value: 'noise', label: 'Noise Pollution', subTypes: ['Construction', 'Loudspeaker', 'Industrial'] },
        { value: 'other', label: 'Other', subTypes: ['General'] }
    ];

    const wards = Array.from({ length: 13 }, (_, i) => `Ward ${i + 1}`);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
        } else {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setFormData(prev => ({ ...prev, ward: userData.ward || 'Ward 1' }));
            setLoading(false);
        }
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'type' && { subType: '' })
        }));
    };

    // AI Priority calculation (mock - matches backend)
    const calculateAIPriority = () => {
        let score = 50;
        const criticalTypes = ['water_supply', 'drainage', 'streetlight'];
        if (criticalTypes.includes(formData.type)) score += 20;

        const urgentKeywords = ['urgent', 'emergency', 'danger', 'flooding', 'accident', 'health hazard'];
        const desc = formData.description.toLowerCase();
        urgentKeywords.forEach(kw => {
            if (desc.includes(kw)) score += 15;
        });

        if (score >= 80) return { level: 'critical', score, color: '#d32f2f' };
        if (score >= 65) return { level: 'high', score, color: '#f57c00' };
        if (score <= 30) return { level: 'low', score, color: '#388e3c' };
        return { level: 'medium', score, color: '#1976d2' };
    };

    // Dynamic API URL for submission
    const getApiBaseUrl = () => {
        if (typeof window === 'undefined') return 'http://localhost:5000';
        const hostname = window.location.hostname;
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return window.location.origin;
        }
        return 'http://localhost:5000';
    };

    const handleSubmit = async () => {
        if (!formData.type || !formData.description || !formData.address) return;

        setActiveStep(1);
        setSubmitting(true);

        const aiPriority = calculateAIPriority();

        try {
            const apiPayload = {
                type: formData.type,
                subType: formData.subType || null,
                description: formData.description,
                address: formData.address,
                landmark: formData.landmark || null,
                ward: formData.ward,
                ai_priority: aiPriority
            };

            const userId = user?.user_id || 1;

            const res = await fetch(`${getApiBaseUrl()}/api/complaints/?user_id=${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiPayload)
            });

            const data = await res.json();

            if (res.ok) {
                 setComplaintData({
                     complaintNumber: `GRV-${data.data.request_id}`,
                     ...formData,
                     aiPriority,
                     department: getDepartment(formData.type),
                     slaDeadline: getSlaDeadline(aiPriority.level),
                     createdAt: data.data.timestamp
                 });
                 setSubmitSuccess(true);
                 setActiveStep(2);
            } else {
                 console.error("Submission failed:", data);
                 alert("Failed to register complaint. Please try again.");
                 setActiveStep(0);
            }
        } catch (error) {
             console.error("Network error during submission:", error);
             alert("Network error. Please try again.");
             setActiveStep(0);
        } finally {
             setSubmitting(false);
        }
    };

    const getDepartment = (type) => {
        const mapping = {
            'road': 'Roads & Infrastructure',
            'water_supply': 'Water Supply',
            'drainage': 'Water Supply',
            'streetlight': 'Electrical',
            'garbage': 'Sanitation',
            'sanitation': 'Sanitation',
            'encroachment': 'Enforcement',
            'other': 'General'
        };
        return mapping[type] || 'General';
    };

    const getSlaDeadline = (priority) => {
        const days = { critical: 1, high: 3, medium: 7, low: 15 };
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + days[priority]);
        return deadline.toLocaleDateString('en-IN', { dateStyle: 'medium' });
    };

    const selectedType = complaintTypes.find(t => t.value === formData.type);
    const steps = ['File Complaint', 'AI Processing', 'Confirmation'];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="flex flex-col">
            {/* Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #c62828 0%, #8e0000 100%)',
                color: '#fff',
                py: 3,
                borderBottom: '4px solid #FF9933'
            }}>
                <Container maxWidth="lg">
                    <Button
                        component={Link}
                        href="/dashboard"
                        startIcon={<ArrowBackIcon />}
                        sx={{ color: '#fff', mb: 2 }}
                    >
                        Back to Dashboard
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ReportProblemIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                File a Grievance
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                तक्रार दाखल करा | Report civic issues with AI-powered priority
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Stepper */}
                <Paper sx={{ p: 3, mb: 3, borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        {/* Step 1: Form */}
                        {activeStep === 0 && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#c62828', p: 2, color: '#fff' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        📝 Describe Your Issue
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        Our AI will automatically prioritize your complaint and route it to the appropriate department.
                                    </Alert>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Complaint Type *</InputLabel>
                                                <Select
                                                    name="type"
                                                    value={formData.type}
                                                    onChange={handleChange}
                                                    label="Complaint Type *"
                                                >
                                                    {complaintTypes.map(type => (
                                                        <MenuItem key={type.value} value={type.value}>
                                                            {type.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth disabled={!selectedType}>
                                                <InputLabel>Sub-Category</InputLabel>
                                                <Select
                                                    name="subType"
                                                    value={formData.subType}
                                                    onChange={handleChange}
                                                    label="Sub-Category"
                                                >
                                                    {selectedType?.subTypes.map(sub => (
                                                        <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                name="description"
                                                label="Describe the problem in detail *"
                                                placeholder="Please describe the issue clearly. Include details like how long it has persisted, urgency level, and any safety concerns."
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider sx={{ my: 1 }}>
                                                <Chip icon={<LocationOnIcon />} label="Location Details" />
                                            </Divider>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Ward *</InputLabel>
                                                <Select
                                                    name="ward"
                                                    value={formData.ward}
                                                    onChange={handleChange}
                                                    label="Ward *"
                                                >
                                                    {wards.map(ward => (
                                                        <MenuItem key={ward} value={ward}>{ward}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                name="landmark"
                                                label="Nearest Landmark"
                                                placeholder="e.g., Near Bus Stand, Opposite SBI Bank"
                                                value={formData.landmark}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="address"
                                                label="Exact Address / Location *"
                                                placeholder="Full address where the issue is located"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider sx={{ my: 1 }}>
                                                <Chip icon={<PhotoCameraIcon />} label="Attach Photos (Optional)" />
                                            </Divider>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                startIcon={<PhotoCameraIcon />}
                                                sx={{ py: 2, borderStyle: 'dashed' }}
                                            >
                                                Click to Upload Photos
                                            </Button>
                                            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                                                Upload up to 5 photos (JPG, PNG). Max 5MB each.
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ mt: 3 }}>
                                        {user?.access === 'read-only' && (
                                            <Alert severity="warning" sx={{ mb: 2 }}>
                                                Demo users cannot submit official complaints. Exploring view-only mode.
                                            </Alert>
                                        )}
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={handleSubmit}
                                            disabled={!formData.type || !formData.description || !formData.address || user?.access === 'read-only'}
                                            sx={{ 
                                                bgcolor: user?.access === 'read-only' ? '#ccc' : '#c62828', 
                                                fontWeight: 'bold', 
                                                py: 1.5,
                                                color: user?.access === 'read-only' ? '#666' : '#fff'
                                            }}
                                        >
                                            {user?.access === 'read-only' ? 'View Only Demo Mode' : 'Submit Complaint'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        )}

                        {/* Step 2: AI Processing */}
                        {activeStep === 1 && submitting && (
                            <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 0, boxShadow: 3 }}>
                                <SmartToyIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                                    AI Analyzing Your Complaint...
                                </Typography>
                                <LinearProgress sx={{ mb: 2 }} />
                                <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
                                    {['Classifying issue type', 'Calculating priority score', 'Assigning to department', 'Setting SLA deadline'].map((step, i) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <CheckCircleIcon sx={{ color: '#388e3c', fontSize: 18 }} />
                                            <Typography variant="body2">{step}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        )}

                        {/* Step 3: Success */}
                        {activeStep === 2 && submitSuccess && complaintData && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#388e3c', p: 3, color: '#fff', textAlign: 'center' }}>
                                    <CheckCircleIcon sx={{ fontSize: 60, mb: 1 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        Complaint Registered Successfully!
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Card sx={{ bgcolor: '#f5f5f5', mb: 3 }}>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">Complaint Number</Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#c62828' }}>
                                                {complaintData.complaintNumber}
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                <SmartToyIcon sx={{ color: '#1976d2' }} />
                                                <Typography variant="subtitle2">AI Priority Assessment</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                                <Chip
                                                    icon={<PriorityHighIcon />}
                                                    label={`${complaintData.aiPriority.level.toUpperCase()} Priority`}
                                                    sx={{ bgcolor: complaintData.aiPriority.color, color: '#fff', fontWeight: 'bold' }}
                                                />
                                                <Chip label={`Score: ${complaintData.aiPriority.score}/100`} variant="outlined" />
                                            </Box>

                                            <Divider sx={{ my: 2 }} />
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary">Department</Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                        {complaintData.department}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary">Expected Resolution</Typography>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#c62828' }}>
                                                        By {complaintData.slaDeadline}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>

                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        You will receive SMS and email updates on your complaint status. Track using the complaint number above.
                                    </Alert>

                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => {
                                                setActiveStep(0);
                                                setSubmitSuccess(false);
                                                setFormData({
                                                    type: '',
                                                    subType: '',
                                                    description: '',
                                                    address: '',
                                                    landmark: '',
                                                    ward: user?.ward || 'Ward 1',
                                                    images: []
                                                });
                                            }}
                                        >
                                            File Another Complaint
                                        </Button>
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            href="/dashboard"
                                            fullWidth
                                            sx={{ bgcolor: '#FF9933', color: '#000' }}
                                        >
                                            Back to Dashboard
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        )}
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd', mb: 3 }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    <SmartToyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    AI-Powered Resolution
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {[
                                    'Automatic priority assignment',
                                    'Smart department routing',
                                    'SLA-based resolution tracking',
                                    'Real-time status updates',
                                    'Citizen feedback collection'
                                ].map((info, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                        <CheckCircleIcon sx={{ color: '#138808', fontSize: 18 }} />
                                        <Typography variant="body2">{info}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#c62828', p: 2, color: '#fff' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    📞 Emergency Numbers
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Police:</strong> 100
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Fire:</strong> 101
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Ambulance:</strong> 108
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Municipal:</strong> 1800-XXX-XXXX
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
