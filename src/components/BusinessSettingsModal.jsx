import React, { useState } from 'react';

export default function BusinessSettingsModal({ data, onSaveSettings, onClose }) {
  const [settings, setSettings] = useState({
    location: data?.contactInfo?.address || data?.footer?.location || 'Warana, Sunshine Coast QLD 4575',
    phone: data?.contactInfo?.phone || data?.footer?.phone || '0400 000 000',
    email: data?.contactInfo?.email || data?.footer?.email || 'info@redemptionmuaythai.com',
    openingHours: data?.contactInfo?.openingHours || 'Mon-Fri: 6:00am - 8:00pm | Sat: 8:00am - 12:00pm | Sun: Closed',
    instagram: data?.footer?.instagram || 'https://instagram.com',
    facebook: data?.footer?.facebook || 'https://facebook.com',
    youtube: data?.footer?.youtube || 'https://youtube.com'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[300] flex items-center justify-center p-4">
      <div className="bg-surface-container-low border border-primary-container rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-on-surface">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant pb-4">
          <div>
            <h3 className="font-headline-md uppercase text-primary text-2xl tracking-wide">
              ⚙️ Global Business Settings
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Changes updated here apply automatically across the whole website.
            </p>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-white text-xl font-bold p-1">
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Location */}
          <div>
            <label className="block text-xs font-label-mono text-primary-container mb-1.5 uppercase font-bold">
              📍 Gym Location / Address
            </label>
            <input 
              type="text" 
              required
              value={settings.location} 
              onChange={(e) => setSettings({ ...settings, location: e.target.value })} 
              placeholder="e.g. Warana, Sunshine Coast QLD 4575" 
              className="w-full bg-background border border-outline-variant p-3 rounded-lg text-white text-sm focus:border-primary-container focus:outline-none" 
            />
          </div>

          {/* 2. Phone & 3. Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1.5 uppercase font-bold">
                📞 Phone Number
              </label>
              <input 
                type="text" 
                required
                value={settings.phone} 
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })} 
                placeholder="e.g. 0400 000 000" 
                className="w-full bg-background border border-outline-variant p-3 rounded-lg text-white text-sm focus:border-primary-container focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1.5 uppercase font-bold">
                ✉️ Email Address
              </label>
              <input 
                type="email" 
                required
                value={settings.email} 
                onChange={(e) => setSettings({ ...settings, email: e.target.value })} 
                placeholder="info@redemptionmuaythai.com" 
                className="w-full bg-background border border-outline-variant p-3 rounded-lg text-white text-sm focus:border-primary-container focus:outline-none" 
              />
            </div>
          </div>

          {/* 4. Operating Hours */}
          <div>
            <label className="block text-xs font-label-mono text-primary-container mb-1.5 uppercase font-bold">
              ⏰ Operating Hours
            </label>
            <textarea 
              rows="2"
              required
              value={settings.openingHours} 
              onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })} 
              placeholder="Mon-Fri: 6:00am - 8:00pm | Sat: 8:00am - 12:00pm | Sun: Closed" 
              className="w-full bg-background border border-outline-variant p-3 rounded-lg text-white text-sm focus:border-primary-container focus:outline-none" 
            ></textarea>
          </div>

          {/* 5. Social Links */}
          <div className="border-t border-outline-variant/60 pt-4 space-y-3">
            <h4 className="font-label-mono text-xs uppercase text-primary-container font-bold tracking-wider">
              🌐 Social Media Handles & Links
            </h4>

            <div>
              <label className="block text-[11px] font-label-mono text-on-surface-variant mb-1 uppercase">Instagram URL</label>
              <input 
                type="url" 
                value={settings.instagram} 
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} 
                placeholder="https://instagram.com/redemptionmuaythai" 
                className="w-full bg-background border border-outline-variant p-2.5 rounded-lg text-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-label-mono text-on-surface-variant mb-1 uppercase">Facebook URL</label>
              <input 
                type="url" 
                value={settings.facebook} 
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} 
                placeholder="https://facebook.com/redemptionmuaythai" 
                className="w-full bg-background border border-outline-variant p-2.5 rounded-lg text-white text-sm" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-label-mono text-on-surface-variant mb-1 uppercase">YouTube URL</label>
              <input 
                type="url" 
                value={settings.youtube} 
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })} 
                placeholder="https://youtube.com/c/redemptionmuaythai" 
                className="w-full bg-background border border-outline-variant p-2.5 rounded-lg text-white text-sm" 
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2.5 text-xs text-on-surface-variant uppercase font-bold hover:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 text-sm uppercase font-bold shadow-xl hover:bg-white transition-colors"
            >
              Save Global Settings
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
