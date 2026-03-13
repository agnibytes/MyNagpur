'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid, TextField, Button, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress, Card, CardContent, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';

export default function DownloadReceiptPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) { router.push('/auth/login'); }
        else {
            setUser(JSON.parse(storedUser)); setLoading(false); setReceipts([
                { id: 'TXN88291', type: 'Property Tax', amount: '₹ 2,400', date: '12 Dec 2025', status: 'Success', propertyId: 'PROP/UMR/2024/001' },
                { id: 'TXN88102', type: 'Water Bill', amount: '₹ 450', date: '10 Nov 2025', status: 'Success', consumerId: 'WTR/UMR/2024/056' },
                { id: 'TXN87932', type: 'Trade License Fee', amount: '₹ 1,200', date: '05 Oct 2025', status: 'Success', licenseId: 'TL/UMR/2025/089' },
                { id: 'WTR48291023', type: 'Water Bill', amount: '₹ 380', date: '10 Sep 2025', status: 'Success', consumerId: 'WTR/UMR/2024/056' },
            ]);
        }
    }, [router]);

    const handleDownload = (receipt) => {
        setSelectedReceipt(receipt);
        setTimeout(() => alert(`Receipt ${receipt.id} downloaded successfully!`), 500);
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;

    const filteredReceipts = searchId ? receipts.filter(r => r.id.toLowerCase().includes(searchId.toLowerCase()) || r.type.toLowerCase().includes(searchId.toLowerCase())) : receipts;

    return (
        <div className="flex flex-col">
            <Box sx={{ background: 'linear-gradient(135deg, #FF9933 0%, #e65100 100%)', color: '#000', py: 3, borderBottom: '4px solid #1a4e8e' }}>
                <Container maxWidth="lg">
                    <Button component={Link} href="/dashboard" startIcon={<ArrowBackIcon />} sx={{ color: '#000', mb: 2 }}>Back to Dashboard</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ReceiptIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Download Receipt</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>पावती डाउनलोड करा | Download payment receipts</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, mb: 3 }}>
                            <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>🔍 Search Receipts</Typography></Box>
                            <Box sx={{ p: 3 }}>
                                <TextField fullWidth label="Search by Transaction ID or Type" placeholder="e.g., TXN88291 or Property Tax" value={searchId} onChange={(e) => setSearchId(e.target.value)} InputProps={{ endAdornment: <SearchIcon sx={{ color: '#666' }} /> }} />
                            </Box>
                        </Paper>

                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3 }}>
                            <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}><PaymentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Payment History</Typography><Chip label={`${filteredReceipts.length} Receipts`} size="small" sx={{ ml: 1, bgcolor: '#fff', color: '#1a4e8e' }} /></Box>
                            <TableContainer><Table>
                                <TableHead><TableRow sx={{ bgcolor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold' }}>Receipt No</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell><TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell></TableRow></TableHead>
                                <TableBody>
                                    {filteredReceipts.map((receipt) => (
                                        <TableRow key={receipt.id} hover sx={{ '&:hover': { bgcolor: '#fff8e1' } }}>
                                            <TableCell sx={{ fontWeight: 500, color: '#e65100' }}>{receipt.id}</TableCell>
                                            <TableCell>{receipt.type}</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#388e3c' }}>{receipt.amount}</TableCell>
                                            <TableCell>{receipt.date}</TableCell>
                                            <TableCell><Button size="small" variant="contained" startIcon={<DownloadIcon />} onClick={() => handleDownload(receipt)} sx={{ bgcolor: '#1a4e8e', fontSize: '0.7rem' }}>Download</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table></TableContainer>
                            {filteredReceipts.length === 0 && <Box sx={{ p: 3, textAlign: 'center' }}><Typography color="textSecondary">No receipts found</Typography></Box>}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, mb: 3 }}>
                            <Box sx={{ bgcolor: '#388e3c', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}><CheckCircleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Payment Summary</Typography></Box>
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 1, textAlign: 'center', mb: 2 }}>
                                    <Typography variant="body2">Total Payments (This Year)</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>₹ 4,430</Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                {[{ label: 'Property Tax', amount: '₹ 2,400' }, { label: 'Water Bills', amount: '₹ 830' }, { label: 'Trade License', amount: '₹ 1,200' }].map((item, i) => <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2">{item.label}</Typography><Typography variant="body2" sx={{ fontWeight: 'bold' }}>{item.amount}</Typography></Box>)}
                            </Box>
                        </Paper>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3 }}>
                            <Box sx={{ bgcolor: '#1a4e8e', p: 2, color: '#fff' }}><Typography variant="h6" sx={{ fontWeight: 'bold' }}>📞 Support</Typography></Box>
                            <Box sx={{ p: 2 }}><Typography variant="body2" sx={{ mb: 1 }}><strong>Helpline:</strong> 1800-XXX-XXXX</Typography><Typography variant="body2"><strong>Email:</strong> receipts@nagpurnp.gov.in</Typography></Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
