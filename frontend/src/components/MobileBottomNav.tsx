'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { darkMode } = useTheme();
  const { openChat, totalUnreadCount } = useChat();

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-lg border-t px-2 py-1.5 shadow-2xl transition-colors ${
      darkMode 
        ? 'bg-[#021B12]/95 border-emerald-900/80' 
        : 'bg-white/95 border-slate-200'
    }`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-xl transition-all ${
            pathname === '/'
              ? darkMode ? 'text-emerald-400 font-extrabold' : 'text-emerald-700 font-extrabold'
              : darkMode ? 'text-slate-400 hover:text-emerald-300 font-medium' : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <span className="text-lg leading-none mb-0.5">🏠</span>
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        <Link
          href="/phones"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-xl transition-all ${
            pathname === '/phones'
              ? darkMode ? 'text-emerald-400 font-extrabold' : 'text-emerald-700 font-extrabold'
              : darkMode ? 'text-slate-400 hover:text-emerald-300 font-medium' : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <span className="text-lg leading-none mb-0.5">📱</span>
          <span className="text-[10px] tracking-tight">Market</span>
        </Link>

        <Link
          href="/sell/phones/new"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-xl transition-all text-white"
        >
          <div className={`w-10 h-10 -mt-5 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-full flex items-center justify-center text-white text-lg font-black shadow-lg shadow-emerald-600/40 border-2 ${
            darkMode ? 'border-[#021B12]' : 'border-white'
          }`}>
            ➕
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-black text-emerald-600 dark:text-emerald-400">
            Sell
          </span>
        </Link>

        <button
          onClick={() => openChat()}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-xl transition-all relative cursor-pointer ${
            darkMode ? 'text-slate-400 hover:text-emerald-300 font-medium' : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <span className="text-lg leading-none mb-0.5">💬</span>
          <span className="text-[10px] tracking-tight">Chats</span>
          {totalUnreadCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
              {totalUnreadCount}
            </span>
          )}
        </button>

        <Link
          href="/account"
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-xl transition-all ${
            pathname === '/account'
              ? darkMode ? 'text-emerald-400 font-extrabold' : 'text-emerald-700 font-extrabold'
              : darkMode ? 'text-slate-400 hover:text-emerald-300 font-medium' : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <span className="text-lg leading-none mb-0.5">👤</span>
          <span className="text-[10px] tracking-tight">Account</span>
        </Link>
      </div>
    </div>
  );
}
