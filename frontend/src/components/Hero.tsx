'use client';

import React, { useState, useEffect } from 'react';

interface HeroProps {
  darkMode: boolean;
  onSearch: (query: string) => void;
}

const FEATURED_SPOTLIGHTS = [
  {
    id: 's26-ultra',
    name: 'Samsung Galaxy S26 Ultra',
    priceUsd: '$1,299 USD',
    priceNgn: '₦2,200,000',
    tag: 'FEATURED 2026 WORLD RELEASE',
    headline: '200MP Quad Camera & Anti-Reflective Armor Glass',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'iphone-18',
    name: 'iPhone 18 Pro Max',
    priceUsd: '$1,199 USD',
    priceNgn: '₦2,350,000',
    tag: 'APPLE SPECIAL EVENT',
    headline: 'A18 Pro 3nm Silicon & Dedicated Camera Control',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'xiaomi-15',
    name: 'Xiaomi 15 Ultra',
    priceUsd: '$1,099 USD',
    priceNgn: '₦1,850,000',
    tag: 'LEICA OPTICS BREAKTHROUGH',
    headline: '200MP Leica Zoom & 6,000mAh Silicon-Carbon Battery',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'honor-v3',
    name: 'Honor Magic V3 Foldable',
    priceUsd: '$1,499 USD',
    priceNgn: '₦2,400,000',
    tag: 'WORLD THINNEST FOLDABLE',
    headline: '9.2mm Ultra-Slim Folded Body & IPX8 Protection',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'pixel-9-pro',
    name: 'Google Pixel 9 Pro XL',
    priceUsd: '$1,099 USD',
    priceNgn: '₦1,550,000',
    tag: 'COMPUTATIONAL AI LEAD',
    headline: '16GB RAM for Local Gemini AI & Magic Editor',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80'
  }
];

