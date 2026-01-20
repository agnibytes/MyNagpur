import './globals.css'
import { SettingsProvider } from '../contexts/SettingsContext'
import LayoutWrapper from './LayoutWrapper'

export const metadata = {
    title: 'Majha Umred - National E-Governance Platform',
    description: 'Ward-wise performance dashboard for Umred',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </head>
            <body>
                <SettingsProvider>
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </SettingsProvider>
            </body>
        </html>
    )
}
