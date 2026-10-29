'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileBottomNav from '../../components/MobileBottomNav';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function MyAccountPage() {
  const { user, logout, demoLoginBuyer, demoLoginDealer } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {!user ? (
          /* Unauthenticated State Demo Callout */
          <div className={`p-8 sm:p-12 rounded-3xl border text-center my-8 ${
            darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <div className="w-16 h-16 rounded-3xl bg-emerald-600/20 text-emerald-400 text-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              👤
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome to Phone Village
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-emerald-300/80 mt-2 max-w-md mx-auto">
              Sign in or test with instant demo profiles to manage your listings, saved phones, and tech hub enquiries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-105 min-h-[44px] flex items-center justify-center"
              >
                Sign In to Account
              </Link>
              <button
                onClick={demoLoginBuyer}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 font-extrabold text-xs rounded-xl transition-colors min-h-[44px] cursor-pointer"
              >
                Instant Buyer Demo Profile
              </button>
              <button
                onClick={demoLoginDealer}
                className="w-full sm:w-auto px-6 py-3 bg-teal-900/60 hover:bg-teal-900 text-teal-200 border border-teal-700 font-extrabold text-xs rounded-xl transition-colors min-h-[44px] cursor-pointer"
              >
                Instant Verified Dealer Profile
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-8">
            
            {/* User Profile Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-colors ${
              darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-700/30 shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {user.name}
                    </h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'dealer'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-emerald-800/40 text-emerald-300 border border-emerald-700'
                    }`}>
                      {user.role === 'dealer' ? 'Verified Dealer' : 'Individual Buyer'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/80 mt-1">
                    📧 {user.email} &nbsp;·&nbsp; 📞 {user.phone}
                  </p>
                  {user.storeAddress && (
                    <p className="text-[11px] text-emerald-400 mt-1 truncate">
                      📍 {user.storeAddress}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center">
                <Link
                  href="/account/settings"
                  className="px-4 py-2 text-xs font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors min-h-[40px] flex items-center"
                >
                  ⚙️ Settings
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-800 hover:bg-rose-900 rounded-xl transition-colors cursor-pointer min-h-[40px]"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Quick Navigation Hub Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              
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
                  Direct vendor and buyer conversation threads
                </p>
              </Link>

              <Link
                href="/seller/listings"
                className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-600' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">📋</div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                  Seller Inventory
                </h3>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70">
                  Manage your active and sold smartphone ads
                </p>
              </Link>

              <Link
                href="/sell/phones/new"
                className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-600' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">➕</div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                  Post New Phone
                </h3>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70">
                  Publish a phone ad with physical shop address
                </p>
              </Link>

            </div>

          </div>
        )}

      </main>

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
