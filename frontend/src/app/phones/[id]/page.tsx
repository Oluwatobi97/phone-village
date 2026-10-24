'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TiltCard from '../../../components/TiltCard';
import { MOCK_LISTINGS } from '../../../data/mockData';

export default function PhoneDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [darkMode, setDarkMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const listing = MOCK_LISTINGS.find((item) => item.id === id);

  if (!listing) {
    return (
      <div className={`min-h-screen flex flex-col justify-between font-sans ${
        darkMode ? 'bg-[#021B12] text-white' : 'bg-slate-50 text-emerald-950'
      }`}>
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold mb-4">
            🔍
          </div>
          <h1 className="text-2xl font-extrabold mb-2">Listing Not Found</h1>
          <p className="text-xs text-emerald-700 mb-6">
            The phone listing with ID <code className="font-mono">{id}</code> does not exist or has been removed by the seller.
          </p>
          <Link
            href="/phones"
            className="px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500 transition-colors"
          >
            Browse Active Listings
          </Link>
        </main>
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  const activeImage = selectedImage || listing.image;

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(listing.sellerPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const relatedListings = MOCK_LISTINGS.filter(
    (item) => item.id !== listing.id && (item.brand === listing.brand || item.hubRegion === listing.hubRegion)
  ).slice(0, 3);

  return (
    <div className={`min-h-screen font-sans transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-slate-50 text-emerald-950'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs font-semibold text-emerald-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/phones" className="hover:underline">Browse Phones</Link>
            <span>/</span>
            <span className="text-emerald-900 font-bold">{listing.title}</span>
          </div>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isSaved
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : darkMode ? 'border-emerald-700 text-emerald-200' : 'border-emerald-200 text-emerald-900'
            }`}
          >
            <span>{isSaved ? '♥ Saved in Favourites' : '♡ Save Phone'}</span>
          </button>
        </div>

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`aspect-4/3 rounded-2xl overflow-hidden border relative shadow-md ${
              darkMode ? 'bg-emerald-950 border-emerald-800' : 'bg-white border-emerald-200'
            }`}>
              <img
                src={activeImage}
                alt={listing.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded shadow-md">
                {listing.condition}
              </span>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex items-center gap-3">
              {[listing.image, listing.image].map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    activeImage === imgUrl ? 'border-emerald-500 scale-105' : 'border-emerald-200/50 opacity-70'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Safety Warning Card */}
            <div className={`p-4 border rounded-2xl ${
              darkMode ? 'bg-emerald-950/80 border-emerald-800' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <p className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider mb-1">
                🛡️ Physical Store Meeting & IMEICheck Protocol
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Always meet sellers at physical shopfronts in Computer Village or verified tech malls. Dial <strong>*#06#</strong> to inspect device IMEI and test all features before issuing payment.
              </p>
            </div>
          </div>

          {/* Listing Details & Direct Seller Action Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`p-6 sm:p-8 border rounded-2xl shadow-sm ${
              darkMode ? 'bg-emerald-950/90 border-emerald-800' : 'bg-white border-emerald-200'
            }`}>
              
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 mb-2">
                <span>{listing.brand} · {listing.location}</span>
                {listing.verifiedSeller && (
                  <span className="bg-emerald-400 text-emerald-950 px-2.5 py-0.5 rounded font-extrabold">
                    Verified Store
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{listing.title}</h1>

              <div className="flex items-baseline gap-4 mt-3 pb-4 border-b border-emerald-100/20">
                <span className="text-3xl font-black text-emerald-600 font-mono tabular-nums">
                  {formatNaira(listing.priceNgn)}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded">
                  {listing.storage} Storage
                </span>
              </div>

              {/* Description */}
              <div className="py-4 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Description & Condition</h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">{listing.description}</p>
              </div>

              {/* Full Spec Matrix */}
              <div className="py-4 border-t border-emerald-100/20 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                  <div>
                    <span className="text-emerald-600 block">Display</span>
                    <span className="font-bold">{listing.specs.display}</span>
                  </div>
                  <div>
                    <span className="text-emerald-600 block">Processor</span>
                    <span className="font-bold">{listing.specs.processor}</span>
                  </div>
                  <div>
                    <span className="text-emerald-600 block">Camera</span>
                    <span className="font-bold">{listing.specs.camera}</span>
                  </div>
                  <div>
                    <span className="text-emerald-600 block">Battery</span>
                    <span className="font-bold">{listing.specs.battery}</span>
                  </div>
                </div>
              </div>

              {/* Verified Seller Contact Module */}
              <div className="pt-4 border-t border-emerald-100/20 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-sm">{listing.sellerStore}</p>
                    <p className="text-emerald-700 text-xs">{listing.sellerAddress}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">★ {listing.rating}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href={`https://wa.me/${listing.sellerWhatsapp}?text=Hello%20${encodeURIComponent(listing.sellerName)},%20I%20saw%20your%20${encodeURIComponent(listing.title)}%20listing%20for%20${formatNaira(listing.priceNgn)}%20on%20Phone%20Village.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>WhatsApp Seller</span>
                  </a>

                  <button
                    onClick={handleCopyPhone}
                    className="py-3 px-4 bg-emerald-100 text-emerald-950 font-bold rounded-xl hover:bg-emerald-200 transition-colors cursor-pointer"
                  >
                    {copiedPhone ? 'Copied Number!' : `Call: ${listing.sellerPhone}`}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Listings */}
        {relatedListings.length > 0 && (
          <section className="pt-8 border-t border-emerald-200">
            <h2 className="text-xl font-extrabold tracking-tight mb-6">Similar Listings You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedListings.map((rel) => (
                <TiltCard key={rel.id}>
                  <div className={`p-4 border rounded-2xl shadow-sm hover:border-emerald-500 transition-all ${
                    darkMode ? 'bg-emerald-950 border-emerald-800' : 'bg-white border-emerald-200'
                  }`}>
                    <img src={rel.image} alt={rel.title} className="w-full h-36 object-cover rounded-xl mb-3" referrerPolicy="no-referrer" />
                    <p className="text-xs font-bold text-emerald-600">{rel.brand} · {rel.location.split(',')[0]}</p>
                    <h3 className="text-sm font-extrabold line-clamp-1">{rel.title}</h3>
                    <p className="text-base font-black font-mono text-emerald-600 mt-1">{formatNaira(rel.priceNgn)}</p>
                    <Link
                      href={`/phones/${rel.id}`}
                      className="inline-block mt-3 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-500 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
