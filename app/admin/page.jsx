'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, TextField, Button, Typography, Box, Alert,
    InputAdornment, IconButton, Divider, Chip
} from '@mui/material';
import Link from 'next/link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TerminalIcon from '@mui/icons-material/Terminal';

export default function AdminLoginPage() {
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

        // Check credentials against env values
        const validCredentials = [
            { email: 'sysadmin@umrednp.gov.in', password: 'Admin@System2026!', role: 'system_admin' },
            { email: 'superadmin@umrednp.gov.in', password: 'Super@Admin2026!', role: 'super_admin' }
        ];

        const validUser = validCredentials.find(
            cred => cred.email === email && cred.password === password
        );

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (validUser) {
            localStorage.setItem('adminUserInfo', JSON.stringify({
                email,
                role: validUser.role,
                name: validUser.role === 'super_admin' ? 'Super Administrator' : 'System Administrator',
                token: 'admin_token_' + Date.now()
            }));
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials. Access denied. This attempt has been logged.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #16213e 100%)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Top Warning Bar */}
            <Box sx={{ bgcolor: '#d32f2f', py: 1 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WarningIcon sx={{ color: '#fff', fontSize: 18 }} />
                        <Typography variant="caption" sx={{ color: '#fff', fontWeight: 'bold' }}>
                            ⚠️ RESTRICTED ACCESS - AUTHORIZED PERSONNEL ONLY | All activities are monitored and logged
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Back Button */}
            <Container maxWidth="lg" sx={{ pt: 2 }}>
                <Button
                    component={Link}
                    href="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#888' }}
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
                    <Paper elevation={10} sx={{
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: '2px solid #138808'
                    }}>
                        {/* Header */}
                        <Box sx={{
                            bgcolor: '#1a1a2e',
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
                                <AdminPanelSettingsIcon sx={{ fontSize: 50, color: '#138808' }} />
                                <TerminalIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                Admin Panel Login
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#888' }}>
                                System Administration | Umred Nagar Parishad
                            </Typography>
                            <Chip
                                label="SECURE"
                                size="small"
                                sx={{ mt: 1, bgcolor: '#138808', color: '#fff' }}
                                icon={<LockIcon sx={{ color: '#fff !important', fontSize: 14 }} />}
                            />
                        </Box>

                        {/* Warning Notice */}
                        <Box sx={{ bgcolor: '#1a1a1a', p: 2, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid #333' }}>
                            <Box sx={{ color: '#ff5722', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                <Typography variant="caption" component="pre" sx={{ m: 0, color: '#ff5722' }}>
                                    [SECURITY] Unauthorized access is a criminal offense.{'\n'}
                                    All login attempts are logged with IP address.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Login Form */}
                        <Box sx={{ p: 4, bgcolor: '#0d0d0d' }}>
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Admin Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@umrednp.gov.in"
                                    sx={{
                                        mb: 2,
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#1a1a2e',
                                            color: '#fff',
                                            '& fieldset': { borderColor: '#333' },
                                            '&:hover fieldset': { borderColor: '#138808' },
                                            '&.Mui-focused fieldset': { borderColor: '#138808' }
                                        },
                                        '& .MuiInputLabel-root': { color: '#888' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#138808' }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon sx={{ color: '#138808' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    required
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{
                                        mb: 3,
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#1a1a2e',
                                            color: '#fff',
                                            '& fieldset': { borderColor: '#333' },
                                            '&:hover fieldset': { borderColor: '#138808' },
                                            '&.Mui-focused fieldset': { borderColor: '#138808' }
                                        },
                                        '& .MuiInputLabel-root': { color: '#888' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#138808' }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon sx={{ color: '#138808' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: '#888' }}>
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
                                        bgcolor: '#138808',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        '&:hover': { bgcolor: '#0a5c04' }
                                    }}
                                >
                                    <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                                    {loading ? 'Authenticating...' : 'Access Admin Panel'}
                                </Button>
                            </Box>

                            <Divider sx={{ my: 3, borderColor: '#333' }} />

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="caption" sx={{ color: '#666' }}>
                                    Access issues? Contact System Administrator<br />
                                    📞 07116-222XXX (Ext: 101)
                                </Typography>
                            </Box>
                        </Box>

                        {/* Footer */}
                        <Box sx={{ bgcolor: '#138808', p: 2, textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#fff' }}>
                                🔒 Secure Connection | TLS 1.3 Encrypted
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </Box>

            {/* Version Info */}
            <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="caption" sx={{ color: '#444', fontFamily: 'monospace' }}>
                    Admin Panel v2.0.26 | Last Security Update: 17 Jan 2026
                </Typography>
            </Box>
        </Box>
    );
}
