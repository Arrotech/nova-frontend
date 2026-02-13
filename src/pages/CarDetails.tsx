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

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [name, setName] = useState(user?.full_name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('');
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        api.get(`/cars/${id}`).then(res => { setCar(res.data); setLoading(false); }).catch(err => { console.error(err); setLoading(false); });
    }, [id]);

    useEffect(() => { if (user) { setName(user.full_name || ''); setEmail(user.email || ''); } }, [user]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/bookings', { car_id: car.id, start_date: startDate, end_date: endDate, customer_name: name, customer_email: email, customer_phone: phone });
            setBookingStatus('success');
        } catch { setBookingStatus('error'); }
    };

    if (loading || !car) return <div className="py-16 sm:py-24 text-center text-slate-500">Loading vehicle details...</div>;

    return (
        <div className="py-8 sm:py-16">
            <div className="container">
                {/* Breadcrumb */}
                <div className="mb-4 sm:mb-8 text-slate-500 text-xs sm:text-sm">
                    <Link to="/" className="text-primary hover:underline">Home</Link> &gt;
                    <Link to="/cars" className="text-primary hover:underline mx-1 sm:mx-2">Fleet</Link> &gt;
                    <span className="mx-1 sm:mx-2 text-slate-400">{car.make} {car.model}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8 lg:gap-12">
                    {/* Left Column */}
                    <div>
                        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg mb-6 sm:mb-8 border border-white/5">
                            {car.images?.length > 0 ? (
                                <img src={car.images[0].image_url} alt={car.model} className="w-full h-auto block" />
                            ) : (
                                <div className="h-48 sm:h-72 lg:h-[400px] bg-surface-card flex items-center justify-center text-slate-600">No Image</div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 sm:mb-8 gap-3 sm:gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold leading-tight mb-1 sm:mb-2">
                                    {car.make} {car.model} <span className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-normal">{car.year}</span>
                                </h1>
                                <div className="flex gap-0.5 text-amber-400">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                    <span className="text-slate-600 text-xs sm:text-sm ml-2">(12 reviews)</span>
                                </div>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">Ksh {car.price_per_day.toLocaleString()}</div>
                                <div className="text-slate-500 text-sm">per day</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
                            {[
                                { icon: <FaGasPump />, label: 'Fuel Type', value: car.specs?.Fuel || 'Petrol' },
                                { icon: <FaCogs />, label: 'Transmission', value: car.specs?.Transmission || 'Auto' },
                                { icon: <FaChair />, label: 'Seating', value: `${car.specs?.Seating || '4'} Persons` },
                            ].map(spec => (
                                <div key={spec.label} className="card p-4 sm:p-6 text-center">
                                    <div className="text-primary text-xl mx-auto mb-2 sm:mb-3">{spec.icon}</div>
                                    <div className="font-semibold text-sm sm:text-base">{spec.label}</div>
                                    <div className="text-slate-500 text-sm">{spec.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mb-8 sm:mb-12">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Vehicle Overview</h3>
                            <p className="leading-relaxed sm:leading-loose text-slate-400 text-sm sm:text-base lg:text-lg">
                                {car.description || 'Experience the ultimate driving comfort with this premium vehicle. Perfect for business trips or weekend getaways.'}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">Key Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {(car.features?.length > 0 ? car.features : ['Bluetooth', 'Multimedia System', 'Leather Seats', 'Navigation System', 'Climate Control', 'Cruise Control']).map((feat: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base">
                                        <FaCheckCircle className="text-emerald-400 flex-shrink-0" /> {feat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking */}
                    <div className="relative">
                        <div className="lg:sticky lg:top-24">
                            <div className="card p-5 sm:p-8 border-t-4 border-t-primary">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">Book This Car</h3>
                                <p className="text-slate-500 text-sm sm:text-base mb-4 sm:mb-6">Complete the form to request a booking.</p>

                                {bookingStatus === 'success' ? (
                                    <div className="text-center py-6 sm:py-8">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl"><FaCheckCircle /></div>
                                        <h4 className="font-bold text-lg sm:text-xl mb-2">Request Sent!</h4>
                                        <p className="text-slate-500 text-sm sm:text-base">We will contact you shortly to confirm.</p>
                                        <button className="btn btn-primary mt-4 sm:mt-6 w-full justify-center" onClick={() => setBookingStatus('idle')}>Book Another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleBooking} className="flex flex-col gap-4 sm:gap-5">
                                        <div>
                                            <label className="block mb-1.5 font-medium text-xs sm:text-sm text-slate-400">Pick-up / Drop-off</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
                                                <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="input-field text-sm" />
                                                <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="input-field text-sm" />
                                            </div>
                                        </div>
                                        <div><label className="block mb-1.5 font-medium text-xs sm:text-sm text-slate-400">Full Name</label><input type="text" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} className="input-field text-sm" /></div>
                                        <div><label className="block mb-1.5 font-medium text-xs sm:text-sm text-slate-400">Email</label><input type="email" placeholder="john@example.com" required value={email} onChange={e => setEmail(e.target.value)} className="input-field text-sm" /></div>
                                        <div><label className="block mb-1.5 font-medium text-xs sm:text-sm text-slate-400">Phone</label><input type="tel" placeholder="+1 (555) 000-0000" required value={phone} onChange={e => setPhone(e.target.value)} className="input-field text-sm" /></div>

                                        {bookingStatus === 'error' && <div className="text-rose-400 text-xs sm:text-sm">Something went wrong. Please try again.</div>}

                                        {!isAuthenticated ? (
                                            <div className="text-center mt-2">
                                                <button type="button" className="btn btn-primary w-full justify-center" onClick={() => navigate('/login', { state: { from: location } })}>
                                                    <FaSignInAlt /> Log in to Book
                                                </button>
                                                <p className="text-xs text-slate-600 mt-2">You must be logged in to make a reservation.</p>
                                            </div>
                                        ) : (
                                            <>
                                                <button type="submit" className="btn btn-primary w-full justify-center mt-1">Request Booking <FaCalendarAlt /></button>
                                                <p className="text-xs text-slate-600 text-center mt-1">You won't be charged yet.</p>
                                            </>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
