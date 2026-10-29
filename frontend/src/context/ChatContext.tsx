'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller';
  text: string;
  timestamp: string;
  imageAttachment?: string;
  priceOfferNgn?: number;
  isOfferAccepted?: boolean;
}

export interface ChatThread {
  id: string;
  listingId?: string;
  listingTitle?: string;
  listingPriceNgn?: number;
  listingImage?: string;
  sellerStore: string;
  sellerName: string;
  sellerPhone: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: ChatMessage[];
}

export type CallType = 'voice' | 'video';
export type CallState = 'idle' | 'calling' | 'connected' | 'ended';

interface CallInfo {
  type: CallType;
  state: CallState;
  recipientName: string;
  recipientStore: string;
  durationSeconds: number;
  isMuted: boolean;
  isVideoEnabled: boolean;
}

interface ChatContextType {
  threads: ChatThread[];
  activeThreadId: string | null;
  isChatOpen: boolean;
  activeCall: CallInfo | null;
  openChat: (threadId?: string) => void;
  closeChat: () => void;
  startChatWithSeller: (listing: {
    id: string;
    title: string;
    priceNgn: number;
    image: string;
    sellerStore: string;
    sellerName: string;
    sellerPhone: string;
  }) => void;
  sendMessage: (threadId: string, text: string, offerNgn?: number, imageAttachment?: string) => void;
  startCall: (storeName: string, recipientName: string, type: CallType) => void;
  endCall: () => void;
  toggleMuteCall: () => void;
  toggleVideoCall: () => void;
  totalUnreadCount: number;
}

