'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import Hero from '../components/Hero';
import ListingsSection from '../components/ListingsSection';
import DealComparer from '../components/DealComparer';
import VerifiedSellersSection from '../components/VerifiedSellersSection';
import SafetyGuideSection from '../components/SafetyGuideSection';
import { useTheme } from '../context/ThemeContext';
import { MOCK_LISTINGS } from '../data/mockData';

export default function HomePage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const element = document.getElementById('marketplace-listings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans pb-16 md:pb-0 transition-colors ${
      darkMode ? 'bg-[#021B12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Global Header */}
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Hero with 3D Smartphone Viewport & Search */}
      <Hero darkMode={darkMode} onSearch={handleSearch} />

      {/* Marketplace Listings Section */}
      <div id="marketplace-listings">
        <ListingsSection
          listings={MOCK_LISTINGS}
          darkMode={darkMode}
          searchFilter={searchQuery}
        />
      </div>

      {/* Side-by-side Deal Comparer Spec Matrix */}
      <DealComparer darkMode={darkMode} />

      {/* Verified Tech Hub Dealers */}
      <VerifiedSellersSection darkMode={darkMode} />

      {/* Safety & Physical Inspection Guide */}
      <SafetyGuideSection darkMode={darkMode} />

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Thumb-zone Fixed Mobile Bottom Bar */}
      <MobileBottomNav />
    </div>
  );
}
