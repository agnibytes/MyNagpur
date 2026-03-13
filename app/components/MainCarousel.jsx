'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircleIcon from '@mui/icons-material/Circle';

const slides = [
    {
        image: '/images/nagpur_hero.png',
        title: 'Nagpur: The Tiger Capital of India',
        subtitle: 'Experience the heartbeat of Maharashtra in the heart of the country.'
    },
    {
        image: '/images/arts/Gemini_Generated_Image_25rzf925rzf925rz.png',
        title: 'Developing Infrastructure',
        subtitle: 'Building a better tomorrow with sustainable urban planning.'
    },
    {
        image: '/images/arts/service.png',
        title: 'Seamless Citizen Services',
        subtitle: 'Efficient, transparent, and digital governance for all.'
    }
];

export default function MainCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 0,
                mb: 3,
                aspectRatio: '16/9',
                border: '1px solid #ddd'
            }}
        >
            {/* Slides */}
            {slides.map((slide, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === currentSlide ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Overlay Gradient */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            p: 3
                        }}
                    >
                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            {slide.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#eee', mt: 0.5, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            {slide.subtitle}
                        </Typography>
                    </Box>
                </Box>
            ))}

            {/* Controls */}
            <IconButton
                onClick={prevSlide}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>

            <IconButton
                onClick={nextSlide}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>

            {/* Indicators */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1
                }}
            >
                {slides.map((_, index) => (
                    <CircleIcon
                        key={index}
                        sx={{
                            fontSize: 12,
                            color: index === currentSlide ? '#FF9933' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer'
                        }}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </Box>
        </Paper>
    );
}
