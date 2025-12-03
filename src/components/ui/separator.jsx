import { cn } from '../../lib/utils.js';

function Separator({ className }) {
  return <div className={cn('h-px w-full bg-gray-200', className)} />;
}

export { Separator };

