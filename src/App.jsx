import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CoachesPage from './pages/CoachesPage';
import ClassesPage from './pages/ClassesPage';
import TimetablePage from './pages/TimetablePage';
import MembershipsPage from './pages/MembershipsPage';
import ContactPage from './pages/ContactPage';
import AdminBar from './components/AdminBar';
import BusinessSettingsModal from './components/BusinessSettingsModal';
import TrialBookingModal from './components/TrialBookingModal';
import { getSiteContent, saveSiteContent, uploadImageFile } from './lib/supabaseClient';

const rawEnvPass = import.meta.env.VITE_ADMIN_PASSWORD || '';
const ADMIN_PASSWORD = rawEnvPass.replace(/^["']|["']$/g, '').trim();

export default function App() {
  const [contentData, setContentData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);

  const path = window.location.pathname;

  // Enforce Strict Isolation: Admin Mode active ONLY on /admin routes
  useEffect(() => {
    setIsAdmin(path.startsWith('/admin'));
    fetchContent();
  }, [path]);

  const fetchContent = async () => {
    try {
      const data = await getSiteContent();
      setContentData(data);
    } catch (err) {
      console.error('Failed to load site content', err);
    }
  };

  // Generic Section Field Updater
  const handleFieldChange = (section, field, value) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  // Generic List Operations Helper (Coaches, Classes, Timetable, Memberships)
  const updateList = (listKey, updater) => {
    setContentData(prev => ({
      ...prev,
      [listKey]: updater(prev[listKey] || [])
    }));
  };

  const handleAddListItem = (listKey, newItem) => {
    updateList(listKey, (list) => [...list, newItem]);
  };

  const handleDeleteListItem = (listKey, index, promptMsg) => {
    if (promptMsg && !confirm(promptMsg)) return;
    updateList(listKey, (list) => {
      const copy = [...list];
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleUpdateListItem = (listKey, index, field, value) => {
    updateList(listKey, (list) => {
      const copy = [...list];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Image Upload Helper
  const handleImageUpload = async (e, section, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await uploadImageFile(file);
      if (data.success) {
        handleFieldChange(section, field, data.url);
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  const handleListImageUpload = async (e, listKey, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await uploadImageFile(file);
      if (data.success) {
        handleUpdateListItem(listKey, index, 'image', data.url);
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  // Business Settings Handler
  const handleSaveBusinessSettings = (settings) => {
    setContentData(prev => ({
      ...prev,
      contactInfo: {
        ...(prev.contactInfo || {}),
        address: settings.location,
        phone: settings.phone,
        email: settings.email,
        openingHours: settings.openingHours
      },
      footer: {
        ...(prev.footer || {}),
        location: settings.location,
        phone: settings.phone,
        email: settings.email,
        instagram: settings.instagram,
        facebook: settings.facebook,
        youtube: settings.youtube
      }
    }));
    alert('✅ Business Settings updated throughout the site! Click "Save & Publish Changes" to save permanently.');
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    if (!ADMIN_PASSWORD) {
      return alert('⚠️ Admin password environment variable VITE_ADMIN_PASSWORD is not configured. Please set VITE_ADMIN_PASSWORD in Netlify Environment Variables.');
    }
    if (password.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password.');
    }
  };

  const handleSave = async () => {
    try {
      const res = await saveSiteContent(contentData);
      if (res.success) {
        alert('🎉 Changes saved & published successfully!');
      }
    } catch (err) {
      alert('Failed to save changes');
    }
  };

  if (!contentData) {
    return (
      <div className="min-h-screen bg-[#131313] text-white flex flex-col items-center justify-center p-6 space-y-6 select-none">
        <div className="text-center space-y-2">
          <h1 className="font-headline-lg text-4xl sm:text-6xl italic tracking-widest uppercase text-white font-extrabold">
            REDEMPTION <span className="text-primary-container not-italic">MUAY THAI</span>
          </h1>
          <p className="font-label-mono text-xs text-on-surface-variant uppercase tracking-widest">
            Sunshine Coast, QLD • Premier Striking Facility
          </p>
        </div>
        <div className="w-64 sm:w-80 h-2 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/60 shadow-xl relative">
          <div className="h-full bg-primary-container rounded-full animate-pulse w-full origin-left transition-all duration-500"></div>
        </div>
        <div className="flex items-center gap-2 text-xs font-label-mono text-primary-container uppercase font-bold tracking-widest pt-2">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
          <span>Loading Site Content...</span>
        </div>
      </div>
    );
  }

  const isUnderAdminRoute = path.startsWith('/admin');
  const adminMode = isUnderAdminRoute && isAuthenticated;
  const openModal = () => setShowTrialModal(true);

  const renderCurrentPage = () => {
    if (path === '/coaches' || path === '/admin/coaches') {
      return (
        <CoachesPage 
          data={contentData} 
          onAddCoach={(item) => handleAddListItem('coachesList', item)}
          onDeleteCoach={(idx) => handleDeleteListItem('coachesList', idx, 'Are you sure you want to delete this coach?')}
          onCoachChange={(idx, fld, val) => handleUpdateListItem('coachesList', idx, fld, val)}
          onImageUpload={handleImageUpload}
          onPageFieldChange={handleFieldChange}
          onOpenBookingModal={openModal}
          isAdmin={adminMode}
        />
      );
    }

    if (path === '/classes' || path === '/admin/classes') {
      return (
        <ClassesPage 
          data={contentData}
          onAddClass={(item) => handleAddListItem('classes', item)}
          onDeleteClass={(idx) => handleDeleteListItem('classes', idx, 'Are you sure you want to delete this class?')}
          onClassChange={(idx, fld, val) => handleUpdateListItem('classes', idx, fld, val)}
          onClassImageUpload={(e, idx) => handleListImageUpload(e, 'classes', idx)}
          onPageFieldChange={handleFieldChange}
          onImageUpload={handleImageUpload}
          onOpenBookingModal={openModal}
          isAdmin={adminMode}
        />
      );
    }

    if (path === '/timetable' || path === '/admin/timetable') {
      return (
        <TimetablePage 
          data={contentData}
          onAddSlot={(item) => handleAddListItem('timetableData', item)}
          onDeleteSlot={(idx) => handleDeleteListItem('timetableData', idx, 'Are you sure you want to delete this timetable slot?')}
          onSlotChange={(idx, fld, val) => handleUpdateListItem('timetableData', idx, fld, val)}
          onPageFieldChange={handleFieldChange}
          onImageUpload={handleImageUpload}
          onOpenBookingModal={openModal}
          isAdmin={adminMode}
        />
      );
    }

    if (path === '/memberships' || path === '/admin/memberships') {
      return (
        <MembershipsPage 
          data={contentData}
          onAddMembership={(item) => handleAddListItem('memberships', item)}
          onDeleteMembership={(idx) => handleDeleteListItem('memberships', idx, 'Are you sure you want to delete this membership plan?')}
          onMembershipChange={(idx, fld, val) => handleUpdateListItem('memberships', idx, fld, val)}
          onPageFieldChange={handleFieldChange}
          onImageUpload={handleImageUpload}
          onOpenBookingModal={openModal}
          isAdmin={adminMode}
        />
      );
    }

    if (path === '/contact' || path === '/admin/contact') {
      return (
        <ContactPage 
          data={contentData}
          onContactChange={(fld, val) => handleFieldChange('contactInfo', fld, val)}
          onPageFieldChange={handleFieldChange}
          onImageUpload={handleImageUpload}
          onOpenBookingModal={openModal}
          isAdmin={adminMode}
        />
      );
    }

    return (
      <HomePage 
        data={contentData}
        onChange={handleFieldChange}
        onImageUpload={handleImageUpload}
        onClassChange={(idx, fld, val) => handleUpdateListItem('classes', idx, fld, val)}
        onClassImageUpload={(e, idx) => handleListImageUpload(e, 'classes', idx)}
        onAddBentoCard={() => {
          const newCard = { id: `b-${Date.now()}`, title: 'New Feature', desc: 'Custom feature description...', icon: 'fitness_center' };
          handleAddListItem('welcome.bentoCards', newCard);
        }}
        onDeleteBentoCard={(idx) => handleDeleteListItem('welcome.bentoCards', idx, 'Are you sure you want to delete this feature card?')}
        onOpenBookingModal={openModal}
        isAdmin={adminMode}
      />
    );
  };

  return (
    <div className={isUnderAdminRoute && isAuthenticated ? 'edit-mode' : ''}>
      {isUnderAdminRoute && !isAuthenticated && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <form onSubmit={handleLoginSubmit} className="bg-surface-container-low border border-primary-container rounded-lg p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="border-b border-outline-variant pb-4">
              <h3 className="font-headline-md uppercase text-primary text-2xl">React Admin Portal</h3>
              <p className="text-xs text-on-surface-variant mt-1">Authenticating for Redemption Muay Thai CMS</p>
            </div>
            
            {!ADMIN_PASSWORD ? (
              <div className="bg-danger-red/20 border border-danger-red p-4 rounded text-xs text-white space-y-2">
                <p className="font-bold text-danger-red">⚠️ Missing Environment Variable</p>
                <p>The <code className="bg-black/60 px-1 py-0.5 rounded text-primary-container">VITE_ADMIN_PASSWORD</code> environment variable was not detected during build time.</p>
                <p className="text-[11px] text-on-surface-variant">Add <code className="text-white">VITE_ADMIN_PASSWORD=your_password</code> in Netlify Environment Variables.</p>
              </div>
            ) : (
              <div>
                <label className="block font-label-mono text-xs text-primary-container mb-2 uppercase">Admin Password</label>
                <input 
                  type="password" 
                  autoFocus
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..." 
                  className="w-full bg-background border border-outline-variant text-white p-3 rounded font-label-mono text-sm focus:border-primary-container focus:outline-none" 
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <a href="/" className="px-4 py-2 text-xs text-on-surface-variant uppercase flex items-center">Return to Site</a>
              {ADMIN_PASSWORD && (
                <button type="submit" className="btn-clip bg-primary-container text-black font-button-text px-6 py-3 text-sm uppercase tracking-widest font-bold">
                  Unlock CMS Editor
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {renderCurrentPage()}

      {/* Global Mobile & Desktop Optimized Trial Booking Modal with Admin Editing */}
      <TrialBookingModal 
        isOpen={showTrialModal} 
        onClose={() => setShowTrialModal(false)} 
        data={contentData}
        onChange={handleFieldChange}
        isAdmin={adminMode}
      />

      {isUnderAdminRoute && isAuthenticated && (
        <AdminBar 
          onSave={handleSave} 
          onOpenSettings={() => setShowSettingsModal(true)} 
        />
      )}

      {showSettingsModal && (
        <BusinessSettingsModal 
          data={contentData}
          onSaveSettings={handleSaveBusinessSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}
