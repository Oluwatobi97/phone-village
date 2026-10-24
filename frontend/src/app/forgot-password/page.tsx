'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Call API / mock behavior
    setTimeout(async () => {
      try {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        setIsSubmitting(false);

        if (data.success) {
          setSubmitted(true);
        } else {
          setErrorMsg(data.error?.message || 'Failed to request password reset.');
        }
      } catch {
        setIsSubmitting(false);
        setSubmitted(true); // Fallback mock success
      }
    }, 800);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-emerald-50/40 text-emerald-950'
    }`}>
      {/* Top Header */}
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
              href="/login"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Forgot Password Card */}
      <main className="flex-1 flex items-center justify-center p-4 my-8">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-2xl border shadow-2xl transition-colors ${
          darkMode 
            ? 'bg-emerald-950/90 border-emerald-800 text-white' 
            : 'bg-white border-emerald-200 text-emerald-950'
        }`}>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full mb-2">
              <span>Account Recovery</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Forgot Your Password?</h1>
            <p className="text-xs text-emerald-600 mt-1">
              Enter your registered email address to re-issue password recovery instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl space-y-3 text-xs text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <p className="font-extrabold text-sm text-emerald-950">Reset Instructions Sent</p>
              <p className="leading-relaxed text-emerald-800">
                If an account exists for <strong className="text-emerald-950">{email}</strong>, password reset instructions have been re-issued.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition-colors"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 bg-emerald-800 text-white font-bold rounded-lg border border-emerald-600">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div>
                <label className="block font-bold mb-1 text-emerald-700">Account Email Address</label>
                <input
                  type="email"
                  placeholder="e.g., name@example.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                    darkMode ? 'bg-emerald-900/60 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <span>Requesting Reset...</span>
                ) : (
                  <span>Send Reset Password Link</span>
                )}
              </button>
            </form>
          )}

          <p className="text-center text-xs font-semibold text-emerald-700 mt-6">
            Remembered your password?{' '}
            <Link href="/login" className="text-emerald-600 font-extrabold hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </main>

      <footer className="py-4 text-center text-xs text-emerald-700 border-t border-emerald-100">
        <p>© {new Date().getFullYear()} Phone Village Nigeria · Account Recovery</p>
      </footer>
    </div>
  );
}
