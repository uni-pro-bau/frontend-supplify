import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import FilterBar from '../components/FilterBar.jsx';
import KPIBox from '../components/KPIBox.jsx';
import ReportsTable from '../components/ReportsTable.jsx';
import PieChartCard from '../components/PieChartCard.jsx';
import BarChartCard from '../components/BarChartCard.jsx';
import { FileDown, FileText, Boxes, AlertTriangle, DollarSign, Truck, RefreshCw } from 'lucide-react';
import { fetchDashboardData } from '../api/dashboard.js';

const iconMap = {
  boxes: Boxes,
  alert: AlertTriangle,
  dollar: DollarSign,
  truck: Truck,
};

function ReportsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    kpis: [],
    barSeries: [],
    pieSeries: [],
    tableRows: [],
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const result = await fetchDashboardData();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load dashboard data.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-card animate-in fade-in-50 slide-in-from-top-4 duration-500 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-purple-300">analytics</p>
          <h1 className="mt-2 text-4xl font-semibold text-purple-900">Reports Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">
            Generate and export inventory reports easily. Data is ready to be wired to your backend.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="border-purple-600 text-purple-600">
            <FileDown size={16} className="mr-2" />
            Export to Excel
          </Button>
          <Button variant="outline" className="border-purple-600 text-purple-600">
            <FileText size={16} className="mr-2" />
            Export to PDF
          </Button>
          <Button
            variant="ghost"
            className="text-xs font-medium text-purple-600"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      </header>

      <FilterBar />

      {loading && (
        <div className="rounded-3xl bg-white p-6 text-sm text-gray-500 shadow-card">
          Loading latest inventory and supplier data…
        </div>
      )}
      {error && !loading && (
        <div className="rounded-3xl bg-rose-50 p-4 text-sm font-medium text-rose-700 shadow-card">
          {error}
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => {
          const Icon = iconMap[kpi.iconKey] || Boxes;
          return (
            <KPIBox
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              icon={Icon}
              trend={kpi.trend}
            />
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <BarChartCard data={data.barSeries} />
        <PieChartCard data={data.pieSeries} />
      </section>

      <ReportsTable rows={data.tableRows} />
    </div>
  );
}

export default ReportsDashboard;

