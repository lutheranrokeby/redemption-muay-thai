import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CoachesPage({ data, onAddCoach, onDeleteCoach, onCoachChange, onImageUpload, onPageFieldChange, onOpenBookingModal, isAdmin }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoach, setNewCoach] = useState({
    name: '',
    subtitle: '',
    badge: 'COACH',
    bio: '',
    achievements: ['4x WMC State Champion', '10+ Years Ring Experience'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEBBX6RDYlRrDuztpkknBmhpVuuaHnH2Lx-UNivxv40QBlw8j715ZwVeaROrY07ASz_N15X3JOtl9b_aT3h1STuelpSBghAd7vt_HR33x90dvBTHnqgmdTUN0WcRbnBkkxTi_rrJZvhiw4Q3hjgjjN2woWAMinzUvfc5i7nX_eJbDgu1K7jXcVrX6hgTSnWd3gq7Kvjtg-6IYoEUmYdxuMXHYAPX8Pw79ZPgauTyhaPYqjrY9huVaUUw'
  });

  const handleCreate = () => {
    if (!newCoach.name) return alert('Please enter coach name');
    onAddCoach({ ...newCoach, id: `coach-${Date.now()}` });
    setShowAddModal(false);
    setNewCoach({
      name: '',
      subtitle: '',
      badge: 'COACH',
      bio: '',
      achievements: ['4x WMC State Champion', '10+ Years Ring Experience'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEBBX6RDYlRrDuztpkknBmhpVuuaHnH2Lx-UNivxv40QBlw8j715ZwVeaROrY07ASz_N15X3JOtl9b_aT3h1STuelpSBghAd7vt_HR33x90dvBTHnqgmdTUN0WcRbnBkkxTi_rrJZvhiw4Q3hjgjjN2woWAMinzUvfc5i7nX_eJbDgu1K7jXcVrX6hgTSnWd3gq7Kvjtg-6IYoEUmYdxuMXHYAPX8Pw79ZPgauTyhaPYqjrY9huVaUUw'
    });
  };

  const handleAddAchievement = (coachIndex) => {
    const coach = data.coachesList[coachIndex];
    const newAch = [...(coach.achievements || []), 'New Title / Achievement'];
    onCoachChange(coachIndex, 'achievements', newAch);
  };

  const handleRemoveAchievement = (coachIndex, achIndex) => {
    const coach = data.coachesList[coachIndex];
    const newAch = [...(coach.achievements || [])];
    newAch.splice(achIndex, 1);
    onCoachChange(coachIndex, 'achievements', newAch);
  };

  const handleHeaderChange = (field, value) => {
    if (onPageFieldChange) {
      onPageFieldChange('coachesPage', field, value);
    }
  };

  const pageMeta = data?.coachesPage || {};

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Navbar data={data?.footer} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />

      <main className="pt-28 sm:pt-36 pb-16 md:pb-section-gap px-4 sm:px-grid-margin max-w-7xl mx-auto">
        
        {/* ASYMMETRIC CREATIVE 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT STICKY COLUMN */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-8">
            
            <div className="space-y-4 border-l-4 border-l-primary-container pl-4 sm:pl-6">
              <span 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleHeaderChange('tagline', e.target.innerText)}
                className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold block"
              >
                {pageMeta.tagline || "CHAMPIONSHIP LINEAGE"}
              </span>

              <h1 className="font-display-xl text-4xl sm:text-6xl uppercase text-white leading-none tracking-tight">
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('title', e.target.innerText)}
                >{pageMeta.title || "Meet Our Coaches"}</span>
              </h1>

              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleHeaderChange('intro', e.target.innerText)}
                className="text-on-surface-variant font-body-lg text-base sm:text-lg leading-relaxed pt-2"
              >
                {pageMeta.intro || "Our coaching team brings decades of championship ring experience, technical mastery, and passion for community building to the Sunshine Coast."}
              </p>
            </div>

            {/* Athletic Stats Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-surface-container-low border border-outline-variant p-4 rounded text-left space-y-1">
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('stat1Val', e.target.innerText)}
                  className="font-display-xl text-3xl text-primary-container font-bold block"
                >{pageMeta.stat1Val || "12+"}</span>
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('stat1Lbl', e.target.innerText)}
                  className="block font-label-mono text-[11px] text-on-surface-variant uppercase"
                >{pageMeta.stat1Lbl || "Years Ring Experience"}</span>
              </div>

              <div className="bg-surface-container-low border border-outline-variant p-4 rounded text-left space-y-1">
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('stat2Val', e.target.innerText)}
                  className="font-display-xl text-3xl text-primary-container font-bold block"
                >{pageMeta.stat2Val || "6x"}</span>
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('stat2Lbl', e.target.innerText)}
                  className="block font-label-mono text-[11px] text-on-surface-variant uppercase"
                >{pageMeta.stat2Lbl || "WMC & IFMA Belts"}</span>
              </div>
            </div>

            {/* Admin Add Coach Button */}
            {isAdmin && (
              <div className="pt-2">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full btn-clip bg-primary-container text-black font-button-text py-4 uppercase tracking-widest hover:bg-white transition-colors shadow-xl text-sm font-bold"
                >
                  ➕ Add New Coach
                </button>
              </div>
            )}

            {/* Sidebar CTA Box (100% Inline Editable) */}
            <div className="bg-surface-container-high border border-outline-variant rounded-xl p-6 space-y-3 hidden lg:block">
              <h4 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleHeaderChange('ctaTitle', e.target.innerText)}
                className="font-headline-md text-xl uppercase text-white"
              >{pageMeta.ctaTitle || "Ready To Train?"}</h4>

              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleHeaderChange('ctaDesc', e.target.innerText)}
                className="text-xs text-on-surface-variant leading-relaxed"
              >{pageMeta.ctaDesc || "Private 1-on-1 sessions and group classes available 6 days a week."}</p>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); if (onOpenBookingModal) onOpenBookingModal(); }}
                className="inline-block font-label-mono text-xs text-primary-container uppercase font-bold hover:underline pt-1 cursor-pointer"
              >
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleHeaderChange('ctaBtnText', e.target.innerText)}
                >{pageMeta.ctaBtnText || "Book Trial Class →"}</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Coach Spotlight Cards */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {data?.coachesList?.map((coach, index) => (
              <div 
                key={coach.id || index} 
                className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden hover:border-primary-container/80 transition-all duration-300 shadow-2xl group relative"
              >
                
                {isAdmin && (
                  <button 
                    onClick={() => onDeleteCoach(index)}
                    className="absolute top-4 right-4 bg-danger-red text-white text-xs font-label-mono px-3 py-1.5 rounded hover:bg-red-700 z-40 shadow-lg"
                  >
                    🗑️ Delete Coach
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Coach Photo Container */}
                  <div className="md:col-span-5 h-[340px] sm:h-[420px] md:h-full min-h-[340px] relative img-container">
                    <img 
                      src={coach.image} 
                      alt={coach.name} 
                      className="w-full h-full object-cover filter contrast-125 group-hover:contrast-100 transition-all duration-500" 
                    />
                    
                    {isAdmin && (
                      <div className="img-edit-overlay absolute inset-0 bg-black/60 items-center justify-center z-30 flex p-4">
                        <label className="btn-clip bg-primary-container text-black font-button-text px-4 py-2.5 text-xs uppercase cursor-pointer hover:bg-white font-bold">
                          📷 Change Photo
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => onImageUpload(e, index)} />
                        </label>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md border border-primary-container px-3 py-1 font-label-mono text-primary-container text-xs font-bold uppercase rounded">
                      <span 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => onCoachChange(index, 'badge', e.target.innerText)}
                      >{coach.badge}</span>
                    </div>
                  </div>

                  {/* Coach Details Container */}
                  <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <h2 
                          contentEditable={isAdmin}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => onCoachChange(index, 'name', e.target.innerText)}
                          className="font-headline-lg text-3xl sm:text-4xl uppercase text-white tracking-wide"
                        >{coach.name}</h2>
                        <h3 
                          contentEditable={isAdmin}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => onCoachChange(index, 'subtitle', e.target.innerText)}
                          className="font-headline-md text-primary-container uppercase text-lg sm:text-xl pt-0.5"
                        >{coach.subtitle}</h3>
                      </div>

                      <p 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => onCoachChange(index, 'bio', e.target.innerText)}
                        className="text-on-surface-variant text-sm sm:text-base leading-relaxed"
                      >{coach.bio}</p>
                    </div>

                    {/* Accomplishments & Roles List */}
                    <div className="border-t border-outline-variant/60 pt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-label-mono text-xs uppercase text-primary-container font-bold tracking-wider">
                          KEY ACCOMPLISHMENTS
                        </h4>
                        {isAdmin && (
                          <button 
                            onClick={() => handleAddAchievement(index)}
                            className="text-[11px] font-label-mono text-primary hover:underline"
                          >
                            ➕ Add Title
                          </button>
                        )}
                      </div>

                      <ul className="space-y-2">
                        {coach.achievements?.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary-container text-base">military_tech</span>
                              <span 
                                contentEditable={isAdmin}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => {
                                  const updatedAch = [...coach.achievements];
                                  updatedAch[aIdx] = e.target.innerText;
                                  onCoachChange(index, 'achievements', updatedAch);
                                }}
                                className="font-label-mono text-on-surface"
                              >{ach}</span>
                            </div>
                            
                            {isAdmin && (
                              <button 
                                onClick={() => handleRemoveAchievement(index, aIdx)}
                                className="text-danger-red text-[10px] font-label-mono px-1.5 hover:underline"
                              >
                                ✕
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); if (onOpenBookingModal) onOpenBookingModal(); }}
                        className="inline-block btn-clip bg-primary-container text-black font-button-text px-6 py-3 uppercase tracking-widest hover:bg-white transition-colors text-xs sm:text-sm font-bold cursor-pointer"
                      >
                        <span 
                          contentEditable={isAdmin}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => onCoachChange(index, 'ctaText', e.target.innerText)}
                        >{coach.ctaText || `Train With ${coach.name ? coach.name.split(' ')[0] : 'Coach'} →`}</span>
                      </a>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </main>

      {/* Add Coach Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-primary-container rounded-lg p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-md uppercase text-primary text-xl sm:text-2xl border-b border-outline-variant pb-2">Add New Coach</h3>
            
            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Coach Name</label>
              <input type="text" value={newCoach.name} onChange={(e) => setNewCoach({...newCoach, name: e.target.value})} placeholder="e.g. John Doe" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Subtitle / Role</label>
              <input type="text" value={newCoach.subtitle} onChange={(e) => setNewCoach({...newCoach, subtitle: e.target.value})} placeholder="e.g. Muay Thai Fighter & Coach" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Badge Tag</label>
              <input type="text" value={newCoach.badge} onChange={(e) => setNewCoach({...newCoach, badge: e.target.value})} placeholder="e.g. ASSISTANT COACH" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Bio</label>
              <textarea rows="3" value={newCoach.bio} onChange={(e) => setNewCoach({...newCoach, bio: e.target.value})} placeholder="Coach biography..." className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm"></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-on-surface-variant uppercase">Cancel</button>
              <button onClick={handleCreate} className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 text-sm uppercase font-bold">Save Coach</button>
            </div>
          </div>
        </div>
      )}

      <Footer data={data?.footer} onChange={onPageFieldChange ? (sec, fld, val) => onPageFieldChange(sec, fld, val) : null} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
