'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, TextField, Button, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Divider, Chip, Card, CardContent, CircularProgress, Stepper, Step, StepLabel
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';

export default function PropertyTaxPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [propertyId, setPropertyId] = useState('');
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
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

    // Sample tax data
    const sampleTaxData = {
        propertyId: 'PROP/UMR/2024/001',
        ownerName: '',
        address: 'Ward 4, Near Bus Stand, Nagpur',
        propertyType: 'Residential',
        area: '1200 sq.ft',
        assessmentYear: '2025-26',
        taxAmount: 2400,
        dueDate: '31 Jan 2026',
        lastPaid: '15 Mar 2025',
        status: 'Pending'
    };

    const handleSearch = () => {
        if (propertyId.trim()) {
            setPropertyDetails({
                ...sampleTaxData,
                propertyId: propertyId,
                ownerName: user?.name || 'N/A'
            });
            setActiveStep(1);
        }
    };

    const handlePayment = () => {
        setActiveStep(2);
        setTimeout(() => {
            setPaymentSuccess(true);
            setActiveStep(3);
        }, 2000);
    };

    const steps = ['Search Property', 'View Tax Details', 'Payment', 'Receipt'];

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
                        <HomeWorkIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                Property Tax Payment
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                मालमत्ता कर भरणा | Pay your property tax online
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Stepper */}
                <Paper sx={{ p: 3, mb: 3, borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        {/* Step 1: Search */}
                        {activeStep === 0 && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        🔍 Search Your Property
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        Enter your Property ID or House Number to view tax details
                                    </Alert>
                                    <TextField
                                        fullWidth
                                        label="Property ID / House Number"
                                        placeholder="e.g., PROP/UMR/2024/001 or House No. 123"
                                        value={propertyId}
                                        onChange={(e) => setPropertyId(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleSearch}
                                        disabled={!propertyId.trim()}
                                        sx={{ bgcolor: '#FF9933', color: '#000', fontWeight: 'bold', py: 1.5 }}
                                    >
                                        Search Property
                                    </Button>
                                </Box>
                            </Paper>
                        )}

                        {/* Step 2: Tax Details */}
                        {activeStep === 1 && propertyDetails && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#138808', p: 2, color: '#fff' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        📋 Property Tax Details
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Property ID</TableCell>
                                                    <TableCell>{propertyDetails.propertyId}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Owner Name</TableCell>
                                                    <TableCell>{propertyDetails.ownerName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Address</TableCell>
                                                    <TableCell>{propertyDetails.address}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Property Type</TableCell>
                                                    <TableCell>{propertyDetails.propertyType}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Area</TableCell>
                                                    <TableCell>{propertyDetails.area}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Assessment Year</TableCell>
                                                    <TableCell>{propertyDetails.assessmentYear}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Due Date</TableCell>
                                                    <TableCell sx={{ color: '#b71c1c', fontWeight: 'bold' }}>{propertyDetails.dueDate}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Divider sx={{ my: 3 }} />

                                    <Box sx={{ bgcolor: '#fff3e0', p: 2, borderRadius: 1, border: '2px solid #FF9933', textAlign: 'center' }}>
                                        <Typography variant="body2" sx={{ color: '#e65100' }}>Total Tax Amount</Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                            ₹ {propertyDetails.taxAmount.toLocaleString()}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setActiveStep(0)}
                                            sx={{ flex: 1 }}
                                        >
                                            Search Again
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handlePayment}
                                            startIcon={<PaymentIcon />}
                                            sx={{ flex: 2, bgcolor: '#138808', fontWeight: 'bold', py: 1.5 }}
                                        >
                                            Pay Now - ₹{propertyDetails.taxAmount}
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        )}

                        {/* Step 3: Processing */}
                        {activeStep === 2 && (
                            <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 0, boxShadow: 3 }}>
                                <CircularProgress size={60} sx={{ color: '#FF9933', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                    Processing Payment...
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                                    Please do not close this window
                                </Typography>
                            </Paper>
                        )}

                        {/* Step 4: Success */}
                        {activeStep === 3 && paymentSuccess && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#388e3c', p: 3, color: '#fff', textAlign: 'center' }}>
                                    <CheckCircleIcon sx={{ fontSize: 60, mb: 1 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        Payment Successful!
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Alert severity="success" sx={{ mb: 3 }}>
                                        Your property tax payment has been received. A receipt has been sent to your registered email.
                                    </Alert>

                                    <Card sx={{ bgcolor: '#f5f5f5', mb: 3 }}>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">Transaction ID</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                                TXN{Date.now().toString().slice(-8)}
                                            </Typography>
                                            <Divider sx={{ my: 1 }} />
                                            <Typography variant="body2" color="textSecondary">Amount Paid</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                                                ₹ {propertyDetails?.taxAmount.toLocaleString()}
                                            </Typography>
                                            <Divider sx={{ my: 1 }} />
                                            <Typography variant="body2" color="textSecondary">Date & Time</Typography>
                                            <Typography variant="body1">
                                                {new Date().toLocaleString('en-IN')}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<ReceiptIcon />}
                                            fullWidth
                                            sx={{ borderColor: '#1a4e8e', color: '#1a4e8e' }}
                                        >
                                            Download Receipt
                                        </Button>
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            href="/dashboard"
                                            fullWidth
                                            sx={{ bgcolor: '#FF9933', color: '#000' }}
                                        >
                                            Back to Dashboard
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        )}
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd', mb: 3 }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Important Information
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {[
                                    'Property tax is payable annually',
                                    'Last date: 31st January 2026',
                                    '5% rebate on early payment',
                                    'Late fee: 2% per month',
                                    'Keep property ID for tracking'
                                ].map((info, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                        <CheckCircleIcon sx={{ color: '#138808', fontSize: 18 }} />
                                        <Typography variant="body2">{info}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    📞 Need Help?
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Toll Free:</strong> 1800-XXX-XXXX
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Email:</strong> tax@nagpurnp.gov.in
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Office:</strong> Mon-Sat, 10AM-5PM
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
