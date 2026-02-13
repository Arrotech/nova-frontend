import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface CarFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    newCar: any;
    setNewCar: (car: any) => void;
    isEditing: boolean;
}

const InputGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</label>
        {children}
    </div>
);

const CarFormModal = ({ isOpen, onClose, onSubmit, newCar, setNewCar, isEditing }: CarFormModalProps) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const inputClass = "w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-secondary border border-white/10 w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl shadow-2xl flex flex-col">

                {/* Header */}
                <div className="sticky top-0 bg-secondary/95 backdrop-blur-md border-b border-white/5 p-6 flex justify-between items-center z-10">
                    <h3 className="text-2xl font-bold font-heading text-white">
                        {isEditing ? 'Update Vehicle' : 'Add New Vehicle'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={onSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Make">
                        <input
                            placeholder="e.g. Porsche"
                            value={newCar.make}
                            onChange={e => setNewCar({ ...newCar, make: e.target.value })}
                            required
                            className={inputClass}
                        />
                    </InputGroup>

                    <InputGroup label="Model">
                        <input
                            placeholder="e.g. 911 Carrera"
                            value={newCar.model}
                            onChange={e => setNewCar({ ...newCar, model: e.target.value })}
                            required
                            className={inputClass}
                        />
                    </InputGroup>

                    <InputGroup label="Year">
                        <input
                            type="number"
                            placeholder="2024"
                            value={newCar.year}
                            onChange={e => setNewCar({ ...newCar, year: Number(e.target.value) })}
                            required
                            className={inputClass}
                        />
                    </InputGroup>

                    <InputGroup label="Price Per Day (Ksh)">
                        <input
                            type="number"
                            placeholder="25000"
                            value={newCar.price_per_day}
                            onChange={e => setNewCar({ ...newCar, price_per_day: Number(e.target.value) })}
                            required
                            className={inputClass}
                        />
                    </InputGroup>

                    <div className="md:col-span-2 grid grid-cols-3 gap-4">
                        <InputGroup label="Fuel Type">
                            <select
                                value={newCar.fuel_type}
                                onChange={e => setNewCar({ ...newCar, fuel_type: e.target.value })}
                                className={inputClass}
                            >
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </InputGroup>

                        <InputGroup label="Transmission">
                            <select
                                value={newCar.transmission}
                                onChange={e => setNewCar({ ...newCar, transmission: e.target.value })}
                                className={inputClass}
                            >
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                        </InputGroup>

                        <InputGroup label="Seats">
                            <input
                                type="number"
                                value={newCar.seating_capacity}
                                onChange={e => setNewCar({ ...newCar, seating_capacity: Number(e.target.value) })}
                                className={inputClass}
                            />
                        </InputGroup>
                    </div>

                    <div className="md:col-span-2">
                        <InputGroup label="Image URL">
                            <input
                                placeholder="https://example.com/car.jpg"
                                value={newCar.image_url}
                                onChange={e => setNewCar({ ...newCar, image_url: e.target.value })}
                                className={inputClass}
                            />
                        </InputGroup>
                    </div>

                    <div className="md:col-span-2">
                        <InputGroup label="Features (comma separated)">
                            <textarea
                                placeholder="Bluetooth, Sunroof, Leather Seats, GPS..."
                                value={newCar.features}
                                onChange={e => setNewCar({ ...newCar, features: e.target.value })}
                                className={`${inputClass} min-h-[80px]`}
                            />
                        </InputGroup>
                    </div>

                    <div className="md:col-span-2">
                        <InputGroup label="Description">
                            <textarea
                                placeholder="Describe the vehicle..."
                                value={newCar.description}
                                onChange={e => setNewCar({ ...newCar, description: e.target.value })}
                                className={`${inputClass} min-h-[100px]`}
                            />
                        </InputGroup>
                    </div>

                    {/* Footer Actions */}
                    <div className="md:col-span-2 flex justify-end gap-4 mt-4 pt-6 border-t border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-semibold text-slate-400 hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5"
                        >
                            {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarFormModal;
