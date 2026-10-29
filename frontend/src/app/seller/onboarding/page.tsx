'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileBottomNav from '../../../components/MobileBottomNav';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

export default function SellerOnboardingPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState(user?.storeName || '');
  const [ownerName, setOwnerName] = useState(user?.name || '');
  const [cacNumber, setCacNumber] = useState('');
  const [hubLocation, setHubLocation] = useState('Computer Village, Ikeja, Lagos');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [phone, setPhone] = useState(user?.phone || '+234');
  const [whatsapp, setWhatsapp] = useState('234');
  const [specialties, setSpecialties] = useState<string[]>(['Apple iPhones', 'UK Used Grade A']);
  const [submitted, setSubmitted] = useState(false);

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: user?.id || `dealer-${Date.now()}`,
      name: ownerName || 'Verified Merchant',
      email: user?.email || 'dealer@phonevillage.ng',
      phone,
      role: 'dealer',
      storeName,
      storeAddress: physicalAddress,
      hubLocation,
      isVerified: true,
    });
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-2 border ${
            darkMode ? 'text-emerald-400 bg-emerald-950 border-emerald-800' : 'text-emerald-800 bg-emerald-50 border-emerald-200'
          }`}>
            <span>Verified Merchant Badging</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Register Your Tech Hub Store
          </h1>
          <p className={`text-xs sm:text-sm mt-1 max-w-lg mx-auto ${
            darkMode ? 'text-emerald-300/80' : 'text-slate-600'
          }`}>
            Get the green verified checkmark, appear at the top of marketplace search, and receive direct buyer calls.
          </p>
        </div>

        {submitted ? (
          <div className={`p-8 rounded-3xl border text-center space-y-4 animate-in fade-in ${
            darkMode ? 'bg-emerald-950/60 border-emerald-500/80 text-white' : 'bg-white border-emerald-300 shadow-lg text-slate-900'
          }`}>
            <div className="text-5xl">🛡️</div>
            <h2 className={`text-2xl font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Store Verification Submitted!</h2>
            <p className={`text-xs sm:text-sm max-w-md mx-auto ${darkMode ? 'text-emerald-200' : 'text-slate-600'}`}>
              Your store <strong>{storeName}</strong> has been granted immediate verified preview status. You can now post unlimited inventory ads.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                href="/sell/phones/new"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg"
              >
                Post First Phone Ad →
              </Link>
              <Link
                href="/seller/listings"
                className={`px-5 py-2.5 border font-bold text-xs rounded-xl ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-emerald-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Go to Inventory
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleComplete} className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            
            {/* Step 1: Store & CAC Identity */}
            <div className="space-y-4">
              <h3 className={`text-sm font-extrabold uppercase tracking-wider pb-2 border-b ${
                darkMode ? 'text-emerald-400 border-emerald-900/60' : 'text-slate-900 border-slate-100'
              }`}>
                1. Business Identity & Hub Location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${
                    darkMode ? 'text-emerald-300' : 'text-slate-700'
                  }`}>
                    Store / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Gadgets Hub Ltd"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                      darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${
                    darkMode ? 'text-emerald-300' : 'text-slate-700'
                  }`}>
                    Proprietor Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emeka Okafor"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                      darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${
                    darkMode ? 'text-emerald-300' : 'text-slate-700'
                  }`}>
                    CAC Registration (RC/BN Number)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BN 3948291 (or leave blank if market registered)"
                    value={cacNumber}
                    onChange={(e) => setCacNumber(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                      darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${
                    darkMode ? 'text-emerald-300' : 'text-slate-700'
                  }`}>
                    Tech Hub Market
                  </label>
                  <select
                    value={hubLocation}
                    onChange={(e) => setHubLocation(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold outline-none cursor-pointer ${
                      darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Computer Village, Ikeja, Lagos">Computer Village, Ikeja, Lagos</option>
                    <option value="Victoria Island & Lekki, Lagos">Victoria Island & Lekki, Lagos</option>
                    <option value="Banex & Emab Plaza, Wuse 2, Abuja">Banex & Emab Plaza, Wuse 2, Abuja</option>
                    <option value="Garrison Tech Market, Port Harcourt">Garrison Tech Market, Port Harcourt</option>
                    <option value="Iwo Road Electronics Market, Ibadan">Iwo Road Electronics Market, Ibadan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`text-xs font-bold block mb-1.5 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Exact Physical Shop Address (For Buyer Device Inspection)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shop B12, Medical Road, Computer Village, Ikeja, Lagos"
                  value={physicalAddress}
                  onChange={(e) => setPhysicalAddress(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Step 2: Contact Channels */}
            <div className={`space-y-4 pt-4 border-t ${
              darkMode ? 'border-emerald-900/60' : 'border-slate-100'
            }`}>
              <h3 className={`text-sm font-extrabold uppercase tracking-wider pb-2 border-b ${
                darkMode ? 'text-emerald-400 border-emerald-900/60' : 'text-slate-900 border-slate-100'
              }`}>
                2. Direct Buyer Contact Numbers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${
                    darkMode ? 'text-emerald-300' : 'text-slate-700'
                  }`}>
                    Store Phone Line
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+2348031234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                      darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${
                    darkMode ? 'text-emerald-300' : 'text-slate-700'
                  }`}>
                    Secondary Business Line (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="+2348029876543"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                      darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              Verify My Store & Get Verified Badge
            </button>

          </form>
        )}

      </main>

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
