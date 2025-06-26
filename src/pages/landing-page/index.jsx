import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import MobileActionBar from '../../components/ui/MobileActionBar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ServiceShowcase from './components/ServiceShowcase';
import BeforeAfterGallery from './components/BeforeAfterGallery';
import BenefitsGrid from './components/BenefitsGrid';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import PricingSection from './components/PricingSection';
import LocationsSection from './components/LocationsSection';
import BookingForm from './components/BookingForm';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleGetQuote = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    const bookingElement = document.getElementById('booking-form');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePackageSelect = (packageData) => {
    setSelectedPackage(packageData);
    handleBookNow();
  };

  const handleMobileBooking = () => {
    handleBookNow();
  };

  const handleMobileCall = () => {
    window.location.href = 'tel:+1-555-CAR-WASH';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection 
          onGetQuote={handleGetQuote}
          onBookNow={handleBookNow}
        />
        
        <ProblemSection />
        
        <div id="services">
          <ServiceShowcase onSelectPackage={handlePackageSelect} />
        </div>
        
        <BeforeAfterGallery />
        
        <BenefitsGrid />
        
        <div id="reviews">
          <TestimonialsCarousel />
        </div>
        
        <div id="pricing">
          <PricingSection onSelectPackage={handlePackageSelect} />
        </div>
        
        <div id="locations">
          <LocationsSection />
        </div>
        
        <BookingForm />
        
        <FAQSection />
        
        <FinalCTASection />
      </main>
      
      <Footer />
      
      <MobileActionBar 
        onBookNow={handleMobileBooking}
        onCallNow={handleMobileCall}
      />
    </div>
  );
};

export default LandingPage;