import { FaUsers, FaTrophy, FaHandshake } from 'react-icons/fa';

const About = () => {
    return (
        <div>
            {/* Header */}
            <div style={{ background: 'var(--secondary)', padding: '6rem 0', color: 'white', textAlign: 'center' }}>
                <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', marginBottom: '1rem' }}>Our Story</h1>
                <p style={{ color: '#94A3B8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
                    Redefining luxury car rentals with a commitment to excellence and customer satisfaction.
                </p>
            </div>

            <div className="container section-padding">
                <div className="grid-2-cols">
                    <div>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Who We Are</span>
                        <h2 className="section-title" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Driven by Passion, <br /> Defined by Quality.</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                            Founded in 2024, NOVA Rental was born from a simple idea: that renting a car should be as enjoyable as driving one.
                            We realized that the traditional rental market lacked the personal touch and premium quality that discerning drivers deserve.
                        </p>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                            Today, we are proud to offer a curated fleet of the world's finest vehicles, backed by a team that is dedicated to ensuring
                            your journey is seamless from start to finish.
                        </p>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>50+</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Premium Cars</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>24/7</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Support</p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>100%</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Satisfaction</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100%', height: '100%', border: '2px solid var(--primary)', borderRadius: 'var(--radius-lg)', zIndex: 0 }}></div>
                            <img
                                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                alt="Office Team"
                                style={{ width: '100%', borderRadius: 'var(--radius-lg)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-xl)' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '8rem' }}>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Why Choose NOVA?</h2>
                    <div className="grid-3-cols">
                        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', border: 'none', background: '#F8FAFC' }}>
                            <FaTrophy size={40} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
                            <h3>Unmatched Quality</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Every vehicle in our fleet is meticulously maintained and inspected to ensure optimal performance and safety.</p>
                        </div>
                        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', border: 'none', background: '#F8FAFC' }}>
                            <FaUsers size={40} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
                            <h3>Customer First</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>We build relationships, not just bookings. Our team goes above and beyond to meet your specific needs.</p>
                        </div>
                        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', border: 'none', background: '#F8FAFC' }}>
                            <FaHandshake size={40} style={{ color: 'var(--success)', marginBottom: '1.5rem' }} />
                            <h3>Transparent Pricing</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No hidden fees or surprises. What you see is what you pay, with flexible terms to suit your schedule.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
