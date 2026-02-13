import { useEffect, useState } from 'react';
import api from '../services/api';
import CarCard from '../components/CarCard';

const Catalog = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/cars')
            .then(res => { setCars(res.data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    return (
        <div className="min-h-screen pb-12 sm:pb-16">
            <div className="bg-surface py-16 sm:py-20 text-center mb-8 sm:mb-12 px-4 border-b border-white/5">
                <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl">Our Elite Fleet</h1>
                <p className="text-slate-500 text-sm sm:text-lg">Choose from our wide selection of premium vehicles.</p>
            </div>
            <div className="container">
                {loading ? (
                    <div className="text-center py-12 sm:py-16 text-slate-500">Loading cars...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {cars.map((car: any) => (
                            <CarCard key={car.id} id={car.id} make={car.make} model={car.model} year={car.year} price={car.price_per_day}
                                image={car.images?.length > 0 ? car.images[0].image_url : undefined} available={car.is_available} specs={car.specs} />
                        ))}
                        {cars.length === 0 && <p className="col-span-full text-center text-slate-500">No cars available at the moment.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
