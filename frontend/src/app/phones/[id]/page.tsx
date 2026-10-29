'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileBottomNav from '../../../components/MobileBottomNav';
import { useTheme } from '../../../context/ThemeContext';
import { MOCK_LISTINGS } from '../../../data/mockData';
import { useChat } from '../../../context/ChatContext';

export default function PhoneDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { darkMode, toggleDarkMode } = useTheme();
  const { startChatWithSeller, startCall } = useChat();

  const listing = MOCK_LISTINGS.find((p) => p.id === unwrappedParams.id) || MOCK_LISTINGS[0];
  const [selectedImage, setSelectedImage] = useState<string>(listing.image);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const images = listing.gallery && listing.gallery.length > 0 ? listing.gallery : [listing.image];

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/phones" className="hover:underline">Marketplace</Link>
          <span>/</span>
          <span className="text-slate-400 truncate max-w-[200px] sm:max-w-md">{listing.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-emerald-900/80 bg-emerald-950/40 shadow-2xl">
              <img
                src={selectedImage}
                alt={listing.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider text-emerald-950 bg-emerald-400 shadow-md">
                  {listing.condition}
                </span>
                {listing.batteryHealth && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold text-white bg-black/60 backdrop-blur-md border border-white/20">
                    ⚡ {listing.batteryHealth}% Battery Health
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-pointer"
              >
                {isSaved ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? 'border-emerald-500 scale-95 shadow-lg'
                      : 'border-emerald-900/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Physical Verification Checklist */}
            <div className={`p-6 rounded-3xl border space-y-3 ${
              darkMode ? 'bg-emerald-950/40 border-emerald-900/80' : 'bg-white border-emerald-200'
            }`}>
              <h3 className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider">
                🛡️ Verified Hardware Guarantee
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Face ID / Touch ID 100% Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Clean IMEI & Factory Unlocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Original True Tone Display</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>In-store Physical Testing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Store Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                <span>📍 {listing.location}</span>
                <span>·</span>
                <span>Hub: {listing.hubRegion}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                {listing.title}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  {formatNaira(listing.priceNgn)}
                </span>
                <span className="text-xs text-emerald-300 font-semibold bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                  Fixed Market Price
                </span>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className={`p-5 rounded-3xl border space-y-3 ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-200 shadow-sm'
            }`}>
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-300">
                Key Technical Specifications
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-emerald-900/40">
                  <span className="text-slate-400 font-medium">Display</span>
                  <span className="font-extrabold text-right">{listing.specs.display}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-900/40">
                  <span className="text-slate-400 font-medium">Processor</span>
                  <span className="font-extrabold text-right">{listing.specs.processor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-900/40">
                  <span className="text-slate-400 font-medium">Camera System</span>
                  <span className="font-extrabold text-right">{listing.specs.camera}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-900/40">
                  <span className="text-slate-400 font-medium">Battery & Charge</span>
                  <span className="font-extrabold text-right">{listing.specs.battery}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-medium">Storage / RAM</span>
                  <span className="font-extrabold text-right">{listing.storage} {listing.ram ? `· ${listing.ram}` : ''}</span>
                </div>
              </div>
            </div>

            {/* Verified Dealer Store Card */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              darkMode ? 'bg-emerald-950/80 border-emerald-700/80' : 'bg-emerald-50/60 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-base text-white">{listing.sellerStore}</h3>
                    {listing.verifiedSeller && (
                      <span className="text-emerald-400 text-xs font-bold">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-300/80">Owner: {listing.sellerName}</p>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-black text-emerald-950 bg-emerald-400 rounded-lg">
                  ★ {listing.rating} ({listing.reviewCount})
                </span>
              </div>

              <div className="text-xs text-emerald-200/90 space-y-1">
                <p>🏬 <strong>Address:</strong> {listing.sellerAddress}</p>
                <p>🛡️ <strong>Safety Advice:</strong> Visit store physically to inspect device before making transfer.</p>
              </div>

              {/* Direct CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => startChatWithSeller(listing)}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                >
                  <span>💬 Chat Vendor In-App</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => startCall(listing.sellerStore, `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`, 'voice')}
                    className="w-full py-3 bg-emerald-900/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-700 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    <span>📞 Voice Call</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => startCall(listing.sellerStore, `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`, 'video')}
                    className="w-full py-3 bg-emerald-800/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-600 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    <span>📹 Video Call</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
