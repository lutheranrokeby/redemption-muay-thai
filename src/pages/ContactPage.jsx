import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage({ data, onContactChange, onImageUpload, onPageFieldChange, onOpenBookingModal, isAdmin }) {
  const contact = data?.contactInfo || {
    title: 'Get In Touch',
    subtitle: 'Join the Redemption Muay Thai Family on the Sunshine Coast.',
    address: 'Warana, Sunshine Coast QLD 4575',
    mapQuery: 'Warana, Sunshine Coast QLD 4575',
    phone: '0400 000 000',
    email: 'info@redemptionmuaythai.com',
    openingHours: 'Mon-Fri: 6:00am - 8:00pm | Sat: 8:00am - 12:00pm | Sun: Closed'
  };

  const mapSearchQuery = contact.mapQuery || contact.address || 'Warana, Sunshine Coast QLD 4575';
  const googleMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapSearchQuery)}&output=embed`;

  // Dynamically load GoHighLevel LeadConnector Form Embed Script
  useEffect(() => {
    const scriptId = 'ghl-form-script';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Navbar data={data?.footer} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />

      <main className="pt-28 sm:pt-32 pb-16 md:pb-section-gap px-4 sm:px-grid-margin max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => onContactChange('title', e.target.innerText)}
            className="font-display-xl text-4xl sm:text-6xl uppercase text-white"
          >
            {contact.title}
          </h1>
          <p 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => onContactChange('subtitle', e.target.innerText)}
            className="text-on-surface-variant font-body-lg text-sm sm:text-base max-w-2xl mx-auto"
          >
            {contact.subtitle}
          </p>
        </div>

        {/* Contact Grid: Reordered on Mobile (Send Us A Message on top on mobile, on right on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Send Us A Message Form Column (Order 1 on mobile, Order 2 on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7 bg-surface-container-high border border-outline-variant rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="font-headline-md uppercase text-white text-xl sm:text-2xl border-b border-outline-variant pb-3">
              Send Us A Message
            </h3>

            <div className="min-h-[745px]">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/SA4A67tEfgN64XYvmrWC"
                style={{ width: '100%', minHeight: '745px', border: 'none', borderRadius: '8px' }}
                id="inline-SA4A67tEfgN64XYvmrWC" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-value=""
                data-form-name="Form 1"
                data-height="745"
                data-layout-iframe-id="inline-SA4A67tEfgN64XYvmrWC"
                data-form-id="SA4A67tEfgN64XYvmrWC"
                data-cookie-consent="true"
                data-cookie-consent-provider="auto"
                title="Redemption Muay Thai Contact Form"
              ></iframe>
            </div>
          </div>

          {/* Gym Information & Location Map Column (Order 2 on mobile, Order 1 on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6">
            
            {/* Gym Info Card */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="font-headline-md uppercase text-primary text-xl mb-2 sm:mb-4">Gym Information</h3>
                <p className="text-on-surface-variant text-xs sm:text-sm">Have questions about class times, private sessions, or memberships? Reach out directly or drop in!</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container text-2xl mt-1">location_on</span>
                  <div>
                    <h4 className="font-label-mono text-xs uppercase text-primary-container font-bold">Location</h4>
                    <p 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onContactChange('address', e.target.innerText)}
                      className="text-white text-sm"
                    >{contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container text-2xl mt-1">call</span>
                  <div>
                    <h4 className="font-label-mono text-xs uppercase text-primary-container font-bold">Phone</h4>
                    <p 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onContactChange('phone', e.target.innerText)}
                      className="text-white text-sm"
                    >{contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container text-2xl mt-1">mail</span>
                  <div>
                    <h4 className="font-label-mono text-xs uppercase text-primary-container font-bold">Email</h4>
                    <p 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onContactChange('email', e.target.innerText)}
                      className="text-white text-sm"
                    >{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container text-2xl mt-1">schedule</span>
                  <div>
                    <h4 className="font-label-mono text-xs uppercase text-primary-container font-bold">Operating Hours</h4>
                    <p 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onContactChange('openingHours', e.target.innerText)}
                      className="text-white text-sm"
                    >{contact.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DYNAMIC GOOGLE MAP CARD (Sits directly underneath Gym Information) */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="font-label-mono text-[11px] text-primary-container uppercase tracking-widest font-bold">FIND OUR FACILITY</span>
                  <h4 className="font-headline-md text-lg uppercase text-white">Location Map</h4>
                </div>
                
                {isAdmin && (
                  <div className="bg-background border border-primary-container/60 p-1.5 rounded flex items-center gap-1.5 text-[11px] font-label-mono w-full sm:w-auto">
                    <span className="text-primary-container font-bold">🗺️ Query:</span>
                    <span 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => onContactChange('mapQuery', e.target.innerText)}
                      className="bg-surface-container-high border border-outline-variant px-1.5 py-0.5 text-white font-mono rounded"
                    >
                      {mapSearchQuery}
                    </span>
                  </div>
                )}
              </div>

              <div className="w-full h-[280px] sm:h-[320px] rounded-lg overflow-hidden border border-outline-variant hover:border-primary-container/80 transition-all duration-300 relative bg-surface-dim">
                <iframe
                  title="Redemption Muay Thai Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.1) saturate(0.9)' }}
                  loading="lazy"
                  allowFullScreen
                  src={googleMapEmbedUrl}
                ></iframe>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer data={data?.footer} onChange={onPageFieldChange ? (sec, fld, val) => onPageFieldChange(sec, fld, val) : null} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
