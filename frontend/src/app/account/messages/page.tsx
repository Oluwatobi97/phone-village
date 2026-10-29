'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileBottomNav from '../../../components/MobileBottomNav';
import { useTheme } from '../../../context/ThemeContext';

import { useChat } from '../../../context/ChatContext';

interface EnquiryMessage {
  id: string;
  sender: 'buyer' | 'seller';
  senderName: string;
  text: string;
  timestamp: string;
}

interface EnquiryThread {
  id: string;
  storeName: string;
  phoneTitle: string;
  phonePriceNgn: number;
  phoneImage: string;
  location: string;
  whatsapp: string;
  unreadCount: number;
  messages: EnquiryMessage[];
}

const DEMO_THREADS: EnquiryThread[] = [
  {
    id: 'enq-001',
    storeName: 'Apex Gadgets Hub Ltd',
    phoneTitle: 'iPhone 15 Pro Max 256GB Natural Titanium',
    phonePriceNgn: 1480000,
    phoneImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
    location: 'Computer Village, Ikeja',
    whatsapp: '2348031234567',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: 'buyer',
        senderName: 'You',
        text: 'Hello, is this iPhone 15 Pro Max still available? Can I come test the battery and True Tone today?',
        timestamp: '10:30 AM',
      },
      {
        id: 'm2',
        sender: 'seller',
        senderName: 'Apex Gadgets Hub Ltd',
        text: 'Yes bro, 100% available at Shop B12 Medical Road. Battery health is 98%, clean titanium. Come around anytime before 6pm for physical testing!',
        timestamp: '10:35 AM',
      },
    ],
  },
  {
    id: 'enq-002',
    storeName: 'Crown Mobile Technologies',
    phoneTitle: 'Samsung Galaxy S24 Ultra 5G 512GB',
    phonePriceNgn: 1550000,
    phoneImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&auto=format&fit=crop&q=80',
    location: 'Banex Plaza, Wuse 2, Abuja',
    whatsapp: '2348029876543',
    unreadCount: 0,
    messages: [
      {
        id: 'm3',
        sender: 'buyer',
        senderName: 'You',
        text: 'Good day Alhaji, does this S24 Ultra come with the official 1-year Samsung warranty receipt?',
        timestamp: 'Yesterday',
      },
      {
        id: 'm4',
        sender: 'seller',
        senderName: 'Crown Mobile Technologies',
        text: 'Yes, full warranty receipt included. We will register the warranty in your name at the shop.',
        timestamp: 'Yesterday',
      },
    ],
  },
];

export default function MessagesPage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { startCall } = useChat();

  const [threads, setThreads] = useState<EnquiryThread[]>(DEMO_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('enq-001');
  const [newMessageText, setNewMessageText] = useState<string>('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: EnquiryMessage = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      senderName: 'You',
      text: newMessageText.trim(),
      timestamp: 'Just now',
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? {
              ...t,
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );
    setNewMessageText('');
  };

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-4">
          <Link href="/account" className="hover:underline">My Account</Link>
          <span>/</span>
          <span>Enquiries & Messages</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Store Enquiries & Direct Chats
        </h1>
        <p className="text-xs sm:text-sm text-emerald-300/80 mb-8">
          Communicate directly with registered physical store vendors regarding phone availability and physical shop testing.
        </p>

        <div className={`grid grid-cols-1 md:grid-cols-12 rounded-3xl border overflow-hidden shadow-2xl min-h-[500px] ${
          darkMode ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-white border-emerald-200'
        }`}>
          
          {/* Threads List Sidebar */}
          <div className={`md:col-span-5 border-r border-emerald-900/60 flex flex-col ${
            darkMode ? 'bg-emerald-950/60' : 'bg-emerald-50/40'
          }`}>
            <div className="p-4 border-b border-emerald-900/60 font-black text-xs uppercase tracking-wider text-emerald-400">
              Active Store Inquiries ({threads.length})
            </div>
            <div className="divide-y divide-emerald-900/40 overflow-y-auto">
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    activeThreadId === thread.id
                      ? darkMode ? 'bg-emerald-900/60' : 'bg-emerald-100'
                      : 'hover:bg-emerald-900/20'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-emerald-950 shrink-0 border border-emerald-800">
                    <img src={thread.phoneImage} alt={thread.phoneTitle} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-white truncate">{thread.storeName}</h4>
                      {thread.unreadCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-emerald-300/80 truncate mt-0.5">{thread.phoneTitle}</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{formatNaira(thread.phonePriceNgn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Chat Window */}
          <div className="md:col-span-7 flex flex-col justify-between h-[550px]">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-emerald-900/60 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-white">{activeThread.storeName}</h3>
                <p className="text-[11px] text-emerald-300/70">📍 {activeThread.location} · {activeThread.phoneTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startCall(activeThread.storeName, activeThread.phoneImage, 'voice')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1 shadow cursor-pointer"
                >
                  📞 Call
                </button>
                <button
                  type="button"
                  onClick={() => startCall(activeThread.storeName, activeThread.phoneImage, 'video')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1 shadow cursor-pointer"
                >
                  📹 Video
                </button>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeThread.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'buyer' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-slate-400 mb-0.5">{msg.senderName} · {msg.timestamp}</span>
                  <div className={`p-3.5 rounded-2xl max-w-sm text-xs leading-relaxed ${
                    msg.sender === 'buyer'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-emerald-950 border border-emerald-800 text-emerald-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-emerald-900/60 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message about store inspection..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className={`flex-1 p-3 rounded-xl border text-xs font-semibold outline-none ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-emerald-200'
                }`}
              />
              <button
                type="submit"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow min-h-[44px]"
              >
                Send
              </button>
            </form>

          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />
      <MobileBottomNav />
    </div>
  );
}
