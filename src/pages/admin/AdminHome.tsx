import StatCard from './components/StatCard';
import BookingsTable from './components/BookingsTable';
import { FaMoneyBillWave, FaCalendarCheck, FaCarSide, FaUsers } from 'react-icons/fa';

interface AdminHomeProps {
    stats: {
        totalRevenue: number;
        activeBookings: number;
        availableCars: number;
    };
    recentBookings: any[];
    onUpdateStatus: (id: number, status: string) => void;
}

const AdminHome = ({ stats, recentBookings, onUpdateStatus }: AdminHomeProps) => {
    return (
        <div className="flex flex-col gap-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Revenue (Est)"
                    value={`Ksh ${stats.totalRevenue.toLocaleString()}`}
                    change="+12%"
                    icon={<FaMoneyBillWave />}
                    color="green"
                />
                <StatCard
                    label="Active Bookings"
                    value={stats.activeBookings}
                    change="+5"
                    icon={<FaCalendarCheck />}
                    color="blue"
                />
                <StatCard
                    label="Available Cars"
                    value={stats.availableCars}
                    change="-2"
                    icon={<FaCarSide />}
                    color="orange"
                />
                <StatCard
                    label="Total Customers"
                    value="84" // Mocked in original
                    change="+14%"
                    icon={<FaUsers />}
                    color="purple"
                />
            </div>

            {/* Recent Activity */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-secondary/50">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Bookings</h3>

                </div>
                <BookingsTable bookings={recentBookings} onUpdateStatus={onUpdateStatus} compact />
            </div>
        </div>
    );
};

export default AdminHome;
