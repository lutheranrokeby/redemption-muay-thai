import React from 'react';

export default function Hero({ data, onChange, onImageUpload, isAdmin }) {
  if (!data) return null;

  return (
    <header className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Absolute Background Container */}
      <div className="absolute inset-0 z-0 bg-surface-dim img-container">
        <img className="w-full h-full object-cover opacity-40 mix-blend-luminosity" src={data.bgImage} alt="Hero Background"/>
        
        {isAdmin && (
          <div className="img-edit-overlay absolute inset-0 bg-black/60 items-center justify-center z-20 flex p-4">
            <label className="btn-clip bg-primary-container text-black font-button-text px-6 py-3 uppercase cursor-pointer hover:bg-white shadow-2xl text-xs sm:text-sm font-bold">
              📷 Change Hero Background Photo
              <input type="file" className="hidden" accept="image/*" onChange={(e) => onImageUpload(e, 'hero', 'bgImage')} />
            </label>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-grid-margin grid grid-cols-1 md:grid-cols-12 gap-gutter text-center">
        <div className="md:col-span-10 md:col-start-2 flex flex-col items-center">
          <h1 className="font-display-xl text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase mb-6 sm:mb-stack-lg leading-[0.95] tracking-tight">
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('hero', 'titleLine1', e.target.innerText)}
            >{data.titleLine1}</span> <br/>
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('hero', 'titleCyan', e.target.innerText)}
              className="text-primary-container"
            >{data.titleCyan}</span><br/> 
            <span 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('hero', 'titleLine2', e.target.innerText)}
            >{data.titleLine2}</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
            <a 
              href="/contact"
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('hero', 'cta1Text', e.target.innerText)}
              className="btn-clip bg-primary-container text-black font-button-text px-8 py-4 uppercase tracking-widest hover:bg-white transition-colors text-center font-bold text-sm sm:text-base"
            >{data.cta1Text}</a>
            <a 
              href="/coaches"
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('hero', 'cta2Text', e.target.innerText)}
              className="border-2 border-primary-container text-primary-container font-button-text px-8 py-4 uppercase tracking-widest hover:bg-primary-container hover:text-black transition-colors text-center font-bold text-sm sm:text-base"
            >{data.cta2Text}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
