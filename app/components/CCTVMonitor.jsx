'use client';

import { useState } from 'react';
import {
    Box, Typography, Paper, Grid, IconButton, Chip, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, Tooltip
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Mock CCTV camera data for Nagpur
const cctvCameras = [
    { id: 1, name: 'Main Chowk', location: 'Ward 6 - Central Market', status: 'online', ward: 6 },
    { id: 2, name: 'Bus Stand', location: 'Ward 6 - Bus Terminal', status: 'online', ward: 6 },
    { id: 3, name: 'Railway Station', location: 'Ward 13 - Station Road', status: 'online', ward: 13 },
    { id: 4, name: 'Hospital Gate', location: 'Ward 6 - Civil Hospital', status: 'online', ward: 6 },
    { id: 5, name: 'Nagar Parishad', location: 'Ward 10 - Municipal Office', status: 'online', ward: 10 },
    { id: 6, name: 'School Zone', location: 'Ward 3 - High School Area', status: 'offline', ward: 3 },
];

// Simulated camera feed placeholder
const CameraFeed = ({ camera, onClick }) => {
    const isOnline = camera.status === 'online';

    return (
        <Paper
            onClick={() => onClick(camera)}
            sx={{
                position: 'relative',
                height: 160,
                bgcolor: isOnline ? '#1a1a2e' : '#2d2d2d',
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid',
                borderColor: isOnline ? '#1a4e8e' : '#666',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                    borderColor: isOnline ? '#FF9933' : '#888',
                }
            }}
        >
            {/* Simulated video feed background */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isOnline
                    ? 'linear-gradient(135deg, #0a192f 0%, #1a3a5c 100%)'
                    : '#1a1a1a'
            }}>
                {isOnline ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <VideocamIcon sx={{ fontSize: 40, color: 'rgba(255,255,255,0.3)' }} />
                        {/* Animated recording indicator */}
                        <Box sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}>
                            <FiberManualRecordIcon sx={{
                                fontSize: 12,
                                color: '#ff4444',
                                animation: 'pulse 1.5s infinite'
                            }} />
                            <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.65rem' }}>
                                REC
                            </Typography>
                        </Box>
                        {/* Timestamp overlay */}
                        <Typography sx={{
                            position: 'absolute',
                            bottom: 28,
                            left: 8,
                            color: '#0f0',
                            fontSize: '0.7rem',
                            fontFamily: 'monospace'
                        }}>
                            {new Date().toLocaleTimeString()}
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center' }}>
                        <VideocamOffIcon sx={{ fontSize: 40, color: '#666' }} />
                        <Typography variant="caption" sx={{ display: 'block', color: '#888', mt: 1 }}>
                            Camera Offline
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Camera info overlay */}
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.8)',
                p: 1
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#fff', fontWeight: 'bold' }}>
                        {camera.name}
                    </Typography>
                    <Chip
                        size="small"
                        label={isOnline ? 'LIVE' : 'OFFLINE'}
                        sx={{
                            height: 18,
                            fontSize: '0.6rem',
                            bgcolor: isOnline ? '#388e3c' : '#d32f2f',
                            color: '#fff'
                        }}
                    />
                </Box>
            </Box>

            {/* Fullscreen button */}
            <IconButton
                size="small"
                sx={{
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                }}
                onClick={(e) => { e.stopPropagation(); onClick(camera); }}
            >
                <FullscreenIcon fontSize="small" />
            </IconButton>
        </Paper>
    );
};

