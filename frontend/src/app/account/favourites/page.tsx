'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileBottomNav from '../../../components/MobileBottomNav';
import { useTheme } from '../../../context/ThemeContext';
import { PhoneListing } from '../../../types/phone';
import { MOCK_LISTINGS } from '../../../data/mockData';
import { useChat } from '../../../context/ChatContext';

export default function FavouritesPage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { startChatWithSeller } = useChat();
  const [favouriteListings, setFavouriteListings] = useState<PhoneListing[]>(() => {
    return MOCK_LISTINGS.slice(0, 3);
  });

  const handleRemove = (id: string) => {
    setFavouriteListings((prev) => prev.filter((p) => p.id !== id));
  };

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-4">
          <Link href="/account" className="hover:underline">My Account</Link>
          <span>/</span>
          <span>Saved Phones</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Saved Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-emerald-300/80 mb-8">
          Keep track of flagship phones you are planning to inspect in Computer Village or Banex.
        </p>

        {favouriteListings.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl border border-emerald-900/60 bg-emerald-950/20">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="text-lg font-bold">Your wishlist is currently empty</h3>
            <p className="text-xs text-emerald-300/70 mt-1">Browse the marketplace and tap the heart icon on any device to save it here.</p>
            <Link
              href="/phones"
              className="mt-4 inline-block px-5 py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg"
            >
              Browse Phones Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouriteListings.map((phone) => (
              <div
                key={phone.id}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between ${
                  darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-emerald-200 shadow-sm'
                }`}
              >
                <div className="relative aspect-[4/3] bg-emerald-950/60">
                  <img src={phone.image} alt={phone.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-black text-emerald-950 bg-emerald-400">
                    {phone.condition}
                  </span>
                  <button
                    onClick={() => handleRemove(phone.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-xs"
                    title="Remove from saved"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2">{phone.title}</h3>
                    <p className="text-lg font-black text-emerald-400 font-mono mt-1">{formatNaira(phone.priceNgn)}</p>
                    <p className="text-[11px] text-emerald-300/80 mt-2">🏬 {phone.sellerStore} · {phone.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/40">
                    <Link
                      href={`/phones/${phone.id}`}
                      className="py-2.5 text-center text-xs font-bold text-emerald-300 bg-emerald-950 border border-emerald-800 rounded-xl"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => startChatWithSeller(phone)}
                      className="py-2.5 text-center text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center cursor-pointer shadow-xs"
                    >
                      💬 Chat In-App
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
