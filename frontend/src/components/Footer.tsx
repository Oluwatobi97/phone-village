import React from 'react';
import Link from 'next/link';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  return (
    <footer className={`border-t py-12 transition-colors ${
      darkMode 
        ? 'bg-[#01140d] border-emerald-950 text-emerald-100/70' 
        : 'bg-emerald-950 border-emerald-900 text-emerald-100/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
                PV
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Phone Village
              </span>
            </div>
            <p className="text-xs leading-relaxed text-emerald-200/80">
              Nigeria&apos;s most reliable smartphone marketplace connecting verified physical store dealers in Computer Village, Banex Plaza, and Garrison with smart buyers nationwide.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span>🇳🇬 Lagos · Abuja · Port Harcourt · Ibadan</span>
            </div>
          </div>

          {/* Col 2: Major Hubs */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-4">
              Physical Tech Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/phones?region=Lagos" className="hover:text-white transition-colors">
                  Computer Village, Ikeja (Lagos)
                </Link>
              </li>
              <li>
                <Link href="/phones?region=Lagos" className="hover:text-white transition-colors">
                  Saka Tinubu & VI Tech Strip (Lagos)
                </Link>
              </li>
              <li>
                <Link href="/phones?region=Abuja" className="hover:text-white transition-colors">
                  Banex & Emab Plazas, Wuse 2 (Abuja)
                </Link>
              </li>
              <li>
                <Link href="/phones?region=Port+Harcourt" className="hover:text-white transition-colors">
                  Garrison Tech Market (Port Harcourt)
                </Link>
              </li>
              <li>
                <Link href="/phones?region=Ibadan" className="hover:text-white transition-colors">
                  Iwo Road Mobile Hub (Ibadan)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories & Conditions */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-4">
              Phone Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/phones?condition=Brand+New" className="hover:text-white transition-colors">
                  Brand New Sealed Flagships
                </Link>
              </li>
              <li>
                <Link href="/phones?condition=UK+Used" className="hover:text-white transition-colors">
                  UK Used iPhones (90%+ Battery Health)
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Samsung" className="hover:text-white transition-colors">
                  Samsung Galaxy S & Z Series
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Google" className="hover:text-white transition-colors">
                  Google Pixel AI Flagships
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Tecno" className="hover:text-white transition-colors">
                  Tecno & Infinix Budget Kings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Safety */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-4">
              Trust & Safe Trading
            </h4>
            <p className="text-xs text-emerald-200/80 mb-3">
              Always inspect IMEIs, Face ID/Fingerprint, and receipt documentation physically inside the dealer&apos;s verified store before payment.
            </p>
            <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800 text-[11px] text-emerald-300">
              <span className="font-extrabold text-white">Dealer Escrow & Direct WhatsApp:</span> Direct interaction with genuine business owners with registered CAC or verified market addresses.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Phone Village Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-4 text-emerald-300">
            <Link href="/seller/onboarding" className="hover:underline">Dealer Verification</Link>
            <span>·</span>
            <Link href="/sell/phones/new" className="hover:underline">Post Phone Ad</Link>
            <span>·</span>
            <Link href="/account" className="hover:underline">My Account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
