import React, { useState } from 'react';
import { NAV_LINKS, DEFAULT_BOOKING_URL } from '../constants/navigation';
import { getAdminHref } from '../utils/urlHelper';

export default function Navbar({ data, onImageUpload, onOpenBookingModal, isAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoUrl = data?.logoImage || data?.footer?.logoImage || '';
  const bookingUrl = data?.trialBookingUrl || data?.footer?.trialBookingUrl || DEFAULT_BOOKING_URL;
  const bookingMode = data?.trialBookingMode || data?.footer?.trialBookingMode || 'modal';

  const footerData = data?.footer || data || {};
  const instagramUrl = footerData.instagram || "https://instagram.com";
  const facebookUrl = footerData.facebook || "https://facebook.com";
  const youtubeUrl = footerData.youtube || "https://youtube.com";
  const tiktokUrl = footerData.tiktok || "https://tiktok.com";

  const hideInstagram = footerData.hideInstagram;
  const hideFacebook = footerData.hideFacebook;
  const hideYoutube = footerData.hideYoutube;
  const hideTikTok = footerData.hideTikTok;

  const handleFreePassClick = (e) => {
    if (bookingMode === 'modal') {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (onOpenBookingModal) {
        onOpenBookingModal();
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-outline-variant/60 shadow-2xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-grid-margin h-20 flex items-center justify-between" aria-label="Main Navigation">
        
        {/* Brand Logo Image or Typography */}
        <div className="flex items-center gap-3 relative img-container">
          <a href={getAdminHref('/', isAdmin)} className="flex items-center gap-2" aria-label="Redemption Muay Thai Home">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Redemption Muay Thai Brand Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            ) : (
              <span className="font-headline-lg text-2xl sm:text-3xl italic tracking-widest uppercase text-white font-bold">
                REDEMPTION <span className="text-primary-container not-italic">MUAY THAI</span>
              </span>
            )}
          </a>

          {isAdmin && (
            <label className="btn-clip bg-primary-container text-black font-button-text px-2.5 py-1 uppercase cursor-pointer hover:bg-white transition-colors text-[11px] font-bold inline-flex items-center gap-1 shadow-md">
              📷 Logo
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => onImageUpload && onImageUpload(e, 'footer', 'logoImage')} 
              />
            </label>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-7 font-button-text uppercase tracking-widest text-sm font-bold">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={getAdminHref(link.href, isAdmin)} 
              className="text-on-surface hover:text-primary-container transition-colors py-2 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-container group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          
          <a 
            href={bookingUrl}
            target={bookingMode === 'link' ? '_blank' : '_self'}
            rel={bookingMode === 'link' ? 'noopener noreferrer' : undefined}
            onClick={handleFreePassClick}
            className="btn-clip bg-primary-container text-black px-6 py-2.5 uppercase tracking-widest hover:bg-white transition-colors text-xs font-bold shadow-lg cursor-pointer"
          >
            FREE TRIAL PASS
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-primary-container focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </nav>

      {/* Mobile Dropdown Menu (With Vertical Top-Right Social Links & Full-Width CTA) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-low border-b border-outline-variant px-6 py-6 font-button-text uppercase tracking-widest text-base font-bold shadow-2xl relative">
          <div className="flex justify-between items-start gap-4">
            
            {/* Left Column: Navigation Links */}
            <div className="flex-grow space-y-2">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label}
                  href={getAdminHref(link.href, isAdmin)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-on-surface hover:text-primary-container transition-colors py-2 border-b border-outline-variant/40"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Top Column: Vertical Running Social Media Links (Mobile Only) */}
            <div className="flex flex-col gap-3 shrink-0 pt-1 px-4">
              {!hideInstagram && (
                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded-lg flex items-center justify-center text-primary-container active:scale-95 transition-all shadow-md"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}

              {!hideFacebook && (
                <a 
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded-lg flex items-center justify-center text-primary-container active:scale-95 transition-all shadow-md"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              )}

              {!hideYoutube && (
                <a 
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded-lg flex items-center justify-center text-primary-container active:scale-95 transition-all shadow-md"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              )}

              {!hideTikTok && (
                <a 
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded-lg flex items-center justify-center text-primary-container active:scale-95 transition-all shadow-md"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.57-1.26 2.57.01.95.53 1.87 1.34 2.38.79.52 1.83.62 2.71.28.98-.36 1.72-1.22 1.92-2.24.11-.63.09-1.27.09-1.91.01-4.88-.01-9.76.01-14.64z"/>
                  </svg>
                </a>
              )}
            </div>

          </div>

          {/* Rectangular Full-Width FREE PASS CTA */}
          <a 
            href={bookingUrl}
            target={bookingMode === 'link' ? '_blank' : '_self'}
            rel={bookingMode === 'link' ? 'noopener noreferrer' : undefined}
            onClick={handleFreePassClick}
            className="w-full block text-center bg-primary-container text-black py-3.5 uppercase tracking-widest font-bold text-sm shadow-xl mt-6 hover:bg-white transition-colors cursor-pointer"
          >
            FREE TRIAL PASS
          </a>
        </div>
      )}

    </header>
  );
}
