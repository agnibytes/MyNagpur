'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ChatWidget = dynamic(() => import('../components/ChatWidget'), { ssr: false });

// Pages where we don't want the main navbar/footer
const noNavbarRoutes = [
    '/government',
    '/admin',
    '/admin-dashboard',
    '/command-center'
];

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    // Check if current path starts with any of the no-navbar routes
    const hideNavbar = noNavbarRoutes.some(route => pathname?.startsWith(route));

    if (hideNavbar) {
        // Minimal layout for admin/government pages
        return (
            <>
                {children}
            </>
        );
    }

    // Default layout with Navbar, Footer, and ChatWidget
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
            <ChatWidget />
        </>
    );
}
