'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';

interface EnquiryMessage {
  id: string;
  sender: 'buyer' | 'seller';
  senderName: string;
  text: string;
  timestamp: string;
}

interface EnquiryThread {
  id: string;
  phoneId: string;
  phoneTitle: string;
  phonePriceNgn: number;
  phoneImage: string;
  phoneLocation: string;
  otherPartyName: string;
  otherPartyRole: string;
  otherPartyPhone: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: boolean;
  messages: EnquiryMessage[];
}

const DEMO_THREADS: EnquiryThread[] = [
  {
    id: 'enq-001',
    phoneId: 'pv-001',
    phoneTitle: 'Apple iPhone 15 Pro Max - 256GB (Natural Titanium)',
    phonePriceNgn: 1150000,
    phoneImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    phoneLocation: 'Computer Village, Ikeja, Lagos',
    otherPartyName: 'Emeka Nnamdi (Apex iStore)',
    otherPartyRole: 'Verified Dealer',
    otherPartyPhone: '+2348031234567',
    lastMessage: 'Good day! Yes, the iPhone 15 Pro Max is clean UK used with original box.',
    lastTimestamp: '10:45 AM',
    unread: true,
    messages: [
      {
        id: 'm1',
        sender: 'buyer',
        senderName: 'You',
        text: 'Hello, is this iPhone 15 Pro Max still available at Otigba Street shop?',
        timestamp: '10:30 AM',
      },
      {
        id: 'm2',
        sender: 'seller',
        senderName: 'Emeka Nnamdi',
        text: 'Good day! Yes, the iPhone 15 Pro Max is clean UK used with original box. Battery health is 96%.',
        timestamp: '10:45 AM',
      },
    ],
  },
  {
    id: 'enq-002',
    phoneId: 'pv-002',
    phoneTitle: 'Samsung Galaxy S24 Ultra - 512GB (Titanium Black)',
    phonePriceNgn: 1080000,
    phoneImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    phoneLocation: 'Wuse 2, Central Area, Abuja',
    otherPartyName: 'Chidi Okonkwo',
    otherPartyRole: 'Individual Buyer',
    otherPartyPhone: '+2348039876543',
    lastMessage: 'Can I do a physical inspection at your Abuja branch today?',
    lastTimestamp: 'Yesterday',
    unread: false,
    messages: [
      {
        id: 'm10',
        sender: 'buyer',
        senderName: 'Chidi Okonkwo',
        text: 'Hello, is the price ₦1,080,000 negotiable if I pick it up today?',
        timestamp: 'Yesterday 3:15 PM',
      },
      {
        id: 'm11',
        sender: 'seller',
        senderName: 'You',
        text: 'Yes, slight negotiation is allowed for cash buyers. You can inspect at our Wuse 2 shop.',
        timestamp: 'Yesterday 3:30 PM',
      },
      {
        id: 'm12',
        sender: 'buyer',
        senderName: 'Chidi Okonkwo',
        text: 'Can I do a physical inspection at your Abuja branch today?',
        timestamp: 'Yesterday 4:00 PM',
      },
    ],
  },
];

