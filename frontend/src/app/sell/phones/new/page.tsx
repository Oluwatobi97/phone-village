'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../../context/AuthContext';
import ListingDetailModal from '../../../../components/ListingDetailModal';
import { PhoneListing } from '../../../../types/phone';

const PRESET_IMAGES = [
  { name: 'iPhone 15 Pro Natural Titanium', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800' },
  { name: 'Samsung Galaxy S24 Ultra Titanium Black', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800' },
  { name: 'Google Pixel 8 Pro Bay Blue', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800' },
  { name: 'iPhone 13 Pro Alpine Green', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800' },
  { name: 'Classic Smartphone Studio Clean', url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800' },
];

export default function CreatePhoneListingPage() {
  const { user, demoLoginDealer } = useAuth();

  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Eligibility & Auth status
  const [checkingEligibility, setCheckingEligibility] = useState<boolean>(true);
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [eligibilityReasons, setEligibilityReasons] = useState<string[]>([]);

  // Form Fields
  const [brand, setBrand] = useState<string>('Apple');
  const [model, setModel] = useState<string>('iPhone 15 Pro Max');
  const [storage, setStorage] = useState<string>('256GB');
  const [color, setColor] = useState<string>('Natural Titanium');
  const [condition, setCondition] = useState<string>('UK Used (Grade A+ / Mint)');
  const [batteryHealth, setBatteryHealth] = useState<string>('92%');
  const [imei, setImei] = useState<string>('');

  const [price, setPrice] = useState<string>('850000');
  const [negotiable, setNegotiable] = useState<boolean>(true);
  const [swapAccepted, setSwapAccepted] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('Super clean UK used iPhone 15 Pro Max with original box and cable. Never opened or repaired. Factory unlocked for all Nigerian networks.');
  const [selectedDefects, setSelectedDefects] = useState<string[]>(['100% Faultless / No Defects']);

  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800'
  ]);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');

  const [locationRegion, setLocationRegion] = useState<string>('Computer Village, Ikeja, Lagos');
  const [pickupAddress, setPickupAddress] = useState<string>(() => user?.storeAddress || 'Shop 14, Otigba Street, Computer Village, Ikeja, Lagos');
  const [allowWhatsapp, setAllowWhatsapp] = useState<boolean>(true);
  const [allowCall, setAllowCall] = useState<boolean>(true);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [createdListing, setCreatedListing] = useState<PhoneListing | null>(null);

  // Check Seller Eligibility on load
  useEffect(() => {
    async function checkEligibility() {
      setCheckingEligibility(true);
      try {
        const res = await fetch('/api/sellers/eligibility');
        const data = await res.json();

        if (res.ok && data.success && data.data?.canCreateListing) {
          setIsEligible(true);
          setEligibilityReasons([]);
        } else if (user?.role === 'dealer' || user?.storeName) {
          // If logged in as dealer in client state, allow creation
          setIsEligible(true);
          setEligibilityReasons([]);
        } else {
          setIsEligible(false);
          setEligibilityReasons(data.data?.reasons || ['Seller store profile must be completed before creating listings.']);
        }
      } catch {
        if (user?.role === 'dealer' || user?.storeName) {
          setIsEligible(true);
        } else {
          setIsEligible(false);
          setEligibilityReasons(['Unable to verify backend session. Please complete seller onboarding first.']);
        }
      } finally {
        setCheckingEligibility(false);
      }
    }

    checkEligibility();
  }, [user]);

  const handleAddImage = (url: string) => {
    if (!url || imageUrls.includes(url)) return;
    setImageUrls([...imageUrls, url]);
    setCustomImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    if (imageUrls.length <= 1) return;
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const toggleDefect = (defect: string) => {
    if (defect === '100% Faultless / No Defects') {
      setSelectedDefects(['100% Faultless / No Defects']);
      return;
    }

    const filtered = selectedDefects.filter(d => d !== '100% Faultless / No Defects');
    if (filtered.includes(defect)) {
      setSelectedDefects(filtered.filter(d => d !== defect));
    } else {
      setSelectedDefects([...filtered, defect]);
    }
  };

  const numericPrice = parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;

  // Map condition select string to PhoneCondition enum
  const mappedCondition = condition.includes('Brand New') ? 'Brand New' : condition.includes('Nigerian') ? 'Locally Used' : 'UK Used';

  // Build live preview object
  const previewListing: PhoneListing = {
    id: 'ph-preview-temp',
    title: `${brand} ${model} - ${storage} (${color})`,
    brand: (['Apple', 'Samsung', 'Tecno', 'Infinix', 'Xiaomi', 'Google', 'OnePlus'].includes(brand) ? brand : 'Apple') as PhoneListing['brand'],
    model,
    priceNgn: numericPrice,
    condition: mappedCondition,
    storage,
    batteryHealth: parseInt(batteryHealth, 10) || 90,
    color,
    location: locationRegion,
    hubRegion: 'Lagos',
    sellerName: user?.name || 'Verified Phone Seller',
    sellerStore: user?.storeName || 'Verified Phone Hub',
    sellerPhone: user?.phone || '+2348031234567',
    sellerWhatsapp: user?.phone?.replace('+', '') || '2348031234567',
    verifiedSeller: true,
    sellerAddress: pickupAddress,
    rating: 4.9,
    reviewCount: 18,
    image: imageUrls[0] || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    description: `${description}\n\nCondition disclosures: ${selectedDefects.join(', ')}. IMEICheck status verified.`,
    features: selectedDefects,
    specs: {
      display: '6.7-inch Super Retina XDR OLED 120Hz',
      processor: 'A17 Pro / Snapdragon 8 Gen 3',
      camera: '48MP Main + 12MP Ultra-Wide + 12MP Telephoto',
      battery: batteryHealth ? `Battery Health: ${batteryHealth}` : '4422 mAh',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!model.trim()) {
      setErrorMsg('Please specify the phone model (e.g. iPhone 15 Pro Max).');
      return;
    }

    if (numericPrice < 5000) {
      setErrorMsg('Please enter a realistic price in Naira (minimum ₦5,000).');
      return;
    }

    if (imageUrls.length === 0) {
      setErrorMsg('At least one phone photo is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new listing object
      const finalListing: PhoneListing = {
        ...previewListing,
        id: `ph-new-${Date.now()}`,
      };

      // Save to localStorage mock list for persistent local viewing
      if (typeof window !== 'undefined') {
        const existing = localStorage.getItem('pv_user_listings');
        const list = existing ? JSON.parse(existing) : [];
        list.unshift(finalListing);
        localStorage.setItem('pv_user_listings', JSON.stringify(list));
      }

      setCreatedListing(finalListing);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors ${darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
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
            <Link href="/seller/onboarding" className="hover:text-emerald-500 transition-colors">Seller Profile</Link>
            <span className="text-emerald-500 font-semibold underline decoration-emerald-500 underline-offset-4">List a Phone</span>
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

            {user ? (
              <span className="text-xs font-medium text-emerald-400">
                Seller: <strong className="text-white">{user.storeName || user.name}</strong>
              </span>
            ) : (
              <Link href="/login" className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6">
        {/* Page Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
              <span>Step 2 of 2</span>
              <span>·</span>
              <span>Listing Creation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Create New Smartphone Listing
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setPreviewModalOpen(true)}
            className="px-4 py-2 text-xs font-extrabold text-emerald-300 bg-emerald-900/80 border border-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-2"
          >
            <span>👁️ Live Buyer Preview</span>
          </button>
        </div>

        {/* Check Eligibility State */}
        {checkingEligibility ? (
          <div className="p-12 text-center rounded-2xl border bg-emerald-950/40 border-emerald-800/60">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <span className="text-sm font-medium text-emerald-300">Verifying seller store eligibility...</span>
          </div>
        ) : !isEligible ? (
          <div className={`p-8 rounded-2xl border mb-8 text-center ${
            darkMode ? 'bg-amber-950/30 border-amber-800/80' : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xl mx-auto mb-4">
              🏪
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-amber-100 mb-2">
              Seller Profile Required Before Listing
            </h2>
            <p className="text-sm text-slate-600 dark:text-amber-200/80 max-w-lg mx-auto mb-6">
              To ensure trust and prevent fraudulent phone postings, Phone Village requires every seller to complete a store profile with contact details and location verification.
            </p>

            {eligibilityReasons.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-amber-900/20 border border-amber-800/40 max-w-md mx-auto text-xs text-amber-300 text-left">
                <strong className="block font-bold mb-1">Requirement Check:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {eligibilityReasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/seller/onboarding"
                className="px-6 py-3 text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg"
              >
                Complete Seller Onboarding →
              </Link>

              <button
                type="button"
                onClick={() => {
                  demoLoginDealer();
                  setIsEligible(true);
                }}
                className="px-6 py-3 text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                Quick Demo Dealer Login
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-3">
                <span className="text-rose-500 font-bold">⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Phone Information */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
            }`}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>1. Phone Specifications</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Brand */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Phone Brand <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      darkMode ? 'bg-emerald-900/80 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google">Google</option>
                    <option value="Xiaomi">Xiaomi / Redmi</option>
                    <option value="Tecno">Tecno</option>
                    <option value="Infinix">Infinix</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Other">Other Brand</option>
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Model & Variant <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 15 Pro Max"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Storage Capacity */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Storage Capacity
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['64GB', '128GB', '256GB', '512GB', '1TB'].map((stg) => (
                      <button
                        key={stg}
                        type="button"
                        onClick={() => setStorage(stg)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                          storage === stg
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : darkMode ? 'bg-emerald-900/40 border-emerald-800 text-emerald-300 hover:bg-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {stg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colour */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Color Finish
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Natural Titanium, Deep Purple, Phantom Black"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Phone Condition */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Device Condition <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      darkMode ? 'bg-emerald-900/80 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Brand New (Sealed)">Brand New (Box Sealed / Unopened)</option>
                    <option value="UK Used (Grade A+ / Mint)">UK Used (Grade A+ / Mint - No Scratches)</option>
                    <option value="UK Used (Grade A / Clean)">UK Used (Grade A / Clean - Minor Micro Hairlines)</option>
                    <option value="Nigerian Used">Nigerian Used (Good Working Condition)</option>
                    <option value="Refurbished">Refurbished / Replaced Screen or Shell</option>
                  </select>
                </div>

                {/* Battery Health % */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Battery Health % (Optional / iPhones)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 92% or 100%"
                    value={batteryHealth}
                    onChange={(e) => setBatteryHealth(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              {/* IMEI Safety Check */}
              <div className="mt-5 pt-5 border-t border-emerald-800/40">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300">
                    IMEI / Serial Number (Optional - IMEICheck Safety Shield)
                  </label>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <span>🛡️</span>
                    <span>IMEICheck Protection</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 352891104829104 (Kept confidential - used strictly for anti-stolen verification)"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <p className="text-[11px] text-slate-500 dark:text-emerald-300/70 mt-1">
                  Listings with verified IMEI records earn a special IMEICheck Clean badge and rank higher in buyer searches.
                </p>
              </div>
            </div>

            {/* Section 2: Pricing & Trade Terms */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
            }`}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>2. Pricing & Deal Conditions</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                {/* Price in Naira */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Selling Price (Nigerian Naira ₦) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 font-bold text-emerald-500">₦</span>
                    <input
                      type="text"
                      required
                      placeholder="850,000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`w-full pl-9 pr-4 py-3 text-base font-extrabold rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                        darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                  {numericPrice > 0 && (
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">
                      Formatted: ₦ {numericPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={negotiable}
                      onChange={(e) => setNegotiable(e.target.checked)}
                      className="rounded border-emerald-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-slate-800 dark:text-emerald-200">
                      Price is Negotiable (Slight discount allowed on call)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={swapAccepted}
                      onChange={(e) => setSwapAccepted(e.target.checked)}
                      className="rounded border-emerald-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-slate-800 dark:text-emerald-200">
                      Swap / Trade-in Allowed (Accept lower model + cash balance)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Description & Honest Defects Disclosure */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
            }`}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>3. Honest Condition & Known Notes</span>
              </h2>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Detailed Listing Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe included accessories (e.g. original box, fast charger, screen protector), network status, and overall phone usage history..."
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-3">
                  Disclosure Checklist (Building Marketplace Trust)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    '100% Faultless / No Defects',
                    'Minor Micro Hairline Scratches',
                    'Screen Scratch / Screen Protector Included',
                    'Body Casing Wear / Scuff Marks',
                    'Replaced Original Battery (Health 100%)',
                    'Replaced Screen (OLED Original Quality)',
                    'Face ID / Touch ID Disabled',
                    'Box & Receipt Included'
                  ].map((defect) => {
                    const isSelected = selectedDefects.includes(defect);
                    return (
                      <button
                        key={defect}
                        type="button"
                        onClick={() => toggleDefect(defect)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-600/20 border-emerald-500 text-emerald-900 dark:text-white'
                            : darkMode ? 'bg-emerald-900/20 border-emerald-800/40 text-slate-400 hover:border-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{defect}</span>
                        {isSelected && <span className="text-emerald-400 font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 4: Phone Photos */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
            }`}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>4. Phone Photography</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-emerald-300/70 mb-6">
                Upload clear photos showing the front screen, back cover, and camera module. You can also pick from realistic studio stock photos below for quick demo testing.
              </p>

              {/* Photo Previews */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-emerald-700/80 bg-slate-900 group">
                    <img src={url} alt={`Phone Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                        Main Cover
                      </span>
                    )}
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Preset Stock Selectors for Fast Demoing */}
              <div className="mb-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Quick Preset Gallery (Click to Add Photo)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddImage(preset.url)}
                      className="p-2 rounded-lg border border-emerald-800/60 bg-emerald-900/20 hover:bg-emerald-800/40 text-left text-[11px] text-emerald-200 transition-colors cursor-pointer"
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-16 object-cover rounded mb-1" />
                      <span className="truncate block">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image URL Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste direct phone photo image URL..."
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className={`flex-1 px-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleAddImage(customImageUrl)}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Add Image
                </button>
              </div>
            </div>

            {/* Section 5: Location & Contact Actions */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
            }`}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>5. Pick-up Location & Contact Preferences</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Commercial Location <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={locationRegion}
                    onChange={(e) => setLocationRegion(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      darkMode ? 'bg-emerald-900/80 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Computer Village, Ikeja, Lagos">Computer Village, Ikeja, Lagos</option>
                    <option value="Victoria Island / Lekki, Lagos">Victoria Island / Lekki, Lagos</option>
                    <option value="Wuse 2 / Central Area, Abuja">Wuse 2 / Central Area, Abuja</option>
                    <option value="Garrison / Aba Road, Port Harcourt">Garrison / Aba Road, Port Harcourt</option>
                    <option value="Dugbe / Ring Road, Ibadan">Dugbe / Ring Road, Ibadan</option>
                    <option value="Other Regional Center">Other Regional Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Physical Store / Meeting Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shop 14, Otigba Street, Computer Village, Ikeja"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                      darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-6 mt-6 pt-5 border-t border-emerald-800/40">
                <label className="flex items-center gap-2 text-xs font-bold text-emerald-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowWhatsapp}
                    onChange={(e) => setAllowWhatsapp(e.target.checked)}
                    className="rounded border-emerald-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Allow Direct WhatsApp Messages</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-emerald-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCall}
                    onChange={(e) => setAllowCall(e.target.checked)}
                    className="rounded border-emerald-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Allow Phone Calls</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={() => setPreviewModalOpen(true)}
                className={`px-5 py-3 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                  darkMode ? 'bg-emerald-950 border-emerald-700 text-emerald-200 hover:bg-emerald-900' : 'bg-white border-emerald-200 text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                👁️ Preview Buyer View
              </button>

              <div className="flex items-center gap-3">
                <Link href="/phones" className="px-4 py-3 text-xs font-bold text-slate-400 hover:text-white">
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 rounded-xl transition-all shadow-lg shadow-emerald-900/40 cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Publishing Listing...</span>
                    </>
                  ) : (
                    <>
                      <span>Publish Phone Listing</span>
                      <span>🚀</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Live Buyer Preview Modal */}
        {previewModalOpen && (
          <ListingDetailModal
            listing={previewListing}
            onClose={() => setPreviewModalOpen(false)}
          />
        )}

        {/* Success Modal */}
        {createdListing && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`p-8 rounded-2xl border max-w-md w-full text-center shadow-2xl ${
              darkMode ? 'bg-emerald-950 border-emerald-700 text-white' : 'bg-white border-emerald-100 text-slate-900'
            }`}>
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4 animate-bounce">
                🎉
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Listing Successfully Published!
              </h2>

              <p className="text-xs text-slate-600 dark:text-emerald-200/80 mb-6 leading-relaxed">
                Your phone listing <strong className="text-emerald-400">{createdListing.title}</strong> is now live on Phone Village marketplace.
              </p>

              <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800/80 text-left mb-6 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-medium">Listing ID:</span>
                  <span className="font-mono text-white">{createdListing.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-medium">Price:</span>
                  <span className="font-extrabold text-white">₦ {createdListing.priceNgn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-medium">Location:</span>
                  <span className="text-white">{createdListing.location}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link
                  href={`/phones/${createdListing.id}`}
                  className="w-full py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors text-center"
                >
                  View Listing Detail Page →
                </Link>

                <Link
                  href="/phones"
                  className="w-full py-3 text-xs font-bold text-emerald-300 hover:text-white transition-colors text-center"
                >
                  Browse All Phone Listings
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
