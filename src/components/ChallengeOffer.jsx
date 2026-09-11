import React from 'react';
import { getAdminHref, sanitizeEditText } from '../utils/urlHelper';

const DEFAULT_OFFER_TEMPLATE = {
  id: '6-week-challenge',
  name: '6-Week Challenge',
  enabled: true,
  badge: '6-WEEK FIGHT READY CHALLENGE',
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

const ATHLETIC_ICONS = [
  'sports_mma',
  'spa',
  'sports_kabaddi',
  'groups',
  'fitness_center',
  'verified',
  'check_circle',
  'timer'
];

export default function ChallengeOffer({ data, onChange, onImageUpload, isAdmin }) {
  // Extract offers list with backwards compatibility for legacy flat objects
  const rawOffers = Array.isArray(data?.offers) && data.offers.length > 0 
    ? data.offers 
    : [
        {
          ...DEFAULT_OFFER_TEMPLATE,
          ...(data || {})
        }
      ];

  // Clean and ensure every offer has required default fields and an ID
  const offers = rawOffers.map((item, idx) => ({
    ...DEFAULT_OFFER_TEMPLATE,
    ...item,
    id: item.id || `offer_${idx + 1}`,
    name: item.name || item.title || `Offer ${idx + 1}`
  }));

  const activeOfferId = data?.activeOfferId || offers[0].id;
  const activeOffer = offers.find(o => o.id === activeOfferId) || offers[0];
  const isEnabled = activeOffer.enabled !== false;

  // In Public Mode: completely hide if deactivated by admin
  if (!isAdmin && !isEnabled) {
    return null;
  }

  // Update helper that syncs both the active offer inside offers[] and flat top-level keys
  const commitOfferChanges = (updatedOffers, newActiveId = activeOfferId) => {
    if (!onChange) return;
    const targetOffer = updatedOffers.find(o => o.id === newActiveId) || updatedOffers[0];
    onChange('challengeOffer', {
      ...targetOffer,
      offers: updatedOffers,
      activeOfferId: newActiveId
    });
  };

  const handleUpdateActiveOfferField = (field, val) => {
    const cleanVal = typeof val === 'string' ? sanitizeEditText(val) : val;
    const updatedOffers = offers.map(o => 
      o.id === activeOffer.id ? { ...o, [field]: cleanVal } : o
    );
    commitOfferChanges(updatedOffers);
  };

  const handleSwitchOffer = (targetId) => {
    if (!onChange) return;
    const targetOffer = offers.find(o => o.id === targetId) || offers[0];
    onChange('challengeOffer', {
      ...targetOffer,
      offers,
      activeOfferId: targetId
    });
  };

  const handleCreateNewOffer = () => {
    const offerName = prompt('Enter a name for the new offer:', 'New Training Offer');
    if (!offerName || !offerName.trim()) return;

    const newId = `offer_${Date.now()}`;
    const newOffer = {
      ...DEFAULT_OFFER_TEMPLATE,
      id: newId,
      name: offerName.trim(),
      title: offerName.trim().toUpperCase(),
      enabled: true
    };

    const updatedOffers = [...offers, newOffer];
    commitOfferChanges(updatedOffers, newId);
  };

  const handleDuplicateOffer = () => {
    const newId = `offer_${Date.now()}`;
    const duplicateOffer = {
      ...activeOffer,
      id: newId,
      name: `${activeOffer.name || 'Offer'} (Copy)`
    };

    const updatedOffers = [...offers, duplicateOffer];
    commitOfferChanges(updatedOffers, newId);
  };

  const handleDeleteOffer = () => {
    if (offers.length <= 1) {
      alert('You must have at least one offer in your system.');
      return;
    }
    if (!confirm(`Are you sure you want to delete "${activeOffer.name}"?`)) return;

    const remainingOffers = offers.filter(o => o.id !== activeOffer.id);
    commitOfferChanges(remainingOffers, remainingOffers[0].id);
  };

  const handleRenameOffer = () => {
    const newName = prompt('Enter a new name for this offer:', activeOffer.name || '');
    if (!newName || !newName.trim()) return;
    handleUpdateActiveOfferField('name', newName.trim());
  };

  const handleToggleEnabled = () => {
    handleUpdateActiveOfferField('enabled', !isEnabled);
  };

  // Inclusions Management (Add, Delete, Edit, Cycle Icon)
  const handleAddInclusion = () => {
    const currentInclusions = Array.isArray(activeOffer.inclusions) ? activeOffer.inclusions : [];
    const newInclusion = {
      icon: 'sports_mma',
      title: 'New Included Benefit',
      desc: 'Describe what is included in this offer...'
    };
    handleUpdateActiveOfferField('inclusions', [...currentInclusions, newInclusion]);
  };

  const handleDeleteInclusion = (indexToDelete) => {
    const currentInclusions = Array.isArray(activeOffer.inclusions) ? activeOffer.inclusions : [];
    const updatedInclusions = currentInclusions.filter((_, idx) => idx !== indexToDelete);
    handleUpdateActiveOfferField('inclusions', updatedInclusions);
  };

  const handleInclusionFieldEdit = (index, subField, val) => {
    const currentInclusions = Array.isArray(activeOffer.inclusions) ? activeOffer.inclusions : [];
    const updatedInclusions = currentInclusions.map((item, idx) => {
      if (idx === index) {
        return { ...item, [subField]: sanitizeEditText(val) };
      }
      return item;
    });
    handleUpdateActiveOfferField('inclusions', updatedInclusions);
  };

  const handleCycleIcon = (index) => {
    if (!isAdmin) return;
    const currentInclusions = Array.isArray(activeOffer.inclusions) ? activeOffer.inclusions : [];
    const currentIcon = currentInclusions[index]?.icon || 'sports_mma';
    const currentPos = ATHLETIC_ICONS.indexOf(currentIcon);
    const nextIcon = ATHLETIC_ICONS[(currentPos + 1) % ATHLETIC_ICONS.length];
    
    const updatedInclusions = currentInclusions.map((item, idx) => {
      if (idx === index) {
        return { ...item, icon: nextIcon };
      }
      return item;
    });
    handleUpdateActiveOfferField('inclusions', updatedInclusions);
  };

  const ctaHref = getAdminHref(activeOffer.ctaUrl || '/offers/6-week-challenge', isAdmin);

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
        
        {/* Admin Controls Toolbar (Multi-Offer Manager & Switcher) */}
        {isAdmin && (
          <div className="bg-surface-container-high/95 border-2 border-primary-container rounded-xl p-4 shadow-2xl space-y-3 font-label-mono text-xs backdrop-blur-md">
            
            {/* Top Row: Offer Selector & Offer Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 border-b border-outline-variant/60 pb-3">
              
              {/* Offer Selector Dropdown */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-primary-container font-bold text-sm">🎯 Active Homepage Offer:</span>
                <select
                  value={activeOffer.id}
                  onChange={(e) => handleSwitchOffer(e.target.value)}
                  className="bg-background border border-primary-container text-white px-3 py-1.5 rounded font-bold cursor-pointer text-xs focus:ring-1 focus:ring-primary-container"
                >
                  {offers.map(off => (
                    <option key={off.id} value={off.id}>
                      {off.name || off.title} {off.enabled ? '🟢 (Live)' : '🔴 (Hidden)'}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleRenameOffer}
                  className="bg-surface-container border border-outline-variant hover:border-primary-container text-white px-2 py-1.5 rounded font-bold cursor-pointer"
                  title="Rename current offer"
                >
                  ✏️ Rename
                </button>
              </div>

              {/* Offer Actions: New, Duplicate, Delete, Activate/Deactivate */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleCreateNewOffer}
                  className="bg-primary-container text-black px-3 py-1.5 rounded font-bold hover:bg-white transition-all cursor-pointer shadow-md"
                  title="Create a brand new offer preset"
                >
                  ➕ New Offer
                </button>

                <button
                  type="button"
                  onClick={handleDuplicateOffer}
                  className="bg-surface-container border border-outline-variant hover:border-primary-container text-white px-2.5 py-1.5 rounded font-bold cursor-pointer"
                  title="Duplicate this offer"
                >
                  📋 Duplicate
                </button>

                {offers.length > 1 && (
                  <button
                    type="button"
                    onClick={handleDeleteOffer}
                    className="bg-danger-red/80 hover:bg-danger-red text-white px-2.5 py-1.5 rounded font-bold cursor-pointer"
                    title="Delete this offer"
                  >
                    🗑️ Delete Offer
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleToggleEnabled}
                  className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
                    isEnabled 
                      ? 'bg-danger-red text-white hover:bg-red-700 shadow-md' 
                      : 'bg-primary-container text-black hover:bg-white shadow-md'
                  }`}
                  title={isEnabled ? "Deactivate this offer section from the live homepage" : "Activate this offer section to show on live homepage"}
                >
                  {isEnabled ? '🙈 Deactivate Offer' : '👁️ Activate Offer'}
                </button>
              </div>

            </div>

            {/* Bottom Row: Status Indicator & Photo Change */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-0.5">
              <div className="flex items-center gap-2">
                <span className="text-on-surface-variant text-[11px]">Status:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                  isEnabled 
                    ? 'bg-primary-container/20 text-primary-container border border-primary-container/60' 
                    : 'bg-danger-red/20 text-danger-red border border-danger-red/60'
                }`}>
                  {isEnabled ? '🟢 Live on Homepage' : '🔴 Inactive / Hidden'}
                </span>
                <span className="text-on-surface-variant text-[11px] hidden sm:inline">&bull; Offer ID: <code className="text-primary-container">{activeOffer.id}</code></span>
              </div>

              <label className="bg-surface-container text-white px-3 py-1 rounded border border-outline-variant hover:border-primary-container cursor-pointer font-bold inline-flex items-center gap-1.5 text-[11px]">
                📷 Change Offer Photo
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      handleUpdateActiveOfferField('image', reader.result);
                    };
                    reader.readAsDataURL(file);
                  }} 
                />
              </label>
            </div>

            {!isEnabled && (
              <div className="bg-yellow-950/40 border border-yellow-500/60 text-yellow-300 p-2.5 rounded text-xs flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span>
                  <strong>ADMIN PREVIEW:</strong> The <strong>&quot;{activeOffer.name}&quot;</strong> offer is currently <strong>DEACTIVATED</strong>. Public visitors cannot see this section. Click <strong>&quot;Activate Offer&quot;</strong> above to publish it to your live homepage.
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
                onBlur={(e) => handleUpdateActiveOfferField('badge', e.target.innerText)}
                className="bg-primary-container/15 text-primary-container border border-primary-container/60 font-label-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
              >
                {activeOffer.badge}
              </span>

              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleUpdateActiveOfferField('spotsText', e.target.innerText)}
                className="bg-surface-container-high border border-outline-variant text-on-surface-variant font-label-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-danger-red animate-pulse"></span>
                {activeOffer.spotsText}
              </span>
            </div>

            {/* Headline */}
            <h2 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleUpdateActiveOfferField('title', e.target.innerText)}
              className="font-display-xl text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight"
            >
              {activeOffer.title}
            </h2>

            {/* Subtitle / Narrative */}
            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleUpdateActiveOfferField('subtitle', e.target.innerText)}
              className="text-on-surface-variant font-body-lg text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {activeOffer.subtitle}
            </p>

            {/* Inclusions Section with Add/Delete Inclusions Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-[11px] uppercase tracking-wider text-primary-container font-bold">
                  WHAT IS INCLUDED:
                </span>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="bg-primary-container/20 text-primary-container border border-primary-container/60 px-2.5 py-1 rounded text-[11px] font-label-mono font-bold hover:bg-primary-container hover:text-black transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    ➕ Add Item
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(activeOffer.inclusions || []).map((inc, iIdx) => (
                  <div 
                    key={iIdx} 
                    className="bg-surface-container-low/90 border border-outline-variant/60 hover:border-primary-container/60 transition-all rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-md relative group"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span 
                        onClick={() => handleCycleIcon(iIdx)}
                        title={isAdmin ? "Click to change icon" : ""}
                        className={`material-symbols-outlined text-primary-container text-2xl shrink-0 mt-0.5 ${isAdmin ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                      >
                        {inc.icon || 'sports_mma'}
                      </span>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <h4 
                          contentEditable={isAdmin}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleInclusionFieldEdit(iIdx, 'title', e.target.innerText)}
                          className="font-headline-sm font-bold text-white text-sm sm:text-base leading-snug uppercase tracking-wide"
                        >
                          {inc.title}
                        </h4>
                        <p 
                          contentEditable={isAdmin}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleInclusionFieldEdit(iIdx, 'desc', e.target.innerText)}
                          className="text-on-surface-variant text-xs leading-relaxed"
                        >
                          {inc.desc}
                        </p>
                      </div>
                    </div>

                    {/* Admin Delete Item Button */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDeleteInclusion(iIdx)}
                        className="text-danger-red hover:text-white hover:bg-danger-red/80 px-1.5 py-0.5 rounded text-xs shrink-0 cursor-pointer transition-colors"
                        title="Delete this inclusion item"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total Value & Guarantee Box */}
            <div className="bg-surface-container-high/90 border-2 border-primary-container/70 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(0,229,255,0.12)]">
              <div className="space-y-0.5">
                <span className="font-label-mono text-[11px] uppercase tracking-widest text-primary-container font-bold block">
                  TOTAL PACKAGE VALUE
                </span>
                <div className="flex items-baseline">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleUpdateActiveOfferField('totalValue', e.target.innerText)}
                    className="font-display-xl text-3xl sm:text-4xl text-white font-extrabold tracking-tight"
                  >
                    {activeOffer.totalValue || '$1498'}
                  </span>
                </div>
              </div>

              <div className="sm:border-l sm:border-outline-variant/80 sm:pl-5 space-y-0.5 max-w-sm">
                <span className="font-label-mono text-[11px] font-bold uppercase tracking-wider text-primary-container block">
                  100% REFUNDABLE DEPOSIT
                </span>
                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleUpdateActiveOfferField('dealHighlight', e.target.innerText)}
                  className="text-on-surface-variant text-xs leading-relaxed"
                >
                  {activeOffer.dealHighlight || 'Complete 3 simple requirements and get 100% of your $500 deposit refunded!'}
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
                    onBlur={(e) => handleUpdateActiveOfferField('ctaText', e.target.innerText)}
                  >
                    {activeOffer.ctaText}
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
                src={activeOffer.image || DEFAULT_OFFER_TEMPLATE.image} 
                alt={`${activeOffer.name || 'Redemption Challenge'} Training`} 
                className="w-full h-80 sm:h-96 lg:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none"></div>

              {/* Top Right Floating Badge */}
              <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md border border-primary-container/80 px-3.5 py-1.5 rounded-full text-[11px] font-label-mono font-bold text-primary-container uppercase tracking-widest shadow-xl">
                INTAKE OPEN
              </div>

              {/* Bottom Card Callout */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 text-left bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-lg">verified</span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleUpdateActiveOfferField('imageTag', e.target.innerText)}
                    className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold"
                  >
                    {activeOffer.imageTag || 'Test your skills'}
                  </span>
                </div>
                <h3 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleUpdateActiveOfferField('imageTitle', e.target.innerText)}
                  className="text-white font-headline-sm text-base sm:text-lg uppercase tracking-wide leading-snug"
                >
                  {activeOffer.imageTitle || 'Exhibition Fight Night Ticket'}
                </h3>
                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleUpdateActiveOfferField('imageDesc', e.target.innerText)}
                  className="text-on-surface-variant text-xs font-body-md leading-relaxed"
                >
                  {activeOffer.imageDesc || 'Test your skills in a safe, 100% padded, beginner-friendly exhibition match'}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
