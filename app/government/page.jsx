'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, TextField, Button, Typography, Box, Alert,
    InputAdornment, IconButton, Divider
} from '@mui/material';
import Link from 'next/link';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GovernmentLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Check credentials against env values (in production, this would be server-side)
        const validCredentials = [
            { email: 'govtadmin@umrednp.gov.in', password: 'Gov@Umred2026!' },
            { email: 'superadmin@umrednp.gov.in', password: 'Super@Admin2026!' }
        ];

        const isValid = validCredentials.some(
            cred => cred.email === email && cred.password === password
        );

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (isValid) {
            localStorage.setItem('govtUserInfo', JSON.stringify({
                email,
                role: 'government_official',
                name: 'Government Official',
                token: 'govt_token_' + Date.now()
            }));
            router.push('/government/dashboard');
        } else {
            setError('Invalid credentials. Access is restricted to authorized government officials only.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 50%, #1a4e8e 100%)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Top Bar */}
            <Box sx={{ bgcolor: '#FF9933', py: 1 }}>
                <Container maxWidth="lg">
                    <Typography variant="caption" sx={{ color: '#000', fontWeight: 'bold' }}>
                        🔒 SECURE GOVERNMENT PORTAL | सुरक्षित सरकारी पोर्टल
                    </Typography>
                </Container>
            </Box>

            {/* Back Button */}
            <Container maxWidth="lg" sx={{ pt: 2 }}>
                <Button
                    component={Link}
                    href="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#fff' }}
                >
                    Back to Home
                </Button>
            </Container>

            {/* Main Content */}
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4
            }}>
                <Container maxWidth="sm">
                    <Paper elevation={10} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                        {/* Header */}
                        <Box sx={{
                            bgcolor: '#FF9933',
                            p: 3,
                            textAlign: 'center',
                            borderBottom: '4px solid #138808'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                mb: 2
                            }}>
                                <img src="/emblem_new.png" alt="Government Emblem" style={{ height: 60 }} />
                                <AccountBalanceIcon sx={{ fontSize: 50, color: '#1a4e8e' }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                Government Portal Login
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333' }}>
                                सरकारी पोर्टल लॉगिन | Umred Nagar Parishad
                            </Typography>
                        </Box>

                        {/* Security Notice */}
                        <Box sx={{ bgcolor: '#fff3e0', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SecurityIcon sx={{ color: '#e65100' }} />
                            <Typography variant="caption" sx={{ color: '#e65100' }}>
                                <strong>Restricted Access:</strong> This portal is for authorized government officials only.
                                Unauthorized access attempts will be logged.
                            </Typography>
                        </Box>

                        {/* Login Form */}
                        <Box sx={{ p: 4 }}>
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Official Email / अधिकृत ईमेल"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@umrednp.gov.in"
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon sx={{ color: '#1a4e8e' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    required
                                    label="Password / पासवर्ड"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon sx={{ color: '#1a4e8e' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        py: 1.5,
                                        bgcolor: '#1a4e8e',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        '&:hover': { bgcolor: '#0d2e5a' }
                                    }}
                                >
                                    <LockIcon sx={{ mr: 1 }} />
                                    {loading ? 'Authenticating...' : 'Secure Login / सुरक्षित लॉगिन'}
                                </Button>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="caption" sx={{ color: '#666' }}>
                                    Forgot password? Contact IT Department<br />
                                    📞 07116-222XXX | 📧 it@umrednp.gov.in
                                </Typography>
                            </Box>
                        </Box>

                        {/* Footer */}
                        <Box sx={{ bgcolor: '#1a4e8e', p: 2, textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#fff' }}>
                                © 2026 Umred Nagar Parishad | Government of Maharashtra
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </Box>

            {/* Bottom Tricolor */}
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1, height: 6, bgcolor: '#FF9933' }} />
                <Box sx={{ flex: 1, height: 6, bgcolor: '#fff' }} />
                <Box sx={{ flex: 1, height: 6, bgcolor: '#138808' }} />
            </Box>
        </Box>
    );
}
