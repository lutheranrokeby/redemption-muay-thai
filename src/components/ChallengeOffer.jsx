import React from 'react';
import { getAdminHref, sanitizeEditText } from '../utils/urlHelper';

const DEFAULT_OFFER_DATA = {
  enabled: true,
  badge: '🔥 6-WEEK FIGHT READY CHALLENGE',
  spotsText: 'STRICTLY 12 SPOTS AVAILABLE',
  title: 'CHALLENGE YOURSELF IN 6 WEEKS',
  subtitle: 'We’re looking for 12 motivated men and women to participate in our upcoming 6 Week "Redemption" Muay Thai Challenge—and if you complete it, your entire $500 deposit goes back into your pocket.',
  totalValue: '$1498',
  dealHighlight: 'Complete 3 simple requirements and get 100% of your $500 deposit refunded!',
  inclusions: [
    {
      icon: 'sports_mma',
      title: 'Unlimited Muay Thai',
      desc: 'All adult classes, beginner to fighter'
    },
    {
      icon: 'spa',
      title: 'Recovery Membership Included',
      desc: 'Gain access to Redemptions recovery kit - Infrared sauna, recovery sleeves and massage gun'
    },
    {
      icon: 'sports_kabaddi',
      title: '1-on-1 PT Session with Billy',
      desc: 'Advance your game with a 30 minute sessions with Billy every week'
    },
    {
      icon: 'groups',
      title: 'Private Fight Camp Community & Sparring Group Access',
      desc: 'Supportive team environment'
    }
  ],
  imageTag: 'Test your skills',
  imageTitle: 'Exhibition Fight Night Ticket',
  imageDesc: 'Test your skills in a safe, 100% padded, beginner-friendly exhibition match',
  ctaText: 'Explore The 6-Week Challenge →',
  ctaUrl: '/offers/6-week-challenge',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVeOhOmaG2DwFJ-Agk0ZON_NeVfXaq7GIW5GxLGiWCBjiOoEc8TpL9i84x_6rI78VB6VHGjJGtmSQR4IAhBct8r5swdZ1NQYqXzjovee_GbcG-iaaG93ov7DqAWQfPbuqnPXwxcMBafCcAyCAPkeePjwswvESwBf5orWLDW6sVk4Ncl2_QyGlyWfrS1KChWtkMD1MDyeftLa3KFHWP2_GyVAc4Kp-cWE3fWb8Aiuy0gy62oSLwQIPaSw'
};

