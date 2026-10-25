'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Phone3DCanvas from './Phone3DCanvas';

interface HeroProps {
  darkMode: boolean;
  onSearch: (query: string) => void;
}

export default function Hero({ darkMode, onSearch }: HeroProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <section className={`relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b transition-colors ${
      darkMode 
        ? 'bg-gradient-to-b from-[#021B12] via-[#032318] to-[#021B12] border-emerald-950 text-white' 
        : 'bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/30 border-emerald-100 text-emerald-950'
    }`}>
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-900/40 text-emerald-300 border border-emerald-700/60 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Nigeria Tech Hub Connection · 100% Verified Stores</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Buy & Sell Phones Safely Across <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">Nigeria Tech Hubs</span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-200/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Skip the middleman scams. Browse authentic smartphones directly from certified brick-and-mortar stores in <strong className="text-emerald-300 font-bold">Computer Village Ikeja</strong>, <strong className="text-emerald-300 font-bold">Banex Plaza Abuja</strong>, and <strong className="text-emerald-300 font-bold">Garrison Port Harcourt</strong>.
            </p>

            {/* Live Search Bar */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto lg:mx-0">
              <div className={`p-1.5 rounded-2xl border shadow-xl flex items-center gap-2 backdrop-blur-md transition-colors ${
                darkMode ? 'bg-emerald-950/80 border-emerald-800' : 'bg-white border-emerald-200 shadow-emerald-900/5'
              }`}>
                <div className="pl-3 text-lg opacity-70">🔍</div>
                <input
                  type="text"
                  placeholder="Search iPhone 15, S24 Ultra, Camon 30, UK Used..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none placeholder:text-emerald-300/50 min-h-[44px]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-700/30 shrink-0 min-h-[44px]"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular quick links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="text-emerald-400/80 font-bold">Popular:</span>
              <button
                onClick={() => onSearch('iPhone')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:border-emerald-500 text-[11px] font-semibold"
              >
                iPhone 15 Pro
              </button>
              <button
                onClick={() => onSearch('Samsung')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:border-emerald-500 text-[11px] font-semibold"
              >
                Samsung S24
              </button>
              <button
                onClick={() => onSearch('UK Used')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:border-emerald-500 text-[11px] font-semibold"
              >
                UK Used 90%+ Battery
              </button>
              <button
                onClick={() => onSearch('Pixel')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:border-emerald-500 text-[11px] font-semibold"
              >
                Pixel 8
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-900/60 text-left">
              <div className="p-2 sm:p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
                <p className="text-base sm:text-lg font-black text-emerald-400">100%</p>
                <p className="text-[10px] sm:text-xs text-emerald-200/80 font-medium leading-tight">Physical Verified Store Locations</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
                <p className="text-base sm:text-lg font-black text-emerald-400">₦0 Fee</p>
                <p className="text-[10px] sm:text-xs text-emerald-200/80 font-medium leading-tight">Direct WhatsApp & In-Store Purchase</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
                <p className="text-base sm:text-lg font-black text-emerald-400">IMEI Safe</p>
                <p className="text-[10px] sm:text-xs text-emerald-200/80 font-medium leading-tight">Free Battery & Blacklist Check Guide</p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Smartphone Interactive Canvas */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md p-4 rounded-3xl bg-emerald-950/30 border border-emerald-800/60 backdrop-blur-md shadow-2xl relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-black tracking-wider uppercase text-emerald-300">
                    Live 3D Hardware Inspector
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/80 px-2 py-0.5 rounded-md border border-emerald-700">
                  WebGL 60FPS
                </span>
              </div>

              {/* Three.js Canvas */}
              <Phone3DCanvas />

              {/* Action shortcuts */}
              <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center justify-between text-xs">
                <Link
                  href="/phones"
                  className="font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>Browse 150+ Flagships</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/sell/phones/new"
                  className="font-extrabold text-white bg-emerald-700/80 hover:bg-emerald-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Sell Phone
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
