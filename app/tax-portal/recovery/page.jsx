'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, Button, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Card, CardContent, CircularProgress, LinearProgress,
    TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
    IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';

// Mock defaulter data with AI risk scores
const mockDefaulters = [
    {
        id: 1,
        name: 'Ramesh Kumar',
        propertyId: 'PROP/UMR/2024/00142',
        ward: 'Ward 4',
        phone: '98XXXXXX12',
        totalDue: 12500,
        overdueDays: 120,
        lastPayment: '15 Mar 2025',
        aiRisk: { score: 85, level: 'critical', reason: 'Long overdue + No response to reminders' },
        remindersSent: 5,
        escalationLevel: 4
    },
    {
        id: 2,
        name: 'Sunita Devi',
        propertyId: 'PROP/UMR/2024/00256',
        ward: 'Ward 2',
        phone: '97XXXXXX34',
        totalDue: 8200,
        overdueDays: 75,
        lastPayment: '01 Jun 2025',
        aiRisk: { score: 68, level: 'high', reason: 'Seasonal default pattern + Financial hardship indicators' },
        remindersSent: 3,
        escalationLevel: 3
    },
    {
        id: 3,
        name: 'Mahesh Patil',
        propertyId: 'PROP/UMR/2024/00089',
        ward: 'Ward 7',
        phone: '99XXXXXX56',
        totalDue: 4500,
        overdueDays: 45,
        lastPayment: '20 Aug 2025',
        aiRisk: { score: 42, level: 'medium', reason: 'First-time delay + Good payment history' },
        remindersSent: 2,
        escalationLevel: 2
    },
    {
        id: 4,
        name: 'Priya Sharma',
        propertyId: 'PROP/UMR/2024/00312',
        ward: 'Ward 1',
        phone: '98XXXXXX78',
        totalDue: 2800,
        overdueDays: 20,
        lastPayment: '10 Nov 2025',
        aiRisk: { score: 18, level: 'low', reason: 'Minor delay + Regular payer + High engagement' },
        remindersSent: 1,
        escalationLevel: 1
    },
    {
        id: 5,
        name: 'Vijay Meshram',
        propertyId: 'PROP/UMR/2024/00178',
        ward: 'Ward 9',
        phone: '97XXXXXX90',
        totalDue: 15800,
        overdueDays: 180,
        lastPayment: '01 Jan 2025',
        aiRisk: { score: 92, level: 'critical', reason: 'Chronic defaulter + Multiple properties + Legal notice pending' },
        remindersSent: 8,
        escalationLevel: 5
    }
];

const riskColors = {
    critical: '#d32f2f',
    high: '#f57c00',
    medium: '#fbc02d',
    low: '#388e3c'
};

const escalationLabels = {
    1: 'Auto Reminder',
    2: 'Voice Call',
    3: 'Official Notice',
    4: 'Legal Notice',
    5: 'Auction Prep'
};