export default function ChallengeOffer({ data, onChange, onImageUpload, isAdmin }) {
  const offer = {
    ...DEFAULT_OFFER_DATA,
    ...(data || {})
  };

  const isEnabled = offer.enabled !== false;

  // In Public Mode: completely hide if deactivated by admin
  if (!isAdmin && !isEnabled) {
    return null;
  }

  const handleFieldEdit = (field, val) => {
    if (onChange) {
      onChange('challengeOffer', field, sanitizeEditText(val));
    }
  };

  const handleInclusionEdit = (index, subField, val) => {
    if (onChange) {
      const updatedInclusions = [...(offer.inclusions || DEFAULT_OFFER_DATA.inclusions)];
      if (updatedInclusions[index]) {
        updatedInclusions[index] = {
          ...updatedInclusions[index],
          [subField]: sanitizeEditText(val)
        };
        onChange('challengeOffer', 'inclusions', updatedInclusions);
      }
    }
  };

  const handleToggleEnabled = () => {
    if (onChange) {
      onChange('challengeOffer', 'enabled', !isEnabled);
    }
  };

  const ctaHref = getAdminHref(offer.ctaUrl || '/offers/6-week-challenge', isAdmin);

  return (
    <section 
      id="challenge-offer" 
      className={`relative py-16 md:py-24 px-4 sm:px-grid-margin transition-all duration-300 border-y ${
        !isEnabled && isAdmin 
          ? 'bg-[#18150f] border-dashed border-yellow-500/70 opacity-80' 
          : 'bg-gradient-to-b from-[#0b0c0e] via-[#131417] to-[#0b0c0e] border-outline-variant/60'
      } text-white overflow-hidden z-20`}
    >
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)' }}
      ></div>

      <div className="container max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Admin Controls Toolbar */}
        {isAdmin && (
          <div className="bg-surface-container-high/95 border-2 border-primary-container rounded-xl p-3.5 shadow-2xl space-y-2.5 font-label-mono text-xs backdrop-blur-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-primary-container font-bold text-sm">⚙️ 6-Week Challenge Offer Controls:</span>
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                  isEnabled 
                    ? 'bg-primary-container/20 text-primary-container border border-primary-container/60' 
                    : 'bg-danger-red/20 text-danger-red border border-danger-red/60'
                }`}>
                  {isEnabled ? '🟢 Live on Homepage' : '🔴 Inactive / Hidden'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleEnabled}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    isEnabled 
                      ? 'bg-danger-red text-white hover:bg-red-700 shadow-md' 
                      : 'bg-primary-container text-black hover:bg-white shadow-md'
                  }`}
                  title={isEnabled ? "Deactivate this offer section from the live homepage" : "Activate this offer section to show on live homepage"}
                >
                  {isEnabled ? '🙈 Deactivate Offer' : '👁️ Activate Offer'}
                </button>

                <label className="bg-surface-container text-white px-3 py-1.5 rounded-lg border border-outline-variant hover:border-primary-container cursor-pointer font-bold inline-flex items-center gap-1.5">
                  📷 Change Photo
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => onImageUpload && onImageUpload(e, 'challengeOffer', 'image')} 
                  />
                </label>
              </div>
            </div>

            {!isEnabled && (
              <div className="bg-yellow-950/40 border border-yellow-500/60 text-yellow-300 p-2.5 rounded text-xs flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span>
                  <strong>ADMIN PREVIEW:</strong> This 6-Week Challenge offer section is currently <strong>DEACTIVATED</strong>. Public visitors cannot see it. Click <strong>&quot;Activate Offer&quot;</strong> above to publish it to your live homepage.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Offer Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Challenge Overview & Inclusions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badges Row */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldEdit('badge', e.target.innerText)}
                className="bg-primary-container/15 text-primary-container border border-primary-container/60 font-label-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
              >
                {offer.badge}
              </span>

              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldEdit('spotsText', e.target.innerText)}
                className="bg-surface-container-high border border-outline-variant text-on-surface-variant font-label-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-danger-red animate-pulse"></span>
                {offer.spotsText}
              </span>
            </div>

            {/* Headline */}
            <h2 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleFieldEdit('title', e.target.innerText)}
              className="font-display-xl text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight"
            >
              {offer.title}
            </h2>

            {/* Subtitle / Narrative */}
            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleFieldEdit('subtitle', e.target.innerText)}
              className="text-on-surface-variant font-body-lg text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {offer.subtitle}
            </p>

            {/* 4 Inclusions Quick-Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(offer.inclusions || DEFAULT_OFFER_DATA.inclusions).map((inc, iIdx) => (
                <div 
                  key={iIdx} 
                  className="bg-surface-container-low/90 border border-outline-variant/60 hover:border-primary-container/60 transition-all rounded-xl p-3.5 flex items-start gap-3 shadow-md"
                >
                  <span className="material-symbols-outlined text-primary-container text-2xl shrink-0 mt-0.5">
                    {inc.icon || 'check_circle'}
                  </span>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h4 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleInclusionEdit(iIdx, 'title', e.target.innerText)}
                      className="font-headline-sm font-bold text-white text-sm sm:text-base leading-snug uppercase tracking-wide"
                    >
                      {inc.title}
                    </h4>
                    <p 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleInclusionEdit(iIdx, 'desc', e.target.innerText)}
                      className="text-on-surface-variant text-xs leading-relaxed"
                    >
                      {inc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Value & Guarantee Box */}
            <div className="bg-surface-container-high/90 border-2 border-primary-container/70 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(0,229,255,0.12)]">
              <div className="space-y-0.5">
                <span className="font-label-mono text-[11px] uppercase tracking-widest text-primary-container font-bold block">
                  TOTAL PACKAGE VALUE
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleFieldEdit('totalValue', e.target.innerText)}
                    className="font-display-xl text-3xl sm:text-4xl text-white font-extrabold tracking-tight"
                  >
                    {offer.totalValue || '$1498'}
                  </span>
                  <span className="text-on-surface-variant font-label-mono text-xs line-through opacity-70">
                    Value Stack
                  </span>
                </div>
              </div>

              <div className="sm:border-l sm:border-outline-variant/80 sm:pl-5 space-y-0.5 max-w-sm">
                <span className="font-label-mono text-[11px] font-bold uppercase tracking-wider text-primary-container block">
                  ✨ 100% REFUNDABLE DEPOSIT
                </span>
                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleFieldEdit('dealHighlight', e.target.innerText)}
                  className="text-on-surface-variant text-xs leading-relaxed"
                >
                  {offer.dealHighlight || 'Complete 3 simple requirements and get 100% of your $500 deposit refunded!'}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <div className="flex items-center">
                <a 
                  href={ctaHref}
                  className="btn-clip bg-primary-container text-black font-button-text font-black px-8 py-4 uppercase tracking-wider text-sm sm:text-base hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(0,229,255,0.35)] inline-flex items-center gap-2 group cursor-pointer"
                >
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleFieldEdit('ctaText', e.target.innerText)}
                  >
                    {offer.ctaText}
                  </span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Feature Card with Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-primary-container/40 shadow-2xl group bg-surface-container-low">
              
              {/* Challenge Photo */}
              <img 
                src={offer.image || DEFAULT_OFFER_DATA.image} 
                alt="Redemption 6-Week Challenge Training" 
                className="w-full h-80 sm:h-96 lg:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none"></div>

              {/* Top Right Floating Badge */}
              <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md border border-primary-container/80 px-3.5 py-1.5 rounded-full text-[11px] font-label-mono font-bold text-primary-container uppercase tracking-widest shadow-xl">
                INTAKE OPEN
              </div>

              {/* Admin Photo Upload Button Trigger */}
              {isAdmin && (
                <label className="absolute top-4 left-4 bg-primary-container text-black font-label-mono text-xs px-3 py-1.5 rounded font-bold uppercase tracking-wider cursor-pointer hover:bg-white transition-all shadow-lg flex items-center gap-1 z-30">
                  📷 Change Image
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => onImageUpload && onImageUpload(e, 'challengeOffer', 'image')} 
                  />
                </label>
              )}

              {/* Bottom Card Callout */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 text-left bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-lg">verified</span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleFieldEdit('imageTag', e.target.innerText)}
                    className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold"
                  >
                    {offer.imageTag || 'Test your skills'}
                  </span>
                </div>
                <h3 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleFieldEdit('imageTitle', e.target.innerText)}
                  className="text-white font-headline-sm text-base sm:text-lg uppercase tracking-wide leading-snug"
                >
                  {offer.imageTitle || 'Exhibition Fight Night Ticket'}
                </h3>
                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleFieldEdit('imageDesc', e.target.innerText)}
                  className="text-on-surface-variant text-xs font-body-md leading-relaxed"
                >
                  {offer.imageDesc || 'Test your skills in a safe, 100% padded, beginner-friendly exhibition match'}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
