import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MembershipsPage({ data, onAddMembership, onDeleteMembership, onMembershipChange, onPageFieldChange, onImageUpload, onOpenBookingModal, isAdmin }) {
  const [showAddModal, setShowAddModal] = useState(false);
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

  const pageMeta = data?.membershipsPage || {};
  const memberships = data?.memberships || [];
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

  const handleAddFeature = (planIndex) => {
    const list = [...memberships];
    const plan = list[planIndex];
    const updatedFeatures = [...(plan.features || []), 'New membership feature benefit'];
    onMembershipChange(planIndex, 'features', updatedFeatures);
  };

  const handleRemoveFeature = (planIndex, fIndex) => {
    const list = [...memberships];
    const plan = list[planIndex];
    const updatedFeatures = [...(plan.features || [])];
    updatedFeatures.splice(fIndex, 1);
    onMembershipChange(planIndex, 'features', updatedFeatures);
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
                        <button onClick={() => handleAddFeature(index)} className="text-[10px] font-label-mono text-primary hover:underline">
                          ➕ Add Benefit
                        </button>
                      )}
                    </div>

                    <ul className="space-y-2.5">
                      {plan.features?.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                          <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary-container text-base mt-0.5 shrink-0">check_circle</span>
                            <span 
                              contentEditable={isAdmin}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => {
                                const updated = [...plan.features];
                                updated[fIdx] = e.target.innerText;
                                onMembershipChange(index, 'features', updated);
                              }}
                              className="text-on-surface font-body-md"
                            >{feat}</span>
                          </div>

                          {isAdmin && (
                            <button 
                              onClick={() => handleRemoveFeature(index, fIdx)}
                              className="text-danger-red text-[10px] font-label-mono px-1 hover:underline shrink-0"
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

                </div>

              </div>
            );
          })}
        </div>

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

      <Footer data={data?.footer} onChange={onPageFieldChange ? (sec, fld, val) => onPageFieldChange(sec, fld, val) : null} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
