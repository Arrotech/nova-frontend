import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) document.body.classList.add('nav-open');
        else document.body.classList.remove('nav-open');
        return () => document.body.classList.remove('nav-open');
    }, [isOpen]);

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    const getLinkClass = (path: string) => {
        const isActive = location.pathname === path;
        return `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-slate-400 hover:text-white'}`;
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/cars', label: 'Fleet' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-surface/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3' : 'bg-surface py-4'}`}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="font-heading text-xl sm:text-2xl font-extrabold tracking-tighter text-white">
                    NOVA<span className="font-normal text-primary">Rental</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 lg:gap-10">
                    {navLinks.map((link) => (
                        <Link key={link.to} to={link.to} className={getLinkClass(link.to)}>{link.label}</Link>
                    ))}
                    {isAuthenticated ? (
                        <Link to={user?.is_superuser ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 font-semibold text-slate-300 hover:text-primary transition-colors">
                            <FaUserCircle size={20} /> My Dashboard
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="font-semibold text-slate-300 hover:text-white transition-colors">Log In</Link>
                            <Link to="/register" className="btn btn-primary px-5 py-2 text-sm">Sign Up</Link>
                        </div>
                    )}
                </div>

                <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl text-2xl text-slate-300 hover:bg-white/5 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Backdrop */}
            <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />

            {/* Mobile Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-[75%] max-w-sm bg-surface border-l border-white/5 shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <span className="font-heading text-xl font-extrabold text-white tracking-tighter">NOVA<span className="font-normal text-primary">Rental</span></span>
                    <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors" aria-label="Close menu">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="flex-1 flex flex-col gap-1 p-6 overflow-y-auto">
                    {navLinks.map((link, i) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-semibold transition-all ${isActive ? 'text-primary bg-primary/10' : 'text-white hover:text-primary hover:bg-white/5'} ${isOpen ? 'animate-slide-in opacity-0' : ''}`}
                                style={isOpen ? { animationDelay: `${i * 75 + 100}ms` } : undefined}>
                                {link.label}
                                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                            </Link>
                        );
                    })}
                </div>
                <div className="p-6 border-t border-white/5 space-y-3">
                    {isAuthenticated ? (
                        <Link to={user?.is_superuser ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsOpen(false)} className="btn btn-primary w-full justify-center">
                            <FaUserCircle size={18} /> My Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-outline w-full justify-center">Log In</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="btn btn-primary w-full justify-center">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
