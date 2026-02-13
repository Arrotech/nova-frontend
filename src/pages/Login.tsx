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

            const res = await api.post('/login/access-token', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            // Determine if admin or user (Based on response or decoding token)
            // For now, let's assume the response helps or we check strict superuser
            // Actually, our backend login endpoint returns access_token only.
            // We might need to fetch user details separately or decode if we had claims.
            // But let's cheat and assume admin@example.com is admin for UI flow, 
            // REAL security is handled by backend endpoints anyway.

            const { access_token } = res.data;

            // Allow the api instance to use this token for the next request
            // We need to manually set it because the interceptor reads from localStorage,
            // which hasn't been updated yet via login() context.
            // Or we can just use the token in headers directly for this one request.
            const userRes = await api.get('/users/me', {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            const userData = userRes.data;
            login(access_token, userData);

            const isSuperUser = userData.is_superuser;
            const from = location.state?.from?.pathname || (isSuperUser ? '/admin/dashboard' : '/dashboard');
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-8 bg-slate-50">
            <div className="card w-full max-w-md p-10 bg-white shadow-xl border border-slate-100">
                <h1 className="text-3xl font-bold text-center mb-2 text-slate-900">Welcome Back</h1>
                <p className="text-center text-slate-500 mb-8">Login to access your account</p>

                {message && <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium border border-emerald-200">{message}</div>}
                {error && <div className="bg-rose-50 text-rose-700 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium border border-rose-200">{error}</div>}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="input-field pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full justify-center mt-2">Log In</button>
                </form>

                <p className="text-center mt-8 text-slate-500">
                    Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
