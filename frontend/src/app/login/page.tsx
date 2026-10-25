'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLoginBuyer, demoLoginDealer } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [role, setRole] = useState<'buyer' | 'dealer'>('buyer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier || !password) {
      setErrorMsg('Please fill in both phone/email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login({
        id: `usr-${Date.now()}`,
        name: role === 'dealer' ? 'Emeka Okafor' : 'Victor Tobi',
        email: identifier.includes('@') ? identifier : `${identifier}@phonevillage.ng`,
        phone: identifier.includes('@') ? '+2348039871234' : identifier,
        role,
        storeName: role === 'dealer' ? 'Apex Gadgets Hub Ltd' : undefined,
        storeAddress: role === 'dealer' ? 'Shop B12, Medical Road, Computer Village, Ikeja' : undefined,
      });
      setIsSubmitting(false);
      router.push(role === 'dealer' ? '/seller/listings' : '/phones');
    }, 600);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-emerald-50/40 text-emerald-950'
    }`}>
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
              onClick={toggleDarkMode}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                darkMode ? 'bg-emerald-900 border-emerald-700 text-emerald-200' : 'bg-emerald-100 border-emerald-200 text-emerald-900'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <Link href="/" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">
              ← Marketplace
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 my-8">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl transition-colors ${
          darkMode ? 'bg-emerald-950/90 border-emerald-800 text-white' : 'bg-white border-emerald-200 text-emerald-950'
        }`}>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full mb-2 border border-emerald-800">
              <span>Secure Marketplace Login</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-xs text-emerald-300/80 mt-1">Sign in to manage your phone listings and store enquiries</p>
          </div>

          {/* Account Role Selector */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-emerald-900/40 border border-emerald-800/60 rounded-2xl mb-6 text-xs">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`py-2 text-center font-bold rounded-xl transition-all ${
                role === 'buyer' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-300 hover:text-white'
              }`}
            >
              Buyer Profile
            </button>
            <button
              type="button"
              onClick={() => setRole('dealer')}
              className={`py-2 text-center font-bold rounded-xl transition-all ${
                role === 'dealer' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-300 hover:text-white'
              }`}
            >
              Verified Dealer
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1.5">
                Phone Number or Email
              </label>
              <input
                type="text"
                required
                placeholder="+2348012345678 or name@example.ng"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[11px] text-emerald-400 font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none pr-10 ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-xs opacity-60 hover:opacity-100"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all min-h-[44px]"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Account'}
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-6 border-t border-emerald-900/60 space-y-2">
            <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Instant 1-Click Demo Profiles
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  demoLoginBuyer();
                  router.push('/phones');
                }}
                className="p-2 text-xs font-bold rounded-xl border border-emerald-800 bg-emerald-950 text-emerald-300 hover:bg-emerald-900"
              >
                Demo Buyer
              </button>
              <button
                type="button"
                onClick={() => {
                  demoLoginDealer();
                  router.push('/seller/listings');
                }}
                className="p-2 text-xs font-bold rounded-xl border border-emerald-700 bg-emerald-800 text-white hover:bg-emerald-700"
              >
                Demo Dealer
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            New to Phone Village?{' '}
            <Link href="/register" className="text-emerald-400 font-extrabold hover:underline">
              Create Account
            </Link>
          </p>

        </div>
      </main>

      <footer className="py-4 text-center text-xs text-emerald-400/80 border-t border-emerald-900/40">
        <p>© {new Date().getFullYear()} Phone Village Nigeria · Secure Platform</p>
      </footer>
      <MobileBottomNav />
    </div>
  );
}
