import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ClassesPage({ data, onAddClass, onDeleteClass, onClassChange, onClassImageUpload, onPageFieldChange, onOpenBookingModal, isAdmin }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    tag: 'ALL LEVELS',
    description: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEBBX6RDYlRrDuztpkknBmhpVuuaHnH2Lx-UNivxv40QBlw8j715ZwVeaROrY07ASz_N15X3JOtl9b_aT3h1STuelpSBghAd7vt_HR33x90dvBTHnqgmdTUN0WcRbnBkkxTi_rrJZvhiw4Q3hjgjjN2woWAMinzUvfc5i7nX_eJbDgu1K7jXcVrX6hgTSnWd3gq7Kvjtg-6IYoEUmYdxuMXHYAPX8Pw79ZPgauTyhaPYqjrY9huVaUUw'
  });

  const handleCreate = () => {
    if (!newClass.title) return alert('Please enter class title');
    onAddClass({ ...newClass, id: `class-${Date.now()}` });
    setShowAddModal(false);
    setNewClass({
      title: '',
      tag: 'ALL LEVELS',
      description: '',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEBBX6RDYlRrDuztpkknBmhpVuuaHnH2Lx-UNivxv40QBlw8j715ZwVeaROrY07ASz_N15X3JOtl9b_aT3h1STuelpSBghAd7vt_HR33x90dvBTHnqgmdTUN0WcRbnBkkxTi_rrJZvhiw4Q3hjgjjN2woWAMinzUvfc5i7nX_eJbDgu1K7jXcVrX6hgTSnWd3gq7Kvjtg-6IYoEUmYdxuMXHYAPX8Pw79ZPgauTyhaPYqjrY9huVaUUw'
    });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Navbar data={data?.footer} onImageUpload={onClassImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />

      <main className="pt-28 sm:pt-32 pb-16 md:pb-section-gap px-4 sm:px-grid-margin max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="font-display-xl text-4xl sm:text-6xl uppercase text-white">
            All Training <span className="text-primary-container">Classes</span>
          </h1>
          <p className="text-on-surface-variant font-body-lg text-sm sm:text-base max-w-2xl mx-auto">
            From foundation striking to championship ring preparation, explore our specialized Muay Thai and conditioning programs.
          </p>

          {isAdmin && (
            <div className="pt-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn-clip bg-primary-container text-black font-button-text px-8 py-3 uppercase tracking-widest hover:bg-white transition-colors shadow-xl text-sm font-bold"
              >
                ➕ Add New Class
              </button>
            </div>
          )}
        </div>

        {/* Classes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter">
          {data?.classes?.map((item, index) => (
            <div key={item.id || index} className="bg-surface-container-low relative group overflow-hidden border border-outline-variant hover:border-primary-container transition-all duration-300 rounded-xl shadow-2xl">
              
              {isAdmin && (
                <button 
                  onClick={() => onDeleteClass(index)}
                  className="absolute top-2 left-2 bg-danger-red text-white text-[10px] font-label-mono px-2 py-1 rounded z-30 shadow-md"
                >
                  🗑️ Delete Class
                </button>
              )}

              <div className="h-64 relative img-container">
                <img className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-all duration-700" src={item.image} alt={item.title} />
                
                {isAdmin && (
                  <div className="img-edit-overlay absolute inset-0 bg-black/60 items-center justify-center z-20 flex p-2">
                    <label className="btn-clip bg-primary-container text-black font-button-text px-4 py-2 text-xs uppercase cursor-pointer font-bold">
                      📷 Change Photo
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => onClassImageUpload(e, index)} />
                    </label>
                  </div>
                )}

                <div className="absolute top-0 right-0 h-full w-9 bg-black/70 backdrop-blur-sm flex items-center justify-center border-l border-primary-container/30">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onClassChange(index, 'tag', e.target.innerText)}
                    className="font-label-mono text-xs text-primary-container -rotate-90 whitespace-nowrap tracking-widest font-bold"
                  >{item.tag}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onClassChange(index, 'title', e.target.innerText)}
                  className="font-headline-md text-2xl uppercase text-primary tracking-wide"
                >{item.title}</h3>
                
                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onClassChange(index, 'description', e.target.innerText)}
                  className="text-on-surface-variant text-sm leading-relaxed"
                >{item.description}</p>

                <a href="/timetable" className="inline-flex items-center gap-2 font-label-mono text-xs text-primary-container uppercase font-bold hover:text-white transition-colors pt-2">
                  View Timetable Schedule <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-primary-container rounded-lg p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-md uppercase text-primary text-xl sm:text-2xl border-b border-outline-variant pb-2">Add New Class Program</h3>
            
            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Program Title</label>
              <input type="text" value={newClass.title} onChange={(e) => setNewClass({...newClass, title: e.target.value})} placeholder="e.g. Sparring & Clinch" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Tag / Level</label>
              <input type="text" value={newClass.tag} onChange={(e) => setNewClass({...newClass, tag: e.target.value})} placeholder="e.g. ADVANCED, ALL LEVELS" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Description</label>
              <textarea rows="3" value={newClass.description} onChange={(e) => setNewClass({...newClass, description: e.target.value})} placeholder="Class description..." className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm"></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-on-surface-variant uppercase">Cancel</button>
              <button onClick={handleCreate} className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 text-sm uppercase font-bold">Save Program</button>
            </div>
          </div>
        </div>
      )}

      <Footer data={data?.footer} onChange={onPageFieldChange ? (sec, fld, val) => onPageFieldChange(sec, fld, val) : null} onImageUpload={onClassImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
