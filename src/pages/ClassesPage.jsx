import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ClassesPage({ data, onAddClass, onDeleteClass, onClassChange, onClassImageUpload, isAdmin }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState({
    tag: 'ALL LEVELS',
    title: '',
    description: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVeOhOmaG2DwFJ-Agk0ZON_NeVfXaq7GIW5GxLGiWCBjiOoEc8TpL9i84x_6rI78VB6VHGjJGtmSQR4IAhBct8r5swdZ1NQYqXzjovee_GbcG-iaaG93ov7DqAWQfPbuqnPXwxcMBafCcAyCAPkeePjwswvESwBf5orWLDW6sVk4Ncl2_QyGlyWfrS1KChWtkMD1MDyeftLa3KFHWP2_GyVAc4Kp-cWE3fWb8Aiuy0gy62oSLwQIPaSw'
  });

  const handleCreate = () => {
    if (!newClass.title) return alert('Please enter class title');
    onAddClass({ ...newClass, id: `c-${Date.now()}` });
    setShowAddModal(false);
    setNewClass({
      tag: 'ALL LEVELS',
      title: '',
      description: '',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVeOhOmaG2DwFJ-Agk0ZON_NeVfXaq7GIW5GxLGiWCBjiOoEc8TpL9i84x_6rI78VB6VHGjJGtmSQR4IAhBct8r5swdZ1NQYqXzjovee_GbcG-iaaG93ov7DqAWQfPbuqnPXwxcMBafCcAyCAPkeePjwswvESwBf5orWLDW6sVk4Ncl2_QyGlyWfrS1KChWtkMD1MDyeftLa3KFHWP2_GyVAc4Kp-cWE3fWb8Aiuy0gy62oSLwQIPaSw'
    });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Navbar isAdmin={isAdmin} />

      <main className="pt-32 pb-section-gap px-grid-margin max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl uppercase text-white">
            Muay Thai <span className="text-primary-container">Classes</span>
          </h1>
          <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto">
            Explore our complete lineup of training programs tailored for beginners, experienced fighters, teens, and juniors.
          </p>

          {isAdmin && (
            <div className="pt-4">
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn-clip bg-primary-container text-black font-button-text px-8 py-3 uppercase tracking-widest hover:bg-white transition-colors shadow-xl"
              >
                ➕ Add New Class
              </button>
            </div>
          )}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {data?.classes?.map((item, index) => (
            <div key={item.id} className="bg-surface relative group overflow-hidden border border-outline-variant hover:border-primary-container transition-all shadow-xl">
              
              {isAdmin && (
                <button 
                  onClick={() => onDeleteClass(index)}
                  className="absolute top-2 left-2 bg-danger-red text-white text-[10px] font-label-mono px-2 py-1 rounded z-30"
                >
                  🗑️ Delete
                </button>
              )}

              <div className="h-64 relative img-container">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={item.image} alt={item.title} />
                
                {isAdmin && (
                  <div className="img-edit-overlay absolute inset-0 bg-black/60 items-center justify-center z-20 flex">
                    <label className="btn-clip bg-primary-container text-black font-button-text px-4 py-2 text-xs uppercase cursor-pointer">
                      📷 Change Photo
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => onClassImageUpload(e, index)} />
                    </label>
                  </div>
                )}

                <div className="absolute top-0 right-0 h-full w-8 bg-black/50 flex items-center justify-center">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onClassChange(index, 'tag', e.target.innerText)}
                    className="font-label-mono text-label-mono text-primary-container -rotate-90 whitespace-nowrap tracking-widest"
                  >{item.tag}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onClassChange(index, 'title', e.target.innerText)}
                  className="font-headline-md text-headline-md uppercase text-primary"
                >{item.title}</h3>
                
                <p 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onClassChange(index, 'description', e.target.innerText)}
                  className="text-on-surface-variant text-sm"
                >{item.description}</p>

                <a href="/timetable" className="inline-block font-label-mono text-label-mono text-primary-container uppercase hover:text-white transition-colors">
                  View Timetable Slot →
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-primary-container rounded-lg p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-headline-md uppercase text-primary text-2xl border-b border-outline-variant pb-2">Add New Class</h3>
            
            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Class Title</label>
              <input type="text" value={newClass.title} onChange={(e) => setNewClass({...newClass, title: e.target.value})} placeholder="e.g. Sparring & Clinch" className="w-full bg-background border border-outline-variant p-2 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Badge Tag</label>
              <input type="text" value={newClass.tag} onChange={(e) => setNewClass({...newClass, tag: e.target.value})} placeholder="e.g. ADVANCED" className="w-full bg-background border border-outline-variant p-2 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1">Description</label>
              <textarea rows="3" value={newClass.description} onChange={(e) => setNewClass({...newClass, description: e.target.value})} placeholder="Class overview and benefits..." className="w-full bg-background border border-outline-variant p-2 rounded text-white text-sm"></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-on-surface-variant uppercase">Cancel</button>
              <button onClick={handleCreate} className="btn-clip bg-primary-container text-black font-button-text px-6 py-2 text-sm uppercase">Save Class</button>
            </div>
          </div>
        </div>
      )}

      <Footer data={data?.footer} isAdmin={isAdmin} />
    </div>
  );
}
