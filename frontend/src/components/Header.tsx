'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const { user, logout, demoLoginBuyer, demoLoginDealer } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
      darkMode 
        ? 'bg-[#021B12]/90 border-emerald-900/60 text-white' 
        : 'bg-white/90 border-emerald-100 text-emerald-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
            PV
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-emerald-500 to-teal-300 bg-clip-text text-transparent">
              Phone Village
            </span>
            <span className="hidden sm:inline-block ml-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
              NG
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/phones" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span>Marketplace</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full font-bold">Hot</span>
          </Link>
          <Link href="/seller/onboarding" className="hover:text-emerald-400 transition-colors">
            Verified Stores
          </Link>
          <Link href="/account" className="hover:text-emerald-400 transition-colors">
            My Account
          </Link>
        </nav>

        {/* Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle theme"
            className={`p-2 sm:px-3 sm:py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 min-h-[40px] ${
              darkMode 
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
            <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
          </button>

          {/* Sell Phone Button */}
          <Link
            href="/sell/phones/new"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-700/20 min-h-[40px]"
          >
            <span>+</span>
            <span>List Phone</span>
          </Link>

          {/* User Profile / Auth State */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-800/80 bg-emerald-950/40 text-xs font-bold text-emerald-200 hover:border-emerald-600 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate">{user.name}</span>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="md:hidden p-2 rounded-xl border border-emerald-800 text-emerald-300 hover:bg-emerald-900/60 min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b p-4 space-y-4 animate-in slide-in-from-top duration-200 ${
          darkMode ? 'bg-[#021B12] border-emerald-900/80 text-white' : 'bg-white border-emerald-100 text-emerald-950'
        }`}>
          <nav className="flex flex-col space-y-2 text-sm font-bold">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-emerald-900/20 flex items-center justify-between"
            >
              <span>🏠 Home</span>
            </Link>
            <Link 
              href="/phones" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-emerald-900/20 flex items-center justify-between"
            >
              <span>📱 Marketplace & Phones</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Explore</span>
            </Link>
            <Link 
              href="/sell/phones/new" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-emerald-600 text-white flex items-center justify-between font-extrabold"
            >
              <span>+ Post a Free Phone Ad</span>
              <span>₦</span>
            </Link>
            <Link 
              href="/seller/onboarding" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-emerald-900/20 flex items-center justify-between"
            >
              <span>🛡️ Verified Store Onboarding</span>
            </Link>
            <Link 
              href="/seller/listings" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-emerald-900/20 flex items-center justify-between"
            >
              <span>📋 My Seller Inventory</span>
            </Link>
            <Link 
              href="/account/favourites" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-emerald-900/20 flex items-center justify-between"
            >
              <span>❤️ Saved Wishlist</span>
            </Link>
            <Link 
              href="/account/messages" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-emerald-900/20 flex items-center justify-between"
            >
              <span>💬 Store Enquiries</span>
            </Link>
            <Link 
              href="/account" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-emerald-900/20 flex items-center justify-between"
            >
              <span>⚙️ My Account Hub</span>
            </Link>
          </nav>

          <div className="pt-2 border-t border-emerald-900/40 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between py-2">
                <div className="text-xs">
                  <p className="font-extrabold text-emerald-400">{user.name}</p>
                  <p className="text-[11px] opacity-70">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    demoLoginBuyer();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-xs font-bold rounded-lg border border-emerald-800 bg-emerald-950 text-emerald-300"
                >
                  Buyer Demo
                </button>
                <button
                  onClick={() => {
                    demoLoginDealer();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-xs font-bold rounded-lg border border-emerald-700 bg-emerald-600 text-white font-extrabold"
                >
                  Dealer Demo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
