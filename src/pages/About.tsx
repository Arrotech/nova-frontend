import { FaUsers, FaTrophy, FaHandshake } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-secondary py-24 text-center text-white">
                <h1 className="hero-title text-4xl md:text-6xl mb-6">Our Story</h1>
                <p className="text-slate-400 text-xl max-w-2xl mx-auto px-4">
                    Redefining luxury car rentals with a commitment to excellence and customer satisfaction.
                </p>
            </div>

            <div className="container py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary font-semibold uppercase tracking-widest text-sm">Who We Are</span>
                        <h2 className="section-title mt-2 mb-6">Driven by Passion, <br /> Defined by Quality.</h2>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            Founded in 2024, NOVA Rental was born from a simple idea: that renting a car should be as enjoyable as driving one.
                            We realized that the traditional rental market lacked the personal touch and premium quality that discerning drivers deserve.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            Today, we are proud to offer a curated fleet of the world's finest vehicles, backed by a team that is dedicated to ensuring
                            your journey is seamless from start to finish.
                        </p>
                        <div className="flex flex-wrap gap-12">
                            <div>
                                <h3 className="text-4xl font-bold text-primary mb-1">50+</h3>
                                <p className="text-slate-500 font-medium">Premium Cars</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-primary mb-1">24/7</h3>
                                <p className="text-slate-500 font-medium">Support</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-primary mb-1">100%</h3>
                                <p className="text-slate-500 font-medium">Satisfaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary rounded-3xl z-0 hidden md:block"></div>
                        <img
                            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            alt="Office Team"
                            className="w-full rounded-3xl relative z-10 shadow-2xl"
                        />
                    </div>
                </div>

                <div className="mt-32">
                    <h2 className="section-title text-center mb-16">Why Choose NOVA?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-10 text-center bg-white border border-slate-100 hover:border-primary/20">
                            <FaTrophy size={40} className="text-amber-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Unmatched Quality</h3>
                            <p className="text-slate-500 leading-relaxed">Every vehicle in our fleet is meticulously maintained and inspected to ensure optimal performance and safety.</p>
                        </div>
                        <div className="card p-10 text-center bg-white border border-slate-100 hover:border-primary/20">
                            <FaUsers size={40} className="text-primary mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Customer First</h3>
                            <p className="text-slate-500 leading-relaxed">We build relationships, not just bookings. Our team goes above and beyond to meet your specific needs.</p>
                        </div>
                        <div className="card p-10 text-center bg-white border border-slate-100 hover:border-primary/20">
                            <FaHandshake size={40} className="text-green-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Transparent Pricing</h3>
                            <p className="text-slate-500 leading-relaxed">No hidden fees or surprises. What you see is what you pay, with flexible terms to suit your schedule.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
