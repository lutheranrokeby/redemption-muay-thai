import React from 'react';

export default function ClassesGrid({ data, onClassChange, onClassImageUpload, onDeleteClass, isAdmin }) {
  if (!data) return null;

  return (
    <section id="classes" className="py-20 md:py-28 px-4 sm:px-grid-margin bg-[#121214] text-white border-t-2 border-outline-variant/60 relative z-10">
      <div className="container mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span 
            contentEditable={isAdmin}
            suppressContentEditableWarning={true}
            className="font-label-mono text-xs text-primary-container uppercase tracking-widest font-bold block"
          >
            TRAINING PROGRAMS
          </span>
          <h2 className="font-display-xl text-4xl sm:text-6xl uppercase text-white tracking-tight">
            Our <span className="text-primary-container">Classes</span>
          </h2>
          <p className="text-on-surface-variant font-body-lg text-sm sm:text-base">
            From day-one beginners to experienced fighters, our programs deliver authentic Muay Thai striking and strength conditioning.
          </p>
        </div>

        {/* Classes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter">
          {data.map((item, index) => (
            <div key={item.id || index} className="bg-surface-container-low relative group overflow-hidden border border-outline-variant hover:border-primary-container transition-all duration-300 rounded-xl shadow-2xl">
              
              {isAdmin && (
                <button 
                  onClick={() => onDeleteClass && onDeleteClass(index)}
                  className="absolute top-2 left-2 bg-danger-red text-white text-[10px] font-label-mono px-2 py-1 rounded z-30 shadow-md"
                >
                  🗑️ Delete
                </button>
              )}

              <div className="h-64 relative img-container">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src={item.image} alt={item.title} />
                
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
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onClassChange(index, 'ctaText', e.target.innerText)}
                  >{item.ctaText || "View Timetable Schedule"}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
