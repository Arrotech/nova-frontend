import { useState, useEffect } from 'react';
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem' }}>
            <div className="card" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Welcome Back</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Login to access your account</p>

                {message && <div style={{ background: '#DCFCE7', color: '#166534', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', textAlign: 'center' }}>{message}</div>}
                {error && <div style={{ background: '#FECACA', color: '#991B1B', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', paddingRight: '2.5rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Log In</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
