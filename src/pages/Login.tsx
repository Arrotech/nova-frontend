import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const message = location.state?.message;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);
            const res = await api.post('/login/access-token', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            const { access_token } = res.data;
            const userRes = await api.get('/users/me', { headers: { Authorization: `Bearer ${access_token}` } });
            const userData = userRes.data;
            login(access_token, userData);
            const from = location.state?.from?.pathname || (userData.is_superuser ? '/admin/dashboard' : '/dashboard');
            navigate(from, { replace: true });
        } catch { setError('Invalid credentials'); }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-4 sm:p-8">
            <div className="card w-full max-w-md p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Welcome Back</h1>
                <p className="text-center text-slate-500 mb-6 sm:mb-8 text-sm sm:text-base">Login to access your account</p>

                {message && <div className="bg-emerald-500/10 text-emerald-400 px-4 py-3 rounded-lg mb-4 sm:mb-6 text-center text-xs sm:text-sm font-medium border border-emerald-500/20">{message}</div>}
                {error && <div className="bg-rose-500/10 text-rose-400 px-4 py-3 rounded-lg mb-4 sm:mb-6 text-center text-xs sm:text-sm font-medium border border-rose-500/20">{error}</div>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-1 sm:mb-1.5">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field text-sm sm:text-base" />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-400 mb-1 sm:mb-1.5">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="input-field pr-10 text-sm sm:text-base" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full justify-center mt-1 sm:mt-2">Log In</button>
                </form>

                <p className="text-center mt-6 sm:mt-8 text-slate-500 text-sm">
                    Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
