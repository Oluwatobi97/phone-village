'use client';

import React, { useState, useEffect, useRef } from 'react';

interface GlobalPhoneNewsItem {
  id: string;
  name: string;
  brand: string;
  category: 'Apple' | 'Samsung' | 'Xiaomi' | 'Foldables' | 'Google' | 'Vivo';
  headline: string;
  kicker: string;
  publishDate: string;
  priceUsd: number;
  priceNgn: number;
  image: string;
  chipset: string;
  display: string;
  camera: string;
  battery: string;
  worldDifference: string;
  fullNewsArticle: string;
  specsTable: { label: string; value: string }[];
  keyDifferencesVsPredecessor: string[];
}

const GLOBAL_PHONE_NEWS: GlobalPhoneNewsItem[] = [
  {
    id: 'samsung-s26-ultra',
    name: 'Samsung Galaxy S26 Ultra',
    brand: 'Samsung',
    category: 'Samsung',
    kicker: 'GLOBAL FLAGSHIP REVEAL',
    headline: 'Samsung Galaxy S26 Ultra Debuts Worldwide with Anti-Reflective Armor & 200MP Quad Camera',
    publishDate: 'October 2026',
    priceUsd: 1299,
    priceNgn: 2200000,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1000&auto=format&fit=crop&q=80',
    chipset: 'Snapdragon 8 Elite (3nm, 4.47GHz)',
    display: '6.9" Dynamic AMOLED 2X, 2600 nits',
    camera: '200MP Wide + 50MP Periscope (5x) + 50MP 3x + 50MP UW',
    battery: '5,000 mAh · 45W Wired · S-Pen',
    worldDifference: 'Featuring an ultra-slim 7.9mm titanium chassis, second-gen anti-reflective Gorilla Armor glass that reduces screen glare by 75%, and 200MP low-light Sensor-Shift OIS.',
    fullNewsArticle: 'Samsung has officially rolled out the Galaxy S26 Ultra across global markets. Engineered around an ultra-slim 7.9mm titanium frame with refined ergonomic corners, the S26 Ultra houses Samsung\'s brightest 2,600-nit panel. The revolutionary quad-camera system upgrades all secondary telephoto and ultrawide sensors to 50MP, powered by the ProVisual AI engine for zero-shutter-lag night captures.',
    specsTable: [
      { label: 'Global Chipset', value: 'Qualcomm Snapdragon 8 Elite (3nm)' },
      { label: 'Display Panel', value: '6.9" QHD+ Dynamic AMOLED 2X, 1-120Hz LTPO' },
      { label: 'Camera Array', value: '200 MP f/1.4 OIS + 50 MP 5x Periscope + 50 MP 3x + 50 MP UW' },
      { label: 'S-Pen Stylus', value: 'Integrated with 2.8ms latency & Bluetooth gestures' },
      { label: 'Build & Protection', value: 'Grade 4 Titanium Frame, IP68 dust/waterproof' },
      { label: 'Software Guarantee', value: '7 Years Android OS Updates & Security Patches' }
    ],
    keyDifferencesVsPredecessor: [
      'Upgraded secondary cameras: 50MP Ultrawide & 50MP 3x Telephoto (up from 12MP/10MP)',
      'Slimmer 7.9mm profile & 14g lighter than Galaxy S24 Ultra',
      'Gorilla Armor Glass reduces reflection glare by up to 75% in daylight',
      'Snapdragon 8 Elite chip delivers 45% CPU speed boost & 40% GPU ray-tracing performance'
    ]
  },
  {
    id: 'iphone-18-pro-max',
    name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'Apple',
    kicker: 'APPLE SPECIAL EVENT',
    headline: 'Apple Unveils iPhone 18 Pro Max with Custom A-Series 3nm Chip & Haptic Camera Control',
    publishDate: 'October 2026',
    priceUsd: 1199,
    priceNgn: 2350000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1000&auto=format&fit=crop&q=80',
    chipset: 'Apple A18 Pro (3nm architecture)',
    display: '6.9" Super Retina XDR OLED, 120Hz',
    camera: '48MP Fusion + 48MP UltraWide + 12MP 5x Zoom',
    battery: '4,685 mAh · 33h Video · MagSafe',
    worldDifference: 'Crafted with Grade 5 Titanium and ultra-narrow borders, featuring a force-sensitive haptic Camera Control slider and Apple Intelligence AI running on a 16-core Neural Engine.',
    fullNewsArticle: 'Apple\'s flagship leads mobile engineering with custom silicon performance and pro-grade video capture. The iPhone 18 Pro Max introduces a dedicated capacitive Camera Control button with haptic feedback on the right rail, allowing photographers to slide for zoom, focus, and aperture depth without touching the screen.',
    specsTable: [
      { label: 'Processor', value: 'Apple A18 Pro (6-core CPU, 6-core GPU, 16-core NPU)' },
      { label: 'Display Size', value: '6.9-inch OLED 120Hz ProMotion, 2000 nits peak' },
      { label: 'Video Capture', value: '4K 120 fps Dolby Vision, ProRes Log & Spatial Video' },
      { label: 'Body Finish', value: 'Grade 5 Titanium frame with micro-blasted texture' },
      { label: 'Ports & Wireless', value: 'USB-C 3.0 (10Gbps transfers), Wi-Fi 7 & Thread' }
    ],
    keyDifferencesVsPredecessor: [
      'New physical Camera Control touch slider on right side of frame',
      'Largest display ever on an iPhone (6.9") with ultra-thin bezels',
      '48MP Ultrawide camera upgrading macro and landscape photo resolution',
      'Apple Intelligence generative photo editing and text summarization'
    ]
  },
  {
    id: 'xiaomi-15-ultra',
    name: 'Xiaomi 15 Ultra',
    brand: 'Xiaomi',
    category: 'Xiaomi',
    kicker: 'LEICA OPTICS BREAKTHROUGH',
    headline: 'Xiaomi 15 Ultra Shocks Global Market with 1-Inch Leica Quad Cam & 6,000mAh Battery',
    publishDate: 'October 2026',
    priceUsd: 1099,
    priceNgn: 1850000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1000&auto=format&fit=crop&q=80',
    chipset: 'Qualcomm Snapdragon 8 Elite',
    display: '6.73" 2K LTPO OLED, 3000 nits',
    camera: '50MP 1-Inch Leica + 200MP Periscope (4.3x)',
    battery: '6,000 mAh Silicon-Carbon · 90W Wired',
    worldDifference: 'Combines the world\'s first 200MP periscope telephoto lens with Leica Summilux optics and a massive 6,000mAh silicon-carbon anode battery in a slim profile.',
    fullNewsArticle: 'Xiaomi\'s international flagship redefines camera phone standards through its partnership with Leica optics. The headline 200MP periscope lens achieves 10x lossless zoom, while the silicon-carbon battery delivers up to two full days of heavy usage on a single charge.',
    specsTable: [
      { label: 'Primary Sensor', value: '50MP Sony 1-inch Type LYT-900 with Variable Aperture' },
      { label: 'Periscope Zoom', value: '200MP 1/1.4" Sensor, f/2.6, 100mm optical focal length' },
      { label: 'Battery Tech', value: '6,000 mAh Silicon-Carbon Anode Battery' },
      { label: 'Charging Power', value: '90W HyperCharge Wired (0-100% in 31m) + 80W Wireless' },
      { label: 'Display Panel', value: '6.73" WQHD+ 120Hz LTPO OLED, 3000 nits peak' }
    ],
    keyDifferencesVsPredecessor: [
      '200MP Telephoto Periscope Replacing 50MP Zoom lens',
      'Battery increased from 5,000mAh to 6,000mAh via Silicon-Carbon tech',
      'Updated Leica Summilux optics with anti-glare nano coatings'
    ]
  },
  {
    id: 'honor-magic-v3',
    name: 'Honor Magic V3',
    brand: 'Honor',
    category: 'Foldables',
    kicker: 'WORLD RECORD HOLDER',
    headline: 'Honor Magic V3 Claims World Title as Thinnest Foldable Smartphone at 9.2mm',
    publishDate: 'October 2026',
    priceUsd: 1499,
    priceNgn: 2400000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&auto=format&fit=crop&q=80',
    chipset: 'Snapdragon 8 Gen 3',
    display: '7.92" Inner OLED + 6.43" Outer',
    camera: '50MP OIS + 50MP Periscope + 40MP UW',
    battery: '5,150 mAh Silicon-Carbon · 66W Wired',
    worldDifference: 'At just 9.2mm folded, it is thinner than traditional bar phones while offering IPX8 water resistance, aerospace steel hinges, and dual silicon-carbon battery cells.',
    fullNewsArticle: 'Honor has set a new record in mobile architecture by engineering a dual-screen foldable smartphone that is thinner when closed than many standard flagships. Utilizing 2100MPa super steel hinges and dual high-density silicon batteries, it combines tablet versatility with pocket portability.',
    specsTable: [
      { label: 'Folded Profile', value: '9.2mm (World\'s Thinnest Foldable Smartphone)' },
      { label: 'Total Weight', value: '226g (Lighter than iPhone 16 Pro Max)' },
      { label: 'Water Rating', value: 'IPX8 certified water immersion resistance' },
      { label: 'Hinge Construction', value: 'Aerospace-Grade Super Steel Hinge (2100MPa)' }
    ],
    keyDifferencesVsPredecessor: [
      'Body thickness reduced from 9.9mm down to 9.2mm folded',
      'Added 50W Wireless Charging & IPX8 certified water protection',
      'Upgraded 50MP periscope zoom lens replacing standard telephoto'
    ]
  },
  {
    id: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro XL',
    brand: 'Google',
    category: 'Google',
    kicker: 'COMPUTATIONAL AI LEAD',
    headline: 'Google Pixel 9 Pro XL Debuts Gemini Nano AI & Magic Editor "Add Me" Photo Synthesis',
    publishDate: 'October 2026',
    priceUsd: 1099,
    priceNgn: 1550000,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1000&auto=format&fit=crop&q=80',
    chipset: 'Google Tensor G4 + Titan M2 Security',
    display: '6.8" Super Actua OLED, 3000 nits',
    camera: '50MP Main + 48MP 5x Optical + 48MP UW',
    battery: '5,060 mAh · 37W Fast Charge · 7 Yrs OS',
    worldDifference: 'Packed with 16GB RAM for on-device Gemini Nano AI execution, Magic Editor photo synthesis, and 7 guaranteed years of Android OS feature updates.',
    fullNewsArticle: 'Google\'s Pixel 9 Pro XL showcases state-of-the-art computational photography and on-device machine learning. Equipped with 16GB of LPDDR5X RAM, it executes complex LLMs locally, allowing users to remove objects, translate conversations, and synthesize group photos seamlessly.',
    specsTable: [
      { label: 'AI Processor', value: 'Google Tensor G4 with 16GB LPDDR5X RAM' },
      { label: 'Screen Tech', value: '6.8" Super Actua OLED, 3,000 nits peak brightness' },
      { label: 'Software Lifecycle', value: '7 Years of OS, Feature Drops & Security Patches' },
      { label: 'Front Camera', value: '42MP Dual PD Selfie Camera with Ultrawide Lens' }
    ],
    keyDifferencesVsPredecessor: [
      'Redesigned camera visor with matte glass back finish',
      '16GB RAM standard for speedier on-device Gemini AI processing',
      '42MP selfie camera with ultra-wide field of view for group shots'
    ]
  },
  {
    id: 'vivo-x200-pro',
    name: 'Vivo X200 Pro',
    brand: 'Vivo',
    category: 'Vivo',
    kicker: 'ZEISS TELEPHOTO BENCHMARK',
    headline: 'Vivo X200 Pro Shatters Zoom Standards with Zeiss 200MP APO Telephoto & Dimensity 9400',
    publishDate: 'October 2026',
    priceUsd: 999,
    priceNgn: 1680000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&auto=format&fit=crop&q=80',
    chipset: 'MediaTek Dimensity 9400 (3nm)',
    display: '6.78" Eye-Protection LTPO OLED, 4500 nits',
    camera: '50MP Sony LYT-818 + 200MP Zeiss APO Tele',
    battery: '6,000 mAh BlueVolt Battery · 90W FlashCharge',
    worldDifference: 'Certified Zeiss APO optics eliminate optical chromatic aberration, paired with the 3nm MediaTek Dimensity 9400 and an eye-protection 4,500-nit panel.',
    fullNewsArticle: 'Vivo\'s X200 Pro has earned praise from photography experts worldwide for its 200MP Zeiss APO telephoto lens, designed specifically to eliminate color fringing in high-contrast zoom scenarios. Combined with a 6,000mAh BlueVolt battery, it offers exceptional endurance.',
    specsTable: [
      { label: 'Processor', value: 'MediaTek Dimensity 9400 (3nm, All-Big-Core)' },
      { label: 'Dedicated ISP', value: 'Vivo V3+ Imaging & Video Co-Processor' },
      { label: 'Telephoto Lens', value: '200MP 1/1.4" Zeiss APO Telephoto Macro' },
      { label: 'Battery Capacity', value: '6,000 mAh BlueVolt Silicon Anode' }
    ],
    keyDifferencesVsPredecessor: [
      '200MP Zeiss APO Telephoto replacing 50MP periscope sensor',
      'MediaTek Dimensity 9400 3nm chip outperforming previous gen',
      '6,000mAh battery capacity squeezed into an 8.49mm chassis'
    ]
  }
];

