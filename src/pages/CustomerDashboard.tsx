import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaCar, FaUser, FaSignOutAlt, FaChartLine, FaHistory, FaHome } from 'react-icons/fa';

const CustomerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'overview' | 'bookings'>('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/bookings/me')
            .then(res => {
                setBookings(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const activeBookingsCount = bookings.filter(b => b.status === 'APPROVED' || b.status === 'PENDING').length;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#020617', color: '#F8FAFC' }}>

            {/* SIDEBAR */}
            <aside style={{ width: '280px', background: '#0F172A', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                        NOVA <span style={{ color: '#2563EB' }}>Client</span>
                    </h2>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <SidebarItem
                        icon={<FaHome />}
                        label="Home"
                        active={false}
                        onClick={() => navigate('/')}
                    />
                    <SidebarItem
                        icon={<FaChartLine />}
                        label="Overview"
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                    />
                    <SidebarItem
                        icon={<FaHistory />}
                        label="My Bookings"
                        active={activeTab === 'bookings'}
                        onClick={() => setActiveTab('bookings')}
                    />
                </nav>

                <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '0 1rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                            <FaUser />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.full_name || 'User'}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: '#EF4444', cursor: 'pointer', transition: '0.2s', width: '100%', borderRadius: '8px' }}
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>

                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {activeTab === 'overview' ? 'Overview' : 'My Bookings'}
                    </h1>
                    <p style={{ color: '#64748B' }}>Welcome back to your personal dashboard.</p>
                </header>

                {activeTab === 'overview' && (
                    <div className="animate-fade-in">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <StatCard label="Total Bookings" value={bookings.length} />
                            <StatCard label="Active Rentals" value={activeBookingsCount} highlight />
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>Recent Activity</h3>
                                <button onClick={() => setActiveTab('bookings')} style={{ color: '#2563EB', fontSize: '0.9rem' }}>View All</button>
                            </div>
                            {bookings.length > 0 ? (
                                <BookingsList bookings={bookings.slice(0, 3)} />
                            ) : (
                                <p style={{ color: '#64748B' }}>No recent activity.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="animate-fade-in">
                        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {loading ? (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Loading...</div>
                            ) : bookings.length > 0 ? (
                                <BookingsList bookings={bookings} />
                            ) : (
                                <div style={{ textAlign: 'center', padding: '4rem' }}>
                                    <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>You haven't made any bookings yet.</p>
                                    <button onClick={() => navigate('/cars')} className="btn btn-primary">Browse Fleet</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem 1.5rem', borderRadius: '12px',
            background: active ? '#2563EB' : 'transparent',
            color: active ? 'white' : '#94A3B8',
            transition: 'all 0.2s', width: '100%', textAlign: 'left',
            fontWeight: active ? 600 : 400
        }}
    >
        <span style={{ fontSize: '1.1rem' }}>{icon}</span> {label}
    </button>
);

const StatCard = ({ label, value, highlight }: any) => (
    <div style={{ padding: '1.5rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{label}</p>
        <h3 style={{ fontSize: '2rem', lineHeight: 1, color: highlight ? '#2563EB' : 'white' }}>{value}</h3>
    </div>
);

const BookingsList = ({ bookings }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {bookings.map((booking: any) => (
            <div key={booking.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {booking.car && booking.car.primary_image_url ? (
                        <img
                            src={booking.car.primary_image_url}
                            alt={`${booking.car.make} ${booking.car.model}`}
                            style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                    ) : (
                        <div style={{ width: '80px', height: '60px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                            <FaCar size={24} />
                        </div>
                    )}

                    <div>
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                            {booking.car ? `${booking.car.make} ${booking.car.model} (${booking.car.year})` : `Booking #${booking.id}`}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaCalendarAlt size={12} />
                            {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <StatusBadge status={booking.status} />
                    <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.5rem' }}>
                        Total: {booking.car ? `Ksh ${(booking.car.price_per_day * ((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 3600 * 24))).toLocaleString()}` : '-'}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const StatusBadge = ({ status }: any) => {
    let color = '#94A3B8';
    let bg = 'rgba(148, 163, 184, 0.1)';

    if (status === 'APPROVED') { color = '#10B981'; bg = 'rgba(16, 185, 129, 0.15)'; }
    if (status === 'REJECTED') { color = '#EF4444'; bg = 'rgba(239, 68, 68, 0.15)'; }
    if (status === 'PENDING') { color = '#F59E0B'; bg = 'rgba(245, 158, 11, 0.15)'; }

    return (
        <span style={{
            padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600,
            background: bg, color: color, letterSpacing: '0.5px'
        }}>
            {status}
        </span>
    );
};

export default CustomerDashboard;
