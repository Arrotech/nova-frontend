import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch, FaStar, FaShieldAlt, FaBolt, FaCarSide } from 'react-icons/fa';
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
        <div style={{ background: '#020617', color: 'white', overflowX: 'hidden' }}>

            {/* HER HERO SECTION */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 2rem'
            }}>
                {/* Background Image with Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    zIndex: 0
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury Car"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} // Darkened
                    />
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%',
                        background: 'linear-gradient(to top, #020617, transparent)'
                    }}></div>
                </div>

                {/* Hero Content */}
                <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '-50px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <span style={{ color: '#FCD34D', fontWeight: 600, letterSpacing: '1px', fontSize: '0.9rem' }}>
                            PREMIUM FLEET 2024
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                        lineHeight: 1.1,
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #fff, #94A3B8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Drive the <span className="text-gradient-gold">Extraordinary</span>
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        Experience the thrill of the road with our exclusive collection of luxury and sports vehicles.
                    </p>

                    {/* Glass Search Widget */}
                    <div className="glass-dark" style={{
                        padding: '1.5rem',
                        borderRadius: '24px',
                        maxWidth: '900px',
                        margin: '0 auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        alignItems: 'end',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
                            <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Pick-up Location</label>
                            <input type="text" placeholder="City, Airport, or Address" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                        </div>
                        <div style={{ flex: '1 1 150px', textAlign: 'left' }}>
                            <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Pick-up Date</label>
                            <input type="date" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                        </div>
                        <div style={{ flex: '1 1 150px', textAlign: 'left' }}>
                            <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Return Date</label>
                            <input type="date" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                        </div>
                        <Link to="/cars" className="btn btn-primary" style={{ height: '54px', padding: '0 2.5rem', fontSize: '1.1rem', background: '#2563EB' }}>
                            Search <FaSearch style={{ fontSize: '0.9rem' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* BRANDS MARQUEE */}
            <section style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#020617' }}>
                <div className="marquee-container">
                    <div className="marquee-content">
                        {[...brands, ...brands, ...brands].map((brand, idx) => (
                            <div key={idx} style={{ display: 'inline-block', margin: '0 40px', opacity: 0.5, filter: 'grayscale(100%) invert(1)' }}>
                                <img src={brand} alt="brand" style={{ height: '40px', objectFit: 'contain' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENTO GRID CATEGORIES */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Find Your Perfect Match</h2>
                        <p style={{ color: '#94A3B8' }}>Select from our premium categories.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gridAutoRows: '250px',
                        gap: '1.5rem'
                    }}>
                        {/* Sports Car - Large Item */}
                        <div className="card" style={{
                            gridColumn: 'span 2',
                            background: 'url(https://images.unsplash.com/photo-1603584173870-7b299f589836?q=80&w=2070)',
                            backgroundSize: 'cover',
                            position: 'relative',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                <h3 style={{ color: 'white', fontSize: '1.8rem' }}>Sports & Exotics</h3>
                                <p style={{ color: '#E2E8F0' }}>For those who crave speed and attention.</p>
                            </div>
                        </div>

                        {/* SUV */}
                        <div className="card" style={{
                            background: 'url(https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070)',
                            backgroundSize: 'cover',
                            position: 'relative',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                <h3 style={{ color: 'white', fontSize: '1.5rem' }}>Luxury SUVs</h3>
                            </div>
                        </div>

                        {/* Electric */}
                        <div className="card" style={{
                            background: 'url(https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070)',
                            backgroundSize: 'cover',
                            position: 'relative',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                <h3 style={{ color: 'white', fontSize: '1.5rem' }}>Electric</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us - Dark Cards */}
            <section style={{ padding: '6rem 0', background: '#0F172A' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.2)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                                <FaBolt />
                            </div>
                            <h3 style={{ marginBottom: '1rem', color: 'white' }}>Instant Booking</h3>
                            <p style={{ color: '#94A3B8' }}>No paperwork. Book via our app or website in seconds and get moving.</p>
                        </div>
                        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                                <FaShieldAlt />
                            </div>
                            <h3 style={{ marginBottom: '1rem', color: 'white' }}>Full Insurance</h3>
                            <p style={{ color: '#94A3B8' }}>Comprehensive coverage included with every rental for your peace of mind.</p>
                        </div>
                        <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                                <FaStar />
                            </div>
                            <h3 style={{ marginBottom: '1rem', color: 'white' }}>VIP Service</h3>
                            <p style={{ color: '#94A3B8' }}>24/7 concierge support and doorstep delivery available.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Fleet (Light Section for Contrast) */}
            <section style={{ padding: '6rem 0', background: '#F8FAFC', color: '#0F172A' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <span style={{ color: '#2563EB', fontWeight: 600, letterSpacing: '1px' }}>EXCLUSIVE COLLECTION</span>
                            <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: '#0F172A' }}>Trending Now</h2>
                        </div>
                        <Link to="/cars" className="btn btn-outline" style={{ borderColor: '#0F172A', color: '#0F172A' }}>View All Fleet <FaArrowRight /></Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
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
                            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center' }}>
                                <p style={{ color: '#64748B' }}>Loading our fleet...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section style={{ padding: '8rem 0', background: 'linear-gradient(135deg, #020617 0%, #1E3A8A 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Abstract Shapes */}
                <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Ready to upgrade your drive?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: '#94A3B8', fontSize: '1.25rem' }}>Join thousands of satisfied customers who trust us for their journey.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/cars" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Browse Fleet</Link>
                        <Link to="/contact" className="btn btn-outline" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
