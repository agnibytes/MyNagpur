'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getTrafficPredictions } from '../../utils/aiApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

export default function PredictionDashboard() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const resp = await getTrafficPredictions();
      const rawData = resp.predictions || [];
      
      // Process data for chart
      const times = ["17:00", "18:00", "19:00", "20:00"];
      const sitabuldiData = rawData.filter(d => d.ward === "Sitabuldi").map(d => parseLevel(d.congestion_level));
      const manewadaData = rawData.filter(d => d.ward === "Manewada").map(d => parseLevel(d.congestion_level));
      
      setChartData({
        labels: times,
        datasets: [
          {
            label: 'Sitabuldi Congestion',
            data: sitabuldiData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.4
          },
          {
            label: 'Manewada Congestion',
            data: manewadaData.length > 0 ? manewadaData : [2, 3, 2, 4], // fallback if missing
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.4
          }
        ],
      });
      setLoading(false);
    }
    loadData();
  }, []);

  const parseLevel = (level) => {
    switch(level) {
      case 'Low': return 1;
      case 'Moderate': return 2;
      case 'High': return 3;
      case 'Critical': return 4;
      default: return 2;
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false, text: 'Traffic Congestion Forecast' },
      tooltip: {
          callbacks: {
              label: function(context) {
                  let text = 'Moderate';
                  if (context.raw === 1) text = 'Low';
                  if (context.raw === 3) text = 'High';
                  if (context.raw === 4) text = 'Critical';
                  return `${context.dataset.label}: ${text}`;
              }
          }
      }
    },
    scales: {
        y: {
            min: 0, max: 5,
            ticks: {
                callback: function(value) {
                    if(value === 1) return 'Low';
                    if(value === 2) return 'Moderate';
                    if(value === 3) return 'High';
                    if(value === 4) return 'Critical';
                    return '';
                }
            }
        }
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Paper sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column' }} elevation={3}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        📈 AI Prediction Dashboard
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
          {chartData && <Line options={options} data={chartData} />}
      </Box>
    </Paper>
  );
}
