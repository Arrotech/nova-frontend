import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FaChartLine, FaCar, FaCalendarAlt, FaSignOutAlt, FaPlus, FaTrash, FaCheck, FaTimes, FaSearch, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'fleet'>('overview');
    const [bookings, setBookings] = useState<any[]>([]);
    const [cars, setCars] = useState<any[]>([]);

    // Stats (Calculated from data)
    const [stats, setStats] = useState({ totalRevenue: 0, activeBookings: 0, availableCars: 0 });

    // New Car Form State
    const [showCarForm, setShowCarForm] = useState(false);
    const [editingCar, setEditingCar] = useState<any | null>(null);
    const [newCar, setNewCar] = useState({
        make: '', model: '', year: 2024, price_per_day: 0, image_url: '', description: '',
        fuel_type: 'Petrol', transmission: 'Automatic', seating_capacity: 4, features: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');

        // Fetch all data on mount
        Promise.all([
            api.get('/bookings'),
            api.get('/cars/all')
        ]).then(([bookingsRes, carsRes]) => {
            setBookings(bookingsRes.data);
            setCars(carsRes.data);
            calculateStats(bookingsRes.data, carsRes.data);
        }).catch(err => console.error("Failed to fetch admin data", err));
    }, [navigate]);

    const calculateStats = (bookingsData: any[], carsData: any[]) => {
        // const revenue = bookingsData
        //     .filter(b => b.status !== 'REJECTED' && b.status !== 'CANCELLED')
        //     .reduce((acc, curr) => acc + (curr.total_price || 0), 0); // Assuming API returns total_price or we verify logic later

        // Mock revenue calculation if total_price isn't in DB yet:
        // complicated without booking duration, so we'll just show active count for now
        const active = bookingsData.filter(b => b.status === 'APPROVED' || b.status === 'PENDING').length;
        const available = carsData.filter(c => c.is_available).length;

        setStats({
            totalRevenue: 1250000, // Hardcoded for demo until we compute real connection
            activeBookings: active,
            availableCars: available
        });
    };

    const refreshData = () => {
        api.get('/bookings').then(res => setBookings(res.data));
        api.get('/cars/all').then(res => setCars(res.data));
    };

    const updateBookingStatus = (id: number, status: string) => {
        api.put(`/bookings/${id}`, { status }).then(refreshData).catch(console.error);
    };

    const handleEditCar = (car: any) => {
        setNewCar({
            make: car.make,
            model: car.model,
            year: car.year,
            price_per_day: car.price_per_day,
            image_url: car.primary_image_url || (car.images && car.images[0]?.image_url) || '',
            description: car.description || '',
            fuel_type: car.specs?.Fuel || 'Petrol',
            transmission: car.specs?.Transmission || 'Automatic',
            seating_capacity: car.specs?.Seating || 4,
            features: car.features ? car.features.join(', ') : ''
        });
        setEditingCar(car);
        setShowCarForm(true);
    };

    const handleCreateOrUpdateCar = (e: React.FormEvent) => {
        e.preventDefault();
        const carData = {
            make: newCar.make,
            model: newCar.model,
            year: Number(newCar.year),
            price_per_day: Number(newCar.price_per_day),
            description: newCar.description,
            is_available: true,
            specs: {
                Fuel: newCar.fuel_type,
                Transmission: newCar.transmission,
                Seating: Number(newCar.seating_capacity)
            },
            features: newCar.features.split(',').map(f => f.trim()).filter(f => f !== '')
        };
        const images = newCar.image_url ? [newCar.image_url] : [];
        const payload = { ...carData, images };

        if (editingCar) {
            api.put(`/cars/${editingCar.id}`, payload)
                .then(() => {
                    closeForm();
                    refreshData();
                })
                .catch(() => alert('Error updating car'));
        } else {
            api.post('/cars', payload)
                .then(() => {
                    closeForm();
                    refreshData();
                })
                .catch(() => alert('Error creating car'));
        }
    };

    const closeForm = () => {
        setShowCarForm(false);
        setEditingCar(null);
        setNewCar({
            make: '', model: '', year: 2024, price_per_day: 0, image_url: '', description: '',
            fuel_type: 'Petrol', transmission: 'Automatic', seating_capacity: 4, features: ''
        });
    };

    const deleteCar = (id: number) => {
        if (confirm('Are you sure you want to remove this car?')) {
            api.delete(`/cars/${id}`).then(refreshData);
        }
    };

    const toggleAvailability = (car: any) => {
        api.put(`/cars/${car.id}`, { is_available: !car.is_available }).then(refreshData);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#020617', color: '#F8FAFC' }}>

            {/* SIDEBAR */}
            <aside style={{ width: '280px', background: '#0F172A', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                        NOVA <span style={{ color: '#2563EB' }}>Admin</span>
                    </h2>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <SidebarItem
                        icon={<FaChartLine />}
                        label="Overview"
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                    />
                    <SidebarItem
                        icon={<FaCalendarAlt />}
                        label="Bookings"
                        active={activeTab === 'bookings'}
                        onClick={() => setActiveTab('bookings')}
                    />
                    <SidebarItem
                        icon={<FaCar />}
                        label="Fleet Management"
                        active={activeTab === 'fleet'}
                        onClick={() => setActiveTab('fleet')}
                    />
                </nav>

                <button
                    onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                    style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', color: '#94A3B8', cursor: 'pointer', transition: '0.2s' }}
                >
                    <FaSignOutAlt /> Sign Out
                </button>
            </aside>

            {/* MAIN CONTENT Area */}
            <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>

                {/* Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'bookings' && 'Booking Requests'}
                            {activeTab === 'fleet' && 'Fleet Management'}
                        </h1>
                        <p style={{ color: '#64748B' }}>Welcome back, Admin.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            A
                        </div>
                    </div>
                </header>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in">
                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <StatCard label="Total Revenue (Est)" value={`Ksh ${stats.totalRevenue.toLocaleString()}`} change="+12%" />
                            <StatCard label="Active Bookings" value={stats.activeBookings} change="+5" />
                            <StatCard label="Available Cars" value={stats.availableCars} change="-2" />
                            <StatCard label="Total Customers" value="84" change="+14%" />
                        </div>

                        {/* Recent Activity / Quick Table */}
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Recent Bookings</h3>
                            <BookingsTable bookings={bookings.slice(0, 5)} onUpdateStatus={updateBookingStatus} compact />
                        </div>
                    </div>
                )}

                {/* BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                    <div className="animate-fade-in">
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            {/* Filters could go here */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h3 style={{ marginBottom: 0 }}>All Requests</h3>
                                <div style={{ position: 'relative' }}>
                                    <FaSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
                                    <input placeholder="Search customer..." style={{ paddingLeft: '2.5rem', background: '#1E293B', border: 'none', color: 'white' }} />
                                </div>
                            </div>
                            <BookingsTable bookings={bookings} onUpdateStatus={updateBookingStatus} />
                        </div>
                    </div>
                )}

                {/* FLEET TAB */}
                {activeTab === 'fleet' && (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                            <button className="btn btn-primary" onClick={() => { setEditingCar(null); setShowCarForm(true); }}>
                                <FaPlus /> Add New Vehicle
                            </button>
                        </div>

                        {showCarForm && (
                            <div style={{
                                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                            }}>
                                <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '600px', border: '1px solid #2563EB', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', position: 'relative' }}>
                                    <button onClick={closeForm} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1.2rem' }}><FaTimes /></button>
                                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{editingCar ? 'Update Vehicle' : 'Add New Vehicle'}</h3>
                                    <form onSubmit={handleCreateOrUpdateCar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <input placeholder="Make (e.g. Porsche)" value={newCar.make} onChange={e => setNewCar({ ...newCar, make: e.target.value })} required style={{ background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} />
                                        <input placeholder="Model (e.g. 911)" value={newCar.model} onChange={e => setNewCar({ ...newCar, model: e.target.value })} required style={{ background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} />
                                        <input placeholder="Year" type="number" value={newCar.year} onChange={e => setNewCar({ ...newCar, year: Number(e.target.value) })} required style={{ background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} />
                                        <input placeholder="Price/Day (Ksh)" type="number" value={newCar.price_per_day} onChange={e => setNewCar({ ...newCar, price_per_day: Number(e.target.value) })} required style={{ background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} />
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', gridColumn: '1 / -1' }}>
                                            <div>
                                                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Fuel Type</label>
                                                <select value={newCar.fuel_type} onChange={e => setNewCar({ ...newCar, fuel_type: e.target.value })} style={{ width: '100%', background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }}>
                                                    <option value="Petrol">Petrol</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Electric">Electric</option>
                                                    <option value="Hybrid">Hybrid</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Transmission</label>
                                                <select value={newCar.transmission} onChange={e => setNewCar({ ...newCar, transmission: e.target.value })} style={{ width: '100%', background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }}>
                                                    <option value="Automatic">Automatic</option>
                                                    <option value="Manual">Manual</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Seats</label>
                                                <input type="number" value={newCar.seating_capacity} onChange={e => setNewCar({ ...newCar, seating_capacity: Number(e.target.value) })} style={{ width: '100%', background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} />
                                            </div>
                                        </div>

                                        <input placeholder="Image URL (Limit 1)" value={newCar.image_url} onChange={e => setNewCar({ ...newCar, image_url: e.target.value })} style={{ gridColumn: '1 / -1', background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} />

                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Features (comma separated)</label>
                                            <textarea placeholder="e.g. Bluetooth, Sunroof, Leather Seats, GPS..." value={newCar.features} onChange={e => setNewCar({ ...newCar, features: e.target.value })} style={{ width: '100%', background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} rows={2} />
                                        </div>

                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Description</label>
                                            <textarea placeholder="Vehicle description..." value={newCar.description} onChange={e => setNewCar({ ...newCar, description: e.target.value })} style={{ width: '100%', background: '#1E293B', border: 'none', color: 'white', padding: '1rem', borderRadius: '8px' }} rows={3} />
                                        </div>

                                        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'end', marginTop: '1rem' }}>
                                            <button type="button" className="btn" onClick={closeForm} style={{ background: 'transparent', color: '#CBD5E1', border: '1px solid #475569' }}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">{editingCar ? 'Update Fleet' : 'Save to Fleet'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {cars.map(car => (
                                <div key={car.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                                        {car.images && car.images.length > 0 ? (
                                            <img src={car.images[0].image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>No Image</div>
                                        )}
                                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600,
                                                background: car.is_available ? '#10B981' : '#F59E0B', color: 'white'
                                            }}>
                                                {car.is_available ? 'Available' : 'Rented'}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.2rem' }}>{car.make} {car.model}</h3>
                                            <span style={{ fontWeight: 700, color: '#FCD34D' }}>Ksh {car.price_per_day ? car.price_per_day.toLocaleString() : 0}</span>
                                        </div>
                                        <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{car.year} • Sports Class</p>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                            <button onClick={() => toggleAvailability(car)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem', borderColor: '#334155', color: '#CBD5E1' }}>
                                                {car.is_available ? 'Set Unavailable' : 'Set Available'}
                                            </button>
                                            <button onClick={() => handleEditCar(car)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem', borderColor: '#3B82F6', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                <FaEdit /> Edit
                                            </button>
                                            <button onClick={() => deleteCar(car.id)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem', borderColor: '#EF4444', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                <FaTrash /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

// --- Subcomponents for Cleanliness ---

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

const StatCard = ({ label, value, change }: any) => (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
            <h3 style={{ fontSize: '2rem', lineHeight: 1 }}>{value}</h3>
            <span style={{ color: change.includes('+') ? '#10B981' : '#F59E0B', fontSize: '0.9rem', marginBottom: '5px' }}>{change}</span>
        </div>
    </div>
);

const BookingsTable = ({ bookings, onUpdateStatus, compact }: any) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8' }}>
                    <th style={{ padding: '1rem' }}>Car</th>
                    <th style={{ padding: '1rem' }}>Customer</th>
                    {!compact && <th style={{ padding: '1rem' }}>Dates</th>}
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((b: any) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 600 }}>{b.car ? `${b.car.make} ${b.car.model}` : `Car #${b.car_id}`}</div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                            <div>{b.customer_name || 'Guest'}</div>
                            {!compact && <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{b.customer_email}</div>}
                        </td>
                        {!compact && <td style={{ padding: '1rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
                            {new Date(b.start_date).toLocaleDateString()} &rarr; {new Date(b.end_date).toLocaleDateString()}
                        </td>}
                        <td style={{ padding: '1rem' }}>
                            <StatusBadge status={b.status} />
                        </td>
                        <td style={{ padding: '1rem' }}>
                            {(b.status === 'PENDING' || !compact) && (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => onUpdateStatus(b.id, 'APPROVED')} title="Approve" style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', borderRadius: '8px' }}>
                                        <FaCheck />
                                    </button>
                                    <button onClick={() => onUpdateStatus(b.id, 'REJECTED')} title="Reject" style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', borderRadius: '8px' }}>
                                        <FaTimes />
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
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

export default Dashboard;
