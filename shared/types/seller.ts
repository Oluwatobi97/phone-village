export type SellerType = 'INDIVIDUAL' | 'DEALER';
export type SellerOnboardingStatus = 'NOT_ONBOARDED' | 'SUBMITTED' | 'APPROVED' | 'SUSPENDED';

export interface SellerProfile {
  id: string;
  userId: string;
  sellerType: SellerType;
  storeName: string;
  ownerName: string;
  contactPhone: string;
  whatsappPhone: string;
  techRegion: 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan' | 'Other';
  physicalAddress: string;
  cacRegistrationNumber?: string;
  status: SellerOnboardingStatus;
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerOnboardingInput {
  sellerType: SellerType;
  storeName: string;
  ownerName: string;
  contactPhone: string;
  whatsappPhone: string;
  techRegion: 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan' | 'Other';
  physicalAddress: string;
  cacRegistrationNumber?: string;
  termsAccepted: boolean;
}

export interface ListingEligibilityResult {
  canCreateListing: boolean;
  emailVerified: boolean;
  hasSellerProfile: boolean;
  sellerStatus: SellerOnboardingStatus;
  reasons: string[];
}
