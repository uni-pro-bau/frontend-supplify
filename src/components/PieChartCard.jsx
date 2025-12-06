import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#7c3aed', '#c084fc', '#f472b6', '#312e81'];

function PieChartCard({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-purple-900">Inventory breakdown</h3>
        <p className="text-sm text-gray-500">Distribution of stock by status</p>
        <div className="mt-6 h-64 flex items-center justify-center text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card animate-in fade-in-50 slide-in-from-right-4 duration-700">
      <h3 className="text-lg font-semibold text-purple-900">Inventory breakdown</h3>
      <p className="text-sm text-gray-500">Distribution of stock by status</p>
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              isAnimationActive
              animationBegin={200}
              animationDuration={900}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartCard;

