'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileBottomNav from '../../../components/MobileBottomNav';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

export default function AccountSettingsPage() {
  const { user, login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [storeName, setStoreName] = useState(user?.storeName || '');
  const [storeAddress, setStoreAddress] = useState(user?.storeAddress || '');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: user?.id || `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: user?.role || 'buyer',
      storeName,
      storeAddress,
    });
    setToastMsg('Profile changes saved successfully.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
          <span>✅</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-4">
          <Link href="/account" className="hover:underline">My Account</Link>
          <span>/</span>
          <span>Settings</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-emerald-300/80 mb-8">
          Manage your personal profile details, notification preferences, and store address.
        </p>

        <form onSubmit={handleSave} className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-emerald-200'
        }`}>
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                }`}
              />
            </div>
          </div>

          {user?.role === 'dealer' && (
            <div className="space-y-4 pt-4 border-t border-emerald-900/60">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Dealer Shop Information
              </h3>
              <div>
                <label className="text-xs font-bold text-emerald-300 block mb-1.5">
                  Store Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-emerald-300 block mb-1.5">
                  Physical Store Address
                </label>
                <input
                  type="text"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all min-h-[44px]"
          >
            Save Profile Changes
          </button>
        </form>

      </main>

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
