import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // const { login } = useAuth(); // If we auto-login after register

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await api.post('/register', {
                email,
                password,
                full_name: fullName,
                is_active: true
            });
            // Auto login or redirect to login
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-8 bg-slate-50">
            <div className="card w-full max-w-md p-10 bg-white shadow-xl border border-slate-100">
                <h1 className="text-3xl font-bold text-center mb-2 text-slate-900">Create Account</h1>
                <p className="text-center text-slate-500 mb-8">Join NOVA Rental today</p>

                {error && <div className="bg-rose-50 text-rose-700 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium border border-rose-200">{error}</div>}

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="john@example.com" className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="********"
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
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                placeholder="********"
                                className="input-field pr-10"
                            />
                            {/* We can reuse the same toggle or have separate ones. Usually one toggle for both is cleaner for signup forms. 
                                Or we can hide the button here since the main one controls mode? 
                                Let's just use the state to control both for simplicity as requested "toggle visibility...". 
                                But often users might want to peek just one. 
                                Given the request "add eye to toggle visibility", I'll put it on the main password field or both?
                                Standard UX often has it on both or one master toggle. I'll put it on both for flexibility if they want to check.
                                Actually re-reading standard patterns, usually it's per-field.
                            */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full justify-center mt-2">Sign Up</button>
                </form>

                <p className="text-center mt-8 text-slate-500">
                    Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
