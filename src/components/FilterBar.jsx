import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { CalendarCheck2 } from 'lucide-react';

const presets = ['Last 7 days', 'Last 30 days', 'Custom'];

function FilterBar({
  startDate,
  endDate,
  activePreset,
  onChangeStart,
  onChangeEnd,
  onSelectPreset,
  onGenerate,
}) {
  return (
    <section className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-wrap gap-3">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onSelectPreset?.(preset)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              activePreset === preset
                ? 'bg-purple-600 text-white shadow-md'
                : 'border border-purple-100 text-purple-900 hover:border-purple-500 hover:bg-purple-50'
            }`}
            title={preset === 'Custom' && startDate && endDate ? `${startDate} → ${endDate}` : undefined}
          >
            {preset}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1 sm:w-40">
          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            Start date
          </span>
          <Input
            type="date"
            className="rounded-full bg-gray-50"
            value={startDate}
            onChange={(e) => onChangeStart?.(e.target.value)}
            aria-label="Start date"
          />
        </div>
        <div className="flex flex-col gap-1 sm:w-40">
          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            End date
          </span>
          <Input
            type="date"
            className="rounded-full bg-gray-50"
            value={endDate}
            onChange={(e) => onChangeEnd?.(e.target.value)}
            aria-label="End date"
          />
        </div>
        <Button
          type="button"
          className="bg-main-gradient px-8 text-white shadow-lg"
          onClick={onGenerate}
        >
          <CalendarCheck2 size={16} className="mr-2" />
          Generate Report
        </Button>
      </div>
    </section>
  );
}

export default FilterBar;

