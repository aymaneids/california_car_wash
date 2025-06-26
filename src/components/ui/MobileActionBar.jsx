import React, { useState, useEffect } from 'react';
import Button from './Button';

const MobileActionBar = () => {
  const [currentAction, setCurrentAction] = useState('quote');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Hide on scroll down, show on scroll up
      setIsVisible(scrollDirection === 'up' || currentScrollY < 100);
      
      // Switch action based on scroll position
      const contactSection = document.getElementById('contact');
      const servicesSection = document.getElementById('services');
      
      if (contactSection && servicesSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const servicesRect = servicesSection.getBoundingClientRect();
        
        // Show phone when in contact section, quote otherwise
        if (contactRect.top <= window.innerHeight && contactRect.bottom >= 0) {
          setCurrentAction('phone');
        } else if (servicesRect.top <= window.innerHeight && servicesRect.bottom >= 0) {
          setCurrentAction('quote');
        } else {
          setCurrentAction('quote');
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleQuoteClick = () => {
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      const headerHeight = 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+1-555-CAR-WASH';
  };

  const handleLocationClick = () => {
    const targetElement = document.getElementById('locations');
    if (targetElement) {
      const headerHeight = 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-150 bg-background border-t border-border shadow-lg">
      <div className="flex items-center justify-between p-4 space-x-3">
        {currentAction === 'quote' ? (
          <>
            <Button
              variant="outline"
              onClick={handleLocationClick}
              iconName="MapPin"
              iconPosition="left"
              iconSize={18}
              className="flex-1 justify-center font-semibold text-primary border-primary hover:bg-primary-50"
            >
              Find Location
            </Button>
            <Button
              variant="primary"
              onClick={handleQuoteClick}
              iconName="Calendar"
              iconPosition="left"
              iconSize={18}
              className="flex-1 justify-center bg-accent hover:bg-accent-700 text-accent-foreground font-semibold shadow-cta"
            >
              Get Quote
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={handleQuoteClick}
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={18}
              className="flex-1 justify-center font-semibold text-primary border-primary hover:bg-primary-50"
            >
              Get Quote
            </Button>
            <Button
              variant="primary"
              onClick={handleCallClick}
              iconName="Phone"
              iconPosition="left"
              iconSize={18}
              className="flex-1 justify-center bg-success hover:bg-success-500 text-success-foreground font-semibold shadow-cta"
            >
              Call Now
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileActionBar;