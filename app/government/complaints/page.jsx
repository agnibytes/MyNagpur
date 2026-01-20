'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, Chip, TextField, MenuItem, Select, FormControl,
    InputLabel, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    LinearProgress, Alert, Pagination, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function GovernmentComplaintsPage() {
    const router = useRouter();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [filters, setFilters] = useState({
        search: '',
        ward: 'all',
        status: 'all',
        priority: 'all',
    });

    useEffect(() => {
        // Check authentication
        const user = localStorage.getItem('govtUserInfo');
        if (!user) {
            router.push('/government');
            return;
        }
        fetchComplaints();
    }, [router, page, filters]);

    const fetchComplaints = async () => {
        setLoading(true);
        // Mock data for now - will connect to backend
        setTimeout(() => {
            const mockComplaints = [
                {
                    id: 'CMP-2024-001',
                    type: 'Water Supply',
                    description: 'No water supply since 3 days',
                    ward: 6,
                    status: 'pending',
                    priority: 'high',
                    submittedBy: 'Rajesh Kumar',
                    submittedDate: '2024-01-18',
                    assignedTo: null,
                },
                {
                    id: 'CMP-2024-002',
                    type: 'Road Repair',
                    description: 'Potholes on Main Road',
                    ward: 13,
                    status: 'in-progress',
                    priority: 'medium',
                    submittedBy: 'Priya Sharma',
                    submittedDate: '2024-01-17',
                    assignedTo: 'Public Works Dept',
                },
                {
                    id: 'CMP-2024-003',
                    type: 'Street Light',
                    description: 'Street lights not working',
                    ward: 3,
                    status: 'resolved',
                    priority: 'low',
                    submittedBy: 'Amit Patel',
                    submittedDate: '2024-01-16',
                    assignedTo: 'Electrical Dept',
                },
                {
                    id: 'CMP-2024-004',
                    type: 'Garbage Collection',
                    description: 'Irregular garbage pickup',
                    ward: 10,
                    status: 'pending',
                    priority: 'high',
                    submittedBy: 'Sunita Devi',
                    submittedDate: '2024-01-19',
                    assignedTo: null,
                },
                {
                    id: 'CMP-2024-005',
                    type: 'Drainage',
                    description: 'Blocked drainage causing water logging',
                    ward: 6,
                    status: 'in-progress',
                    priority: 'high',
                    submittedBy: 'Vikram Singh',
                    submittedDate: '2024-01-18',
                    assignedTo: 'Sanitation Dept',
                },
            ];

            // Apply filters
            let filtered = mockComplaints;
            if (filters.ward !== 'all') {
                filtered = filtered.filter(c => c.ward === parseInt(filters.ward));
            }
            if (filters.status !== 'all') {
                filtered = filtered.filter(c => c.status === filters.status);
            }
            if (filters.priority !== 'all') {
                filtered = filtered.filter(c => c.priority === filters.priority);
            }
            if (filters.search) {
                filtered = filtered.filter(c =>
                    c.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                    c.type.toLowerCase().includes(filters.search.toLowerCase()) ||
                    c.description.toLowerCase().includes(filters.search.toLowerCase())
                );
            }

            setComplaints(filtered);
            setTotalPages(Math.ceil(filtered.length / 10));
            setLoading(false);
        }, 800);
    };

    const getStatusChip = (status) => {
        const statusConfig = {
            pending: { color: 'error', label: 'Pending', icon: <PendingIcon sx={{ fontSize: 16 }} /> },
            'in-progress': { color: 'warning', label: 'In Progress', icon: <PendingIcon sx={{ fontSize: 16 }} /> },
            resolved: { color: 'success', label: 'Resolved', icon: <CheckCircleIcon sx={{ fontSize: 16 }} /> },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <Chip
                size="small"
                icon={config.icon}
                label={config.label}
                color={config.color}
                sx={{ fontWeight: 600 }}
            />
        );
    };

    const getPriorityChip = (priority) => {
        const colors = {
            high: '#d32f2f',
            medium: '#f57c00',
            low: '#388e3c',
        };
        return (
            <Chip
                size="small"
                label={priority.toUpperCase()}
                sx={{
                    bgcolor: colors[priority],
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                }}
            />
        );
    };

    const handleViewDetails = (complaint) => {
        setSelectedComplaint(complaint);
        setDetailDialogOpen(true);
    };

    const handleAssign = (complaint) => {
        // TODO: Implement assignment dialog
        alert(`Assign complaint ${complaint.id} to department/officer`);
    };

    const handleUpdateStatus = (complaint, newStatus) => {
        // TODO: Implement status update
        alert(`Update complaint ${complaint.id} status to ${newStatus}`);
    };

    const handleExport = () => {
        // TODO: Implement export functionality
        alert('Export complaints to CSV');
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Button
                        component={Link}
                        href="/government/dashboard"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 2, color: '#1a4e8e' }}
                    >
                        Back to Dashboard
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                Complaints Management
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                                View and manage all citizen complaints
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                onClick={handleExport}
                                sx={{ borderColor: '#1a4e8e', color: '#1a4e8e' }}
                            >
                                Export
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<RefreshIcon />}
                                onClick={fetchComplaints}
                                sx={{ bgcolor: '#1a4e8e' }}
                            >
                                Refresh
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Filters */}
                <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <FilterListIcon sx={{ color: '#1a4e8e' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Filters</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search complaints..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Ward</InputLabel>
                                <Select
                                    value={filters.ward}
                                    onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                                    label="Ward"
                                >
                                    <MenuItem value="all">All Wards</MenuItem>
                                    {[...Array(15)].map((_, i) => (
                                        <MenuItem key={i + 1} value={i + 1}>Ward {i + 1}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    label="Status"
                                >
                                    <MenuItem value="all">All Status</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="in-progress">In Progress</MenuItem>
                                    <MenuItem value="resolved">Resolved</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    value={filters.priority}
                                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                    label="Priority"
                                >
                                    <MenuItem value="all">All Priority</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="low">Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Summary Stats */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                                {complaints.length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>Total Complaints</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                {complaints.filter(c => c.status === 'pending').length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>Pending</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                                {complaints.filter(c => c.status === 'in-progress').length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>In Progress</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                                {complaints.filter(c => c.status === 'resolved').length}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>Resolved</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Complaints Table */}
                <Paper sx={{ boxShadow: 3 }}>
                    {loading ? (
                        <Box sx={{ p: 3 }}>
                            <LinearProgress />
                        </Box>
                    ) : complaints.length === 0 ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="body1" sx={{ color: '#666' }}>
                                No complaints found matching the filters.
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Ward</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Submitted By</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {complaints.map((complaint) => (
                                            <TableRow key={complaint.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a4e8e' }}>
                                                        {complaint.id}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{complaint.type}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {complaint.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>Ward {complaint.ward}</TableCell>
                                                <TableCell>{getStatusChip(complaint.status)}</TableCell>
                                                <TableCell>{getPriorityChip(complaint.priority)}</TableCell>
                                                <TableCell>{complaint.submittedBy}</TableCell>
                                                <TableCell>{complaint.submittedDate}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleViewDetails(complaint)}
                                                            sx={{ color: '#1a4e8e' }}
                                                        >
                                                            <VisibilityIcon fontSize="small" />
                                                        </IconButton>
                                                        {!complaint.assignedTo && (
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleAssign(complaint)}
                                                                sx={{ color: '#f57c00' }}
                                                            >
                                                                <AssignmentIndIcon fontSize="small" />
                                                            </IconButton>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(e, value) => setPage(value)}
                                    color="primary"
                                />
                            </Box>
                        </>
                    )}
                </Paper>

                {/* Detail Dialog */}
                <Dialog
                    open={detailDialogOpen}
                    onClose={() => setDetailDialogOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    {selectedComplaint && (
                        <>
                            <DialogTitle sx={{ bgcolor: '#1a4e8e', color: '#fff' }}>
                                Complaint Details - {selectedComplaint.id}
                            </DialogTitle>
                            <DialogContent sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Type</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedComplaint.type}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Ward</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Ward {selectedComplaint.ward}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Description</Typography>
                                        <Typography variant="body1">{selectedComplaint.description}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Status</Typography>
                                        <Box sx={{ mt: 0.5 }}>{getStatusChip(selectedComplaint.status)}</Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Priority</Typography>
                                        <Box sx={{ mt: 0.5 }}>{getPriorityChip(selectedComplaint.priority)}</Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Submitted By</Typography>
                                        <Typography variant="body1">{selectedComplaint.submittedBy}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Submitted Date</Typography>
                                        <Typography variant="body1">{selectedComplaint.submittedDate}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Assigned To</Typography>
                                        <Typography variant="body1">{selectedComplaint.assignedTo || 'Not Assigned'}</Typography>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
                                {selectedComplaint.status !== 'resolved' && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleAssign(selectedComplaint)}
                                        >
                                            Assign
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleUpdateStatus(selectedComplaint, 'resolved')}
                                            sx={{ bgcolor: '#388e3c' }}
                                        >
                                            Mark Resolved
                                        </Button>
                                    </>
                                )}
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </Container>
        </Box>
    );
}
