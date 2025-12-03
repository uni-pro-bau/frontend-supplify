import { Link } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { cn } from '../lib/utils.js';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold text-purple-900">
            <ArrowLeft size={18} />
            Back to Login
          </Link>
          <p className="text-sm font-semibold tracking-tight text-purple-600">Supplify Control Center</p>
          <Button variant="outline" className={cn('hidden md:inline-flex border-purple-600 text-purple-600')}>
            <Menu size={16} className="mr-2" />
            Menu
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}

export default DashboardLayout;