export default function CCTVMonitor({ compact = false }) {
    const [selectedCamera, setSelectedCamera] = useState(null);

    const onlineCount = cctvCameras.filter(c => c.status === 'online').length;

    return (
        <Paper sx={{
            p: 2,
            border: '1px solid #ddd',
            borderRadius: 0,
            boxShadow: 3,
            bgcolor: '#fff'
        }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                borderBottom: '2px solid #FF9933',
                pb: 1
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VideocamIcon sx={{ color: '#1a4e8e' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                        CCTV Monitoring
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        size="small"
                        icon={<FiberManualRecordIcon sx={{ fontSize: '12px !important' }} />}
                        label={`${onlineCount}/${cctvCameras.length} Online`}
                        sx={{
                            bgcolor: onlineCount === cctvCameras.length ? '#e8f5e9' : '#fff3e0',
                            color: onlineCount === cctvCameras.length ? '#388e3c' : '#f57c00',
                            fontWeight: 'bold'
                        }}
                    />
                </Box>
            </Box>

            {/* Camera Grid */}
            <Grid container spacing={2}>
                {cctvCameras.slice(0, compact ? 4 : 6).map((camera) => (
                    <Grid item xs={6} sm={4} md={compact ? 3 : 4} key={camera.id}>
                        <CameraFeed camera={camera} onClick={setSelectedCamera} />
                    </Grid>
                ))}
            </Grid>

            {/* Camera Detail Dialog */}
            <Dialog
                open={!!selectedCamera}
                onClose={() => setSelectedCamera(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{ sx: { borderRadius: 0, border: '2px solid #1a4e8e' } }}
            >
                {selectedCamera && (
                    <>
                        <DialogTitle sx={{
                            bgcolor: '#1a4e8e',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 1.5
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <VideocamIcon />
                                <Typography variant="h6">{selectedCamera.name}</Typography>
                                <Chip
                                    size="small"
                                    label={selectedCamera.status === 'online' ? 'LIVE' : 'OFFLINE'}
                                    sx={{
                                        ml: 1,
                                        bgcolor: selectedCamera.status === 'online' ? '#388e3c' : '#d32f2f',
                                        color: '#fff'
                                    }}
                                />
                            </Box>
                            <IconButton onClick={() => setSelectedCamera(null)} sx={{ color: '#fff' }}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ p: 0 }}>
                            {/* Large camera view */}
                            <Box sx={{
                                height: 400,
                                bgcolor: '#0a192f',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                {selectedCamera.status === 'online' ? (
                                    <>
                                        <VideocamIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.2)' }} />
                                        {/* Recording indicator */}
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            bgcolor: 'rgba(0,0,0,0.7)',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1
                                        }}>
                                            <FiberManualRecordIcon sx={{
                                                fontSize: 14,
                                                color: '#ff4444',
                                                animation: 'pulse 1.5s infinite'
                                            }} />
                                            <Typography sx={{ color: '#fff', fontSize: '0.8rem' }}>
                                                RECORDING
                                            </Typography>
                                        </Box>
                                        {/* Timestamp */}
                                        <Typography sx={{
                                            position: 'absolute',
                                            bottom: 16,
                                            left: 16,
                                            color: '#0f0',
                                            fontFamily: 'monospace',
                                            bgcolor: 'rgba(0,0,0,0.7)',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 0.5
                                        }}>
                                            {new Date().toLocaleString()} | CAM-{selectedCamera.id}
                                        </Typography>
                                    </>
                                ) : (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <VideocamOffIcon sx={{ fontSize: 80, color: '#666' }} />
                                        <Typography sx={{ color: '#888', mt: 2 }}>
                                            Camera is currently offline
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            {/* Camera details */}
                            <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocationOnIcon sx={{ color: '#1a4e8e' }} />
                                            <Box>
                                                <Typography variant="caption" sx={{ color: '#666' }}>Location</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {selectedCamera.location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#666' }}>Ward</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                Ward {selectedCamera.ward}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, borderTop: '1px solid #ddd' }}>
                            <Button variant="outlined" onClick={() => setSelectedCamera(null)}>
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: '#1a4e8e' }}
                                disabled={selectedCamera.status !== 'online'}
                            >
                                Download Recording
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* CSS for pulse animation */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </Paper>
    );
}
