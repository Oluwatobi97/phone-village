'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import MobileBottomNav from '../../../../components/MobileBottomNav';
import { useAuth } from '../../../../context/AuthContext';
import { useTheme } from '../../../../context/ThemeContext';
import { PhoneListing, PhoneCondition } from '../../../../types/phone';

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState<'Apple' | 'Samsung' | 'Tecno' | 'Infinix' | 'Xiaomi' | 'Google' | 'OnePlus'>('Apple');
  const [model, setModel] = useState('');
  const [priceNgn, setPriceNgn] = useState('');
  const [condition, setCondition] = useState<PhoneCondition>('UK Used');
  const [storage, setStorage] = useState('256GB');
  const [ram, setRam] = useState('8GB');
  const [batteryHealth, setBatteryHealth] = useState('95');
  const [color, setColor] = useState('Natural Titanium');
  const [hubRegion, setHubRegion] = useState<'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan'>('Lagos');
  const [location, setLocation] = useState('Computer Village, Ikeja, Lagos');
  const [sellerStore, setSellerStore] = useState(user?.storeName || 'My Gadget Hub');
  const [sellerAddress, setSellerAddress] = useState(user?.storeAddress || 'Shop 14, Otigba Street, Ikeja');
  const [sellerPhone, setSellerPhone] = useState(user?.phone || '+2348000000000');
  const [sellerWhatsapp, setSellerWhatsapp] = useState('2348000000000');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newListing: PhoneListing = {
      id: `listing-${Date.now()}`,
      title,
      brand,
      model: model || title,
      priceNgn: Number(priceNgn) || 500000,
      condition,
      storage,
      ram,
      batteryHealth: condition === 'UK Used' ? Number(batteryHealth) : undefined,
      color,
      location,
      hubRegion,
      sellerName: user?.name || 'Authorized Seller',
      sellerStore,
      sellerPhone,
      sellerWhatsapp,
      verifiedSeller: true,
      sellerAddress,
      rating: 5.0,
      reviewCount: 1,
      image,
      gallery: [image],
      description,
      status: 'ACTIVE',
      features: ['Factory Unlocked', 'Physical Inspection Guaranteed', 'Instant Handover'],
      specs: {
        display: 'High Refresh Rate Display',
        camera: 'Advanced Mobile Camera System',
        battery: condition === 'UK Used' ? `${batteryHealth}% Battery Health` : '100% Brand New',
        processor: 'Flagship Octa-Core Chipset'
      }
    };

    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('pv_user_listings');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newListing);
      localStorage.setItem('pv_user_listings', JSON.stringify(list));
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => {
        router.push('/seller/listings');
      }, 1500);
    }, 600);
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <div className={`flex items-center gap-2 text-xs font-bold mb-1 ${
            darkMode ? 'text-emerald-400' : 'text-emerald-700'
          }`}>
            <Link href="/seller/listings" className="hover:underline">My Listings</Link>
            <span>/</span>
            <span>Post New Phone Ad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            List a Smartphone for Sale
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${
            darkMode ? 'text-emerald-300/80' : 'text-slate-600'
          }`}>
            Reach thousands of serious buyers in Computer Village, Banex Plaza, and nationwide.
          </p>
        </div>

        {successMsg ? (
          <div className={`p-8 rounded-3xl border text-center space-y-4 animate-in fade-in ${
            darkMode ? 'bg-emerald-950/60 border-emerald-500/80 text-white' : 'bg-white border-emerald-300 shadow-lg text-slate-900'
          }`}>
            <div className="text-4xl">🎉</div>
            <h2 className={`text-xl font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Phone Ad Published Successfully!</h2>
            <p className={`text-xs ${darkMode ? 'text-emerald-200' : 'text-slate-600'}`}>Redirecting to your seller inventory dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            
            {/* Phone Title */}
            <div>
              <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                darkMode ? 'text-emerald-300' : 'text-slate-700'
              }`}>
                Listing Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. iPhone 15 Pro Max 256GB Natural Titanium (Clean UK Used)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none focus:border-emerald-500 ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Brand & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value as any)}
                  className={`w-full p-3 rounded-xl border text-xs font-bold outline-none cursor-pointer ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Apple">Apple iPhone</option>
                  <option value="Samsung">Samsung Galaxy</option>
                  <option value="Google">Google Pixel</option>
                  <option value="Tecno">Tecno Mobile</option>
                  <option value="Infinix">Infinix</option>
                  <option value="Xiaomi">Xiaomi / Redmi</option>
                  <option value="OnePlus">OnePlus</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Model
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 15 Pro Max"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none focus:border-emerald-500 ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Price & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Price in Naira (₦)
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1450000"
                  value={priceNgn}
                  onChange={(e) => setPriceNgn(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none focus:border-emerald-500 ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className={`w-full p-3 rounded-xl border text-xs font-bold outline-none cursor-pointer ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Brand New">Brand New Sealed</option>
                  <option value="UK Used">UK Used (Grade A+)</option>
                  <option value="Locally Used">Locally Used Clean</option>
                </select>
              </div>
            </div>

            {/* Storage, RAM & Battery Health */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Storage
                </label>
                <input
                  type="text"
                  placeholder="128GB, 256GB, 512GB..."
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  RAM
                </label>
                <input
                  type="text"
                  placeholder="8GB, 12GB..."
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Battery Health (%)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 96"
                  value={batteryHealth}
                  onChange={(e) => setBatteryHealth(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Tech Hub & Physical Store Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Tech Hub Region
                </label>
                <select
                  value={hubRegion}
                  onChange={(e) => setHubRegion(e.target.value as any)}
                  className={`w-full p-3 rounded-xl border text-xs font-bold outline-none cursor-pointer ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Lagos">Lagos (Computer Village / VI)</option>
                  <option value="Abuja">Abuja (Banex / Emab Plaza)</option>
                  <option value="Port Harcourt">Port Harcourt (Garrison)</option>
                  <option value="Ibadan">Ibadan (Iwo Road)</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Shop Address for Testing
                </label>
                <input
                  type="text"
                  required
                  placeholder="Shop B12, Medical Road, Ikeja"
                  value={sellerAddress}
                  onChange={(e) => setSellerAddress(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="2348031234567"
                  value={sellerWhatsapp}
                  onChange={(e) => setSellerWhatsapp(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}>
                  Phone Photo Image URL
                </label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`text-xs font-extrabold uppercase tracking-wider block mb-2 ${
                darkMode ? 'text-emerald-300' : 'text-slate-700'
              }`}>
                Condition Notes & Accessories Included
              </label>
              <textarea
                rows={3}
                placeholder="State any accessories, warranty duration, or specific tests conducted..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              {isSubmitting ? 'Publishing Listing...' : 'Publish Phone Listing on Marketplace'}
            </button>

          </form>
        )}

      </main>

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
