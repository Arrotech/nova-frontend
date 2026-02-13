import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, paddingTop: pathname === '/' ? 0 : '80px' }}>
                <Outlet />
            </main>
            <footer style={{ background: 'var(--secondary)', color: 'white', padding: '4rem 0 2rem' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>NOVA<span style={{ fontWeight: 400, color: 'var(--primary-light)' }}>Rental</span></h3>
                        <p style={{ color: '#94A3B8', lineHeight: '1.7' }}>
                            Premium car rental services providing luxury and comfort for your journey. Experience the difference with our top-tier fleet.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.25rem' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#CBD5E1' }}>
                            <a href="/cars">Our Fleet</a>
                            <a href="/about">About Us</a>
                            <a href="/contact">Contact Support</a>
                            <a href="/terms">Terms & Conditions</a>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.25rem' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#CBD5E1' }}>
                            <p>123 Auto Avenue, Innovation City</p>
                            <p>+1 (555) 123-4567</p>
                            <p>support@novarental.com</p>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} NOVA Rental Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
