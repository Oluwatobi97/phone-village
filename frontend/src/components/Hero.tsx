'use client';

import React, { useState } from 'react';
import Phone3DCanvas from './Phone3DCanvas';

interface HeroProps {
  darkMode: boolean;
  onSearchFilter: (filters: { maxPrice: number; brand: string; condition: string }) => void;
}

export default function Hero({ darkMode, onSearchFilter }: HeroProps) {
  const [maxPrice, setMaxPrice] = useState<number>(1500000);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFilter({
      maxPrice,
      brand: selectedBrand,
      condition: selectedCondition,
    });
    const el = document.getElementById('listings-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <section id="phone-finder" className={`relative overflow-hidden py-12 lg:py-16 transition-colors ${
      darkMode 
        ? 'bg-[#021B12] text-white border-b border-emerald-900' 
        : 'bg-emerald-950 text-white border-b border-emerald-900'
    }`}>
      {/* Luminous Emerald Gradient Background Glow */}
      <div className="absolute inset-0 bg-radial from-emerald-600/20 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Interactive 3D Canvas */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-900/80 border border-emerald-700/80 px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nigeria&apos;s Pure Green & White Phone Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Discover Trustworthy Phones & Verified Dealers
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl">
              Compare prices across <strong className="text-white font-bold">Computer Village Ikeja</strong>, Victoria Island, Abuja, and Port Harcourt with 3D device inspection and IMEICheck safety guarantees.
            </p>

            {/* Interactive 3D Phone Model Viewport */}
            <div className="p-3 bg-emerald-900/40 border border-emerald-700/60 rounded-2xl backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-emerald-800 text-xs font-semibold text-emerald-300">
                <span>Interactive 3D Smartphone Viewport</span>
                <span className="text-[10px] text-emerald-400">Drag to Rotate 360°</span>
              </div>
              <Phone3DCanvas darkMode={darkMode} />
            </div>
          </div>

          {/* Right Column: Interactive Phone Finder Wizard */}
          <div className="lg:col-span-6">
            <div className={`border rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md transition-colors ${
              darkMode 
                ? 'bg-emerald-900/60 border-emerald-700/80' 
                : 'bg-emerald-900/90 border-emerald-700/80'
            }`}>
              <div className="flex items-center justify-between border-b border-emerald-800 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Interactive Phone Finder</h2>
                  <p className="text-xs text-emerald-200">Budget, brand, and condition filter matrix</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-700">
                  Green & White Mode
                </span>
              </div>

              <form onSubmit={handleFinderSubmit} className="space-y-6">
                {/* Budget Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                      Maximum Budget Limit
                    </label>
                    <span className="text-lg font-extrabold text-emerald-300 font-mono tabular-nums">
                      {formatNaira(maxPrice)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={50000} 
                    max={1500000} 
                    step={25000} 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[11px] text-emerald-300 mt-1 font-mono">
                    <span>₦50,000</span>
                    <span>₦750,000</span>
                    <span>₦1,500,000+</span>
                  </div>
                </div>

                {/* Brand Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
                    Preferred Smartphone Brand
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Apple', 'Samsung', 'Tecno', 'Infinix', 'Xiaomi'].map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          selectedBrand === brand
                            ? 'bg-emerald-400 text-emerald-950 font-bold shadow-md scale-105'
                            : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-800 hover:text-white'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Condition Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
                    Device Condition
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'All', label: 'Any Condition' },
                      { id: 'Brand New', label: 'Brand New' },
                      { id: 'UK Used', label: 'UK Used' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedCondition(item.id)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          selectedCondition === item.id
                            ? 'bg-emerald-400 border-emerald-300 text-emerald-950 font-bold shadow-md'
                            : 'border-emerald-800 bg-emerald-950/80 text-emerald-200 hover:bg-emerald-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Action Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Filter Phones Under {formatNaira(maxPrice)}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