export default function SmartRecoveryPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('all');
    const [wardFilter, setWardFilter] = useState('all');
    const [selectedDefaulter, setSelectedDefaulter] = useState(null);
    const [emiDialogOpen, setEmiDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
        } else {
            const userData = JSON.parse(storedUser);
            // Only officials and admins can access
            if (userData.role === 'citizen') {
                router.push('/dashboard');
            } else {
                setUser(userData);
                setLoading(false);
            }
        }
    }, [router]);

    const filteredDefaulters = mockDefaulters.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.propertyId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRisk = riskFilter === 'all' || d.aiRisk.level === riskFilter;
        const matchesWard = wardFilter === 'all' || d.ward === wardFilter;
        return matchesSearch && matchesRisk && matchesWard;
    });

    const totalOutstanding = mockDefaulters.reduce((sum, d) => sum + d.totalDue, 0);
    const criticalCount = mockDefaulters.filter(d => d.aiRisk.level === 'critical').length;
    const highCount = mockDefaulters.filter(d => d.aiRisk.level === 'high').length;

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
                background: 'linear-gradient(135deg, #b71c1c 0%, #7f0000 100%)',
                color: '#fff',
                py: 3,
                borderBottom: '4px solid #FF9933'
            }}>
                <Container maxWidth="lg">
                    <Button
                        component={Link}
                        href="/nagpur-gov-dashboard"
                        startIcon={<ArrowBackIcon />}
                        sx={{ color: '#fff', mb: 2 }}
                    >
                        Back to Government Dashboard
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SmartToyIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                Smart Recovery Engine
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                AI-powered defaulter prediction and collection management
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#ffebee', border: '2px solid #d32f2f' }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">Total Outstanding</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                    ₹{(totalOutstanding / 1000).toFixed(1)}K
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#fff3e0', border: '2px solid #f57c00' }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">Critical Cases</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                                    {criticalCount}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#e3f2fd', border: '2px solid #1976d2' }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">Recovery Rate</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    78%
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#e8f5e9', border: '2px solid #388e3c' }}>
                            <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">Collected This Month</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                                    ₹52K
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filters */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search by name or property ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Risk Level</InputLabel>
                                <Select
                                    value={riskFilter}
                                    onChange={(e) => setRiskFilter(e.target.value)}
                                    label="Risk Level"
                                >
                                    <MenuItem value="all">All Levels</MenuItem>
                                    <MenuItem value="critical">Critical</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="low">Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Ward</InputLabel>
                                <Select
                                    value={wardFilter}
                                    onChange={(e) => setWardFilter(e.target.value)}
                                    label="Ward"
                                >
                                    <MenuItem value="all">All Wards</MenuItem>
                                    {[...Array(13)].map((_, i) => (
                                        <MenuItem key={i} value={`Ward ${i + 1}`}>Ward {i + 1}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="outlined" fullWidth startIcon={<FilterListIcon />}>
                                More Filters
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Defaulters Table */}
                <Paper sx={{ boxShadow: 3 }}>
                    <Box sx={{ bgcolor: '#b71c1c', p: 2, color: '#fff' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Defaulter List ({filteredDefaulters.length} cases)
                        </Typography>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Name / Property</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">AI Risk Score</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount Due</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Overdue Days</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Escalation</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredDefaulters.map((defaulter) => (
                                    <TableRow key={defaulter.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PersonIcon sx={{ color: '#999' }} />
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                        {defaulter.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {defaulter.propertyId} | {defaulter.ward}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                <Chip
                                                    label={`${defaulter.aiRisk.score}%`}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: riskColors[defaulter.aiRisk.level],
                                                        color: '#fff',
                                                        fontWeight: 'bold',
                                                        mb: 0.5
                                                    }}
                                                />
                                                <Typography variant="caption" display="block" color="textSecondary">
                                                    {defaulter.aiRisk.level.toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                                ₹{defaulter.totalDue.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={`${defaulter.overdueDays} days`}
                                                size="small"
                                                color={defaulter.overdueDays > 90 ? 'error' : defaulter.overdueDays > 30 ? 'warning' : 'default'}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={`L${defaulter.escalationLevel}: ${escalationLabels[defaulter.escalationLevel]}`}
                                                size="small"
                                                variant="outlined"
                                                color={defaulter.escalationLevel >= 4 ? 'error' : 'default'}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <Tooltip title="Send SMS">
                                                    <IconButton size="small" sx={{ bgcolor: '#e3f2fd' }}>
                                                        <PhoneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Send WhatsApp">
                                                    <IconButton size="small" sx={{ bgcolor: '#e8f5e9' }}>
                                                        <WhatsAppIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Create EMI Plan">
                                                    <IconButton
                                                        size="small"
                                                        sx={{ bgcolor: '#fff3e0' }}
                                                        onClick={() => {
                                                            setSelectedDefaulter(defaulter);
                                                            setEmiDialogOpen(true);
                                                        }}
                                                    >
                                                        <PaymentIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {/* AI Insights */}
                <Paper sx={{ mt: 3, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <SmartToyIcon sx={{ color: '#1976d2' }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>AI Insights</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Alert severity="warning" sx={{ mb: 1 }}>
                                <strong>2 Critical Cases</strong> require immediate attention - legal proceedings may be necessary
                            </Alert>
                            <Alert severity="info">
                                <strong>Prediction:</strong> 3 accounts likely to default next month based on payment patterns
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Alert severity="success" sx={{ mb: 1 }}>
                                <strong>Best Time to Contact:</strong> Tuesday-Thursday, 10AM-12PM shows highest response rate
                            </Alert>
                            <Alert severity="info">
                                <strong>EMI Plans:</strong> Offering 6-month EMI increased recovery by 35% last quarter
                            </Alert>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

            {/* EMI Dialog */}
            <Dialog open={emiDialogOpen} onClose={() => setEmiDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create EMI Plan for {selectedDefaulter?.name}</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Alert severity="info" sx={{ mb: 2 }}>
                            Total Due: <strong>₹{selectedDefaulter?.totalDue.toLocaleString()}</strong>
                        </Alert>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>EMI Duration</InputLabel>
                            <Select defaultValue={6} label="EMI Duration">
                                <MenuItem value={3}>3 Months (₹{Math.round(selectedDefaulter?.totalDue / 3)}/month)</MenuItem>
                                <MenuItem value={6}>6 Months (₹{Math.round(selectedDefaulter?.totalDue / 6)}/month)</MenuItem>
                                <MenuItem value={12}>12 Months (₹{Math.round(selectedDefaulter?.totalDue / 12)}/month)</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Down Payment"
                            type="number"
                            defaultValue={Math.round(selectedDefaulter?.totalDue * 0.1)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Notes"
                            multiline
                            rows={2}
                            placeholder="Add any special conditions or notes..."
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEmiDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setEmiDialogOpen(false)}>
                        Create EMI Plan
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
