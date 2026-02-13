import { FaCheck, FaTimes } from 'react-icons/fa';

interface Booking {
    id: number;
    car: {
        make: string;
        model: string;
        primary_image_url?: string;
    } | null;
    customer_name?: string;
    customer_email?: string;
    start_date: string;
    end_date: string;
    total_price: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
}

interface BookingsTableProps {
    bookings: Booking[];
    onUpdateStatus: (id: number, status: string) => void;
    compact?: boolean;
}

const BookingsTable = ({ bookings, onUpdateStatus, compact = false }: BookingsTableProps) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-slate-400 border-b border-white/5 text-sm uppercase tracking-wider">
                        <th className="p-4 font-medium">Vehicle</th>
                        <th className="p-4 font-medium">Customer</th>
                        {!compact && <th className="p-4 font-medium">Dates</th>}
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-white/5 transition-colors duration-150 group">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 border border-white/10">
                                        {booking.car?.primary_image_url ? (
                                            <img src={booking.car.primary_image_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">N/A</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{booking.car ? `${booking.car.make} ${booking.car.model}` : 'Unknown Car'}</div>
                                        <div className="text-xs text-slate-500">#{booking.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="text-slate-200">{booking.customer_name || 'Guest User'}</div>
                                {!compact && <div className="text-xs text-slate-500">{booking.customer_email}</div>}
                            </td>
                            {!compact && (
                                <td className="p-4 text-sm text-slate-400">
                                    <div className="flex flex-col">
                                        <span>{new Date(booking.start_date).toLocaleDateString()}</span>
                                        <span className="text-xs opacity-50">to {new Date(booking.end_date).toLocaleDateString()}</span>
                                    </div>
                                </td>
                            )}
                            <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${booking.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : ''}
                                    ${booking.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : ''}
                                    ${booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : ''}
                                    ${booking.status === 'CANCELLED' ? 'bg-slate-500/10 text-slate-500 border border-slate-500/20' : ''}
                                    ${booking.status === 'COMPLETED' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : ''}
                                `}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="p-4">
                                {(booking.status === 'PENDING' || !compact) && (
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {booking.status === 'PENDING' && (
                                            <>
                                                <button
                                                    onClick={() => onUpdateStatus(booking.id, 'APPROVED')}
                                                    className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                                                    title="Approve"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={() => onUpdateStatus(booking.id, 'REJECTED')}
                                                    className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                                                    title="Reject"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </>
                                        )}
                                        {/* Add view/edit button here if needed */}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500">
                                No bookings found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsTable;
