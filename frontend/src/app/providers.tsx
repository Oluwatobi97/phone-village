'use client';

import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { ChatProvider } from '../context/ChatContext';
import ChatDrawer from '../components/ChatDrawer';
import CallOverlay from '../components/CallOverlay';

function ChatWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode } = useTheme();
  return (
    <>
      {children}
      <ChatDrawer darkMode={darkMode} />
      <CallOverlay darkMode={darkMode} />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <ChatWrapper>{children}</ChatWrapper>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
