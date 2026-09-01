import React from 'react';

export default function AdminBar({ onSave, onOpenSettings }) {
  const handleExitAdmin = () => {
    sessionStorage.removeItem('admin_session');
    window.location.href = '/';
  };

  return (
    <div id="admin-bar" className="fixed bottom-0 left-0 w-full bg-surface-container-high border-t-2 border-primary-container z-[100] px-4 sm:px-6 py-3 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-primary-container text-black font-bold text-xs font-label-mono uppercase rounded">
          ✏️ React Admin Visual Edit Mode
        </span>
        <span className="text-xs text-on-surface-variant hidden md:inline">Click any text or hover photos to edit live in React state</span>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
        <button 
          onClick={onOpenSettings}
          className="border border-primary-container text-primary-container font-button-text px-4 py-2 text-xs uppercase tracking-widest hover:bg-primary-container hover:text-black transition-colors font-bold rounded flex items-center gap-1.5"
        >
          ⚙️ Business Settings
        </button>

        <button 
          onClick={onSave} 
          className="btn-clip bg-primary-container text-black font-button-text px-6 py-2 text-xs uppercase tracking-widest hover:bg-white transition-colors font-bold shadow-lg"
        >
          💾 Save & Publish Changes
        </button>

        <button 
          onClick={handleExitAdmin}
          className="border border-outline-variant text-on-surface-variant font-button-text px-3 py-2 text-xs uppercase tracking-widest hover:text-white transition-colors rounded"
        >
          👁️ Exit Admin Mode
        </button>
      </div>
    </div>
  );
}
