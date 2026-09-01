import React, { useState } from 'react';

export default function Navbar({ data, onImageUpload, onOpenBookingModal, isAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Coaches', href: '/coaches' },
    { label: 'Classes', href: '/classes' },
    { label: 'Timetable', href: '/timetable' },
    { label: 'Contact', href: '/contact' },
  ];

  const getHref = (urlPath) => {
    if (!isAdmin) return urlPath;
    if (urlPath === '/') return '/admin';
    return urlPath.startsWith('/admin') ? urlPath : `/admin${urlPath}`;
  };

  const logoUrl = data?.logoImage || data?.footer?.logoImage || '';
  const defaultBookingUrl = 'https://link.msgsndr.com/widget/booking/SA4A67tEfgN64XYvmrWC';
  const bookingUrl = data?.trialBookingUrl || data?.footer?.trialBookingUrl || defaultBookingUrl;
  const bookingMode = data?.trialBookingMode || data?.footer?.trialBookingMode || 'modal';

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-outline-variant/60 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-grid-margin h-20 flex items-center justify-between">
        
        {/* Brand Logo Image or Typography */}
        <div className="flex items-center gap-3 relative img-container">
          <a href={getHref('/')} className="flex items-center gap-2">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Redemption Muay Thai Logo" 
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
        <div className="hidden md:flex items-center space-x-8 font-button-text uppercase tracking-widest text-sm font-bold">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={getHref(link.href)} 
              className="text-on-surface hover:text-primary-container transition-colors py-2 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-container group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          
          <a 
            href={bookingUrl}
            target={bookingMode === 'link' ? '_blank' : '_self'}
            rel="noreferrer"
            onClick={handleFreePassClick}
            className="btn-clip bg-primary-container text-black px-6 py-2.5 uppercase tracking-widest hover:bg-white transition-colors text-xs font-bold shadow-lg cursor-pointer"
          >
            FREE PASS
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-primary-container focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-low border-b border-outline-variant px-6 py-6 space-y-4 font-button-text uppercase tracking-widest text-base font-bold shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={getHref(link.href)}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface hover:text-primary-container transition-colors py-2 border-b border-outline-variant/40"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={bookingUrl}
            target={bookingMode === 'link' ? '_blank' : '_self'}
            rel="noreferrer"
            onClick={handleFreePassClick}
            className="block text-center btn-clip bg-primary-container text-black py-3 uppercase tracking-widest font-bold text-sm shadow-xl mt-4 cursor-pointer"
          >
            FREE PASS
          </a>
        </div>
      )}

    </nav>
  );
}
