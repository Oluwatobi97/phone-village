'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_VERIFIED_SELLERS } from '../data/mockData';

interface VerifiedSellersSectionProps {
  darkMode: boolean;
}

export default function VerifiedSellersSection({ darkMode }: VerifiedSellersSectionProps) {
  return (
    <section className={`py-16 border-t transition-colors ${
      darkMode ? 'bg-[#021B12] border-emerald-900/60 text-white' : 'bg-emerald-50/40 border-emerald-100 text-emerald-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
              <span>Trusted Physical Retailers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Verified Tech Hub Stores
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300/80 mt-1">
              Dealers with verified physical premises, registered business certificates, and hundreds of authentic customer reviews.
            </p>
          </div>

          <Link
            href="/seller/onboarding"
            className="text-xs sm:text-sm font-extrabold text-emerald-400 hover:text-emerald-300 self-start md:self-auto"
          >
            Register Your Store →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_VERIFIED_SELLERS.map((seller) => (
            <div
              key={seller.id}
              className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between ${
                darkMode ? 'bg-emerald-950/40 border-emerald-800/80 hover:border-emerald-500' : 'bg-white border-emerald-200 hover:border-emerald-500 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-emerald-800 shrink-0">
                    <img
                      src={seller.storePhoto}
                      alt={seller.storeName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                        {seller.storeName}
                      </h3>
                      <span className="text-emerald-400 text-xs font-black">✓</span>
                    </div>
                    <p className="text-xs text-emerald-300/80 mt-0.5">
                      Proprietor: {seller.ownerName}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold mt-1">
                      <span>★ {seller.rating}</span>
                      <span>·</span>
                      <span>{seller.reviewCount} Reviews</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-900/60 text-xs space-y-1 mb-4">
                  <p className="text-white font-bold">📍 {seller.physicalAddress}</p>
                  <p className="text-emerald-300/70 text-[11px]">Hub: {seller.hubLocation}</p>
                  <p className="text-[11px] text-emerald-400">Active on Phone Village since {seller.verifiedSince}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {seller.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/40">
                <a
                  href={`tel:${seller.phone}`}
                  className="py-2 text-center text-xs font-bold text-emerald-200 bg-emerald-900/40 hover:bg-emerald-900 border border-emerald-700 rounded-xl"
                >
                  Call Store
                </a>
                <a
                  href={`https://wa.me/${seller.whatsapp}?text=${encodeURIComponent(`Hello ${seller.storeName}, I found your verified store on Phone Village. I would like to inquire about your available smartphones.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 text-center text-xs font-extrabold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl flex items-center justify-center gap-1"
                >
                  WhatsApp
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
