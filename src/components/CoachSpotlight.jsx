import React from 'react';

export default function CoachSpotlight({ data, onChange, onImageUpload, isAdmin }) {
  if (!data) return null;

  return (
    <section id="coaches" className="py-20 md:py-28 bg-background relative z-10 overflow-hidden">
      
      {/* Background Subtle Grid Texture & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b494c_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-grid-margin relative z-10">
        
        {/* BESPOKE ATHLETIC SPOTLIGHT CONTAINER */}
        <div className="relative bg-gradient-to-br from-surface-container-low via-surface-dim to-surface-container-lowest border-2 border-outline-variant/80 rounded-3xl p-6 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Background Typography Watermark */}
          <span 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            onBlur={(e) => onChange('coach', 'watermark', e.target.innerText)}
            className="absolute -bottom-6 -right-6 text-8xl sm:text-[14rem] font-display-xl uppercase text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter"
          >{data.watermark || "COACH"}</span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* LEFT PHOTO COLUMN: Brutalist Slanted Frame with Offset Glow Shadow */}
            <div className="lg:col-span-5 relative group">
              
              {/* Offset Electric Cyan Brutalist Shadow */}
              <div className="absolute inset-0 bg-primary-container rounded-2xl transform translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 z-0"></div>

              {/* Main Image Wrapper */}
              <div className="relative z-10 h-[400px] sm:h-[520px] lg:h-[580px] w-full rounded-2xl overflow-hidden border-2 border-primary-container bg-surface-dim img-container">
                <img 
                  className="w-full h-full object-cover filter contrast-125 saturate-90 group-hover:scale-105 group-hover:contrast-100 transition-all duration-700" 
                  src={data.image} 
                  alt={data.name || "Head Coach"}
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Vertical Athletic Brand Tag */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-black/90 backdrop-blur-md px-4 py-2 rounded-lg border border-primary-container/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'badge', e.target.innerText)}
                    className="font-label-mono text-xs font-bold uppercase text-primary-container tracking-wider"
                  >
                    {data.badge || "HEAD COACH & FOUNDER"}
                  </span>
                </div>

                {isAdmin && (
                  <div className="img-edit-overlay absolute inset-0 bg-black/70 items-center justify-center z-30 flex p-4">
                    <label className="btn-clip bg-primary-container text-black font-button-text px-6 py-3 uppercase cursor-pointer hover:bg-white font-bold text-xs sm:text-sm shadow-2xl">
                      📷 Change Coach Photo
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => onImageUpload(e, 'coach', 'image')} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT DETAILS COLUMN: Editorial Layout & Metallic Accolade Pills */}
            <div className="lg:col-span-7 space-y-8 relative z-10">
              
              <div className="space-y-3">
                
                <div className="flex items-center gap-3">
                  <span className="h-0.5 w-10 bg-primary-container"></span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'tagline', e.target.innerText)}
                    className="font-label-mono text-xs uppercase tracking-widest text-primary-container font-bold"
                  >
                    {data.tagline || "ESTABLISHED 2020"}
                  </span>
                </div>

                <h2 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onChange('coach', 'name', e.target.innerText)}
                  className="font-display-xl text-5xl sm:text-7xl uppercase text-white tracking-tight leading-none"
                >{data.name}</h2>

                <h3 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onChange('coach', 'subtitle', e.target.innerText)}
                  className="font-headline-md text-xl sm:text-2xl text-primary uppercase tracking-wide"
                >{data.subtitle}</h3>
              </div>

              {/* Bio Copy */}
              <p 
                contentEditable={isAdmin}
                suppressContentEditableWarning={true}
                onBlur={(e) => onChange('coach', 'bio', e.target.innerText)}
                className="text-on-surface-variant font-body-lg text-base sm:text-lg leading-relaxed max-w-2xl"
              >{data.bio}</p>

              {/* Athletic Stat Badges Grid (100% Inline Editable) */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-background/80 border border-outline-variant p-3.5 rounded-xl text-center space-y-1 backdrop-blur-md">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'stat1Val', e.target.innerText)}
                    className="font-display-xl text-2xl sm:text-3xl text-primary-container font-bold block"
                  >{data.stat1Val || "4x"}</span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'stat1Lbl', e.target.innerText)}
                    className="font-label-mono text-[10px] sm:text-xs text-on-surface-variant uppercase font-bold block"
                  >{data.stat1Lbl || "WMC State Belts"}</span>
                </div>

                <div className="bg-background/80 border border-outline-variant p-3.5 rounded-xl text-center space-y-1 backdrop-blur-md">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'stat2Val', e.target.innerText)}
                    className="font-display-xl text-2xl sm:text-3xl text-primary-container font-bold block"
                  >{data.stat2Val || "2x"}</span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'stat2Lbl', e.target.innerText)}
                    className="font-label-mono text-[10px] sm:text-xs text-on-surface-variant uppercase font-bold block"
                  >{data.stat2Lbl || "IFMA Australian Titles"}</span>
                </div>

                <div className="bg-background/80 border border-outline-variant p-3.5 rounded-xl text-center space-y-1 backdrop-blur-md">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'stat3Val', e.target.innerText)}
                    className="font-display-xl text-2xl sm:text-3xl text-primary-container font-bold block"
                  >{data.stat3Val || "12+"}</span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'stat3Lbl', e.target.innerText)}
                    className="font-label-mono text-[10px] sm:text-xs text-on-surface-variant uppercase font-bold block"
                  >{data.stat3Lbl || "Years Experience"}</span>
                </div>
              </div>

              {/* Metallic Championship Accolades List */}
              <div className="space-y-3 pt-2">
                <span 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onChange('coach', 'accoladesTitle', e.target.innerText)}
                  className="block font-label-mono text-xs uppercase text-on-surface-variant font-bold tracking-wider"
                >
                  {data.accoladesTitle || "CHAMPIONSHIP ACCOMPLISHMENTS"}
                </span>
                
                <div className="flex flex-wrap gap-2.5">
                  {data.achievements?.map((item, index) => (
                    <div 
                      key={index}
                      className="inline-flex items-center gap-2 bg-surface-container-high/90 border border-primary-container/40 px-3.5 py-2 rounded-lg text-xs font-label-mono text-on-surface shadow-md"
                    >
                      <span className="material-symbols-outlined text-primary-container text-sm">military_tech</span>
                      <span 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          const newAch = [...data.achievements];
                          newAch[index] = e.target.innerText;
                          onChange('coach', 'achievements', newAch);
                        }}
                      >{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="/contact" 
                  className="btn-clip bg-primary-container text-black font-button-text px-8 py-4 uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-0.5 text-center font-bold text-sm sm:text-base shadow-xl"
                >
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'cta1Text', e.target.innerText)}
                  >{data.cta1Text || `Train With ${data.name ? data.name.split(' ')[0] : 'Billy'} →`}</span>
                </a>

                <a 
                  href="/coaches" 
                  className="border-2 border-outline-variant text-on-surface hover:text-primary-container font-button-text px-6 py-4 uppercase tracking-widest hover:border-primary-container transition-all text-center font-bold text-sm sm:text-base rounded-lg"
                >
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onChange('coach', 'cta2Text', e.target.innerText)}
                  >{data.cta2Text || "Meet All Coaches →"}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
