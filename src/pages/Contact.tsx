import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const inputStyle = {
        background: 'white',
        border: '1px solid #E2E8F0',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        width: '100%'
    };

    return (
        <div>
            <div style={{ background: 'var(--secondary)', padding: '5rem 0', color: 'white', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Get in Touch</h1>
                <p style={{ color: '#94A3B8', fontSize: '1.2rem', padding: '0 1rem' }}>We'd love to hear from you. Our team is here to help.</p>
            </div>

            <div className="container" style={{ marginTop: '-3rem', zIndex: 10, position: 'relative', paddingBottom: '6rem' }}>
                <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', padding: '0', overflow: 'hidden' }}>

                    {/* Contact Info */}
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '3rem' }}>
                        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Contact Information</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '3rem' }}>Fill up the form and our team will get back to you within 24 hours.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <FaPhone size={20} />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <FaEnvelope size={20} />
                                <span>support@novarental.com</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <FaMapMarkerAlt size={20} />
                                <span>123 Auto Avenue, Innovation City</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '4rem' }}>
                            <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" className="btn" style={{ background: 'white', color: 'var(--primary)', width: '100%' }}>
                                <FaWhatsapp size={20} /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{ padding: '3rem', background: 'white' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Send us a message</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>First Name</label>
                                    <input placeholder="John" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Last Name</label>
                                    <input placeholder="Doe" style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                                <input type="email" placeholder="john@example.com" style={inputStyle} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                                <textarea rows={4} placeholder="Write your message here..." style={inputStyle} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'start' }}>
                                Send Message <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