export default function Hero({ darkMode, onSearch }: HeroProps) {
  const [searchInput, setSearchInput] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotating timer slideshow every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % FEATURED_SPOTLIGHTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const current = FEATURED_SPOTLIGHTS[activeSlide];

  return (
    <section className={`relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b transition-colors ${
      darkMode 
        ? 'bg-gradient-to-b from-[#021B12] via-[#032318] to-[#021B12] border-emerald-950 text-white' 
        : 'bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 border-slate-200/80 text-slate-900'
    }`}>
      {/* Background glow effects */}
      <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        darkMode ? 'bg-emerald-500/10' : 'bg-emerald-400/10'
      }`} />
      <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        darkMode ? 'bg-teal-500/10' : 'bg-teal-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold border backdrop-blur-md ${
              darkMode 
                ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700/60' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200/80 shadow-xs'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                darkMode ? 'bg-emerald-400' : 'bg-emerald-600'
              }`} />
              <span>Direct Nigeria Tech Hub Connection · 100% Verified Stores</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Buy & Sell Phones Safely Across{' '}
              <span className={darkMode 
                ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 bg-clip-text text-transparent'
              }>
                Nigeria Tech Hubs
              </span>
            </h1>

            <p className={`text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal ${
              darkMode ? 'text-emerald-200/90' : 'text-slate-600'
            }`}>
              Skip the middleman scams. Browse authentic smartphones directly from certified brick-and-mortar stores in <strong className={darkMode ? 'text-emerald-300' : 'text-emerald-800 font-bold'}>Computer Village Ikeja</strong>, <strong className={darkMode ? 'text-emerald-300' : 'text-emerald-800 font-bold'}>Banex Plaza Abuja</strong>, and <strong className={darkMode ? 'text-emerald-300' : 'text-emerald-800 font-bold'}>Garrison Port Harcourt</strong>.
            </p>

            {/* Live Search Bar */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto lg:mx-0">
              <div className={`p-1.5 rounded-2xl border flex items-center gap-2 transition-all ${
                darkMode 
                  ? 'bg-emerald-950/80 border-emerald-800 backdrop-blur-md shadow-xl' 
                  : 'bg-white border-slate-300 shadow-lg shadow-slate-200/60 text-slate-900'
              }`}>
                <div className="pl-3 text-lg opacity-70">🔍</div>
                <input
                  type="text"
                  placeholder="Search iPhone 15, S24 Ultra, Camon 30, UK Used..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none min-h-[44px] ${
                    darkMode 
                      ? 'text-white placeholder:text-emerald-300/50' 
                      : 'text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 shrink-0 min-h-[44px] cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular quick links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className={`font-bold ${darkMode ? 'text-emerald-400/80' : 'text-slate-500'}`}>Popular:</span>
              {['iPhone 15 Pro', 'Samsung S24', 'UK Used 90%+ Battery', 'Pixel 8'].map((term) => (
                <button
                  key={term}
                  onClick={() => onSearch(term.split(' ')[0])}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                    darkMode 
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:border-emerald-500' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 shadow-2xs'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Trust Badges Bar */}
            <div className={`grid grid-cols-3 gap-3 pt-4 border-t text-left ${
              darkMode ? 'border-emerald-900/60' : 'border-slate-200/80'
            }`}>
              <div className={`p-2.5 sm:p-3 rounded-xl border ${
                darkMode ? 'bg-emerald-950/40 border-emerald-900/60' : 'bg-white border-slate-200/80 shadow-xs'
              }`}>
                <p className={`text-base sm:text-lg font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>100%</p>
                <p className={`text-[10px] sm:text-xs font-medium leading-tight ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>Physical Verified Store Locations</p>
              </div>
              <div className={`p-2.5 sm:p-3 rounded-xl border ${
                darkMode ? 'bg-emerald-950/40 border-emerald-900/60' : 'bg-white border-slate-200/80 shadow-xs'
              }`}>
                <p className={`text-base sm:text-lg font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>₦0 Fee</p>
                <p className={`text-[10px] sm:text-xs font-medium leading-tight ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>Direct WhatsApp & In-Store Purchase</p>
              </div>
              <div className={`p-2.5 sm:p-3 rounded-xl border ${
                darkMode ? 'bg-emerald-950/40 border-emerald-900/60' : 'bg-white border-slate-200/80 shadow-xs'
              }`}>
                <p className={`text-base sm:text-lg font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>IMEI Safe</p>
                <p className={`text-[10px] sm:text-xs font-medium leading-tight ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>Free Battery & Blacklist Check Guide</p>
              </div>
            </div>

          </div>

          {/* Right Column: Auto-Rotating High-Impact Tech Radar Showcase */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className={`w-full h-full flex flex-col justify-between p-6 sm:p-7 rounded-3xl border transition-all ${
              darkMode 
                ? 'bg-emerald-950/40 border-emerald-800/80 backdrop-blur-md shadow-2xl text-white' 
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 text-slate-900'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-500">
                      Auto-Rotating Tech Radar
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    Slide {activeSlide + 1} of {FEATURED_SPOTLIGHTS.length}
                  </span>
                </div>

                {/* Showcase Banner with Tall Height & Auto Slide Image Transition */}
                <div className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-800/80 mb-4 group">
                  <img
                    key={current.id}
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 animate-in fade-in"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  {/* Overlay text */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-black text-emerald-400 mb-0.5">
                      <span className="uppercase tracking-wider">{current.tag}</span>
                      <span>{current.priceUsd}</span>
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg leading-tight drop-shadow-xs">
                      {current.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {current.headline}
                    </p>
                  </div>

                  {/* Slide Indicators Dots */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                    {FEATURED_SPOTLIGHTS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeSlide === i ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white'
                        }`}
                        title={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Ticker List displaying active selection */}
                <div className="space-y-1.5 text-xs mb-4">
                  {FEATURED_SPOTLIGHTS.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSlide(i)}
                      className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl transition-all text-left cursor-pointer border ${
                        activeSlide === i
                          ? darkMode 
                            ? 'bg-emerald-900/60 border-emerald-600 text-white font-bold' 
                            : 'bg-emerald-50 border-emerald-300 text-slate-900 font-bold'
                          : 'border-transparent text-slate-500 dark:text-emerald-300/60 hover:text-slate-900 dark:hover:text-emerald-200'
                      }`}
                    >
                      <span className="truncate pr-2">{item.name}</span>
                      <span className="font-mono font-extrabold text-[11px] shrink-0 text-emerald-600 dark:text-emerald-400">
                        {item.priceUsd}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Jump Button */}
              <a
                href="#global-phones-section"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span className="w-full text-center">View All Latest Global Phones & Specs →</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
