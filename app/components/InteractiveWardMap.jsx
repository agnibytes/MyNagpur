'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Chip, Switch, FormControlLabel, Divider } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RouteIcon from '@mui/icons-material/Route';

// Ward data with mock statistics
const wardData = [
    { id: 1, name: 'Ward 1', population: 2850, households: 520, area: '1.2 sq km', facilities: ['Primary School', 'PHC Center'], pendingComplaints: 12, officer: 'Ramesh Patil', phone: '9876543201', color: '#FF6B6B', points: '50,80 150,60 180,120 120,160 40,140', textX: 100, textY: 110 },
    { id: 2, name: 'Ward 2', population: 3200, households: 680, area: '1.5 sq km', facilities: ['Govt. School', 'Water Tank'], pendingComplaints: 8, officer: 'Suresh Yadav', phone: '9876543202', color: '#4ECDC4', points: '150,60 280,50 300,100 180,120', textX: 215, textY: 90 },
    { id: 3, name: 'Ward 3', population: 2600, households: 450, area: '1.1 sq km', facilities: ['Anganwadi', 'Community Hall'], pendingComplaints: 5, officer: 'Prakash Deshmukh', phone: '9876543203', color: '#45B7D1', points: '280,50 400,55 420,110 300,100', textX: 350, textY: 85 },
    { id: 4, name: 'Ward 4', population: 3500, households: 720, area: '1.8 sq km', facilities: ['High School', 'Market Area'], pendingComplaints: 18, officer: 'Vinod Kumar', phone: '9876543204', color: '#96CEB4', points: '400,55 530,70 550,140 420,110', textX: 475, textY: 100 },
    { id: 5, name: 'Ward 5', population: 1800, households: 320, area: '0.8 sq km', facilities: ['Temple', 'Playground'], pendingComplaints: 3, officer: 'Anil Meshram', phone: '9876543205', color: '#FFEAA7', points: '40,140 120,160 100,240 30,210', textX: 70, textY: 190, textColor: '#333' },
    { id: 6, name: 'Ward 6', population: 4200, households: 850, area: '2.1 sq km', facilities: ['Hospital', 'Bus Stand', 'Bank'], pendingComplaints: 22, officer: 'Mahesh Gaikwad', phone: '9876543206', color: '#DDA0DD', points: '120,160 180,120 300,100 280,180 200,220 100,240', textX: 190, textY: 175 },
    { id: 7, name: 'Ward 7', population: 3800, households: 780, area: '1.9 sq km', facilities: ['Police Station', 'Post Office'], pendingComplaints: 15, officer: 'Ganesh Bawane', phone: '9876543207', color: '#F0A500', points: '300,100 420,110 440,200 350,220 280,180', textX: 360, textY: 165 },
    { id: 8, name: 'Ward 8', population: 2900, households: 590, area: '1.4 sq km', facilities: ['College', 'Library'], pendingComplaints: 9, officer: 'Rajendra Singh', phone: '9876543208', color: '#E17055', points: '420,110 550,140 560,230 440,200', textX: 495, textY: 170 },
    { id: 9, name: 'Ward 9', population: 1500, households: 280, area: '0.6 sq km', facilities: ['Gram Panchayat Office'], pendingComplaints: 4, officer: 'Sunil Wagh', phone: '9876543209', color: '#74B9FF', points: '30,210 100,240 80,330 25,300', textX: 60, textY: 275 },
    { id: 10, name: 'Ward 10', population: 5100, households: 1050, area: '2.8 sq km', facilities: ['Central Market', 'Fire Station', 'Stadium'], pendingComplaints: 28, officer: 'Nilesh Thakur', phone: '9876543210', color: '#A29BFE', points: '100,240 200,220 280,180 350,220 320,310 200,340 80,330', textX: 200, textY: 280 },
    { id: 11, name: 'Ward 11', population: 3100, households: 640, area: '1.6 sq km', facilities: ['ITI College', 'Garden'], pendingComplaints: 11, officer: 'Deepak Raut', phone: '9876543211', color: '#00B894', points: '350,220 440,200 480,300 420,340 320,310', textX: 400, textY: 275 },
    { id: 12, name: 'Ward 12', population: 2400, households: 480, area: '1.3 sq km', facilities: ['Temple', 'Gym'], pendingComplaints: 7, officer: 'Kiran Pawar', phone: '9876543212', color: '#FDCB6E', points: '440,200 560,230 570,320 480,300', textX: 510, textY: 270, textColor: '#333' },
    { id: 13, name: 'Ward 13', population: 6200, households: 1280, area: '3.5 sq km', facilities: ['Railway Station', 'Hospital', 'Industrial Area', 'Water Treatment Plant'], pendingComplaints: 35, officer: 'Ashok Shinde', phone: '9876543213', color: '#FF7675', points: '80,330 200,340 320,310 420,340 480,300 570,320 560,420 400,450 200,440 50,400 25,300', textX: 300, textY: 385 },
];

