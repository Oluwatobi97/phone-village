export type PhoneCondition = 'Brand New' | 'UK Used' | 'Locally Used';

export interface PhoneListing {
  id: string;
  title: string;
  brand: 'Apple' | 'Samsung' | 'Tecno' | 'Infinix' | 'Xiaomi' | 'Google' | 'OnePlus';
  model: string;
  priceNgn: number;
  condition: PhoneCondition;
  storage: string;
  ram?: string;
  batteryHealth?: number; // e.g., 92 for UK used iPhones
  color: string;
  location: string;
  hubRegion: 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan';
  sellerName: string;
  sellerStore: string;
  sellerPhone: string;
  sellerWhatsapp?: string;
  verifiedSeller: boolean;
  sellerAddress: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  description: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SOLD';
  features: string[];
  specs: {
    display: string;
    camera: string;
    battery: string;
    processor: string;
  };
}

export interface VerifiedSeller {
  id: string;
  storeName: string;
  ownerName: string;
  hubLocation: string;
  physicalAddress: string;
  verifiedSince: string;
  totalListingsCount: number;
  rating: number;
  reviewCount: number;
  phone: string;
  whatsapp: string;
  storePhoto: string;
  specialties: string[];
}

export interface PhoneComparisonItem {
  id: string;
  title: string;
  brand: string;
  priceNgn: number;
  display: string;
  processor: string;
  camera: string;
  battery: string;
  ramStorage: string;
  rating: number;
  badge?: string;
}
