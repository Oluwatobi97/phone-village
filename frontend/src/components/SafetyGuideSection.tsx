'use client';

import React from 'react';
import { MOCK_IMAGES } from '../data/mockData';
import TiltCard from './TiltCard';

interface SafetyGuideSectionProps {
  darkMode: boolean;
}

export default function SafetyGuideSection({ darkMode }: SafetyGuideSectionProps) {
  const safetyRules = [
    {
      step: '01',
      title: 'Inspect Device in Public Tech Hubs',
      desc: 'Always meet sellers at verified physical shopfronts in Computer Village Ikeja, Victoria Island, Wuse II Abuja, or public mall tech hubs. Never meet in private residential locations.',
    },
    {
      step: '02',
      title: 'Verify IMEI & 3uTools Report',
      desc: 'Dial *#06# on the device to inspect the 15-digit IMEI. Cross-reference the IMEI against official records and check battery health metrics before making any transfer.',
    },
    {
      step: '03',
      title: 'Complete Hardware & Screen Diagnostic',
      desc: 'Test true tone, face ID / fingerprint scanner, camera zoom lenses, speaker clarity, charging port, and insert your active SIM card to test mobile network calls.',
    },
    {
      step: '04',
      title: 'Confirm Factory Unlock & Account Logout',
      desc: 'Ensure the previous owner has completely signed out of iCloud, Apple ID, Google Account, or Samsung Account before issuing payment.',
    },
  ];

  return (
    <section id="safety-guide" className={`py-16 transition-colors border-t ${
      darkMode 
        ? 'bg-[#021B12] border-emerald-900 text-white' 
        : 'bg-white border-emerald-100 text-emerald-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image & Callout */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard>
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-emerald-900/20 shadow-xl border border-emerald-700/60 relative">
                <img 
                  src={MOCK_IMAGES.phoneInspection} 
                  alt="Phone Inspection Safety Check" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                  <p className="text-xs font-mono font-bold text-emerald-400">IMEI & Hardware Audit</p>
                  <p className="text-sm font-extrabold">Physical Inspection Guarantee</p>
                </div>
              </div>
            </TiltCard>

            <div className={`p-4 border rounded-xl ${
              darkMode ? 'bg-emerald-950/80 border-emerald-800' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <p className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Scam Prevention Hotline</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-emerald-200' : 'text-emerald-900'}`}>
                Encountered a suspicious seller or unverified IMEI? Report immediately to the Phone Village Trust & Safety Operations team.
              </p>
            </div>
          </div>

          {/* Right Column: Safety Protocol Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-900 px-3 py-1 rounded-full mb-2 border border-emerald-700">
                <span>Buyer Protection Checklist</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                darkMode ? 'text-white' : 'text-emerald-950'
              }`}>
                How to Safely Buy Phones in Nigeria
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${
                darkMode ? 'text-emerald-200' : 'text-emerald-800'
              }`}>
                Follow these 4 mandatory safety steps before making payment for any new or pre-owned smartphone.
              </p>
            </div>

            <div className="space-y-4">
              {safetyRules.map((rule) => (
                <TiltCard key={rule.step}>
                  <div className={`p-4 border rounded-xl shadow-sm flex items-start gap-4 transition-colors ${
                    darkMode 
                      ? 'bg-emerald-950/80 border-emerald-800 text-white' 
                      : 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                  }`}>
                    <span className="text-lg font-black text-emerald-500 font-mono shrink-0 pt-0.5">
                      {rule.step}.
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold">{rule.title}</h3>
                      <p className={`text-xs mt-1 leading-relaxed ${
                        darkMode ? 'text-emerald-200' : 'text-emerald-800'
                      }`}>{rule.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
