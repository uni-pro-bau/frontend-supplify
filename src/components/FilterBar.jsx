import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { CalendarCheck2 } from 'lucide-react';

const presets = ['Last 7 days', 'Last 30 days', 'Quarter', 'Custom'];

function FilterBar() {
  return (
    <section className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-wrap gap-3">
        {presets.map((preset) => (
          <button
            key={preset}
            className="rounded-full border border-purple-100 px-4 py-2 text-xs font-medium text-purple-900 transition hover:border-purple-500 hover:bg-purple-50"
          >
            {preset}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input type="date" className="rounded-full bg-gray-50 sm:w-40" />
        <Input type="date" className="rounded-full bg-gray-50 sm:w-40" />
        <Button className="bg-main-gradient px-8 text-white shadow-lg">
          <CalendarCheck2 size={16} className="mr-2" />
          Generate Report
        </Button>
      </div>
    </section>
  );
}

export default FilterBar;

