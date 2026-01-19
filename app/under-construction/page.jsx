'use client';

import { Container, Typography, Box, Button, Paper, Divider, Grid, LinearProgress } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import UpdateIcon from '@mui/icons-material/Update';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function UnderConstruction() {
    const availableServices = [
        { name: 'File Complaint', href: '/services', icon: <EditNoteIcon /> },
        { name: 'View Dashboard', href: '/dashboard', icon: <BarChartIcon /> },
        { name: 'Contact Us', href: '/contact', icon: <PhoneIcon /> },
        { name: 'About Us', href: '/about', icon: <InfoIcon /> },
    ];

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
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                py: 6,
                display: 'flex',
                alignItems: 'center'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Side - Main Message */}
                        <Grid item xs={12} md={7}>
                            <Paper elevation={6} sx={{
                                overflow: 'hidden',
                                borderRadius: 0,
                                border: '1px solid #ddd'
                            }}>
                                {/* Header Strip */}
                                <Box sx={{
                                    bgcolor: '#FF9933',
                                    py: 2,
                                    px: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <ConstructionIcon sx={{ fontSize: 32, color: '#000' }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
                                            सूचना / NOTICE
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#333' }}>
                                            Official Announcement
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', bgcolor: '#fff' }}>
                                    {/* Animated Icon */}
                                    <Box sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: '50%',
                                        bgcolor: '#fff3e0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3,
                                        boxShadow: 3,
                                        animation: 'pulse 2s infinite'
                                    }}>
                                        <EngineeringIcon sx={{ fontSize: 50, color: '#e65100' }} />
                                    </Box>

                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a4e8e', mb: 1 }}>
                                        हे पृष्ठ निर्माणाधीन आहे
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: '#666', mb: 3 }}>
                                        This Page is Under Construction
                                    </Typography>

                                    {/* Progress Indicator */}
                                    <Box sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Development Progress</Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#FF9933' }}>65%</Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={65}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                bgcolor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: '#FF9933',
                                                    borderRadius: 5
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Paper sx={{ bgcolor: '#e3f2fd', p: 3, mx: 'auto', maxWidth: 500, borderRadius: 0, borderLeft: '4px solid #1a4e8e' }}>
                                        <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.8 }}>
                                            नागरिकांना कळविण्यात येते की निवडलेले वेब पृष्ठ अद्याप तयार होत आहे.
                                            असुविधेबद्दल क्षमस्व. कृपया इतर उपलब्ध सेवांचा लाभ घ्या.
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                            Citizens are informed that the selected web page is still under development.
                                            We regret the inconvenience. Please avail other available services.
                                        </Typography>
                                    </Paper>

                                    {/* Expected Completion */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 3 }}>
                                        <UpdateIcon sx={{ color: '#138808' }} />
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Expected Completion: <strong>February 2026</strong>
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ my: 3 }} />

                                    {/* Action Buttons */}
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            href="/"
                                            startIcon={<HomeIcon />}
                                            sx={{
                                                bgcolor: '#1a4e8e',
                                                '&:hover': { bgcolor: '#0d3a6e', transform: 'translateY(-2px)' },
                                                px: 4, py: 1.5,
                                                borderRadius: 0,
                                                fontWeight: 'bold',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            मुखपृष्ठ (HOME)
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            onClick={() => window.history.back()}
                                            startIcon={<ArrowBackIcon />}
                                            sx={{
                                                color: '#b71c1c',
                                                borderColor: '#b71c1c',
                                                '&:hover': { bgcolor: '#ffebee', borderColor: '#b71c1c' },
                                                px: 4, py: 1.5,
                                                borderRadius: 0,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            मागे (BACK)
                                        </Button>
                                    </Box>
                                </Box>

                                {/* Footer Strip */}
                                <Box sx={{
                                    bgcolor: '#138808',
                                    py: 1.5,
                                    px: 3,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 0
                                }}>
                                    <Box sx={{ width: 40, height: 4, bgcolor: '#FF9933' }} />
                                    <Box sx={{ width: 40, height: 4, bgcolor: '#fff' }} />
                                    <Box sx={{ width: 40, height: 4, bgcolor: '#138808', border: '1px solid #fff' }} />
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Right Side - Available Services */}
                        <Grid item xs={12} md={5}>
                            <Paper elevation={3} sx={{
                                overflow: 'hidden',
                                borderRadius: 0,
                                border: '1px solid #ddd'
                            }}>
                                <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Available Services
                                    </Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        उपलब्ध सेवा
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 0 }}>
                                    {availableServices.map((service, i) => (
                                        <Box
                                            key={i}
                                            component={Link}
                                            href={service.href}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                p: 2,
                                                borderBottom: '1px solid #eee',
                                                textDecoration: 'none',
                                                color: '#333',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    bgcolor: '#e8f4fc',
                                                    pl: 3,
                                                    color: '#1a4e8e'
                                                }
                                            }}
                                        >
                                            <Box sx={{ color: '#1a4e8e' }}>{service.icon}</Box>
                                            <Typography variant="body1" sx={{ fontWeight: 500, flexGrow: 1 }}>
                                                {service.name}
                                            </Typography>
                                            <ArrowRightIcon sx={{ color: '#FF9933' }} />
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>

                            {/* Help Desk Card */}
                            <Paper elevation={3} sx={{
                                mt: 3,
                                overflow: 'hidden',
                                borderRadius: 0,
                                border: '1px solid #ddd'
                            }}>
                                <Box sx={{ bgcolor: '#FF9933', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <SupportAgentIcon sx={{ color: '#000' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                                        Need Help?
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2, bgcolor: '#fff' }}>
                                    <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <PhoneIcon fontSize="small" /> <strong>Toll Free:</strong> 1800-XXX-XXXX
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <EmailIcon fontSize="small" /> <strong>Email:</strong> helpdesk@umrednp.gov.in
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ScheduleIcon fontSize="small" /> <strong>Hours:</strong> Mon-Sat, 10AM - 5PM
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Bottom Bar */}
            <Box sx={{ bgcolor: '#1a4e8e', py: 1.5 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>
                        © {new Date().getFullYear()} Umred Nagar Parishad | उमरेड नगरपरिषद | All Rights Reserved
                    </Typography>
                </Container>
            </Box>

            {/* CSS Animation */}
            <style jsx global>{`
                @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(230, 81, 0, 0.4); }
                    50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(230, 81, 0, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(230, 81, 0, 0); }
                }
            `}</style>
        </Box>
    );
}
