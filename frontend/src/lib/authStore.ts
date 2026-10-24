import crypto from 'node:crypto';
import { UserAccount, SanitizedUser, RegisterInput } from '../../../shared/types/auth';
import { SellerProfile, SellerOnboardingInput, ListingEligibilityResult } from '../../../shared/types/seller';

// In-Memory Thread-Safe Data Persistence Stores
const usersStore = new Map<string, UserAccount>();
const emailToUserId = new Map<string, string>();
const phoneToUserId = new Map<string, string>();
const tokensStore = new Map<string, { userId: string; type: 'VERIFICATION' | 'PASSWORD_RESET'; expiresAt: number; used: boolean }>();
const sessionsStore = new Map<string, { userId: string; expiresAt: number }>();
const sellersStore = new Map<string, SellerProfile>();
const rateLimitsStore = new Map<string, { count: number; resetTime: number }>();

// Helper Utilities
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function hashPassword(password: string): string {
  const salt = 'phone_village_salt_2026';
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function sanitizeUser(user: UserAccount): SanitizedUser {
  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    fullName: user.fullName,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  };
}

// 1. User Store Operations
export const UserStore = {
  findUserByEmail(email: string): UserAccount | undefined {
    const normalized = normalizeEmail(email);
    const id = emailToUserId.get(normalized);
    return id ? usersStore.get(id) : undefined;
  },

  findUserById(id: string): UserAccount | undefined {
    return usersStore.get(id);
  },

  findUserByIdentifier(identifier: string): UserAccount | undefined {
    const isEmail = identifier.includes('@');
    if (isEmail) {
      return this.findUserByEmail(identifier);
    }
    const id = phoneToUserId.get(identifier.trim());
    return id ? usersStore.get(id) : undefined;
  },

  registerUser(input: RegisterInput): { user: SanitizedUser; rawVerificationToken: string } {
    const normalized = normalizeEmail(input.email);
    if (emailToUserId.has(normalized)) {
      throw new Error('DUPLICATE_EMAIL');
    }

    const trimmedPhone = input.phone.trim();
    if (phoneToUserId.has(trimmedPhone)) {
      throw new Error('DUPLICATE_PHONE');
    }

    const id = 'usr_' + crypto.randomBytes(8).toString('hex');
    const now = new Date().toISOString();

    const newUser: UserAccount = {
      id,
      email: input.email.trim(),
      normalizedEmail: normalized,
      phone: trimmedPhone,
      fullName: input.fullName.trim(),
      passwordHash: hashPassword(input.password),
      role: input.role || 'BUYER',
      status: 'UNVERIFIED',
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
    };

    usersStore.set(id, newUser);
    emailToUserId.set(normalized, id);
    phoneToUserId.set(trimmedPhone, id);

    // Generate Verification Token
    const rawVerificationToken = crypto.randomBytes(32).toString('hex');
    const hashed = hashToken(rawVerificationToken);
    
    tokensStore.set(hashed, {
      userId: id,
      type: 'VERIFICATION',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      used: false,
    });

    return { user: sanitizeUser(newUser), rawVerificationToken };
  },

  verifyEmail(userId: string): boolean {
    const user = usersStore.get(userId);
    if (!user) return false;

    user.emailVerified = true;
    user.status = 'VERIFIED';
    user.updatedAt = new Date().toISOString();
    return true;
  },

  updatePassword(userId: string, newPassword: string): boolean {
    const user = usersStore.get(userId);
    if (!user) return false;

    user.passwordHash = hashPassword(newPassword);
    user.updatedAt = new Date().toISOString();
    return true;
  },
};

// 2. Token Store Operations
export const TokenStore = {
  createVerificationToken(userId: string): string {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashed = hashToken(rawToken);

    tokensStore.set(hashed, {
      userId,
      type: 'VERIFICATION',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      used: false,
    });

    return rawToken;
  },

  createPasswordResetToken(userId: string): string {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashed = hashToken(rawToken);

    tokensStore.set(hashed, {
      userId,
      type: 'PASSWORD_RESET',
      expiresAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
      used: false,
    });

    return rawToken;
  },

  verifyAndConsumeToken(rawToken: string, expectedType: 'VERIFICATION' | 'PASSWORD_RESET'): { userId: string } | null {
    const hashed = hashToken(rawToken);
    const tokenRecord = tokensStore.get(hashed);

    if (!tokenRecord) return null;
    if (tokenRecord.type !== expectedType) return null;
    if (tokenRecord.used) return null;
    if (Date.now() > tokenRecord.expiresAt) return null;

    tokenRecord.used = true; // Single-use consumption
    return { userId: tokenRecord.userId };
  },
};

// 3. Session Store Operations
export const SessionStore = {
  createSession(userId: string): string {
    const sessionId = 'sess_' + crypto.randomBytes(24).toString('hex');
    sessionsStore.set(sessionId, {
      userId,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return sessionId;
  },

  getSessionUser(sessionId: string): UserAccount | null {
    const record = sessionsStore.get(sessionId);
    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      sessionsStore.delete(sessionId);
      return null;
    }
    return UserStore.findUserById(record.userId) || null;
  },

  invalidateSession(sessionId: string): void {
    sessionsStore.delete(sessionId);
  },

  invalidateAllUserSessions(userId: string): void {
    for (const [sessId, rec] of sessionsStore.entries()) {
      if (rec.userId === userId) {
        sessionsStore.delete(sessId);
      }
    }
  },
};

// 4. Seller Store Operations
export const SellerStore = {
  getProfileByUserId(userId: string): SellerProfile | undefined {
    return sellersStore.get(userId);
  },

  upsertProfile(userId: string, input: SellerOnboardingInput): SellerProfile {
    const existing = sellersStore.get(userId);
    const now = new Date().toISOString();

    const profile: SellerProfile = {
      id: existing ? existing.id : 'seller_' + crypto.randomBytes(8).toString('hex'),
      userId,
      sellerType: input.sellerType,
      storeName: input.storeName.trim(),
      ownerName: input.ownerName.trim(),
      contactPhone: input.contactPhone.trim(),
      whatsappPhone: input.whatsappPhone.trim(),
      techRegion: input.techRegion,
      physicalAddress: input.physicalAddress.trim(),
      cacRegistrationNumber: input.cacRegistrationNumber?.trim(),
      status: 'APPROVED',
      termsAccepted: input.termsAccepted,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
    };

    sellersStore.set(userId, profile);
    return profile;
  },

  checkListingEligibility(userId: string): ListingEligibilityResult {
    const user = UserStore.findUserById(userId);
    const seller = sellersStore.get(userId);

    const reasons: string[] = [];
    if (!user) {
      reasons.push('User account not found');
      return {
        canCreateListing: false,
        emailVerified: false,
        hasSellerProfile: false,
        sellerStatus: 'NOT_ONBOARDED',
        reasons,
      };
    }

    if (!user.emailVerified) {
      reasons.push('Email address must be verified before creating phone listings.');
    }

    if (!seller) {
      reasons.push('Seller profile onboarding must be completed.');
    } else if (seller.status !== 'APPROVED') {
      reasons.push(`Seller profile status is ${seller.status}. Must be APPROVED.`);
    }

    const canCreateListing = user.emailVerified && seller?.status === 'APPROVED';

    return {
      canCreateListing,
      emailVerified: user.emailVerified,
      hasSellerProfile: Boolean(seller),
      sellerStatus: seller ? seller.status : 'NOT_ONBOARDED',
      reasons,
    };
  },
};

// 5. Rate Limiter Helper
export function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitsStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitsStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}
