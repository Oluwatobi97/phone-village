'use client';

import React from 'react';

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center text-white font-black text-xs">
                PV
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">Phone Village</span>
            </div>
            <p className="text-emerald-300 leading-relaxed text-[11px]">
              Nigeria&apos;s premier marketplace for discovering, evaluating, and purchasing smartphones from verified physical dealers in Lagos, Abuja, and Port Harcourt.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Marketplace</h4>
            <ul className="space-y-1.5 text-emerald-200">
              <li>
                <button onClick={() => scrollTo('listings-section')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Featured Listings
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('phone-finder')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  3D Phone Finder
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('deal-comparison')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Deal Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Tech Hubs</h4>
            <ul className="space-y-1.5 text-emerald-200">
              <li>Computer Village, Ikeja (Lagos)</li>
              <li>Victoria Island & Lekki (Lagos)</li>
              <li>Wuse II Crescent (Abuja)</li>
              <li>Garrick / Ikwerre Rd (Port Harcourt)</li>
            </ul>
          </div>

          {/* Trust Guarantee */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Trust & Verification</h4>
            <p className="text-[11px] text-emerald-300 leading-relaxed">
              Phone Village enforces physical store auditing and IMEICheck standards. Always inspect devices in person before making payment.
            </p>
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-400">
          <p>© {new Date().getFullYear()} Phone Village Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-4 text-emerald-300">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Safety Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
