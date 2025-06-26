import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import MobileActionBar from '../../components/ui/MobileActionBar';
import Footer from '../landing-page/components/Footer';
import ServiceHero from './components/ServiceHero';
import ServiceSelector from './components/ServiceSelector';
import PricingCalculator from './components/PricingCalculator';
import ServiceComparison from './components/ServiceComparison';
import BookingWidget from './components/BookingWidget';
import EnvironmentalImpact from './components/EnvironmentalImpact';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState('premium');
  const [selectedLocation, setSelectedLocation] = useState('los-angeles');
  const [membershipDiscount, setMembershipDiscount] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleLocationChange = (locationId) => {
    setSelectedLocation(locationId);
  };

  const handleBookService = (serviceData) => {
    setShowBookingModal(true);
    // Handle booking logic here
  };

  const handleMobileBooking = () => {
    setShowBookingModal(true);
  };

  const handleMobileCall = () => {
    window.location.href = 'tel:+1-555-CAR-WASH';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <ServiceHero />
        
        <ServiceSelector 
          selectedService={selectedService}
          onServiceSelect={handleServiceSelect}
          onBookService={handleBookService}
        />
        
        <PricingCalculator 
          selectedService={selectedService}
          selectedLocation={selectedLocation}
          membershipDiscount={membershipDiscount}
          onLocationChange={handleLocationChange}
          onMembershipToggle={setMembershipDiscount}
        />
        
        <ServiceComparison />
        
        <BookingWidget 
          selectedService={selectedService}
          show={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
        
        <EnvironmentalImpact />
      </main>
      
      <Footer />
      
      <MobileActionBar 
        onBookNow={handleMobileBooking}
        onCallNow={handleMobileCall}
      />
    </div>
  );
};

export default ServicesPage;