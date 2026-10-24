'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [accountType, setAccountType] = useState<'buyer' | 'dealer'>('buyer');
  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('+234');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lagos (Computer Village & VI)');
  const [cacId, setCacId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('Please accept the Phone Village marketplace safety terms.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      login({
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        name: fullName || 'Phone Village User',
        email: email || 'user@phonevillage.ng',
        phone: phone,
        role: accountType,
        storeName: accountType === 'dealer' ? storeName || 'Store Hub' : undefined,
        storeAddress: accountType === 'dealer' ? address : undefined,
        verified: accountType === 'dealer',
      });

      router.push('/');
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-emerald-50/40 text-emerald-950'
    }`}>
      {/* Top Bar Navigation */}
      <header className={`py-4 px-4 sm:px-8 border-b ${
        darkMode ? 'bg-emerald-950/90 border-emerald-800' : 'bg-white border-emerald-100'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
              PV
            </div>
            <span className="font-extrabold text-lg tracking-tight">Phone Village</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                darkMode 
                  ? 'bg-emerald-900 border-emerald-700 text-emerald-200' 
                  : 'bg-emerald-100 border-emerald-200 text-emerald-900'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            <Link
              href="/"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </header>

      {/* Main Registration Card */}
      <main className="flex-1 flex items-center justify-center p-4 my-8">
        <div className={`w-full max-w-lg p-6 sm:p-8 rounded-2xl border shadow-2xl transition-colors ${
          darkMode 
            ? 'bg-emerald-950/90 border-emerald-800 text-white' 
            : 'bg-white border-emerald-200 text-emerald-950'
        }`}>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full mb-2">
              <span>Verified Account Creation</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Join Phone Village</h1>
            <p className="text-xs text-emerald-600 mt-1">Create your buyer or verified dealer profile in Nigeria</p>
          </div>

          {/* Account Type Selection Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-emerald-900/10 border border-emerald-800/20 rounded-xl mb-6 text-xs">
            <button
              type="button"
              onClick={() => setAccountType('buyer')}
              className={`py-2.5 text-center font-bold rounded-lg transition-colors cursor-pointer ${
                accountType === 'buyer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-950'
              }`}
            >
              Individual Buyer
            </button>
            <button
              type="button"
              onClick={() => setAccountType('dealer')}
              className={`py-2.5 text-center font-bold rounded-lg transition-colors cursor-pointer ${
                accountType === 'dealer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-950'
              }`}
            >
              Verified Dealer / Store
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 bg-emerald-800 text-white text-xs font-bold rounded-lg border border-emerald-600">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            
            {/* Full Name / Store Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1 text-emerald-700">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Emeka Nnamdi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                />
              </div>

              {accountType === 'dealer' ? (
                <div>
                  <label className="block font-bold mb-1 text-emerald-700">Shop / Store Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Apex iStore Ikeja"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                    className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                      darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                    }`}
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-bold mb-1 text-emerald-700">Preferred Tech Region</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                      darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                    }`}
                  >
                    <option value="Lagos (Computer Village & VI)">Lagos (Computer Village & VI)</option>
                    <option value="Abuja (Wuse II & Central)">Abuja (Wuse II & Central)</option>
                    <option value="Port Harcourt (Garrick & Mile 1)">Port Harcourt (Garrick & Mile 1)</option>
                    <option value="Ibadan (Bodija & Dugbe)">Ibadan (Bodija & Dugbe)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1 text-emerald-700">Phone Number (+234)</label>
                <input
                  type="tel"
                  placeholder="+2348031234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-emerald-700">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                />
              </div>
            </div>

            {/* Additional Fields for Dealer */}
            {accountType === 'dealer' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold mb-1 text-emerald-700">Physical Store Address</label>
                  <input
                    type="text"
                    placeholder="e.g., Shop 14, Otigba Street, Computer Village, Ikeja, Lagos"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                      darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-emerald-700">CAC / Business Reg Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., RC-1234567"
                    value={cacId}
                    onChange={(e) => setCacId(e.target.value)}
                    className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                      darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1 text-emerald-700">Create Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-emerald-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                />
              </div>
            </div>

            {/* Safety Terms Checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="font-semibold text-emerald-700 cursor-pointer leading-snug">
                I agree to the Phone Village Marketplace Safety Policy and IMEICheck physical inspection rules.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <span>Register as {accountType === 'dealer' ? 'Verified Dealer' : 'Buyer'}</span>
              )}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-xs font-semibold text-emerald-700 mt-6">
            Already registered?{' '}
            <Link href="/login" className="text-emerald-600 font-extrabold hover:underline">
              Sign In to Your Account
            </Link>
          </p>

        </div>
      </main>

      {/* Clean Footer */}
      <footer className="py-4 text-center text-xs text-emerald-700 border-t border-emerald-100">
        <p>© {new Date().getFullYear()} Phone Village Nigeria · Green & White Verified Security</p>
      </footer>
    </div>
  );
}
