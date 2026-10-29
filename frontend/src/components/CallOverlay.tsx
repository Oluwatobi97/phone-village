'use client';

import React from 'react';
import { useChat } from '../context/ChatContext';

interface CallOverlayProps {
  darkMode: boolean;
}

export default function CallOverlay({ darkMode }: CallOverlayProps) {
  const { activeCall, endCall, toggleMuteCall, toggleVideoCall } = useChat();

  if (!activeCall) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 text-center space-y-6 relative overflow-hidden transition-colors ${
        darkMode ? 'bg-[#032016] border-emerald-800 text-white' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        
        {/* Call Type Indicator */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
            {activeCall.type === 'video' ? '📹 In-App Encrypted Video Call' : '📞 In-App Direct Voice Call'}
          </span>
        </div>

        {/* Video Canvas or Avatar */}
        <div className="relative w-36 h-36 mx-auto rounded-full p-1 border-4 border-emerald-500/60 shadow-xl overflow-hidden bg-slate-800 flex items-center justify-center">
          {activeCall.type === 'video' && activeCall.isVideoEnabled ? (
            <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-xs text-emerald-300 relative">
              <span className="text-2xl mb-1">📹</span>
              <span className="text-[10px] font-mono">HD Stream</span>
            </div>
          ) : (
            <div className="w-full h-full rounded-full overflow-hidden bg-emerald-950 flex items-center justify-center text-4xl">
              🏬
            </div>
          )}
        </div>

        {/* Store & Recipient Details */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white">{activeCall.recipientStore}</h2>
          <p className="text-xs font-semibold text-emerald-300/80">{activeCall.recipientName} (Verified Dealer)</p>

          <div className="pt-2">
            {activeCall.state === 'calling' && (
              <span className="text-xs font-mono font-extrabold text-emerald-400 animate-pulse">
                Ringing Vendor Store Line...
              </span>
            )}
            {activeCall.state === 'connected' && (
              <span className="text-sm font-mono font-black text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700">
                ● {formatTime(activeCall.durationSeconds)}
              </span>
            )}
            {activeCall.state === 'ended' && (
              <span className="text-xs font-mono font-bold text-red-400">
                Call Ended
              </span>
            )}
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-emerald-900/60">
          {/* Mute Mic */}
          <button
            onClick={toggleMuteCall}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition-all cursor-pointer ${
              activeCall.isMuted
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'
            }`}
            title={activeCall.isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {activeCall.isMuted ? '🔇' : '🎙️'}
          </button>

          {/* Toggle Video */}
          {activeCall.type === 'video' && (
            <button
              onClick={toggleVideoCall}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition-all cursor-pointer ${
                !activeCall.isVideoEnabled
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'
              }`}
              title={activeCall.isVideoEnabled ? 'Disable Camera' : 'Enable Camera'}
            >
              {activeCall.isVideoEnabled ? '📹' : '🚫'}
            </button>
          )}

          {/* End Call Button */}
          <button
            onClick={endCall}
            className="w-14 h-14 rounded-2xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="End Call"
          >
            📞
          </button>
        </div>

        <p className="text-[10px] text-slate-400 pt-1">
          Phone Village In-App Encrypted Peer Connection
        </p>

      </div>
    </div>
  );
}
