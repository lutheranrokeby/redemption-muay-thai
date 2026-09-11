import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CoachesPage({ data, onAddCoach, onDeleteCoach, onCoachChange, onCoachImageUpload, onImageUpload, onPageFieldChange, onOpenBookingModal, isAdmin }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoach, setNewCoach] = useState({
    name: '',
    subtitle: '',
    badge: 'COACH',
    bio: '',
    privatePrice: '$100',
    privateRate: 'per hour session',
    hidePrivateRate: false,
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
      privatePrice: '$100',
      privateRate: 'per hour session',
      hidePrivateRate: false,
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
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-40 bg-background/95 p-1.5 rounded-lg border border-outline-variant text-[11px] font-label-mono flex-wrap shadow-xl">
                    <button
                      type="button"
                      onClick={() => onCoachChange(index, 'hidePrivateRate', !coach.hidePrivateRate)}
                      className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-all border ${
                        coach.hidePrivateRate 
                          ? 'bg-surface-container-high text-on-surface-variant border-outline-variant hover:border-primary-container' 
                          : 'bg-primary-container text-black border-primary-container hover:bg-white'
                      }`}
                      title="Toggle Private Session Price Visibility on Public View"
                    >
                      {coach.hidePrivateRate ? '🙈 Private Price: Hidden' : '👁️ Private Price: Visible'}
                    </button>

                    <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant/60" title="Adjust Private Session Cost & Unit">
                      <span className="text-primary-container font-bold">💲</span>
                      <input 
                        type="text"
                        value={coach.privatePrice || (coach.name?.includes('Billy') ? '$100' : '$90')}
                        onChange={(e) => onCoachChange(index, 'privatePrice', e.target.value)}
                        className="w-14 bg-background border border-outline-variant/60 rounded px-1.5 py-0.5 text-white font-mono text-[11px] text-center focus:border-primary-container focus:outline-none"
                        placeholder="$100"
                        title="Adjust Cost (e.g. $100)"
                      />
                      <input 
                        type="text"
                        value={coach.privateRate || 'per hour session'}
                        onChange={(e) => onCoachChange(index, 'privateRate', e.target.value)}
                        className="w-28 bg-background border border-outline-variant/60 rounded px-1.5 py-0.5 text-on-surface-variant font-mono text-[10px] focus:border-primary-container focus:outline-none"
                        placeholder="per hour session"
                        title="Adjust Unit (e.g. per hour session)"
                      />
                    </div>

                    <button 
                      onClick={() => onDeleteCoach(index)}
                      className="bg-danger-red text-white text-[11px] font-label-mono px-2 py-1 rounded hover:bg-red-700 font-bold ml-1 cursor-pointer"
                      title="Delete Coach"
                    >
                      🗑️
                    </button>
                  </div>
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
                        <label className="btn-clip bg-primary-container text-black font-button-text px-4 py-2.5 text-xs uppercase cursor-pointer hover:bg-white font-bold shadow-2xl">
                          📷 Change Photo
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => onCoachImageUpload && onCoachImageUpload(e, index)} />
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

                    {/* Private Session Price Section */}
                    {(!coach.hidePrivateRate || isAdmin) && (
                      <div className={`rounded-xl border p-4 sm:p-5 transition-all ${
                        coach.hidePrivateRate && isAdmin
                          ? 'bg-surface-container-high/30 border-dashed border-primary-container/60 opacity-60'
                          : 'bg-surface-container-high/60 border-outline-variant/60 shadow-inner'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          {/* Left Title */}
                          <div className="flex items-center gap-2">
                            <span className="font-label-mono text-xs uppercase tracking-wider text-primary-container font-bold">
                              PRIVATE 1-ON-1 SESSION
                            </span>
                            {coach.hidePrivateRate && isAdmin && (
                              <span className="bg-danger-red/20 text-white text-[9px] font-label-mono px-1.5 py-0.5 rounded border border-danger-red/40 font-bold uppercase">
                                Hidden From Public
                              </span>
                            )}
                          </div>

                          {/* Right Price & Unit */}
                          <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/40">
                            <div className="flex items-baseline sm:justify-end gap-1.5">
                              <span 
                                contentEditable={isAdmin}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => onCoachChange(index, 'privatePrice', e.target.innerText.trim())}
                                className="font-display-xl text-2xl sm:text-3xl font-extrabold text-white tracking-tight focus:outline-none focus:text-primary-container cursor-text"
                                title={isAdmin ? "Click to edit cost (e.g. $100)" : undefined}
                              >
                                {coach.privatePrice || (coach.name?.includes('Billy') ? '$100' : '$90')}
                              </span>
                              <span 
                                contentEditable={isAdmin}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => onCoachChange(index, 'privateRate', e.target.innerText.trim())}
                                className="font-label-mono text-xs text-on-surface-variant font-bold uppercase focus:outline-none focus:text-primary-container cursor-text"
                                title={isAdmin ? "Click to edit unit (e.g. per hour session)" : undefined}
                              >
                                {coach.privateRate || 'per hour session'}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Private Session Cost</label>
                <input type="text" value={newCoach.privatePrice} onChange={(e) => setNewCoach({...newCoach, privatePrice: e.target.value})} placeholder="e.g. $100" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm font-bold" />
              </div>
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1">Session Rate / Unit</label>
                <input type="text" value={newCoach.privateRate} onChange={(e) => setNewCoach({...newCoach, privateRate: e.target.value})} placeholder="e.g. per hour session" className="w-full bg-background border border-outline-variant p-2.5 rounded text-white text-sm" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input 
                type="checkbox" 
                id="chkShowPrivateRate" 
                checked={!newCoach.hidePrivateRate} 
                onChange={(e) => setNewCoach({...newCoach, hidePrivateRate: !e.target.checked})} 
                className="accent-primary-container w-4 h-4 cursor-pointer" 
              />
              <label htmlFor="chkShowPrivateRate" className="text-xs font-label-mono text-white cursor-pointer font-bold">
                Show Private Session Price on public view
              </label>
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
