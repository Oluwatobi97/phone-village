'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useChat } from '../context/ChatContext';

interface ChatDrawerProps {
  darkMode: boolean;
}

export default function ChatDrawer({ darkMode }: ChatDrawerProps) {
  const {
    threads,
    activeThreadId,
    isChatOpen,
    openChat,
    closeChat,
    sendMessage,
    startCall
  } = useChat();

  const [messageInput, setMessageInput] = useState('');
  const [offerInput, setOfferInput] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);

  if (!isChatOpen) return null;

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeThread) return;
    sendMessage(activeThread.id, messageInput.trim());
    setMessageInput('');
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerInput || !activeThread) return;
    const numOffer = Number(offerInput);
    if (isNaN(numOffer) || numOffer <= 0) return;
    
    sendMessage(
      activeThread.id,
      `I am offering ₦${numOffer.toLocaleString('en-NG')} for ${activeThread.listingTitle || 'this phone'}. Can I inspect and buy at your store at this price?`,
      numOffer
    );
    setOfferInput('');
    setShowOfferModal(false);
  };

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-4xl h-[88vh] rounded-3xl border shadow-2xl flex flex-col md:flex-row overflow-hidden relative transition-colors ${
        darkMode ? 'bg-[#021B12] border-emerald-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={closeChat}
          aria-label="Close chat"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs z-20 transition-colors cursor-pointer ${
            darkMode 
              ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:text-white' 
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ✕
        </button>

        {/* Sidebar: Conversation Threads */}
        <div className={`w-full md:w-80 border-b md:border-b-0 md:border-r flex flex-col shrink-0 ${
          darkMode ? 'border-emerald-900/60 bg-emerald-950/40' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="p-4 border-b border-emerald-900/40 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">In-App Live Chat</h3>
              <p className="text-[11px] text-emerald-400 font-bold">Direct Vendor Messages</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white">
              {threads.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => openChat(thread.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center gap-3 border ${
                  activeThreadId === thread.id
                    ? darkMode
                      ? 'bg-emerald-900/60 border-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-100/80 border-emerald-300 text-slate-900 font-bold shadow-xs'
                    : darkMode
                      ? 'border-transparent text-emerald-200/80 hover:bg-emerald-950/60'
                      : 'border-transparent text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={thread.avatar}
                    alt={thread.sellerStore}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-700"
                    referrerPolicy="no-referrer"
                  />
                  {thread.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-emerald-950" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs truncate">{thread.sellerStore}</span>
                    <span className="text-[9px] opacity-60 shrink-0">{thread.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] truncate opacity-80 mt-0.5">{thread.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Conversation Panel */}
        {activeThread ? (
          <div className="flex-1 flex flex-col justify-between min-w-0 bg-transparent">
            
            {/* Conversation Header with Voice & Video Call Buttons */}
            <div className={`p-4 border-b flex items-center justify-between gap-3 ${
              darkMode ? 'border-emerald-900/60 bg-emerald-950/60' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={activeThread.avatar}
                    alt={activeThread.sellerStore}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-600"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-emerald-950" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm truncate">{activeThread.sellerStore}</h3>
                  <p className="text-[10px] text-emerald-400 font-bold">
                    ● Active Now · {activeThread.sellerName}
                  </p>
                </div>
              </div>

              {/* In-App Direct Calling Buttons */}
              <div className="flex items-center gap-2 pr-8">
                <button
                  onClick={() => startCall(activeThread.sellerStore, activeThread.sellerName, 'voice')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                  title="In-App Direct Voice Call"
                >
                  <span>📞 Call</span>
                </button>
                <button
                  onClick={() => startCall(activeThread.sellerStore, activeThread.sellerName, 'video')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-emerald-300 hover:bg-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                  title="In-App Video Call"
                >
                  <span>📹 Video</span>
                </button>
              </div>
            </div>

            {/* Listing Context Banner */}
            {activeThread.listingTitle && (
              <div className={`px-4 py-2.5 border-b flex items-center justify-between text-xs ${
                darkMode ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center gap-2 min-w-0">
                  {activeThread.listingImage && (
                    <img src={activeThread.listingImage} alt="Phone" className="w-8 h-8 rounded-lg object-cover border border-emerald-800 shrink-0" referrerPolicy="no-referrer" />
                  )}
                  <span className="truncate font-bold text-[11px]">{activeThread.listingTitle}</span>
                </div>
                {activeThread.listingPriceNgn && (
                  <span className="font-black font-mono text-emerald-400 shrink-0 pl-2">
                    {formatNaira(activeThread.listingPriceNgn)}
                  </span>
                )}
              </div>
            )}

            {/* Messages Transcript */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeThread.messages.map((msg) => {
                const isBuyer = msg.sender === 'buyer';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 shadow-xs ${
                        isBuyer
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : darkMode
                            ? 'bg-emerald-950/80 text-emerald-100 border border-emerald-800/80 rounded-bl-none'
                            : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.priceOfferNgn && (
                        <div className="p-2 rounded-xl bg-black/20 font-mono font-black text-xs mb-1 flex items-center justify-between gap-2 border border-white/20">
                          <span>💰 Official Price Offer:</span>
                          <span className="text-yellow-300 font-extrabold">{formatNaira(msg.priceOfferNgn)}</span>
                        </div>
                      )}
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className="block text-[9px] opacity-70 text-right mt-1 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className={`px-4 py-2 border-t flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] ${
              darkMode ? 'border-emerald-900/40 bg-emerald-950/20' : 'border-slate-100 bg-slate-50'
            }`}>
              <button
                type="button"
                onClick={() => setShowOfferModal(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-600/40 font-bold shrink-0 cursor-pointer"
              >
                💵 Propose Price Offer
              </button>
              <button
                type="button"
                onClick={() => sendMessage(activeThread.id, 'Can I have your exact shop address in the tech hub for physical testing?')}
                className={`px-2.5 py-1 rounded-lg border font-bold shrink-0 cursor-pointer ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-emerald-300' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                📍 Request Shop Address
              </button>
              <button
                type="button"
                onClick={() => sendMessage(activeThread.id, 'Is this phone UK Used or Brand New Sealed?')}
                className={`px-2.5 py-1 rounded-lg border font-bold shrink-0 cursor-pointer ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-emerald-300' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                ⚡ Check Condition
              </button>
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendText} className={`p-3 border-t flex items-center gap-2 ${
              darkMode ? 'border-emerald-900/60 bg-emerald-950/40' : 'border-slate-200 bg-white'
            }`}>
              <input
                type="text"
                placeholder="Type your message to vendor..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className={`flex-1 p-3 rounded-xl border text-xs font-semibold outline-none focus:border-emerald-500 ${
                  darkMode ? 'bg-emerald-950 border-emerald-800 text-white placeholder:text-emerald-300/50' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer min-h-[42px]"
              >
                Send
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-xs opacity-60">
            Select a conversation thread to start messaging.
          </div>
        )}

      </div>

      {/* Price Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl relative ${
            darkMode ? 'bg-[#021B12] border-emerald-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-4 right-4 text-sm font-bold opacity-70 hover:opacity-100"
            >
              ✕
            </button>

            <h3 className="text-lg font-black tracking-tight">Propose Official Price Offer</h3>
            <p className="text-xs text-emerald-300/80">
              Submit your offer directly to {activeThread?.sellerStore}. The seller will accept or counter offer.
            </p>

            <form onSubmit={handleSendOffer} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider block mb-1">
                  Your Offer Amount in Naira (₦)
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1350000"
                  value={offerInput}
                  onChange={(e) => setOfferInput(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm font-bold font-mono outline-none focus:border-emerald-500 ${
                    darkMode ? 'bg-emerald-950 border-emerald-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md"
              >
                Submit Official Offer →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
