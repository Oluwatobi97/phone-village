'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'dealer';
  storeName?: string;
  storeAddress?: string;
  hubLocation?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  demoLoginBuyer: () => void;
  demoLoginDealer: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  demoLoginBuyer: () => {},
  demoLoginDealer: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('pv_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore corrupted json
        }
      }
    }
  }, []);

  const login = (profile: UserProfile) => {
    setUser(profile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pv_user', JSON.stringify(profile));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pv_user');
    }
  };

  const demoLoginBuyer = () => {
    const buyer: UserProfile = {
      id: 'usr-buyer-001',
      name: 'Tobi Victor',
      email: 'victor.tobi@example.ng',
      phone: '+2348039871234',
      role: 'buyer',
    };
    login(buyer);
  };

  const demoLoginDealer = () => {
    const dealer: UserProfile = {
      id: 'usr-dealer-001',
      name: 'Emeka Okafor',
      email: 'emeka@apexgadgets.ng',
      phone: '+2348031234567',
      role: 'dealer',
      storeName: 'Apex Gadgets Hub Ltd',
      storeAddress: 'Shop B12, Medical Road, Computer Village, Ikeja',
      hubLocation: 'Computer Village, Ikeja, Lagos',
      isVerified: true,
    };
    login(dealer);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, demoLoginBuyer, demoLoginDealer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
