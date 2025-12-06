import { Link, NavLink } from 'react-router-dom';
import { ArrowLeft, Boxes, BarChart3, Building2 } from 'lucide-react';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <aside className="hidden w-60 flex-col border-r border-gray-200 bg-white px-5 py-6 shadow-card/40 md:flex">
        <Link to="/reports" className="mb-10 flex items-center gap-2 text-lg font-bold text-purple-900">
          <span className="h-8 w-8 rounded-full bg-main-gradient" />
          <span>Supplify</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 text-sm">
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-3 py-2 font-medium ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            <BarChart3 size={16} />
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-3 py-2 font-medium ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            <Boxes size={16} />
            Products
          </NavLink>
          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-3 py-2 font-medium ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            <Building2 size={16} />
            Suppliers
          </NavLink>
        </nav>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-purple-700">
          <ArrowLeft size={14} />
          Logout
        </Link>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <p className="text-sm font-semibold tracking-tight text-purple-600">Supplify Control Center</p>
            <span className="hidden text-xs font-medium uppercase tracking-[0.25em] text-gray-400 md:inline">
              Inventory & suppliers
            </span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;

