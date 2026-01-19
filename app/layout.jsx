import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import dynamic from 'next/dynamic'
import { SettingsProvider } from '../contexts/SettingsContext'

const ChatWidget = dynamic(() => import('../components/ChatWidget'), { ssr: false })

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
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                    <ChatWidget />
                </SettingsProvider>
            </body>
        </html>
    )
}



