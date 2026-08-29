import React from 'react';

export default function WelcomeBento({ data, onChange, onImageUpload, onAddBentoCard, onDeleteBentoCard, isAdmin }) {
  if (!data) return null;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-grid-margin bg-[#f4f4f6] text-[#121214] relative z-10 -mt-8 md:-mt-12 clip-slant shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Intro Paragraphs with High-Contrast Dark Text */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-4">
            
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-primary-container"></span>
              <span className="font-label-mono text-xs uppercase tracking-widest text-black font-bold">
                THE REDEMPTION WAY
              </span>
            </div>

            <h2 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('welcome', 'title', e.target.innerText)}
              className="font-display-xl text-4xl sm:text-5xl lg:text-6xl uppercase text-[#121214] leading-none tracking-tight"
            >{data.title}</h2>

            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('welcome', 'paragraph1', e.target.innerText)}
              className="text-[#3a3939] font-body-lg text-base sm:text-lg leading-relaxed pt-2"
            >{data.paragraph1}</p>

            <p 
              contentEditable={isAdmin}
              suppressContentEditableWarning={true}
              onBlur={(e) => onChange('welcome', 'paragraph2', e.target.innerText)}
              className="text-[#5a5959] text-sm sm:text-base leading-relaxed"
            >{data.paragraph2}</p>

          </div>

          {/* Right Dynamic Bento Cards Grid */}
          <div className="lg:col-span-7 space-y-4">
            
            {isAdmin && (
              <div className="flex justify-end pb-2">
                <button 
                  onClick={onAddBentoCard}
                  className="btn-clip bg-[#121214] text-white font-button-text px-4 py-2 text-xs uppercase tracking-widest hover:bg-primary-container hover:text-black font-bold shadow-lg"
                >
                  ➕ Add Bento Feature Card
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Dynamic Bento Cards */}
              {(data.bentoCards || [
                { id: 'b1', title: data.bento1Title || 'No Ego', desc: data.bento1Desc || 'Train hard, stay humble. Everyone is family here.', icon: 'sports_martial_arts' },
                { id: 'b2', title: data.bento2Title || 'All Levels', desc: data.bento2Desc || 'From seasoned fighters to day-one beginners.', bg: data.bento2Bg }
              ]).map((card, index) => (
                <div 
                  key={card.id || index} 
                  className="bg-white border-2 border-black/10 hover:border-black/40 p-6 rounded-2xl group transition-all duration-300 min-h-[220px] flex flex-col justify-end relative overflow-hidden shadow-xl img-container"
                  style={card.bg ? { backgroundImage: `url('${card.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  {isAdmin && (
                    <button 
                      onClick={() => onDeleteBentoCard(index)}
                      className="absolute top-2 right-2 bg-danger-red text-white text-[10px] font-label-mono px-2 py-0.5 rounded z-30"
                    >
                      🗑️ Delete
                    </button>
                  )}

                  {card.bg && (
                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors z-0"></div>
                  )}

                  {card.icon && (
                    <span className="material-symbols-outlined text-4xl text-[#121214] absolute top-5 right-5 z-10">
                      {card.icon}
                    </span>
                  )}

                  {isAdmin && card.bg && (
                    <div className="img-edit-overlay absolute inset-0 bg-black/60 items-center justify-center z-20 flex p-2">
                      <label className="btn-clip bg-primary-container text-black font-button-text px-4 py-2 text-xs uppercase cursor-pointer font-bold">
                        📷 Change Photo
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => onImageUpload(e, 'welcome', 'bento2Bg')} />
                      </label>
                    </div>
                  )}

                  <div className="relative z-10 space-y-1">
                    <h3 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (index === 0) onChange('welcome', 'bento1Title', e.target.innerText);
                        if (index === 1) onChange('welcome', 'bento2Title', e.target.innerText);
                      }}
                      className={`font-headline-md text-2xl uppercase mb-1 ${card.bg ? 'text-primary-container' : 'text-[#121214]'}`}
                    >{card.title}</h3>

                    <p 
                      contentEditable={isAdmin}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (index === 0) onChange('welcome', 'bento1Desc', e.target.innerText);
                        if (index === 1) onChange('welcome', 'bento2Desc', e.target.innerText);
                      }}
                      className={`text-xs sm:text-sm ${card.bg ? 'text-on-surface-variant' : 'text-[#5a5959]'}`}
                    >{card.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
