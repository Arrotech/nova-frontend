import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="min-h-screen pb-16 sm:pb-24">
            <div className="bg-surface py-16 sm:py-20 text-center pb-24 sm:pb-32 px-4 border-b border-white/5">
                <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl">Get in Touch</h1>
                <p className="text-slate-500 text-sm sm:text-lg">We'd love to hear from you. Our team is here to help.</p>
            </div>

            <div className="container relative z-10 -mt-16 sm:-mt-20">
                <div className="rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-white/5">
                    {/* Contact Info */}
                    <div className="bg-primary p-6 sm:p-10 lg:p-12 text-white lg:col-span-2 flex flex-col">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Contact Information</h2>
                        <p className="text-blue-100 mb-6 sm:mb-10 text-base sm:text-lg leading-relaxed">Fill up the form and our team will get back to you within 24 hours.</p>
                        <div className="flex flex-col gap-5 sm:gap-8">
                            {[
                                { icon: <FaPhone size={14} />, text: '+1 (555) 123-4567' },
                                { icon: <FaEnvelope size={14} />, text: 'support@novarental.com' },
                                { icon: <FaMapMarkerAlt size={14} />, text: '123 Auto Avenue, Innovation City' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                                    <span className="text-base sm:text-lg break-all">{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 sm:mt-auto pt-8 sm:pt-12">
                            <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" className="btn bg-white text-primary w-full justify-center hover:bg-white/90 shadow-lg border-none text-sm sm:text-base">
                                <FaWhatsapp size={20} /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-6 sm:p-10 lg:p-12 lg:col-span-3 bg-surface-card">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Send us a message</h2>
                        <form className="flex flex-col gap-4 sm:gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-slate-400 font-medium mb-1.5 sm:mb-2 text-sm">First Name</label>
                                    <input placeholder="John" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-slate-400 font-medium mb-1.5 sm:mb-2 text-sm">Last Name</label>
                                    <input placeholder="Doe" className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 font-medium mb-1.5 sm:mb-2 text-sm">Email</label>
                                <input type="email" placeholder="john@example.com" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-slate-400 font-medium mb-1.5 sm:mb-2 text-sm">Message</label>
                                <textarea rows={4} placeholder="Write your message here..." className="input-field resize-none" />
                            </div>
                            <button type="submit" className="btn btn-primary self-start w-full sm:w-auto justify-center mt-1 sm:mt-2">
                                Send Message <FaPaperPlane className="ml-1 sm:ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
