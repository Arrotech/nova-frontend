import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaCar, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes, FaUsers } from 'react-icons/fa';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: 'overview' | 'bookings' | 'fleet' | 'users';
    setActiveTab: (tab: 'overview' | 'bookings' | 'fleet' | 'users') => void;
}

const AdminLayout = ({ children, activeTab, setActiveTab }: AdminLayoutProps) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const NavItem = ({ icon, label, id }: { icon: any, label: string, id: any }) => (
        <button
            onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-6 py-4 w-full transition-all duration-200 border-l-4 ${activeTab === id
                ? 'border-primary bg-primary/10 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </button>
    );

    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-50 font-body">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-secondary/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center z-50">
                <h2 className="text-xl font-bold font-heading">NOVA <span className="text-primary">Admin</span></h2>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-xl">
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 h-screen w-72 bg-secondary border-r border-white/5 flex flex-col z-50
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-8 mb-2 hidden md:block">
                    <h2 className="text-2xl font-bold font-heading tracking-tight">
                        NOVA <span className="text-primary">Admin</span>
                    </h2>
                </div>

                {/* Mobile spacer */}
                <div className="h-20 md:hidden"></div>

                <nav className="flex-1 flex flex-col gap-1 py-4">
                    <NavItem icon={<FaChartLine />} label="Overview" id="overview" />
                    <NavItem icon={<FaCalendarAlt />} label="Bookings" id="bookings" />
                    <NavItem icon={<FaCar />} label="Fleet" id="fleet" />
                    <NavItem icon={<FaUsers />} label="Users" id="users" />
                </nav>

                <div className="p-6 border-t border-white/5">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2"
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto w-full max-w-[100vw] overflow-x-hidden">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1 text-white">
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'bookings' && 'Booking Management'}
                            {activeTab === 'fleet' && 'Fleet Management'}
                            {activeTab === 'users' && 'User Management'}
                        </h1>
                        <p className="text-slate-400 text-sm">Welcome back, Administrator.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                            A
                        </div>
                    </div>
                </header>

                <div className="animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
