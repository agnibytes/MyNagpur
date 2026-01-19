'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useSettings } from '../contexts/SettingsContext';
import { getTranslation, translations } from '../utils/translations';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElLang, setAnchorElLang] = useState(null);
    const router = useRouter();
    const { language, changeLanguage, fontSize, changeFontSize } = useSettings();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        router.push('/auth/login');
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenLangMenu = (event) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLangMenu = () => {
        setAnchorElLang(null);
    };

    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
        handleCloseLangMenu();
    };

    const handleFontSizeChange = (size) => {
        changeFontSize(size);
    };

    const handleSkipToContent = () => {
        router.push('/services');
    };

    // Navigation Links Data - Active Links (translated)
    const pages = [
        { name: getTranslation(language, 'home'), path: '/' },
        { name: getTranslation(language, 'services'), path: '/services' },
        { name: getTranslation(language, 'dashboard'), path: '/dashboard' },
        { name: getTranslation(language, 'about'), path: '/about' },
        { name: getTranslation(language, 'contact'), path: '/contact' },
    ];

    return (
        <Box sx={{ width: '100%', bgcolor: '#fff', fontFamily: '"Roboto", sans-serif' }}>
            {/* Top Strip - Government Standard */}
            <Box sx={{ bgcolor: '#333', color: '#fff', py: 0.5, fontSize: '0.75rem' }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'center' } }}>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, display: 'flex', gap: 2 }}>
                        <a href="https://maharashtra.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#ddd', textDecoration: 'none' }}>Government of Maharashtra</a>
                        <span style={{ color: '#666' }}>|</span>
                        <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#ddd', textDecoration: 'none' }}>India.gov.in</a>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: { xs: 1, sm: 0 } }}>
                        <span
                            role="button"
                            aria-label="Skip to main content"
                            onClick={handleSkipToContent}
                            style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => e.target.style.color = '#FF9933'}
                            onMouseLeave={(e) => e.target.style.color = '#fff'}
                        >
                            {getTranslation(language, 'skipToContent')}
                        </span>
                        <span
                            onClick={() => handleFontSizeChange('large')}
                            style={{
                                cursor: 'pointer',
                                fontWeight: fontSize === 'large' ? 'bold' : 'normal',
                                color: fontSize === 'large' ? '#FF9933' : '#fff',
                                transition: 'all 0.2s'
                            }}
                        >
                            A+
                        </span>
                        <span
                            onClick={() => handleFontSizeChange('medium')}
                            style={{
                                cursor: 'pointer',
                                fontWeight: fontSize === 'medium' ? 'bold' : 'normal',
                                color: fontSize === 'medium' ? '#FF9933' : '#fff',
                                transition: 'all 0.2s'
                            }}
                        >
                            A
                        </span>
                        <span
                            onClick={() => handleFontSizeChange('small')}
                            style={{
                                cursor: 'pointer',
                                fontWeight: fontSize === 'small' ? 'bold' : 'normal',
                                color: fontSize === 'small' ? '#FF9933' : '#fff',
                                transition: 'all 0.2s'
                            }}
                        >
                            A-
                        </span>
                        <Box
                            onClick={handleOpenLangMenu}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #777',
                                borderRadius: 1,
                                px: 1,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: '#FF9933',
                                    bgcolor: 'rgba(255, 153, 51, 0.1)'
                                }
                            }}
                        >
                            <span style={{ fontWeight: 'bold', marginRight: 5 }}>
                                {translations[language]?.name || 'English'}
                            </span>
                            <span style={{ fontSize: '0.8rem' }}>▼</span>
                        </Box>
                        <Menu
                            anchorEl={anchorElLang}
                            open={Boolean(anchorElLang)}
                            onClose={handleCloseLangMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem
                                onClick={() => handleLanguageChange('english')}
                                selected={language === 'english'}
                            >
                                English
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleLanguageChange('hindi')}
                                selected={language === 'hindi'}
                            >
                                हिंदी (Hindi)
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleLanguageChange('marathi')}
                                selected={language === 'marathi'}
                            >
                                मराठी (Marathi)
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleLanguageChange('varhadi')}
                                selected={language === 'varhadi'}
                            >
                                वरहाडी (Varhadi)
                            </MenuItem>
                        </Menu>
                    </Box>
                </Container>
            </Box>

            {/* Main Header - Logos and Leadership */}
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2.5, md: 0 } }}>
                    {/* Left: Emblem and Text */}
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: { xs: 'center', md: 'left' } }}>
                        <Box sx={{ position: 'relative', height: { xs: '70px', md: '85px' }, width: 'auto', marginRight: '20px' }}>
                            <img
                                src="/emblem_new.png"
                                alt="National Emblem of India"
                                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', lineHeight: 1.1, fontSize: { xs: '1.4rem', md: '1.8rem' } }}>
                                माझा उमरेड
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a4e8e', lineHeight: 1.1, textTransform: 'uppercase', fontSize: { xs: '1rem', md: '1.2rem' } }}>
                                Majha Umred
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#555', fontWeight: 500, fontSize: '0.85rem' }}>
                                Government of Maharashtra
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Government Initiative Logos */}
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                        alignItems: 'center',
                        ml: 2
                    }}>
                        {/* Digital India */}
                        <Box sx={{
                            height: '63px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}>
                            <img
                                src="/images/logo/Digital_India_logo.svg.png"
                                alt="Digital India"
                                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                            />
                        </Box>

                        {/* Vertical Divider */}
                        <Box sx={{ height: '30px', width: '1px', bgcolor: '#e0e0e0' }} />

                        {/* logo of umred nagar parishad */}
                        <Box sx={{
                            height: '78px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}>
                            <img
                                src="/images/logo/umrednagarparishd.png"
                                alt="G20 India 2023"
                                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                            />
                        </Box>

                        {/* Vertical Divider */}
                        <Box sx={{ height: '30px', width: '1px', bgcolor: '#e0e0e0' }} />

                        {/* Swachh Bharat */}
                        <Box sx={{
                            height: '99px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}>
                            <img
                                src="/swachh_bharat.png"
                                alt="Swachh Bharat Abhiyan"
                                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>


            {/* Navigation Bar - Saffron/Green Borders */}
            <Box sx={{ bgcolor: '#1a4e8e', borderTop: '4px solid #FF9933', borderBottom: '4px solid #138808', boxShadow: 3, position: 'relative', zIndex: 10 }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters variant="dense" sx={{ minHeight: '52px !important' }}>

                        {/* Mobile Menu Icon (Hamburger) */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{ color: '#fff' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} href={page.path}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                                <Divider />
                                {!user ? (
                                    <>
                                        <MenuItem onClick={handleCloseNavMenu} component={Link} href="/auth/login"><Typography>{getTranslation(language, 'login')}</Typography></MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu} component={Link} href="/auth/register"><Typography>{getTranslation(language, 'register')}</Typography></MenuItem>
                                    </>
                                ) : (
                                    <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}><Typography color="error">{getTranslation(language, 'logout')}</Typography></MenuItem>
                                )}
                            </Menu>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1, alignItems: 'center' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    href={page.path}
                                    sx={{
                                        color: '#fff',
                                        textTransform: 'capitalize',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        px: 2,
                                        py: 1.5,
                                        borderRadius: 0,
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', borderBottom: '2px solid #fff' }
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* Search and Auth */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder={getTranslation(language, 'search')}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>

                            {user ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#FF9933', fontWeight: 'bold', mr: 2, display: { xs: 'none', md: 'block' } }}>
                                        {user.name}
                                    </Typography>
                                    <Button sx={{ color: '#fff', textTransform: 'none', bgcolor: '#b71c1c', '&:hover': { bgcolor: '#aa1919' }, borderRadius: 0 }} size="small" onClick={handleLogout}>
                                        {getTranslation(language, 'logout')}
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                                    <Button color="inherit" component={Link} href="/auth/login" size="small" sx={{ borderColor: 'rgba(255,255,255,0.5)', border: '1px solid' }}>{getTranslation(language, 'login')}</Button>
                                    <Button variant="contained" size="small" component={Link} href="/auth/register" sx={{ bgcolor: '#FF9933', color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#e68a00' }, borderRadius: 0 }}>{getTranslation(language, 'register')}</Button>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
        </Box>
    );
}