interface LatestPhoneUpdatesProps {
  darkMode: boolean;
  onSearch: (query: string) => void;
}

export default function LatestPhoneUpdates({ darkMode, onSearch }: LatestPhoneUpdatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [readMoreModalItem, setReadMoreModalItem] = useState<GlobalPhoneNewsItem | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredNews = selectedCategory === 'All' 
    ? GLOBAL_PHONE_NEWS 
    : GLOBAL_PHONE_NEWS.filter(item => item.category === selectedCategory);

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  // Auto-sliding timer for carousel
  useEffect(() => {
    if (viewMode !== 'slider' || isPaused || filteredNews.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % filteredNews.length;
        scrollToCard(next);
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [viewMode, isPaused, filteredNews.length]);

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.children;
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      container.scrollTo({
        left: targetCard.offsetLeft - container.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleManualSlide = (direction: 'next' | 'prev') => {
    if (filteredNews.length === 0) return;
    let newIndex = 0;
    if (direction === 'next') {
      newIndex = (currentSlide + 1) % filteredNews.length;
    } else {
      newIndex = (currentSlide - 1 + filteredNews.length) % filteredNews.length;
    }
    setCurrentSlide(newIndex);
    scrollToCard(newIndex);
  };

  return (
    <section className={`py-12 border-b transition-colors relative ${
      darkMode 
        ? 'bg-[#021810] border-emerald-950 text-white' 
        : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 dark:border-emerald-900/60 border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Auto-Sliding Global Radar
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Latest Smartphones in the World
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl ${darkMode ? 'text-emerald-200/80' : 'text-slate-600'}`}>
              Auto-sliding flagship news showcase. Compare global tech breakthroughs, full technical spec sheets, MSRP pricing, and world differences.
            </p>
          </div>

          {/* Controls: Prev/Next & View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Carousel Navigation Arrows */}
            {viewMode === 'slider' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleManualSlide('prev')}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm transition-colors cursor-pointer ${
                    darkMode 
                      ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:bg-emerald-900' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Previous Phone Card"
                >
                  ←
                </button>
                <button
                  onClick={() => handleManualSlide('next')}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm transition-colors cursor-pointer ${
                    darkMode 
                      ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:bg-emerald-900' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Next Phone Card"
                >
                  →
                </button>
              </div>
            )}

            {/* Layout Mode Toggle */}
            <div className={`p-1 rounded-xl border flex items-center gap-1 text-xs ${
              darkMode ? 'bg-emerald-950/80 border-emerald-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}
              >
                Auto-Slide Carousel
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : darkMode ? 'text-emerald-300' : 'text-slate-700'
                }`}
              >
                Grid View
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
          {['All', 'Apple', 'Samsung', 'Xiaomi', 'Foldables', 'Google', 'Vivo'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentSlide(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : darkMode
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/60'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Global Flagships' : cat}
            </button>
          ))}
        </div>

        {/* MODE 1: AUTO-SLIDING HORIZONTAL CAROUSEL SHOWCASE */}
        {viewMode === 'slider' && (
          <div className="space-y-4">
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar scroll-smooth"
            >
              {filteredNews.map((item, idx) => (
                <div
                  key={item.id}
                  className={`w-[320px] sm:w-[360px] lg:w-[380px] shrink-0 snap-start rounded-3xl border overflow-hidden transition-all flex flex-col justify-between group ${
                    currentSlide === idx
                      ? darkMode
                        ? 'bg-[#032016]/95 border-emerald-500/80 shadow-2xl ring-2 ring-emerald-500/40'
                        : 'bg-white border-emerald-500/80 shadow-2xl ring-2 ring-emerald-500/30'
                      : darkMode
                        ? 'bg-[#032016]/80 border-emerald-900/80 hover:border-emerald-700 shadow-xl'
                        : 'bg-white border-slate-200 hover:border-emerald-300 shadow-lg shadow-slate-200/50'
                  }`}
                >
                  {/* Image Card Header with Overlay Tag */}
                  <div>
                    <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-emerald-600 text-white shadow-xs uppercase tracking-wider">
                          {item.kicker}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center justify-between text-xs font-mono font-extrabold">
                          <span>${item.priceUsd} USD</span>
                          <span className="text-emerald-400">{formatNaira(item.priceNgn)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content & Info Under Image */}
                    <div className="p-5 space-y-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {item.brand} · {item.publishDate}
                        </span>
                        <h3 className="font-extrabold text-base leading-snug line-clamp-2">
                          {item.headline}
                        </h3>
                      </div>

                      {/* Brief Spec Matrix */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className={`p-2 rounded-xl border ${darkMode ? 'bg-emerald-950/80 border-emerald-900/80' : 'bg-slate-50 border-slate-200'}`}>
                          <span className={`block text-[9px] uppercase font-bold ${darkMode ? 'text-emerald-400' : 'text-slate-500'}`}>SoC</span>
                          <span className="font-bold truncate block">{item.chipset.split('(')[0]}</span>
                        </div>
                        <div className={`p-2 rounded-xl border ${darkMode ? 'bg-emerald-950/80 border-emerald-900/80' : 'bg-slate-50 border-slate-200'}`}>
                          <span className={`block text-[9px] uppercase font-bold ${darkMode ? 'text-emerald-400' : 'text-slate-500'}`}>Camera</span>
                          <span className="font-bold truncate block">{item.camera.split('+')[0]}</span>
                        </div>
                      </div>

                      {/* Key World Difference Box */}
                      <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        darkMode ? 'bg-emerald-900/20 border-emerald-800/60 text-emerald-200/90' : 'bg-emerald-50/80 border-emerald-200 text-slate-700'
                      }`}>
                        <p className="font-bold text-[10px] uppercase text-emerald-700 dark:text-emerald-400 mb-0.5">
                          ✨ Key World Difference:
                        </p>
                        <p className="line-clamp-2 font-medium">{item.worldDifference}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className={`p-5 pt-0 grid grid-cols-2 gap-2 border-t pt-4 ${
                    darkMode ? 'border-emerald-900/40' : 'border-slate-100'
                  }`}>
                    <button
                      onClick={() => setReadMoreModalItem(item)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer min-h-[42px]"
                    >
                      <span>Read Full Specs →</span>
                    </button>

                    <button
                      onClick={() => onSearch(item.name.split(' ')[0])}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[42px] ${
                        darkMode 
                          ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:bg-emerald-900' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      Find Stores
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {filteredNews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    scrollToCard(i);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === i ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-300 dark:bg-emerald-900 hover:bg-emerald-400'
                  }`}
                  title={`Jump to phone card ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* MODE 2: GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className={`rounded-3xl border overflow-hidden transition-all flex flex-col justify-between ${
                  darkMode
                    ? 'bg-[#032016]/90 border-emerald-900/80 hover:border-emerald-600/80 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-emerald-400 shadow-lg shadow-slate-200/40'
                }`}
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-emerald-600 text-white shadow-xs uppercase">
                        {item.kicker}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white font-mono font-extrabold text-xs flex justify-between">
                      <span>${item.priceUsd} USD</span>
                      <span className="text-emerald-400">{formatNaira(item.priceNgn)}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                        {item.brand} · {item.publishDate}
                      </span>
                      <h3 className="font-extrabold text-base leading-snug line-clamp-2">
                        {item.headline}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className={`p-2 rounded-xl border ${darkMode ? 'bg-emerald-950/80 border-emerald-900/80' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={`block text-[9px] uppercase font-bold ${darkMode ? 'text-emerald-400' : 'text-slate-500'}`}>SoC</span>
                        <span className="font-bold truncate block">{item.chipset.split('(')[0]}</span>
                      </div>
                      <div className={`p-2 rounded-xl border ${darkMode ? 'bg-emerald-950/80 border-emerald-900/80' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={`block text-[9px] uppercase font-bold ${darkMode ? 'text-emerald-400' : 'text-slate-500'}`}>Camera</span>
                        <span className="font-bold truncate block">{item.camera.split('+')[0]}</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      darkMode ? 'bg-emerald-900/20 border-emerald-800/60 text-emerald-200/90' : 'bg-emerald-50/80 border-emerald-200 text-slate-700'
                    }`}>
                      <p className="font-bold text-[10px] uppercase text-emerald-700 dark:text-emerald-400 mb-0.5">
                        ✨ Key World Difference:
                      </p>
                      <p className="line-clamp-2 font-medium">{item.worldDifference}</p>
                    </div>
                  </div>
                </div>

                <div className={`p-5 pt-0 grid grid-cols-2 gap-2 border-t pt-4 ${
                  darkMode ? 'border-emerald-900/40' : 'border-slate-100'
                }`}>
                  <button
                    onClick={() => setReadMoreModalItem(item)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer min-h-[42px]"
                  >
                    <span>Read Full Specs →</span>
                  </button>

                  <button
                    onClick={() => onSearch(item.name.split(' ')[0])}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[42px] ${
                      darkMode ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    Find Stores
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Full Specs & News Modal */}
      {readMoreModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 relative transition-colors ${
            darkMode 
              ? 'bg-[#021B12] border-emerald-800 text-white' 
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setReadMoreModalItem(null)}
              aria-label="Close modal"
              className={`absolute top-4 right-4 w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm z-10 transition-colors cursor-pointer ${
                darkMode 
                  ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ✕
            </button>

            <div className="space-y-6">
              
              <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-800">
                <img
                  src={readMoreModalItem.image}
                  alt={readMoreModalItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-emerald-400 font-extrabold uppercase">
                      {readMoreModalItem.kicker}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-300">{readMoreModalItem.publishDate}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                    {readMoreModalItem.headline}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 dark:text-emerald-300/70">Global MSRP:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">${readMoreModalItem.priceUsd} USD</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 dark:text-emerald-300/70">Est. Nigeria Hub Price:</span>
                  <span className="font-black font-mono text-emerald-700 dark:text-emerald-400">{formatNaira(readMoreModalItem.priceNgn)}</span>
                </div>
              </div>

              <div>
                <h3 className={`text-xs font-black uppercase tracking-wider mb-2 ${
                  darkMode ? 'text-emerald-300' : 'text-slate-900'
                }`}>
                  Global Market News & Tech Analysis
                </h3>
                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-emerald-200/90' : 'text-slate-700'
                }`}>
                  {readMoreModalItem.fullNewsArticle}
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 ${
                darkMode ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50/60 border-emerald-200'
              }`}>
                <h4 className={`font-extrabold text-xs uppercase tracking-wider ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-900'
                }`}>
                  ✨ Global Highlights & Upgrades vs Previous Generation
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {readMoreModalItem.keyDifferencesVsPredecessor.map((diff, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className={darkMode ? 'text-emerald-100' : 'text-slate-800'}>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 text-xs ${
                darkMode ? 'bg-emerald-950/60 border-emerald-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="font-extrabold text-xs uppercase tracking-wider">
                  Technical Specification Sheet
                </h4>
                <div className="space-y-2">
                  {readMoreModalItem.specsTable.map((spec, i) => (
                    <div key={i} className={`flex justify-between py-1.5 border-b last:border-0 ${
                      darkMode ? 'border-emerald-900/40' : 'border-slate-200'
                    }`}>
                      <span className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {spec.label}
                      </span>
                      <span className="font-extrabold text-right max-w-[280px]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setReadMoreModalItem(null);
                    onSearch(readMoreModalItem.name.split(' ')[0]);
                  }}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md min-h-[44px] cursor-pointer"
                >
                  Search Verified Nigerian Stores Selling {readMoreModalItem.name} →
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
