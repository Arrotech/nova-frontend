import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaUserShield, FaUser, FaCheck, FaTimes, FaEnvelope } from 'react-icons/fa';
import api from '../../services/api';

interface User {
    id: number;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('ALL');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        // Mock endpoint usage - assuming backend supports this or we'll add it
        // If not, we might need to rely on what we have or mock it for UI demo
        api.get('/users/').then(res => {
            setUsers(res.data);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to fetch users", err);
            // Fallback mock data if API fails (for development/demo)
            setUsers([
                { id: 1, email: 'admin@example.com', full_name: 'Super Admin', is_active: true, is_superuser: true },
                { id: 2, email: 'user@example.com', full_name: 'John Doe', is_active: true, is_superuser: false },
                { id: 3, email: 'jane@example.com', full_name: 'Jane Smith', is_active: false, is_superuser: false },
            ]);
            setLoading(false);
        });
    };

    const toggleUserStatus = (id: number) => {
        // api.put(`/users/${id}`, { is_active: !currentStatus }).then(fetchUsers);
        // Mock update
        setUsers(users.map(u => u.id === id ? { ...u, is_active: !u.is_active } : u));
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesRole = roleFilter === 'ALL' ||
            (roleFilter === 'ADMIN' && user.is_superuser) ||
            (roleFilter === 'USER' && !user.is_superuser);
        return matchesSearch && matchesRole;
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
                        placeholder="Search users..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-slate-400 text-sm hidden md:inline"><FaFilter /> Role:</span>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="block w-full md:w-48 pl-3 pr-10 py-2.5 text-base border border-white/10 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-slate-900/50 text-white"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="ADMIN">Admins</option>
                        <option value="USER">Customers</option>
                    </select>
                </div>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden bg-secondary/50">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-400 border-b border-white/5 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors duration-150">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                                                ${user.is_superuser ? 'bg-indigo-600' : 'bg-slate-700'}
                                            `}>
                                                {user.is_superuser ? <FaUserShield /> : <FaUser />}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">{user.full_name || 'No Name'}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    <FaEnvelope className="w-3 h-3" /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border
                                            ${user.is_superuser
                                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                                : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}
                                        `}>
                                            {user.is_superuser ? 'Administrator' : 'Customer'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border
                                            ${user.is_active
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}
                                        `}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {!user.is_superuser && (
                                            <button
                                                onClick={() => toggleUserStatus(user.id)}
                                                className={`p-2 rounded-lg transition-all
                                                    ${user.is_active
                                                        ? 'text-rose-400 hover:bg-rose-500/10'
                                                        : 'text-emerald-400 hover:bg-emerald-500/10'}
                                                `}
                                                title={user.is_active ? 'Deactivate User' : 'Activate User'}
                                            >
                                                {user.is_active ? <FaTimes /> : <FaCheck />}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
