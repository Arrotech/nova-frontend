import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import BookingsTable from './components/BookingsTable';

interface BookingsManagementProps {
    bookings: any[];
    onUpdateStatus: (id: number, status: string) => void;
}

const BookingsManagement = ({ bookings, onUpdateStatus }: BookingsManagementProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredBookings = bookings.filter(b => {
        const matchesSearch = (b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.id.toString().includes(searchTerm));
        const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-secondary/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-slate-400 text-sm hidden md:inline"><FaFilter /> Filter:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full md:w-48 pl-3 pr-10 py-2.5 text-base border border-white/10 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-slate-900/50 text-white"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden bg-secondary/50">
                <BookingsTable bookings={filteredBookings} onUpdateStatus={onUpdateStatus} />
            </div>
        </div>
    );
};

export default BookingsManagement;
