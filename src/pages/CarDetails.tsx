import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaGasPump, FaCogs, FaChair, FaCheckCircle, FaCalendarAlt, FaStar, FaSignInAlt } from 'react-icons/fa';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Booking Form State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [name, setName] = useState(user?.full_name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('');
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        api.get(`/cars/${id}`)
            .then(res => {
                setCar(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (user) {
            setName(user.full_name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/bookings', {
                car_id: car.id,
                start_date: startDate,
                end_date: endDate,
                customer_name: name,
                customer_email: email,
                customer_phone: phone
            });
            setBookingStatus('success');
        } catch (err) {
            setBookingStatus('error');
        }
    };

    if (loading || !car) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading vehicle details...</div>;

    return (
        <div style={{ background: 'var(--bg-body)', padding: '4rem 0' }}>
            <div className="container">
                {/* Breadcrumb */}
                <div style={{ marginBottom: '2rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> &gt;
                    <Link to="/cars" style={{ color: 'var(--primary)', margin: '0 0.5rem' }}>Fleet</Link> &gt;
                    <span style={{ margin: '0 0.5rem' }}>{car.make} {car.model}</span>
                </div>

                <div className="car-details-grid" style={{ display: 'grid', gap: '3rem' }}>

                    {/* Left Column: Images & Details */}
                    <div>
                        {/* Main Image */}
                        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
                            {car.images && car.images.length > 0 ? (
                                <img src={car.images[0].image_url} alt={car.model} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            ) : (
                                <div style={{ height: '400px', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                            )}
                        </div>

                        {/* Title & Price */}
                        <div className="car-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{car.make} {car.model} <span style={{ fontSize: '1.5rem', color: 'var(--text-light)', fontWeight: 400 }}>{car.year}</span></h1>
                                <div style={{ display: 'flex', gap: '0.5rem', color: '#F59E0B' }}>
                                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>(12 reviews)</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>Ksh {car.price_per_day.toLocaleString()}</div>
                                <div style={{ color: 'var(--text-muted)' }}>per day</div>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="specs-grid" style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'white' }}>
                                <FaGasPump size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                                <div style={{ fontWeight: 600 }}>Fuel Type</div>
                                <div style={{ color: 'var(--text-muted)' }}>{car.specs?.Fuel || 'Petrol'}</div>
                            </div>
                            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'white' }}>
                                <FaCogs size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                                <div style={{ fontWeight: 600 }}>Transmission</div>
                                <div style={{ color: 'var(--text-muted)' }}>{car.specs?.Transmission || 'Auto'}</div>
                            </div>
                            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: 'white' }}>
                                <FaChair size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                                <div style={{ fontWeight: 600 }}>Seating</div>
                                <div style={{ color: 'var(--text-muted)' }}>{car.specs?.Seating || '4'} Persons</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Vehicle Overview</h3>
                            <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                {car.description || 'Experience the ultimate driving comfort with this premium vehicle. Perfect for business trips or weekend getaways, offering a smooth ride and top-tier safety features.'}
                            </p>
                        </div>

                        {/* Features List */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Key Features</h3>
                            <div className="features-grid" style={{ display: 'grid', gap: '1rem' }}>
                                {car.features && car.features.length > 0 ? (
                                    car.features.map((feat: string, idx: number) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                            <FaCheckCircle style={{ color: 'var(--success)' }} /> {feat}
                                        </div>
                                    ))
                                ) : (
                                    ['Bluetooth', 'Multimedia System', 'Leather Seats', 'Navigation System', 'Climate Control', 'Cruise Control'].map(feat => (
                                        <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', opacity: 0.5 }}>
                                            <FaCheckCircle style={{ color: 'var(--text-light)' }} /> {feat} (Standard)
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'sticky', top: '100px' }}>
                            <div className="card" style={{ padding: '2rem', borderTop: '4px solid var(--primary)' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Book This Car</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Complete the form to request a booking.</p>

                                {bookingStatus === 'success' ? (
                                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                        <div style={{ width: '60px', height: '60px', background: '#DCFCE7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.rem', fontSize: '1.5rem' }}>
                                            <FaCheckCircle />
                                        </div>
                                        <h4 style={{ margin: '1rem 0 0.5rem' }}>Request Sent!</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>We will contact you shortly to confirm.</p>
                                        <button className="btn btn-primary" onClick={() => setBookingStatus('idle')} style={{ marginTop: '1.5rem' }}>Book Another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Pick-up / Drop-off Dates</label>
                                            <div className="date-inputs-grid" style={{ display: 'grid', gap: '0.5rem' }}>
                                                <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} />
                                                <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
                                            <input type="text" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
                                            <input type="email" placeholder="john@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Phone Number</label>
                                            <input type="tel" placeholder="+1 (555) 000-0000" required value={phone} onChange={e => setPhone(e.target.value)} />
                                        </div>

                                        {bookingStatus === 'error' && <div style={{ color: 'var(--error)', fontSize: '0.9rem' }}>Something went wrong. Please try again.</div>}

                                        {!isAuthenticated ? (
                                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                    onClick={() => navigate('/login', { state: { from: location } })}
                                                >
                                                    <FaSignInAlt /> Log in to Book
                                                </button>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                                    You must be logged in to make a reservation.
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                                                    Request Booking <FaCalendarAlt />
                                                </button>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '1rem' }}>
                                                    You won't be charged yet.
                                                </p>
                                            </>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>

                        <style>{`
                            .car-details-grid {
                                grid-template-columns: 1fr 350px;
                            }
                            .specs-grid {
                                grid-template-columns: repeat(3, 1fr);
                            }
                            .features-grid {
                                grid-template-columns: repeat(2, 1fr);
                            }
                            
                            .date-inputs-grid {
                                grid-template-columns: 1fr;
                            }

                            @media (max-width: 1024px) {
                                .car-details-grid {
                                    grid-template-columns: 1fr;
                                }
                                .car-header {
                                    flex-direction: column;
                                    align-items: flex-start !important;
                                    gap: 1rem;
                                }
                                .car-header > div:last-child {
                                    text-align: left !important;
                                }
                                .date-inputs-grid {
                                    grid-template-columns: 1fr 1fr; /* On larger tablet/mobile screens where width is 100%, we can go back to side-by-side if we want, or keep stacked. Let's keep stacked for safety given the complaint. */
                                    grid-template-columns: 1fr; 
                                }
                            }

                            @media (max-width: 768px) {
                                .specs-grid {
                                    grid-template-columns: repeat(2, 1fr);
                                }
                                .features-grid {
                                    grid-template-columns: 1fr;
                                }
                            }

                            @media (max-width: 480px) {
                                .specs-grid {
                                    grid-template-columns: 1fr;
                                }
                            }
                        `}</style>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
