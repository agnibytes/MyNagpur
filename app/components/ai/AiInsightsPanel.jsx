'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, CircularProgress } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getCityInsights } from '../../utils/aiApi';

export default function AiInsightsPanel() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getCityInsights();
      setInsights(data.insights || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const getIcon = (severity) => {
    switch(severity) {
      case 'high': return <ErrorOutlineIcon color="error" />;
      case 'medium': return <WarningAmberIcon color="warning" />;
      default: return <InfoOutlinedIcon color="info" />;
    }
  };

  const getColor = (severity) => {
    switch(severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        🧠 AI City Insights
      </Typography>
      <Grid container spacing={2}>
        {insights.map((insight, idx) => (
          <Grid item xs={12} key={idx}>
            <Card sx={{ 
                borderLeft: 4, 
                borderColor: `${getColor(insight.severity)}.main`,
                boxShadow: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-2px)' }
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, '&:last-child': { pb: 2 } }}>
                {getIcon(insight.severity)}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {insight.message}
                  </Typography>
                </Box>
                <Chip 
                  label={insight.type.replace('_', ' ').toUpperCase()} 
                  size="small" 
                  color={getColor(insight.severity)}
                  variant="outlined"
                  sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
