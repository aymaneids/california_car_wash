import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceSelector = ({ selectedService, onServiceSelect, onBookService }) => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 'basic',
      name: 'Basic Wash',
      price: 15,
      duration: '10-15 min',
      description: 'Essential exterior cleaning for daily maintenance',
      features: [
        'Exterior wash and rinse',
        'Wheel cleaning',
        'Basic tire shine',
        'Hand dry with microfiber towels',
        'Interior vacuum (front seats)',
        'Dashboard wipe down'
      ],
      beforeImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      popular: false,
      savings: 0,
      icon: 'Droplets'
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      price: 35,
      duration: '20-25 min',
      description: 'Complete interior and exterior professional care',
      features: [
        'Everything in Basic Wash',
        'Complete interior vacuum',
        'Dashboard and console deep clean',
        'Window cleaning (inside & out)',
        'Premium tire shine',
        'Air freshener application',
        'Seat cleaning and conditioning',
        'Door jamb cleaning'
      ],
      beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      popular: true,
      savings: 10,
      icon: 'Sparkles'
    },
    {
      id: 'executive',
      name: 'Executive Treatment',
      price: 55,
      duration: '35-40 min',
      description: 'Ultimate showroom-quality transformation',
      features: [
        'Everything in Premium Detail',
        'Clay bar treatment',
        'Paint protection application',
        'Leather conditioning',
        'Engine bay cleaning',
        'Undercarriage wash',
        'Premium wax application',
        'Headlight restoration',
        'Chrome polishing'
      ],
      beforeImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      popular: false,
      savings: 20,
      icon: 'Crown'
    }
  ];

  const addOnServices = [
    { id: 'wax', name: 'Premium Wax Protection', price: 10, icon: 'Shield', description: 'Long-lasting paint protection' },
    { id: 'interior', name: 'Deep Interior Detailing', price: 15, icon: 'Home', description: 'Comprehensive interior cleaning' },
    { id: 'engine', name: 'Engine Bay Detailing', price: 12, icon: 'Zap', description: 'Professional engine cleaning' },
    { id: 'ceramic', name: 'Ceramic Coating', price: 25, icon: 'Gem', description: 'Ultimate paint protection' }
  ];

  const handleServiceClick = (serviceId) => {
    onServiceSelect?.(serviceId);
  };

  const handleBookClick = (service) => {
    onBookService?.(service);
  };

  return (
    <section id="service-selector" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Choose Your <span className="text-primary">Perfect Service</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Professional car care with real-time pricing updates and interactive service previews
          </p>
        </div>

        {/* Main Service Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative bg-background rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                selectedService === service.id
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary-300 hover:shadow-md'
              }`}
              onClick={() => handleServiceClick(service.id)}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {service.savings > 0 && (
                <div className="absolute -top-3 -right-3 bg-success text-success-foreground w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold shadow-md z-10">
                  Save ${service.savings}
                </div>
              )}

              <div className="p-6">
                {/* Before/After Images */}
                <div className="relative h-48 rounded-lg overflow-hidden mb-6 group">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative">
                      <img
                        src={service.beforeImage}
                        alt={`${service.name} before`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded text-xs font-bold">
                        BEFORE
                      </div>
                    </div>
                    <div className="w-1/2 relative">
                      <img
                        src={service.afterImage}
                        alt={`${service.name} after`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded text-xs font-bold">
                        AFTER
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay with service icon */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                      <Icon name={service.icon} size={32} color="var(--color-primary)" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-primary">{service.duration}</span>
                  </div>
                </div>

                {/* Service Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{service.name}</h3>
                  <p className="text-text-secondary mb-4">{service.description}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-primary">${service.price}</span>
                    <div className="text-left">
                      <div className="text-sm text-text-secondary">starting at</div>
                      <div className="text-sm text-success font-semibold">{service.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, hoveredService === service.id ? service.features.length : 4).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} color="var(--color-success)" className="mt-1 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                  {service.features.length > 4 && hoveredService !== service.id && (
                    <li className="text-sm text-primary font-semibold">
                      +{service.features.length - 4} more features
                    </li>
                  )}
                </ul>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    variant={selectedService === service.id ? "primary" : "outline"}
                    fullWidth
                    iconName={selectedService === service.id ? "Check" : "Plus"}
                    iconPosition="left"
                    className={selectedService === service.id ? "bg-primary" : ""}
                  >
                    {selectedService === service.id ? 'Selected' : 'Select Service'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookClick(service);
                    }}
                    className="text-primary hover:bg-primary-50"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-on Services */}
        <div className="bg-surface rounded-xl p-8">
          <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Enhance Your Service with Add-ons
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOnServices.map((addon) => (
              <div
                key={addon.id}
                className="group bg-background rounded-lg p-6 border border-border hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-200">
                    <Icon 
                      name={addon.icon} 
                      size={24} 
                      color="var(--color-primary)"
                      className="group-hover:text-white transition-colors duration-200"
                    />
                  </div>
                  <h4 className="font-bold text-text-primary mb-2">{addon.name}</h4>
                  <p className="text-sm text-text-secondary mb-3">{addon.description}</p>
                  <div className="text-xl font-bold text-primary">+${addon.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelector;