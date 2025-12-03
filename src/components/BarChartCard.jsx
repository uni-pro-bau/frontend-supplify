import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', total: 120 },
  { name: 'Tue', total: 190 },
  { name: 'Wed', total: 240 },
  { name: 'Thu', total: 180 },
  { name: 'Fri', total: 260 },
  { name: 'Sat', total: 210 },
  { name: 'Sun', total: 170 },
];

function BarChartCard() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
      <h3 className="text-lg font-semibold text-purple-900">Weekly executions</h3>
      <p className="text-sm text-gray-500">Monitor automation throughput</p>
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
            <Bar radius={[12, 12, 0, 0]} dataKey="total" fill="url(#barGradient)" />
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

