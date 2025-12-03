import { cn } from '../lib/utils.js';

function KPIBox({ label, value, delta, icon: Icon, trend = 'up' }) {
  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {Icon ? (
          <div className="rounded-full bg-purple-50 p-3 text-purple-600">
            <Icon size={18} />
          </div>
        ) : null}
      </div>
      <p className="mt-4 text-3xl font-semibold text-purple-900">{value}</p>
      {delta ? (
        <p
          className={cn(
            'mt-2 text-sm font-semibold',
            trend === 'up' ? 'text-emerald-500' : 'text-rose-500',
          )}
        >
          {delta}
        </p>
      ) : null}
    </div>
  );
}

export default KPIBox;

