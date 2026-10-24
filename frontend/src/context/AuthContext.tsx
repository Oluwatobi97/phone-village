'use client';

import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'dealer';
  storeName?: string;
  storeAddress?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
  demoLoginBuyer: () => void;
  demoLoginDealer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('pv_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('pv_user');
      }
    }
    return null;
  });

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('pv_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pv_user');
  };

  const demoLoginBuyer = () => {
    const demoBuyer: UserProfile = {
      id: 'usr-buyer-1',
      name: 'Chidi Okonkwo',
      email: 'chidi.o@gmail.com',
      phone: '+2348039876543',
      role: 'buyer',
    };
    login(demoBuyer);
  };

  const demoLoginDealer = () => {
    const demoDealer: UserProfile = {
      id: 'usr-dealer-1',
      name: 'Emeka Nnamdi',
      email: 'emeka@apexistore.ng',
      phone: '+2348031234567',
      role: 'dealer',
      storeName: 'Apex iStore Ikeja',
      storeAddress: 'Shop 14, Otigba Street, Computer Village, Ikeja, Lagos',
      verified: true,
    };
    login(demoDealer);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, demoLoginBuyer, demoLoginDealer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
