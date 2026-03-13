'use client';

import { Container, Grid, Typography, Paper, Box, Divider, Card, CardMedia, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import StarIcon from '@mui/icons-material/Star';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BoltIcon from '@mui/icons-material/Bolt';
import ParkIcon from '@mui/icons-material/Park';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LinkIcon from '@mui/icons-material/Link';

export default function AboutPage() {
    // Core Values
    const coreValues = [
        { icon: <AccountBalanceIcon sx={{ fontSize: 40, color: '#1a4e8e' }} />, title: 'Transparency', desc: 'Open governance with complete accountability' },
        { icon: <HandshakeIcon sx={{ fontSize: 40, color: '#FF9933' }} />, title: 'Service', desc: 'Citizen-first approach in all initiatives' },
        { icon: <BoltIcon sx={{ fontSize: 40, color: '#f9a825' }} />, title: 'Efficiency', desc: 'Swift resolution of civic issues' },
        { icon: <ParkIcon sx={{ fontSize: 40, color: '#388e3c' }} />, title: 'Sustainability', desc: 'Eco-friendly urban development' },
        { icon: <LightbulbIcon sx={{ fontSize: 40, color: '#e65100' }} />, title: 'Innovation', desc: 'Digital-first governance solutions' },
        { icon: <GpsFixedIcon sx={{ fontSize: 40, color: '#d32f2f' }} />, title: 'Integrity', desc: 'Ethical practices in administration' },
    ];

    // Council Members
    const councilMembers = [
        { name: 'मुख्याधिकारी', designation: 'Chief Officer', ward: 'Admin' },
        { name: 'उप नगराध्यक्ष', designation: 'Deputy President', ward: 'Ward 1' },
        { name: 'नगरसेवक', designation: 'Councilor', ward: 'Ward 2' },
        { name: 'नगरसेवक', designation: 'Councilor', ward: 'Ward 3' },
    ];

    // Key Statistics
    const statistics = [
        { number: '13', label: 'Wards' },
        { number: '52,000+', label: 'Citizens Served' },
        { number: '1000+', label: 'Complaints Resolved Monthly' },
        { number: '24x7', label: 'Service Availability' },
    ];

    // Milestones
    const milestones = [
        { year: '1950', event: 'Nagpur Municipal Corporation Established' },
        { year: '1980', event: 'Expansion to 9 Wards' },
        { year: '2005', event: 'Computerization of Records' },
        { year: '2015', event: 'Swachh Bharat Abhiyan Adoption' },
        { year: '2020', event: 'E-Governance Portal Launch' },
        { year: '2026', event: 'Smart City Integration & Majha Nagpur Platform' },
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
                    <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        {/* Government Emblem */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <img src="/emblem_new.png" alt="Government Emblem" style={{ height: 80, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />
                        </Box>

                        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' }, fontFamily: 'Merriweather, serif' }}>
                            उमरेड नगरपरिषद
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.3rem', md: '1.8rem' } }}>
                            Nagpur Municipal Corporation
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#FF9933', mb: 1 }}>
                            जिल्हा नागपूर, महाराष्ट्र राज्य
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
                            District Nagpur, State of Maharashtra | Serving Citizens Since 1950
                        </Typography>

                        {/* Tricolor Bar */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 0 }}>
                            <Box sx={{ width: 60, height: 6, bgcolor: '#FF9933', borderRadius: '3px 0 0 3px' }} />
                            <Box sx={{ width: 60, height: 6, bgcolor: '#fff' }} />
                            <Box sx={{ width: 60, height: 6, bgcolor: '#138808', borderRadius: '0 3px 3px 0' }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container spacing={4}>

                    {/* Left Column - About & History */}
                    <Grid item xs={12} md={8}>

                        {/* About Section */}
                        <Paper sx={{ mb: 4, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccountBalanceIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>About Nagpur Municipal Corporation</Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                    <strong>उमरेड नगरपरिषद</strong> (Nagpur Municipal Corporation) is the governing body responsible for the civic administration of Nagpur town in Nagpur district, Maharashtra. Established in 1950, the council has been at the forefront of urban development and citizen welfare for over seven decades.
                                </Typography>
                                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                    Located approximately 50 kilometers east of Nagpur, Nagpur is renowned for its proximity to the famous <strong>Nagpur Karhandla Wildlife Sanctuary</strong>, making it a unique blend of urban governance and ecological preservation. The town serves as a vital agricultural hub and connects several rural communities to essential urban services.
                                </Typography>
                                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                    The Nagar Parishad administers <strong>13 wards</strong>, serving a population of over 52,000 citizens. Our dedicated team of officials and elected representatives work tirelessly to ensure efficient delivery of civic services including water supply, sanitation, street lighting, road maintenance, and public health initiatives.
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                    Under the leadership of the current administration, we have embraced digital governance through the <strong>"Majha Nagpur"</strong> platform, enabling real-time complaint tracking, ward performance monitoring, and transparent administration aligned with the vision of Digital India.
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Mission & Vision Section */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {/* Vision */}
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ height: '100%', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                    <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '5px solid #1a4e8e', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VisibilityIcon />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Our Vision</Typography>
                                    </Box>
                                    <Box sx={{ p: 3 }}>
                                        <Box sx={{ bgcolor: '#fff8e1', p: 2, borderLeft: '4px solid #FF9933', mb: 2 }}>
                                            <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 500, color: '#333' }}>
                                                "स्वच्छ, सक्षम आणि नागरिक-केंद्रित उमरेड"
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
                                            To transform Nagpur into a <strong>model township</strong> that exemplifies sustainable urban development, digital governance, and citizen empowerment. We envision a city where every citizen has access to efficient civic services, clean environment, and equal opportunities for growth and prosperity.
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <StarIcon fontSize="small" sx={{ color: '#FF9933' }} /> Clean & Green City by 2030
                                            </Typography>
                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <StarIcon fontSize="small" sx={{ color: '#FF9933' }} /> 100% Digital Service Delivery
                                            </Typography>
                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <StarIcon fontSize="small" sx={{ color: '#FF9933' }} /> Zero Pending Grievances
                                            </Typography>
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
                                            <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 500, color: '#333' }}>
                                                "सेवा, पारदर्शकता, विकास"
                                            </Typography>
                                        </Box>
                                        <List dense sx={{ py: 0 }}>
                                            {[
                                                'Deliver efficient and transparent civic services',
                                                'Ensure clean drinking water to every household',
                                                'Maintain hygienic sanitation across all wards',
                                                'Develop sustainable infrastructure for future growth',
                                                'Promote digital literacy and e-governance',
                                                'Preserve environment & support wildlife conservation',
                                            ].map((item, i) => (
                                                <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 28 }}>
                                                        <CheckCircleIcon fontSize="small" sx={{ color: '#138808' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.9rem' }} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Core Values */}
                        <Paper sx={{ mb: 4, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#b71c1c', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmojiEventsIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Core Values</Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Grid container spacing={2}>
                                    {coreValues.map((value, i) => (
                                        <Grid item xs={6} sm={4} key={i}>
                                            <Paper sx={{
                                                p: 2,
                                                textAlign: 'center',
                                                bgcolor: '#fafafa',
                                                border: '1px solid #eee',
                                                transition: '0.2s',
                                                '&:hover': { boxShadow: 2, borderColor: '#FF9933', transform: 'translateY(-2px)' }
                                            }}>
                                                {value.icon}
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1a4e8e', mb: 0.5 }}>{value.title}</Typography>
                                                <Typography variant="caption" sx={{ color: '#666' }}>{value.desc}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>

                        {/* Historical Timeline */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#5d4037', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HistoryEduIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Historical Milestones</Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Box sx={{ position: 'relative', pl: 3, borderLeft: '3px solid #ddd' }}>
                                    {milestones.map((milestone, i) => (
                                        <Box key={i} sx={{ mb: 3, position: 'relative' }}>
                                            <Box sx={{
                                                position: 'absolute',
                                                left: -19,
                                                top: 3,
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                bgcolor: i === milestones.length - 1 ? '#FF9933' : '#1a4e8e',
                                                border: '2px solid #fff',
                                                boxShadow: 1
                                            }} />
                                            <Typography variant="subtitle2" sx={{ color: '#FF9933', fontWeight: 'bold' }}>{milestone.year}</Typography>
                                            <Typography variant="body2" sx={{ color: '#333' }}>{milestone.event}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right Column - Leadership & Stats */}
                    <Grid item xs={12} md={4}>

                        {/* Current Nagar Parishad Leadership */}
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#b71c1c', color: '#fff', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <GroupsIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Current Leadership</Typography>
                            </Box>
                            <Card sx={{ borderRadius: 0 }}>
                                {/* Banner Image */}
                                <CardMedia component="img" height="100" image="/images/banner.png" alt="Banner" sx={{ objectFit: 'cover' }} />

                                <Box sx={{ p: 2, textAlign: 'center' }}>
                                    {/* Profile Image */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: -6, mb: 2 }}>
                                        <CardMedia
                                            component="img"
                                            image="/images/ma'ampng.png"
                                            alt="Municipal President"
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                borderRadius: '50%',
                                                border: '4px solid #fff',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Box>

                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000080', mb: 0.5 }}>
                                        नगराध्यक्ष
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>
                                        Municipal President
                                    </Typography>

                                    <Box sx={{ bgcolor: '#FF9933', color: '#000', py: 0.5, px: 2, display: 'inline-block', borderRadius: 1, mb: 2 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                            उमरेड नगरपरिषद
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555', mb: 2, px: 2 }}>
                                        "उमरेडच्या प्रगतीसाठी कटिबद्ध ! - Committed to the Progress of Nagpur"
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ textAlign: 'left', px: 1 }}>
                                        <Typography variant="caption" display="block" sx={{ mb: 1, color: '#666' }}>
                                            <strong>Key Responsibilities:</strong>
                                        </Typography>
                                        <Typography variant="caption" display="block" sx={{ color: '#333', mb: 0.5 }}>
                                            ✦ Presiding over Council Meetings
                                        </Typography>
                                        <Typography variant="caption" display="block" sx={{ color: '#333', mb: 0.5 }}>
                                            ✦ Civic Administration Oversight
                                        </Typography>
                                        <Typography variant="caption" display="block" sx={{ color: '#333', mb: 0.5 }}>
                                            ✦ Development Projects Approval
                                        </Typography>
                                        <Typography variant="caption" display="block" sx={{ color: '#333' }}>
                                            ✦ Citizen Grievance Redressal
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Paper>

                        {/* Statistics */}
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '5px solid #138808', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BarChartIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>At a Glance</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {statistics.map((stat, i) => (
                                        <Grid item xs={6} key={i}>
                                            <Paper sx={{
                                                p: 2,
                                                textAlign: 'center',
                                                bgcolor: i % 2 === 0 ? '#e8f4fc' : '#fff8e1',
                                                border: '1px solid #eee'
                                            }}>
                                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                                    {stat.number}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>
                                                    {stat.label}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>

                        {/* Contact Information */}
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Details</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    <strong>Address:</strong><br />
                                    Nagpur Municipal Corporation Office,<br />
                                    Main Road, Nagpur - 441203<br />
                                    District Nagpur, Maharashtra
                                </Typography>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <PhoneIcon fontSize="small" /> <strong>Phone:</strong> 07116-222XXX
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EmailIcon fontSize="small" /> <strong>Email:</strong> nagpurnp@gov.in
                                </Typography>
                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <ScheduleIcon fontSize="small" /> <strong>Office Hours:</strong> Mon-Sat, 10:00 AM - 5:00 PM
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Important Links */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#138808', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinkIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Related Links</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {[
                                    { text: 'File a Complaint', href: '/services' },
                                    { text: 'Track Complaint Status', href: '/dashboard' },
                                    { text: 'Maharashtra Govt.', href: 'https://maharashtra.gov.in', external: true },
                                    { text: 'Nagpur District', href: 'https://nagpur.gov.in', external: true },
                                    { text: 'Contact Us', href: '/contact' },
                                ].map((link, i) => (
                                    <ListItem
                                        key={i}
                                        component={link.external ? 'a' : Link}
                                        href={link.href}
                                        target={link.external ? '_blank' : undefined}
                                        rel={link.external ? 'noopener noreferrer' : undefined}
                                        sx={{
                                            color: '#333',
                                            borderBottom: '1px solid #eee',
                                            py: 1,
                                            '&:hover': { bgcolor: '#e8f5e9', pl: 2.5, color: '#138808' },
                                            transition: 'all 0.2s',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#138808' }}>
                                            <ArrowRightIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={link.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                                        {link.external && <Typography variant="caption" sx={{ color: '#999' }}>↗</Typography>}
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
