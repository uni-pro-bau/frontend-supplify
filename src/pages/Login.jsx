import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';
import { Separator } from '../components/ui/separator.jsx';
import { api } from '../api/http.js';

const GoogleLogo = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 533.5 544.3"
    aria-hidden="true"
  >
    <path
      fill="#4285f4"
      d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272.1v95.3h147.4c-6.4 34.4-25.8 63.6-55 83.1v68.8h88.7c51.9-47.7 80.3-118 80.3-196.9z"
    />
    <path
      fill="#34a853"
      d="M272.1 544.3c74.8 0 137.5-24.7 183.3-67.1l-88.7-68.8c-24.6 16.5-56.1 26-94.6 26-72.8 0-134.5-49.2-156.6-115.3H23.8v72.5c45.2 89.6 137.7 152.7 248.3 152.7z"
    />
    <path
      fill="#fbbc05"
      d="M115.5 319.1c-5.6-16.5-8.8-34.2-8.8-52.3s3.2-35.8 8.8-52.3V142H23.8C8.5 175.3 0 214.4 0 256.8s8.5 81.5 23.8 114.8l91.7-52.5z"
    />
    <path
      fill="#ea4335"
      d="M272.1 107.7c40.7 0 77.2 14 106 41.4l79.3-79.3C409.3 24.1 346.6 0 272.1 0 161.5 0 68.9 63.1 23.8 152.7l91.7 72.5c22.1-66.1 83.8-117.5 156.6-117.5z"
    />
  </svg>
);

const AppleLogo = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 814 1000"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M788 725c-13 30-28 57-45 82-24 35-44 59-60 74-24 22-49 33-76 33-19 0-42-5-68-16-26-11-50-16-72-16-23 0-48 5-74 16-27 11-49 17-66 17-29 1-55-10-79-32-17-15-38-40-63-75-27-38-49-82-66-133-19-55-29-109-29-164 0-60 13-111 40-152 21-33 49-59 84-78 35-19 73-29 113-30 22 0 50 6 85 18 34 12 56 18 66 18 8 0 31-7 70-20 37-13 68-19 92-16 68 6 119 32 153 79-61 37-91 89-91 155 0 51 19 92 57 124-5 15-11 30-18 45ZM607 51c0 44-16 84-48 117-39 41-86 65-137 61a148 148 0 0 1-1-17c0-44 18-84 51-121 16-18 36-32 58-43 22-10 42-16 62-17 1 7 2 13 2 20Z"
    />
  </svg>
);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.post('/auth/login', { email, password });
      navigate('/reports');
    } catch (err) {
      console.error(err);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <section className="flex w-full flex-col bg-white px-10 py-12 lg:w-1/2 lg:px-20">
        <Card className="mt-8 border-0 shadow-none lg:mt-16">
          <CardHeader className="p-0">
            <p className="text-sm font-medium text-gray-500">Sign in to Supplify</p>
            <CardTitle className="text-4xl text-purple-900">Sign in</CardTitle>
          </CardHeader>
          <CardContent className="mt-10 space-y-6 p-0">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-900">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={18} />
                <Input
                  type="email"
                  placeholder="you@email.com"
                  className="pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-900">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={18} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-12 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

            <div className="text-right text-sm font-semibold text-purple-600">
              <a href="#">Forgot password?</a>
            </div>
            <Button className="w-full rounded-2xl text-base" onClick={handleSignIn} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
            <div className="flex items-center gap-4">
              <Separator />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">or</span>
              <Separator />
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full rounded-2xl">
                <GoogleLogo className="mr-3 h-5 w-5" />
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full rounded-2xl">
                <AppleLogo className="mr-3 h-5 w-5" />
                Continue with Apple
              </Button>
            </div>
          </CardContent>
        </Card>
        <p className="mt-auto text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-purple-600">
            Sign up
          </Link>
        </p>
      </section>
      <section className="relative hidden w-1/2 bg-hero-gradient p-16 text-white lg:flex">
        <div className="absolute right-10 top-10 flex items-center gap-3 text-2xl font-black tracking-[0.5em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] uppercase">
          <Sparkles className="h-6 w-6 text-yellow-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
          SUPPLIFY
        </div>
        <div className="m-auto max-w-md text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">inventory management</p>
          <h2 className="mt-6 text-5xl font-semibold leading-tight">
            Bring efficiency to your business <span className="text-pink-200">#withSupplify</span>
          </h2>
          <p className="mt-6 text-lg text-white/80">
            Track products, manage suppliers, and automate your inventory — all in one smart platform.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;

