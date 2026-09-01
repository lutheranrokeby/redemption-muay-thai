import React from 'react';

// Helper to determine if a URL points to a video file
const isVideoUrl = (url) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].toLowerCase();
  return cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.mov') || cleanUrl.includes('video');
};

export default function Hero({ data, onChange, onImageUpload, isAdmin }) {
  if (!data) return null;

  const desktopMedia = data.bgImage || data.bgMediaDesktop || '';
  const mobileMedia = data.bgMediaMobile || desktopMedia;

  const isDesktopVideo = isVideoUrl(desktopMedia);
  const isMobileVideo = isVideoUrl(mobileMedia);

  return (
    <header className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Dedicated High-Z-Index Admin Media Change Controls (Desktop & Mobile) */}
      {isAdmin && (
        <div className="absolute top-28 right-4 sm:right-8 z-30 flex flex-col sm:flex-row gap-2">
          <label className="btn-clip bg-primary-container text-black font-button-text px-4 py-2.5 uppercase cursor-pointer hover:bg-white shadow-2xl text-xs font-bold border-2 border-black inline-flex items-center gap-1.5">
            <span>🖥️</span> Desktop Media (Photo/Video)
            <input 
              type="file" 
              className="hidden" 
              accept="image/*,video/*" 
              onChange={(e) => onImageUpload(e, 'hero', 'bgImage')} 
            />
          </label>

          <label className="btn-clip bg-surface-container-high text-primary-container font-button-text px-4 py-2.5 uppercase cursor-pointer hover:bg-white hover:text-black transition-colors shadow-2xl text-xs font-bold border-2 border-primary-container/60 inline-flex items-center gap-1.5">
            <span>📱</span> Mobile Media (Photo/Video)
            <input 
              type="file" 
              className="hidden" 
              accept="image/*,video/*" 
              onChange={(e) => onImageUpload(e, 'hero', 'bgMediaMobile')} 
            />
          </label>
        </div>
      )}

      {/* Absolute Background Container */}
      <div className="absolute inset-0 z-0 bg-surface-dim">
        
        {/* DESKTOP BACKGROUND MEDIA (Hidden on mobile if separate mobile media is present) */}
        <div className="hidden md:block w-full h-full">
          {isDesktopVideo ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              key={desktopMedia}
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            >
              <source src={desktopMedia} />
            </video>
          ) : (
            <img 
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
              src={desktopMedia} 
              alt="Hero Background Desktop"
            />
          )}
        </div>

        {/* MOBILE BACKGROUND MEDIA (Shown on screens < 768px) */}
        <div className="block md:hidden w-full h-full">
          {isMobileVideo ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              key={mobileMedia}
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            >
              <source src={mobileMedia} />
            </video>
          ) : (
            <img 
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
              src={mobileMedia} 
              alt="Hero Background Mobile"
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none"></div>
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
