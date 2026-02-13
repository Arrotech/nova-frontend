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
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                {image ? (
                    <img
                        src={image}
                        alt={`${make} ${model}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1' }}>No Image</div>
                )}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    {available ? (
                        <span style={{ background: 'rgba(16, 185, 129, 0.9)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                            Available
                        </span>
                    ) : (
                        <span style={{ background: 'rgba(239, 68, 68, 0.9)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                            Booked
                        </span>
                    )}
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem' }}>{make} {model}</h3>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 500 }}>{year}</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                        Ksh {price.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ day</span>
                    </div>
                </div>

                {/* Mini Specs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FaGasPump /> {specs?.Fuel || 'Petrol'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FaCogs /> {specs?.Transmission || 'Auto'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FaChair /> {specs?.Seating || 4} Seats</div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <Link to={`/cars/${id}`} className="btn btn-primary" style={{ width: '100%' }}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
