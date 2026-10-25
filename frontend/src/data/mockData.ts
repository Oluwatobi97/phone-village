import { PhoneListing, VerifiedSeller, PhoneComparisonItem } from '../types/phone';

export const MOCK_LISTINGS: PhoneListing[] = [
  {
    id: 'listing-1',
    title: 'iPhone 15 Pro Max 256GB Natural Titanium (Factory Unlocked)',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    priceNgn: 1480000,
    condition: 'UK Used',
    storage: '256GB',
    ram: '8GB',
    batteryHealth: 98,
    color: 'Natural Titanium',
    location: 'Computer Village, Ikeja, Lagos',
    hubRegion: 'Lagos',
    sellerName: 'Emeka Okafor',
    sellerStore: 'Apex Gadgets Hub Ltd',
    sellerPhone: '+2348031234567',
    sellerWhatsapp: '2348031234567',
    verifiedSeller: true,
    sellerAddress: 'Shop B12, Medical Road, Computer Village, Ikeja',
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Clean UK used iPhone 15 Pro Max. 100% factory unlocked, Face ID active, true tone intact. Comes with complete original fast charging cable and silicone case. Physical test allowed in store.',
    status: 'ACTIVE',
    features: ['Face ID', 'True Tone Active', '5G Capable', 'Type-C Port', 'Action Button'],
    specs: {
      display: '6.7" Super Retina XDR OLED 120Hz',
      camera: '48MP Triple Camera System with 5x Telephoto',
      battery: '4422 mAh (98% Health)',
      processor: 'Apple A17 Pro (3nm)'
    }
  },
  {
    id: 'listing-2',
    title: 'Samsung Galaxy S24 Ultra 5G 512GB Titanium Black',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    priceNgn: 1550000,
    condition: 'Brand New',
    storage: '512GB',
    ram: '12GB',
    color: 'Titanium Black',
    location: 'Banex Plaza, Wuse 2, Abuja',
    hubRegion: 'Abuja',
    sellerName: 'Alhaji Musa Garba',
    sellerStore: 'Crown Mobile Technologies',
    sellerPhone: '+2348029876543',
    sellerWhatsapp: '2348029876543',
    verifiedSeller: true,
    sellerAddress: 'Suite 44, Ground Floor, Banex Plaza, Wuse 2, Abuja',
    rating: 4.8,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Brand new in box Samsung Galaxy S24 Ultra with built-in S-Pen. Galaxy AI enabled, dual nano SIM + eSIM compatible. Includes 1-year official Samsung warranty receipt.',
    status: 'ACTIVE',
    features: ['Galaxy AI', 'Embedded S-Pen', 'Quad Telephoto System', 'Gorilla Armor Anti-Reflective Glass'],
    specs: {
      display: '6.8" Dynamic LTPO AMOLED 2X 120Hz 2600 nits',
      camera: '200MP + 50MP Periscope + 10MP + 12MP',
      battery: '5000 mAh 45W Fast Charging',
      processor: 'Snapdragon 8 Gen 3 for Galaxy'
    }
  },
  {
    id: 'listing-3',
    title: 'Google Pixel 8 Pro 128GB Obsidian Black (Clean UK Used)',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    priceNgn: 790000,
    condition: 'UK Used',
    storage: '128GB',
    ram: '12GB',
    batteryHealth: 95,
    color: 'Obsidian',
    location: 'Saka Tinubu, Victoria Island, Lagos',
    hubRegion: 'Lagos',
    sellerName: 'Adeola Benson',
    sellerStore: 'PrimeTech Devices VI',
    sellerPhone: '+2348145551234',
    sellerWhatsapp: '2348145551234',
    verifiedSeller: true,
    sellerAddress: '15B Saka Tinubu Street, Victoria Island, Lagos',
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Crisp Google Pixel 8 Pro with best-in-class AI photography and Magic Editor. Temperature sensor tested, battery health 95%, spotless matte glass rear.',
    status: 'ACTIVE',
    features: ['Best-in-class Computational Photography', 'Tensor G3 AI', '7 Years OS Updates', 'Sub-6 5G'],
    specs: {
      display: '6.7" Super Actua OLED 1-120Hz',
      camera: '50MP Main + 48MP Ultrawide + 48MP 5x Telephoto',
      battery: '5050 mAh 30W Fast Charge',
      processor: 'Google Tensor G3'
    }
  },
  {
    id: 'listing-4',
    title: 'Tecno Camon 30 Pro 5G 512GB Iceland White (Brand New Sealed)',
    brand: 'Tecno',
    model: 'Camon 30 Pro',
    priceNgn: 495000,
    condition: 'Brand New',
    storage: '512GB',
    ram: '12GB (+12GB Extended)',
    color: 'Iceland White',
    location: 'Garrison, Port Harcourt, Rivers',
    hubRegion: 'Port Harcourt',
    sellerName: 'Barine Nwiido',
    sellerStore: 'Garden City Gadgets',
    sellerPhone: '+2348057778899',
    sellerWhatsapp: '2348057778899',
    verifiedSeller: true,
    sellerAddress: 'Plot 10 Garrison Junction, Aba Road, Port Harcourt',
    rating: 4.7,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Factory sealed Tecno Camon 30 Pro 5G with Sony IMX890 50MP OIS sensor and Dimensity 8200 Ultimate 4nm chip. Incredible battery life and 70W flash charge.',
    status: 'ACTIVE',
    features: ['Sony IMX890 OIS Sensor', '70W Flash Charge', 'Dual Stereo Dolby Atmos Speakers', '144Hz AMOLED'],
    specs: {
      display: '6.78" 144Hz AMOLED FHD+',
      camera: '50MP OIS Sony Sensor + 50MP Ultra-wide + 50MP Selfie with Eye-AF',
      battery: '5000 mAh 70W Super Charge',
      processor: 'MediaTek Dimensity 8200 Ultimate 4nm'
    }
  },
  {
    id: 'listing-5',
    title: 'Infinix Note 40 Pro+ 5G 256GB Vintage Green',
    brand: 'Infinix',
    model: 'Note 40 Pro+',
    priceNgn: 410000,
    condition: 'Brand New',
    storage: '256GB',
    ram: '12GB',
    color: 'Vintage Green',
    location: 'Iwo Road Tech Market, Ibadan, Oyo',
    hubRegion: 'Ibadan',
    sellerName: 'Kehinde Balogun',
    sellerStore: 'Oyo Wireless Solutions',
    sellerPhone: '+2348123334455',
    sellerWhatsapp: '2348123334455',
    verifiedSeller: true,
    sellerAddress: 'Shop 18, Opp. Total Station, Iwo Road, Ibadan',
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Infinix Note 40 Pro+ with revolutionary 100W multi-speed fast charging and 20W wireless MagCharge. Vegan leather rear texture.',
    status: 'ACTIVE',
    features: ['100W All-Round FastCharge 2.0', '20W Wireless MagCharge', 'JBL Tuned Audio', '3D Curved AMOLED'],
    specs: {
      display: '6.78" 3D Curved 120Hz AMOLED',
      camera: '108MP OIS Super-Zoom Camera',
      battery: '4600 mAh 100W Fast Charge',
      processor: 'MediaTek Dimensity 7020 5G'
    }
  },
  {
    id: 'listing-6',
    title: 'Xiaomi 14 Ultra 512GB Leica Optics Photography Edition',
    brand: 'Xiaomi',
    model: 'Xiaomi 14 Ultra',
    priceNgn: 1390000,
    condition: 'Brand New',
    storage: '512GB',
    ram: '16GB',
    color: 'Black Ceramic',
    location: 'Computer Village, Ikeja, Lagos',
    hubRegion: 'Lagos',
    sellerName: 'Chinedu Eze',
    sellerStore: 'Lagos Tech Emporium',
    sellerPhone: '+2348099887766',
    sellerWhatsapp: '2348099887766',
    verifiedSeller: true,
    sellerAddress: '22 Otigba Street, Computer Village, Ikeja',
    rating: 5.0,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The pinnacle of mobile photography with Quad Leica 50MP sensors and 1-inch stepless variable aperture. 90W wired + 80W wireless hypercharge.',
    status: 'ACTIVE',
    features: ['Quad 50MP Leica Cameras', '1-inch Sony LYT-900 Sensor', 'Titanium Frame', '90W HyperCharge'],
    specs: {
      display: '6.73" LTPO AMOLED 120Hz WQHD+ 3000 nits',
      camera: 'Quad 50MP (1" Main with f/1.63-f/4.0 variable aperture + 3x + 5x + Ultra)',
      battery: '5000 mAh 90W HyperCharge',
      processor: 'Snapdragon 8 Gen 3'
    }
  }
];