const INITIAL_THREADS: ChatThread[] = [
  {
    id: 'thread-computer-village',
    listingId: 'listing-1',
    listingTitle: 'iPhone 15 Pro Max 256GB Natural Titanium (UK Used)',
    listingPriceNgn: 1450000,
    listingImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    sellerStore: 'Ikeja Apple Palace',
    sellerName: 'Emeka Nwosu',
    sellerPhone: '+2348031234567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'Yes boss, the iPhone 15 Pro Max is 96% battery health and ready for physical testing at Shop 14 Medical Rd.',
    lastMessageTime: '10:14 AM',
    unreadCount: 1,
    online: true,
    messages: [
      {
        id: 'm1',
        sender: 'buyer',
        text: 'Hello, I saw your listing for iPhone 15 Pro Max 256GB. Is it still available at Computer Village?',
        timestamp: '10:10 AM'
      },
      {
        id: 'm2',
        sender: 'seller',
        text: 'Yes boss, the iPhone 15 Pro Max is 96% battery health and ready for physical testing at Shop 14 Medical Rd.',
        timestamp: '10:14 AM'
      }
    ]
  },
  {
    id: 'thread-banex-plaza',
    listingId: 'listing-2',
    listingTitle: 'Samsung Galaxy S24 Ultra 512GB Titanium Grey',
    listingPriceNgn: 1380000,
    listingImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
    sellerStore: 'Banex Galaxy Hub Abuja',
    sellerName: 'Alhaji Usman Bello',
    sellerPhone: '+2348029876543',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'I can give you for ₦1,350,000 if you are picking up today at Emab Plaza Wuse 2.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    online: true,
    messages: [
      {
        id: 'mb1',
        sender: 'buyer',
        text: 'Hi Alhaji, can you do ₦1,320,000 for the S24 Ultra?',
        timestamp: 'Yesterday 4:00 PM',
        priceOfferNgn: 1320000
      },
      {
        id: 'mb2',
        sender: 'seller',
        text: 'I can give you for ₦1,350,000 if you are picking up today at Emab Plaza Wuse 2.',
        timestamp: 'Yesterday 4:15 PM'
      }
    ]
  }
];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<ChatThread[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pv_chat_threads');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_THREADS;
  });

  const [activeThreadId, setActiveThreadId] = useState<string | null>('thread-computer-village');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<CallInfo | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pv_chat_threads', JSON.stringify(threads));
    }
  }, [threads]);

  // Handle call timer
  useEffect(() => {
    let timer: any;
    if (activeCall && activeCall.state === 'connected') {
      timer = setInterval(() => {
        setActiveCall((prev) => prev ? { ...prev, durationSeconds: prev.durationSeconds + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall?.state]);

  const openChat = (threadId?: string) => {
    if (threadId) {
      setActiveThreadId(threadId);
      // Mark as read
      setThreads((prev) =>
        prev.map((t) => (t.id === threadId ? { ...t, unreadCount: 0 } : t))
      );
    }
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const startChatWithSeller = (listing: {
    id: string;
    title: string;
    priceNgn: number;
    image: string;
    sellerStore: string;
    sellerName: string;
    sellerPhone: string;
  }) => {
    // Check if thread exists for this store/listing
    let existingThread = threads.find(
      (t) => t.sellerStore.toLowerCase() === listing.sellerStore.toLowerCase()
    );

    if (existingThread) {
      setActiveThreadId(existingThread.id);
      setIsChatOpen(true);
      return;
    }

    // Create new thread
    const newThreadId = `thread-${Date.now()}`;
    const newThread: ChatThread = {
      id: newThreadId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingPriceNgn: listing.priceNgn,
      listingImage: listing.image,
      sellerStore: listing.sellerStore,
      sellerName: listing.sellerName,
      sellerPhone: listing.sellerPhone,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
      lastMessage: `Hi ${listing.sellerStore}, I am interested in ${listing.title}. Is it available for inspection?`,
      lastMessageTime: 'Just Now',
      unreadCount: 0,
      online: true,
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: 'buyer',
          text: `Hi ${listing.sellerStore}, I am viewing your listing for "${listing.title}" (₦${listing.priceNgn.toLocaleString('en-NG')}) on Phone Village. Is it currently available for physical testing at your shop?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
    setIsChatOpen(true);
  };

  const sendMessage = (threadId: string, text: string, offerNgn?: number, imageAttachment?: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      text,
      timestamp: timeStr,
      priceOfferNgn: offerNgn,
      imageAttachment
    };

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const updatedMessages = [...thread.messages, newMsg];
          return {
            ...thread,
            lastMessage: text || (offerNgn ? `Price offer: ₦${offerNgn.toLocaleString('en-NG')}` : 'Photo attachment'),
            lastMessageTime: timeStr,
            messages: updatedMessages
          };
        }
        return thread;
      })
    );

    // Simulated vendor instant response after 1.8s
    setTimeout(() => {
      const vendorReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'seller',
        text: offerNgn 
          ? `Thank you for your price offer of ₦${offerNgn.toLocaleString('en-NG')}! Please visit our physical shop to test the phone, and we can finalize.` 
          : `Thanks for messaging! Yes, it's 100% available in store for physical testing today. Drop by anytime!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setThreads((prev) =>
        prev.map((thread) => {
          if (thread.id === threadId) {
            return {
              ...thread,
              lastMessage: vendorReply.text,
              lastMessageTime: vendorReply.timestamp,
              messages: [...thread.messages, vendorReply]
            };
          }
          return thread;
        })
      );
    }, 1800);
  };

  // Web Audio Ringtone Synth
  const playRingtone = () => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.error(e);
    }
  };

  const startCall = (storeName: string, recipientName: string, type: CallType) => {
    playRingtone();
    setActiveCall({
      type,
      state: 'calling',
      recipientName,
      recipientStore: storeName,
      durationSeconds: 0,
      isMuted: false,
      isVideoEnabled: type === 'video'
    });

    // Auto-connect call after 2.5 seconds
    setTimeout(() => {
      setActiveCall((prev) =>
        prev ? { ...prev, state: 'connected' } : null
      );
    }, 2500);
  };

  const endCall = () => {
    if (activeCall) {
      setActiveCall((prev) => prev ? { ...prev, state: 'ended' } : null);
      setTimeout(() => {
        setActiveCall(null);
      }, 1000);
    }
  };

  const toggleMuteCall = () => {
    setActiveCall((prev) =>
      prev ? { ...prev, isMuted: !prev.isMuted } : null
    );
  };

  const toggleVideoCall = () => {
    setActiveCall((prev) =>
      prev ? { ...prev, isVideoEnabled: !prev.isVideoEnabled } : null
    );
  };

  const totalUnreadCount = threads.reduce((acc, t) => acc + t.unreadCount, 0);

  return (
    <ChatContext.Provider
      value={{
        threads,
        activeThreadId,
        isChatOpen,
        activeCall,
        openChat,
        closeChat,
        startChatWithSeller,
        sendMessage,
        startCall,
        endCall,
        toggleMuteCall,
        toggleVideoCall,
        totalUnreadCount
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