export default function MessagesPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const [threads, setThreads] = useState<EnquiryThread[]>(DEMO_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('enq-001');
  const [newMessageText, setNewMessageText] = useState<string>('');
  const [showMobileList, setShowMobileList] = useState<boolean>(true);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeThread) return;

    const newMsg: EnquiryMessage = {
      id: `m-${Date.now()}`,
      sender: 'buyer',
      senderName: 'You',
      text: newMessageText.trim(),
      timestamp: 'Just now',
    };

    const updatedThreads = threads.map((t) => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          lastMessage: newMsg.text,
          lastTimestamp: 'Just now',
          messages: [...t.messages, newMsg],
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setNewMessageText('');
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setShowMobileList(false);

    // Mark as read
    setThreads(
      threads.map((t) => (t.id === threadId ? { ...t, unread: false } : t))
    );
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
            <span className="text-emerald-500 font-bold underline underline-offset-4">Enquiries</span>
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
              <Link href="/account" className="text-xs font-bold text-emerald-400">
                👤 {user.name}
              </Link>
            ) : (
              <Link href="/login" className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
            Buyer & Seller Messaging Hub
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Phone Enquiries & Conversations
          </h1>
        </div>

        {/* Two Panel Layout Container */}
        <div className={`rounded-2xl border overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px] transition-colors ${
          darkMode ? 'bg-emerald-950/60 border-emerald-800/80' : 'bg-white border-emerald-100 shadow-sm'
        }`}>
          {/* Left Panel: Conversation List */}
          <div className={`md:col-span-5 border-r border-emerald-800/40 flex flex-col ${
            showMobileList ? 'block' : 'hidden md:flex'
          }`}>
            <div className="p-4 border-b border-emerald-800/40 bg-emerald-900/20 font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>Recent Conversations ({threads.length})</span>
            </div>

            <div className="divide-y divide-emerald-800/30 overflow-y-auto flex-1">
              {threads.map((thread) => {
                const isActive = activeThread?.id === thread.id;
                return (
                  <button
                    key={thread.id}
                    onClick={() => handleSelectThread(thread.id)}
                    className={`w-full p-4 text-left transition-colors cursor-pointer flex gap-3 ${
                      isActive
                        ? 'bg-emerald-600/15 border-l-4 border-emerald-500'
                        : 'hover:bg-emerald-900/20'
                    }`}
                  >
                    <img
                      src={thread.phoneImage}
                      alt={thread.phoneTitle}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0 border border-emerald-800/60"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                          {thread.otherPartyName}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-emerald-400/60 shrink-0">
                          {thread.lastTimestamp}
                        </span>
                      </div>

                      <p className="text-[11px] font-medium text-emerald-400/90 truncate mb-1">
                        {thread.phoneTitle}
                      </p>

                      <p className="text-[11px] text-slate-400 dark:text-emerald-300/70 truncate">
                        {thread.lastMessage}
                      </p>
                    </div>

                    {thread.unread && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Conversation Details & Chat Input */}
          <div className={`md:col-span-7 flex flex-col justify-between ${
            !showMobileList ? 'block' : 'hidden md:flex'
          }`}>
            {activeThread ? (
              <>
                {/* Active Header & Phone Card */}
                <div className="p-4 border-b border-emerald-800/40 bg-emerald-900/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => setShowMobileList(true)}
                      className="md:hidden text-xs font-bold text-emerald-400 pr-2"
                    >
                      ← Back
                    </button>

                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                        {activeThread.otherPartyName}
                      </h3>
                      <span className="text-[11px] text-emerald-400">
                        {activeThread.otherPartyRole} &nbsp;·&nbsp; 📞 {activeThread.otherPartyPhone}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/phones/${activeThread.phoneId}`}
                    className="px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0"
                  >
                    View Listing →
                  </Link>
                </div>

                {/* Phone Snapshot Bar */}
                <div className="px-4 py-2.5 bg-emerald-950/80 border-b border-emerald-800/30 flex items-center justify-between text-xs">
                  <span className="truncate text-emerald-200 font-medium">
                    Phone: <strong className="text-white">{activeThread.phoneTitle}</strong>
                  </span>
                  <span className="font-extrabold text-emerald-400 shrink-0 ml-2">
                    ₦ {activeThread.phonePriceNgn.toLocaleString()}
                  </span>
                </div>

                {/* Messages Timeline */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 max-h-[380px]">
                  {activeThread.messages.map((msg) => {
                    const isMe = msg.sender === 'buyer';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-[10px] text-slate-400 dark:text-emerald-400/60 mb-1">
                          {msg.senderName} · {msg.timestamp}
                        </span>

                        <div className={`p-3.5 rounded-2xl max-w-sm text-xs font-medium leading-relaxed ${
                          isMe
                            ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                            : 'bg-emerald-900/60 text-slate-100 rounded-tl-none border border-emerald-800/80'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat Reply Form */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-emerald-800/40 bg-emerald-950/80 flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Type your reply message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    className={`flex-1 px-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode ? 'bg-emerald-900/40 border-emerald-800 text-white placeholder-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Send Reply 💬
                  </button>
                </form>
              </>
            ) : (
              <div className="p-12 text-center text-slate-400 my-auto">
                Select an enquiry thread from the left panel to view messages.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
