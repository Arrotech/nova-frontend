import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-dark text-slate-200">
            <Navbar />
            <main className="flex-1 pt-20">
                <Outlet />
            </main>
            <footer className="bg-surface border-t border-white/5 py-12 sm:py-16">
                <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl mb-4 font-heading font-extrabold tracking-tighter">NOVA<span className="font-normal text-primary-light">Rental</span></h3>
                        <p className="text-slate-500 leading-relaxed text-sm sm:text-base">Premium car rental services providing luxury and comfort for your journey.</p>
                        <div className="flex gap-3 mt-6 justify-center sm:justify-start">
                            {[<FaFacebookF size={14} />, <FaInstagram size={14} />, <FaTwitter size={14} />, <FaYoutube size={14} />].map((icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300">{icon}</a>
                            ))}
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="mb-4 sm:mb-5 text-lg font-semibold">Quick Links</h4>
                        <div className="flex flex-col gap-3 text-slate-500">
                            <Link to="/cars" className="hover:text-primary transition-colors">Our Fleet</Link>
                            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                            <Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="mb-4 sm:mb-5 text-lg font-semibold">Contact</h4>
                        <div className="flex flex-col gap-3 text-slate-500 text-sm sm:text-base">
                            <p>123 Auto Avenue, Innovation City</p>
                            <p>+1 (555) 123-4567</p>
                            <p>support@novarental.com</p>
                        </div>
                    </div>
                </div>
                <div className="container pt-6 sm:pt-8 border-t border-white/5 text-center text-slate-600 text-xs sm:text-sm">
                    <p>&copy; {new Date().getFullYear()} NOVA Rental Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
