import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';
import { api } from '../api/http.js';

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Saudi Arabia',
  'United Arab Emirates',
  'India',
  'Australia',
  'Japan',
];

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      setError(null);
      await api.post('/auth/register', form);
      navigate('/reports');
    } catch (err) {
      console.error(err);
      setError('Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <section className="flex w-full flex-col bg-white px-10 py-12 lg:w-1/2 lg:px-20">
        <Card className="mt-8 border-0 shadow-none lg:mt-16">
          <CardHeader className="p-0 space-y-2">
            <p className="text-sm font-medium text-gray-500">Create your Supplify account</p>
            <CardTitle className="text-4xl text-purple-900">Get started free</CardTitle>
          </CardHeader>

          <CardContent className="mt-10 space-y-6 p-0">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-900" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-900" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-900" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-900" htmlFor="country">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-fuchsia-200"
              >
                <option value="" disabled>
                  Select your country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <Button className="w-full rounded-2xl text-base" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating account…' : 'Sign up for FREE'}
            </Button>

            {error && <p className="text-xs font-medium text-rose-600">{error}</p>}

            <p className="text-xs text-gray-500">
              By creating your account, you agree to the{' '}
              <a href="#" className="font-semibold text-purple-600 underline-offset-4 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-purple-600 underline-offset-4 hover:underline">
                Privacy Notice
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <p className="mt-auto text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-purple-600">
            Sign in
          </Link>
          {' • '}
          <Link to="/" className="font-semibold text-purple-600">
            Back to home
          </Link>
        </p>
      </section>

      <section className="relative hidden w-1/2 bg-hero-gradient p-16 text-white lg:flex">
        <Link to="/" className="absolute right-10 top-10 flex items-center gap-3 text-2xl font-black uppercase tracking-[0.5em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:opacity-80 transition-opacity cursor-pointer">
          <Sparkles className="h-6 w-6 text-yellow-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
          SUPPLIFY
        </Link>
        <div className="m-auto max-w-md text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">Creative workspace</p>
          <h2 className="mt-6 text-5xl font-semibold leading-tight">
            Bring ideas to life <span className="text-pink-200">#withMake</span>
          </h2>
          <p className="mt-6 text-lg text-white/80">
            Build powerful automations, connect apps seamlessly, and accelerate your team’s impact
            with Supplify’s intuitive toolkit.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;

