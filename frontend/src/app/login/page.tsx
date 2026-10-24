'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLoginBuyer, demoLoginDealer } = useAuth();

  const [role, setRole] = useState<'buyer' | 'dealer'>('buyer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getRedirectTarget = (userRole: 'buyer' | 'dealer') => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const target = params.get('redirect');
      if (target) return target;
    }
    return userRole === 'dealer' ? '/sell/phones/new' : '/phones';
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier || !password) {
      setErrorMsg('Please fill in both phone/email and password.');
      return;
    }

    setIsSubmitting(true);

    // Simulate authenticating
    setTimeout(() => {
      setIsSubmitting(false);
      const isEmail = identifier.includes('@');
      
      login({
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        name: isEmail ? identifier.split('@')[0] : 'Phone Village User',
        email: isEmail ? identifier : 'user@phonevillage.ng',
        phone: isEmail ? '+2348030001122' : identifier,
        role: role,
        storeName: role === 'dealer' ? 'Computer Village Hub' : undefined,
        verified: role === 'dealer',
      });

      router.push(getRedirectTarget(role));
    }, 800);
  };

  const handleDemoBuyer = () => {
    demoLoginBuyer();
    router.push(getRedirectTarget('buyer'));
  };

  const handleDemoDealer = () => {
    demoLoginDealer();
    router.push(getRedirectTarget('dealer'));
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-emerald-50/40 text-emerald-950'
    }`}>
      {/* Top Bar Navigation */}
      <header className={`py-4 px-4 sm:px-8 border-b ${
        darkMode ? 'bg-emerald-950/90 border-emerald-800' : 'bg-white border-emerald-100'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
              PV
            </div>
            <span className="font-extrabold text-lg tracking-tight">Phone Village</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                darkMode 
                  ? 'bg-emerald-900 border-emerald-700 text-emerald-200' 
                  : 'bg-emerald-100 border-emerald-200 text-emerald-900'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            <Link
              href="/"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 my-8">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-2xl border shadow-2xl transition-colors ${
          darkMode 
            ? 'bg-emerald-950/90 border-emerald-800 text-white' 
            : 'bg-white border-emerald-200 text-emerald-950'
        }`}>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full mb-2">
              <span>Secure Marketplace Login</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-xs text-emerald-600 mt-1">Sign in to manage your phone listings and inquiries</p>
          </div>

          {/* Account Role Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-emerald-900/10 border border-emerald-800/20 rounded-xl mb-6 text-xs">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`py-2 text-center font-bold rounded-lg transition-colors cursor-pointer ${
                role === 'buyer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-950'
              }`}
            >
              Phone Buyer
            </button>
            <button
              type="button"
              onClick={() => setRole('dealer')}
              className={`py-2 text-center font-bold rounded-lg transition-colors cursor-pointer ${
                role === 'dealer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-950'
              }`}
            >
              Verified Dealer
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 bg-emerald-800 text-white text-xs font-bold rounded-lg border border-emerald-600">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {/* Phone or Email */}
            <div>
              <label className="block font-bold mb-1 text-emerald-700">
                {role === 'dealer' ? 'Business Phone or Email' : 'Phone Number or Email'}
              </label>
              <input
                type="text"
                placeholder={role === 'dealer' ? 'e.g., +2348031234567 or shop@computer-village.ng' : 'e.g., +2348012345678 or name@gmail.com'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                  darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-emerald-700">Password</label>
                <a href="#" className="text-[11px] font-semibold text-emerald-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-xs font-semibold text-emerald-600 hover:text-emerald-500 cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="font-semibold text-emerald-700 cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span>Signing In...</span>
              ) : (
                <span>Sign In as {role === 'dealer' ? 'Verified Dealer' : 'Buyer'}</span>
              )}
            </button>
          </form>

          {/* Quick Demo Login Shortcut */}
          <div className="mt-6 pt-6 border-t border-emerald-800/20 text-center space-y-2">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
              Instant Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleDemoBuyer}
                className="py-2 px-2 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Demo Buyer
              </button>
              <button
                type="button"
                onClick={handleDemoDealer}
                className="py-2 px-2 bg-emerald-900 text-white hover:bg-emerald-800 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Demo Dealer
              </button>
            </div>
          </div>

          {/* Register Redirect */}
          <p className="text-center text-xs font-semibold text-emerald-700 mt-6">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="text-emerald-600 font-extrabold hover:underline">
              Create New Account
            </Link>
          </p>

        </div>
      </main>

      {/* Clean Footer */}
      <footer className="py-4 text-center text-xs text-emerald-700 border-t border-emerald-100">
        <p>© {new Date().getFullYear()} Phone Village Nigeria · Green & White Verified Security</p>
      </footer>
    </div>
  );
}