export const MOCK_VERIFIED_SELLERS: VerifiedSeller[] = [
  {
    id: 'seller-1',
    storeName: 'Apex Gadgets Hub Ltd',
    ownerName: 'Emeka Okafor',
    hubLocation: 'Computer Village, Ikeja, Lagos',
    physicalAddress: 'Shop B12, Medical Road, Computer Village, Ikeja',
    verifiedSince: '2021',
    totalListingsCount: 148,
    rating: 4.9,
    reviewCount: 382,
    phone: '+2348031234567',
    whatsapp: '2348031234567',
    storePhoto: 'https://images.unsplash.com/photo-1581291518655-9523c93269c4?w=600&auto=format&fit=crop&q=80',
    specialties: ['Apple iPhones', 'MacBooks', 'OEM Accessories']
  },
  {
    id: 'seller-2',
    storeName: 'Crown Mobile Technologies',
    ownerName: 'Alhaji Musa Garba',
    hubLocation: 'Banex Plaza, Wuse 2, Abuja',
    physicalAddress: 'Suite 44, Ground Floor, Banex Plaza, Wuse 2, Abuja',
    verifiedSince: '2019',
    totalListingsCount: 215,
    rating: 4.8,
    reviewCount: 512,
    phone: '+2348029876543',
    whatsapp: '2348029876543',
    storePhoto: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=600&auto=format&fit=crop&q=80',
    specialties: ['Samsung Galaxy Flagships', 'Foldables', 'Official Warranty Devices']
  },
  {
    id: 'seller-3',
    storeName: 'PrimeTech Devices VI',
    ownerName: 'Adeola Benson',
    hubLocation: 'Victoria Island, Lagos',
    physicalAddress: '15B Saka Tinubu Street, Victoria Island, Lagos',
    verifiedSince: '2022',
    totalListingsCount: 89,
    rating: 4.9,
    reviewCount: 194,
    phone: '+2348145551234',
    whatsapp: '2348145551234',
    storePhoto: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80',
    specialties: ['Google Pixels', 'UK Used iPhones', 'Trade-in Upgrades']
  }
];

