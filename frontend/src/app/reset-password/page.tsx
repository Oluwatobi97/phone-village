'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword.length < 8) {
      setErrorMsg('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-emerald-50/40 text-emerald-950'
    }`}>
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
              onClick={toggleDarkMode}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                darkMode ? 'bg-emerald-900 border-emerald-700 text-emerald-200' : 'bg-emerald-100 border-emerald-200 text-emerald-900'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <Link href="/login" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">
              ← Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 my-8">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl transition-colors ${
          darkMode ? 'bg-emerald-950/90 border-emerald-800 text-white' : 'bg-white border-emerald-200 text-emerald-950'
        }`}>
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto text-xl font-bold mb-3">
              🔒
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Create New Password</h1>
            <p className="text-xs text-emerald-400 mt-1">
              Set a strong password for your Phone Village marketplace account.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-center space-y-3">
              <span className="text-3xl">🎉</span>
              <h2 className="text-sm font-extrabold text-emerald-400">Password Updated Successfully!</h2>
              <p className="text-xs text-emerald-200">
                Your password has been securely reset. You can now log into your account.
              </p>
              <Link
                href="/login"
                className="inline-block mt-3 px-5 py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-500"
              >
                Sign In with New Password →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
                  New Password (min 8 characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none pr-10 ${
                      darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-xs opacity-60 hover:opacity-100"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full p-3 rounded-xl border text-xs font-semibold outline-none ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all min-h-[44px]"
              >
                {isSubmitting ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          )}

        </div>
      </main>

      <footer className="py-4 text-center text-xs text-emerald-400/80 border-t border-emerald-900/40">
        <p>© {new Date().getFullYear()} Phone Village Nigeria · Password Update</p>
      </footer>
      <MobileBottomNav />
    </div>
  );
}
