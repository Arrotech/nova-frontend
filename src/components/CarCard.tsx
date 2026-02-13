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
        <div className="card group flex flex-col h-full overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden">
                {image ? (
                    <img src={image} alt={`${make} ${model}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full bg-surface-light flex items-center justify-center text-slate-600 text-sm">No Image</div>
                )}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    {available ? (
                        <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-semibold border border-emerald-500/30">Available</span>
                    ) : (
                        <span className="bg-rose-500/20 text-rose-400 px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-semibold border border-rose-500/30">Booked</span>
                    )}
                </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="mb-3 sm:mb-4">
                    <div className="flex justify-between items-baseline mb-1.5 sm:mb-2 gap-2">
                        <h3 className="text-base sm:text-xl font-bold truncate">{make} {model}</h3>
                        <span className="text-slate-500 text-xs sm:text-sm font-medium border border-white/10 px-1.5 sm:px-2 py-0.5 rounded flex-shrink-0">{year}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">
                        Ksh {price.toLocaleString()} <span className="text-xs sm:text-sm text-slate-500 font-normal">/ day</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 text-slate-500 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 sm:gap-1.5"><FaGasPump className="text-primary/70" /> {specs?.Fuel || 'Petrol'}</div>
                    <div className="flex items-center gap-1 sm:gap-1.5"><FaCogs className="text-primary/70" /> {specs?.Transmission || 'Auto'}</div>
                    <div className="flex items-center gap-1 sm:gap-1.5"><FaChair className="text-primary/70" /> {specs?.Seating || 4} Seats</div>
                </div>
                <div className="mt-auto">
                    <Link to={`/cars/${id}`} className="btn btn-outline w-full justify-center text-sm sm:text-base py-2.5 sm:py-3 hover:bg-primary hover:border-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
