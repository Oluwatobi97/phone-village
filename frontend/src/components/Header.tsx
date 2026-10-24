'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
      darkMode 
        ? 'bg-emerald-950/90 border-emerald-800/80 text-white' 
        : 'bg-white/95 border-emerald-100 text-emerald-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand Wordmark */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-bold tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
            PV
          </div>
          <span className="font-extrabold tracking-tight">Phone Village</span>
        </Link>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className={`hidden md:flex items-center gap-6 text-sm font-medium ${
          darkMode ? 'text-emerald-200' : 'text-emerald-900'
        }`}>
          <Link 
            href="/phones" 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0"
          >
            Marketplace
          </Link>
          <Link 
            href="/account/favourites" 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0"
          >
            Saved Phones
          </Link>
          <Link 
            href="/account/messages" 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0"
          >
            Enquiries
          </Link>
          {user?.role === 'dealer' || user?.storeName ? (
            <Link 
              href="/seller/listings" 
              className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 font-bold text-emerald-400"
            >
              My Listings
            </Link>
          ) : (
            <Link 
              href="/seller/onboarding" 
              className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0"
            >
              Start Selling
            </Link>
          )}
        </nav>

        {/* Zone 3: User Auth / Account Badge & Dark Mode */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleDarkMode}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
              darkMode 
                ? 'bg-emerald-900/80 border-emerald-700 text-emerald-200 hover:bg-emerald-800' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <span>{darkMode ? '☀️ Light' : '🌙 Dark'}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link 
                href="/account"
                className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  darkMode ? 'bg-emerald-900 border-emerald-700 text-white hover:bg-emerald-800' : 'bg-emerald-100 border-emerald-200 text-emerald-950 hover:bg-emerald-200'
                }`}
              >
                <span className="text-emerald-500">👤</span>
                <span>{user.storeName || user.name}</span>
                {user.verified && <span className="text-[10px] text-emerald-400 font-extrabold">(Verified)</span>}
              </Link>

              <button
                onClick={logout}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login"
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-emerald-950 border-emerald-700 text-emerald-200 hover:bg-emerald-900' 
                    : 'bg-white border-emerald-200 text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                Sign In
              </Link>

              <Link 
                href="/register"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
