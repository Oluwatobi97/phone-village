'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { darkMode } = useTheme();

  const navItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Market', href: '/phones', icon: '📱' },
    { label: 'Sell', href: '/sell/phones/new', icon: '➕', highlight: true },
    { label: 'Chats', href: '/account/messages', icon: '💬' },
    { label: 'Account', href: '/account', icon: '👤' },
  ];

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t px-2 py-1.5 shadow-2xl transition-colors ${
      darkMode 
        ? 'bg-[#021B12]/95 border-emerald-900/80' 
        : 'bg-white/95 border-slate-200'
    }`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-xl transition-all ${
                item.highlight
                  ? 'text-white'
                  : isActive
                  ? darkMode ? 'text-emerald-400 font-extrabold' : 'text-emerald-700 font-extrabold'
                  : darkMode ? 'text-slate-400 hover:text-emerald-300 font-medium' : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              {item.highlight ? (
                <div className={`w-10 h-10 -mt-5 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-full flex items-center justify-center text-white text-lg font-black shadow-lg shadow-emerald-600/40 border-2 ${
                  darkMode ? 'border-[#021B12]' : 'border-white'
                }`}>
                  {item.icon}
                </div>
              ) : (
                <span className="text-lg leading-none mb-0.5">{item.icon}</span>
              )}
              <span className={`text-[10px] tracking-tight ${item.highlight ? 'mt-0.5 font-black text-emerald-600 dark:text-emerald-400' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