// Road paths for each ward (become visible when ward is selected)
const roadPaths = {
    1: ['M60,100 Q100,90 140,110', 'M80,130 L130,145'],
    2: ['M160,70 L270,60', 'M200,80 Q230,95 280,90'],
    3: ['M290,60 Q350,55 400,70', 'M320,85 L390,95'],
    4: ['M420,70 Q480,85 540,110', 'M450,100 L520,125'],
    5: ['M45,160 L90,200', 'M50,190 Q70,210 80,230'],
    6: ['M130,140 Q180,150 250,160', 'M160,180 L220,200', 'M180,160 Q200,180 160,210'],
    7: ['M310,120 Q360,140 420,160', 'M340,180 L400,195', 'M360,140 L380,200'],
    8: ['M440,130 Q490,150 540,180', 'M470,160 L530,200'],
    9: ['M40,230 Q60,260 70,310', 'M50,280 L75,320'],
    10: ['M120,260 Q180,280 280,270', 'M160,300 L240,320', 'M200,260 Q220,290 180,330'],
    11: ['M360,240 Q400,260 460,280', 'M380,290 L440,320', 'M400,260 L420,300'],
    12: ['M460,220 Q510,250 550,280', 'M480,260 L540,300'],
    13: ['M100,350 Q200,360 350,350', 'M150,390 L300,400', 'M250,360 Q300,380 250,420', 'M400,360 Q450,380 500,370', 'M300,380 L400,420'],
};

