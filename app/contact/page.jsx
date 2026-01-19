'use client';

import { useState } from 'react';
import { Container, Typography, Paper, Box, Grid, TextField, Button, Alert, Card, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import WarningIcon from '@mui/icons-material/Warning';
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            icon: <LocationOnIcon sx={{ fontSize: 40, color: '#FF9933' }} />,
            title: 'Office Address',
            titleHi: 'कार्यालय पत्ता',
            content: 'Umred Nagar Parishad Office,\nMain Road, Umred - 441203\nDistrict Nagpur, Maharashtra'
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 40, color: '#138808' }} />,
            title: 'Phone Numbers',
            titleHi: 'दूरध्वनी क्रमांक',
            content: 'Toll Free: 1800-XXX-XXXX\nOffice: 07116-222XXX\nFax: 07116-222XXX'
        },
        {
            icon: <EmailIcon sx={{ fontSize: 40, color: '#1a4e8e' }} />,
            title: 'Email Address',
            titleHi: 'ईमेल पत्ता',
            content: 'contact@umrednp.gov.in\nhelpdesk@umrednp.gov.in\ngrievance@umrednp.gov.in'
        },
        {
            icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#b71c1c' }} />,
            title: 'Office Hours',
            titleHi: 'कार्यालयीन वेळ',
            content: 'Monday - Friday: 10:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed'
        },
    ];

    const emergencyContacts = [
        { icon: <LocalPoliceIcon />, name: 'Police', number: '100', color: '#1a4e8e' },
        { icon: <FireExtinguisherIcon />, name: 'Fire', number: '101', color: '#d32f2f' },
        { icon: <LocalHospitalIcon />, name: 'Ambulance', number: '108', color: '#388e3c' },
        { icon: <ContactSupportIcon />, name: 'Helpline', number: '112', color: '#FF9933' },
    ];

    const quickLinks = [
        { text: 'File a Complaint', href: '/services' },
        { text: 'Track Application', href: '/dashboard' },
        { text: 'Download Forms', href: '/under-construction' },
        { text: 'RTI Information', href: '/under-construction' },
        { text: 'About Umred NP', href: '/about' },
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #FF9933 0%, #e68a00 100%)',
                color: '#000',
                py: { xs: 4, md: 6 },
                borderBottom: '4px solid #138808',
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
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }} />

                <Container maxWidth="xl">
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <img src="/emblem_new.png" alt="Government Emblem" style={{ height: 60, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#000', fontWeight: 'bold', letterSpacing: 1 }}>
                                            UMRED NAGAR PARISHAD
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
                                            उमरेड नगरपरिषद | District Nagpur
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' }, fontFamily: 'Merriweather, serif' }}>
                                    Contact Us
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#1a4e8e', mb: 2, fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 'bold' }}>
                                    संपर्क करें | Get in Touch
                                </Typography>

                                <Box sx={{ bgcolor: 'rgba(255,255,255,0.3)', p: 2, borderRadius: 1, borderLeft: '4px solid #1a4e8e', maxWidth: 700 }}>
                                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                        We are here to help you. Reach out to us for any queries, grievances, or feedback.
                                        Our team is committed to serving the citizens of Umred.
                                    </Typography>
                                </Box>

                                {/* Tricolor Bar */}
                                <Box sx={{ display: 'flex', mt: 3, gap: 0 }}>
                                    <Box sx={{ width: 60, height: 6, bgcolor: '#FF9933', borderRadius: '3px 0 0 3px' }} />
                                    <Box sx={{ width: 60, height: 6, bgcolor: '#fff' }} />
                                    <Box sx={{ width: 60, height: 6, bgcolor: '#138808', borderRadius: '0 3px 3px 0' }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src="/images/arts/contact.png"
                                    alt="Contact Art"
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        maxHeight: '700px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.2))',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>

            {/* Emergency Contacts Bar */}
            <Box sx={{ bgcolor: '#b71c1c', py: 1.5 }}>
                <Container maxWidth="xl">
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 'bold', mr: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <WarningIcon fontSize="small" /> Emergency Numbers:
                            </Typography>
                        </Grid>
                        {emergencyContacts.map((contact, i) => (
                            <Grid item key={i}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1
                                }}>
                                    <Box sx={{ color: '#fff' }}>{contact.icon}</Box>
                                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                        {contact.name}: {contact.number}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* Contact Form */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SendIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Send us a Message</Typography>
                                <Typography variant="caption" sx={{ ml: 'auto', opacity: 0.8 }}>संदेश भेजें</Typography>
                            </Box>
                            <Box sx={{ p: 4 }}>
                                {submitted && (
                                    <Alert severity="success" sx={{ mb: 3, borderRadius: 0 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Thank you for your message!</Typography>
                                        <Typography variant="body2">We will get back to you within 2-3 working days. Your reference number is MSG{Date.now().toString().slice(-6)}.</Typography>
                                    </Alert>
                                )}

                                <Box component="form" onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Your Name / आपले नाव"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                type="email"
                                                label="Email Address / ईमेल"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number / फोन नंबर"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Subject / विषय"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                multiline
                                                rows={5}
                                                label="Your Message / आपला संदेश"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                endIcon={<SendIcon />}
                                                sx={{
                                                    bgcolor: '#138808',
                                                    px: 4,
                                                    py: 1.5,
                                                    fontWeight: 'bold',
                                                    '&:hover': { bgcolor: '#0a5c04', transform: 'translateY(-2px)' },
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Map Section */}
                        <Paper sx={{ mt: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '5px solid #138808', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Location Map</Typography>
                                <Typography variant="caption" sx={{ ml: 'auto' }}>स्थान नकाशा</Typography>
                            </Box>
                            <Box sx={{ position: 'relative', height: 300 }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29723.69097394957!2d79.31!3d20.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2b0bba3f3b9c9d%3A0x5f4e9e9e9e9e9e9e!2sUmred%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                                {/* Overlay for when map doesn't load */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    bgcolor: '#e8f4fc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    zIndex: -1
                                }}>
                                    <LocationOnIcon sx={{ fontSize: 60, color: '#1a4e8e', mb: 2 }} />
                                    <Typography variant="h6" sx={{ color: '#1a4e8e', fontWeight: 'bold' }}>
                                        Umred Nagar Parishad
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        Umred, District Nagpur, Maharashtra 441203
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right Sidebar - Contact Info & Links */}
                    <Grid item xs={12} md={5}>
                        {/* Contact Info Cards */}
                        <Grid container spacing={2}>
                            {contactInfo.map((info, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        borderRadius: 0,
                                        boxShadow: 2,
                                        border: '1px solid #eee',
                                        transition: '0.2s',
                                        '&:hover': { boxShadow: 4, borderColor: '#FF9933' }
                                    }}>
                                        <Box sx={{ mr: 2 }}>{info.icon}</Box>
                                        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                                {info.title}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#FF9933', display: 'block', mb: 0.5 }}>
                                                {info.titleHi}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                                {info.content}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Quick Links */}
                        <Paper sx={{ mt: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#138808', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinkIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Links</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {quickLinks.map((link, i) => (
                                    <ListItem
                                        key={i}
                                        component={Link}
                                        href={link.href}
                                        sx={{
                                            color: '#333',
                                            borderBottom: '1px solid #eee',
                                            py: 1.5,
                                            '&:hover': { bgcolor: '#e8f5e9', pl: 2.5, color: '#138808' },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#138808' }}>
                                            <ArrowRightIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={link.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Important Links */}
                        <Paper sx={{ mt: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PublicIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Government Portals</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {[
                                    { name: 'National Portal of India', url: 'https://www.india.gov.in' },
                                    { name: 'Maharashtra Government', url: 'https://maharashtra.gov.in' },
                                    { name: 'District Nagpur', url: 'https://nagpur.gov.in' },
                                    { name: 'Digital India', url: 'https://digitalindia.gov.in' },
                                    { name: 'RTI Online', url: 'https://rtionline.gov.in' },
                                ].map((link, i) => (
                                    <Box key={i} sx={{ mb: 1 }}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#1a4e8e',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                padding: '8px',
                                                borderRadius: 4,
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#e8f4fc'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <ArrowRightIcon fontSize="small" sx={{ color: '#FF9933' }} />
                                            {link.name}
                                            <Typography variant="caption" sx={{ ml: 'auto', color: '#999' }}>↗</Typography>
                                        </a>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
