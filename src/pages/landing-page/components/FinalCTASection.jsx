import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinalCTASection = () => {
  const [urgencyData, setUrgencyData] = useState({
    slotsRemaining: 3,
    location: 'Los Angeles',
    nextAvailable: '2:30 PM'
  });
  const [currentOffer, setCurrentOffer] = useState(0);

  const offers = [
    {
      id: 0,
      title: 'First-Time Customer Special',
      discount: '25% OFF',
      description: 'Your first Premium Detail service',
      code: 'FIRST25',
      validUntil: 'Limited time offer',
      color: 'accent'
    },
    {
      id: 1,
      title: 'Same-Day Booking Bonus',
      discount: '$10 OFF',
      description: 'Book and wash today',
      code: 'TODAY10',
      validUntil: 'Valid until 6 PM today',
      color: 'success'
    },
    {
      id: 2,
      title: 'Membership Launch Special',
      discount: 'First Month FREE',
      description: 'With any annual membership',
      code: 'MEMBER2024',
      validUntil: 'This month only',
      color: 'primary'
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setUrgencyData(prev => ({
        ...prev,
        slotsRemaining: Math.max(1, prev.slotsRemaining - Math.floor(Math.random() * 2))
      }));
    }, 45000);

    // Rotate offers
    const offerInterval = setInterval(() => {
      setCurrentOffer(prev => (prev + 1) % offers.length);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(offerInterval);
    };
  }, []);

  const handleBookNow = () => {
    const bookingElement = document.getElementById('booking-form');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+1-555-CAR-WASH';
  };

  const handleGetQuote = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentOfferData = offers[currentOffer];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative">
        {/* Urgency Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-warning text-warning-foreground rounded-full font-bold animate-pulse">
            <Icon name="Clock" size={20} />
            <span>Only {urgencyData.slotsRemaining} slots remaining today in {urgencyData.location}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready for a <span className="text-accent">Spotless</span> Car?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join thousands of satisfied California customers who trust us with their vehicles. 
              Professional results, eco-friendly process, satisfaction guaranteed.
            </p>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="white" />
                </div>
                <span className="text-primary-100">15-minute express service</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="white" />
                </div>
                <span className="text-primary-100">100% satisfaction guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="white" />
                </div>
                <span className="text-primary-100">Eco-friendly products</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="white" />
                </div>
                <span className="text-primary-100">4 convenient locations</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBookNow}
                iconName="Calendar"
                iconPosition="left"
                iconSize={20}
                className="bg-accent hover:bg-accent-700 text-accent-foreground font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Book Your Wash Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleCallNow}
                iconName="Phone"
                iconPosition="left"
                iconSize={20}
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
              >
                Call (555) CAR-WASH
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} color="var(--color-warning)" className="fill-current" />
                <span className="text-primary-100">4.8/5 rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} color="var(--color-success)" />
                <span className="text-primary-100">10,000+ customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} color="var(--color-accent)" />
                <span className="text-primary-100">Insured & bonded</span>
              </div>
            </div>
          </div>

          {/* Right Content - Special Offer */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="mb-6">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                  currentOfferData.color === 'accent' ? 'bg-accent text-accent-foreground' :
                  currentOfferData.color === 'success' ? 'bg-success text-success-foreground' :
                  'bg-primary-500 text-white'
                }`}>
                  {currentOfferData.title}
                </div>
                <div className="text-5xl font-bold text-accent mb-2">
                  {currentOfferData.discount}
                </div>
                <p className="text-xl text-primary-100 mb-4">
                  {currentOfferData.description}
                </p>
                <div className="bg-white/20 rounded-lg p-4 mb-6">
                  <div className="text-sm text-primary-100 mb-2">Promo Code:</div>
                  <div className="text-2xl font-bold text-white tracking-wider">
                    {currentOfferData.code}
                  </div>
                </div>
                <p className="text-sm text-primary-200">
                  {currentOfferData.validUntil}
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleBookNow}
                  iconName="Gift"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent-700 text-accent-foreground font-bold"
                >
                  Claim This Offer
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleGetQuote}
                  iconName="Calculator"
                  iconPosition="left"
                  className="text-white hover:bg-white/10 border border-white/30"
                >
                  Get Custom Quote
                </Button>
              </div>
            </div>

            {/* Offer Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentOffer(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentOffer ? 'bg-accent' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-12 border-t border-white/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">15min</div>
              <p className="text-primary-100">Average Service Time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">98%</div>
              <p className="text-primary-100">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">4.8★</div>
              <p className="text-primary-100">Google Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <p className="text-primary-100">Online Booking</p>
            </div>
          </div>
        </div>

        {/* Final Urgency Message */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-warning/20 border border-warning/30 rounded-lg">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <span className="text-warning font-semibold">
              Next available slot: Today at {urgencyData.nextAvailable}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;