import React, { useState } from 'react';

export default function Navbar({ isAdmin, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  const getRoute = (basePath) => {
    if (isAdmin) {
      return basePath === '/' ? '/admin' : `/admin${basePath}`;
    }
    return basePath;
  };

  const isCurrent = (basePath) => {
    const target = getRoute(basePath);
    if (basePath === '/') {
      return currentPath === '/' || currentPath === '/admin';
    }
    return currentPath === target;
  };

  return (
    <nav className="bg-background/90 dark:bg-background/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant dark:border-outline-variant shadow-[4px_4px_0px_0px_rgba(0,229,255,0.3)]">
      <div className="flex justify-between items-center px-grid-margin py-4 max-w-full mx-auto">
        
        {/* Brand Logo */}
        <a className="font-headline-lg text-2xl sm:text-3xl text-primary italic tracking-widest uppercase flex items-center gap-2" href={getRoute('/')}>
          REDEMPTION {isAdmin ? '[ADMIN]' : ''}
        </a>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 items-center">
          <a className={`font-button-text text-button-text uppercase tracking-widest transition-colors ${isCurrent('/') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface hover:text-primary'}`} href={getRoute('/')}>Home</a>
          <a className={`font-button-text text-button-text uppercase tracking-widest transition-colors ${isCurrent('/coaches') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface hover:text-primary'}`} href={getRoute('/coaches')}>Coaches</a>
          <a className={`font-button-text text-button-text uppercase tracking-widest transition-colors ${isCurrent('/classes') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface hover:text-primary'}`} href={getRoute('/classes')}>Classes</a>
          <a className={`font-button-text text-button-text uppercase tracking-widest transition-colors ${isCurrent('/timetable') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface hover:text-primary'}`} href={getRoute('/timetable')}>Schedule</a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href={getRoute('/contact')} className="btn-clip bg-primary-container text-black font-button-text px-6 py-3 uppercase tracking-widest hover:bg-white transition-colors">
            CONTACT
          </a>
          {isAdmin && (
            <button 
              onClick={onLogout}
              className="border border-outline-variant text-on-surface-variant font-button-text px-3 py-2 text-xs uppercase hover:text-white transition-colors rounded"
            >
              Exit Admin
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 text-primary-container focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 border-b border-primary-container/40 backdrop-blur-xl px-grid-margin py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3 font-headline-md text-xl uppercase tracking-wider">
            <a 
              href={getRoute('/')} 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-outline-variant/40 ${isCurrent('/') ? 'text-primary-container font-bold pl-2 border-l-4 border-l-primary-container' : 'text-on-surface'}`}
            >
              Home
            </a>
            <a 
              href={getRoute('/coaches')} 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-outline-variant/40 ${isCurrent('/coaches') ? 'text-primary-container font-bold pl-2 border-l-4 border-l-primary-container' : 'text-on-surface'}`}
            >
              Coaches
            </a>
            <a 
              href={getRoute('/classes')} 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-outline-variant/40 ${isCurrent('/classes') ? 'text-primary-container font-bold pl-2 border-l-4 border-l-primary-container' : 'text-on-surface'}`}
            >
              Classes
            </a>
            <a 
              href={getRoute('/timetable')} 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-outline-variant/40 ${isCurrent('/timetable') ? 'text-primary-container font-bold pl-2 border-l-4 border-l-primary-container' : 'text-on-surface'}`}
            >
              Schedule
            </a>
            <a 
              href={getRoute('/contact')} 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-outline-variant/40 ${isCurrent('/contact') ? 'text-primary-container font-bold pl-2 border-l-4 border-l-primary-container' : 'text-on-surface'}`}
            >
              Contact Us
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a 
              href={getRoute('/contact')} 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-clip bg-primary-container text-black font-button-text px-6 py-3 uppercase tracking-widest text-center font-bold"
            >
              CONTACT GYM
            </a>
            
            {isAdmin && (
              <button 
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                className="w-full border border-outline-variant text-on-surface-variant font-button-text py-2.5 text-xs uppercase text-center rounded"
              >
                Exit Admin Mode
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
