'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PhoneListing } from '../types/phone';
import ListingDetailModal from './ListingDetailModal';

interface ListingsSectionProps {
  listings: PhoneListing[];
  darkMode: boolean;
  searchFilter?: string;
}

export default function ListingsSection({ listings, darkMode, searchFilter = '' }: ListingsSectionProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedListing, setSelectedListing] = useState<PhoneListing | null>(null);

  const brands = ['All', 'Apple', 'Samsung', 'Google', 'Tecno', 'Infinix', 'Xiaomi'];
  const conditions = ['All', 'Brand New', 'UK Used', 'Locally Used'];
  const regions = ['All', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchSearch =
        searchFilter === '' ||
        item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.condition.toLowerCase().includes(searchFilter.toLowerCase());

      const matchBrand = selectedBrand === 'All' || item.brand === selectedBrand;
      const matchCondition = selectedCondition === 'All' || item.condition === selectedCondition;
      const matchRegion = selectedRegion === 'All' || item.hubRegion === selectedRegion;

      return matchSearch && matchBrand && matchCondition && matchRegion;
    });
  }, [listings, searchFilter, selectedBrand, selectedCondition, selectedRegion]);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className={`inline-flex items-center gap-1.5 text-xs font-extrabold mb-1 ${
              darkMode ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              <span>Verified Market Inventory</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Featured Flagships & Clean Deals
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${
              darkMode ? 'text-emerald-300/80' : 'text-slate-600'
            }`}>
              Physical inspection allowed before payment in Computer Village Ikeja & Banex Abuja stores.
            </p>
          </div>

          <Link
            href="/phones"
            className={`text-xs sm:text-sm font-extrabold flex items-center gap-1 self-start md:self-auto hover:underline ${
              darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'
            }`}
          >
            <span>View All Phones in Marketplace</span>
            <span>→</span>
          </Link>
        </div>

        {/* Filter Pills Bar */}
        <div className="space-y-3 mb-8">
          {/* Brand Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className={`font-bold shrink-0 ${darkMode ? 'text-emerald-400' : 'text-slate-700'}`}>Brand:</span>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 min-h-[36px] cursor-pointer ${
                  selectedBrand === brand
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : darkMode
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/60'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200/80'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Condition & Region Filter */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className={`font-bold shrink-0 ${darkMode ? 'text-emerald-400' : 'text-slate-700'}`}>Condition:</span>
              {conditions.map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 min-h-[32px] cursor-pointer ${
                    selectedCondition === cond
                      ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                      : darkMode
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900 hover:bg-emerald-900/40'
                        : 'bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/70'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className={`font-bold shrink-0 ${darkMode ? 'text-emerald-400' : 'text-slate-700'}`}>Hub:</span>
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 min-h-[32px] cursor-pointer ${
                    selectedRegion === reg
                      ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                      : darkMode
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900 hover:bg-emerald-900/40'
                        : 'bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/70'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className={`text-center py-16 p-8 rounded-3xl border ${
            darkMode 
              ? 'border-emerald-900/60 bg-emerald-950/30 text-white' 
              : 'border-slate-200 bg-white shadow-xs text-slate-800'
          }`}>
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold">No phones match your current filter</h3>
            <p className={`text-xs mt-1 ${darkMode ? 'text-emerald-300/70' : 'text-slate-500'}`}>Try resetting your brand, condition or tech hub filter.</p>
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSelectedCondition('All');
                setSelectedRegion('All');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((phone) => (
              <div
                key={phone.id}
                className={`group rounded-3xl border transition-all duration-300 hover:scale-[1.01] overflow-hidden flex flex-col justify-between ${
                  darkMode 
                    ? 'bg-emerald-950/40 border-emerald-800/60 hover:border-emerald-500 hover:shadow-2xl' 
                    : 'bg-white border-slate-200/80 hover:border-emerald-500 shadow-xs hover:shadow-xl hover:shadow-slate-200/60'
                }`}
              >
                {/* Image Banner */}
                <div className="relative aspect-[4/3] bg-slate-100 dark:bg-emerald-950/60 overflow-hidden cursor-pointer" onClick={() => setSelectedListing(phone)}>
                  <img
                    src={phone.image}
                    alt={phone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-slate-900 bg-white/90 backdrop-blur-md shadow-xs border border-slate-200 dark:text-emerald-950 dark:bg-emerald-400 dark:border-none">
                      {phone.condition}
                    </span>
                    {phone.batteryHealth && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black text-white bg-slate-900/80 backdrop-blur-md border border-white/20">
                        ⚡ {phone.batteryHealth}% Battery
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-[10px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md">
                    📍 {phone.hubRegion}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className={`flex items-center justify-between text-xs font-bold mb-1 ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-700'
                    }`}>
                      <span>{phone.brand}</span>
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-500'}>
                        {phone.storage} {phone.ram ? `· ${phone.ram}` : ''}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setSelectedListing(phone)}
                      className={`font-extrabold text-base leading-snug line-clamp-2 cursor-pointer transition-colors ${
                        darkMode 
                          ? 'text-white hover:text-emerald-400' 
                          : 'text-slate-900 hover:text-emerald-600'
                      }`}
                    >
                      {phone.title}
                    </h3>

                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className={`text-xl font-black font-mono tracking-tight ${
                        darkMode ? 'text-emerald-400' : 'text-emerald-700'
                      }`}>
                        {formatNaira(phone.priceNgn)}
                      </span>
                    </div>

                    <div className={`mt-3 pt-3 border-t text-xs space-y-1 ${
                      darkMode ? 'border-emerald-900/40' : 'border-slate-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-extrabold text-xs truncate max-w-[180px] ${
                          darkMode ? 'text-white' : 'text-slate-800'
                        }`}>{phone.sellerStore}</span>
                        {phone.verifiedSeller && (
                          <span className={`text-[10px] font-bold ${
                            darkMode ? 'text-emerald-400' : 'text-emerald-700'
                          }`}>✓ Verified</span>
                        )}
                      </div>
                      <p className={`text-[11px] truncate ${
                        darkMode ? 'text-emerald-300/70' : 'text-slate-500'
                      }`}>
                        🏬 {phone.location}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedListing(phone)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors min-h-[40px] cursor-pointer ${
                        darkMode 
                          ? 'border-emerald-800 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300' 
                          : 'border-slate-200 bg-slate-100 hover:bg-slate-200/80 text-slate-800'
                      }`}
                    >
                      Quick Specs
                    </button>
                    <a
                      href={`https://wa.me/${phone.sellerWhatsapp}?text=${encodeURIComponent(`Hi ${phone.sellerStore}, is ${phone.title} still available for inspection on Phone Village?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold text-center flex items-center justify-center gap-1 min-h-[40px] shadow-xs"
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        darkMode={darkMode}
      />
    </section>
  );
}
