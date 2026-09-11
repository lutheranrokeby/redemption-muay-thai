import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DEFAULT_KIDS_MEMBERSHIPS } from '../constants/defaultKidsMemberships';
import { DEFAULT_RECOVERY_MEMBERSHIPS } from '../constants/defaultRecoveryMemberships';

export default function MembershipsPage({ 
  data, 
  onAddMembership, 
  onDeleteMembership, 
  onMembershipChange, 
  onAddKidsMembership,
  onDeleteKidsMembership,
  onKidsMembershipChange,
  onUpdateKidsMembershipsList,
  onAddRecoveryMembership,
  onDeleteRecoveryMembership,
  onRecoveryMembershipChange,
  onPageFieldChange, 
  onImageUpload, 
  onOpenBookingModal, 
  isAdmin 
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddKidsModal, setShowAddKidsModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '4 SESSIONS / WEEK',
    price: '$50',
    interval: 'per week',
    badge: 'ADVANCED',
    featured: false,
    hideCta: false,
    description: 'Designed for dedicated practitioners looking for frequent structured training.',
    features: ['4 sessions per week', 'Access to all striking & padwork', 'Flexible morning or evening slots', 'No lock-in contracts'],
    ctaText: 'SELECT PLAN',
    ctaUrl: '/contact'
  });

  const [newKidsPlan, setNewKidsPlan] = useState({
    title: '1 CLASS / WEEK',
    price: '$29',
    interval: 'per week',
    badge: 'STARTER',
    featured: false,
    hideCta: false,
    description: 'Ideal for kids starting out or balancing other weekly sports and activities.',
    features: ['1 structured kids class per week', 'Muay Thai basics & coordination', 'Discipline & confidence', 'No lock-in contracts'],
    ctaText: 'SELECT 1-CLASS PLAN',
    ctaUrl: '/contact'
  });

  const pageMeta = data?.membershipsPage || {};
  const memberships = data?.memberships || [];
  
  const kidsMemberships = (Array.isArray(data?.kidsMemberships) && data.kidsMemberships.length > 0
    ? data.kidsMemberships 
    : DEFAULT_KIDS_MEMBERSHIPS).filter(Boolean);

  const recoveryMemberships = (Array.isArray(data?.recoveryMemberships) && data.recoveryMemberships.length > 0
    ? data.recoveryMemberships 
    : DEFAULT_RECOVERY_MEMBERSHIPS).filter(Boolean);

  const faqList = pageMeta.faqItems || [
    { q: 'Are there lock-in contracts?', a: 'No lock-in contracts. We believe in providing authentic value and flexibility so you can pause or adjust your membership anytime with 2 weeks notice.' },
    { q: 'Can I start with a free trial class?', a: 'Absolutely! We encourage all prospective members to experience a free trial class first before committing to a membership tier.' },
    { q: 'What equipment do I need?', a: 'For your first trial class, comfortable athletic wear and a water bottle are all you need. We have gloves and pads available at the gym.' },
    { q: 'Do you offer family or youth rates?', a: 'Yes! We offer specialized Junior (ages 5-11) and Youth programs with family discount packages. Contact our team for family options.' }
  ];

  const handleCreatePlan = () => {
    if (!newPlan.title) return alert('Please enter plan title');
    onAddMembership({ ...newPlan, id: `m-${Date.now()}` });
    setShowAddModal(false);
  };

  const handleCreateKidsPlan = () => {
    if (!newKidsPlan.title) return alert('Please enter plan title');
    if (onAddKidsMembership) {
      onAddKidsMembership({ ...newKidsPlan, id: `km-${Date.now()}` });
    }
    setShowAddKidsModal(false);
  };

  const handleAddFeature = (planIndex, directPlan) => {
    const plan = directPlan || memberships[planIndex];
    if (!plan) return;
    const updatedFeatures = [...(plan.features || []), 'New membership feature benefit'];
    if (onMembershipChange) {
      onMembershipChange(planIndex, 'features', updatedFeatures);
    }
  };

  const handleRemoveFeature = (planIndex, fIndex, directPlan) => {
    const plan = directPlan || memberships[planIndex];
    if (!plan || !Array.isArray(plan.features)) return;
    const updatedFeatures = plan.features.filter((_, idx) => idx !== fIndex);
    if (onMembershipChange) {
      onMembershipChange(planIndex, 'features', updatedFeatures);
    }
  };

  const handleAddKidsFeature = (planIndex, directPlan) => {
    const plan = directPlan || kidsMemberships[planIndex];
    if (!plan) return;
    const updatedFeatures = [...(plan.features || []), 'New kids program benefit'];
    if (onKidsMembershipChange) {
      onKidsMembershipChange(planIndex, 'features', updatedFeatures);
    }
  };

  const handleRemoveKidsFeature = (planIndex, fIndex, directPlan) => {
    const plan = directPlan || kidsMemberships[planIndex];
    if (!plan || !Array.isArray(plan.features)) return;
    const updatedFeatures = plan.features.filter((_, idx) => idx !== fIndex);
    if (onKidsMembershipChange) {
      onKidsMembershipChange(planIndex, 'features', updatedFeatures);
    }
  };

  const handleAddRecoveryFeature = (planIndex, directPlan) => {
    const plan = directPlan || recoveryMemberships[planIndex];
    if (!plan) return;
    const updatedFeatures = [...(plan.features || []), 'New recovery benefit'];
    if (onRecoveryMembershipChange) {
      onRecoveryMembershipChange(planIndex, 'features', updatedFeatures);
    }
  };

  const handleRemoveRecoveryFeature = (planIndex, fIndex, directPlan) => {
    const plan = directPlan || recoveryMemberships[planIndex];
    if (!plan || !Array.isArray(plan.features)) return;
    const updatedFeatures = plan.features.filter((_, idx) => idx !== fIndex);
    if (onRecoveryMembershipChange) {
      onRecoveryMembershipChange(planIndex, 'features', updatedFeatures);
    }
  };

  const handleToggleMainKidsPlan = (targetIdx) => {
    const isCurrentlyMain = Boolean(kidsMemberships[targetIdx]?.featured);
    const updatedList = kidsMemberships.map((p, idx) => ({
      ...p,
      featured: isCurrentlyMain ? false : (idx === targetIdx)
    }));
    if (onUpdateKidsMembershipsList) {
      onUpdateKidsMembershipsList(updatedList);
    } else if (onKidsMembershipChange) {
      updatedList.forEach((p, idx) => {
        onKidsMembershipChange(idx, 'featured', p.featured);
      });
    }
  };

  const handleHeaderChange = (field, value) => {
    if (onPageFieldChange) {
      onPageFieldChange('membershipsPage', field, value);
    }
  };

  // FAQ Handlers
  const handleAddFaq = () => {
    const updatedFaqs = [...faqList, { q: 'New Frequently Asked Question', a: 'Answer description goes here...' }];
    handleHeaderChange('faqItems', updatedFaqs);
  };

  const handleFaqChange = (fIdx, field, val) => {
    const updatedFaqs = [...faqList];
    updatedFaqs[fIdx] = { ...updatedFaqs[fIdx], [field]: val };
    handleHeaderChange('faqItems', updatedFaqs);
  };

  const handleDeleteFaq = (fIdx) => {
    if (!confirm('Are you sure you want to delete this FAQ question?')) return;
    const updatedFaqs = [...faqList];
    updatedFaqs.splice(fIdx, 1);
    handleHeaderChange('faqItems', updatedFaqs);
  };

  // Scalable Grid Columns Config: 1 Plan (Centered max-w-md), 2 Plans (2 cols), 3 Plans (3 cols), 4+ Plans (auto 2-col to 4-col)
  const getGridClass = () => {
    const count = memberships.length;
    if (count === 1) return 'max-w-md mx-auto grid grid-cols-1 gap-8 items-stretch';
    if (count === 2) return 'max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch';
    if (count === 3) return 'grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch';
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch';
  };

  // Kids Grid Layout: balanced horizontal cards
  const getKidsGridClass = () => {
    const count = kidsMemberships.length;
    if (count === 1) return 'max-w-3xl mx-auto grid grid-cols-1 gap-8 items-stretch';
    if (count === 2) return 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch';
    return 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch';
  };

  // Responsive Mobile Re-ordering Helper: Main Featured Plan gets order-1 on mobile (< md), md:order-none on desktop
  const getMobileOrderClass = (isFeatured, idx) => {
    if (isFeatured) {
      return 'order-1 md:order-none';
    }
    return `order-${idx + 2} md:order-none`;
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Navbar data={data?.footer} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />

      <main className="pt-28 sm:pt-36 pb-16 md:pb-section-gap px-4 sm:px-grid-margin max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleHeaderChange('tagline', e.target.innerText)}
            className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold block"
          >
            {pageMeta.tagline || "FLEXIBLE TRAINING PLANS"}
          </span>

          <h1 className="font-display-xl text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-none tracking-tight">
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleHeaderChange('title', e.target.innerText)}
            >{pageMeta.title || "Membership Options"}</span>
          </h1>

          <p 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleHeaderChange('subtitle', e.target.innerText)}
            className="text-on-surface-variant font-body-lg text-base sm:text-lg leading-relaxed pt-2"
          >
            {pageMeta.subtitle || "No lock-in contracts. Choose the weekly training plan that fits your goals and schedule."}
          </p>

          {isAdmin && (
            <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 uppercase tracking-widest hover:bg-white transition-colors shadow-xl text-xs font-bold"
              >
                ➕ Add Membership Plan
              </button>

              <button 
                onClick={() => handleHeaderChange('hideRecoverySection', !pageMeta.hideRecoverySection)}
                className={`font-label-mono text-xs px-4 py-2 rounded font-bold transition-all border ${
                  pageMeta.hideRecoverySection 
                    ? 'bg-surface-container-high text-on-surface-variant border-outline-variant' 
                    : 'bg-primary-container/20 text-primary-container border-primary-container/60'
                }`}
              >
                {pageMeta.hideRecoverySection ? '🙈 Recovery Section: Hidden' : '👁️ Recovery Section: Visible'}
              </button>

              <button 
                onClick={() => handleHeaderChange('hideFaq', !pageMeta.hideFaq)}
                className={`font-label-mono text-xs px-4 py-2 rounded font-bold transition-all border ${
                  pageMeta.hideFaq 
                    ? 'bg-surface-container-high text-on-surface-variant border-outline-variant' 
                    : 'bg-primary-container/20 text-primary-container border-primary-container/60'
                }`}
              >
                {pageMeta.hideFaq ? '🙈 FAQ Section: Hidden' : '👁️ FAQ Section: Visible'}
              </button>
            </div>
          )}
        </div>

        {/* DYNAMIC SCALABLE MEMBERSHIP TIERS GRID (Main Plan on top on Mobile, Natural on Desktop) */}
        <div className={getGridClass()}>
          {memberships.map((plan, index) => {
            const isFeatured = plan.featured;
            const hideCta = plan.hideCta;
            const targetUrl = plan.ctaUrl || '/contact';
            const isExternalLink = targetUrl.startsWith('http://') || targetUrl.startsWith('https://');

            return (
              <div 
                key={plan.id || index}
                className={`relative bg-surface-container-low border transition-all duration-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl h-full group ${getMobileOrderClass(isFeatured, index)} ${
                  isFeatured 
                    ? 'border-2 border-primary-container bg-gradient-to-b from-surface-container-low via-surface-dim to-surface-container-high shadow-[0_15px_50px_rgba(0,229,255,0.15)] z-20' 
                    : 'border-outline-variant hover:border-primary-container/60 z-10'
                }`}
              >
                
                {/* Admin Controls Toolbar (Featured, Hide CTA, Delete) */}
                {isAdmin && (
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-30 bg-background/95 p-1.5 rounded border border-outline-variant text-[11px] font-label-mono gap-1 flex-wrap">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onMembershipChange(index, 'featured', !isFeatured)}
                        className={`px-2 py-0.5 rounded font-bold ${isFeatured ? 'bg-primary-container text-black' : 'bg-surface-container-high text-white'}`}
                      >
                        {isFeatured ? '⭐ Main' : '☆ Make Main'}
                      </button>

                      <button
                        onClick={() => onMembershipChange(index, 'hideCta', !hideCta)}
                        className={`px-2 py-0.5 rounded font-bold ${hideCta ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary-container/20 text-primary-container'}`}
                        title="Toggle CTA Button Visibility"
                      >
                        {hideCta ? '🙈 CTA Hidden' : '👁️ CTA Visible'}
                      </button>
                    </div>

                    <button
                      onClick={() => onDeleteMembership(index)}
                      className="bg-danger-red text-white px-2 py-0.5 rounded hover:bg-red-700 font-bold"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

                {/* Top Content */}
                <div className="space-y-4 pt-2 flex-grow">
                  <div className="flex justify-between items-center gap-2">
                    <span 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onMembershipChange(index, 'badge', e.target.innerText)}
                      className={`font-label-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        isFeatured 
                          ? 'bg-primary-container text-black border-primary-container shadow-md' 
                          : 'bg-surface-container-high text-primary-container border-outline-variant'
                      }`}
                    >
                      {plan.badge || (isFeatured ? 'MOST POPULAR' : 'TIER')}
                    </span>

                    {isFeatured && (
                      <span className="font-label-mono text-[10px] text-primary-container uppercase tracking-widest font-bold animate-pulse">
                        BEST VALUE
                      </span>
                    )}
                  </div>

                  {/* Plan Title */}
                  <h3 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onMembershipChange(index, 'title', e.target.innerText)}
                    className="font-headline-lg uppercase tracking-wide text-2xl sm:text-3xl text-white"
                  >
                    {plan.title}
                  </h3>

                  {/* Price & Billing Interval */}
                  <div className="flex items-baseline gap-2 border-b border-outline-variant/60 pb-5">
                    <span 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onMembershipChange(index, 'price', e.target.innerText)}
                      className={`font-display-xl font-extrabold ${isFeatured ? 'text-4xl sm:text-5xl text-primary-container' : 'text-3xl sm:text-4xl text-white'}`}
                    >
                      {plan.price}
                    </span>
                    <span 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onMembershipChange(index, 'interval', e.target.innerText)}
                      className="font-label-mono text-xs text-on-surface-variant uppercase font-bold"
                    >
                      /{plan.interval || 'per week'}
                    </span>
                  </div>

                  {/* Description */}
                  <p 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onMembershipChange(index, 'description', e.target.innerText)}
                    className="text-on-surface-variant text-xs sm:text-sm leading-relaxed"
                  >
                    {plan.description}
                  </p>

                  {/* Features Bullet List */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-label-mono text-[11px] uppercase tracking-wider text-primary-container font-bold">INCLUDED FEATURES:</span>
                      {isAdmin && (
                        <button 
                          type="button"
                          onClick={() => handleAddFeature(index, plan)} 
                          className="text-[10px] font-label-mono text-primary hover:underline cursor-pointer"
                        >
                          ➕ Add Benefit
                        </button>
                      )}
                    </div>

                    <ul className="space-y-2.5">
                      {Array.isArray(plan.features) && plan.features.map((feat, fIdx) => (
                        <li key={`${plan.id || index}-feat-${fIdx}`} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                          <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary-container text-base mt-0.5 shrink-0">check_circle</span>
                            <span 
                              contentEditable={isAdmin}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => {
                                if (!Array.isArray(plan.features)) return;
                                const updated = [...plan.features];
                                if (fIdx < updated.length) {
                                  updated[fIdx] = e.target.innerText;
                                  onMembershipChange(index, 'features', updated);
                                }
                              }}
                              className="text-on-surface font-body-md"
                            >{feat}</span>
                          </div>

                          {isAdmin && (
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveFeature(index, fIdx, plan);
                              }}
                              className="text-danger-red text-[10px] font-label-mono px-1 hover:underline shrink-0 cursor-pointer"
                              title="Delete benefit"
                            >✕</button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Section & Admin URL Settings */}
                <div className="pt-6 shrink-0 space-y-2">
                  
                  {/* Admin Editable CTA Link URL Input */}
                  {isAdmin && (
                    <div className="bg-background/90 border border-outline-variant p-2 rounded text-[11px] font-label-mono flex items-center gap-1.5">
                      <span className="text-primary-container font-bold shrink-0">🔗 Link URL:</span>
                      <span 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => onMembershipChange(index, 'ctaUrl', e.target.innerText.trim())}
                        className="bg-surface-container-high border border-outline-variant/60 px-1.5 py-0.5 rounded text-white font-mono text-[10px] truncate max-w-[200px] focus:outline-none focus:border-primary-container"
                        title="Click to edit link URL (e.g. /contact or https://your-checkout-link.com)"
                      >
                        {targetUrl}
                      </span>
                    </div>
                  )}

                  {/* Render CTA Button if NOT hidden (or render dashed preview in Admin Mode) */}
                  {(!hideCta || isAdmin) && (
                    <div className={hideCta && isAdmin ? 'opacity-40 border border-dashed border-primary-container rounded p-1' : ''}>
                      <a 
                        href={targetUrl}
                        target={isExternalLink ? '_blank' : '_self'}
                        rel={isExternalLink ? 'noreferrer' : ''}
                        onClick={(e) => {
                          if (!isExternalLink && onOpenBookingModal) {
                            e.preventDefault();
                            onOpenBookingModal();
                          }
                        }}
                        className={`w-full btn-clip font-button-text py-3.5 uppercase tracking-widest transition-all text-center font-bold text-xs sm:text-sm block cursor-pointer ${
                          isFeatured 
                            ? 'bg-primary-container text-black hover:bg-white shadow-xl' 
                            : 'bg-surface-container-high text-white hover:bg-primary-container hover:text-black border border-outline-variant'
                        }`}
                      >
                        <span 
                          contentEditable={isAdmin}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => onMembershipChange(index, 'ctaText', e.target.innerText)}
                        >{plan.ctaText || 'SELECT MEMBERSHIP →'}</span>
                      </a>
                    </div>
                  )}

                  {/* Bright Blue Box at the bottom of the Main Membership */}
                  {isFeatured && (
                    <a
                      href="#recovery-membership"
                      onClick={(e) => {
                        const el = document.getElementById('recovery-membership');
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="block bg-primary-container text-black rounded-xl p-3 sm:p-3.5 text-center border-2 border-black/15 transition-all hover:bg-white hover:scale-[1.01] cursor-pointer mt-3 group/rec"
                      title="View Redemption Recovery details"
                    >
                      <div className="inline-flex items-center gap-1 font-label-mono text-[10px] font-black uppercase tracking-widest bg-black text-primary-container px-2.5 py-0.5 rounded-full mb-1">
                        <span className="material-symbols-outlined text-xs font-bold">check_circle</span>
                        <span>INCLUDED</span>
                      </div>
                      <div className="font-headline-md text-base sm:text-lg font-black uppercase tracking-wide text-black leading-tight group-hover/rec:text-black">
                        REDEMPTION RECOVERY
                      </div>
                      <p className="text-[11px] font-body-md font-semibold text-black/85 mt-0.5 leading-snug">
                        Infrared Sauna • Compression Sleeves • Massage Gun
                      </p>
                    </a>
                  )}

                </div>

              </div>
            );
          })}
        </div>

        {/* KIDS MEMBERSHIPS SECTION (Desktop: Title on Left, Options on Right) */}
        {(!pageMeta.hideKidsSection || isAdmin) && (
          <div className={`pt-12 border-t border-outline-variant/60 ${pageMeta.hideKidsSection ? 'opacity-40 border-dashed border-primary-container p-4 rounded-xl' : ''}`}>
            
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
              
              {/* Left Column: Title, Subtitle, Tagline & Admin Controls (Sticky on Desktop) */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4 mb-8 lg:mb-0">
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('kidsTagline', e.target.innerText)}
                  className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold block"
                >
                  {pageMeta.kidsTagline || "YOUTH & JUNIOR DEVELOPMENT"}
                </span>

                <h2 className="font-display-xl text-4xl sm:text-5xl lg:text-6xl uppercase text-white leading-none tracking-tight">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleHeaderChange('kidsTitle', e.target.innerText)}
                  >{pageMeta.kidsTitle || "Kids Memberships"}</span>
                </h2>

                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('kidsSubtitle', e.target.innerText)}
                  className="text-on-surface-variant font-body-lg text-sm sm:text-base leading-relaxed pt-1"
                >
                  {pageMeta.kidsSubtitle || "Flexible weekly training options based on how often your child wants to train. Building confidence, discipline, and screen-free fitness in a safe, fun, and ego-free environment."}
                </p>

                <div className="pt-2">
                  <p className="font-label-mono text-xs text-on-surface-variant/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-container inline-block"></span>
                    No lock-in contracts • Cancel anytime
                  </p>
                </div>

                {isAdmin && (
                  <div className="pt-3 flex flex-wrap gap-2.5">
                    <button 
                      onClick={() => setShowAddKidsModal(true)}
                      className="btn-clip bg-primary-container text-black font-button-text px-4 py-2 uppercase tracking-widest hover:bg-white transition-colors shadow-xl text-xs font-bold"
                    >
                      ➕ Add Kids Plan
                    </button>

                    <button 
                      onClick={() => handleHeaderChange('hideKidsSection', !pageMeta.hideKidsSection)}
                      className={`font-label-mono text-xs px-3 py-1.5 rounded font-bold transition-all border ${
                        pageMeta.hideKidsSection 
                          ? 'bg-surface-container-high text-on-surface-variant border-outline-variant' 
                          : 'bg-primary-container/20 text-primary-container border-primary-container/60'
                      }`}
                    >
                      {pageMeta.hideKidsSection ? '🙈 Hidden' : '👁️ Visible'}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: The Membership Options (Main Plan Sits at Top of Stack) */}
              <div className="lg:col-span-8 space-y-5">
                {[...kidsMemberships]
                  .filter(Boolean)
                  .map((plan, originalIndex) => ({ plan, originalIndex }))
                  .sort((a, b) => (b?.plan?.featured ? 1 : 0) - (a?.plan?.featured ? 1 : 0))
                  .map(({ plan, originalIndex }) => {
                    if (!plan) return null;
                    const targetUrl = plan.ctaUrl || '/contact';
                    const isExternalLink = targetUrl.startsWith('http://') || targetUrl.startsWith('https://');
                    const isFeatured = Boolean(plan.featured);
                    const hideCta = Boolean(plan.hideCta);

                    return (
                      <div 
                        key={plan.id || originalIndex}
                        className={`relative bg-surface-container-low border transition-all duration-300 rounded-2xl p-6 sm:p-7 shadow-xl group ${
                          isFeatured 
                            ? 'border-2 border-primary-container bg-gradient-to-r from-surface-container-low via-surface-dim to-surface-container-high shadow-[0_10px_40px_rgba(0,229,255,0.12)]' 
                            : 'border-outline-variant hover:border-primary-container/60'
                        }`}
                      >
                        {/* Admin Controls Toolbar (Featured, Hide CTA, Delete) */}
                        {isAdmin && (
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-30 bg-background/95 p-1 rounded border border-outline-variant text-[11px] font-label-mono">
                            <button
                              type="button"
                              onClick={() => handleToggleMainKidsPlan(originalIndex)}
                              className={`px-2 py-0.5 rounded font-bold cursor-pointer ${isFeatured ? 'bg-primary-container text-black' : 'bg-surface-container-high text-white'}`}
                            >
                              {isFeatured ? '⭐ Main' : '☆ Make Main'}
                            </button>
                            <button
                              type="button"
                              onClick={() => onKidsMembershipChange(originalIndex, 'hideCta', !hideCta)}
                              className={`px-2 py-0.5 rounded font-bold cursor-pointer ${hideCta ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary-container/20 text-primary-container'}`}
                              title="Toggle CTA Button Visibility"
                            >
                              {hideCta ? '🙈 CTA Hidden' : '👁️ CTA Visible'}
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteKidsMembership(originalIndex)}
                              className="bg-danger-red text-white px-2 py-0.5 rounded hover:bg-red-700 font-bold cursor-pointer"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          
                          {/* Left Info: Badge, Title, Description, Features */}
                          <div className="space-y-3 flex-grow">
                            <div className="flex items-center gap-2.5">
                              <span 
                                contentEditable={isAdmin}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => onKidsMembershipChange(originalIndex, 'badge', e.target.innerText)}
                                className={`font-label-mono text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${
                                  isFeatured 
                                    ? 'bg-primary-container text-black border-primary-container shadow-sm' 
                                    : 'bg-surface-container-high text-primary-container border-outline-variant'
                                }`}
                              >
                                {plan.badge || (isFeatured ? 'MOST POPULAR' : 'TIER')}
                              </span>

                              {isFeatured && (
                                <span className="font-label-mono text-[10px] text-primary-container uppercase tracking-widest font-bold animate-pulse">
                                  RECOMMENDED
                                </span>
                              )}
                            </div>

                            <h3 
                              contentEditable={isAdmin}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => onKidsMembershipChange(originalIndex, 'title', e.target.innerText)}
                              className="font-headline-lg uppercase tracking-wide text-2xl sm:text-3xl text-white"
                            >
                              {plan.title}
                            </h3>

                            <p 
                              contentEditable={isAdmin}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => onKidsMembershipChange(originalIndex, 'description', e.target.innerText)}
                              className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-xl"
                            >
                              {plan.description}
                            </p>

                            {/* Features List */}
                            <div className="space-y-2 pt-1">
                              <div className="flex items-center gap-3">
                                <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary-container font-bold">WHAT'S INCLUDED:</span>
                                {isAdmin && (
                                  <button 
                                    type="button"
                                    onClick={() => handleAddKidsFeature(originalIndex, plan)} 
                                    className="text-[10px] font-label-mono text-primary hover:underline cursor-pointer"
                                  >
                                    ➕ Add Benefit
                                  </button>
                                )}
                              </div>

                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {Array.isArray(plan.features) && plan.features.map((feat, fIdx) => (
                                  <li key={`${plan.id || originalIndex}-kfeat-${fIdx}`} className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-1.5">
                                      <span className="material-symbols-outlined text-primary-container text-sm mt-0.5 shrink-0">check_circle</span>
                                      <span 
                                        contentEditable={isAdmin}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => {
                                          if (!Array.isArray(plan.features)) return;
                                          const updated = [...plan.features];
                                          if (fIdx < updated.length) {
                                            updated[fIdx] = e.target.innerText;
                                            onKidsMembershipChange(originalIndex, 'features', updated);
                                          }
                                        }}
                                        className="text-on-surface font-body-md"
                                      >{feat}</span>
                                    </div>

                                    {isAdmin && (
                                      <button 
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleRemoveKidsFeature(originalIndex, fIdx, plan);
                                        }}
                                        className="text-danger-red text-[10px] font-label-mono px-1 hover:underline shrink-0 cursor-pointer"
                                        title="Delete benefit"
                                      >✕</button>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Right Action: Price Box & CTA Button */}
                          <div className="shrink-0 md:w-56 md:border-l md:border-outline-variant/60 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/40 flex flex-col justify-center items-center md:items-end text-center md:text-right space-y-3">
                            <div>
                              <div className="flex items-baseline justify-center md:justify-end gap-1">
                                <span 
                                  contentEditable={isAdmin}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => onKidsMembershipChange(originalIndex, 'price', e.target.innerText)}
                                  className={`font-display-xl font-extrabold ${isFeatured ? 'text-4xl sm:text-5xl text-primary-container' : 'text-3xl sm:text-4xl text-white'}`}
                                >
                                  {plan.price}
                                </span>
                                <span 
                                  contentEditable={isAdmin}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => onKidsMembershipChange(originalIndex, 'interval', e.target.innerText)}
                                  className="font-label-mono text-xs text-on-surface-variant uppercase font-bold"
                                >
                                  /{plan.interval || 'per week'}
                                </span>
                              </div>
                            </div>

                            {/* Admin CTA URL Input */}
                            {isAdmin && (
                              <div className="w-full bg-background/90 border border-outline-variant p-1.5 rounded text-[10px] font-label-mono flex items-center justify-center gap-1">
                                <span className="text-primary-container font-bold shrink-0">🔗 Link:</span>
                                <span 
                                  contentEditable={isAdmin}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => onKidsMembershipChange(originalIndex, 'ctaUrl', e.target.innerText.trim())}
                                  className="text-white font-mono truncate max-w-[110px] focus:outline-none"
                                >
                                  {targetUrl}
                                </span>
                              </div>
                            )}

                            {/* Render CTA Button if NOT hidden (or render dashed preview in Admin Mode) */}
                            {(!hideCta || isAdmin) && (
                              <div className={`w-full ${hideCta && isAdmin ? 'opacity-40 border border-dashed border-primary-container rounded p-1' : ''}`}>
                                <a 
                                  href={targetUrl}
                                  target={isExternalLink ? '_blank' : '_self'}
                                  rel={isExternalLink ? 'noreferrer' : ''}
                                  onClick={(e) => {
                                    if (!isExternalLink && onOpenBookingModal) {
                                      e.preventDefault();
                                      onOpenBookingModal();
                                    }
                                  }}
                                  className={`w-full btn-clip font-button-text py-3 uppercase tracking-widest transition-all text-center font-bold text-xs sm:text-sm block cursor-pointer shadow-lg ${
                                    isFeatured 
                                      ? 'bg-primary-container text-black hover:bg-white' 
                                      : 'bg-surface-container-high text-white hover:bg-primary-container hover:text-black border border-outline-variant'
                                  }`}
                                >
                                  <span 
                                    contentEditable={isAdmin}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => onKidsMembershipChange(originalIndex, 'ctaText', e.target.innerText)}
                                  >{plan.ctaText || 'SELECT PLAN →'}</span>
                                </a>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
              </div>

            </div>

          </div>
        )}

        {/* RECOVERY MEMBERSHIP SECTION (Desktop: Title on Left, Options on Right) */}
        {(!pageMeta.hideRecoverySection || isAdmin) && (
          <div id="recovery-membership" className={`pt-12 border-t border-outline-variant/60 ${pageMeta.hideRecoverySection ? 'opacity-40 border-dashed border-primary-container p-4 rounded-xl' : ''}`}>
            
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
              
              {/* Left Column: Title, Subtitle, Tagline & Admin Controls (Sticky on Desktop) */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4 mb-8 lg:mb-0">
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('recoveryTagline', e.target.innerText)}
                  className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold block"
                >
                  {pageMeta.recoveryTagline || "RECOVERY & WELLNESS"}
                </span>

                <h2 className="font-display-xl text-4xl sm:text-5xl lg:text-6xl uppercase text-white leading-none tracking-tight">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleHeaderChange('recoveryTitle', e.target.innerText)}
                  >{pageMeta.recoveryTitle || "Recovery Membership"}</span>
                </h2>

                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('recoverySubtitle', e.target.innerText)}
                  className="text-on-surface-variant font-body-lg text-sm sm:text-base leading-relaxed pt-1"
                >
                  {pageMeta.recoverySubtitle || "Dedicated access to Redemption's recovery facility to optimize muscle repair, reduce inflammation, and enhance overall athletic longevity."}
                </p>

                <div className="pt-2">
                  <p className="font-label-mono text-xs text-on-surface-variant/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-container inline-block"></span>
                    No lock-in contracts • Cancel anytime
                  </p>
                </div>

                {isAdmin && (
                  <div className="pt-3 flex flex-wrap gap-2.5">
                    <button 
                      onClick={() => handleHeaderChange('hideRecoverySection', !pageMeta.hideRecoverySection)}
                      className={`font-label-mono text-xs px-3 py-1.5 rounded font-bold transition-all border ${
                        pageMeta.hideRecoverySection 
                          ? 'bg-surface-container-high text-on-surface-variant border-outline-variant' 
                          : 'bg-primary-container/20 text-primary-container border-primary-container/60'
                      }`}
                    >
                      {pageMeta.hideRecoverySection ? '🙈 Hidden' : '👁️ Visible'}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: The Recovery Membership Options */}
              <div className="lg:col-span-8 space-y-5">
                {[...recoveryMemberships]
                  .filter(Boolean)
                  .map((plan, originalIndex) => {
                    if (!plan) return null;
                    const targetUrl = plan.ctaUrl || '/contact';
                    const isExternalLink = targetUrl.startsWith('http://') || targetUrl.startsWith('https://');
                    const hideCta = Boolean(plan.hideCta);

                    return (
                      <div 
                        key={plan.id || originalIndex}
                        className="relative bg-surface-container-low border border-outline-variant hover:border-primary-container/60 transition-all duration-300 rounded-2xl p-6 sm:p-7 shadow-xl group"
                      >
                        {/* Admin Controls Toolbar (Hide CTA) */}
                        {isAdmin && (
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-30 bg-background/95 p-1 rounded border border-outline-variant text-[11px] font-label-mono">
                            <button
                              type="button"
                              onClick={() => onRecoveryMembershipChange && onRecoveryMembershipChange(originalIndex, 'hideCta', !hideCta)}
                              className={`px-2 py-0.5 rounded font-bold cursor-pointer ${hideCta ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary-container/20 text-primary-container'}`}
                              title="Toggle CTA Button Visibility"
                            >
                              {hideCta ? '🙈 CTA Hidden' : '👁️ CTA Visible'}
                            </button>
                          </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          
                          {/* Left Info: Title, Description, Features (NO "Most popular" or "recommended", etc tags!) */}
                          <div className="space-y-3 flex-grow">
                            <h3 
                              contentEditable={isAdmin}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => onRecoveryMembershipChange && onRecoveryMembershipChange(originalIndex, 'title', e.target.innerText)}
                              className="font-headline-lg uppercase tracking-wide text-2xl sm:text-3xl text-white"
                            >
                              {plan.title || "REDEMPTION RECOVERY"}
                            </h3>

                            <p 
                              contentEditable={isAdmin}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => onRecoveryMembershipChange && onRecoveryMembershipChange(originalIndex, 'description', e.target.innerText)}
                              className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-xl"
                            >
                              {plan.description || "Dedicated access to Redemption's recovery facility to optimize muscle repair, reduce inflammation, and enhance overall athletic longevity."}
                            </p>

                            {/* Features List */}
                            <div className="space-y-2 pt-1">
                              <div className="flex items-center gap-3">
                                <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary-container font-bold">WHAT'S INCLUDED:</span>
                                {isAdmin && (
                                  <button 
                                    type="button"
                                    onClick={() => handleAddRecoveryFeature(originalIndex, plan)} 
                                    className="text-[10px] font-label-mono text-primary hover:underline cursor-pointer"
                                  >
                                    ➕ Add Benefit
                                  </button>
                                )}
                              </div>

                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {Array.isArray(plan.features) && plan.features.map((feat, fIdx) => (
                                  <li key={`${plan.id || originalIndex}-rfeat-${fIdx}`} className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-1.5">
                                      <span className="material-symbols-outlined text-primary-container text-sm mt-0.5 shrink-0">check_circle</span>
                                      <span 
                                        contentEditable={isAdmin}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => {
                                          if (!Array.isArray(plan.features)) return;
                                          const updated = [...plan.features];
                                          if (fIdx < updated.length) {
                                            updated[fIdx] = e.target.innerText;
                                            if (onRecoveryMembershipChange) {
                                              onRecoveryMembershipChange(originalIndex, 'features', updated);
                                            }
                                          }
                                        }}
                                        className="text-on-surface font-body-md"
                                      >{feat}</span>
                                    </div>

                                    {isAdmin && (
                                      <button 
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleRemoveRecoveryFeature(originalIndex, fIdx, plan);
                                        }}
                                        className="text-danger-red text-[10px] font-label-mono px-1 hover:underline shrink-0 cursor-pointer"
                                        title="Delete benefit"
                                      >✕</button>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Right Action: Price Box & CTA Button */}
                          <div className="shrink-0 md:w-56 md:border-l md:border-outline-variant/60 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/40 flex flex-col justify-center items-center md:items-end text-center md:text-right space-y-3">
                            <div>
                              <div className="flex items-baseline justify-center md:justify-end gap-1">
                                <span 
                                  contentEditable={isAdmin}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => onRecoveryMembershipChange && onRecoveryMembershipChange(originalIndex, 'price', e.target.innerText)}
                                  className="font-display-xl font-extrabold text-3xl sm:text-4xl text-white"
                                >
                                  {plan.price || "$33"}
                                </span>
                                <span 
                                  contentEditable={isAdmin}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => onRecoveryMembershipChange && onRecoveryMembershipChange(originalIndex, 'interval', e.target.innerText)}
                                  className="font-label-mono text-xs text-on-surface-variant uppercase font-bold"
                                >
                                  /{plan.interval || 'per week'}
                                </span>
                              </div>
                            </div>

                            {/* Admin CTA URL Input */}
                            {isAdmin && (
                              <div className="w-full bg-background/90 border border-outline-variant p-1.5 rounded text-[10px] font-label-mono flex items-center justify-center gap-1">
                                <span className="text-primary-container font-bold shrink-0">🔗 Link:</span>
                                <span 
                                  contentEditable={isAdmin}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => onRecoveryMembershipChange && onRecoveryMembershipChange(originalIndex, 'ctaUrl', e.target.innerText.trim())}
                                  className="text-white font-mono truncate max-w-[110px] focus:outline-none"
                                >
                                  {targetUrl}
                                </span>
                              </div>
                            )}

                            {/* Render CTA Button if NOT hidden */}
                            {(!hideCta || isAdmin) && (
                              <div className={`w-full ${hideCta && isAdmin ? 'opacity-40 border border-dashed border-primary-container rounded p-1' : ''}`}>
                                <a 
                                  href={targetUrl}
                                  target={isExternalLink ? '_blank' : '_self'}
                                  rel={isExternalLink ? 'noreferrer' : ''}
                                  onClick={(e) => {
                                    if (!isExternalLink && onOpenBookingModal) {
                                      e.preventDefault();
                                      onOpenBookingModal();
                                    }
                                  }}
                                  className="w-full btn-clip font-button-text py-3 uppercase tracking-widest transition-all text-center font-bold text-xs sm:text-sm block cursor-pointer shadow-lg bg-surface-container-high text-white hover:bg-primary-container hover:text-black border border-outline-variant"
                                >
                                  <span 
                                    contentEditable={isAdmin}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => onRecoveryMembershipChange && onRecoveryMembershipChange(originalIndex, 'ctaText', e.target.innerText)}
                                  >{plan.ctaText || 'SELECT PLAN →'}</span>
                                </a>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
              </div>

            </div>

          </div>
        )}

        {/* FAQ SECTION (Toggleable Visibility & Editable Questions) */}
        {(!pageMeta.hideFaq || isAdmin) && (
          <div className={`bg-surface-container-low border border-outline-variant rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl relative ${pageMeta.hideFaq ? 'opacity-40 border-dashed border-primary-container' : ''}`}>
            
            {/* Header + Add FAQ Admin Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant pb-4">
              <div className="flex items-center gap-3">
                <h3 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('faqTitle', e.target.innerText)}
                  className="font-headline-md text-2xl uppercase text-primary"
                >
                  {pageMeta.faqTitle || "FREQUENTLY ASKED QUESTIONS"}
                </h3>
                {pageMeta.hideFaq && (
                  <span className="bg-danger-red/20 border border-danger-red text-white text-[10px] font-label-mono px-2 py-0.5 rounded font-bold uppercase">
                    Hidden From Public View
                  </span>
                )}
              </div>

              {isAdmin && (
                <button 
                  onClick={handleAddFaq}
                  className="btn-clip bg-primary-container text-black font-button-text px-4 py-1.5 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
                >
                  ➕ Add FAQ Question
                </button>
              )}
            </div>

            {/* FAQ List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {faqList.map((faq, fIdx) => (
                <div key={fIdx} className="space-y-2 relative bg-surface-container-high/40 p-4 rounded-xl border border-outline-variant/50 group">
                  
                  <div className="flex justify-between items-start gap-2">
                    <h4 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleFaqChange(fIdx, 'q', e.target.innerText)}
                      className="font-headline-md text-white text-lg pr-6"
                    >
                      {faq.q}
                    </h4>

                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteFaq(fIdx)}
                        className="bg-danger-red text-white text-[10px] font-label-mono px-1.5 py-0.5 rounded hover:bg-red-700 font-bold shrink-0"
                        title="Delete Question"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <p 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleFaqChange(fIdx, 'a', e.target.innerText)}
                    className="text-on-surface-variant text-xs sm:text-sm leading-relaxed"
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-primary-container rounded-lg p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-md uppercase text-primary text-xl sm:text-2xl border-b border-outline-variant pb-2">Add Membership Plan</h3>
            
            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Plan Title</label>
              <input type="text" value={newPlan.title} onChange={(e) => setNewPlan({...newPlan, title: e.target.value})} placeholder="e.g. 4 SESSIONS / WEEK" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Weekly Price</label>
                <input type="text" value={newPlan.price} onChange={(e) => setNewPlan({...newPlan, price: e.target.value})} placeholder="e.g. $50" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm font-bold" />
              </div>
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Badge Tag</label>
                <input type="text" value={newPlan.badge} onChange={(e) => setNewPlan({...newPlan, badge: e.target.value})} placeholder="e.g. ADVANCED" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">CTA Button Target Link URL</label>
              <input type="text" value={newPlan.ctaUrl} onChange={(e) => setNewPlan({...newPlan, ctaUrl: e.target.value})} placeholder="e.g. /contact or https://checkout.com" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm font-mono" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Description</label>
              <textarea rows="2" value={newPlan.description} onChange={(e) => setNewPlan({...newPlan, description: e.target.value})} placeholder="Plan description..." className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm"></textarea>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="chkFeatured" checked={newPlan.featured} onChange={(e) => setNewPlan({...newPlan, featured: e.target.checked})} className="accent-primary-container w-4 h-4" />
                <label htmlFor="chkFeatured" className="text-xs font-label-mono text-white cursor-pointer font-bold">Highlight as Main Emphasized Plan ($55 Unlimited style)</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="chkHideCta" checked={newPlan.hideCta} onChange={(e) => setNewPlan({...newPlan, hideCta: e.target.checked})} className="accent-primary-container w-4 h-4" />
                <label htmlFor="chkHideCta" className="text-xs font-label-mono text-white cursor-pointer font-bold">Hide CTA Button for this plan</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-on-surface-variant uppercase">Cancel</button>
              <button onClick={handleCreatePlan} className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 text-sm uppercase font-bold">Save Plan</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Kids Plan Modal */}
      {showAddKidsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-primary-container rounded-lg p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-md uppercase text-primary text-xl sm:text-2xl border-b border-outline-variant pb-2">Add Kids & Teens Plan</h3>
            
            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Plan Title</label>
              <input type="text" value={newKidsPlan.title} onChange={(e) => setNewKidsPlan({...newKidsPlan, title: e.target.value})} placeholder="e.g. JUNIORS PROGRAM" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Age Bracket Badge</label>
                <input type="text" value={newKidsPlan.ageBadge} onChange={(e) => setNewKidsPlan({...newKidsPlan, ageBadge: e.target.value})} placeholder="e.g. AGES 5 - 11" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Sessions Per Week</label>
                <input type="text" value={newKidsPlan.sessions} onChange={(e) => setNewKidsPlan({...newKidsPlan, sessions: e.target.value})} placeholder="e.g. 2 Sessions / Week" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Weekly Price</label>
                <input type="text" value={newKidsPlan.price} onChange={(e) => setNewKidsPlan({...newKidsPlan, price: e.target.value})} placeholder="e.g. $30" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm font-bold" />
              </div>
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Billing Interval</label>
                <input type="text" value={newKidsPlan.interval} onChange={(e) => setNewKidsPlan({...newKidsPlan, interval: e.target.value})} placeholder="per week" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">CTA Button Target Link URL</label>
              <input type="text" value={newKidsPlan.ctaUrl} onChange={(e) => setNewKidsPlan({...newKidsPlan, ctaUrl: e.target.value})} placeholder="e.g. /contact or https://checkout.com" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm font-mono" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Description</label>
              <textarea rows="2" value={newKidsPlan.description} onChange={(e) => setNewKidsPlan({...newKidsPlan, description: e.target.value})} placeholder="Plan description..." className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm"></textarea>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="chkKidsFeatured" checked={newKidsPlan.featured} onChange={(e) => setNewKidsPlan({...newKidsPlan, featured: e.target.checked})} className="accent-primary-container w-4 h-4" />
                <label htmlFor="chkKidsFeatured" className="text-xs font-label-mono text-white cursor-pointer font-bold">Set as Main Plan (Top of the stack)</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="chkKidsHideCta" checked={newKidsPlan.hideCta} onChange={(e) => setNewKidsPlan({...newKidsPlan, hideCta: e.target.checked})} className="accent-primary-container w-4 h-4" />
                <label htmlFor="chkKidsHideCta" className="text-xs font-label-mono text-white cursor-pointer font-bold">Hide CTA Button for this plan</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
              <button onClick={() => setShowAddKidsModal(false)} className="px-4 py-2 text-xs text-on-surface-variant uppercase">Cancel</button>
              <button onClick={handleCreateKidsPlan} className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 text-sm uppercase font-bold">Save Kids Plan</button>
            </div>
          </div>
        </div>
      )}

      <Footer data={data?.footer} onChange={onPageFieldChange ? (sec, fld, val) => onPageFieldChange(sec, fld, val) : null} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
