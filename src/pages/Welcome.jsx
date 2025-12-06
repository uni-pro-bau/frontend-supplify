import { Link } from 'react-router-dom';
import { Sparkles, Boxes, BarChart3, Building2, Zap } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';

function Welcome() {
  const features = [
    {
      icon: Boxes,
      title: 'Product Management',
      description: 'Track inventory, manage stock levels, and monitor product status in real-time.',
    },
    {
      icon: Building2,
      title: 'Supplier Network',
      description: 'Keep all your supplier contacts organized and easily accessible.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get insights into your inventory with comprehensive reports and charts.',
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Streamline your operations with smart inventory automation.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col">
        <section className="relative w-full bg-hero-gradient p-12 lg:p-20 text-white flex flex-col items-center justify-center min-h-[70vh]">
          <div className="absolute right-10 top-10 flex items-center gap-3 text-2xl font-black tracking-[0.5em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] uppercase">
            <Sparkles className="h-6 w-6 text-yellow-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
            SUPPLIFY
          </div>
          <div className="max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-white/70 mb-4">Welcome to</p>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Supplify
            </h1>
            <p className="text-xl text-white/90 mb-10">
              The complete inventory and supplier management platform for modern businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-white text-purple-900 hover:bg-gray-100 text-xl font-bold py-7 px-8 rounded-2xl shadow-xl">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white/50 text-xl font-bold py-7 px-8 rounded-2xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full p-12 lg:p-20 flex flex-col items-center">
          <div className="max-w-6xl w-full">
            <h2 className="text-3xl font-bold text-purple-900 mb-4 text-center">Everything you need to manage inventory</h2>
            <p className="text-gray-600 mb-12 text-center">
              Supplify helps you track products, manage suppliers, and make data-driven decisions with powerful analytics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <Icon className="text-purple-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Welcome;

