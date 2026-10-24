'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ListingsSection from '../components/ListingsSection';
import DealComparer from '../components/DealComparer';
import VerifiedSellersSection from '../components/VerifiedSellersSection';
import SafetyGuideSection from '../components/SafetyGuideSection';
import Footer from '../components/Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [heroFilters, setHeroFilters] = useState<{
    maxPrice: number;
    brand: string;
    condition: string;
  }>({
    maxPrice: 1500000,
    brand: 'All',
    condition: 'All',
  });

  const handleHeroFilterChange = (filters: { maxPrice: number; brand: string; condition: string }) => {
    setHeroFilters(filters);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-emerald-950 transition-colors ${
      darkMode ? 'bg-[#021B12] text-white' : 'bg-white text-emerald-950'
    }`}>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main>
        <Hero darkMode={darkMode} onSearchFilter={handleHeroFilterChange} />
        <ListingsSection 
          darkMode={darkMode}
          initialMaxPrice={heroFilters.maxPrice} 
          initialBrand={heroFilters.brand} 
          initialCondition={heroFilters.condition} 
        />
        <DealComparer darkMode={darkMode} />
        <VerifiedSellersSection darkMode={darkMode} />
        <SafetyGuideSection darkMode={darkMode} />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
