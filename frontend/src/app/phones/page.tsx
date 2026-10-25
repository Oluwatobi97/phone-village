'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileBottomNav from '../../components/MobileBottomNav';
import ListingDetailModal from '../../components/ListingDetailModal';
import { useTheme } from '../../context/ThemeContext';
import { MOCK_LISTINGS } from '../../data/mockData';
import { PhoneListing } from '../../types/phone';

export default function MarketplacePage() {
  const { darkMode, toggleDarkMode } = useTheme();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'battery'>('featured');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Mobile Filter Sheet Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<PhoneListing | null>(null);

  const brands = ['All', 'Apple', 'Samsung', 'Google', 'Tecno', 'Infinix', 'Xiaomi'];
  const conditions = ['All', 'Brand New', 'UK Used', 'Locally Used'];
  const regions = ['All', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'];

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      const matchSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sellerStore.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchBrand = selectedBrand === 'All' || item.brand === selectedBrand;
      const matchCondition = selectedCondition === 'All' || item.condition === selectedCondition;
      const matchRegion = selectedRegion === 'All' || item.hubRegion === selectedRegion;
      const matchPrice = item.priceNgn <= maxPrice;
      const matchVerified = !verifiedOnly || item.verifiedSeller;

      return matchSearch && matchBrand && matchCondition && matchRegion && matchPrice && matchVerified;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
      if (sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
      if (sortBy === 'battery') return (b.batteryHealth || 100) - (a.batteryHealth || 100);
      return 0; // featured
    });
  }, [searchTerm, selectedBrand, selectedCondition, selectedRegion, maxPrice, sortBy, verifiedOnly]);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('All');
    setSelectedCondition('All');
    setSelectedRegion('All');
    setMaxPrice(2000000);
    setVerifiedOnly(false);
    setSortBy('featured');
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-1">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Nigeria Smartphone Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-emerald-300/80 mt-1">
              Showing {filteredListings.length} authentic smartphones from verified Lagos, Abuja & PH stores.
            </p>
          </div>

          {/* Search Bar & Mobile Filter Trigger */}
          <div className="flex items-center gap-2">
            <div className={`relative flex-1 sm:w-64 border rounded-xl p-1.5 flex items-center ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800' : 'bg-white border-emerald-200'
            }`}>
              <span className="pl-2 text-sm opacity-60">🔍</span>
              <input
                type="text"
                placeholder="Search phones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent px-2 text-xs font-semibold outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-xs text-slate-400 pr-2">✕</button>
              )}
            </div>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shrink-0 min-h-[44px]"
            >
              <span>⚙️ Filters</span>
              <span className="w-5 h-5 rounded-full bg-black/40 text-[10px] flex items-center justify-center">
                {(selectedBrand !== 'All' ? 1 : 0) + (selectedCondition !== 'All' ? 1 : 0) + (selectedRegion !== 'All' ? 1 : 0)}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
            <div className={`p-6 rounded-3xl border space-y-6 ${
              darkMode ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-white border-emerald-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <span className="text-sm font-black uppercase tracking-wider text-emerald-400">
                  Filters
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-emerald-300 hover:text-white"
                >
                  Reset
                </button>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                  Brand
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedBrand === brand
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                  Condition
                </label>
                <div className="space-y-1.5">
                  {conditions.map((cond) => (
                    <label
                      key={cond}
                      className="flex items-center gap-2 text-xs font-bold cursor-pointer hover:text-emerald-400"
                    >
                      <input
                        type="radio"
                        name="condition"
                        checked={selectedCondition === cond}
                        onChange={() => setSelectedCondition(cond)}
                        className="accent-emerald-500"
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                    Max Price
                  </label>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    {formatNaira(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="2000000"
                  step="50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Hub Region */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                  Tech Hub
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                >
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg === 'All' ? 'All Hubs (Lagos, Abuja, PH, Ibadan)' : reg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verified Seller Checkbox */}
              <div className="pt-2 border-t border-emerald-900/60">
                <label className="flex items-center gap-2 text-xs font-extrabold cursor-pointer text-emerald-300">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4 rounded"
                  />
                  <span>Verified Dealers Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <section className="lg:col-span-3 space-y-6">
            
            {/* Sort Controls Bar */}
            <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs ${
              darkMode ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-white border-emerald-200 shadow-sm'
            }`}>
              <span className="font-extrabold text-emerald-400">
                {filteredListings.length} Smartphones Available
              </span>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className={`px-3 py-1.5 rounded-xl border font-bold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="battery">Battery Health</option>
                </select>
              </div>
            </div>

            {/* Phone Cards */}
            {filteredListings.length === 0 ? (
              <div className="text-center py-20 p-8 rounded-3xl border border-emerald-900/60 bg-emerald-950/20">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-bold">No phones match your filter criteria</h3>
                <p className="text-xs text-emerald-300/70 mt-1">Try expanding your price range or clearing search filters.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((phone) => (
                  <div
                    key={phone.id}
                    className={`group rounded-3xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl overflow-hidden flex flex-col justify-between ${
                      darkMode 
                        ? 'bg-emerald-950/40 border-emerald-800/60 hover:border-emerald-500' 
                        : 'bg-white border-emerald-200 hover:border-emerald-500 shadow-sm'
                    }`}
                  >
                    <div 
                      className="relative aspect-[4/3] bg-emerald-950/60 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedListing(phone)}
                    >
                      <img
                        src={phone.image}
                        alt={phone.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-emerald-950 bg-emerald-400 shadow-md">
                          {phone.condition}
                        </span>
                        {phone.batteryHealth && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black text-white bg-black/60 backdrop-blur-md border border-white/20">
                            ⚡ {phone.batteryHealth}%
                          </span>
                        )}
                      </div>
                      <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-[10px] font-extrabold text-white bg-black/60 backdrop-blur-md">
                        📍 {phone.hubRegion}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
                          <span>{phone.brand}</span>
                          <span>{phone.storage}</span>
                        </div>

                        <h3
                          onClick={() => setSelectedListing(phone)}
                          className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 hover:text-emerald-400 cursor-pointer transition-colors"
                        >
                          {phone.title}
                        </h3>

                        <p className="mt-2 text-xl font-black text-emerald-400 font-mono tracking-tight">
                          {formatNaira(phone.priceNgn)}
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-emerald-900/40 text-[11px] space-y-0.5">
                          <p className="font-bold text-white truncate">{phone.sellerStore}</p>
                          <p className="text-emerald-300/70 truncate">🏬 {phone.location}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={() => setSelectedListing(phone)}
                          className="py-2.5 px-3 rounded-xl border border-emerald-800 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 text-xs font-bold transition-colors min-h-[40px]"
                        >
                          Quick Specs
                        </button>
                        <a
                          href={`https://wa.me/${phone.sellerWhatsapp}?text=${encodeURIComponent(`Hi ${phone.sellerStore}, is ${phone.title} available for inspection?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold text-center flex items-center justify-center gap-1 min-h-[40px]"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </section>

        </div>

      </main>

      {/* Mobile Slide-up Bottom Sheet for Filters */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-6 border shadow-2xl transition-colors space-y-6 ${
            darkMode ? 'bg-[#021B12] border-emerald-800 text-white' : 'bg-white border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-wider text-emerald-400">
                  Filter Smartphones
                </span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                Brand
              </label>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedBrand === brand
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                Condition
              </label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCondition === cond
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Budget */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  Max Budget
                </label>
                <span className="text-xs font-black text-emerald-400 font-mono">
                  {formatNaira(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="2000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Hub Region */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 block mb-2">
                Tech Hub
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-bold outline-none ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                }`}
              >
                {regions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg === 'All' ? 'All Hubs (Lagos, Abuja, PH, Ibadan)' : reg}
                  </option>
                ))}
              </select>
            </div>

            {/* Apply & Reset Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-900/60">
              <button
                onClick={resetFilters}
                className="py-3 text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800 rounded-xl"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg"
              >
                Show {filteredListings.length} Phones
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        darkMode={darkMode}
      />

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
