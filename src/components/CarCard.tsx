import { Link } from 'react-router-dom';
import { FaGasPump, FaCogs, FaChair } from 'react-icons/fa';

interface CarCardProps {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    image?: string;
    available: boolean;
    specs?: any;
}

const CarCard = ({ id, make, model, year, price, image, available, specs }: CarCardProps) => {
    return (
        <div className="card group flex flex-col h-full overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition-all duration-300">
            <div className="relative h-60 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={`${make} ${model}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
                )}
                <div className="absolute top-4 right-4">
                    {available ? (
                        <span className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm">
                            Available
                        </span>
                    ) : (
                        <span className="bg-rose-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm">
                            Booked
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{make} {model}</h3>
                        <span className="text-slate-500 text-sm font-medium border border-slate-200 px-2 py-0.5 rounded">{year}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                        Ksh {price.toLocaleString()} <span className="text-sm text-slate-400 font-normal">/ day</span>
                    </div>
                </div>

                {/* Mini Specs */}
                <div className="flex gap-4 mb-6 text-slate-500 text-sm">
                    <div className="flex items-center gap-1.5"><FaGasPump className="text-primary/70" /> {specs?.Fuel || 'Petrol'}</div>
                    <div className="flex items-center gap-1.5"><FaCogs className="text-primary/70" /> {specs?.Transmission || 'Auto'}</div>
                    <div className="flex items-center gap-1.5"><FaChair className="text-primary/70" /> {specs?.Seating || 4} Seats</div>
                </div>

                <div className="mt-auto">
                    <Link to={`/cars/${id}`} className="btn btn-outline w-full justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
