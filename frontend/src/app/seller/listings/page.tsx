'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { PhoneListing } from '../../../types/phone';
import { MOCK_LISTINGS } from '../../../data/mockData';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);

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

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'SOLD'>('ALL');

  // Modals & Feedback
  const [editModalListing, setEditModalListing] = useState<PhoneListing | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Save updated listings to localStorage
  const persistListings = (updated: PhoneListing[]) => {
    setListings(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pv_user_listings', JSON.stringify(updated));
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Actions
  const handleToggleStatus = (id: string) => {
    const updated = listings.map((item) => {
      if (item.id === id) {
        const currentStatus = item.status || 'ACTIVE';
        const newStatus: 'ACTIVE' | 'INACTIVE' = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        return { ...item, status: newStatus };
      }
      return item;
    });
    persistListings(updated);
    showToast('Listing status updated successfully.');
  };

  const handleMarkAsSold = (id: string) => {
    const updated = listings.map((item) => {
      if (item.id === id) {
        return { ...item, status: 'SOLD' as const };
      }
      return item;
    });
    persistListings(updated);
    showToast('Listing marked as SOLD! 🎉');
  };

  const handleDeleteListing = (id: string) => {
    const updated = listings.filter((item) => item.id !== id);
    persistListings(updated);
    setDeleteConfirmId(null);
    showToast('Listing deleted from marketplace.');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalListing) return;

    const newPrice = parseInt(editPrice.replace(/[^0-9]/g, ''), 10) || editModalListing.priceNgn;

    const updated = listings.map((item) => {
      if (item.id === editModalListing.id) {
        return { ...item, priceNgn: newPrice };
      }
      return item;
    });

    persistListings(updated);
    setEditModalListing(null);
    showToast('Listing price updated successfully.');
  };

  // Filtered dataset
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const itemStatus = item.status || 'ACTIVE';
    const matchesStatus = statusFilter === 'ALL' || itemStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI Metrics
  const totalCount = listings.length;
  const activeCount = listings.filter((i) => (i.status || 'ACTIVE') === 'ACTIVE').length;
  const inactiveCount = listings.filter((i) => i.status === 'INACTIVE').length;
  const soldCount = listings.filter((i) => i.status === 'SOLD').length;

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
            <span className="text-emerald-500 font-bold underline underline-offset-4">My Listings</span>
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

            <Link
              href="/sell/phones/new"
              className="px-3.5 py-1.5 text-xs font-extrabold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm flex items-center gap-1"
            >
              <span>+ List Phone</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✅</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Heading & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
              Seller Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Manage Your Phone Listings
            </h1>
            <p className="text-xs text-slate-500 dark:text-emerald-300/70 mt-1">
              Store Owner: <strong className="text-emerald-400">{user?.storeName || user?.name || 'Verified Phone Seller'}</strong>
            </p>
          </div>

          <Link
            href="/sell/phones/new"
            className="px-5 py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-900/30 flex items-center gap-2 self-start sm:self-auto"
          >
            <span>+ Add New Smartphone</span>
          </Link>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800/60' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-400">
              Total Listings
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              {totalCount}
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800/60' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Active Listings
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-500 mt-2">
              {activeCount}
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800/60' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Inactive / Paused
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
              {inactiveCount}
            </div>
          </div>

          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800/60' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Marked Sold
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-2">
              {soldCount}
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className={`p-4 rounded-2xl border mb-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${
          darkMode ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-emerald-900/20 border border-emerald-800/40 text-xs w-full md:w-auto">
            {(['ALL', 'ACTIVE', 'INACTIVE', 'SOLD'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 font-bold rounded-lg transition-colors cursor-pointer flex-1 md:flex-initial text-center ${
                  statusFilter === st
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st === 'ALL' ? 'All' : st === 'ACTIVE' ? 'Active' : st === 'INACTIVE' ? 'Paused' : 'Sold'}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by phone model or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Listings Content */}
        {filteredListings.length === 0 ? (
          /* Empty State */
          <div className={`p-12 text-center rounded-2xl border ${
            darkMode ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4">
              📱
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No Listings Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-emerald-300/70 max-w-sm mx-auto mb-6">
              {searchTerm || statusFilter !== 'ALL'
                ? 'No phone listings match your search criteria or status filter.'
                : 'You have not created any phone listings yet. Start selling phones on Phone Village today!'}
            </p>
            <Link
              href="/sell/phones/new"
              className="px-6 py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>+ Create Your First Phone Listing</span>
            </Link>
          </div>
        ) : (
          /* Listings Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredListings.map((item) => {
              const itemStatus = item.status || 'ACTIVE';

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    darkMode ? 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-700' : 'bg-white border-emerald-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Status Badge & Price */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        itemStatus === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : itemStatus === 'INACTIVE'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}>
                        {itemStatus === 'ACTIVE' ? '● Active' : itemStatus === 'INACTIVE' ? '⏸️ Paused' : '✅ Sold'}
                      </span>

                      <div className="text-base font-extrabold text-emerald-400">
                        ₦ {item.priceNgn.toLocaleString()}
                      </div>
                    </div>

                    {/* Content Row */}
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-emerald-800/60 shrink-0">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-emerald-300/80 mt-1">
                          <span>{item.condition}</span>
                          <span>·</span>
                          <span>{item.storage}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-emerald-400/60 truncate mt-1">
                          📍 {item.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-4 border-t border-emerald-800/40 flex items-center justify-between gap-2 text-xs font-bold">
                    <Link
                      href={`/phones/${item.id}`}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      View →
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditModalListing(item);
                          setEditPrice(item.priceNgn.toString());
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-900/40 border border-emerald-800 text-emerald-200 hover:bg-emerald-800 transition-colors cursor-pointer"
                      >
                        Edit Price
                      </button>

                      {itemStatus !== 'SOLD' && (
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                            itemStatus === 'ACTIVE'
                              ? 'bg-amber-950/40 border-amber-800 text-amber-300 hover:bg-amber-900/60'
                              : 'bg-emerald-900/40 border-emerald-700 text-emerald-300 hover:bg-emerald-800'
                          }`}
                        >
                          {itemStatus === 'ACTIVE' ? 'Pause' : 'Activate'}
                        </button>
                      )}

                      {itemStatus !== 'SOLD' && (
                        <button
                          onClick={() => handleMarkAsSold(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-blue-900/40 border border-blue-700 text-blue-300 hover:bg-blue-800 transition-colors cursor-pointer"
                        >
                          Mark Sold
                        </button>
                      )}

                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="px-2 py-1 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Edit Price Modal */}
        {editModalListing && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`p-6 rounded-2xl border max-w-sm w-full shadow-2xl ${
              darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-white border-emerald-100 text-slate-900'
            }`}>
              <h3 className="font-extrabold text-base mb-1">Update Listing Price</h3>
              <p className="text-xs text-emerald-400 mb-4 truncate">{editModalListing.title}</p>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                    Asking Price (Naira ₦)
                  </label>
                  <input
                    type="text"
                    required
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditModalListing(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`p-6 rounded-2xl border max-w-sm w-full text-center shadow-2xl ${
              darkMode ? 'bg-emerald-950 border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
            }`}>
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                ⚠️
              </div>
              <h3 className="font-extrabold text-base mb-1">Delete Phone Listing?</h3>
              <p className="text-xs text-slate-400 mb-6">
                This action will remove the listing from Phone Village marketplace.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteListing(deleteConfirmId)}
                  className="px-5 py-2 text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
