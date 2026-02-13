import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine navbar background style
    const navbarStyle = {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '1rem 0' : '1.5rem 0',
        transition: 'all 0.3s ease',
        background: scrolled || !isHome ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled || !isHome ? 'blur(10px)' : 'none',
        boxShadow: scrolled || !isHome ? 'var(--shadow-sm)' : 'none',
        color: scrolled || !isHome ? 'var(--text-main)' : 'white',
    };

    const linkStyle = (path: string) => ({
        color: 'inherit',
        fontWeight: location.pathname === path ? 700 : 500,
        position: 'relative' as const,
        opacity: location.pathname === path ? 1 : 0.8,
    });

    return (
        <nav style={navbarStyle}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span style={{ color: scrolled || !isHome ? 'var(--primary)' : 'white' }}>NOVA</span>
                    <span style={{ fontWeight: 400 }}>Rental</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link to="/" style={linkStyle('/')}>Home</Link>
                    <Link to="/cars" style={linkStyle('/cars')}>Fleet</Link>
                    <Link to="/about" style={linkStyle('/about')}>About</Link>
                    <Link to="/contact" style={linkStyle('/contact')}>Contact</Link>

                    {isAuthenticated ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Link to={user?.is_superuser ? '/admin/dashboard' : '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <FaUserCircle size={20} /> My Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" style={{ fontWeight: 600 }}>Log In</Link>
                            <Link to="/register" className={`btn ${scrolled || !isHome ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ display: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu (Overlay) */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                height: '100vh',
                width: '70%',
                background: 'white',
                boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                zIndex: 1001,
                color: 'var(--text-main)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <FaTimes size={24} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
                </div>
                <Link to="/" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 600 }}>Home</Link>
                <Link to="/cars" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 600 }}>Fleet</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 600 }}>About</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 600 }}>Contact</Link>

                {isAuthenticated ? (
                    <Link to={user?.is_superuser ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>My Dashboard</Link>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 600 }}>Log In</Link>
                        <Link to="/register" onClick={() => setIsOpen(false)} className="btn btn-primary">Sign Up</Link>
                    </>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
