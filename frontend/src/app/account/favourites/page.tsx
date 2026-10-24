'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { PhoneListing } from '../../../types/phone';
import { MOCK_LISTINGS } from '../../../data/mockData';

export default function FavouritesPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [favouriteListings, setFavouriteListings] = useState<PhoneListing[]>(() => {
    if (typeof window !== 'undefined') {
      const savedIds = localStorage.getItem('pv_favourites');
      if (savedIds) {
        try {
          const ids: string[] = JSON.parse(savedIds);
          const favList = MOCK_LISTINGS.filter((item) => ids.includes(item.id));
          if (favList.length > 0) return favList;
        } catch {
          // fallback
        }
      }
    }
    return MOCK_LISTINGS.slice(0, 3);
  });

  const handleRemoveFavourite = (id: string) => {
    const updated = favouriteListings.filter((item) => item.id !== id);
    setFavouriteListings(updated);

    if (typeof window !== 'undefined') {
      const remainingIds = updated.map((i) => i.id);
      localStorage.setItem('pv_favourites', JSON.stringify(remainingIds));
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors ${darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        darkMode ? 'bg-emerald-950/90 border-emerald-800/80 text-white' : 'bg-white/95 border-emerald-100 text-emerald-950'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
              PV
            </div>
            <span className="font-extrabold tracking-tight">Phone Village</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-emerald-600 dark:text-emerald-300">
            <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <Link href="/phones" className="hover:text-emerald-500 transition-colors">Marketplace</Link>
            <Link href="/account" className="hover:text-emerald-500 transition-colors">My Account</Link>
            <span className="text-emerald-500 font-bold underline underline-offset-4">Saved Phones</span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                darkMode ? 'bg-emerald-900/80 border-emerald-700 text-emerald-200 hover:bg-emerald-800' : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            {user ? (
              <Link href="/account" className="text-xs font-bold text-emerald-400">
                👤 {user.name}
              </Link>
            ) : (
              <Link href="/login" className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
            Personal Saved Collection
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved Smartphones ({favouriteListings.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-emerald-300/70 mt-1">
            Keep track of phones you are interested in buying across computer village dealers and individual sellers.
          </p>
        </div>

        {favouriteListings.length === 0 ? (
          /* Empty State */
          <div className={`p-12 text-center rounded-2xl border ${
            darkMode ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4">
              ❤️
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No Saved Phones Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-emerald-300/70 max-w-sm mx-auto mb-6">
              You haven&apos;t saved any phones to your favourites list. Browse our verified marketplace to save devices you like!
            </p>
            <Link
              href="/phones"
              className="px-6 py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Smartphone Marketplace →</span>
            </Link>
          </div>
        ) : (
          /* Favourites Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouriteListings.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-700' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900 border border-emerald-800/60">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFavourite(item.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-rose-950/80 border border-rose-700 text-rose-400 hover:bg-rose-900 text-xs transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      ❤️ Remove
                    </button>
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600/90 text-white">
                      {item.condition}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white truncate mb-1">
                    {item.title}
                  </h3>

                  <div className="text-lg font-black text-emerald-400 mb-2">
                    ₦ {item.priceNgn.toLocaleString()}
                  </div>

                  <div className="text-xs text-slate-400 dark:text-emerald-300/70 space-y-1 mb-4">
                    <p>📍 {item.location}</p>
                    <p>🏪 Seller: <strong className="text-white">{item.sellerStore || item.sellerName}</strong></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-800/40 flex items-center justify-between gap-2">
                  <Link
                    href={`/phones/${item.id}`}
                    className="w-full py-2.5 text-xs font-bold text-center text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
                  >
                    View Phone Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
