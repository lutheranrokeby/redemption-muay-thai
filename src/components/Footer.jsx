import React from 'react';

export default function Footer({ data, onChange, onImageUpload, onOpenBookingModal, isAdmin }) {
  if (!data) return null;

  const defaultBookingUrl = 'https://link.msgsndr.com/widget/booking/SA4A67tEfgN64XYvmrWC';
  const bookingUrl = data.trialBookingUrl || defaultBookingUrl;
  const bookingMode = data.trialBookingMode || 'modal'; // 'modal' or 'link'
  const logoUrl = data.logoImage || data.logo || '';

  const getHref = (urlPath) => {
    if (!isAdmin) return urlPath;
    if (urlPath === '/') return '/admin';
    return urlPath.startsWith('/admin') ? urlPath : `/admin${urlPath}`;
  };

  const handleBookingClick = (e) => {
    if (bookingMode === 'modal') {
      e.preventDefault();
      if (onOpenBookingModal) {
        onOpenBookingModal();
      }
    }
  };

  return (
    <footer id="contact" className="w-full bg-surface-container-lowest text-on-surface border-t-4 border-primary-container relative z-10">
      
      {/* 1. TOP BANNER: FREE TRIAL CLASS BOOKING BANNER */}
      <div className="bg-surface-container-high border-b border-outline-variant py-12 px-grid-margin">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Callout Text & Admin Settings Selector */}
          <div className="lg:col-span-7 space-y-2">
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange && onChange('footer', 'trialBadge', e.target.innerText)}
              className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold block"
            >
              {data.trialBadge || "FREE TRIAL CLASS"}
            </span>
            
            <h3 className="font-headline-md text-3xl sm:text-4xl text-white uppercase tracking-tight">
              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange && onChange('footer', 'trialTitle', e.target.innerText)}
              >{data.trialTitle || "BOOK YOUR FREE TRIAL CLASS"}</span>
            </h3>

            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange && onChange('footer', 'trialDesc', e.target.innerText)}
              className="text-on-surface-variant text-sm font-body-md leading-relaxed max-w-2xl"
            >
              {data.trialDesc || "Experience authentic Muay Thai striking, strength conditioning, and our supportive ego-free community. Pick any class on our schedule and book your trial session free of charge."}
            </p>

            {/* Admin Selector & Link Settings */}
            {isAdmin && (
              <div className="pt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-label-mono bg-background/90 border border-primary-container/60 p-2.5 rounded-lg flex-wrap">
                  <span className="text-primary-container font-bold">⚙️ Booking Action Mode:</span>
                  
                  <button
                    type="button"
                    onClick={() => onChange && onChange('footer', 'trialBookingMode', 'modal')}
                    className={`px-3 py-1 rounded font-bold transition-all ${
                      bookingMode === 'modal'
                        ? 'bg-primary-container text-black shadow-md'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-white'
                    }`}
                  >
                    🪟 Open Embedded Modal
                  </button>

                  <button
                    type="button"
                    onClick={() => onChange && onChange('footer', 'trialBookingMode', 'link')}
                    className={`px-3 py-1 rounded font-bold transition-all ${
                      bookingMode === 'link'
                        ? 'bg-primary-container text-black shadow-md'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-white'
                    }`}
                  >
                    🔗 Open External Link
                  </button>
                </div>

                {bookingMode === 'link' && (
                  <div className="flex items-center gap-2 text-xs font-label-mono bg-background/80 border border-outline-variant p-2 rounded">
                    <span className="text-primary-container font-bold">External URL:</span>
                    <span 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onChange && onChange('footer', 'trialBookingUrl', e.target.innerText.trim())}
                      className="text-white bg-surface-container-high px-2 py-0.5 rounded font-mono break-all focus:outline-none focus:border-primary-container border border-transparent"
                    >
                      {bookingUrl}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right External/Modal Booking Action Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
            <a 
              href={bookingUrl}
              target={bookingMode === 'link' ? '_blank' : '_self'}
              rel="noreferrer"
              onClick={handleBookingClick}
              className="btn-clip bg-primary-container text-black font-button-text px-8 py-4 uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-0.5 text-center font-bold text-base shadow-xl inline-block whitespace-nowrap cursor-pointer"
            >
              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange && onChange('footer', 'trialCtaText', e.target.innerText)}
              >{data.trialCtaText || "BOOK FREE TRIAL CLASS →"}</span>
            </a>
            <span className="text-[11px] font-label-mono text-on-surface-variant mt-2">
              No credit card required • Instant confirmation
            </span>
          </div>

        </div>
      </div>

      {/* 2. MAIN MULTI-COLUMN NAVIGATION FOOTER */}
      <div className="max-w-7xl mx-auto px-grid-margin py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        {/* Column 1: Brand Logo & Mission (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Logo Image or Brand Typography */}
          <div className="relative space-y-2">
            <a href={getHref('/')} className="inline-block">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Redemption Muay Thai Logo" 
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              ) : (
                <span className="font-headline-lg text-3xl italic tracking-widest uppercase text-primary inline-block">
                  REDEMPTION <span className="text-white text-xl not-italic">MUAY THAI</span>
                </span>
              )}
            </a>

            {isAdmin && (
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <label className="btn-clip bg-primary-container text-black font-button-text px-3 py-1.5 uppercase cursor-pointer hover:bg-white transition-colors text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                  📷 {logoUrl ? "Change Logo Image" : "Upload Brand Logo Image"}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => onImageUpload && onImageUpload(e, 'footer', 'logoImage')} 
                  />
                </label>

                {logoUrl && (
                  <button 
                    type="button"
                    onClick={() => onChange && onChange('footer', 'logoImage', '')}
                    className="bg-danger-red text-white text-[11px] font-label-mono px-2.5 py-1.5 rounded hover:bg-red-700 font-bold shadow"
                  >
                    🗑️ Use Typography Text
                  </button>
                )}
              </div>
            )}
          </div>
          
          <p 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => onChange && onChange('footer', 'motto', e.target.innerText)}
            className="text-on-surface-variant font-body-md text-sm leading-relaxed max-w-md"
          >
            {data.motto || "Premier Muay Thai training on the Sunshine Coast. Dedicated to authentic striking technique, strength conditioning, and a supportive ego-free community since 2020."}
          </p>

          {/* Social Icons with Official Brand SVG Logos */}
          <div className="flex items-center gap-3 pt-2">
            
            {/* Instagram */}
            <a 
              href={data.instagram || "https://instagram.com"} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded-lg flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-black transition-all duration-300 shadow-md group"
              title="Follow us on Instagram"
            >
              <svg className="w-5 h-5 fill-current transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href={data.facebook || "https://facebook.com"} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded-lg flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-black transition-all duration-300 shadow-md group"
              title="Follow us on Facebook"
            >
              <svg className="w-5 h-5 fill-current transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href={data.youtube || "https://youtube.com"} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded-lg flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-black transition-all duration-300 shadow-md group"
              title="Watch on YouTube"
            >
              <svg className="w-5 h-5 fill-current transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>

          </div>
        </div>

        {/* Column 2: Quick Links (3 Cols - Inline Editable Heading) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold border-b border-outline-variant pb-2">
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange && onChange('footer', 'navTitle', e.target.innerText)}
            >{data.navTitle || "NAVIGATION"}</span>
          </h4>
          <ul className="space-y-2 text-sm font-body-md text-on-surface-variant">
            <li><a href={getHref('/')} className="hover:text-primary transition-colors">Home</a></li>
            <li><a href={getHref('/coaches')} className="hover:text-primary transition-colors">Meet The Coaches</a></li>
            <li><a href={getHref('/classes')} className="hover:text-primary transition-colors">All Classes</a></li>
            <li><a href={getHref('/timetable')} className="hover:text-primary transition-colors">Weekly Timetable</a></li>
            <li><a href={getHref('/contact')} className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Gym Location & Hours (4 Cols - Inline Editable Heading) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold border-b border-outline-variant pb-2">
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange && onChange('footer', 'locationTitle', e.target.innerText)}
            >{data.locationTitle || "GYM LOCATION & HOURS"}</span>
          </h4>
          
          <div className="space-y-3 text-sm font-body-md">
            <div>
              <span className="block text-xs font-label-mono text-on-surface-variant">LOCATION</span>
              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange && onChange('footer', 'location', e.target.innerText)}
                className="text-white"
              >{data.location || "Warana, Sunshine Coast QLD 4575"}</p>
            </div>

            <div>
              <span className="block text-xs font-label-mono text-on-surface-variant">CONTACT</span>
              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange && onChange('footer', 'phone', e.target.innerText)}
                className="text-white"
              >{data.phone || "0400 000 000"}</p>
              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange && onChange('footer', 'email', e.target.innerText)}
                className="text-white"
              >{data.email || "info@redemptionmuaythai.com"}</p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM COPYRIGHT & LEGAL BAR */}
      <div className="bg-background border-t border-outline-variant py-6 px-grid-margin">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-label-mono text-on-surface-variant">
          <p>© 2026 REDEMPTION MUAY THAI. ALL RIGHTS RESERVED. SUNSHINE COAST, QLD.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-primary transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-primary transition-colors">GYM RULES</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
