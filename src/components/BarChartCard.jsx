import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function BarChartCard({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-purple-900">Weekly stock movements</h3>
        <p className="text-sm text-gray-500">Units received from suppliers this week</p>
        <div className="mt-6 h-64 flex items-center justify-center text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card animate-in fade-in-50 slide-in-from-left-4 duration-700">
      <h3 className="text-lg font-semibold text-purple-900">Weekly stock movements</h3>
      <p className="text-sm text-gray-500">Units received from suppliers this week</p>
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
            <Bar
              radius={[12, 12, 0, 0]}
              dataKey="received"
              fill="url(#barGradient)"
              isAnimationActive
              animationBegin={200}
              animationDuration={900}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartCard;

