'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [accountType, setAccountType] = useState<'buyer' | 'dealer'>('buyer');
  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('+234');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login({
        id: `usr-${Date.now()}`,
        name: fullName,
        email,
        phone,
        role: accountType,
        storeName: accountType === 'dealer' ? storeName : undefined,
        storeAddress: accountType === 'dealer' ? address : undefined,
      });
      setIsSubmitting(false);
      router.push(accountType === 'dealer' ? '/seller/onboarding' : '/phones');
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
        <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl transition-colors ${
          darkMode ? 'bg-emerald-950/90 border-emerald-800 text-white' : 'bg-white border-emerald-200 text-emerald-950'
        }`}>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full mb-2 border border-emerald-800">
              <span>Verified Account Creation</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Join Phone Village</h1>
            <p className="text-xs text-emerald-300/80 mt-1">Create your buyer or verified dealer profile in Nigeria</p>
          </div>

          {/* Account Type Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-emerald-900/40 border border-emerald-800/60 rounded-2xl mb-6 text-xs">
            <button
              type="button"
              onClick={() => setAccountType('buyer')}
              className={`py-2 text-center font-bold rounded-xl transition-all ${
                accountType === 'buyer' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-300 hover:text-white'
              }`}
            >
              Individual Buyer
            </button>
            <button
              type="button"
              onClick={() => setAccountType('dealer')}
              className={`py-2 text-center font-bold rounded-xl transition-all ${
                accountType === 'dealer' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-300 hover:text-white'
              }`}
            >
              Store Dealer
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Victor Tobi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                }`}
              />
            </div>

            {accountType === 'dealer' && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1.5">
                  Store / Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Gadgets Hub Ltd"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="+2348012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all min-h-[44px]"
            >
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Already registered?{' '}
            <Link href="/login" className="text-emerald-400 font-extrabold hover:underline">
              Sign In to Your Account
            </Link>
          </p>

        </div>
      </main>

      <footer className="py-4 text-center text-xs text-emerald-400/80 border-t border-emerald-900/40">
        <p>© {new Date().getFullYear()} Phone Village Nigeria · Green & White Verified Security</p>
      </footer>
      <MobileBottomNav />
    </div>
  );
}
