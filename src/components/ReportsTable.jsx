const mockRows = [
  { name: 'Automation health', status: 'Healthy', runs: '1,204', success: '98.4%' },
  { name: 'API throughput', status: 'Warning', runs: '867', success: '92.1%' },
  { name: 'Webhook delivery', status: 'Healthy', runs: '2,430', success: '99.2%' },
  { name: 'Scenario errors', status: 'Critical', runs: '56', success: '71.4%' },
];

function StatusBadge({ state }) {
  const map = {
    Healthy: 'bg-emerald-50 text-emerald-600',
    Warning: 'bg-amber-50 text-amber-600',
    Critical: 'bg-rose-50 text-rose-600',
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[state] || ''}`}>{state}</span>
  );
}

function ReportsTable() {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-purple-600">
              <th className="py-3">Report</th>
              <th className="py-3">Status</th>
              <th className="py-3">Runs</th>
              <th className="py-3">Success</th>
            </tr>
          </thead>
          <tbody>
            {mockRows.map((row) => (
              <tr key={row.name} className="border-t border-purple-50 text-sm text-purple-900">
                <td className="py-4 font-semibold">{row.name}</td>
                <td className="py-4">
                  <StatusBadge state={row.status} />
                </td>
                <td className="py-4">{row.runs}</td>
                <td className="py-4 font-semibold">{row.success}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ReportsTable;

