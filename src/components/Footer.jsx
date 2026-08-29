import React, { useState } from 'react';

export default function Footer({ data, onChange, isAdmin }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!data) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer id="contact" className="w-full bg-surface-container-lowest text-on-surface border-t-4 border-primary-container relative z-10">
      
      {/* 1. IRONEDGE-STYLE TOP NEWSLETTER SUBSCRIBER BANNER */}
      <div className="bg-surface-container-high border-b border-outline-variant py-12 px-grid-margin">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold">STAY CONNECTED</span>
            <h3 className="font-headline-md text-headline-md text-white uppercase tracking-tight">
              JOIN THE REDEMPTION FAMILY
            </h3>
            <p className="text-on-surface-variant text-sm font-body-md">
              Subscribe to get exclusive fight event updates, schedule announcements, and training insights directly to your inbox.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-primary-container/20 border border-primary-container text-primary p-4 rounded text-center text-sm font-label-mono font-bold">
                ✓ THANK YOU FOR SUBSCRIBING TO REDEMPTION MUAY THAI!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-background border border-outline-variant text-white px-4 py-3 rounded font-label-mono text-sm focus:border-primary-container focus:outline-none flex-grow"
                />
                <button type="submit" className="btn-clip bg-primary-container text-black font-button-text px-8 py-3 uppercase tracking-widest hover:bg-white transition-colors font-bold whitespace-nowrap">
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN MULTI-COLUMN NAVIGATION FOOTER */}
      <div className="max-w-7xl mx-auto px-grid-margin py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        {/* Column 1: Brand & Mission (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <a href="/" className="font-headline-lg text-3xl italic tracking-widest uppercase text-primary inline-block">
            REDEMPTION <span className="text-white text-xl not-italic">MUAY THAI</span>
          </a>
          
          <p 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => onChange('footer', 'motto', e.target.innerText)}
            className="text-on-surface-variant font-body-md text-sm leading-relaxed"
          >
            {data.motto || "Premier Muay Thai training on the Sunshine Coast. Dedicated to authentic striking technique, strength conditioning, and a supportive ego-free community since 2020."}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href={data.instagram || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-black transition-colors"
              title="Instagram"
            >
              <span className="font-label-mono text-xs font-bold">IG</span>
            </a>
            <a 
              href={data.facebook || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-black transition-colors"
              title="Facebook"
            >
              <span className="font-label-mono text-xs font-bold">FB</span>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-surface-container-high border border-outline-variant rounded flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-black transition-colors"
              title="YouTube"
            >
              <span className="font-label-mono text-xs font-bold">YT</span>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold border-b border-outline-variant pb-2">
            NAVIGATION
          </h4>
          <ul className="space-y-2 text-sm font-body-md text-on-surface-variant">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="/coaches" className="hover:text-primary transition-colors">Meet The Coaches</a></li>
            <li><a href="/classes" className="hover:text-primary transition-colors">All Classes</a></li>
            <li><a href="/timetable" className="hover:text-primary transition-colors">Weekly Timetable</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Programs (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold border-b border-outline-variant pb-2">
            PROGRAMS
          </h4>
          <ul className="space-y-2 text-sm font-body-md text-on-surface-variant">
            <li><a href="/classes" className="hover:text-primary transition-colors">Adult Muay Thai Program</a></li>
            <li><a href="/classes" className="hover:text-primary transition-colors">Youth Empowerment (Teens)</a></li>
            <li><a href="/classes" className="hover:text-primary transition-colors">Junior Class (Ages 5-11)</a></li>
            <li><a href="/timetable" className="hover:text-primary transition-colors">Sparring & Clinch Work</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors">1-on-1 Private Coaching</a></li>
          </ul>
        </div>

        {/* Column 4: Gym Info & Hours (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold border-b border-outline-variant pb-2">
            GYM LOCATION
          </h4>
          
          <div className="space-y-3 text-sm font-body-md">
            <div>
              <span className="block text-xs font-label-mono text-on-surface-variant">LOCATION</span>
              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange('footer', 'location', e.target.innerText)}
                className="text-white"
              >{data.location || "Warana, Sunshine Coast QLD 4575"}</p>
            </div>

            <div>
              <span className="block text-xs font-label-mono text-on-surface-variant">CONTACT</span>
              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange('footer', 'phone', e.target.innerText)}
                className="text-white"
              >{data.phone || "0400 000 000"}</p>
              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange('footer', 'email', e.target.innerText)}
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
