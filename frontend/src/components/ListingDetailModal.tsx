'use client';

import React, { useState } from 'react';
import { PhoneListing } from '../types/phone';

interface ListingDetailModalProps {
  listing: PhoneListing | null;
  darkMode?: boolean;
  onClose: () => void;
}

export default function ListingDetailModal({ listing, darkMode = false, onClose }: ListingDetailModalProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [name, setName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [message, setMessage] = useState('');

  if (!listing) return null;

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(listing.sellerPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneInput) return;
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      setName('');
      setPhoneInput('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md overflow-y-auto">
      <div className={`relative rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border my-8 transition-colors ${
        darkMode 
          ? 'bg-emerald-950 border-emerald-700 text-white' 
          : 'bg-white border-emerald-200 text-emerald-950'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-emerald-500 hover:text-emerald-300 p-2 rounded-full hover:bg-emerald-900/50 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Image & Seller Card */}
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-emerald-900/20 border border-emerald-700/60 relative">
              <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded shadow-md">
                {listing.condition}
              </span>
            </div>

            {/* Seller Info Card */}
            <div className={`p-4 border rounded-xl space-y-2 ${
              darkMode ? 'bg-emerald-900/60 border-emerald-700' : 'bg-emerald-50/80 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Verified Dealer</span>
                {listing.verifiedSeller && (
                  <span className="text-[10px] font-bold text-emerald-950 bg-emerald-400 px-2 py-0.5 rounded">
                    Store Verified
                  </span>
                )}
              </div>
              <p className="font-extrabold text-sm">{listing.sellerStore}</p>
              <p className="text-xs leading-snug text-emerald-700">{listing.sellerAddress}</p>
              
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${listing.sellerWhatsapp}?text=Hello%20${encodeURIComponent(listing.sellerName)},%20I%20am%20interested%20in%20your%20${encodeURIComponent(listing.title)}%20for%20${formatNaira(listing.priceNgn)}%20on%20Phone%20Village.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Chat Seller on WhatsApp</span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className={`w-full py-2 px-3 border text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    darkMode 
                      ? 'bg-emerald-950 border-emerald-700 text-emerald-200 hover:bg-emerald-900' 
                      : 'bg-white border-emerald-200 text-emerald-950 hover:bg-emerald-50'
                  }`}
                >
                  <span>{copiedPhone ? 'Copied Number!' : `Call: ${listing.sellerPhone}`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Listing Details & Spec Sheet */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
                <span>{listing.brand}</span>
                <span>·</span>
                <span>{listing.location}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold">{listing.title}</h3>
              <p className="text-2xl font-black text-emerald-600 font-mono tabular-nums mt-1">
                {formatNaira(listing.priceNgn)}
              </p>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed border-t pt-3 ${
              darkMode ? 'border-emerald-800 text-emerald-200' : 'border-emerald-100 text-emerald-800'
            }`}>
              {listing.description}
            </p>

            {/* Spec Sheet */}
            <div className={`grid grid-cols-2 gap-2 text-xs border rounded-xl p-3 ${
              darkMode ? 'bg-emerald-900/40 border-emerald-800' : 'bg-emerald-50/50 border-emerald-200'
            }`}>
              <div>
                <span className="text-emerald-600 font-semibold block">Display</span>
                <span className="font-bold">{listing.specs.display}</span>
              </div>
              <div>
                <span className="text-emerald-600 font-semibold block">Processor</span>
                <span className="font-bold">{listing.specs.processor}</span>
              </div>
              <div>
                <span className="text-emerald-600 font-semibold block">Camera</span>
                <span className="font-bold">{listing.specs.camera}</span>
              </div>
              <div>
                <span className="text-emerald-600 font-semibold block">Battery</span>
                <span className="font-bold">{listing.specs.battery}</span>
              </div>
              <div>
                <span className="text-emerald-600 font-semibold block">Storage & RAM</span>
                <span className="font-bold">{listing.storage} {listing.ram ? `/ ${listing.ram}` : ''}</span>
              </div>
              {listing.batteryHealth && (
                <div>
                  <span className="text-emerald-600 font-semibold block">Battery Health</span>
                  <span className="font-extrabold text-emerald-500 font-mono">{listing.batteryHealth}% Original</span>
                </div>
              )}
            </div>

            {/* Direct Store Enquiry Form */}
            <div className={`border-t pt-4 ${darkMode ? 'border-emerald-800' : 'border-emerald-100'}`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Send Direct Store Message</h4>
              
              {enquirySent ? (
                <div className="p-3 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-md">
                  ✓ Message sent! The store manager will call or reply to your phone number shortly.
                </div>
              ) : (
                <form onSubmit={handleSendEnquiry} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={`px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                        darkMode ? 'bg-emerald-900 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                      }`}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      required
                      className={`px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                        darkMode ? 'bg-emerald-900 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                      }`}
                    />
                  </div>
                  <textarea
                    placeholder={`e.g., Is this ${listing.title} still available at ${listing.sellerStore}?`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none ${
                      darkMode ? 'bg-emerald-900 border-emerald-700 text-white' : 'bg-white border-emerald-200'
                    }`}
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Enquiry to Store Manager
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