export default function InteractiveWardMap() {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [hoveredWard, setHoveredWard] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [showRoads, setShowRoads] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.5));
    const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

    const handleMouseDown = (e) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoom > 1) {
            setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleWardClick = (ward) => {
        setSelectedWard(ward);
        setShowRoads(false);
    };

    const handleCloseModal = () => {
        setSelectedWard(null);
        setShowRoads(false);
    };

    const getHoveredWardData = () => wardData.find(w => w.id === hoveredWard);

    return (
        <Paper sx={{ p: 2, border: '1px solid #eee', borderRadius: 0, boxShadow: 3, '&:hover': { boxShadow: 4 } }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '2px solid #FF9933', pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MapIcon /> Ward Map - Nagpur
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: '#666', mr: 1 }}>
                        136 Administrative Wards
                    </Typography>
                    {/* Zoom Controls */}
                    <Tooltip title="Zoom In"><IconButton size="small" onClick={handleZoomIn} sx={{ bgcolor: '#e8f4fc', '&:hover': { bgcolor: '#1a4e8e', color: '#fff' } }}><ZoomInIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Zoom Out"><IconButton size="small" onClick={handleZoomOut} sx={{ bgcolor: '#e8f4fc', '&:hover': { bgcolor: '#1a4e8e', color: '#fff' } }}><ZoomOutIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Reset View"><IconButton size="small" onClick={handleReset} sx={{ bgcolor: '#e8f4fc', '&:hover': { bgcolor: '#1a4e8e', color: '#fff' } }}><RestartAltIcon fontSize="small" /></IconButton></Tooltip>
                </Box>
            </Box>

            {/* Map Container */}
            <Box
                ref={containerRef}
                sx={{
                    position: 'relative',
                    width: '100%',
                    bgcolor: '#e8f4fc',
                    borderRadius: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <svg
                    viewBox="0 0 600 500"
                    style={{
                        width: '100%',
                        maxWidth: 500,
                        height: 'auto',
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease',
                    }}
                >
                    {/* Render ward polygons */}
                    {wardData.map((ward) => (
                        <g key={ward.id}>
                            <polygon
                                points={ward.points}
                                fill={hoveredWard === ward.id ? '#FFD700' : ward.color}
                                stroke={selectedWard?.id === ward.id ? '#000' : '#333'}
                                strokeWidth={selectedWard?.id === ward.id ? 4 : 2}
                                style={{ cursor: 'pointer', transition: 'fill 0.2s, stroke-width 0.2s' }}
                                onMouseEnter={() => setHoveredWard(ward.id)}
                                onMouseLeave={() => setHoveredWard(null)}
                                onClick={() => handleWardClick(ward)}
                            />
                            <text
                                x={ward.textX}
                                y={ward.textY}
                                textAnchor="middle"
                                fontSize={ward.id >= 10 ? 18 : 16}
                                fontWeight="bold"
                                fill={ward.textColor || '#fff'}
                                style={{ pointerEvents: 'none' }}
                            >
                                {ward.id}
                            </text>
                        </g>
                    ))}

                    {/* Render road paths when a ward is selected and roads are enabled */}
                    {selectedWard && showRoads && roadPaths[selectedWard.id]?.map((path, idx) => (
                        <path
                            key={idx}
                            d={path}
                            stroke="#333"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="8,4"
                            style={{ animation: 'dash 1s linear infinite' }}
                        />
                    ))}
                </svg>

                {/* Hover Tooltip */}
                {hoveredWard && !selectedWard && (
                    <Paper
                        sx={{
                            position: 'absolute',
                            bottom: 10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            p: 1.5,
                            bgcolor: 'rgba(255,255,255,0.95)',
                            borderRadius: 2,
                            boxShadow: 4,
                            border: `3px solid ${getHoveredWardData()?.color}`,
                            minWidth: 200,
                            zIndex: 10,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1a4e8e', mb: 0.5 }}>
                            {getHoveredWardData()?.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, fontSize: '0.75rem' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PeopleIcon sx={{ fontSize: 14, color: '#666' }} />
                                <span>{getHoveredWardData()?.population?.toLocaleString()}</span>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <HomeIcon sx={{ fontSize: 14, color: '#666' }} />
                                <span>{getHoveredWardData()?.households}</span>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#888', mt: 0.5, display: 'block' }}>
                            Click for details
                        </Typography>
                    </Paper>
                )}
            </Box>

            {/* Legend */}
            <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #eee' }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 1, display: 'block' }}>Ward Legend:</Typography>
                <Grid container spacing={0.5}>
                    {wardData.map((ward) => (
                        <Grid item key={ward.id}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mr: 1,
                                    mb: 0.5,
                                    border: hoveredWard === ward.id ? '2px solid #1a4e8e' : '1px solid #ddd',
                                    borderRadius: 1,
                                    px: 0.5,
                                    bgcolor: hoveredWard === ward.id ? '#e8f4fc' : '#fafafa',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={() => setHoveredWard(ward.id)}
                                onMouseLeave={() => setHoveredWard(null)}
                                onClick={() => handleWardClick(ward)}
                            >
                                <Box sx={{ width: 8, height: 8, bgcolor: ward.color, borderRadius: '50%', mr: 0.5 }} />
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>W{ward.id}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Road animation keyframes */}
            <style jsx>{`
                @keyframes dash {
                    to { stroke-dashoffset: -24; }
                }
            `}</style>

            {/* Ward Detail Modal */}
            <Dialog
                open={!!selectedWard}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: 0, border: '2px solid #1a4e8e' } }}
            >
                {selectedWard && (
                    <>
                        <DialogTitle sx={{ bgcolor: '#1a4e8e', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 20, height: 20, bgcolor: selectedWard.color, borderRadius: 1, border: '2px solid #fff' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{selectedWard.name}</Typography>
                            </Box>
                            <IconButton size="small" onClick={handleCloseModal} sx={{ color: '#fff' }}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ pt: 3 }}>
                            <Grid container spacing={2}>
                                {/* Stats */}
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#e3f2fd', border: '1px solid #90caf9' }}>
                                        <PeopleIcon sx={{ color: '#1976d2', fontSize: 28 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{selectedWard.population.toLocaleString()}</Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Population</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#e8f5e9', border: '1px solid #a5d6a7' }}>
                                        <HomeIcon sx={{ color: '#388e3c', fontSize: 28 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c' }}>{selectedWard.households}</Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Households</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#fff3e0', border: '1px solid #ffcc80' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f57c00' }}>{selectedWard.area}</Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Area</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#ffebee', border: '1px solid #ef9a9a' }}>
                                        <ReportProblemIcon sx={{ color: '#d32f2f', fontSize: 28 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>{selectedWard.pendingComplaints}</Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Pending</Typography>
                                    </Paper>
                                </Grid>

                                {/* Facilities */}
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#333', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <AccountBalanceIcon fontSize="small" /> Key Facilities
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {selectedWard.facilities.map((facility, idx) => (
                                            <Chip
                                                key={idx}
                                                label={facility}
                                                size="small"
                                                sx={{ bgcolor: '#f5f5f5', border: '1px solid #ddd' }}
                                                icon={
                                                    facility.toLowerCase().includes('hospital') ? <LocalHospitalIcon fontSize="small" /> :
                                                        facility.toLowerCase().includes('school') || facility.toLowerCase().includes('college') ? <SchoolIcon fontSize="small" /> :
                                                            facility.toLowerCase().includes('water') ? <WaterDropIcon fontSize="small" /> : null
                                                }
                                            />
                                        ))}
                                    </Box>
                                </Grid>

                                {/* Ward Officer */}
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, bgcolor: '#fafafa', border: '1px solid #eee', mt: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#333', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <PersonIcon fontSize="small" /> Ward Officer
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PersonIcon sx={{ color: '#666' }} />
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>{selectedWard.officer}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhoneIcon sx={{ color: '#666', fontSize: 18 }} />
                                                <Typography variant="body2" sx={{ color: '#1a4e8e' }}>{selectedWard.phone}</Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>

                                {/* Road Toggle */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={showRoads}
                                                onChange={(e) => setShowRoads(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <RouteIcon fontSize="small" /> Show Road Paths in Ward
                                            </Typography>
                                        }
                                    />
                                    {showRoads && (
                                        <Typography variant="caption" sx={{ color: '#666', display: 'block', ml: 6 }}>
                                            Road paths are now visible on the map for {selectedWard.name}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
                            <Button variant="outlined" onClick={handleCloseModal}>Close</Button>
                            <Button variant="contained" sx={{ bgcolor: '#1a4e8e' }} href="/services">
                                File Complaint for {selectedWard.name}
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Paper>
    );
}
