'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, TextField, Button, Typography, Box, Alert, MenuItem, Grid, Divider, Stepper, Step, StepLabel } from '@mui/material';
import Link from 'next/link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DocumentScanner from '../../../components/DocumentScanner';

// Dynamic API URL
const getApiBaseUrl = () => {
    if (typeof window === 'undefined') return 'http://localhost:5000';
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        return window.location.origin;
    }
    return 'http://localhost:5000';
};

const WARDS = Array.from({ length: 13 }, (_, i) => ({
    value: `Ward ${i + 1}`,
    label: `Ward ${i + 1} - वार्ड ${i + 1}`
}));

const ID_PROOF_TYPES = [
    { value: 'Aadhar Card', label: 'Aadhar Card / आधार कार्ड' },
    { value: 'Ration Card', label: 'Ration Card / रेशन कार्ड' },
    { value: 'Electricity Bill', label: 'Electricity Bill / विद्युत बिल' },
    { value: 'Property Tax Receipt', label: 'Property Tax Receipt / मालमत्ता कर पावती' },
    { value: 'Voter ID', label: 'Voter ID / मतदार ओळखपत्र' },
];

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        ward: 'Ward 1',
        idProofType: '',
        idProofNumber: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [autoFilled, setAutoFilled] = useState({ name: false, idNumber: false });
    const [showScanner, setShowScanner] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${getApiBaseUrl()}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDataExtracted = (extractedData) => {
        const updates = {};
        const autoFillUpdates = {};

        if (extractedData.name) {
            updates.name = extractedData.name;
            autoFillUpdates.name = true;
        }
        if (extractedData.idNumber) {
            updates.idProofNumber = extractedData.idNumber;
            autoFillUpdates.idNumber = true;
        }

        setFormData(prev => ({ ...prev, ...updates }));
        setAutoFilled(prev => ({ ...prev, ...autoFillUpdates }));
        setShowScanner(false);
    };

    const steps = ['Personal Details', 'Ward Selection', 'ID Verification'];

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Government Banner */}
            <Box sx={{ bgcolor: '#1a4e8e', py: 2, borderBottom: '4px solid #FF9933' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <img src="/emblem_new.png" alt="Government Emblem" style={{ height: 50, filter: 'brightness(0) invert(1)' }} />
                        <Box sx={{ textAlign: 'center', color: '#fff' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                                UMRED NAGAR PARISHAD
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                उमरेड नगरपरिषद | District Nagpur, Maharashtra
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Box sx={{
                flexGrow: 1,
                background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 100%)',
                py: 4,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Pattern */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.05,
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="flex-start">
                        {/* Left Side - Info */}
                        <Grid item xs={12} md={5}>
                            <Box sx={{ color: '#fff', pr: { md: 4 }, pt: { md: 4 } }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                                    Citizen Registration
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#FF9933', mb: 3, fontWeight: 'bold' }}>
                                    नागरिक नोंदणी
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, opacity: 0.9 }}>
                                    Register to access all e-Governance services of Nagpur Municipal Corporation.
                                    Once registered, you can file complaints, pay taxes, and track applications online.
                                </Typography>

                                <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 3, borderRadius: 1, borderLeft: '4px solid #FF9933' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#FF9933' }}>
                                        📋 Registration Requirements
                                    </Typography>
                                    {[
                                        'Valid Email Address',
                                        'Mobile Number',
                                        'Government ID Proof (Aadhar/Voter ID)',
                                        'Ward Information'
                                    ].map((item, i) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <CheckCircleIcon sx={{ fontSize: 18, color: '#138808' }} />
                                            <Typography variant="body2">{item}</Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Tricolor Bar */}
                                <Box sx={{ display: 'flex', mt: 4, gap: 0 }}>
                                    <Box sx={{ width: 60, height: 6, bgcolor: '#FF9933', borderRadius: '3px 0 0 3px' }} />
                                    <Box sx={{ width: 60, height: 6, bgcolor: '#fff' }} />
                                    <Box sx={{ width: 60, height: 6, bgcolor: '#138808', borderRadius: '0 3px 3px 0' }} />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right Side - Registration Form */}
                        <Grid item xs={12} md={7}>
                            <Paper elevation={10} sx={{
                                overflow: 'hidden',
                                borderRadius: 0,
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {/* Form Header */}
                                <Box sx={{ bgcolor: '#FF9933', p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        bgcolor: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 2
                                    }}>
                                        <PersonAddIcon sx={{ fontSize: 28, color: '#1a4e8e' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                                            New Citizen Registration
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#333' }}>
                                            नवीन नागरिक नोंदणी फॉर्म
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Stepper */}
                                <Box sx={{ bgcolor: '#f5f5f5', px: 3, py: 2 }}>
                                    <Stepper activeStep={-1} alternativeLabel>
                                        {steps.map((label, index) => (
                                            <Step key={label}>
                                                <StepLabel
                                                    StepIconProps={{
                                                        sx: { color: '#1a4e8e' }
                                                    }}
                                                >
                                                    <Typography variant="caption">{label}</Typography>
                                                </StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>

                                {/* Form Body */}
                                <Box sx={{ p: 4, bgcolor: '#fff' }}>
                                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 0 }}>{error}</Alert>}

                                    <Box component="form" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            {/* Section: Personal Details */}
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <BadgeIcon sx={{ color: '#1a4e8e' }} />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                                        Personal Details / वैयक्तिक माहिती
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Full Name / पूर्ण नाव"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                    helperText={autoFilled.name ? "✓ Auto-filled from document" : ""}
                                                    FormHelperTextProps={{ sx: { color: '#138808', fontWeight: 'bold' } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Email Address / ईमेल"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Phone Number / फोन नंबर"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    select
                                                    label="Select Ward / वार्ड निवडा"
                                                    name="ward"
                                                    value={formData.ward}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                >
                                                    {WARDS.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            {/* Section: Document Scanner */}
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
                                                    <VerifiedIcon sx={{ color: '#138808' }} />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#138808' }}>
                                                        ID Verification / ओळख पडताळणी
                                                    </Typography>
                                                </Box>
                                                {!showScanner ? (
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => setShowScanner(true)}
                                                        sx={{
                                                            borderRadius: 0,
                                                            borderColor: '#138808',
                                                            color: '#138808',
                                                            '&:hover': { bgcolor: '#138808', color: '#fff' }
                                                        }}
                                                    >
                                                        📷 Scan ID Document / दस्तावेज़ स्कैन करें
                                                    </Button>
                                                ) : (
                                                    <Box sx={{ mb: 2 }}>
                                                        <DocumentScanner
                                                            idType={formData.idProofType}
                                                            onDataExtracted={handleDataExtracted}
                                                        />
                                                    </Box>
                                                )}
                                            </Grid>

                                            {/* Section: ID Verification Fields */}
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
                                                    <VerifiedIcon sx={{ color: '#138808' }} />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#138808' }}>
                                                        ID Verification / ओळख पडताळणी
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    select
                                                    label="ID Proof Type / ओळखपत्र प्रकार (Optional)"
                                                    name="idProofType"
                                                    value={formData.idProofType}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                >
                                                    <MenuItem value="">Select (Optional)</MenuItem>
                                                    {ID_PROOF_TYPES.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="ID Proof Number / ओळखपत्र क्रमांक (Optional)"
                                                    name="idProofNumber"
                                                    value={formData.idProofNumber}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                    helperText={autoFilled.idNumber ? "✓ Auto-filled from document" : "You can add this later in Profile"}
                                                    FormHelperTextProps={{ sx: { color: autoFilled.idNumber ? '#138808' : '#666', fontWeight: autoFilled.idNumber ? 'bold' : 'normal' } }}
                                                />
                                            </Grid>

                                            {/* Section: Password */}
                                            <Grid item xs={12}>
                                                <Divider sx={{ my: 1 }} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    type="password"
                                                    label="Password / पासवर्ड"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    type="password"
                                                    label="Confirm Password / पासवर्ड पुष्टी"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    InputProps={{ sx: { borderRadius: 0 } }}
                                                    size="small"
                                                />
                                            </Grid>

                                            {/* Submit Button */}
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    disabled={loading}
                                                    sx={{
                                                        mt: 2,
                                                        py: 1.5,
                                                        bgcolor: '#138808',
                                                        fontWeight: 'bold',
                                                        fontSize: '1rem',
                                                        borderRadius: 0,
                                                        boxShadow: 3,
                                                        '&:hover': { bgcolor: '#0a5c04', transform: 'translateY(-2px)' },
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <PersonAddIcon sx={{ mr: 1 }} />
                                                    {loading ? 'Registering...' : 'Register / नोंदणी करा'}
                                                </Button>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                                        Already have an account?{' '}
                                                        <Link href="/auth/login" style={{ color: '#1a4e8e', fontWeight: 'bold', textDecoration: 'none' }}>
                                                            Sign In / साइन इन
                                                        </Link>
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>

                                {/* Form Footer */}
                                <Box sx={{ bgcolor: '#f5f5f5', p: 2, textAlign: 'center', borderTop: '1px solid #eee' }}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        🔒 Your data is securely encrypted and protected under IT Act 2000
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Bottom Bar */}
            <Box sx={{ bgcolor: '#138808', py: 1.5 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>
                        Government of Maharashtra | महाराष्ट्र शासन | © {new Date().getFullYear()} Nagpur Municipal Corporation
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}
