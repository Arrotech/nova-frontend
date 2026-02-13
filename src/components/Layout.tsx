import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className={`flex-1 ${pathname === '/' ? '' : 'pt-20'}`}>
                <Outlet />
            </main>
            <footer className="bg-secondary text-white py-16">
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl mb-4 text-white">NOVA<span className="font-normal text-primary-light">Rental</span></h3>
                        <p className="text-text-light leading-relaxed">
                            Premium car rental services providing luxury and comfort for your journey. Experience the difference with our top-tier fleet.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white mb-5 text-lg">Quick Links</h4>
                        <div className="flex flex-col gap-3 text-slate-300">
                            <a href="/cars" className="hover:text-primary transition-colors">Our Fleet</a>
                            <a href="/about" className="hover:text-primary transition-colors">About Us</a>
                            <a href="/contact" className="hover:text-primary transition-colors">Contact Support</a>
                            <a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white mb-5 text-lg">Contact</h4>
                        <div className="flex flex-col gap-3 text-slate-300">
                            <p>123 Auto Avenue, Innovation City</p>
                            <p>+1 (555) 123-4567</p>
                            <p>support@novarental.com</p>
                        </div>
                    </div>
                </div>
                <div className="container pt-8 border-t border-white/10 text-center text-text-muted text-sm">
                    <p>&copy; {new Date().getFullYear()} NOVA Rental Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
