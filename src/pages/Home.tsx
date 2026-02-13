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
        <div className="overflow-x-hidden">

            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-8 -mt-20 pt-20">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" alt="Luxury Car" className="w-full h-full object-cover brightness-[0.25]" />
                    <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-dark to-transparent"></div>
                </div>

                <div className="container relative z-10 text-center animate-fade-in">
                    <div className="inline-block px-4 sm:px-6 py-2 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-white/10">
                        <span className="text-amber-400 font-semibold tracking-widest text-xs sm:text-sm">PREMIUM FLEET 2024</span>
                    </div>
                    <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Drive the <span className="text-primary-light">Extraordinary</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
                        Experience the thrill of the road with our exclusive collection of luxury and sports vehicles.
                    </p>

                    <div className="glass-dark p-4 sm:p-6 rounded-2xl sm:rounded-3xl max-w-4xl mx-auto shadow-glow">
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-end">
                            <div className="flex-1 min-w-0 text-left">
                                <label className="block text-slate-500 mb-1.5 sm:mb-2 text-xs sm:text-sm">Pick-up Location</label>
                                <input type="text" placeholder="City, Airport, or Address" className="input-field text-sm sm:text-base" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <label className="block text-slate-500 mb-1.5 sm:mb-2 text-xs sm:text-sm">Pick-up Date</label>
                                <input type="date" className="input-field text-sm sm:text-base" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <label className="block text-slate-500 mb-1.5 sm:mb-2 text-xs sm:text-sm">Return Date</label>
                                <input type="date" className="input-field text-sm sm:text-base" />
                            </div>
                            <Link to="/cars" className="btn btn-primary h-[48px] sm:h-[54px] px-8 sm:px-10 text-base sm:text-lg justify-center w-full sm:w-auto">
                                Search <FaSearch className="text-sm" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* BRANDS MARQUEE */}
            <section className="py-8 sm:py-12 border-b border-white/5">
                <div className="marquee-container">
                    <div className="marquee-content">
                        {[...brands, ...brands, ...brands].map((brand, idx) => (
                            <div key={idx} className="inline-block mx-6 sm:mx-10 opacity-30 grayscale invert">
                                <img src={brand} alt="brand" className="h-7 sm:h-10 object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENTO GRID CATEGORIES */}
            <section className="py-16 sm:py-24">
                <div className="container">
                    <div className="mb-8 sm:mb-12 text-center">
                        <h2 className="section-title text-3xl sm:text-4xl">Find Your Perfect Match</h2>
                        <p className="text-slate-500 text-sm sm:text-base">Select from our premium categories.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[250px]">
                        <div className="sm:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1603584173870-7b299f589836?q=80&w=2070" alt="Sports" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                                <h3 className="text-xl sm:text-2xl font-bold mb-1">Sports & Exotics</h3>
                                <p className="text-slate-300 text-sm sm:text-base">For those who crave speed and attention.</p>
                            </div>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070" alt="SUV" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                                <h3 className="text-xl sm:text-2xl font-bold">Luxury SUVs</h3>
                            </div>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070" alt="Electric" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                                <h3 className="text-xl sm:text-2xl font-bold">Electric</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="py-16 sm:py-24 bg-surface">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                        <div className="p-6 sm:p-8 bg-white/[0.03] rounded-2xl sm:rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 text-primary-light flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6"><FaBolt /></div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Instant Booking</h3>
                            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">No paperwork. Book via our app or website in seconds and get moving.</p>
                        </div>
                        <div className="p-6 sm:p-8 bg-white/[0.03] rounded-2xl sm:rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6"><FaShieldAlt /></div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Full Insurance</h3>
                            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">Comprehensive coverage included with every rental for your peace of mind.</p>
                        </div>
                        <div className="p-6 sm:p-8 bg-white/[0.03] rounded-2xl sm:rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300 sm:col-span-2 md:col-span-1">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6"><FaStar /></div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">VIP Service</h3>
                            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">24/7 concierge support and doorstep delivery available.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Fleet */}
            <section className="py-16 sm:py-24">
                <div className="container">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                        <div>
                            <span className="text-primary font-semibold tracking-widest text-xs sm:text-sm">EXCLUSIVE COLLECTION</span>
                            <h2 className="section-title mt-2">Trending Now</h2>
                        </div>
                        <Link to="/cars" className="hidden md:flex btn btn-outline">View All Fleet <FaArrowRight /></Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {featuredCars.length > 0 ? featuredCars.map((car: any) => (
                            <CarCard key={car.id} id={car.id} make={car.make} model={car.model} year={car.year} price={car.price_per_day}
                                image={car.images?.length > 0 ? car.images[0].image_url : undefined} available={car.is_available} specs={car.specs} />
                        )) : (
                            <div className="col-span-full py-12 sm:py-16 text-center"><p className="text-slate-500 text-base sm:text-lg">Loading our fleet...</p></div>
                        )}
                    </div>
                    <div className="mt-8 sm:mt-12 text-center md:hidden">
                        <Link to="/cars" className="btn btn-outline w-full justify-center">View All Fleet <FaArrowRight /></Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 sm:py-32 bg-gradient-to-br from-surface to-blue-950 text-center relative overflow-hidden px-4">
                <div className="absolute -top-1/2 -left-1/4 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="container relative z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6">Ready to upgrade your drive?</h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">Join thousands of satisfied customers who trust us for their journey.</p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link to="/cars" className="btn btn-primary text-base sm:text-lg px-8 sm:px-12 py-3.5 sm:py-4 justify-center">Browse Fleet</Link>
                        <Link to="/contact" className="btn btn-outline text-base sm:text-lg px-8 sm:px-12 py-3.5 sm:py-4 justify-center">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
