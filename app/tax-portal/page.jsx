'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, Button, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Divider, Chip, Card, CardContent, CircularProgress, Tabs, Tab,
    LinearProgress, Avatar
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Mock data for demonstration
const mockTaxData = {
    propertyTax: {
        propertyId: 'PROP/UMR/2024/00142',
        address: 'Ward 4, Near Bus Stand, Nagpur',
        propertyType: 'Residential',
        area: '1200 sq.ft',
        assessedValue: 850000,
        currentDemand: 2400,
        arrears: 800,
        penalty: 48,
        totalDue: 3248,
        dueDate: '31 Jan 2026',
        status: 'overdue',
        lastPaid: { amount: 2200, date: '15 Mar 2025' }
    },
    waterTax: {
        consumerId: 'WTR/UMR/2024/00892',
        meterNo: 'MTR-45678',
        connectionType: 'Domestic',
        currentReading: 1320,
        previousReading: 1250,
        consumption: 70,
        rate: 6.5,
        currentBill: 455,
        arrears: 0,
        totalDue: 455,
        dueDate: '25 Jan 2026',
        status: 'pending',
        usageHistory: [
            { month: 'Dec 2025', units: 65, amount: 423 },
            { month: 'Nov 2025', units: 72, amount: 468 },
            { month: 'Oct 2025', units: 68, amount: 442 },
            { month: 'Sep 2025', units: 70, amount: 455 },
            { month: 'Aug 2025', units: 75, amount: 488 }
        ]
    },
    tradeLicense: {
        licenseNo: 'TL/UMR/2024/00056',
        businessName: 'Nagpur General Store',
        category: 'Retail - Grocery',
        address: 'Shop No. 12, Main Bazaar, Ward 3',
        validFrom: '01 Apr 2025',
        validTo: '31 Mar 2026',
        annualFee: 1500,
        renewalDue: false,
        status: 'active'
    }
};

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

