'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Grid, Divider } from '@mui/material';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

// Dynamic API URL - uses relative path when accessed via tunnel, localhost when local
const getApiBaseUrl = () => {
    if (typeof window === 'undefined') return 'http://localhost:5000';
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        return window.location.origin;
    }
    return 'http://localhost:5000';
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                router.push('/dashboard');
                window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                display: 'flex',
                alignItems: 'center',
                backgroundImage: 'url("/images/karandla.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                py: 4,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(26, 78, 142, 0.85) 0%, rgba(13, 46, 90, 0.9) 100%)',
                    zIndex: 1,
                }
            }}>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Side - Info */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ color: '#fff', pr: { md: 4 } }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                                    Citizen Portal
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#FF9933', mb: 3, fontWeight: 'bold' }}>
                                    नागरिक पोर्टल
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, opacity: 0.9 }}>
                                    Welcome to the official e-Governance portal of Nagpur Municipal Corporation.
                                    Access all municipal services, file grievances, pay taxes, and track applications online.
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {[
                                        { icon: <SecurityIcon />, text: 'Secure & Encrypted Login' },
                                        { icon: <VerifiedUserIcon />, text: 'Verified Citizen Access' },
                                        { icon: <SupportAgentIcon />, text: '24x7 Online Support' },
                                    ].map((item, i) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ bgcolor: 'rgba(255,153,51,0.2)', p: 1, borderRadius: 1, color: '#FF9933' }}>
                                                {item.icon}
                                            </Box>
                                            <Typography variant="body1">{item.text}</Typography>
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

                        {/* Right Side - Login Form */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={10} sx={{
                                overflow: 'hidden',
                                borderRadius: 0,
                                maxWidth: 450,
                                mx: 'auto',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {/* Form Header */}
                                <Box sx={{ bgcolor: '#FF9933', p: 3, textAlign: 'center' }}>
                                    <Box sx={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: '50%',
                                        bgcolor: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2,
                                        boxShadow: 3
                                    }}>
                                        <PersonIcon sx={{ fontSize: 40, color: '#1a4e8e' }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
                                        Citizen Login
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#333' }}>
                                        नागरिक लॉगिन
                                    </Typography>
                                </Box>

                                {/* Form Body */}
                                <Box sx={{ p: 4, bgcolor: '#fff' }}>
                                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 0 }}>{error}</Alert>}

                                    <Box component="form" onSubmit={handleSubmit}>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333', mb: 0.5, display: 'block' }}>
                                                Email Address / ईमेल पत्ता *
                                            </Typography>
                                            <TextField
                                                required
                                                fullWidth
                                                placeholder="Enter your registered email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                InputProps={{
                                                    sx: { borderRadius: 0, bgcolor: '#f9f9f9' }
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333', mb: 0.5, display: 'block' }}>
                                                Password / पासवर्ड *
                                            </Typography>
                                            <TextField
                                                required
                                                fullWidth
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                InputProps={{
                                                    sx: { borderRadius: 0, bgcolor: '#f9f9f9' }
                                                }}
                                            />
                                        </Box>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            disabled={loading}
                                            sx={{
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
                                            <LockIcon sx={{ mr: 1 }} />
                                            {loading ? 'Signing in...' : 'Sign In / साइन इन करा'}
                                        </Button>

                                        {/* Demo Admin Login */}
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => {
                                                setEmail('admin@nagpur.gov.in');
                                                setPassword('admin123');
                                            }}
                                            sx={{
                                                mt: 2,
                                                py: 1.5,
                                                borderColor: '#FF9933',
                                                color: '#FF9933',
                                                fontWeight: 'bold',
                                                borderRadius: 0,
                                                '&:hover': { bgcolor: 'rgba(255,153,51,0.1)', borderColor: '#FF9933' }
                                            }}
                                        >
                                            <PersonIcon sx={{ mr: 1 }} />
                                            Demo Admin Login
                                        </Button>

                                        <Divider sx={{ my: 3 }}>
                                            <Typography variant="caption" sx={{ color: '#999' }}>OR</Typography>
                                        </Divider>

                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                                Don't have an account?
                                            </Typography>
                                            <Button
                                                component={Link}
                                                href="/auth/register"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    color: '#1a4e8e',
                                                    borderColor: '#1a4e8e',
                                                    borderRadius: 0,
                                                    fontWeight: 'bold',
                                                    '&:hover': { bgcolor: '#e8f4fc', borderColor: '#1a4e8e' }
                                                }}
                                            >
                                                Register Now / नोंदणी करा
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Form Footer */}
                                <Box sx={{ bgcolor: '#f5f5f5', p: 2, textAlign: 'center', borderTop: '1px solid #eee' }}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        🔒 Your data is securely encrypted
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
