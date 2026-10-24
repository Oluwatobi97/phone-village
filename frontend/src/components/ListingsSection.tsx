'use client';

import React, { useState, useMemo } from 'react';
import { PhoneListing } from '../types/phone';
import { MOCK_LISTINGS } from '../data/mockData';
import ListingDetailModal from './ListingDetailModal';
import TiltCard from './TiltCard';

interface ListingsSectionProps {
  darkMode: boolean;
  initialMaxPrice?: number;
  initialBrand?: string;
  initialCondition?: string;
}

export default function ListingsSection({
  darkMode,
  initialMaxPrice = 1500000,
  initialBrand = 'All',
  initialCondition = 'All',
}: ListingsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [prevBrand, setPrevBrand] = useState(initialBrand);
  const [selectedCondition, setSelectedCondition] = useState(initialCondition);
  const [prevCondition, setPrevCondition] = useState(initialCondition);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('price-asc');
  const [selectedListing, setSelectedListing] = useState<PhoneListing | null>(null);

  // Sync props derived state safely during render
  if (initialBrand !== prevBrand) {
    setSelectedBrand(initialBrand);
    setPrevBrand(initialBrand);
  }
  if (initialCondition !== prevCondition) {
    setSelectedCondition(initialCondition);
    setPrevCondition(initialCondition);
  }

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesLocation = item.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesLocation) return false;
      }

      // Max price
      if (item.priceNgn > initialMaxPrice) return false;

      // Brand
      if (selectedBrand !== 'All' && item.brand !== selectedBrand) return false;

      // Condition
      if (selectedCondition !== 'All' && item.condition !== selectedCondition) return false;

      // Region
      if (selectedRegion !== 'All' && item.hubRegion !== selectedRegion) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
      if (sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, initialMaxPrice, selectedBrand, selectedCondition, selectedRegion, sortBy]);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <section id="listings-section" className={`py-16 transition-colors border-t ${
      darkMode 
        ? 'bg-[#021B12] border-emerald-900 text-white' 
        : 'bg-white border-emerald-100 text-emerald-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Search Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-1">
              <span>Verified Market Inventory</span>
              <span>·</span>
              <span>Green & White Certified</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-emerald-950'
            }`}>
              Featured Phone Listings
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${
              darkMode ? 'text-emerald-200' : 'text-emerald-800'
            }`}>
              Browse direct store listings across Lagos Computer Village, Victoria Island, Abuja, and Port Harcourt.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search iPhone, Samsung, Ikeja..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-colors ${
                  darkMode 
                    ? 'bg-emerald-950/80 border-emerald-700/80 text-white placeholder-emerald-400' 
                    : 'bg-emerald-50/50 border-emerald-200 text-emerald-950 placeholder-emerald-700'
                }`}
              />
              <svg 
                className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={`border rounded-2xl p-4 shadow-sm mb-8 space-y-4 transition-colors ${
          darkMode 
            ? 'bg-emerald-900/40 border-emerald-800' 
            : 'bg-emerald-50/30 border-emerald-100'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Brands Segmented Controls */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              <span className={`text-xs font-bold mr-2 shrink-0 ${
                darkMode ? 'text-emerald-300' : 'text-emerald-900'
              }`}>Brand:</span>
              {['All', 'Apple', 'Samsung', 'Tecno', 'Infinix', 'Xiaomi', 'Google'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : darkMode ? 'text-emerald-200 hover:bg-emerald-800' : 'text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'rating')}
                className={`border text-xs rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer ${
                  darkMode 
                    ? 'bg-emerald-950 border-emerald-700 text-emerald-100' 
                    : 'bg-white border-emerald-200 text-emerald-950'
                }`}
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated Sellers</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className={`flex flex-wrap items-center gap-6 pt-3 border-t text-xs ${
            darkMode ? 'border-emerald-800/80' : 'border-emerald-100'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>Condition:</span>
              {['All', 'Brand New', 'UK Used'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs font-bold ${
                    selectedCondition === cond
                      ? 'bg-emerald-600 text-white'
                      : darkMode ? 'text-emerald-300 hover:bg-emerald-800' : 'text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>Region:</span>
              {['All', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs font-bold ${
                    selectedRegion === reg
                      ? 'bg-emerald-600 text-white'
                      : darkMode ? 'text-emerald-300 hover:bg-emerald-800' : 'text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings 3D Grid */}
        {filteredListings.length === 0 ? (
          <div className={`border rounded-2xl p-12 text-center my-8 ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800' : 'bg-white border-emerald-200'
          }`}>
            <p className="text-lg font-bold">No phones matched your exact filter criteria</p>
            <p className="text-xs text-emerald-600 mt-1 mb-4">Try adjusting your budget slider or clearing specific filters.</p>
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSelectedCondition('All');
                setSelectedRegion('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <TiltCard key={listing.id}>
                <div
                  onClick={() => setSelectedListing(listing)}
                  className={`border rounded-2xl overflow-hidden shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between group cursor-pointer h-full ${
                    darkMode 
                      ? 'bg-emerald-950/80 border-emerald-800 text-white' 
                      : 'bg-white border-emerald-100 text-emerald-950'
                  }`}
                >
                  <div>
                    {/* Card Image Container */}
                    <div className="aspect-4/3 overflow-hidden bg-emerald-900/20 relative">
                      <img 
                        src={listing.image} 
                        alt={listing.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      
                      <span className="absolute top-3 left-3 text-[11px] font-extrabold px-2 py-0.5 rounded shadow-sm bg-emerald-600 text-white">
                        {listing.condition}
                      </span>

                      {listing.verifiedSeller && (
                        <span className="absolute top-3 right-3 bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                          <span>Verified Store</span>
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-emerald-600">
                        <span>{listing.sellerStore}</span>
                        <span>{listing.location.split(',')[0]}</span>
                      </div>

                      <h3 className={`text-base font-extrabold line-clamp-1 group-hover:text-emerald-500 transition-colors ${
                        darkMode ? 'text-white' : 'text-emerald-950'
                      }`}>
                        {listing.title}
                      </h3>

                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-lg font-black font-mono tabular-nums text-emerald-600">
                          {formatNaira(listing.priceNgn)}
                        </span>
                        <span className="text-xs font-bold text-emerald-700">{listing.storage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className={`px-4 pb-4 pt-2 border-t flex items-center justify-between gap-2 ${
                    darkMode ? 'border-emerald-900' : 'border-emerald-50'
                  }`}>
                    <div className="flex items-center gap-1 text-xs text-emerald-600 font-extrabold">
                      <span>★</span>
                      <span>{listing.rating}</span>
                      <span className="text-emerald-800 font-normal">({listing.reviewCount})</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedListing(listing);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 text-white group-hover:bg-emerald-500 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect Phone
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Modal Sheet */}
        <ListingDetailModal 
          listing={selectedListing} 
          darkMode={darkMode}
          onClose={() => setSelectedListing(null)} 
        />

      </div>
    </section>
  );
}
