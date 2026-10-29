'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PhoneListing } from '../types/phone';

interface ListingDetailModalProps {
  listing: PhoneListing | null;
  onClose: () => void;
  darkMode: boolean;
}

export default function ListingDetailModal({ listing, onClose, darkMode }: ListingDetailModalProps) {
  if (!listing) return null;

  const galleryImages = listing.gallery && listing.gallery.length > 0 ? listing.gallery : [listing.image];
  const [selectedImage, setSelectedImage] = useState<string>(listing.image);

  useEffect(() => {
    if (listing) {
      setSelectedImage(listing.image);
    }
  }, [listing]);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${listing.sellerStore}, I saw your listing for "${listing.title}" priced at ${formatNaira(listing.priceNgn)} on Phone Village. Is it currently available for physical inspection at your store?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 transition-colors relative ${
          darkMode 
            ? 'bg-[#021B12] border-emerald-800 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={`absolute top-4 right-4 w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm z-10 transition-colors cursor-pointer ${
            darkMode 
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:text-white' 
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className={`relative aspect-square rounded-2xl overflow-hidden border ${
              darkMode ? 'border-emerald-900/60 bg-emerald-950/40' : 'border-slate-200 bg-slate-100'
            }`}>
              <img
                src={selectedImage}
                alt={listing.title}
                className="w-full h-full object-cover transition-all"
                referrerPolicy="no-referrer"
              />
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${
                darkMode ? 'text-emerald-950 bg-emerald-400' : 'text-slate-900 bg-white/90 shadow-xs border border-slate-200'
              }`}>
                {listing.condition}
              </span>
            </div>

            {/* Uploaded Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-emerald-500 scale-95 shadow-md'
                        : darkMode ? 'border-emerald-900/60 opacity-60 hover:opacity-100' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Spec Highlights */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border ${
                darkMode ? 'bg-emerald-950/40 border-emerald-900/60' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-bold block ${darkMode ? 'text-emerald-400' : 'text-slate-500'}`}>Storage / RAM</span>
                <span className="font-extrabold">{listing.storage} {listing.ram ? `· ${listing.ram}` : ''}</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${
                darkMode ? 'bg-emerald-950/40 border-emerald-900/60' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-bold block ${darkMode ? 'text-emerald-400' : 'text-slate-500'}`}>Battery Health</span>
                <span className={`font-extrabold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  {listing.batteryHealth ? `${listing.batteryHealth}% Health` : '100% Factory'}
                </span>
              </div>
            </div>
          </div>

          {/* Details & Contact Section */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <div className={`flex items-center gap-1.5 text-xs font-bold mb-1 ${
                darkMode ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                <span>📍 {listing.location}</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight leading-snug">
                {listing.title}
              </h3>
              
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-2xl font-black font-mono ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  {formatNaira(listing.priceNgn)}
                </span>
                <span className={`text-xs font-semibold ${
                  darkMode ? 'text-emerald-300/70' : 'text-slate-500'
                }`}>
                  (Physical Store Pickup)
                </span>
              </div>

              {/* Seller Information */}
              <div className={`mt-4 p-3.5 rounded-2xl border space-y-1.5 ${
                darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{listing.sellerStore}</span>
                  {listing.verifiedSeller && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                      darkMode ? 'text-emerald-400 bg-emerald-900/80 border-emerald-700' : 'text-emerald-800 bg-emerald-100 border-emerald-300'
                    }`}>
                      ✓ Verified Dealer
                    </span>
                  )}
                </div>
                <p className={`text-[11px] ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>
                  🏬 {listing.sellerAddress}
                </p>
                <p className={`text-[11px] font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  ★ {listing.rating} ({listing.reviewCount} verified transactions)
                </p>
              </div>

              {/* Description */}
              <p className={`mt-3 text-xs leading-relaxed ${
                darkMode ? 'text-emerald-200/90' : 'text-slate-600'
              }`}>
                {listing.description}
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${listing.sellerWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>💬 Chat Dealer on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${listing.sellerPhone}`}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 min-h-[40px] transition-colors ${
                    darkMode 
                      ? 'border-emerald-700 bg-emerald-900/50 hover:bg-emerald-900 text-emerald-200' 
                      : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>📞 Call Store</span>
                </a>
                <Link
                  href={`/phones/${listing.id}`}
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 min-h-[40px] transition-colors shadow-xs"
                >
                  <span>Full Specs Page →</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
