interface StatCardProps {
    label: string;
    value: string | number;
    change?: string;
    icon?: React.ReactNode;
    color?: 'blue' | 'green' | 'orange' | 'purple';
}

const StatCard = ({ label, value, change, icon, color = 'blue' }: StatCardProps) => {
    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-500',
        green: 'bg-emerald-500/10 text-emerald-500',
        orange: 'bg-amber-500/10 text-amber-500',
        purple: 'bg-purple-500/10 text-purple-500'
    };

    return (
        <div className="glass-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]} text-xl`}>
                    {icon}
                </div>
                {change && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                        {change}
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-400 text-sm mb-1">{label}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;
