import { Link, NavLink } from 'react-router-dom';
import { Boxes, BarChart3, Building2, LogOut } from 'lucide-react';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white px-6 py-8 shadow-sm md:flex">
        <Link to="/" className="mb-12 flex items-center gap-3 group">
          <span className="h-10 w-10 rounded-xl bg-main-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold text-purple-900">Supplify</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-2">
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-purple-50 text-purple-700 shadow-sm border-l-4 border-purple-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
              }`
            }
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-purple-50 text-purple-700 shadow-sm border-l-4 border-purple-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
              }`
            }
          >
            <Boxes size={20} />
            <span>Products</span>
          </NavLink>
          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-purple-50 text-purple-700 shadow-sm border-l-4 border-purple-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
              }`
            }
          >
            <Building2 size={20} />
            <span>Suppliers</span>
          </NavLink>
        </nav>
        <Link
          to="/login"
          className="mt-auto inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 border border-transparent hover:border-rose-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
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

