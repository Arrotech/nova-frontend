import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-secondary py-20 text-center text-white pb-32">
                <h1 className="hero-title text-4xl md:text-6xl mb-4 text-white">Get in Touch</h1>
                <p className="text-slate-400 text-lg px-4">We'd love to hear from you. Our team is here to help.</p>
            </div>

            <div className="container relative z-10 -mt-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">

                    {/* Contact Info */}
                    <div className="bg-primary p-10 lg:p-12 text-white lg:col-span-2 flex flex-col">
                        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                        <p className="text-blue-100 mb-10 text-lg leading-relaxed">Fill up the form and our team will get back to you within 24 hours.</p>

                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <FaPhone />
                                </div>
                                <span className="text-lg">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <FaEnvelope />
                                </div>
                                <span className="text-lg">support@novarental.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <FaMapMarkerAlt />
                                </div>
                                <span className="text-lg">123 Auto Avenue, Innovation City</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-12">
                            <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" className="btn bg-white text-primary w-full justify-center hover:bg-white/90 shadow-lg border-none">
                                <FaWhatsapp size={20} /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-10 lg:p-12 lg:col-span-3 bg-white">
                        <h2 className="text-2xl font-bold text-slate-800 mb-8">Send us a message</h2>
                        <form className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-600 font-medium mb-2">First Name</label>
                                    <input placeholder="John" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-slate-600 font-medium mb-2">Last Name</label>
                                    <input placeholder="Doe" className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-600 font-medium mb-2">Email</label>
                                <input type="email" placeholder="john@example.com" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-slate-600 font-medium mb-2">Message</label>
                                <textarea rows={4} placeholder="Write your message here..." className="input-field resize-none" />
                            </div>
                            <button type="submit" className="btn btn-primary self-start mt-2">
                                Send Message <FaPaperPlane className="ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
