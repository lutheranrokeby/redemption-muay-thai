import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Days of week order (Monday = 0, Sunday = 6)
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getDayIndex = (dayName) => {
  if (!dayName) return 7;
  const idx = daysOfWeek.findIndex(d => d.toLowerCase() === dayName.trim().toLowerCase());
  return idx !== -1 ? idx : 7;
};

// Utility to convert 24-hour HH:MM time to 12-hour AM/PM string
const format12Hour = (time24) => {
  if (!time24) return '';
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h.toString().padStart(2, '0')}:${mStr} ${ampm}`;
};

// Utility to calculate sortable minutes from midnight for chronological sorting
const getSortableMinutes = (slot) => {
  if (slot.startTime) {
    const [h, m] = slot.startTime.split(':').map(Number);
    return h * 60 + (m || 0);
  }
  if (slot.time) {
    const match = slot.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return h * 60 + m;
    }
  }
  return 0;
};

export default function TimetablePage({ data, onAddSlot, onDeleteSlot, onSlotChange, onImageUpload, onPageFieldChange, onOpenBookingModal, isAdmin }) {
  const [selectedDayFilter, setSelectedDayFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newSlot, setNewSlot] = useState({
    startTime: '06:00',
    endTime: '07:15',
    days: ['Monday', 'Wednesday', 'Friday'],
    className: 'Morning Muay Thai',
    level: 'All Levels'
  });

  const toggleDay = (day) => {
    setNewSlot(prev => {
      const exists = prev.days.includes(day);
      if (exists) {
        return { ...prev, days: prev.days.filter(d => d !== day) };
      } else {
        return { ...prev, days: [...prev.days, day] };
      }
    });
  };

  const selectPresetDays = (preset) => {
    if (preset === 'mon-fri') {
      setNewSlot(prev => ({ ...prev, days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }));
    } else if (preset === 'weekend') {
      setNewSlot(prev => ({ ...prev, days: ['Saturday', 'Sunday'] }));
    } else if (preset === 'all') {
      setNewSlot(prev => ({ ...prev, days: [...daysOfWeek] }));
    }
  };

  const handleCreateSlot = () => {
    if (!newSlot.className) return alert('Please enter class name');
    if (!newSlot.startTime || !newSlot.endTime) return alert('Please select start and end times');
    if (newSlot.days.length === 0) return alert('Please select at least one day of the week');
    
    const formattedTime = `${format12Hour(newSlot.startTime)} - ${format12Hour(newSlot.endTime)}`;
    
    newSlot.days.forEach(day => {
      onAddSlot({
        id: `t-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        time: formattedTime,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        day: day,
        className: newSlot.className,
        level: newSlot.level
      });
    });
    
    setShowAddModal(false);
  };

  const filteredSlots = data?.timetableData?.filter(slot => {
    if (selectedDayFilter === 'All') return true;
    return slot.day.toLowerCase() === selectedDayFilter.toLowerCase();
  }) || [];

  const sortedSlots = [...filteredSlots].sort((a, b) => {
    const dayDiff = getDayIndex(a.day) - getDayIndex(b.day);
    if (dayDiff !== 0) return dayDiff;
    return getSortableMinutes(a) - getSortableMinutes(b);
  });

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Navbar data={data?.footer} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />

      <main className="pt-28 sm:pt-32 pb-16 md:pb-section-gap px-4 sm:px-grid-margin max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="font-display-xl text-3xl sm:text-5xl md:text-6xl uppercase text-white">
            Weekly <span className="text-primary-container">Timetable</span>
          </h1>
          <p className="text-on-surface-variant font-body-lg text-sm sm:text-base max-w-2xl mx-auto">
            View our daily session times Monday through Sunday. Select any day to filter your schedule.
          </p>

          {/* Day Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-3">
            <button 
              onClick={() => setSelectedDayFilter('All')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-label-mono uppercase rounded transition-colors ${selectedDayFilter === 'All' ? 'bg-primary-container text-black font-bold' : 'bg-surface-container-high text-on-surface hover:text-primary-container'}`}
            >All Days</button>
            {daysOfWeek.map(day => (
              <button 
                key={day}
                onClick={() => setSelectedDayFilter(day)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-label-mono uppercase rounded transition-colors ${selectedDayFilter === day ? 'bg-primary-container text-black font-bold' : 'bg-surface-container-high text-on-surface hover:text-primary-container'}`}
              >{day.substring(0, 3)}<span className="hidden sm:inline">{day.substring(3)}</span></button>
            ))}
          </div>

          {isAdmin && (
            <div className="pt-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 sm:px-8 sm:py-3 uppercase tracking-widest hover:bg-white transition-colors shadow-xl text-xs sm:text-sm font-bold"
              >
                ➕ Add Timetable Slot
              </button>
            </div>
          )}
        </div>

        {/* 1. MOBILE NO-SCROLL CARD VIEW (< sm) */}
        <div className="block sm:hidden space-y-3">
          {sortedSlots.length > 0 ? (
            sortedSlots.map((slot, index) => (
              <div key={slot.id || index} className="bg-surface-container-low border-l-4 border-l-primary-container border border-outline-variant/60 rounded-r-lg p-4 shadow-lg space-y-2 relative">
                
                {isAdmin && (
                  <button 
                    onClick={() => onDeleteSlot(index)}
                    className="absolute top-3 right-3 bg-danger-red text-white text-[10px] font-label-mono px-2 py-0.5 rounded"
                  >
                    Delete
                  </button>
                )}

                {/* Top Row: Day & Level Tag */}
                <div className="flex items-center justify-between gap-2 pr-12">
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onSlotChange(index, 'day', e.target.innerText)}
                    className="font-label-mono text-xs text-primary-container font-bold uppercase bg-primary-container/10 px-2 py-0.5 rounded border border-primary-container/30"
                  >
                    {slot.day}
                  </span>
                  
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onSlotChange(index, 'level', e.target.innerText)}
                    className="font-label-mono text-[11px] text-on-surface-variant uppercase bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant"
                  >
                    {slot.level}
                  </span>
                </div>

                {/* Middle Row: Program Title */}
                <h3 
                  contentEditable={isAdmin}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onSlotChange(index, 'className', e.target.innerText)}
                  className="font-headline-md text-xl uppercase text-white tracking-wide"
                >
                  {slot.className}
                </h3>

                {/* Bottom Row: Time Interval */}
                <div className="flex items-center gap-1.5 text-xs font-label-mono text-primary font-bold pt-1">
                  <span className="material-symbols-outlined text-sm text-primary-container">schedule</span>
                  <span 
                    contentEditable={isAdmin}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => onSlotChange(index, 'time', e.target.innerText)}
                  >
                    {slot.time}
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded text-center text-xs text-on-surface-variant font-label-mono">
              No timetable slots found for {selectedDayFilter}.
            </div>
          )}
        </div>

        {/* 2. DESKTOP & TABLET TABLE VIEW (≥ sm) */}
        <div className="hidden sm:block overflow-x-auto bg-surface-container-low border border-outline-variant rounded-lg p-6 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-primary-container text-primary uppercase font-headline-md text-lg">
                <th className="py-4 px-4 w-32">Day</th>
                <th className="py-4 px-4 w-48">Time Interval</th>
                <th className="py-4 px-4">Class Program</th>
                <th className="py-4 px-4 w-36">Level / Group</th>
                {isAdmin && <th className="py-4 px-4 w-20 text-center">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-body-md text-sm">
              {sortedSlots.length > 0 ? (
                sortedSlots.map((slot, index) => (
                  <tr key={slot.id || index} className="hover:bg-surface-variant/40 transition-colors">
                    <td className="py-4 px-4 font-label-mono text-white font-bold">
                      <span 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => onSlotChange(index, 'day', e.target.innerText)}
                        className="inline-block bg-primary-container/10 border border-primary-container/30 text-primary-container px-2 py-0.5 rounded text-xs"
                      >{slot.day}</span>
                    </td>
                    <td className="py-4 px-4 font-label-mono text-primary font-bold">
                      <span 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => onSlotChange(index, 'time', e.target.innerText)}
                      >{slot.time}</span>
                    </td>
                    <td className="py-4 px-4 font-headline-md uppercase text-lg text-white">
                      <span 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => onSlotChange(index, 'className', e.target.innerText)}
                      >{slot.className}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span 
                        contentEditable={isAdmin}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => onSlotChange(index, 'level', e.target.innerText)}
                        className="inline-block bg-surface-container-high border border-outline-variant px-3 py-1 text-xs font-label-mono text-primary-container rounded uppercase"
                      >{slot.level}</span>
                    </td>
                    {isAdmin && (
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => onDeleteSlot(index)}
                          className="bg-danger-red text-white text-[10px] font-label-mono px-2 py-1 rounded hover:bg-red-700"
                        >Delete</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="py-8 text-center text-on-surface-variant">No timetable slots found for {selectedDayFilter}.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-surface-container-high border-l-4 border-l-primary-container rounded p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl text-center md:text-left">
          <div>
            <h3 className="font-headline-md text-xl sm:text-2xl uppercase text-white mb-1">Looking for 1-on-1 Private Training?</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm">Personalized coaching sessions available outside scheduled class hours.</p>
          </div>
          <a href="/contact" className="btn-clip bg-primary-container text-black font-button-text px-6 py-3 sm:px-8 sm:py-4 uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap font-bold text-xs sm:text-sm w-full md:w-auto text-center">
            Contact For Booking
          </a>
        </div>

      </main>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-primary-container rounded-lg p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-md uppercase text-primary text-xl sm:text-2xl border-b border-outline-variant pb-2">Add Timetable Slot</h3>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">Start Time</label>
                <input 
                  type="time" 
                  value={newSlot.startTime} 
                  onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})} 
                  className="w-full bg-background border border-outline-variant p-2 sm:p-2.5 rounded text-white text-sm font-label-mono focus:border-primary-container focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">End Time</label>
                <input 
                  type="time" 
                  value={newSlot.endTime} 
                  onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})} 
                  className="w-full bg-background border border-outline-variant p-2 sm:p-2.5 rounded text-white text-sm font-label-mono focus:border-primary-container focus:outline-none" 
                />
              </div>
            </div>

            <div className="bg-background/60 p-2 rounded text-center font-label-mono text-xs text-primary">
              Interval: <span className="text-white font-bold">{format12Hour(newSlot.startTime)} - {format12Hour(newSlot.endTime)}</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-label-mono text-primary-container uppercase">Select Days ({newSlot.days.length} Selected)</label>
                <div className="flex gap-2 text-[10px] font-label-mono">
                  <button type="button" onClick={() => selectPresetDays('mon-fri')} className="text-primary hover:underline">Mon-Fri</button>
                  <button type="button" onClick={() => selectPresetDays('weekend')} className="text-primary hover:underline">Weekend</button>
                  <button type="button" onClick={() => selectPresetDays('all')} className="text-primary hover:underline">All</button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {daysOfWeek.map(day => {
                  const isSelected = newSlot.days.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`p-2 text-xs font-label-mono rounded text-center border transition-all ${
                        isSelected 
                          ? 'bg-primary-container text-black font-bold border-primary-container shadow-md' 
                          : 'bg-background text-on-surface-variant border-outline-variant hover:border-primary-container'
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">Class Program Name</label>
              <input type="text" value={newSlot.className} onChange={(e) => setNewSlot({...newSlot, className: e.target.value})} placeholder="e.g. Adult Muay Thai" className="w-full bg-background border border-outline-variant p-2 sm:p-2.5 rounded text-white text-sm" />
            </div>

            <div>
              <label className="block text-xs font-label-mono text-primary-container mb-1 uppercase">Level / Tag</label>
              <input type="text" value={newSlot.level} onChange={(e) => setNewSlot({...newSlot, level: e.target.value})} placeholder="e.g. All Levels, Adults, Juniors" className="w-full bg-background border border-outline-variant p-2 sm:p-2.5 rounded text-white text-sm" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-on-surface-variant uppercase">Cancel</button>
              <button onClick={handleCreateSlot} className="btn-clip bg-primary-container text-black font-button-text px-6 py-2.5 text-sm uppercase font-bold">
                Save for {newSlot.days.length} Day(s)
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer data={data?.footer} onChange={onPageFieldChange ? (sec, fld, val) => onPageFieldChange(sec, fld, val) : null} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
