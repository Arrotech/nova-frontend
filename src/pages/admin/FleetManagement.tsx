import { useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaGasPump, FaCogs, FaChair, FaCheck } from 'react-icons/fa';
import CarFormModal from './components/CarFormModal';
import api from '../../services/api';

interface FleetManagementProps {
    cars: any[];
    refreshData: () => void;
}

const FleetManagement = ({ cars, refreshData }: FleetManagementProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCarForm, setShowCarForm] = useState(false);
    const [editingCar, setEditingCar] = useState<any | null>(null);
    const [newCar, setNewCar] = useState({
        make: '', model: '', year: 2024, price_per_day: 0, image_url: '', description: '',
        fuel_type: 'Petrol', transmission: 'Automatic', seating_capacity: 4, features: ''
    });

    const filteredCars = cars.filter(c =>
        c.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditCar = (car: any) => {
        setNewCar({
            make: car.make,
            model: car.model,
            year: car.year,
            price_per_day: car.price_per_day,
            image_url: car.primary_image_url || (car.images && car.images[0]?.image_url) || '',
            description: car.description || '',
            fuel_type: car.specs?.Fuel || 'Petrol',
            transmission: car.specs?.Transmission || 'Automatic',
            seating_capacity: car.specs?.Seating || 4,
            features: car.features ? car.features.join(', ') : ''
        });
        setEditingCar(car);
        setShowCarForm(true);
    };

    const handleCreateOrUpdateCar = (e: React.FormEvent) => {
        e.preventDefault();
        const carData = {
            make: newCar.make,
            model: newCar.model,
            year: Number(newCar.year),
            price_per_day: Number(newCar.price_per_day),
            description: newCar.description,
            is_available: true,
            specs: {
                Fuel: newCar.fuel_type,
                Transmission: newCar.transmission,
                Seating: Number(newCar.seating_capacity)
            },
            features: newCar.features.split(',').map(f => f.trim()).filter(f => f !== '')
        };
        const images = newCar.image_url ? [newCar.image_url] : [];
        const payload = { ...carData, images };

        if (editingCar) {
            api.put(`/cars/${editingCar.id}`, payload)
                .then(() => {
                    closeForm();
                    refreshData();
                })
                .catch(() => alert('Error updating car'));
        } else {
            api.post('/cars/', payload)
                .then(() => {
                    closeForm();
                    refreshData();
                })
                .catch((err) => {
                    console.error("Error creating car:", err);
                    alert('Error creating car: ' + (err.response?.data?.detail || err.message));
                });
        }
    };

    const deleteCar = (id: number) => {
        if (confirm('Are you sure you want to remove this car?')) {
            api.delete(`/cars/${id}`).then(refreshData);
        }
    };

    const toggleAvailability = (car: any) => {
        api.put(`/cars/${car.id}`, { is_available: !car.is_available }).then(refreshData);
    };

    const closeForm = () => {
        setShowCarForm(false);
        setEditingCar(null);
        setNewCar({
            make: '', model: '', year: 2024, price_per_day: 0, image_url: '', description: '',
            fuel_type: 'Petrol', transmission: 'Automatic', seating_capacity: 4, features: ''
        });
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-secondary/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search fleet..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => { setEditingCar(null); setShowCarForm(true); }}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5 w-full md:w-auto justify-center"
                >
                    <FaPlus /> Add Vehicle
                </button>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                    <div key={car.id} className="group bg-secondary border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                        <div className="h-48 overflow-hidden relative">
                            {car.images && car.images.length > 0 ? (
                                <img src={car.images[0].image_url} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Image</div>
                            )}
                            <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md
                                    ${car.is_available ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-white'}
                                `}>
                                    {car.is_available ? 'Available' : 'Rented'}
                                </span>
                            </div>
                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => handleEditCar(car)}
                                    className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => toggleAvailability(car)}
                                    className={`p-3 rounded-full text-white transition-colors ${car.is_available ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                                    title={car.is_available ? 'Mark Rented' : 'Mark Available'}
                                >
                                    {car.is_available ? <FaCogs /> : <FaCheck />}
                                </button>
                                <button
                                    onClick={() => deleteCar(car.id)}
                                    className="p-3 bg-rose-600 rounded-full text-white hover:bg-rose-500 transition-colors"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white">{car.make} {car.model}</h3>
                                <span className="text-primary font-bold">Ksh {car.price_per_day?.toLocaleString()}</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">{car.year} • {car.fuel_type || 'Petrol'}</p>

                            <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/5 text-xs text-slate-400">
                                <div className="flex flex-col items-center gap-1">
                                    <FaGasPump className="text-lg text-slate-500" />
                                    <span>{car.specs?.Fuel || 'Petrol'}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <FaCogs className="text-lg text-slate-500" />
                                    <span>{car.specs?.Transmission || 'Auto'}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <FaChair className="text-lg text-slate-500" />
                                    <span>{car.specs?.Seating || 4} Seats</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <CarFormModal
                isOpen={showCarForm}
                onClose={closeForm}
                onSubmit={handleCreateOrUpdateCar}
                newCar={newCar}
                setNewCar={setNewCar}
                isEditing={!!editingCar}
            />
        </div>
    );
};



export default FleetManagement;
