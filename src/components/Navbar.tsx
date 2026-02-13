import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 text-text-main'
            : 'bg-transparent py-6 text-white'
        }`;

    const logoColor = scrolled || !isHome ? 'text-secondary' : 'text-white';

    const getLinkClass = (path: string) => {
        const isActive = location.pathname === path;
        return `font-medium hover:opacity-100 transition-opacity relative ${isActive ? 'opacity-100 font-bold' : 'opacity-80'
            }`;
    };

    return (
        <nav className={navClasses}>
            <div className="container flex justify-between items-center">
                <Link to="/" className={`font-heading text-2xl font-extrabold tracking-tighter flex items-center gap-1 ${logoColor}`}>
                    NOVA<span className="font-normal text-primary">Rental</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <Link to="/" className={getLinkClass('/')}>Home</Link>
                    <Link to="/cars" className={getLinkClass('/cars')}>Fleet</Link>
                    <Link to="/about" className={getLinkClass('/about')}>About</Link>
                    <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link to={user?.is_superuser ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 font-semibold hover:text-primary transition-colors">
                                <FaUserCircle size={20} /> My Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="font-semibold hover:text-primary">Log In</Link>
                            <Link to="/register" className={`btn px-5 py-2 text-sm ${scrolled || !isHome ? 'btn-primary' : 'btn-outline border-white text-white hover:bg-white/10'}`}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu (Overlay) */}
            <div className={`fixed inset-y-0 right-0 w-[70%] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 p-8 flex flex-col gap-8 text-text-main ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end">
                    <FaTimes size={24} onClick={() => setIsOpen(false)} className="cursor-pointer text-slate-400 hover:text-slate-600" />
                </div>

                <div className="flex flex-col gap-6 text-xl font-semibold">
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-primary">Home</Link>
                    <Link to="/cars" onClick={() => setIsOpen(false)} className="hover:text-primary">Fleet</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-primary">About</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary">Contact</Link>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-4">
                    {isAuthenticated ? (
                        <Link to={user?.is_superuser ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsOpen(false)} className="text-primary font-bold text-lg">My Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-outline text-center justify-center border-slate-200 text-slate-700">Log In</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="btn btn-primary text-center justify-center">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
            )}
        </nav>
    );
};

export default Navbar;
