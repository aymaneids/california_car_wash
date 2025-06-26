import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceHero = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const services = [
    {
      id: 'basic',
      name: 'Basic Wash',
      tagline: 'Essential Care',
      description: 'Perfect for daily maintenance and quick touch-ups',
      price: 15,
      duration: '10-15 min',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      tagline: 'Complete Care',
      description: 'Comprehensive interior and exterior professional service',
      price: 35,
      duration: '20-25 min',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'executive',
      name: 'Executive Treatment',
      tagline: 'Luxury Experience',
      description: 'Ultimate showroom-quality transformation',
      price: 55,
      duration: '35-40 min',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  const currentService = services[currentServiceIndex];

  const handleServiceSelect = (index) => {
    setCurrentServiceIndex(index);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('service-selector');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <img
          src={currentService.image}
          alt={`${currentService.name} service`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`absolute inset-0 bg-gradient-to-r ${currentService.gradient} opacity-20`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Service Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Icon name="Sparkles" size={16} color="white" />
            <span className="text-sm font-semibold">{currentService.tagline}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Professional
            <span className={`block bg-gradient-to-r ${currentService.gradient} bg-clip-text text-transparent`}>
              {currentService.name}
            </span>
            Services
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {currentService.description}
          </p>

          {/* Pricing & Duration */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                ${currentService.price}
              </div>
              <div className="text-sm text-white/70">Starting Price</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {currentService.duration}
              </div>
              <div className="text-sm text-white/70">Service Time</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToServices}
              iconName="Calendar"
              iconPosition="left"
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-cta px-8 py-4"
            >
              Explore All Services
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4"
              onClick={() => window.location.href = 'tel:+1-555-CAR-WASH'}
            >
              Call Now
            </Button>
          </div>

          {/* Service Indicators */}
          <div className="flex justify-center space-x-3">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentServiceIndex 
                    ? 'bg-white scale-125' :'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} color="white" />
      </div>
    </section>
  );
};

export default ServiceHero;