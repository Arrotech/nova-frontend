import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="cars" element={<Catalog />} />
                        <Route path="cars/:id" element={<CarDetails />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />

                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>

                    {/* Customer Dashboard (No Layout) */}
                    <Route path="dashboard" element={<CustomerDashboard />} />

                    {/* Admin Routes (No Layout) */}
                    <Route path="admin/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
