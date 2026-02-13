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
        <div style={{ background: 'var(--bg-body)', paddingBottom: '4rem' }}>
            <div style={{ background: 'var(--secondary)', padding: '5rem 0', color: 'white', textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Elite Fleet</h1>
                <p style={{ color: '#94A3B8', fontSize: '1.2rem' }}>Choose from our wide selection of premium vehicles.</p>
            </div>

            <div className="container">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>Loading cars...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
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
                        {cars.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No cars available at the moment.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
