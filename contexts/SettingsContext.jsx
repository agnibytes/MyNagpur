'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [language, setLanguage] = useState('english');
    const [fontSize, setFontSize] = useState('medium');

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('siteLanguage');
        const savedFontSize = localStorage.getItem('siteFontSize');

        if (savedLanguage) setLanguage(savedLanguage);
        if (savedFontSize) setFontSize(savedFontSize);
    }, []);

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('siteLanguage', language);
        // Apply font size class to body
        document.documentElement.setAttribute('data-font-size', fontSize);
    }, [language, fontSize]);

    // Save font size to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('siteFontSize', fontSize);
        document.documentElement.setAttribute('data-font-size', fontSize);
    }, [fontSize]);

    const changeFontSize = (size) => {
        setFontSize(size);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <SettingsContext.Provider value={{
            language,
            changeLanguage,
            fontSize,
            changeFontSize
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
