'use client';

import { Container, Grid, Typography, Paper, Button, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Card, CardMedia, CardContent } from '@mui/material';
import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DownloadIcon from '@mui/icons-material/Download';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SecurityIcon from '@mui/icons-material/Security';
import TrafficIcon from '@mui/icons-material/Traffic';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CampaignIcon from '@mui/icons-material/Campaign';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaymentsIcon from '@mui/icons-material/Payments';
import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import DescriptionIcon from '@mui/icons-material/Description';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LinkIcon from '@mui/icons-material/Link';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MainCarousel from './components/MainCarousel';
import InteractiveWardMap from './components/InteractiveWardMap';

export default function Home() {
    // Quick Links with proper routes
    const quickLinks = [
        { text: 'File a Complaint', href: '/services', icon: <EditNoteIcon fontSize="small" /> },
        { text: 'Track Complaint Status', href: '/dashboard', icon: <SearchIcon fontSize="small" /> },
        { text: 'Ward Performance', href: '/dashboard', icon: <BarChartIcon fontSize="small" /> },
        { text: 'Tax Payment', href: '/under-construction', icon: <PaymentsIcon fontSize="small" /> },
        { text: 'Water Bill', href: '/under-construction', icon: <WaterDropIcon fontSize="small" /> },
        { text: 'Property Tax', href: '/under-construction', icon: <HomeIcon fontSize="small" /> },
        { text: 'Building Permissions', href: '/under-construction', icon: <ConstructionIcon fontSize="small" /> },
        { text: 'Trade License', href: '/under-construction', icon: <DescriptionIcon fontSize="small" /> },
    ];

    // Citizen Services
    const citizenServices = [
        { text: 'Birth Certificate', href: '/under-construction', icon: <ChildCareIcon fontSize="small" /> },
        { text: 'Death Certificate', href: '/under-construction', icon: <ArticleIcon fontSize="small" /> },
        { text: 'Marriage Registration', href: '/under-construction', icon: <FavoriteIcon fontSize="small" /> },
        { text: 'Ration Card', href: '/under-construction', icon: <RestaurantIcon fontSize="small" /> },
        { text: 'Domicile Certificate', href: '/under-construction', icon: <AccountBalanceIcon fontSize="small" /> },
    ];

    const whatsNew = [
        { date: '15 Jan 2026', text: 'New online portal launched for citizen grievances.' },
        { date: '12 Jan 2026', text: 'Ward 3 wins Best Sanitation Award.' },
        { date: '10 Jan 2026', text: 'Water supply restored in Sector 5 after pipeline repair.' },
        { date: '08 Jan 2026', text: 'Pulse Polio drive scheduled for 19th January.' },
    ];

    // Downloads with PDF links
    const downloads = [
        { text: 'Birth Certificate Application', href: '/under-construction' },
        { text: 'Death Certificate Application', href: '/under-construction' },
        { text: 'Trade License Form', href: '/under-construction' },
        { text: 'Building Permission Form', href: '/under-construction' },
        { text: 'NOC Application', href: '/under-construction' },
        { text: 'Water Connection Form', href: '/under-construction' },
        { text: 'Property Tax Form', href: '/under-construction' },
    ];

    // Important Links
    const importantLinks = [
        { text: 'Maharashtra Govt.', href: 'https://maharashtra.gov.in', external: true },
        { text: 'India.gov.in', href: 'https://india.gov.in', external: true },
        { text: 'RTI Online', href: 'https://rtionline.gov.in', external: true },
        { text: 'Digital India', href: 'https://digitalindia.gov.in', external: true },
        { text: 'Nagpur District', href: 'https://nagpur.gov.in', external: true },
    ];



    return (
        <div className="flex flex-col">
            {/* Hero Section with Government Styling */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 100%)',
                color: '#fff',
                py: { xs: 4, md: 6 },
                borderBottom: '4px solid #FF9933',
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

                <Container maxWidth="xl">
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Section - Title & Info */}
                        <Grid item xs={12} md={7}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                {/* Government Badge */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <img src="/emblem_new.png" alt="Government Emblem" style={{ height: 60, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#FF9933', fontWeight: 'bold', letterSpacing: 1 }}>
                                            GOVERNMENT OF MAHARASHTRA
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                                            जिल्हा नागपूर | District Nagpur
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '2rem', md: '3.5rem' }, fontFamily: 'Merriweather, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                                    माझा नागपूर
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.2rem', md: '1.8rem' }, color: '#fff' }}>
                                    Nagpur Municipal Corporation
                                </Typography>

                                <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 1, borderLeft: '4px solid #FF9933', mb: 3 }}>
                                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, lineHeight: 1.8 }}>
                                        A <strong>Digital Governance Initiative</strong> under Smart Cities Mission.
                                        Real-time ward performance monitoring, seamless grievance redressal, and transparent accountability for all citizens.
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href="/services"
                                        size="large"
                                        sx={{
                                            bgcolor: '#FF9933',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            px: 4,
                                            '&:hover': { bgcolor: '#e68a00', transform: 'translateY(-2px)' },
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 15px rgba(255,153,51,0.4)'
                                        }}
                                        startIcon={<EditNoteIcon />}
                                    >
                                        File Complaint
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href="/dashboard"
                                        size="large"
                                        sx={{
                                            bgcolor: '#138808',
                                            fontWeight: 'bold',
                                            px: 4,
                                            '&:hover': { bgcolor: '#0e6606', transform: 'translateY(-2px)' },
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 15px rgba(19,136,8,0.4)'
                                        }}
                                        startIcon={<BarChartIcon />}
                                    >
                                        View Dashboard
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        href="/auth/register"
                                        size="large"
                                        sx={{
                                            borderColor: '#fff',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            px: 4,
                                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#FF9933' },
                                        }}
                                    >
                                        Register Now
                                    </Button>
                                </Box>

                                {/* Tricolor Bar */}
                                <Box sx={{ display: 'flex', mt: 4, gap: 0 }}>
                                    <Box sx={{ width: 80, height: 6, bgcolor: '#FF9933', borderRadius: '3px 0 0 3px' }} />
                                    <Box sx={{ width: 80, height: 6, bgcolor: '#fff' }} />
                                    <Box sx={{ width: 80, height: 6, bgcolor: '#138808', borderRadius: '0 3px 3px 0' }} />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right Section - Stats Cards */}
                        <Grid item xs={12} md={5}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <img
                                    src="/images/arts/homeart.png"
                                    alt="Home Art"
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.2))',
                                        borderRadius: '5px'
                                    }}
                                />
                            </Box>

                            {/* Quick Contact */}
                            <Paper sx={{ mt: 2, p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.2)' }}>
                                <Typography variant="subtitle2" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <PhoneIcon fontSize="small" /> Helpline Numbers
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#fff' }}>
                                    Emergency: <strong>112</strong> | Grievance: <strong>07116-222XXX</strong>
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* News Ticker */}
            <Box sx={{ bgcolor: '#2e2e2e', color: '#fff', py: 0.5, overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '2px solid #FF9933' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', animation: 'marquee 30s linear infinite', paddingLeft: '100%' }}>
                    <CampaignIcon fontSize="small" sx={{ mr: 1, color: '#FF9933' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Welcome to Majha Nagpur E-Governance Portal</Typography>

                    <WaterDropIcon fontSize="small" sx={{ mr: 1, color: '#4fc3f7' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Ward No. 4 Water Supply maintenance on 16th Jan</Typography>

                    <CleaningServicesIcon fontSize="small" sx={{ mr: 1, color: '#81c784' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Clean City, Green City</Typography>

                    <Typography variant="body2" sx={{ mr: 4 }}>Download the Mobile App for faster complaints</Typography>

                    <LocalHospitalIcon fontSize="small" sx={{ mr: 1, color: '#e57373' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Pulse Polio Drive on Sunday</Typography>

                    <Typography variant="body2">Ward 3 awarded Best Sanitation</Typography>
                </Box>
                <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
            </Box>

            {/* Mission & Vision Section */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 4, borderBottom: '1px solid #ddd' }}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        {/* Vision */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ height: '100%', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '5px solid #1a4e8e', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VisibilityIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Our Vision</Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Box sx={{ bgcolor: '#fff8e1', p: 2, borderLeft: '4px solid #FF9933', mb: 2 }}>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 600, color: '#333' }}>
                                            "स्वच्छ, सक्षम आणि नागरिक-केंद्रित नागपूर"
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#555' }}>
                                        To transform Nagpur into a <strong>model township</strong> that exemplifies sustainable urban development,
                                        digital governance, and citizen empowerment with 100% digital service delivery by 2030.
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        {['Clean & Green City by 2030', '100% Digital Service Delivery', 'Zero Pending Grievances'].map((item, i) => (
                                            <Typography key={i} variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <StarIcon fontSize="small" sx={{ color: '#FF9933' }} /> {item}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Mission */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ height: '100%', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#138808', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <TrackChangesIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Our Mission</Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Box sx={{ bgcolor: '#e8f5e9', p: 2, borderLeft: '4px solid #138808', mb: 2 }}>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 600, color: '#333' }}>
                                            "सेवा, पारदर्शकता, विकास"
                                        </Typography>
                                    </Box>
                                    <List dense sx={{ py: 0 }}>
                                        {[
                                            'Efficient and transparent civic services',
                                            'Clean drinking water to every household',
                                            'Hygienic sanitation across all 136 wards',
                                            'Digital literacy and e-governance promotion',
                                        ].map((item, i) => (
                                            <ListItem key={i} sx={{ px: 0, py: 0.3 }}>
                                                <ListItemIcon sx={{ minWidth: 24 }}>
                                                    <CheckCircleIcon fontSize="small" sx={{ color: '#138808' }} />
                                                </ListItemIcon>
                                                <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.85rem', color: '#555' }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Main Content with 3-Column Layout */}
            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
                <Grid container spacing={3} direction={{ xs: 'column', md: 'row' }}>

                    {/* Left Sidebar - Government Style */}
                    <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>

                        {/* Quick Links Section */}
                        <Paper sx={{ bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 1.5, borderLeft: '4px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BoltIcon fontSize="small" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Quick Links</Typography>
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
                                            py: 1,
                                            '&:hover': { bgcolor: '#e8f4fc', pl: 2.5, color: '#1a4e8e' },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#1a4e8e', fontSize: '0.9rem' }}>{link.icon}</ListItemIcon>
                                        <ListItemText primary={link.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                                        <ArrowRightIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Citizen Services Section */}
                        <Paper sx={{ mt: 2, bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#e65100', color: '#fff', p: 1.5, borderLeft: '4px solid #1a4e8e', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccountBalanceIcon fontSize="small" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Citizen Services</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {citizenServices.map((service, i) => (
                                    <ListItem
                                        key={i}
                                        component={Link}
                                        href={service.href}
                                        sx={{
                                            color: '#333',
                                            borderBottom: '1px solid #eee',
                                            py: 1,
                                            '&:hover': { bgcolor: '#fff3e0', pl: 2.5, color: '#e65100' },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, fontSize: '0.9rem', color: '#e65100' }}>{service.icon}</ListItemIcon>
                                        <ListItemText primary={service.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                                        <ArrowRightIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Downloads Section */}
                        <Paper sx={{ mt: 2, bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd', boxShadow: 2 }}>
                            <Box sx={{ bgcolor: '#138808', color: '#fff', p: 1.5, borderLeft: '4px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DownloadIcon fontSize="small" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Downloads</Typography>
                            </Box>
                            <List dense sx={{ py: 0, maxHeight: 200, overflow: 'auto' }}>
                                {downloads.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        component={Link}
                                        href={item.href}
                                        sx={{
                                            borderBottom: '1px solid #eee',
                                            py: 0.8,
                                            '&:hover': { bgcolor: '#e8f5e9', pl: 2.5 },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#138808' }}><DownloadIcon sx={{ fontSize: 18 }} /></ListItemIcon>
                                        <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.8rem', color: '#333' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Important Links Section */}
                        <Paper sx={{ mt: 2, bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd', boxShadow: 2 }}>
                            <Box sx={{ bgcolor: '#FF9933', color: '#fff', p: 1.5, borderLeft: '4px solid #138808', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinkIcon fontSize="small" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Important Links</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {importantLinks.map((link, i) => (
                                    <ListItem
                                        key={i}
                                        component="a"
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            borderBottom: '1px solid #eee',
                                            py: 0.8,
                                            '&:hover': { bgcolor: '#fff3e0', pl: 2.5 },
                                            transition: 'all 0.2s',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#FF9933' }}><ArrowRightIcon sx={{ fontSize: 18 }} /></ListItemIcon>
                                        <ListItemText
                                            primary={link.text}
                                            primaryTypographyProps={{ fontSize: '0.8rem', color: '#1a4e8e', fontWeight: 500 }}
                                        />
                                        <Typography variant="caption" sx={{ color: '#999', fontSize: '0.65rem' }}>↗</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                    </Grid>

                    {/* Center - Main Content */}
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>

                        {/* Main Carousel */}
                        <MainCarousel />

                        {/* Civic Services */}
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccountBalanceIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Civic Services</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {[
                                        { title: 'Water Supply', icon: <WaterDropIcon fontSize="large" color="primary" />, desc: 'Real-time water pressure and quality monitoring.' },
                                        { title: 'Sanitation', icon: <CleaningServicesIcon fontSize="large" color="success" />, desc: 'Garbage collection and cleanliness audits.' },
                                        { title: 'Public Safety', icon: <SecurityIcon fontSize="large" color="error" />, desc: 'Crime spots and disaster readiness.' },
                                        { title: 'Roads & Transport', icon: <TrafficIcon fontSize="large" sx={{ color: '#FF9933' }} />, desc: 'Pothole reporting and traffic updates.' },
                                        { title: 'Health', icon: <LocalHospitalIcon fontSize="large" color="error" />, desc: 'Hospital availability and AQI.' },
                                        { title: 'Power Supply', icon: <LightbulbIcon fontSize="large" color="warning" />, desc: 'Street light and outage reporting.' },
                                    ].map((feature, index) => (
                                        <Grid item key={index} xs={6} sm={4}>
                                            <Paper sx={{
                                                p: { xs: 2, md: 3 },
                                                textAlign: 'center',
                                                height: '100%',
                                                transition: '0.2s',
                                                borderRadius: 0,
                                                border: '1px solid #eee',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                '&:hover': { transform: 'translateY(-3px)', boxShadow: 2, borderColor: '#FF9933' }
                                            }}>
                                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>{feature.title}</Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>{feature.desc}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>

                        {/* Interactive Ward Map */}
                        <InteractiveWardMap />
                    </Grid>

                    {/* Right Sidebar - Officials & News */}
                    <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                        {/* Officials Section */}
                        <Paper sx={{ overflow: 'hidden', mb: 3, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#b71c1c', color: '#fff', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Our Leadership</Typography>
                            </Box>
                            <Box sx={{ p: 0 }}>
                                <Card sx={{ mb: 0, borderRadius: 0 }}>
                                    {/* Banner Image */}
                                    <CardMedia component="img" height="100" image="/images/banner.png" alt="Banner" sx={{ objectFit: 'cover' }} />

                                    <Box sx={{ p: 2, textAlign: 'center' }}>
                                        {/* Profile Image */}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: -6, mb: 1 }}>
                                            <CardMedia
                                                component="img"
                                                image="/images/ma'ampng.png"
                                                alt="Municipal President"
                                                sx={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #fff', boxShadow: 3, objectFit: 'cover' }}
                                            />
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080' }}>
                                            नगराध्यक्ष - नागपूर महानगरपालिका
                                        </Typography>

                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FF9933', mb: 1 }}>
                                            Municipal President
                                        </Typography>

                                        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, color: '#555' }}>
                                            "नागपूरच्या प्रगतीसाठी कटिबद्ध !"
                                        </Typography>

                                        <Divider sx={{ my: 1 }} />

                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <AutoAwesomeIcon sx={{ fontSize: 14, color: '#FF9933' }} /> युवा उद्योजिका
                                            </Typography>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <AutoAwesomeIcon sx={{ fontSize: 14, color: '#FF9933' }} /> सामाजिक कार्यकर्त्या
                                            </Typography>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <AutoAwesomeIcon sx={{ fontSize: 14, color: '#FF9933' }} /> महिला सशक्तीकरण
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>

                                {/* Rohit Karoo - Karhandla Secretary */}
                                <Card sx={{ borderRadius: 0, borderTop: '1px solid #eee' }}>
                                    <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#f9f9f9' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                                            <CardMedia
                                                component="img"
                                                image="/images/rohiy.jpeg"
                                                alt="Rohit Karoo"
                                                sx={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid #FF9933', boxShadow: 2, objectFit: 'cover' }}
                                            />
                                        </Box>

                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#000080' }}>
                                            रोहित करू
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FF9933' }}>
                                            Rohit Karoo
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                                            Karhandla Secretary
                                        </Typography>
                                    </Box>
                                </Card>
                            </Box>
                        </Paper>

                        {/* What's New */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd', boxShadow: 3 }}>
                            <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '4px solid #138808', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <NewspaperIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>What's New</Typography>
                            </Box>
                            <List dense sx={{ maxHeight: 250, overflow: 'auto' }}>
                                {whatsNew.map((item, i) => (
                                    <ListItem key={i} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                                        <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}><NewReleasesIcon fontSize="small" color="warning" /></ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            secondary={item.date}
                                            primaryTypographyProps={{ fontSize: '0.85rem' }}
                                            secondaryTypographyProps={{ fontSize: '0.75rem', color: '#666' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ p: 1, textAlign: 'center', borderTop: '1px solid #eee' }}>
                                <Link href="#" style={{ color: '#000080', fontSize: '0.85rem' }}>View All Announcements →</Link>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* End Main Content */}
        </div>
    );
}