export const MOCK_COMPARISON_ITEMS: PhoneComparisonItem[] = [
  {
    id: 'compare-1',
    title: 'iPhone 15 Pro Max',
    brand: 'Apple',
    priceNgn: 1480000,
    display: '6.7" OLED 120Hz ProMotion',
    processor: 'A17 Pro (3nm)',
    camera: '48MP Triple + 5x Optical Zoom',
    battery: '4422 mAh / USB-C Fast Charge',
    ramStorage: '8GB / 256GB',
    rating: 4.9,
    badge: 'Popular Choice'
  },
  {
    id: 'compare-2',
    title: 'Samsung S24 Ultra',
    brand: 'Samsung',
    priceNgn: 1550000,
    display: '6.8" AMOLED 120Hz LTPO',
    processor: 'Snapdragon 8 Gen 3',
    camera: '200MP Quad + Built-in S-Pen',
    battery: '5000 mAh / 45W Charging',
    ramStorage: '12GB / 512GB',
    rating: 4.9,
    badge: 'Best Productivity'
  },
  {
    id: 'compare-3',
    title: 'Google Pixel 8 Pro',
    brand: 'Google',
    priceNgn: 790000,
    display: '6.7" Super Actua 120Hz',
    processor: 'Google Tensor G3',
    camera: '50MP Triple + AI Magic Editor',
    battery: '5050 mAh / 30W Charging',
    ramStorage: '12GB / 128GB',
    rating: 4.8,
    badge: 'Best Value Flagship'
  }
];
