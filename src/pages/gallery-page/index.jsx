import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import MobileActionBar from '../../components/ui/MobileActionBar';
import Footer from '../landing-page/components/Footer';
import GalleryHero from './components/GalleryHero';
import TransformationGallery from './components/TransformationGallery';
import FilterSystem from './components/FilterSystem';
import FeaturedTransformations from './components/FeaturedTransformations';
import CustomerSubmissions from './components/CustomerSubmissions';
import SocialShareIntegration from './components/SocialShareIntegration';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('masonry'); // masonry, grid, list
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'service':
        setSelectedService(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
      case 'search':
        setSearchQuery(value);
        break;
      default:
        break;
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleMobileBooking = () => {
    const bookingElement = document.getElementById('booking-form');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileCall = () => {
    window.location.href = 'tel:+1-555-CAR-WASH';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <GalleryHero />
        
        <FilterSystem 
          selectedCategory={selectedCategory}
          selectedService={selectedService}
          selectedLocation={selectedLocation}
          searchQuery={searchQuery}
          viewMode={viewMode}
          onFilterChange={handleFilterChange}
          onViewModeChange={setViewMode}
        />
        
        <FeaturedTransformations 
          onImageSelect={handleImageSelect}
        />
        
        <TransformationGallery 
          selectedCategory={selectedCategory}
          selectedService={selectedService}
          selectedLocation={selectedLocation}
          searchQuery={searchQuery}
          viewMode={viewMode}
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
          onClose={() => setSelectedImage(null)}
        />
        
        <SocialShareIntegration />
        
        <CustomerSubmissions />
      </main>
      
      <Footer />
      
      <MobileActionBar 
        onBookNow={handleMobileBooking}
        onCallNow={handleMobileCall}
      />
    </div>
  );
};

export default GalleryPage;