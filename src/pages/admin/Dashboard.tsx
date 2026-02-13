import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import AdminHome from './AdminHome';
import BookingsManagement from './BookingsManagement';
import FleetManagement from './FleetManagement';
import UserManagement from './UserManagement';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'fleet' | 'users'>('overview');
    const [bookings, setBookings] = useState<any[]>([]);
    const [cars, setCars] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalRevenue: 0, activeBookings: 0, availableCars: 0 });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');

        fetchData();
    }, [navigate]);

    const fetchData = () => {
        Promise.all([
            api.get('/bookings/'),
            api.get('/cars/all')
        ]).then(([bookingsRes, carsRes]) => {
            setBookings(bookingsRes.data);
            setCars(carsRes.data);
            calculateStats(bookingsRes.data, carsRes.data);
        }).catch(err => console.error("Failed to fetch admin data", err));
    };

    const calculateStats = (bookingsData: any[], carsData: any[]) => {
        const active = bookingsData.filter(b => b.status === 'APPROVED' || b.status === 'PENDING').length;
        const available = carsData.filter(c => c.is_available).length;

        // Mock revenue calculation
        setStats({
            totalRevenue: 1250000,
            activeBookings: active,
            availableCars: available
        });
    };

    const updateBookingStatus = (id: number, status: string) => {
        api.put(`/bookings/${id}`, { status }).then(fetchData).catch(console.error);
    };

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'overview' && (
                <AdminHome
                    stats={stats}
                    recentBookings={bookings.slice(0, 5)}
                    onUpdateStatus={updateBookingStatus}
                />
            )}

            {activeTab === 'bookings' && (
                <BookingsManagement
                    bookings={bookings}
                    onUpdateStatus={updateBookingStatus}
                />
            )}

            {activeTab === 'fleet' && (
                <FleetManagement
                    cars={cars}
                    refreshData={fetchData}
                />
            )}

            {activeTab === 'users' && (
                <UserManagement />
            )}
        </AdminLayout>
    );
};

export default Dashboard;
