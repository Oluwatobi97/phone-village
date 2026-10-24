export type AccountRole = 'BUYER' | 'DEALER' | 'ADMIN';
export type AccountStatus = 'UNVERIFIED' | 'VERIFIED' | 'SUSPENDED';

export interface UserAccount {
  id: string;
  email: string;
  normalizedEmail: string;
  phone: string;
  fullName: string;
  passwordHash: string;
  role: AccountRole;
  status: AccountStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SanitizedUser {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  role: AccountRole;
  status: AccountStatus;
  emailVerified: boolean;
  createdAt: string;
}

export interface RegisterInput {
  email: string;
  phone: string;
  fullName: string;
  password: string;
  role?: AccountRole;
}

export interface LoginInput {
  identifier: string; // Email or phone
  password: string;
}

export interface VerifyEmailInput {
  token: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}
