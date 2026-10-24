'use client';

import React from 'react';
import { MOCK_VERIFIED_SELLERS } from '../data/mockData';
import TiltCard from './TiltCard';

interface VerifiedSellersSectionProps {
  darkMode: boolean;
}

export default function VerifiedSellersSection({ darkMode }: VerifiedSellersSectionProps) {
  return (
    <section id="verified-sellers" className={`py-16 transition-colors border-t ${
      darkMode 
        ? 'bg-[#021B12] border-emerald-900 text-white' 
        : 'bg-emerald-950 border-emerald-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-900 px-3 py-1 rounded-full border border-emerald-700 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Physical Shop Verification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Verified Nigerian Phone Dealers
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1">
              Every dealer listed has been physically audited in Computer Village Ikeja, Victoria Island, Abuja, or Port Harcourt.
            </p>
          </div>
        </div>

        {/* Store Directory Cards in 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOCK_VERIFIED_SELLERS.map((seller) => (
            <TiltCard key={seller.id}>
              <div className="bg-emerald-900/60 border border-emerald-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between h-full">
                <div>
                  {/* Store Photo */}
                  <div className="aspect-16/9 overflow-hidden bg-emerald-950 relative">
                    <img 
                      src={seller.storePhoto} 
                      alt={seller.storeName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-md">
                      Verified Since {seller.verifiedSince}
                    </span>
                  </div>

                  {/* Store Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{seller.storeName}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <span>★ {seller.rating}</span>
                        <span className="text-emerald-300 font-normal">({seller.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-emerald-400">
                      Owner: {seller.ownerName}
                    </p>

                    <p className="text-xs text-emerald-200 leading-snug">
                      <strong className="text-white">Address:</strong> {seller.physicalAddress}
                    </p>

                    {/* Specialties */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                        Specialties:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {seller.specialties.map((spec, i) => (
                          <span key={i} className="text-[11px] bg-emerald-950 border border-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-semibold">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Store Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <a
                    href={`https://wa.me/${seller.whatsapp}?text=Hello%20${encodeURIComponent(seller.ownerName)},%20I%20saw%20your%20verified%20store%20${encodeURIComponent(seller.storeName)}%20on%20Phone%20Village.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-extrabold rounded-xl text-center transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>WhatsApp {seller.storeName}</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
