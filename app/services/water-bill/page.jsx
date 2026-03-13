'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, TextField, Button, Alert,
    Table, TableBody, TableCell, TableContainer, TableRow,
    Divider, Card, CardContent, CircularProgress, Stepper, Step, StepLabel
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';

export default function WaterBillPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [consumerId, setConsumerId] = useState('');
    const [billDetails, setBillDetails] = useState(null);
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

    const sampleBillData = {
        consumerId: 'WTR/UMR/2024/001',
        consumerName: '',
        address: 'Ward 4, Nagpur',
        connectionType: 'Domestic',
        meterNo: 'MTR-45678',
        billMonth: 'January 2026',
        previousReading: 1250,
        currentReading: 1320,
        consumption: 70,
        rate: 6.5,
        billAmount: 455,
        dueDate: '25 Jan 2026',
        status: 'Unpaid'
    };

    const handleSearch = () => {
        if (consumerId.trim()) {
            setBillDetails({
                ...sampleBillData,
                consumerId: consumerId,
                consumerName: user?.name || 'N/A'
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

    const steps = ['Search Bill', 'View Details', 'Payment', 'Receipt'];

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
                background: 'linear-gradient(135deg, #0288d1 0%, #01579b 100%)',
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
                        <WaterDropIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                Water Bill Payment
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                पाणी बिल भरणा | Pay your water bill online
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
                                <Box sx={{ bgcolor: '#0288d1', p: 2, color: '#fff' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        🔍 Search Your Water Bill
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        Enter your Consumer ID or Meter Number to view bill details
                                    </Alert>
                                    <TextField
                                        fullWidth
                                        label="Consumer ID / Meter Number"
                                        placeholder="e.g., WTR/UMR/2024/001 or MTR-12345"
                                        value={consumerId}
                                        onChange={(e) => setConsumerId(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleSearch}
                                        disabled={!consumerId.trim()}
                                        sx={{ bgcolor: '#FF9933', color: '#000', fontWeight: 'bold', py: 1.5 }}
                                    >
                                        Search Bill
                                    </Button>
                                </Box>
                            </Paper>
                        )}

                        {/* Step 2: Bill Details */}
                        {activeStep === 1 && billDetails && (
                            <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#0288d1', p: 2, color: '#fff' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        💧 Water Bill Details - {billDetails.billMonth}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Consumer ID</TableCell>
                                                    <TableCell>{billDetails.consumerId}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Consumer Name</TableCell>
                                                    <TableCell>{billDetails.consumerName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Address</TableCell>
                                                    <TableCell>{billDetails.address}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Connection Type</TableCell>
                                                    <TableCell>{billDetails.connectionType}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Previous Reading</TableCell>
                                                    <TableCell>{billDetails.previousReading} units</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Current Reading</TableCell>
                                                    <TableCell>{billDetails.currentReading} units</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Consumption</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', color: '#0288d1' }}>{billDetails.consumption} units</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e3f2fd' }}>Due Date</TableCell>
                                                    <TableCell sx={{ color: '#b71c1c', fontWeight: 'bold' }}>{billDetails.dueDate}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Divider sx={{ my: 3 }} />

                                    <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1, border: '2px solid #0288d1', textAlign: 'center' }}>
                                        <Typography variant="body2" sx={{ color: '#01579b' }}>Total Bill Amount</Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                                            ₹ {billDetails.billAmount}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                        <Button variant="outlined" onClick={() => setActiveStep(0)} sx={{ flex: 1 }}>
                                            Search Again
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handlePayment}
                                            startIcon={<PaymentIcon />}
                                            sx={{ flex: 2, bgcolor: '#0288d1', fontWeight: 'bold', py: 1.5 }}
                                        >
                                            Pay Now - ₹{billDetails.billAmount}
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        )}

                        {/* Step 3: Processing */}
                        {activeStep === 2 && (
                            <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 0, boxShadow: 3 }}>
                                <CircularProgress size={60} sx={{ color: '#0288d1', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0288d1' }}>
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
                                        Your water bill payment has been received. A receipt has been sent to your registered email.
                                    </Alert>

                                    <Card sx={{ bgcolor: '#f5f5f5', mb: 3 }}>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">Transaction ID</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                                                WTR{Date.now().toString().slice(-8)}
                                            </Typography>
                                            <Divider sx={{ my: 1 }} />
                                            <Typography variant="body2" color="textSecondary">Amount Paid</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                                                ₹ {billDetails?.billAmount}
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
                                            sx={{ borderColor: '#0288d1', color: '#0288d1' }}
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
                                    Water Supply Schedule
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {[
                                    'Daily supply: 6AM - 8AM',
                                    'Evening: 5PM - 7PM (Ward 1-6)',
                                    'Bill generated monthly',
                                    'Minimum charge: ₹100/month',
                                    'Report leakage: 1800-XXX-XXXX'
                                ].map((info, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                        <WaterDropIcon sx={{ color: '#0288d1', fontSize: 18 }} />
                                        <Typography variant="body2">{info}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#0288d1', p: 2, color: '#fff' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    📞 Water Helpline
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Emergency:</strong> 1800-XXX-XXXX
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Complaints:</strong> water@nagpurnp.gov.in
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
