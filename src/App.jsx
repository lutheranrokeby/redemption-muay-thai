import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CoachesPage from './pages/CoachesPage';
import ClassesPage from './pages/ClassesPage';
import TimetablePage from './pages/TimetablePage';
import ContactPage from './pages/ContactPage';
import AdminBar from './components/AdminBar';
import BusinessSettingsModal from './components/BusinessSettingsModal';
import { getSiteContent, saveSiteContent, uploadImageFile } from './lib/supabaseClient';

// Strictly require VITE_ADMIN_PASSWORD environment variable (no fallback)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

export default function App() {
  const [contentData, setContentData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const path = window.location.pathname;

  useEffect(() => {
    if (path.startsWith('/admin')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    fetchContent();
  }, [path]);

  const fetchContent = async () => {
    try {
      const data = await getSiteContent();
      setContentData(data);
    } catch (err) {
      console.error('Failed to load content', err);
    }
  };

  const handleFieldChange = (section, field, value) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Global Business Settings Handler
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

  const handleImageUpload = async (e, section, field) => {
    const file = e.target.files[0];
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

  // Bento Card Handlers
  const handleAddBentoCard = () => {
    setContentData(prev => {
      const existing = prev.welcome.bentoCards || [
        { id: 'b1', title: prev.welcome.bento1Title || 'No Ego', desc: prev.welcome.bento1Desc || 'Train hard, stay humble. Everyone is family here.', icon: 'sports_martial_arts' },
        { id: 'b2', title: prev.welcome.bento2Title || 'All Levels', desc: prev.welcome.bento2Desc || 'From seasoned fighters to day-one beginners.', bg: prev.welcome.bento2Bg }
      ];
      const newCard = {
        id: `b-${Date.now()}`,
        title: 'New Feature',
        desc: 'Custom feature description...',
        icon: 'fitness_center'
      };
      return {
        ...prev,
        welcome: {
          ...prev.welcome,
          bentoCards: [...existing, newCard]
        }
      };
    });
  };

  const handleDeleteBentoCard = (index) => {
    if (!confirm('Are you sure you want to delete this feature card?')) return;
    setContentData(prev => {
      const existing = prev.welcome.bentoCards || [
        { id: 'b1', title: prev.welcome.bento1Title || 'No Ego', desc: prev.welcome.bento1Desc || 'Train hard, stay humble. Everyone is family here.', icon: 'sports_martial_arts' },
        { id: 'b2', title: prev.welcome.bento2Title || 'All Levels', desc: prev.welcome.bento2Desc || 'From seasoned fighters to day-one beginners.', bg: prev.welcome.bento2Bg }
      ];
      const newList = [...existing];
      newList.splice(index, 1);
      return {
        ...prev,
        welcome: {
          ...prev.welcome,
          bentoCards: newList
        }
      };
    });
  };

  // Coaches Handlers
  const handleAddCoach = (newCoach) => {
    setContentData(prev => ({
      ...prev,
      coachesList: [...(prev.coachesList || []), newCoach]
    }));
  };

  const handleDeleteCoach = (index) => {
    if (!confirm('Are you sure you want to delete this coach?')) return;
    setContentData(prev => {
      const newList = [...(prev.coachesList || [])];
      newList.splice(index, 1);
      return { ...prev, coachesList: newList };
    });
  };

  const handleCoachChange = (index, field, value) => {
    setContentData(prev => {
      const newList = [...(prev.coachesList || [])];
      newList[index] = { ...newList[index], [field]: value };
      return { ...prev, coachesList: newList };
    });
  };

  const handleCoachImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await uploadImageFile(file);
      if (data.success) {
        handleCoachChange(index, 'image', data.url);
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  // Classes Handlers
  const handleAddClass = (newClass) => {
    setContentData(prev => ({
      ...prev,
      classes: [...(prev.classes || []), newClass]
    }));
  };

  const handleDeleteClass = (index) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    setContentData(prev => {
      const newList = [...(prev.classes || [])];
      newList.splice(index, 1);
      return { ...prev, classes: newList };
    });
  };

  const handleClassChange = (index, field, value) => {
    setContentData(prev => {
      const newList = [...(prev.classes || [])];
      newList[index] = { ...newList[index], [field]: value };
      return { ...prev, classes: newList };
    });
  };

  const handleClassImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await uploadImageFile(file);
      if (data.success) {
        handleClassChange(index, 'image', data.url);
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  // Timetable Handlers
  const handleAddSlot = (newSlot) => {
    setContentData(prev => ({
      ...prev,
      timetableData: [...(prev.timetableData || []), newSlot]
    }));
  };

  const handleDeleteSlot = (index) => {
    if (!confirm('Are you sure you want to delete this timetable slot?')) return;
    setContentData(prev => {
      const newList = [...(prev.timetableData || [])];
      newList.splice(index, 1);
      return { ...prev, timetableData: newList };
    });
  };

  const handleSlotChange = (index, field, value) => {
    setContentData(prev => {
      const newList = [...(prev.timetableData || [])];
      newList[index] = { ...newList[index], [field]: value };
      return { ...prev, timetableData: newList };
    });
  };

  // Contact Handlers
  const handleContactChange = (field, value) => {
    setContentData(prev => ({
      ...prev,
      contactInfo: {
        ...(prev.contactInfo || {}),
        [field]: value
      }
    }));
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();

    if (!ADMIN_PASSWORD) {
      return alert('⚠️ Admin password environment variable VITE_ADMIN_PASSWORD is not configured. Please set VITE_ADMIN_PASSWORD in your .env file or Netlify environment variables.');
    }
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password. Please check VITE_ADMIN_PASSWORD environment variable and try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    window.location.href = '/';
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
    return <div className="min-h-screen bg-background text-white flex items-center justify-center font-label-mono">Loading React Application...</div>;
  }

  const renderCurrentPage = () => {
    const adminMode = isAdmin && isAuthenticated;

    if (path === '/coaches' || path === '/admin/coaches') {
      return (
        <CoachesPage 
          data={contentData} 
          onAddCoach={handleAddCoach}
          onDeleteCoach={handleDeleteCoach}
          onCoachChange={handleCoachChange}
          onImageUpload={handleCoachImageUpload}
          isAdmin={adminMode}
        />
      );
    }

    if (path === '/classes' || path === '/admin/classes') {
      return (
        <ClassesPage 
          data={contentData}
          onAddClass={handleAddClass}
          onDeleteClass={handleDeleteClass}
          onClassChange={handleClassChange}
          onClassImageUpload={handleClassImageUpload}
          isAdmin={adminMode}
        />
      );
    }

    if (path === '/timetable' || path === '/admin/timetable') {
      return (
        <TimetablePage 
          data={contentData}
          onAddSlot={handleAddSlot}
          onDeleteSlot={handleDeleteSlot}
          onSlotChange={handleSlotChange}
          isAdmin={adminMode}
        />
      );
    }

    if (path === '/contact' || path === '/admin/contact') {
      return (
        <ContactPage 
          data={contentData}
          onContactChange={handleContactChange}
          isAdmin={adminMode}
        />
      );
    }

    return (
      <HomePage 
        data={contentData}
        onChange={handleFieldChange}
        onImageUpload={handleImageUpload}
        onClassChange={handleClassChange}
        onClassImageUpload={handleClassImageUpload}
        onAddBentoCard={handleAddBentoCard}
        onDeleteBentoCard={handleDeleteBentoCard}
        isAdmin={adminMode}
      />
    );
  };

  return (
    <div className={isAdmin && isAuthenticated ? 'edit-mode' : ''}>
      {isAdmin && !isAuthenticated && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <form onSubmit={handleLoginSubmit} className="bg-surface-container-low border border-primary-container rounded-lg p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="border-b border-outline-variant pb-4">
              <h3 className="font-headline-md uppercase text-primary text-2xl">React Admin Portal</h3>
              <p className="text-xs text-on-surface-variant mt-1">Authenticating for Redemption Muay Thai CMS</p>
            </div>
            
            {!ADMIN_PASSWORD ? (
              <div className="bg-danger-red/20 border border-danger-red p-4 rounded text-xs text-white space-y-2">
                <p className="font-bold text-danger-red">⚠️ Missing Environment Variable</p>
                <p>The <code className="bg-black/60 px-1 py-0.5 rounded text-primary-container">VITE_ADMIN_PASSWORD</code> environment variable is not defined.</p>
                <p className="text-[11px] text-on-surface-variant">Add <code className="text-white">VITE_ADMIN_PASSWORD=your_password</code> in your local <code className="text-white">.env</code> file or Netlify environment variables.</p>
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
                <p className="text-[10px] text-on-surface-variant mt-1.5">Authenticated via <code className="text-primary-container">VITE_ADMIN_PASSWORD</code> environment variable.</p>
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

      {isAdmin && isAuthenticated && (
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
