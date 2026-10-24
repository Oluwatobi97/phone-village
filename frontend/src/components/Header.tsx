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

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <button 
            onClick={() => scrollTo('listings-section')} 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Discover
          </button>
          <button 
            onClick={() => scrollTo('phone-finder')} 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Phone Finder
          </button>
          <button 
            onClick={() => scrollTo('deal-comparison')} 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Deal Matrix
          </button>
          <button 
            onClick={() => scrollTo('verified-sellers')} 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Verified Dealers
          </button>
          <button 
            onClick={() => scrollTo('safety-guide')} 
            className="hover:text-emerald-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Safety Rules
          </button>
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
              <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${
                darkMode ? 'bg-emerald-900 border-emerald-700 text-white' : 'bg-emerald-100 border-emerald-200 text-emerald-950'
              }`}>
                <span className="text-emerald-600 mr-1">●</span>
                <span>{user.storeName || user.name}</span>
                {user.verified && <span className="ml-1 text-[10px] text-emerald-500 font-extrabold">(Verified)</span>}
              </div>

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
