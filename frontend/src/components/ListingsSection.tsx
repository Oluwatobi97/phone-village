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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
              <span>Verified Market Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Featured Flagships & Clean Deals
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300/80 mt-1">
              Physical inspection allowed before payment in Computer Village Ikeja & Banex Abuja stores.
            </p>
          </div>

          <Link
            href="/phones"
            className="text-xs sm:text-sm font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All Phones in Marketplace</span>
            <span>→</span>
          </Link>
        </div>

        {/* Filter Pills Bar */}
        <div className="space-y-3 mb-8">
          {/* Brand Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-emerald-400 font-bold shrink-0">Brand:</span>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 min-h-[36px] ${
                  selectedBrand === brand
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/60'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Condition & Region Filter */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-emerald-400 font-bold shrink-0">Condition:</span>
              {conditions.map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 min-h-[32px] ${
                    selectedCondition === cond
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-emerald-950/40 text-emerald-300 border border-emerald-900 hover:bg-emerald-900/40'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-emerald-400 font-bold shrink-0">Hub:</span>
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 min-h-[32px] ${
                    selectedRegion === reg
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-emerald-950/40 text-emerald-300 border border-emerald-900 hover:bg-emerald-900/40'
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
          <div className="text-center py-16 p-8 rounded-3xl border border-emerald-900/60 bg-emerald-950/30">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold">No phones match your current filter</h3>
            <p className="text-xs text-emerald-300/70 mt-1">Try resetting your brand, condition or tech hub filter.</p>
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSelectedCondition('All');
                setSelectedRegion('All');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
            >
              Reset Filters
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
                {/* Image Banner */}
                <div className="relative aspect-[4/3] bg-emerald-950/60 overflow-hidden cursor-pointer" onClick={() => setSelectedListing(phone)}>
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
                        ⚡ {phone.batteryHealth}% Battery
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-[10px] font-extrabold text-white bg-black/60 backdrop-blur-md">
                    📍 {phone.hubRegion}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
                      <span>{phone.brand}</span>
                      <span>{phone.storage} {phone.ram ? `· ${phone.ram}` : ''}</span>
                    </div>

                    <h3 
                      onClick={() => setSelectedListing(phone)}
                      className="font-extrabold text-base leading-snug line-clamp-2 hover:text-emerald-400 cursor-pointer transition-colors"
                    >
                      {phone.title}
                    </h3>

                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-xl font-black text-emerald-400 font-mono tracking-tight">
                        {formatNaira(phone.priceNgn)}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-emerald-900/40 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs truncate max-w-[180px]">{phone.sellerStore}</span>
                        {phone.verifiedSeller && (
                          <span className="text-[10px] font-bold text-emerald-400">✓ Verified</span>
                        )}
                      </div>
                      <p className="text-[11px] text-emerald-300/70 truncate">
                        🏬 {phone.location}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedListing(phone)}
                      className="py-2.5 px-3 rounded-xl border border-emerald-800 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 text-xs font-bold transition-colors min-h-[40px]"
                    >
                      Quick Specs
                    </button>
                    <a
                      href={`https://wa.me/${phone.sellerWhatsapp}?text=${encodeURIComponent(`Hi ${phone.sellerStore}, is ${phone.title} still available for inspection on Phone Village?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold text-center flex items-center justify-center gap-1 min-h-[40px]"
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
