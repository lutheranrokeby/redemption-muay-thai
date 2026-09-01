import React, { useState, useEffect } from 'react';

export default function TrialBookingModal({ isOpen, onClose }) {
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    // Reset iframe loading state when opened
    setIframeLoading(true);

    const scriptId = 'ghl-group-script';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] overflow-hidden">
      
      {/* Dimmed Backdrop Overlay (Click to close) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-[250]"
      ></div>

      {/* DESKTOP RIGHT-HAND DRAWER / MOBILE FULL-SCREEN TAKEOVER */}
      <div className="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 z-[260] w-full md:max-w-2xl lg:max-w-3xl bg-surface-container-low border-l-0 md:border-l-2 md:border-outline-variant flex flex-col h-full shadow-2xl transition-transform duration-300">
        
        {/* Drawer Header */}
        <div className="bg-surface-container-high border-b border-outline-variant px-4 py-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
            <h3 className="font-headline-md text-xl sm:text-2xl uppercase text-white tracking-wide">
              Book Your <span className="text-primary-container">Free Trial Class</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-background border border-outline-variant hover:border-primary-container text-white hover:text-primary-container flex items-center justify-center transition-colors font-mono font-bold text-xl focus:outline-none"
            aria-label="Close Drawer"
            title="Close Drawer"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body: Embedded Widget + Athletic Loading Skeleton */}
        <div className="flex-grow overflow-y-auto bg-background p-2 sm:p-4 relative min-h-[500px]">
          
          {/* Loading Skeleton & Spinner Overlay */}
          {iframeLoading && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center space-y-4 z-20 p-6">
              
              {/* Spinning Electric Cyan Pulse Ring */}
              <div className="relative flex items-center justify-center">
                <div className="w-14 h-14 border-4 border-primary-container/20 border-t-primary-container rounded-full animate-spin"></div>
                <span className="material-symbols-outlined absolute text-primary-container text-xl">calendar_month</span>
              </div>

              <div className="text-center space-y-1">
                <p className="font-headline-md text-lg uppercase text-white tracking-wide">
                  Loading Scheduling Calendar...
                </p>
                <p className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">
                  Connecting to Redemption Muay Thai Booking Engine
                </p>
              </div>

              {/* Skeleton Pulse Rows */}
              <div className="w-full max-w-md space-y-3 pt-4 opacity-50">
                <div className="h-10 bg-surface-container-high rounded animate-pulse w-full"></div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-12 bg-surface-container-high rounded animate-pulse"></div>
                  <div className="h-12 bg-surface-container-high rounded animate-pulse"></div>
                  <div className="h-12 bg-surface-container-high rounded animate-pulse"></div>
                </div>
                <div className="h-24 bg-surface-container-high rounded animate-pulse w-full"></div>
              </div>

            </div>
          )}

          {/* Embedded GoHighLevel Calendar Iframe */}
          <iframe
            src="https://api.leadconnectorhq.com/widget/group/3pKErThGxL28ZK4Ir8if"
            allow="payment"
            onLoad={() => setIframeLoading(false)}
            style={{ width: '100%', minHeight: '680px', border: 'none', overflow: 'hidden' }}
            id="3pKErThGxL28ZK4Ir8if_1788231703501"
            title="Redemption Muay Thai Trial Class Booking"
          ></iframe>

        </div>

        {/* Drawer Footer Bar */}
        <div className="bg-surface-container-high border-t border-outline-variant px-4 py-3 text-center shrink-0">
          <span className="font-label-mono text-xs text-on-surface-variant uppercase">
            ⚡ Instant confirmation • Select any class time on our schedule
          </span>
        </div>

      </div>

    </div>
  );
}
