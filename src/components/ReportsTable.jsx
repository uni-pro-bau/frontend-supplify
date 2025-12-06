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

function ReportsTable({ rows }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-purple-600">
              <th className="py-3">Product name</th>
              <th className="py-3">Category</th>
              <th className="py-3">Qty in stock</th>
              <th className="py-3">Reorder level</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-purple-50 text-sm text-purple-900">
                <td className="py-4 font-semibold">{row.name}</td>
                <td className="py-4">{row.category}</td>
                <td className="py-4">{row.qty}</td>
                <td className="py-4">{row.reorder}</td>
                <td className="py-4">
                  <StatusBadge state={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ReportsTable;

