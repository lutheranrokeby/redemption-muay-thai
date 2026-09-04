import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { getAdminHref } from '../utils/urlHelper';

export default function OfferPage({ slug, data, onOfferChange, onPageFieldChange, onImageUpload, onOpenBookingModal, isAdmin }) {
  const offerData = data?.offers?.[slug] || {
    selectedVariant: 'A',
    // Option A: 100% Refundable Deposit Challenge
    optionA: {
      headline: "SUNSHINE COAST: Want to get in fight-ready shape for FREE over the next 6 weeks?",
      subheadline: "We’re looking for 12 motivated men and women to participate in our upcoming 6-Week \"Redemption\" Muay Thai Challenge—and if you complete it, your entire deposit goes back into your pocket.",
      dealTitle: "Here’s the deal:",
      dealDesc: "Most people fail because they lack skin in the game and real accountability. So we put $500 on the line to back up our training.\n\nYou pay a $500 commitment deposit today. Complete 3 simple requirements, and at the end of 6 weeks, you get 100% OF YOUR $500 REFUNDED (or convert it into $650 gym credit toward long-term training).",
      valueStackTitle: "HERE'S WHAT'S INCLUDED IN THE CHALLENGE:",
      valueItems: [
        { title: "6 Weeks Unlimited Muay Thai Access", desc: "All levels, zero ego", value: "$450" },
        { title: "Weekly 1-on-1 Coach Check-ins & Pad Work", desc: "Dial in your striking technique & power", value: "$300" },
        { title: "Done-For-You Fighter Nutrition Blueprint & Meal Guide", desc: "Lean out & boost performance", value: "$150" },
        { title: "Private Fight Camp Community & Sparring Group Access", desc: "Supportive team environment", value: "$150" },
        { title: "Exhibition Fight Night Ticket", desc: "Test your skills in a safe, 100% padded, beginner-friendly exhibition match", value: "$250" }
      ],
      requirementsTitle: "THE 3 REQUIREMENTS TO GET YOUR $500 BACK:",
      requirements: [
        "Attend 3 Muay Thai sessions a week for 6 weeks",
        "Post 1 progress photo/video tagging the gym",
        "Leave an honest review at the end"
      ],
      guaranteeText: "Literally that's it. If you can commit to those 3 things, you train for free.",
      spotsText: "STRICTLY 12 SPOTS AVAILABLE",
      ctaText: "Apply Now — Claim Your Spot →",
      depositPrice: "$500",
      refundText: "100% REFUNDABLE DEPOSIT"
    },
    // Option B: $149 VIP Fight Pack Challenge
    optionB: {
      headline: "SUNSHINE COAST: Want to step into the ring, get in the best shape of your life, and train like a real fighter in 6 weeks?",
      subheadline: "Most people want to train martial arts, but they get intimidated by toxic gyms, getting beat up on Day 1, or not knowing where to start.",
      dealTitle: "The Solution:",
      dealDesc: "We built The 6-Week \"Fight Ready\" VIP Challenge to give everyday adults a structured, safe, and elite fight camp experience—zero ego, 100% padded safety protocols, and matched only against people your own level.",
      valueStackTitle: "HERE'S EVERYTHING INCLUDED IN YOUR VIP ENTRY:",
      valueItems: [
        { title: "6 Weeks Unlimited Muay Thai Training", desc: "All levels welcome", value: "$450" },
        { title: "Custom Fighter Gear Pack", desc: "Official Gloves, Hand Wraps & Team Tee handed to you on Day 1", value: "$180" },
        { title: "Weekly 1-on-1 Pad-Work Sessions", desc: "Senior coaches fast-track your technique", value: "$300" },
        { title: "Done-For-You Fighter Nutrition Blueprint & Body Comp Scans", desc: "Personalized nutrition plan", value: "$150" },
        { title: "Exclusive Ticket to Exhibition Fight Night + Personal Highlight Reel & Photos", desc: "Professional media coverage", value: "$250" }
      ],
      totalValue: "$1,330",
      vipPrice: "Just $149 today + $49/wk",
      spotsText: "ONLY 15 VIP SPOTS OPEN FOR UPCOMING INTAKE",
      ctaText: "Reserve Your Fighter Pack & Claim Spot →",
      guaranteeText: "Only 15 spots open for the upcoming intake to keep 1-on-1 coaching quality high."
    }
  };

  const selectedVariant = offerData.selectedVariant || 'A';
  const content = selectedVariant === 'A' ? offerData.optionA : offerData.optionB;

  const handleVariantSwitch = (variant) => {
    onOfferChange(slug, 'selectedVariant', variant);
  };

  const handleContentEdit = (field, val) => {
    const variantKey = selectedVariant === 'A' ? 'optionA' : 'optionB';
    const currentVariantData = offerData[variantKey] || {};
    onOfferChange(slug, variantKey, {
      ...currentVariantData,
      [field]: val
    });
  };

  const handleValueItemEdit = (idx, field, val) => {
    const variantKey = selectedVariant === 'A' ? 'optionA' : 'optionB';
    const currentVariantData = offerData[variantKey] || {};
    const items = [...(currentVariantData.valueItems || [])];
    items[idx] = { ...items[idx], [field]: val };
    onOfferChange(slug, variantKey, {
      ...currentVariantData,
      valueItems: items
    });
  };

  const handleAddValueItem = () => {
    const variantKey = selectedVariant === 'A' ? 'optionA' : 'optionB';
    const currentVariantData = offerData[variantKey] || {};
    const items = [...(currentVariantData.valueItems || []), { title: 'New Included Bonus', desc: 'Bonus feature description...', value: '$100' }];
    onOfferChange(slug, variantKey, {
      ...currentVariantData,
      valueItems: items
    });
  };

  const handleDeleteValueItem = (idx) => {
    const variantKey = selectedVariant === 'A' ? 'optionA' : 'optionB';
    const currentVariantData = offerData[variantKey] || {};
    const items = [...(currentVariantData.valueItems || [])];
    items.splice(idx, 1);
    onOfferChange(slug, variantKey, {
      ...currentVariantData,
      valueItems: items
    });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-black overflow-x-hidden">
      
      {/* Micro Top Announcement Bar */}
      <div className="bg-primary-container text-black font-label-mono text-xs py-2 px-4 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md relative z-40">
        <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
        <span>🔥 SUNSHINE COAST EXCLUSIVE INTAKE • LIMITED SPOTS AVAILABLE</span>
      </div>

      <Navbar data={data?.footer} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />

      {/* HERO SECTION: REUSING THE EXACT SAME Hero.jsx REACT COMPONENT AS THE MAIN PAGE */}
      <Hero data={data?.hero} onImageUpload={onImageUpload} isAdmin={isAdmin}>
        <div className="space-y-6 text-center max-w-4xl mx-auto w-full pt-4">
          
          {/* Admin Controls Toolbar */}
          {isAdmin && (
            <div className="bg-surface-container-high/95 border-2 border-primary-container rounded-xl p-4 shadow-2xl space-y-3 font-label-mono text-xs text-left max-w-4xl mx-auto mb-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary-container font-bold text-sm">⚙️ Offer Controls:</span>
                  <span className="text-on-surface-variant font-mono">/offers/{slug}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleVariantSwitch('A')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      selectedVariant === 'A' 
                        ? 'bg-primary-container text-black shadow-lg' 
                        : 'bg-background text-white border border-outline-variant hover:border-primary-container'
                    }`}
                  >
                    🅰️ Option A: 100% Refundable Deposit
                  </button>

                  <button
                    onClick={() => handleVariantSwitch('B')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      selectedVariant === 'B' 
                        ? 'bg-primary-container text-black shadow-lg' 
                        : 'bg-background text-white border border-outline-variant hover:border-primary-container'
                    }`}
                  >
                    🅱️ Option B: $149 VIP Fight Pack
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Intake Badge Pill */}
          <div className="inline-flex items-center gap-2 bg-surface-container-high/90 border border-primary-container/80 px-4 py-1.5 rounded-full text-xs font-label-mono text-primary-container font-bold uppercase tracking-widest shadow-xl backdrop-blur-md">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContentEdit('spotsText', e.target.innerText)}
            >{content.spotsText || "STRICTLY LIMITED INTAKE"}</span>
          </div>

          {/* Main Offer Headline */}
          <h1 className="font-display-xl text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-none tracking-tight drop-shadow-2xl font-extrabold">
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContentEdit('headline', e.target.innerText)}
            >{content.headline}</span>
          </h1>

          {/* Subheadline */}
          <p 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentEdit('subheadline', e.target.innerText)}
            className="text-on-surface-variant font-body-lg text-base sm:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md"
          >
            {content.subheadline}
          </p>

          {/* Pricing Highlight Pill */}
          <div className="pt-2 flex flex-col items-center justify-center">
            <div className="bg-surface-container-high/90 border border-outline-variant px-6 py-4 rounded-xl shadow-2xl flex flex-col sm:flex-row items-center gap-3 backdrop-blur-md">
              {selectedVariant === 'A' ? (
                <>
                  <span className="font-display-xl text-4xl sm:text-5xl text-primary-container font-extrabold">{content.depositPrice || "$500"}</span>
                  <span className="font-label-mono text-xs text-white uppercase font-bold tracking-wider">{content.refundText || "100% REFUNDABLE DEPOSIT"}</span>
                </>
              ) : (
                <>
                  <span className="font-display-xl text-3xl sm:text-4xl text-primary-container font-extrabold">{content.vipPrice || "Just $149 today + $49/wk"}</span>
                  <span className="font-label-mono text-xs text-on-surface-variant uppercase font-bold">TOTAL VALUE: <span className="text-white line-through">{content.totalValue || "$1,330"}</span></span>
                </>
              )}
            </div>
          </div>

          {/* Primary CTA Button (Leads Directly to Contact Page) */}
          <div className="pt-4 max-w-xl mx-auto">
            <a
              href={getAdminHref('/contact', isAdmin)}
              className="w-full btn-clip bg-primary-container text-black font-button-text py-5 px-8 uppercase tracking-widest font-extrabold text-base sm:text-lg hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-[0_10px_35px_rgba(0,229,255,0.4)] cursor-pointer block text-center"
            >
              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentEdit('ctaText', e.target.innerText)}
              >{content.ctaText || "Apply Now — Claim Your Spot →"}</span>
            </a>
          </div>

        </div>
      </Hero>

      {/* LIGHT SECTION 1: DEAL & VALUE STACK (Generous Vertical Spacing) */}
      <section className="bg-tertiary text-on-tertiary-fixed py-20 sm:py-28 md:py-36 clip-slant relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-grid-margin space-y-20 sm:space-y-32">

          {/* THE DEAL & ACCOUNTABILITY SECTION (Generous Vertical Padding) */}
          <div className="py-6 sm:py-12 space-y-8 max-w-4xl mx-auto text-left">
            <h2 className="font-headline-md text-4xl sm:text-5xl uppercase text-on-tertiary-fixed tracking-tight border-b-2 border-on-tertiary-fixed/20 pb-5">
              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentEdit('dealTitle', e.target.innerText)}
              >{content.dealTitle}</span>
            </h2>

            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContentEdit('dealDesc', e.target.innerText)}
              className="text-on-tertiary-fixed-variant font-body-lg text-lg sm:text-xl leading-relaxed whitespace-pre-line"
            >
              {content.dealDesc}
            </p>
          </div>

          {/* VALUE STACK SECTION (Everything Included) */}
          <div className="space-y-8 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentEdit('valueStackTitle', e.target.innerText)}
                className="font-headline-md text-3xl sm:text-4xl uppercase text-on-tertiary-fixed"
              >
                {content.valueStackTitle}
              </h2>

              {isAdmin && (
                <button 
                  onClick={handleAddValueItem}
                  className="btn-clip bg-on-tertiary-fixed text-white font-button-text px-4 py-1.5 text-xs uppercase tracking-widest font-bold hover:bg-primary-container hover:text-black transition-colors"
                >
                  ➕ Add Bonus Item
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5">
              {content.valueItems?.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-outline-variant/40 hover:border-on-tertiary-fixed rounded-xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 flex-grow">
                    <div className="w-10 h-10 rounded-full bg-on-tertiary-fixed text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      <span className="material-symbols-outlined text-primary-container text-xl">check</span>
                    </div>

                    <div className="space-y-1 flex-grow">
                      <h3 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleValueItemEdit(idx, 'title', e.target.innerText)}
                        className="font-headline-md text-xl uppercase text-on-tertiary-fixed"
                      >
                        {item.title}
                      </h3>
                      <p 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleValueItemEdit(idx, 'desc', e.target.innerText)}
                        className="text-on-tertiary-fixed-variant text-xs sm:text-sm"
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="font-label-mono text-xs text-on-tertiary-fixed-variant uppercase font-bold">VALUE:</span>
                    <span 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleValueItemEdit(idx, 'value', e.target.innerText)}
                      className="font-headline-lg text-2xl text-on-tertiary-fixed font-extrabold"
                    >
                      {item.value}
                    </span>

                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteValueItem(idx)}
                        className="bg-danger-red text-white text-xs font-label-mono px-2 py-1 rounded hover:bg-red-700 font-bold ml-2"
                        title="Delete Item"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FULL-VIEWPORT-WIDTH DARK SECTION: THE 3 REQUIREMENTS (Increased Vertical Padding) */}
      {selectedVariant === 'A' && content.requirements && (
        <section className="w-full bg-[#131313] text-white py-24 sm:py-32 md:py-36 border-y-2 border-outline-variant/60 relative z-20 shadow-2xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-grid-margin space-y-16">
            
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold">
                100% GUARANTEED REFUND PROTOCOL
              </span>

              <h2 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentEdit('requirementsTitle', e.target.innerText)}
                className="font-display-xl text-3xl sm:text-5xl uppercase text-white tracking-tight leading-tight"
              >
                {content.requirementsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.requirements?.map((req, rIdx) => (
                <div key={rIdx} className="bg-surface-container-low border border-outline-variant/80 hover:border-primary-container/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between transition-all group">
                  <div className="space-y-5">
                    <span className="w-12 h-12 rounded-xl bg-primary-container text-black font-headline-md text-2xl font-extrabold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      {rIdx + 1}
                    </span>

                    <p 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const updatedReqs = [...content.requirements];
                        updatedReqs[rIdx] = e.target.innerText;
                        handleContentEdit('requirements', updatedReqs);
                      }}
                      className="font-headline-md text-xl sm:text-2xl text-white uppercase tracking-wide leading-snug"
                    >
                      {req}
                    </p>
                  </div>

                  <span className="font-label-mono text-[11px] text-primary-container uppercase tracking-wider font-bold pt-3 border-t border-outline-variant/40 block">
                    REQUIREMENT #{rIdx + 1}
                  </span>
                </div>
              ))}
            </div>

            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContentEdit('guaranteeText', e.target.innerText)}
              className="text-primary-container font-label-mono text-sm sm:text-lg uppercase tracking-wider font-bold text-center pt-6 max-w-2xl mx-auto"
            >
              {content.guaranteeText}
            </p>

          </div>
        </section>
      )}

      {/* UNBOXED LIGHT SECTION 2: BOTTOM CALL TO ACTION BANNER (Leads Directly to Contact Page) */}
      <section className="bg-tertiary text-on-tertiary-fixed py-24 sm:py-32 md:py-36 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-grid-margin text-center space-y-10">
          
          <h2 className="font-display-xl text-4xl sm:text-6xl uppercase text-on-tertiary-fixed leading-tight tracking-tight font-extrabold">
            READY TO TRANSFORM YOUR BODY & MIND IN 6 WEEKS?
          </h2>

          <div className="pt-4 max-w-xl mx-auto">
            <a
              href={getAdminHref('/contact', isAdmin)}
              className="w-full btn-clip bg-primary-container text-black font-button-text py-5 px-8 uppercase tracking-widest font-extrabold text-base sm:text-lg hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-[0_10px_35px_rgba(0,229,255,0.4)] cursor-pointer block text-center"
            >
              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentEdit('ctaText', e.target.innerText)}
              >{content.ctaText || "Apply Now — Claim Your Spot →"}</span>
            </a>
          </div>

        </div>
      </section>

      <Footer data={data?.footer} onChange={onPageFieldChange ? (sec, fld, val) => onPageFieldChange(sec, fld, val) : null} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
