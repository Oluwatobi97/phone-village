'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';

export default function AccountSettingsPage() {
  const { user, login } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Section A: Personal Details State
  const [fullName, setFullName] = useState<string>(() => user?.name || 'Phone Village User');
  const [email, setEmail] = useState<string>(() => user?.email || 'user@phonevillage.ng');
  const [phone, setPhone] = useState<string>(() => user?.phone || '+2348031234567');
  const [storeName, setStoreName] = useState<string>(() => user?.storeName || '');
  const [storeAddress, setStoreAddress] = useState<string>(() => user?.storeAddress || '');

  // Section B: Password State
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPasswords, setShowPasswords] = useState<boolean>(false);

  // Section C: Preferences
  const [whatsappAlerts, setWhatsappAlerts] = useState<boolean>(true);
  const [publicPhoneVisible, setPublicPhoneVisible] = useState<boolean>(true);

  // Feedback & Dialogs
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    login({
      ...user,
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      storeName: storeName.trim() || undefined,
      storeAddress: storeAddress.trim() || undefined,
    });

    showToast('Personal details updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password changed successfully!');
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
            <Link href="/phones" className="hover:text-emerald-500 transition-colors">Marketplace</Link>
            <Link href="/account" className="hover:text-emerald-500 transition-colors">My Account</Link>
            <span className="text-emerald-500 font-bold underline underline-offset-4">Settings</span>
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

            {user && (
              <Link href="/account" className="text-xs font-bold text-emerald-400">
                👤 {user.name}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✅</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
            Account Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Account Security & Profile Settings
          </h1>
        </div>

        <div className="space-y-8">
          {/* Section A: Personal Details */}
          <form onSubmit={handleSaveProfile} className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>1. Personal & Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Contact Phone (+234)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Store / Display Name (Optional)
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Apex iStore Ikeja"
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                Physical Address / Shop Location
              </label>
              <input
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                placeholder="e.g. Shop 14, Otigba Street, Computer Village, Ikeja, Lagos"
                className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Save Personal Details
              </button>
            </div>
          </form>

          {/* Section B: Password & Security */}
          <form onSubmit={handleChangePassword} className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>2. Change Password</span>
              </h2>

              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                {showPasswords ? '🙈 Hide Passwords' : '👁️ Show Passwords'}
              </button>
            </div>

            {passwordError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
                ⚠️ {passwordError}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                  Current Password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    New Password
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>

          {/* Section C: Privacy & Notifications */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
            darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
          }`}>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>3. Privacy & Communication Toggles</span>
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-xl border border-emerald-800/40 bg-emerald-900/20 cursor-pointer">
                <div>
                  <strong className="block text-xs font-bold text-white">Direct WhatsApp Buyer Alerts</strong>
                  <span className="text-[11px] text-emerald-300/70">Receive instant WhatsApp alerts when buyers enquire about your phones.</span>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-emerald-800/40 bg-emerald-900/20 cursor-pointer">
                <div>
                  <strong className="block text-xs font-bold text-white">Public Phone Number Display</strong>
                  <span className="text-[11px] text-emerald-300/70">Allow buyers to view your contact phone number on active listings.</span>
                </div>
                <input
                  type="checkbox"
                  checked={publicPhoneVisible}
                  onChange={(e) => setPublicPhoneVisible(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
              </label>
            </div>
          </div>

          {/* Section D: Danger Zone */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
            darkMode ? 'bg-rose-950/20 border-rose-900/60' : 'bg-rose-50 border-rose-200'
          }`}>
            <h2 className="text-base font-bold text-rose-400 mb-2 flex items-center gap-2">
              <span>⚠️</span>
              <span>Account Deactivation Zone</span>
            </h2>
            <p className="text-xs text-rose-300/80 mb-6">
              Deactivating your Phone Village account will hide all active phone listings and disable buyer messaging.
            </p>

            <button
              onClick={() => setDeleteModalOpen(true)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer"
            >
              Deactivate Account
            </button>
          </div>
        </div>

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`p-6 rounded-2xl border max-w-sm w-full text-center shadow-2xl ${
              darkMode ? 'bg-emerald-950 border-rose-900 text-white' : 'bg-white border-rose-200 text-slate-900'
            }`}>
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-bold mx-auto mb-3">
                ⚠️
              </div>
              <h3 className="font-extrabold text-base mb-1">Confirm Account Deactivation</h3>
              <p className="text-xs text-slate-400 mb-6">
                Are you sure you want to deactivate your account? You can reactivate anytime by signing back in.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    showToast('Account deactivation request processed.');
                  }}
                  className="px-5 py-2 text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors"
                >
                  Confirm Deactivate
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
