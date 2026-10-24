'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function MyAccountPage() {
  const { user, logout, demoLoginBuyer, demoLoginDealer } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <div className={`min-h-screen font-sans transition-colors ${darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        darkMode ? 'bg-emerald-950/90 border-emerald-800/80 text-white' : 'bg-white/95 border-emerald-100 text-emerald-950'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
              PV
            </div>
            <span className="font-extrabold tracking-tight">Phone Village</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-emerald-600 dark:text-emerald-300">
            <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <Link href="/phones" className="hover:text-emerald-500 transition-colors">Browse Marketplace</Link>
            <span className="text-emerald-500 font-bold underline underline-offset-4">My Account</span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                darkMode ? 'bg-emerald-900/80 border-emerald-700 text-emerald-200 hover:bg-emerald-800' : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            {user && (
              <button
                onClick={logout}
                className="px-3.5 py-1.5 text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-lg hover:bg-rose-900 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!user ? (
          /* Unauthenticated State Banner */
          <div className={`p-8 sm:p-12 rounded-2xl border text-center my-8 ${
            darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4">
              👤
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Sign In to Access Your Account
            </h1>
            <p className="text-xs text-slate-500 dark:text-emerald-300/80 max-w-md mx-auto mb-6">
              Manage your saved phones, buyer-seller messages, store profile, and account security preferences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="px-6 py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md"
              >
                Sign In to Account
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 text-xs font-bold text-emerald-300 bg-emerald-900/40 border border-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors"
              >
                Create New Account
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-800/40 max-w-sm mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-3">
                Quick Demo Access
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={demoLoginBuyer}
                  className="py-2.5 px-3 bg-emerald-800/40 hover:bg-emerald-800 border border-emerald-700 font-bold text-emerald-200 rounded-xl transition-colors cursor-pointer"
                >
                  Demo Buyer
                </button>
                <button
                  onClick={demoLoginDealer}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-white rounded-xl transition-colors cursor-pointer"
                >
                  Demo Dealer
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Signed In Account View */
          <div className="space-y-8">
            {/* User Profile Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
              darkMode ? 'bg-gradient-to-br from-emerald-950 via-emerald-900/60 to-[#021B12] border-emerald-800/80 shadow-xl' : 'bg-white border-emerald-100 shadow-md'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {user.storeName || user.name}
                    </h1>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      user.role === 'dealer'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-emerald-800/40 text-emerald-300 border border-emerald-700'
                    }`}>
                      {user.role === 'dealer' ? 'Verified Dealer' : 'Individual Buyer'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/80">
                    📧 {user.email} &nbsp;·&nbsp; 📞 {user.phone}
                  </p>
                  {user.storeAddress && (
                    <p className="text-[11px] text-emerald-400/80 mt-1 truncate">
                      📍 {user.storeAddress}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <Link
                  href="/account/settings"
                  className="px-4 py-2 text-xs font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors"
                >
                  ⚙️ Settings
                </Link>
              </div>
            </div>

            {/* Quick Navigation Hub Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Tile 1: Saved Favourites */}
              <Link
                href="/account/favourites"
                className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-600' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">❤️</div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                  Saved Phones
                </h3>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70">
                  View and manage your saved phone listings
                </p>
              </Link>

              {/* Tile 2: Enquiries & Messages */}
              <Link
                href="/account/messages"
                className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-600' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                  Enquiries & Chat
                </h3>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70">
                  Buyer-seller messaging and deal discussions
                </p>
              </Link>

              {/* Tile 3: My Listings or Seller Onboarding */}
              {user.role === 'dealer' || user.storeName ? (
                <Link
                  href="/seller/listings"
                  className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                    darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-600' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">🏪</div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                    My Phone Listings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/70">
                    Manage active listings, prices, and status
                  </p>
                </Link>
              ) : (
                <Link
                  href="/seller/onboarding"
                  className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-700/80 hover:border-emerald-500' : 'bg-emerald-50 border-emerald-200 shadow-sm'
                  }`}
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <h3 className="font-extrabold text-sm text-emerald-900 dark:text-white mb-1">
                    Start Selling Phones
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Setup store profile & list smartphones
                  </p>
                </Link>
              )}

              {/* Tile 4: Settings */}
              <Link
                href="/account/settings"
                className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-600' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">⚙️</div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                  Account Settings
                </h3>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70">
                  Update password, contact details & privacy
                </p>
              </Link>
            </div>

            {/* Recent Activity Section */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
            }`}>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Account Activity Overview</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-900/20 border border-emerald-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-base">🛡️</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">Account Verification</strong>
                      <span className="text-slate-500 dark:text-emerald-300/70">Email & phone number authenticated for marketplace trust.</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-900/20 border border-emerald-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-base">📍</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">Tech Region Location</strong>
                      <span className="text-slate-500 dark:text-emerald-300/70">Lagos Commercial Region (Computer Village & VI).</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
