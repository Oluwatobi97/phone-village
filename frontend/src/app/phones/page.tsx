'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TiltCard from '../../components/TiltCard';
import ListingDetailModal from '../../components/ListingDetailModal';
import { MOCK_LISTINGS } from '../../data/mockData';
import { PhoneListing } from '../../types/phone';

export default function BrowsePhonesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('price-asc');
  const [selectedListing, setSelectedListing] = useState<PhoneListing | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesLocation = item.location.toLowerCase().includes(q);
        const matchesStore = item.sellerStore.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesLocation && !matchesStore) return false;
      }

      // Max price
      if (item.priceNgn > maxPrice) return false;

      // Brand
      if (selectedBrand !== 'All' && item.brand !== selectedBrand) return false;

      // Condition
      if (selectedCondition !== 'All' && item.condition !== selectedCondition) return false;

      // Region
      if (selectedRegion !== 'All' && item.hubRegion !== selectedRegion) return false;

      // Only verified sellers
      if (onlyVerified && !item.verifiedSeller) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
      if (sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, maxPrice, selectedBrand, selectedCondition, selectedRegion, onlyVerified, sortBy]);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All');
    setSelectedCondition('All');
    setSelectedRegion('All');
    setOnlyVerified(false);
    setMaxPrice(1500000);
    setSortBy('price-asc');
  };

  return (
    <div className={`min-h-screen font-sans transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-slate-50 text-emerald-950'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Browse Phones</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Phone Marketplace Directory
              </h1>
              <p className="text-xs sm:text-sm text-emerald-700 mt-1">
                Explore {filteredListings.length} phones listed across Computer Village Ikeja, Victoria Island, Abuja, and Port Harcourt.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3.5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <span>🔍 Filters ({selectedBrand !== 'All' || selectedCondition !== 'All' ? 'Active' : 'All'})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Filters Sidebar + Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filters Sidebar */}
          <aside className={`hidden lg:block lg:col-span-3 space-y-6 p-5 border rounded-2xl h-fit sticky top-20 ${
            darkMode ? 'bg-emerald-950/80 border-emerald-800' : 'bg-white border-emerald-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between border-b border-emerald-800/30 pb-3">
              <h2 className="text-sm font-extrabold">Filter Inventory</h2>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Maximum Budget */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <label className="font-bold text-emerald-700">Max Budget</label>
                <span className="font-mono font-extrabold text-emerald-600">{formatNaira(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={1500000}
                step={25000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-emerald-900/20 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-bold text-emerald-700 mb-2">Brand</label>
              <div className="space-y-1">
                {['All', 'Apple', 'Samsung', 'Tecno', 'Infinix', 'Xiaomi', 'Google'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-bold transition-colors cursor-pointer flex justify-between items-center ${
                      selectedBrand === b
                        ? 'bg-emerald-600 text-white'
                        : darkMode ? 'text-emerald-200 hover:bg-emerald-900' : 'text-emerald-800 hover:bg-emerald-50'
                    }`}
                  >
                    <span>{b}</span>
                    {selectedBrand === b && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-xs font-bold text-emerald-700 mb-2">Condition</label>
              <div className="grid grid-cols-1 gap-1">
                {['All', 'Brand New', 'UK Used'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCondition(c)}
                    className={`text-left px-3 py-1.5 text-xs rounded-lg font-bold transition-colors cursor-pointer flex justify-between items-center ${
                      selectedCondition === c
                        ? 'bg-emerald-600 text-white'
                        : darkMode ? 'text-emerald-200 hover:bg-emerald-900' : 'text-emerald-800 hover:bg-emerald-50'
                    }`}
                  >
                    <span>{c}</span>
                    {selectedCondition === c && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-xs font-bold text-emerald-700 mb-2">Tech Hub Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-bold cursor-pointer ${
                  darkMode ? 'bg-emerald-950 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                }`}
              >
                {['All', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Verified Dealer Checkbox */}
            <div className="pt-2 border-t border-emerald-800/30">
              <label className="flex items-center gap-2 text-xs font-bold text-emerald-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
                <span>Only Show Verified Stores</span>
              </label>
            </div>
          </aside>

          {/* Main Listings Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search Bar & Sort Row */}
            <div className={`p-4 border rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between ${
              darkMode ? 'bg-emerald-950/80 border-emerald-800' : 'bg-white border-emerald-200 shadow-sm'
            }`}>
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search model, store, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-emerald-50/50 border-emerald-200'
                  }`}
                />
                <span className="absolute left-3 top-2.5 text-xs text-emerald-500">🔍</span>
              </div>

              <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-between sm:justify-end">
                <span className="font-bold text-emerald-700">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'rating')}
                  className={`border rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer ${
                    darkMode ? 'bg-emerald-950 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated Stores</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredListings.length === 0 ? (
              <div className={`p-12 border rounded-2xl text-center my-6 ${
                darkMode ? 'bg-emerald-950/60 border-emerald-800' : 'bg-white border-emerald-200'
              }`}>
                <p className="text-base font-extrabold">No phones found matching your filters</p>
                <p className="text-xs text-emerald-600 mt-1 mb-4">Try clearing filters or raising your max budget slider.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <TiltCard key={listing.id}>
                    <div className={`border rounded-2xl overflow-hidden shadow-sm hover:border-emerald-500 transition-all flex flex-col justify-between group h-full ${
                      darkMode ? 'bg-emerald-950/90 border-emerald-800' : 'bg-white border-emerald-100'
                    }`}>
                      <div>
                        {/* Image */}
                        <div className="aspect-4/3 overflow-hidden bg-emerald-900/20 relative">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow">
                            {listing.condition}
                          </span>
                          {listing.verifiedSeller && (
                            <span className="absolute top-3 right-3 bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold text-emerald-600">
                            <span>{listing.sellerStore}</span>
                            <span>{listing.location.split(',')[0]}</span>
                          </div>

                          <Link href={`/phones/${listing.id}`}>
                            <h3 className="text-base font-extrabold line-clamp-1 hover:text-emerald-500 transition-colors">
                              {listing.title}
                            </h3>
                          </Link>

                          <div className="flex items-baseline justify-between pt-1">
                            <span className="text-lg font-black font-mono tabular-nums text-emerald-600">
                              {formatNaira(listing.priceNgn)}
                            </span>
                            <span className="text-xs font-bold text-emerald-700">{listing.storage}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-4 pt-2 border-t border-emerald-100/20 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-600">★ {listing.rating}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedListing(listing)}
                            className="px-2.5 py-1 bg-emerald-100 text-emerald-950 font-bold text-xs rounded-lg hover:bg-emerald-200 transition-colors cursor-pointer"
                          >
                            Quick View
                          </button>
                          <Link
                            href={`/phones/${listing.id}`}
                            className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-500 transition-colors"
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Modal for Quick View */}
        <ListingDetailModal
          listing={selectedListing}
          darkMode={darkMode}
          onClose={() => setSelectedListing(null)}
        />

      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
