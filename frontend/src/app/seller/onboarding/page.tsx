'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { SellerType, SellerOnboardingInput } from '../../../../../shared/types/seller';

export default function SellerOnboardingPage() {
  const router = useRouter();
  const { user, login, demoLoginBuyer } = useAuth();

  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sellerType, setSellerType] = useState<SellerType>('INDIVIDUAL');
  const [storeName, setStoreName] = useState<string>(() => user?.storeName || '');
  const [ownerName, setOwnerName] = useState<string>(() => user?.name || '');
  const [contactPhone, setContactPhone] = useState<string>(() => user?.phone || '');
  const [whatsappPhone, setWhatsappPhone] = useState<string>(() => user?.phone || '');
  const [sameAsContact, setSameAsContact] = useState<boolean>(true);
  const [techRegion, setTechRegion] = useState<'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan' | 'Other'>('Lagos');
  const [physicalAddress, setPhysicalAddress] = useState<string>(() => user?.storeAddress || '');
  const [cacNumber, setCacNumber] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync user profile if user object changes (e.g. after login/logout)
  const prevUserIdRef = React.useRef(user?.id);
  if (user?.id !== prevUserIdRef.current) {
    prevUserIdRef.current = user?.id;
    if (user) {
      if (!ownerName) setOwnerName(user.name || '');
      if (!contactPhone) setContactPhone(user.phone || '');
      if (!storeName && user.storeName) setStoreName(user.storeName);
      if (!physicalAddress && user.storeAddress) setPhysicalAddress(user.storeAddress);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!user) {
      setErrorMsg('You must be signed in to register as a seller. Please sign in or use demo sign in below.');
      return;
    }

    if (!storeName.trim() || storeName.trim().length < 2) {
      setErrorMsg('Please enter a valid Store or Display Name (at least 2 characters).');
      return;
    }

    if (!ownerName.trim()) {
      setErrorMsg('Owner or Representative name is required.');
      return;
    }

    if (!contactPhone.trim() || contactPhone.trim().length < 10) {
      setErrorMsg('Please enter a valid Nigerian contact phone number (e.g., +2348031234567).');
      return;
    }

    if (!physicalAddress.trim() || physicalAddress.trim().length < 5) {
      setErrorMsg('Please provide a physical store or pickup address.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('You must accept the Phone Village Seller Policy and IMEICheck Anti-Stolen device rules.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: SellerOnboardingInput = {
        sellerType,
        storeName: storeName.trim(),
        ownerName: ownerName.trim(),
        contactPhone: contactPhone.trim(),
        whatsappPhone: (sameAsContact ? contactPhone : whatsappPhone).trim(),
        techRegion,
        physicalAddress: physicalAddress.trim(),
        cacRegistrationNumber: cacNumber.trim() || undefined,
        termsAccepted: true,
      };

      const res = await fetch('/api/sellers/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.error?.message || 'Failed to complete seller onboarding.');
      }

      // Sync local auth context user profile with updated store info
      login({
        ...user,
        role: sellerType === 'DEALER' ? 'dealer' : 'dealer',
        storeName: storeName.trim(),
        storeAddress: physicalAddress.trim(),
        verified: true,
      });

      setSuccessMsg('Congratulations! Your seller store profile has been successfully created and verified.');

      setTimeout(() => {
        router.push('/sell/phones/new');
      }, 1500);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Link href="/phones" className="hover:text-emerald-500 transition-colors">Browse Marketplace</Link>
            <span className="text-emerald-500 font-semibold underline decoration-emerald-500 underline-offset-4">Seller Onboarding</span>
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-400">Signed in as <strong className="text-white">{user.name}</strong></span>
              </div>
            ) : (
              <Link href="/login" className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6">
        {/* Intro Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl border mb-8 transition-colors ${
          darkMode 
            ? 'bg-gradient-to-br from-emerald-950 via-emerald-900/50 to-[#021B12] border-emerald-800/80 shadow-xl' 
            : 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 border-emerald-200 shadow-md'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white uppercase tracking-wider">
              Seller Trust & Safety Portal
            </span>
            <span className="text-xs font-medium text-emerald-500">Step 1 of 2</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-900 dark:text-white mb-2">
            Setup Your Phone Village Seller Store Profile
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-emerald-200/80 max-w-2xl leading-relaxed">
            Phone Village connects trusted individual sellers and computer village dealers directly with verified buyers across Nigeria. Complete your seller profile to gain verified badge eligibility and list smartphones.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-800/40 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <div>
                <strong className="block text-slate-900 dark:text-white font-semibold">IMEICheck Verified</strong>
                <span className="text-slate-500 dark:text-emerald-300/70">Anti-stolen phone registry check protects all listings.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <div>
                <strong className="block text-slate-900 dark:text-white font-semibold">Direct WhatsApp Leads</strong>
                <span className="text-slate-500 dark:text-emerald-300/70">Interested buyers connect directly to your phone.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <div>
                <strong className="block text-slate-900 dark:text-white font-semibold">Verified Badge Status</strong>
                <span className="text-slate-500 dark:text-emerald-300/70">Build buyer trust with local shop address verification.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Login Prompt if not signed in */}
        {!user && (
          <div className={`p-4 sm:p-5 rounded-xl border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${
            darkMode ? 'bg-amber-950/40 border-amber-800/60 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div>
              <strong className="block font-bold text-sm">Not Signed In Yet?</strong>
              <span className="text-xs opacity-90">Sign in to your account or click demo buyer sign-in to test onboarding.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={demoLoginBuyer}
                className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Quick Demo Sign-In
              </button>
              <Link
                href="/login?redirect=/seller/onboarding"
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm mb-6 flex items-start gap-3">
            <span className="text-rose-500 font-bold">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6 flex items-start gap-3">
            <span className="text-emerald-400 font-bold">✅</span>
            <div>
              <strong className="block font-bold text-white">{successMsg}</strong>
              <span className="text-xs text-emerald-300">Redirecting to phone listing creator page...</span>
            </div>
          </div>
        )}

        {/* Onboarding Form */}
        <form onSubmit={handleSubmit} className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
          darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          {/* Step 1: Select Seller Type */}
          <div className="mb-8">
            <label className="block text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              Choose Seller Category
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSellerType('INDIVIDUAL')}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  sellerType === 'INDIVIDUAL'
                    ? 'bg-emerald-600/15 border-emerald-500 ring-2 ring-emerald-500/40 text-emerald-900 dark:text-white'
                    : 'bg-emerald-900/20 border-emerald-800/50 hover:border-emerald-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white">Individual Seller</span>
                  {sellerType === 'INDIVIDUAL' && <span className="text-emerald-400 font-bold text-sm">✓ Selected</span>}
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/70 leading-relaxed">
                  For individuals selling personal phones or upgrading to a new model. Quick setup with basic phone verification.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSellerType('DEALER')}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  sellerType === 'DEALER'
                    ? 'bg-emerald-600/15 border-emerald-500 ring-2 ring-emerald-500/40 text-emerald-900 dark:text-white'
                    : 'bg-emerald-900/20 border-emerald-800/50 hover:border-emerald-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white">Verified Phone Store / Dealer</span>
                  {sellerType === 'DEALER' && <span className="text-emerald-400 font-bold text-sm">✓ Selected</span>}
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/70 leading-relaxed">
                  For registered phone shops in Computer Village Ikeja, Abuja Wuse 2, Garrison PH, etc. Displays store badge & shop address.
                </p>
              </button>
            </div>
          </div>

          <hr className="border-emerald-800/40 my-8" />

          {/* Form Fields Grid */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Store & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Store / Display Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Store / Display Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={sellerType === 'DEALER' ? 'e.g. Apex iStore Computer Village' : 'e.g. Kelechi Gadgets'}
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Owner / Representative Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Owner / Representative Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emeka Nnamdi"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Contact Phone (+234) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+2348031234567"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* WhatsApp Phone */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300">
                    WhatsApp Phone Number
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-emerald-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsContact}
                      onChange={(e) => setSameAsContact(e.target.checked)}
                      className="rounded border-emerald-700 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Same as contact</span>
                  </label>
                </div>
                <input
                  type="tel"
                  disabled={sameAsContact}
                  placeholder="+2348031234567"
                  value={sameAsContact ? contactPhone : whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    sameAsContact
                      ? 'opacity-60 cursor-not-allowed bg-emerald-950/20 border-emerald-900'
                      : darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Tech Region */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Primary Commercial Region <span className="text-rose-500">*</span>
                </label>
                <select
                  value={techRegion}
                  onChange={(e) => setTechRegion(e.target.value as 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan' | 'Other')}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/80 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Lagos">Lagos (Computer Village Ikeja / VI / Lekki)</option>
                  <option value="Abuja">Abuja (Wuse 2 / Central Area / Garki)</option>
                  <option value="Port Harcourt">Port Harcourt (Garrison / Aba Road)</option>
                  <option value="Ibadan">Ibadan (Dugbe / Ring Road)</option>
                  <option value="Other">Other / Regional Capital</option>
                </select>
              </div>

              {/* CAC Registration Number (Dealers) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  CAC Registration No. {sellerType === 'DEALER' ? '(Recommended)' : '(Optional)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. RC-1234567"
                  value={cacNumber}
                  onChange={(e) => setCacNumber(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Physical Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                Physical Shop or Pickup Location Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Shop 14, Otigba Street, Opposite Medical Road, Computer Village, Ikeja, Lagos State"
                value={physicalAddress}
                onChange={(e) => setPhysicalAddress(e.target.value)}
                className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                  darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Terms and IMEICheck Agreement */}
            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-emerald-900/20 border-emerald-800/60' : 'bg-emerald-50 border-emerald-100'}`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 rounded border-emerald-700 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-700 dark:text-emerald-200/90 leading-relaxed">
                  I agree to Phone Village marketplace terms. I certify that all phones listed under this store profile are legally owned or sourced, accurate in condition disclosure, and free from stolen or blacklisted IMEI records.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <Link
              href="/phones"
              className="px-5 py-3 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 rounded-xl transition-all shadow-lg shadow-emerald-900/30 cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <span>Verify Profile & Proceed to Create Listing</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
