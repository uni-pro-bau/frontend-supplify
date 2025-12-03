import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const pieData = [
  { name: 'API', value: 38 },
  { name: 'Automations', value: 26 },
  { name: 'Data Sync', value: 22 },
  { name: 'Notifications', value: 14 },
];

const COLORS = ['#7c3aed', '#c084fc', '#f472b6', '#312e81'];

function PieChartCard() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
      <h3 className="text-lg font-semibold text-purple-900">Usage by category</h3>
      <p className="text-sm text-gray-500">Distribution of automation runs</p>
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
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