export default function TaxPortalPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
        } else {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        }
    }, [router]);

    const totalOutstanding = mockTaxData.propertyTax.totalDue + mockTaxData.waterTax.totalDue;

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
                background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 100%)',
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
                        <AccountBalanceIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                Unified Tax Portal
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                एकीकृत कर पोर्टल | All your municipal dues in one place
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: '#fff3e0', border: '2px solid #FF9933' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <WarningIcon sx={{ color: '#e65100' }} />
                                    <Typography variant="subtitle2" color="textSecondary">Total Outstanding</Typography>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#e65100' }}>
                                    ₹ {totalOutstanding.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Property Tax + Water Bill
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: '#e8f5e9', border: '2px solid #388e3c' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <CheckCircleIcon sx={{ color: '#388e3c' }} />
                                    <Typography variant="subtitle2" color="textSecondary">Last Payment</Typography>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                                    ₹ {mockTaxData.propertyTax.lastPaid.amount.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {mockTaxData.propertyTax.lastPaid.date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: '#e3f2fd', border: '2px solid #1976d2' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <TrendingUpIcon sx={{ color: '#1976d2' }} />
                                    <Typography variant="subtitle2" color="textSecondary">Early Payment Discount</Typography>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    5%
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Pay 30+ days before due date
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Pay All Button */}
                <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#fafafa' }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Pay All Outstanding Dues
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Clear all your pending payments in one transaction
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<PaymentIcon />}
                        sx={{ bgcolor: '#FF9933', color: '#000', fontWeight: 'bold', px: 4 }}
                    >
                        Pay ₹{totalOutstanding.toLocaleString()}
                    </Button>
                </Paper>

                {/* Tabs */}
                <Paper sx={{ borderRadius: 0, boxShadow: 3 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, v) => setActiveTab(v)}
                        variant="fullWidth"
                        sx={{ borderBottom: '1px solid #ddd', bgcolor: '#f5f5f5' }}
                    >
                        <Tab
                            icon={<HomeWorkIcon />}
                            label="Property Tax"
                            iconPosition="start"
                            sx={{ fontWeight: 'bold' }}
                        />
                        <Tab
                            icon={<WaterDropIcon />}
                            label="Water Bill"
                            iconPosition="start"
                            sx={{ fontWeight: 'bold' }}
                        />
                        <Tab
                            icon={<StorefrontIcon />}
                            label="Trade License"
                            iconPosition="start"
                            sx={{ fontWeight: 'bold' }}
                        />
                    </Tabs>

                    {/* Property Tax Tab */}
                    <TabPanel value={activeTab} index={0}>
                        <Box sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <Alert severity={mockTaxData.propertyTax.status === 'overdue' ? 'error' : 'info'} sx={{ mb: 3 }}>
                                        {mockTaxData.propertyTax.status === 'overdue'
                                            ? `Payment overdue! Due date was ${mockTaxData.propertyTax.dueDate}. Penalty of ₹${mockTaxData.propertyTax.penalty} has been added.`
                                            : `Payment due by ${mockTaxData.propertyTax.dueDate}`
                                        }
                                    </Alert>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', width: '40%' }}>Property ID</TableCell>
                                                    <TableCell>{mockTaxData.propertyTax.propertyId}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Owner Name</TableCell>
                                                    <TableCell>{user?.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Address</TableCell>
                                                    <TableCell>{mockTaxData.propertyTax.address}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Property Type</TableCell>
                                                    <TableCell>{mockTaxData.propertyTax.propertyType} | {mockTaxData.propertyTax.area}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Assessed Value</TableCell>
                                                    <TableCell>₹ {mockTaxData.propertyTax.assessedValue.toLocaleString()}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Divider sx={{ my: 3 }} />

                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Payment Breakdown</Typography>
                                    <TableContainer component={Paper} variant="outlined">
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Current Year Demand (2025-26)</TableCell>
                                                    <TableCell align="right">₹ {mockTaxData.propertyTax.currentDemand.toLocaleString()}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Arrears (Previous Years)</TableCell>
                                                    <TableCell align="right" sx={{ color: '#b71c1c' }}>₹ {mockTaxData.propertyTax.arrears.toLocaleString()}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Late Payment Penalty</TableCell>
                                                    <TableCell align="right" sx={{ color: '#b71c1c' }}>₹ {mockTaxData.propertyTax.penalty}</TableCell>
                                                </TableRow>
                                                <TableRow sx={{ bgcolor: '#fff3e0' }}>
                                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total Amount Due</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#e65100' }}>
                                                        ₹ {mockTaxData.propertyTax.totalDue.toLocaleString()}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 3, bgcolor: '#f5f5f5', textAlign: 'center' }}>
                                        <Typography variant="body2" color="textSecondary">Amount to Pay</Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a4e8e', my: 2 }}>
                                            ₹ {mockTaxData.propertyTax.totalDue.toLocaleString()}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            startIcon={<PaymentIcon />}
                                            component={Link}
                                            href="/services/property-tax"
                                            sx={{ bgcolor: '#138808', fontWeight: 'bold', py: 1.5, mb: 2 }}
                                        >
                                            Pay Property Tax
                                        </Button>
                                        <Button variant="outlined" fullWidth startIcon={<ReceiptIcon />}>
                                            Download Statement
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </TabPanel>

                    {/* Water Bill Tab */}
                    <TabPanel value={activeTab} index={1}>
                        <Box sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        Bill for January 2026 | Due: {mockTaxData.waterTax.dueDate}
                                    </Alert>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd', width: '40%' }}>Consumer ID</TableCell>
                                                    <TableCell>{mockTaxData.waterTax.consumerId}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Meter No</TableCell>
                                                    <TableCell>{mockTaxData.waterTax.meterNo}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Connection Type</TableCell>
                                                    <TableCell>{mockTaxData.waterTax.connectionType}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Previous Reading</TableCell>
                                                    <TableCell>{mockTaxData.waterTax.previousReading} units</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Current Reading</TableCell>
                                                    <TableCell>{mockTaxData.waterTax.currentReading} units</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Consumption</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                                                        {mockTaxData.waterTax.consumption} units @ ₹{mockTaxData.waterTax.rate}/unit
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Divider sx={{ my: 3 }} />

                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Usage History (Last 5 Months)</Typography>
                                    <TableContainer component={Paper} variant="outlined">
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Month</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Units</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {mockTaxData.waterTax.usageHistory.map((row, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.month}</TableCell>
                                                        <TableCell align="center">{row.units}</TableCell>
                                                        <TableCell align="right">₹ {row.amount}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 3, bgcolor: '#e3f2fd', textAlign: 'center' }}>
                                        <Typography variant="body2" color="textSecondary">Amount to Pay</Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0288d1', my: 2 }}>
                                            ₹ {mockTaxData.waterTax.totalDue}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            startIcon={<PaymentIcon />}
                                            component={Link}
                                            href="/services/water-bill"
                                            sx={{ bgcolor: '#0288d1', fontWeight: 'bold', py: 1.5, mb: 2 }}
                                        >
                                            Pay Water Bill
                                        </Button>
                                        <Button variant="outlined" fullWidth startIcon={<ReceiptIcon />} sx={{ borderColor: '#0288d1', color: '#0288d1' }}>
                                            Download Bill
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </TabPanel>

                    {/* Trade License Tab */}
                    <TabPanel value={activeTab} index={2}>
                        <Box sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <Alert severity="success" sx={{ mb: 3 }}>
                                        Your trade license is active and valid until {mockTaxData.tradeLicense.validTo}
                                    </Alert>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5', width: '40%' }}>License Number</TableCell>
                                                    <TableCell>{mockTaxData.tradeLicense.licenseNo}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5' }}>Business Name</TableCell>
                                                    <TableCell>{mockTaxData.tradeLicense.businessName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5' }}>Category</TableCell>
                                                    <TableCell>{mockTaxData.tradeLicense.category}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5' }}>Address</TableCell>
                                                    <TableCell>{mockTaxData.tradeLicense.address}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5' }}>Valid From</TableCell>
                                                    <TableCell>{mockTaxData.tradeLicense.validFrom}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5' }}>Valid Until</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#388e3c' }}>{mockTaxData.tradeLicense.validTo}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5' }}>Annual Fee</TableCell>
                                                    <TableCell>₹ {mockTaxData.tradeLicense.annualFee.toLocaleString()}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f3e5f5' }}>Status</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label="ACTIVE"
                                                            color="success"
                                                            size="small"
                                                            icon={<CheckCircleIcon />}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 3, bgcolor: '#f3e5f5', textAlign: 'center' }}>
                                        <CheckCircleIcon sx={{ fontSize: 60, color: '#388e3c', mb: 1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                                            License Active
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                                            Valid until {mockTaxData.tradeLicense.validTo}
                                        </Typography>
                                        <Button variant="outlined" fullWidth startIcon={<ReceiptIcon />} sx={{ mb: 1 }}>
                                            Download Certificate
                                        </Button>
                                        <Button variant="text" fullWidth size="small">
                                            Apply for Renewal
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </TabPanel>
                </Paper>
            </Container>
        </div>
    );
}
