import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WelcomeBento from '../components/WelcomeBento';
import ClassesGrid from '../components/ClassesGrid';
import CoachSpotlight from '../components/CoachSpotlight';
import Footer from '../components/Footer';

export default function HomePage({ data, onChange, onImageUpload, onClassChange, onClassImageUpload, onAddBentoCard, onDeleteBentoCard, onOpenBookingModal, isAdmin }) {
  if (!data) return null;

  return (
    <div className={isAdmin ? 'edit-mode' : ''}>
      <Navbar data={data.footer} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
      <Hero data={data.hero} onChange={onChange} onImageUpload={onImageUpload} isAdmin={isAdmin} />
      <WelcomeBento data={data.welcome} onChange={onChange} onImageUpload={onImageUpload} onAddBentoCard={onAddBentoCard} onDeleteBentoCard={onDeleteBentoCard} isAdmin={isAdmin} />
      <ClassesGrid data={data.classes} onClassChange={onClassChange} onClassImageUpload={onClassImageUpload} isAdmin={isAdmin} />
      <CoachSpotlight data={data.coach} onChange={onChange} onImageUpload={onImageUpload} isAdmin={isAdmin} />
      <Footer data={data.footer} onChange={onChange} onImageUpload={onImageUpload} onOpenBookingModal={onOpenBookingModal} isAdmin={isAdmin} />
    </div>
  );
}
