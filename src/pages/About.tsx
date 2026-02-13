import { FaUsers, FaTrophy, FaHandshake } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen">
            <div className="bg-surface py-16 sm:py-24 text-center px-4 border-b border-white/5">
                <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl">Our Story</h1>
                <p className="text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                    Redefining luxury car rentals with a commitment to excellence and customer satisfaction.
                </p>
            </div>

            <div className="container py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
                    <div>
                        <span className="text-primary font-semibold uppercase tracking-widest text-xs sm:text-sm">Who We Are</span>
                        <h2 className="section-title mt-2 mb-4 sm:mb-6">Driven by Passion, <br className="hidden sm:block" />Defined by Quality.</h2>
                        <p className="text-slate-400 leading-relaxed mb-4 sm:mb-6 font-medium text-sm sm:text-base">
                            Founded in 2024, NOVA Rental was born from a simple idea: that renting a car should be as enjoyable as driving one.
                        </p>
                        <p className="text-slate-500 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                            Today, we are proud to offer a curated fleet of the world's finest vehicles, backed by a team that is dedicated to ensuring your journey is seamless from start to finish.
                        </p>
                        <div className="flex flex-wrap gap-6 sm:gap-12 justify-center sm:justify-start">
                            {[{ num: '50+', label: 'Premium Cars' }, { num: '24/7', label: 'Support' }, { num: '100%', label: 'Satisfaction' }].map(stat => (
                                <div key={stat.label} className="text-center sm:text-left">
                                    <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.num}</h3>
                                    <p className="text-slate-500 font-medium text-sm sm:text-base">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/30 rounded-3xl z-0 hidden md:block"></div>
                        <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Office Team" className="w-full rounded-2xl sm:rounded-3xl relative z-10 shadow-2xl brightness-90" />
                    </div>
                </div>

                <div className="mt-20 sm:mt-32">
                    <h2 className="section-title text-center mb-10 sm:mb-16">Why Choose NOVA?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            { icon: <FaTrophy size={32} className="text-amber-400" />, title: 'Unmatched Quality', desc: 'Every vehicle in our fleet is meticulously maintained and inspected to ensure optimal performance and safety.' },
                            { icon: <FaUsers size={32} className="text-primary-light" />, title: 'Customer First', desc: 'We build relationships, not just bookings. Our team goes above and beyond to meet your specific needs.' },
                            { icon: <FaHandshake size={32} className="text-emerald-400" />, title: 'Transparent Pricing', desc: 'No hidden fees or surprises. What you see is what you pay, with flexible terms to suit your schedule.' },
                        ].map(card => (
                            <div key={card.title} className="card p-6 sm:p-10 text-center">
                                <div className="mx-auto mb-4 sm:mb-6">{card.icon}</div>
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{card.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
