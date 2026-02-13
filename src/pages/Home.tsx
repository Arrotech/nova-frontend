import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch, FaStar, FaShieldAlt, FaBolt } from 'react-icons/fa';
import api from '../services/api';
import CarCard from '../components/CarCard';

const Home = () => {
    const [featuredCars, setFeaturedCars] = useState<any[]>([]);

    useEffect(() => {
        api.get('/cars?limit=3')
            .then(res => setFeaturedCars(res.data))
            .catch(err => console.error(err));
    }, []);

    const brands = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Porsche_wappen.svg/1024px-Porsche_wappen.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/1200px-Ford_Motor_Company_Logo.svg.png"
    ];

    return (
        <div className="bg-dark text-white overflow-x-hidden">

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center px-8">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury Car"
                        className="w-full h-full object-cover brightness-[0.35]"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-dark to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 text-center -mt-12 animate-fade-in">
                    <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/10">
                        <span className="text-amber-300 font-semibold tracking-widest text-sm">
                            PREMIUM FLEET 2024
                        </span>
                    </div>

                    <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Drive the <span className="text-gradient-gold">Extraordinary</span>
                    </h1>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Experience the thrill of the road with our exclusive collection of luxury and sports vehicles.
                    </p>

                    {/* Glass Search Widget */}
                    <div className="glass-dark p-6 rounded-3xl max-w-4xl mx-auto flex flex-wrap gap-4 items-end shadow-glow">
                        <div className="flex-1 min-w-[200px] text-left">
                            <label className="block text-slate-400 mb-2 text-sm">Pick-up Location</label>
                            <input type="text" placeholder="City, Airport, or Address" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-primary focus:outline-none transition-colors" />
                        </div>
                        <div className="flex-1 min-w-[150px] text-left">
                            <label className="block text-slate-400 mb-2 text-sm">Pick-up Date</label>
                            <input type="date" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-primary focus:outline-none transition-colors" />
                        </div>
                        <div className="flex-1 min-w-[150px] text-left">
                            <label className="block text-slate-400 mb-2 text-sm">Return Date</label>
                            <input type="date" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-primary focus:outline-none transition-colors" />
                        </div>
                        <Link to="/cars" className="btn btn-primary h-[54px] px-10 text-lg">
                            Search <FaSearch className="text-sm" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* BRANDS MARQUEE */}
            <section className="py-12 border-b border-white/5 bg-dark">
                <div className="marquee-container">
                    <div className="marquee-content">
                        {[...brands, ...brands, ...brands].map((brand, idx) => (
                            <div key={idx} className="inline-block mx-10 opacity-50 grayscale invert">
                                <img src={brand} alt="brand" className="h-10 object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENTO GRID CATEGORIES */}
            <section className="py-24">
                <div className="container">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-bold mb-4">Find Your Perfect Match</h2>
                        <p className="text-slate-400">Select from our premium categories.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                        {/* Sports Car - Large Item */}
                        <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1603584173870-7b299f589836?q=80&w=2070" alt="Sports" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-white text-2xl font-bold mb-1">Sports & Exotics</h3>
                                <p className="text-slate-200">For those who crave speed and attention.</p>
                            </div>
                        </div>

                        {/* SUV */}
                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070" alt="SUV" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-white text-2xl font-bold">Luxury SUVs</h3>
                            </div>
                        </div>

                        {/* Electric */}
                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070" alt="Electric" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-white text-2xl font-bold">Electric</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us - Dark Cards */}
            <section className="py-24 bg-secondary">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary-light flex items-center justify-center text-2xl mb-6">
                                <FaBolt />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">Instant Booking</h3>
                            <p className="text-slate-400 leading-relaxed">No paperwork. Book via our app or website in seconds and get moving.</p>
                        </div>
                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-2xl mb-6">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">Full Insurance</h3>
                            <p className="text-slate-400 leading-relaxed">Comprehensive coverage included with every rental for your peace of mind.</p>
                        </div>
                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-6">
                                <FaStar />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">VIP Service</h3>
                            <p className="text-slate-400 leading-relaxed">24/7 concierge support and doorstep delivery available.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Fleet (Light Section for Contrast) */}
            <section className="py-24 bg-slate-50 text-slate-900">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-semibold tracking-widest">EXCLUSIVE COLLECTION</span>
                            <h2 className="text-4xl font-bold mt-2 text-slate-900">Trending Now</h2>
                        </div>
                        <Link to="/cars" className="hidden md:flex btn btn-outline border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white">
                            View All Fleet <FaArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredCars.length > 0 ? featuredCars.map((car: any) => (
                            <CarCard
                                key={car.id}
                                id={car.id}
                                make={car.make}
                                model={car.model}
                                year={car.year}
                                price={car.price_per_day}
                                image={car.images && car.images.length > 0 ? car.images[0].image_url : undefined}
                                available={car.is_available}
                                specs={car.specs}
                            />
                        )) : (
                            <div className="col-span-full py-16 text-center">
                                <p className="text-slate-500 text-lg">Loading our fleet...</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/cars" className="btn btn-outline border-slate-900 text-slate-900 w-full justify-center">
                            View All Fleet <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-32 bg-gradient-to-br from-dark to-blue-900 text-center relative overflow-hidden">
                {/* Abstract Shapes */}
                <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="container relative z-10">
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Ready to upgrade your drive?</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">Join thousands of satisfied customers who trust us for their journey.</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/cars" className="btn btn-primary text-lg px-12 py-4">Browse Fleet</Link>
                        <Link to="/contact" className="btn btn-outline border-white/20 text-white hover:bg-white/10 text-lg px-12 py-4">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
