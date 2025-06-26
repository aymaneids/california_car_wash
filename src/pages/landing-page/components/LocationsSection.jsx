import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationsSection = () => {
  const [selectedLocation, setSelectedLocation] = useState('los-angeles');
  const [mapView, setMapView] = useState('satellite');

  const locations = [
    {
      id: 'los-angeles',
      name: 'Los Angeles Downtown',
      address: '123 Sunset Boulevard, Los Angeles, CA 90028',
      phone: '(555) 123-4567',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      hours: {
        weekdays: '7:00 AM - 7:00 PM',
        saturday: '7:00 AM - 8:00 PM',
        sunday: '8:00 AM - 6:00 PM'
      },
      services: ['Basic Wash', 'Premium Detail', 'Luxury Spa'],
      features: ['Indoor Facility', 'Waiting Lounge', 'Free WiFi', 'Coffee Bar'],
      manager: 'Carlos Rodriguez',
      rating: 4.9,
      reviewCount: 847,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      availability: 'Available Today',
      nextSlot: '2:30 PM'
    },
    {
      id: 'san-francisco',
      name: 'San Francisco Bay Area',
      address: '456 Market Street, San Francisco, CA 94102',
      phone: '(555) 234-5678',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      hours: {
        weekdays: '8:00 AM - 6:00 PM',
        saturday: '8:00 AM - 7:00 PM',
        sunday: '9:00 AM - 5:00 PM'
      },
      services: ['Basic Wash', 'Premium Detail', 'Luxury Spa'],
      features: ['Eco-Friendly', 'Express Service', 'Valet Parking', 'Mobile App'],
      manager: 'Jennifer Chen',
      rating: 4.8,
      reviewCount: 623,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      availability: 'Next Available: Tomorrow',
      nextSlot: '9:00 AM'
    },
    {
      id: 'san-diego',
      name: 'San Diego Harbor',
      address: '789 Harbor Drive, San Diego, CA 92101',
      phone: '(555) 345-6789',
      coordinates: { lat: 32.7157, lng: -117.1611 },
      hours: {
        weekdays: '7:00 AM - 8:00 PM',
        saturday: '7:00 AM - 8:00 PM',
        sunday: '8:00 AM - 7:00 PM'
      },
      services: ['Basic Wash', 'Premium Detail', 'Luxury Spa', 'Fleet Service'],
      features: ['24/7 Access', 'Security Cameras', 'Covered Parking', 'Detail Shop'],
      manager: 'Michael Thompson',
      rating: 4.9,
      reviewCount: 1024,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      availability: 'Available Today',
      nextSlot: '1:15 PM'
    },
    {
      id: 'sacramento',
      name: 'Sacramento Capitol',
      address: '321 Capitol Mall, Sacramento, CA 95814',
      phone: '(555) 456-7890',
      coordinates: { lat: 38.5816, lng: -121.4944 },
      hours: {
        weekdays: '8:00 AM - 6:00 PM',
        saturday: '8:00 AM - 6:00 PM',
        sunday: '9:00 AM - 5:00 PM'
      },
      services: ['Basic Wash', 'Premium Detail', 'Luxury Spa'],
      features: ['Government Discounts', 'Fleet Service', 'Appointment Only', 'Premium Lounge'],
      manager: 'Sarah Martinez',
      rating: 4.7,
      reviewCount: 456,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      availability: 'Available Today',
      nextSlot: '3:45 PM'
    }
  ];

  const currentLocation = locations.find(loc => loc.id === selectedLocation);

  const handleCallLocation = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (location) => {
    const query = encodeURIComponent(location.address);
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
  };

  const handleBookAppointment = (location) => {
    // Scroll to booking form or open booking modal
    const bookingElement = document.getElementById('booking-form');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            <span className="text-primary">Convenient</span> California Locations
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Find the nearest California Car Wash location and book your appointment today
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location List */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedLocation === location.id
                      ? 'border-primary bg-primary-50' :'border-border bg-background hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={location.image}
                        alt={`${location.name} location`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-text-primary">{location.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          location.availability.includes('Today') 
                            ? 'bg-success-100 text-success' :'bg-warning-100 text-warning'
                        }`}>
                          {location.availability}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{location.address}</p>
                      <div className="flex items-center space-x-3 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} color="var(--color-warning)" className="fill-current" />
                          <span>{location.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{location.reviewCount} reviews</span>
                        <span>•</span>
                        <span>Next: {location.nextSlot}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map and Location Details */}
          <div className="lg:col-span-2">
            {/* Map */}
            <div className="bg-surface rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-bold text-text-primary">{currentLocation?.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setMapView('roadmap')}
                    className={`px-3 py-1 rounded text-sm ${
                      mapView === 'roadmap' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    Map
                  </button>
                  <button
                    onClick={() => setMapView('satellite')}
                    className={`px-3 py-1 rounded text-sm ${
                      mapView === 'satellite' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              </div>
              <div className="h-80">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={currentLocation?.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${currentLocation?.coordinates.lat},${currentLocation?.coordinates.lng}&z=15&t=${mapView}&output=embed`}
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-background rounded-xl border border-border shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div>
                  <h4 className="font-bold text-text-primary mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Icon name="MapPin" size={18} color="var(--color-primary)" className="mt-1" />
                      <div>
                        <p className="text-text-secondary">{currentLocation?.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={18} color="var(--color-primary)" />
                      <button
                        onClick={() => handleCallLocation(currentLocation?.phone)}
                        className="text-primary hover:text-primary-700 font-semibold"
                      >
                        {currentLocation?.phone}
                      </button>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" size={18} color="var(--color-primary)" className="mt-1" />
                      <div>
                        <p className="text-text-secondary">Mon-Fri: {currentLocation?.hours.weekdays}</p>
                        <p className="text-text-secondary">Saturday: {currentLocation?.hours.saturday}</p>
                        <p className="text-text-secondary">Sunday: {currentLocation?.hours.sunday}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="User" size={18} color="var(--color-primary)" />
                      <p className="text-text-secondary">Manager: {currentLocation?.manager}</p>
                    </div>
                  </div>
                </div>

                {/* Services & Features */}
                <div>
                  <h4 className="font-bold text-text-primary mb-4">Services & Features</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-2">Available Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentLocation?.services.map((service, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-medium"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-2">Features:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {currentLocation?.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="Check" size={14} color="var(--color-success)" />
                            <span className="text-sm text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
                <Button
                  variant="primary"
                  onClick={() => handleBookAppointment(currentLocation)}
                  iconName="Calendar"
                  iconPosition="left"
                  className="flex-1 bg-accent hover:bg-accent-700 text-accent-foreground font-semibold"
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleGetDirections(currentLocation)}
                  iconName="Navigation"
                  iconPosition="left"
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Get Directions
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleCallLocation(currentLocation?.phone)}
                  iconName="Phone"
                  iconPosition="left"
                  className="flex-1 text-success hover:bg-success-50"
                >
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Location Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-surface rounded-xl border border-border">
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <p className="text-text-secondary">California Locations</p>
          </div>
          <div className="text-center p-6 bg-surface rounded-xl border border-border">
            <div className="text-3xl font-bold text-success mb-2">98%</div>
            <p className="text-text-secondary">On-Time Service</p>
          </div>
          <div className="text-center p-6 bg-surface rounded-xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">15min</div>
            <p className="text-text-secondary">Average Wait Time</p>
          </div>
          <div className="text-center p-6 bg-surface rounded-xl border border-border">
            <div className="text-3xl font-bold text-warning mb-2">4.8★</div>
            <p className="text-text-secondary">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;