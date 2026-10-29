'use client';

import React from 'react';
import Link from 'next/link';

interface SafetyGuideSectionProps {
  darkMode: boolean;
}

export default function SafetyGuideSection({ darkMode }: SafetyGuideSectionProps) {
  const tips = [
    {
      title: 'Always Meet Inside the Verified Physical Store',
      desc: 'Never agree to meet on roadside curbs, parking lots, or remote alleys. Always meet inside the dealer’s named store in Computer Village, Banex Plaza, or Garrison.',
      icon: '🏬',
    },
    {
      title: 'Verify IMEI (*#06#) & Apple/Google Activation Lock',
      desc: 'Dial *#06# to confirm the IMEI matches the phone settings and box. Sign into your personal iCloud / Google account before leaving the store.',
      icon: '🔍',
    },
    {
      title: 'Test Battery Health & True Tone Physically',
      desc: 'For UK Used iPhones, verify that battery health in Settings is authentic, True Tone is active, and Face ID works without warning prompts.',
      icon: '🔋',
    },
    {
      title: 'Demand Official Store Receipt & Warranty Slip',
      desc: 'Ensure the dealer provides a signed business receipt bearing the phone’s full IMEI, agreed warranty period (e.g. 7-14 days replacement), and shop stamp.',
      icon: '🧾',
    },
  ];

  return (
    <section className={`py-16 border-t transition-colors ${
      darkMode 
        ? 'bg-[#01140d] border-emerald-950 text-white' 
        : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-2 border ${
            darkMode 
              ? 'text-emerald-400 bg-emerald-950 border-emerald-800' 
              : 'text-emerald-800 bg-emerald-50 border-emerald-200'
          }`}>
            <span>Marketplace Safety Shield</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How to Buy Smartphones Safely in Nigeria
          </h2>
          <p className={`text-xs sm:text-sm mt-2 ${
            darkMode ? 'text-emerald-300/80' : 'text-slate-600'
          }`}>
            Phone Village prioritizes zero-fraud trading. Follow our 4-step physical inspection protocol before paying any vendor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all ${
                darkMode 
                  ? 'bg-emerald-950/40 border-emerald-900/80 text-white' 
                  : 'bg-slate-50/80 border-slate-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl mb-4 ${
                darkMode 
                  ? 'bg-emerald-600/20 border-emerald-500/30' 
                  : 'bg-emerald-100 border-emerald-200'
              }`}>
                {tip.icon}
              </div>
              <h3 className={`font-extrabold text-sm mb-2 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {tip.title}
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-emerald-300/80' : 'text-slate-600'
              }`}>
                {tip.desc}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-10 p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          darkMode 
            ? 'bg-gradient-to-r from-emerald-900/60 to-teal-900/40 border-emerald-700/60 text-white' 
            : 'bg-gradient-to-r from-emerald-900 to-teal-900 border-emerald-800 text-white shadow-lg'
        }`}>
          <div>
            <h4 className="font-extrabold text-base text-white">Are you a registered smartphone vendor?</h4>
            <p className="text-xs text-emerald-100/90 mt-0.5">List your inventory, get verified, and reach 50,000+ tech buyers across Nigeria.</p>
          </div>
          <Link
            href="/seller/onboarding"
            className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform hover:scale-105 shrink-0 cursor-pointer"
          >
            Apply for Verified Store Badge
          </Link>
        </div>

      </div>
    </section>
  );
}
