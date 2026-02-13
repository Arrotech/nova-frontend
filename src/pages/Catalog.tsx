import { useEffect, useState } from 'react';
import api from '../services/api';
import CarCard from '../components/CarCard';

const Catalog = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/cars')
            .then(res => {
                setCars(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            <div className="bg-secondary py-20 text-center text-white mb-12">
                <h1 className="hero-title text-5xl mb-4">Our Elite Fleet</h1>
                <p className="text-slate-400 text-lg">Choose from our wide selection of premium vehicles.</p>
            </div>

            <div className="container">
                {loading ? (
                    <div className="text-center py-16 text-slate-500">Loading cars...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {cars.map((car: any) => (
                            <CarCard
                                key={car.id}
                                id={car.id}
                                make={car.make}
                                model={car.model}
                                year={car.year}
                                price={car.price_per_day}
                                image={car.images && car.images.length > 0 ? car.images[0].image_url : undefined}
                                available={car.is_available}
                                specs={car.specs}
                            />
                        ))}
                        {cars.length === 0 && <p className="col-span-full text-center text-slate-500 text-lg">No cars available at the moment.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
