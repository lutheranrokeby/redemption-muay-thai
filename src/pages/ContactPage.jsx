import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage({ data, onContactChange, isAdmin }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert('Please complete required fields');
    setFormSubmitted(true);
  };

  const contact = data?.contactInfo || {
    title: 'Get In Touch',
    subtitle: 'Join the Redemption Muay Thai Family on the Sunshine Coast.',
    address: 'Warana, Sunshine Coast QLD 4575',
    phone: '0400 000 000',
    email: 'info@redemptionmuaythai.com',
    openingHours: 'Mon-Fri: 6:00am - 8:00pm | Sat: 8:00am - 12:00pm | Sun: Closed'
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Navbar isAdmin={isAdmin} />

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

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant rounded-lg p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-xl">
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

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7 bg-surface-container-high border border-outline-variant rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="font-headline-md uppercase text-white text-xl sm:text-2xl border-b border-outline-variant pb-3">Send Us A Message</h3>

            {formSubmitted ? (
              <div className="bg-primary-container/20 border border-primary-container text-primary p-6 rounded text-center space-y-3">
                <span className="material-symbols-outlined text-5xl">check_circle</span>
                <h4 className="font-headline-md text-xl uppercase text-white">Message Sent Successfully!</h4>
                <p className="text-sm text-on-surface-variant">Thank you for reaching out to Redemption Muay Thai. Our team will contact you shortly.</p>
                <button onClick={() => setFormSubmitted(false)} className="btn-clip bg-primary-container text-black font-button-text px-6 py-2 text-xs uppercase font-bold">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">Your Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Alex Smith" className="w-full bg-background border border-outline-variant p-3 rounded text-white text-base sm:text-sm focus:border-primary-container focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="alex@example.com" className="w-full bg-background border border-outline-variant p-3 rounded text-white text-base sm:text-sm focus:border-primary-container focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="0400 000 000" className="w-full bg-background border border-outline-variant p-3 rounded text-white text-base sm:text-sm focus:border-primary-container focus:outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">Message *</label>
                  <textarea rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us about your fitness goals or questions..." className="w-full bg-background border border-outline-variant p-3 rounded text-white text-base sm:text-sm focus:border-primary-container focus:outline-none"></textarea>
                </div>

                <button type="submit" className="btn-clip bg-primary-container text-black font-button-text px-8 py-4 uppercase tracking-widest hover:bg-white transition-colors w-full font-bold shadow-xl text-sm sm:text-base">
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      <Footer data={data?.footer} isAdmin={isAdmin} />
    </div>
  );
}
