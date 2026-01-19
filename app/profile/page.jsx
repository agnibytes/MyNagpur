'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Paper, TextField, Button, Typography, Box, Alert, MenuItem,
    Grid, Divider, Avatar, Tabs, Tab, IconButton, Card, CardContent,
    Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, Chip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import StoreIcon from '@mui/icons-material/Store';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PeopleIcon from '@mui/icons-material/People';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const getApiBaseUrl = () => {
    if (typeof window === 'undefined') return 'http://localhost:5000';
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        return window.location.origin;
    }
    return 'http://localhost:5000';
};

const RELATIONS = ['Self', 'Spouse', 'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Other'];
const WARDS = Array.from({ length: 13 }, (_, i) => `Ward ${i + 1}`);

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
}

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [tab, setTab] = useState(0);
    const [memberDialog, setMemberDialog] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [newMember, setNewMember] = useState({ name: '', relation: 'Spouse', age: '', gender: 'Male', occupation: '', phone: '' });
    const router = useRouter();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
            return;
        }
        const parsed = JSON.parse(storedUser);
        setToken(parsed.token);
        fetchProfile(parsed.token);
    }, [router]);

    const fetchProfile = async (authToken) => {
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/profile`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSuccess('');
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setSuccess('Profile saved successfully!');
                // Update localStorage
                const stored = JSON.parse(localStorage.getItem('userInfo') || '{}');
                localStorage.setItem('userInfo', JSON.stringify({ ...stored, ...data.user, token }));
            } else {
                const err = await res.json();
                setError(err.message);
            }
        } catch (err) {
            setError('Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Resize and convert to base64
        const reader = new FileReader();
        reader.onload = async (ev) => {
            const img = new Image();
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                const maxSize = 200;
                let w = img.width, h = img.height;
                if (w > h) { h = h * maxSize / w; w = maxSize; }
                else { w = w * maxSize / h; h = maxSize; }
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                const base64 = canvas.toDataURL('image/jpeg', 0.8);

                try {
                    const res = await fetch(`${getApiBaseUrl()}/api/profile/image`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ image: base64 })
                    });
                    if (res.ok) {
                        setUser(prev => ({ ...prev, profileImage: base64 }));
                        setSuccess('Image uploaded!');
                    }
                } catch (err) {
                    setError('Failed to upload image');
                }
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleAddMember = async () => {
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/profile/family-member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newMember)
            });
            if (res.ok) {
                const data = await res.json();
                setUser(prev => ({ ...prev, familyMembers: data.familyMembers, totalFamilyMembers: data.totalFamilyMembers }));
                setMemberDialog(false);
                setNewMember({ name: '', relation: 'Spouse', age: '', gender: 'Male', occupation: '', phone: '' });
                setSuccess('Family member added!');
            }
        } catch (err) {
            setError('Failed to add member');
        }
    };

    const handleDeleteMember = async (id) => {
        if (!confirm('Remove this family member?')) return;
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/profile/family-member/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(prev => ({ ...prev, familyMembers: data.familyMembers }));
                setSuccess('Member removed');
            }
        } catch (err) {
            setError('Failed to remove member');
        }
    };

    const handleSaveBusiness = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/profile/business`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    hasBusiness: user.hasBusiness,
                    ...user.business
                })
            });
            if (res.ok) {
                setSuccess('Business details saved!');
            }
        } catch (err) {
            setError('Failed to save business details');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <LinearProgress sx={{ width: 200 }} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            {/* Header */}
            <Box sx={{ bgcolor: '#1a4e8e', py: 3, borderBottom: '4px solid #FF9933' }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#fff' }}>
                        <PersonIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>My Profile</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>माझे प्रोफाइल | Family Registration</Typography>
                        </Box>
                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                                icon={<CheckCircleIcon />}
                                label={`${user?.profileCompletion || 0}% Complete`}
                                sx={{ bgcolor: user?.profileCompletion >= 80 ? '#4caf50' : '#ff9800', color: '#fff', fontWeight: 'bold' }}
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

                <Grid container spacing={3}>
                    {/* Left: Profile Summary */}
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                <Avatar
                                    src={user?.profileImage}
                                    sx={{ width: 120, height: 120, fontSize: '3rem', bgcolor: '#FF9933', mx: 'auto' }}
                                >
                                    {user?.name?.charAt(0)}
                                </Avatar>
                                <IconButton
                                    sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#1a4e8e', color: '#fff', '&:hover': { bgcolor: '#0d2e5a' } }}
                                    size="small"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <CameraAltIcon fontSize="small" />
                                </IconButton>
                                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                            </Box>
                            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>{user?.name}</Typography>
                            <Chip label={user?.ward} size="small" sx={{ mt: 1 }} />

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ textAlign: 'left' }}>
                                {user?.houseName && (
                                    <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <HomeIcon fontSize="small" sx={{ color: '#1a4e8e' }} /> <strong>House:</strong> {user.houseName}
                                    </Typography>
                                )}
                                <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <PeopleIcon fontSize="small" sx={{ color: '#1a4e8e' }} /> <strong>Family:</strong> {user?.totalFamilyMembers || 1} members
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EmailIcon fontSize="small" sx={{ color: '#1a4e8e' }} /> <strong>Email:</strong> {user?.email}
                                </Typography>
                                {user?.phone && (
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <PhoneAndroidIcon fontSize="small" sx={{ color: '#1a4e8e' }} /> <strong>Phone:</strong> {user.phone}
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right: Tabs */}
                    <Grid item xs={12} md={9}>
                        <Paper>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f9f9f9' }}
                            >
                                <Tab icon={<PersonIcon />} label="Personal" iconPosition="start" />
                                <Tab icon={<HomeIcon />} label="Address" iconPosition="start" />
                                <Tab icon={<GroupIcon />} label="Family" iconPosition="start" />
                                <Tab icon={<ElectricBoltIcon />} label="Utilities" iconPosition="start" />
                                <Tab icon={<StoreIcon />} label="Business" iconPosition="start" />
                            </Tabs>

                            <Box sx={{ p: 3 }}>
                                {/* Personal Info Tab */}
                                <TabPanel value={tab} index={0}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Full Name / पूर्ण नाव" value={user?.name || ''} onChange={e => setUser({ ...user, name: e.target.value })} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="House Name / घराचे नाव (Optional)" value={user?.houseName || ''} onChange={e => setUser({ ...user, houseName: e.target.value })} placeholder="e.g., Gajbhiye Niwas" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Phone / फोन" value={user?.phone || ''} onChange={e => setUser({ ...user, phone: e.target.value })} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth select label="Ward / वार्ड" value={user?.ward || 'Ward 1'} onChange={e => setUser({ ...user, ward: e.target.value })}>
                                                {WARDS.map(w => <MenuItem key={w} value={w}>{w}</MenuItem>)}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="ID Proof Type" value={user?.idProofType || ''} disabled />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="ID Proof Number" value={user?.idProofNumber || ''} disabled />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ bgcolor: '#138808' }}>
                                                {saving ? 'Saving...' : 'Save Personal Info'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                {/* Address Tab */}
                                <TabPanel value={tab} index={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Address Line 1 / पत्ता" value={user?.address?.line1 || ''} onChange={e => setUser({ ...user, address: { ...user?.address, line1: e.target.value } })} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Address Line 2" value={user?.address?.line2 || ''} onChange={e => setUser({ ...user, address: { ...user?.address, line2: e.target.value } })} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Landmark / जवळचे ठिकाण" value={user?.address?.landmark || ''} onChange={e => setUser({ ...user, address: { ...user?.address, landmark: e.target.value } })} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Pincode / पिनकोड" value={user?.address?.pincode || ''} onChange={e => setUser({ ...user, address: { ...user?.address, pincode: e.target.value } })} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f0f7ff' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <LocationOnIcon color="primary" />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Map Location / नकाशा स्थान</Typography>
                                                </Box>
                                                {user?.address?.mapLocation?.lat ? (
                                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <LocationOnIcon fontSize="small" color="primary" /> Lat: {user.address.mapLocation.lat.toFixed(6)}, Lng: {user.address.mapLocation.lng.toFixed(6)}
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Location not set. Click "Get Current Location" to set your position.
                                                    </Typography>
                                                )}
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ mt: 1 }}
                                                    onClick={() => {
                                                        if (navigator.geolocation) {
                                                            navigator.geolocation.getCurrentPosition(
                                                                (pos) => {
                                                                    setUser({
                                                                        ...user,
                                                                        address: {
                                                                            ...user?.address,
                                                                            mapLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude }
                                                                        }
                                                                    });
                                                                    setSuccess('Location captured!');
                                                                },
                                                                () => setError('Failed to get location')
                                                            );
                                                        }
                                                    }}
                                                    startIcon={<LocationOnIcon />}
                                                >
                                                    Get Current Location
                                                </Button>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ bgcolor: '#138808' }}>
                                                {saving ? 'Saving...' : 'Save Address'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                {/* Family Members Tab */}
                                <TabPanel value={tab} index={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6">Family Members ({user?.familyMembers?.length || 0})</Typography>
                                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setMemberDialog(true)} sx={{ bgcolor: '#1a4e8e' }}>
                                            Add Member
                                        </Button>
                                    </Box>

                                    <Grid container spacing={2}>
                                        {/* Head of Family (current user) */}
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Card variant="outlined" sx={{ borderColor: '#FF9933', borderWidth: 2 }}>
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar src={user?.profileImage} sx={{ bgcolor: '#FF9933' }}>{user?.name?.charAt(0)}</Avatar>
                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user?.name}</Typography>
                                                            <Chip label="Head of Family" size="small" color="warning" />
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        {/* Other family members */}
                                        {user?.familyMembers?.map((member) => (
                                            <Grid item xs={12} sm={6} md={4} key={member._id}>
                                                <Card variant="outlined">
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Avatar sx={{ bgcolor: '#1a4e8e' }}>{member.name?.charAt(0)}</Avatar>
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{member.name}</Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {member.relation} {member.age ? `• ${member.age} yrs` : ''}
                                                                </Typography>
                                                                {member.occupation && <Typography variant="caption">{member.occupation}</Typography>}
                                                            </Box>
                                                            <IconButton size="small" color="error" onClick={() => handleDeleteMember(member._id)}>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </TabPanel>

                                {/* Utilities Tab */}
                                <TabPanel value={tab} index={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Electricity Meter Number / वीज मीटर क्रमांक"
                                                value={user?.electricityMeterNo || ''}
                                                onChange={e => setUser({ ...user, electricityMeterNo: e.target.value })}
                                                InputProps={{ startAdornment: <ElectricBoltIcon sx={{ mr: 1, color: '#f9a825' }} /> }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Water Meter Number / पाणी मीटर क्रमांक"
                                                value={user?.waterMeterNo || ''}
                                                onChange={e => setUser({ ...user, waterMeterNo: e.target.value })}
                                                InputProps={{ startAdornment: <WaterDropIcon sx={{ mr: 1, color: '#0288d1' }} /> }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ bgcolor: '#138808' }}>
                                                {saving ? 'Saving...' : 'Save Utility Info'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                {/* Business Tab */}
                                <TabPanel value={tab} index={4}>
                                    <Box sx={{ mb: 3 }}>
                                        <Button
                                            variant={user?.hasBusiness ? 'contained' : 'outlined'}
                                            onClick={() => setUser({ ...user, hasBusiness: !user?.hasBusiness })}
                                            sx={{ mr: 2 }}
                                        >
                                            {user?.hasBusiness ? '✓ I have a business/shop' : 'I have a business/shop'}
                                        </Button>
                                    </Box>

                                    {user?.hasBusiness && (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Shop/Business Name / दुकान नाव" value={user?.business?.shopName || ''} onChange={e => setUser({ ...user, business: { ...user?.business, shopName: e.target.value } })} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Nature of Work / व्यवसाय प्रकार" value={user?.business?.natureOfWork || ''} onChange={e => setUser({ ...user, business: { ...user?.business, natureOfWork: e.target.value } })} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="GST Number (if applicable)" value={user?.business?.gstNumber || ''} onChange={e => setUser({ ...user, business: { ...user?.business, gstNumber: e.target.value } })} placeholder="22AAAAA0000A1Z5" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Trade License No." value={user?.business?.tradeLicenseNo || ''} onChange={e => setUser({ ...user, business: { ...user?.business, tradeLicenseNo: e.target.value } })} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Shop Address" value={user?.business?.shopAddress || ''} onChange={e => setUser({ ...user, business: { ...user?.business, shopAddress: e.target.value } })} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveBusiness} disabled={saving} sx={{ bgcolor: '#138808' }}>
                                                    {saving ? 'Saving...' : 'Save Business Details'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                </TabPanel>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Add Family Member Dialog */}
                <Dialog open={memberDialog} onClose={() => setMemberDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ bgcolor: '#1a4e8e', color: '#fff' }}>
                        <GroupIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Add Family Member
                    </DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        <Grid container spacing={2} sx={{ mt: 0.5 }}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Name / नाव" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Relation / नाते" value={newMember.relation} onChange={e => setNewMember({ ...newMember, relation: e.target.value })}>
                                    {RELATIONS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Gender" value={newMember.gender} onChange={e => setNewMember({ ...newMember, gender: e.target.value })}>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth type="number" label="Age / वय" value={newMember.age} onChange={e => setNewMember({ ...newMember, age: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Phone" value={newMember.phone} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Occupation / व्यवसाय" value={newMember.occupation} onChange={e => setNewMember({ ...newMember, occupation: e.target.value })} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setMemberDialog(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddMember} disabled={!newMember.name} sx={{ bgcolor: '#138808' }}>
                            Add Member
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
