'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer className={`py-12 border-t text-xs transition-colors ${
      darkMode 
        ? 'bg-[#021B12] border-emerald-900 text-emerald-300' 
        : 'bg-emerald-950 border-emerald-900 text-emerald-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-emerald-900">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center text-white font-black text-xs">
                PV
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">Phone Village</span>
            </Link>
            <p className="text-emerald-300 leading-relaxed text-[11px]">
              Nigeria&apos;s premier marketplace for discovering, evaluating, and purchasing smartphones from verified physical dealers in Lagos, Abuja, and Port Harcourt.
            </p>
          </div>

          {/* Marketplace Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Marketplace</h4>
            <ul className="space-y-1.5 text-emerald-200">
              <li>
                <Link href="/phones" className="hover:text-emerald-400 transition-colors">
                  Browse All Phones
                </Link>
              </li>
              <li>
                <Link href="/seller/onboarding" className="hover:text-emerald-400 transition-colors">
                  Sell a Phone
                </Link>
              </li>
              <li>
                <Link href="/seller/listings" className="hover:text-emerald-400 transition-colors">
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Buyer Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Buyer Hub</h4>
            <ul className="space-y-1.5 text-emerald-200">
              <li>
                <Link href="/account" className="hover:text-emerald-400 transition-colors">
                  My Account Profile
                </Link>
              </li>
              <li>
                <Link href="/account/favourites" className="hover:text-emerald-400 transition-colors">
                  Saved Phones
                </Link>
              </li>
              <li>
                <Link href="/account/messages" className="hover:text-emerald-400 transition-colors">
                  Enquiries & Messages
                </Link>
              </li>
              <li>
                <Link href="/account/settings" className="hover:text-emerald-400 transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Guarantee & Hubs */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Trust & Verification</h4>
            <p className="text-[11px] text-emerald-300 leading-relaxed">
              Phone Village enforces physical store auditing and IMEICheck standards across Computer Village (Ikeja), Wuse II (Abuja), and Garrick (Port Harcourt).
            </p>
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-400">
          <p>© {new Date().getFullYear()} Phone Village Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-4 text-emerald-300">
            <Link href="/account/settings" className="hover:text-emerald-200 transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/account/settings" className="hover:text-emerald-200 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/account/settings" className="hover:text-emerald-200 transition-colors">
              Safety Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

