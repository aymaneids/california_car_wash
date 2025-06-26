import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LocationSelector from '../../../components/ui/LocationSelector';

const HeroSection = ({ onGetQuote, onBookNow }) => {
  const [userLocation, setUserLocation] = useState('California');
  const [currentStats, setCurrentStats] = useState({
    customersToday: 47,
    avgServiceTime: 15,
    googleRating: 4.8
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        ...prev,
        customersToday: prev.customersToday + Math.floor(Math.random() * 3)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLocationDetected = (location) => {
    if (location && location.name) {
      setUserLocation(location.name);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative container-custom pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-success-100 text-success rounded-full text-sm font-semibold">
                <Icon name="MapPin" size={16} className="mr-2" />
                Now serving {userLocation}
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Premium Car Wash Services in{' '}
              <span className="text-primary">{userLocation}</span>
              <br />
              <span className="text-accent">Showroom Quality</span> in 15 Minutes
            </h1>

            <p className="text-xl text-text-secondary mb-8 max-w-2xl">
              Eco-friendly, professional car care while you relax. Satisfaction guaranteed with water-saving techniques and premium products.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                onClick={onGetQuote}
                iconName="Calculator"
                iconPosition="left"
                iconSize={20}
                className="bg-accent hover:bg-accent-700 text-accent-foreground font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Get Instant Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onBookNow}
                iconName="Calendar"
                iconPosition="left"
                iconSize={20}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
              >
                Book Now
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border shadow-lg">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon name="Users" size={20} color="var(--color-primary)" className="mr-2" />
                  <span className="text-2xl font-bold text-primary">{currentStats.customersToday}</span>
                </div>
                <p className="text-sm text-text-secondary">Served Today</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon name="Clock" size={20} color="var(--color-success)" className="mr-2" />
                  <span className="text-2xl font-bold text-success">{currentStats.avgServiceTime}min</span>
                </div>
                <p className="text-sm text-text-secondary">Avg Service Time</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        color={i < Math.floor(currentStats.googleRating) ? "var(--color-warning)" : "var(--color-border)"}
                        className={i < Math.floor(currentStats.googleRating) ? "fill-current" : ""}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-warning ml-2">{currentStats.googleRating}</span>
                </div>
                <p className="text-sm text-text-secondary">Google Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Location Selector & Hero Image */}
          <div className="space-y-6">
            <div className="bg-background/90 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Find Your Nearest Location</h3>
              <LocationSelector onLocationSelect={handleLocationDetected} />
            </div>

            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional car wash service showing clean, shiny vehicle"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="font-semibold">Professional Results</p>
                    <p className="text-sm opacity-90">Every time, guaranteed</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={20} />
                    <span className="text-sm">Insured & Bonded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Testimonial Notification */}
        <div className="fixed bottom-20 left-4 right-4 lg:left-auto lg:right-8 lg:w-80 z-50 animate-slide-up">
          <div className="bg-background border border-border rounded-lg shadow-lg p-4">
            <div className="flex items-start space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/32.jpg"
                alt="Customer testimonial"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-sm text-text-primary">Sarah M.</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} color="var(--color-warning)" className="fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-text-secondary">"Amazing service! My car looks brand new. The team was professional and fast."</p>
                <p className="text-xs text-text-muted mt-1">Los Angeles • 2 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;