'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileBottomNav from '../../../components/MobileBottomNav';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { PhoneListing } from '../../../types/phone';
import { MOCK_LISTINGS } from '../../../data/mockData';

export default function MyListingsPage() {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [listings, setListings] = useState<PhoneListing[]>(() => {
    let combinedListings: PhoneListing[] = [];

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pv_user_listings');
      if (saved) {
        try {
          combinedListings = JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }

    if (combinedListings.length === 0) {
      combinedListings = MOCK_LISTINGS.slice(0, 4).map((listing, idx) => ({
        ...listing,
        status: (idx === 0 ? 'ACTIVE' : idx === 1 ? 'ACTIVE' : idx === 2 ? 'INACTIVE' : 'SOLD') as 'ACTIVE' | 'INACTIVE' | 'SOLD',
      }));
    }

    return combinedListings;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'SOLD'>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setListings((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          return { ...item, status: nextStatus as any };
        }
        return item;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('pv_user_listings', JSON.stringify(updated));
      }
      return updated;
    });
    showToast('Listing status updated.');
  };

  const handleMarkSold = (id: string) => {
    setListings((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, status: 'SOLD' as const } : item));
      if (typeof window !== 'undefined') {
        localStorage.setItem('pv_user_listings', JSON.stringify(updated));
      }
      return updated;
    });
    showToast('Marked phone as SOLD.');
  };

  const handleDelete = (id: string) => {
    setListings((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('pv_user_listings', JSON.stringify(updated));
      }
      return updated;
    });
    showToast('Listing removed from inventory.');
  };

  const filtered = listings.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
          <span>✅</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className={`flex items-center gap-2 text-xs font-bold mb-1 ${
              darkMode ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              <Link href="/account" className="hover:underline">My Account</Link>
              <span>/</span>
              <span>Seller Inventory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Manage Phone Listings
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${
              darkMode ? 'text-emerald-300/80' : 'text-slate-600'
            }`}>
              Store: {user?.storeName || 'Apex Gadgets Hub Ltd'} · Active listings visible across Nigerian tech hubs.
            </p>
          </div>

          <Link
            href="/sell/phones/new"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-auto min-h-[44px]"
          >
            <span>+</span>
            <span>Post New Phone Ad</span>
          </Link>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Ads</span>
            <span className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{listings.length}</span>
          </div>
          <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className={`text-[11px] font-bold uppercase tracking-wider block ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Active</span>
            <span className={`text-2xl font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>{listings.filter(i => i.status === 'ACTIVE').length}</span>
          </div>
          <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider block">Inactive</span>
            <span className="text-2xl font-black text-amber-500">{listings.filter(i => i.status === 'INACTIVE').length}</span>
          </div>
          <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Sold</span>
            <span className="text-2xl font-black text-slate-400">{listings.filter(i => i.status === 'SOLD').length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className={`w-full sm:w-72 p-1.5 rounded-xl border flex items-center ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <span className="pl-2 text-sm opacity-60">🔍</span>
            <input
              type="text"
              placeholder="Search your inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-transparent px-2 text-xs font-semibold outline-none ${
                darkMode ? 'text-white placeholder:text-emerald-300/50' : 'text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto text-xs">
            {(['ALL', 'ACTIVE', 'INACTIVE', 'SOLD'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all min-h-[36px] cursor-pointer ${
                  statusFilter === st
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : darkMode
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900 hover:bg-emerald-900/60'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Table / Cards */}
        {filtered.length === 0 ? (
          <div className={`text-center py-16 p-8 rounded-3xl border ${
            darkMode ? 'border-emerald-900/60 bg-emerald-950/20 text-white' : 'border-slate-200 bg-white text-slate-900 shadow-xs'
          }`}>
            <h3 className="text-lg font-bold">No listings found</h3>
            <p className={`text-xs mt-1 ${darkMode ? 'text-emerald-300/70' : 'text-slate-500'}`}>
              Post a new phone ad to start receiving verified buyer inquiries.
            </p>
            <Link
              href="/sell/phones/new"
              className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-500"
            >
              Post Ad Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                  darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border ${
                    darkMode ? 'bg-emerald-950 border-emerald-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        item.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 dark:text-emerald-400'
                          : item.status === 'SOLD'
                          ? 'bg-slate-500/20 text-slate-500 border border-slate-500/30'
                          : 'bg-amber-500/20 text-amber-600 border border-amber-500/30'
                      }`}>
                        {item.status || 'ACTIVE'}
                      </span>
                      <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.condition}</span>
                    </div>
                    <h3 className={`font-extrabold text-sm sm:text-base leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                    <p className={`text-sm font-black font-mono mt-0.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>{formatNaira(item.priceNgn)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleStatus(item.id)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                      darkMode 
                        ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900' 
                        : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {item.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                  </button>
                  {item.status !== 'SOLD' && (
                    <button
                      onClick={() => handleMarkSold(item.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                        darkMode 
                          ? 'border-emerald-800 bg-emerald-950/60 text-slate-300 hover:bg-emerald-900' 
                          : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Mark Sold
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900 cursor-pointer"
                  >
                    Delete
                  </button>
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
