import React, { useState, useEffect } from 'react';
import { sanitizeEditText } from '../utils/urlHelper';

export default function TrialBookingModal({ isOpen, onClose, data, onChange, isAdmin }) {
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setIframeLoading(true);

    const handleMessage = (e) => {
      if (!e.data || (e.data.token && e.data.token !== 'book_75f9c97b-675b-47aa-80b2-ab5e2ce061d9_365812d04d')) return;
      const el = document.getElementById('lcrm-booking-75f9c97b');
      if ((e.data.type === 'LCRM_BOOKING_RESIZE' || e.data.type === 'lcrm-booking-resize') && el && e.data.height) {
        el.style.height = (e.data.height + 4) + 'px';
      } else if (e.data.type === 'LCRM_BOOKING_SCROLL' && typeof e.data.deltaY === 'number') {
        const container = document.getElementById('lcrm-booking-container');
        if (container && container.scrollHeight > container.clientHeight) {
          container.scrollBy({ top: e.data.deltaY, left: 0, behavior: 'auto' });
        } else {
          window.scrollBy({ top: e.data.deltaY, left: 0, behavior: 'auto' });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    const el = document.getElementById('lcrm-booking-75f9c97b');
    const handleLoad = () => {
      setIframeLoading(false);
      try {
        el?.contentWindow?.postMessage({ type: 'LCRM_REQUEST_BOOKING_RESIZE' }, '*');
      } catch (err) {}
    };

    if (el) {
      el.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (el) {
        el.removeEventListener('load', handleLoad);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalTitle = data?.footer?.trialModalTitle || data?.trialModalTitle || "Book Your Free Trial Class";
  const modalDesc = data?.footer?.trialModalDesc || data?.trialModalDesc || "Book in a free trial class yourself, you can book up to 30 minutes before a class. We'll see you there!";

  return (
    <div className="fixed inset-0 z-[250] overflow-hidden">
      
      {/* Dimmed Backdrop Overlay (Click to close) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-[250]"
      ></div>

      {/* DESKTOP RIGHT-HAND DRAWER / MOBILE FULL-SCREEN TAKEOVER */}
      <div className="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 z-[260] w-full md:max-w-2xl lg:max-w-3xl bg-surface-container-low border-l-0 md:border-l-2 md:border-outline-variant flex flex-col h-full max-h-screen shadow-2xl transition-transform duration-300 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="bg-surface-container-high border-b border-outline-variant px-4 py-4 sm:px-6 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse shrink-0"></span>
              <h3 className="font-headline-md text-xl sm:text-2xl uppercase text-white tracking-wide">
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onChange && onChange('footer', 'trialModalTitle', sanitizeEditText(e.target.innerText))}
                >{modalTitle}</span>
              </h3>
            </div>

            {/* Sub-header Description */}
            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange && onChange('footer', 'trialModalDesc', sanitizeEditText(e.target.innerText))}
              className="text-on-surface-variant text-xs sm:text-sm font-body-md pl-5 leading-snug"
            >
              {modalDesc}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-background border border-outline-variant hover:border-primary-container text-white hover:text-primary-container flex items-center justify-center transition-colors font-mono font-bold text-xl focus:outline-none shrink-0"
            aria-label="Close Drawer"
            title="Close Drawer"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body: Embedded Widget + Athletic Loading Skeleton */}
        <div id="lcrm-booking-container" className="flex-1 flex-grow w-full relative min-h-0 bg-background overflow-y-auto">
          
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

          {/* Embedded Lutheran CRM Booking Iframe */}
          <iframe
            id="lcrm-booking-75f9c97b"
            src="https://lutheran.netlify.app/portal/book/book_75f9c97b-675b-47aa-80b2-ab5e2ce061d9_365812d04d?embed=true"
            width="100%"
            height="700"
            scrolling="auto"
            allowTransparency="true"
            style={{
              border: 'none',
              width: '100%',
              maxWidth: '100%',
              display: 'block',
              background: 'transparent',
              backgroundColor: 'transparent',
              colorScheme: 'normal'
            }}
            loading="lazy"
            allow="camera; clipboard-write"
            title="Free Trial Class booking"
            onLoad={(e) => {
              setIframeLoading(false);
              try {
                e.target.contentWindow?.postMessage({ type: 'LCRM_REQUEST_BOOKING_RESIZE' }, '*');
              } catch (err) {}
            }}
          ></iframe>

        </div>

      </div>

    </div>
  );
}
