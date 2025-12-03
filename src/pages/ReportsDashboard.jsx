import { Button } from '../components/ui/button.jsx';
import FilterBar from '../components/FilterBar.jsx';
import KPIBox from '../components/KPIBox.jsx';
import ReportsTable from '../components/ReportsTable.jsx';
import PieChartCard from '../components/PieChartCard.jsx';
import BarChartCard from '../components/BarChartCard.jsx';
import { Download, Share2, Activity, Zap, SignalHigh, Shield } from 'lucide-react';

const kpis = [
  { label: 'Total executions', value: '24,581', delta: '+18% vs last week', icon: Activity },
  { label: 'Active scenarios', value: '142', delta: '+4 new', icon: Zap },
  { label: 'Throughput', value: '1.6M ops', delta: '+3%', icon: SignalHigh },
  { label: 'Reliability score', value: '99.2%', delta: '+0.4 pts', icon: Shield },
];

function ReportsDashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-card lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-purple-300">analytics</p>
          <h1 className="mt-2 text-4xl font-semibold text-purple-900">Reports Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">
            Monitor automation performance, throughput, and scenario health in real time.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="border-purple-600 text-purple-600">
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button variant="outline" className="border-purple-600 text-purple-600">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </header>

      <FilterBar />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KPIBox key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <BarChartCard />
        <PieChartCard />
      </section>

      <ReportsTable />
    </div>
  );
}

export default ReportsDashboard;

