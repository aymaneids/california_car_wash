import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'locations', label: 'Locations', href: '#locations' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-200 ease-in-out ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm shadow-md' 
          : 'bg-background'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon 
                  name="Droplets" 
                  size={24} 
                  color="white" 
                  strokeWidth={2}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary leading-tight">
                  California
                </span>
                <span className="text-sm font-semibold text-text-secondary leading-tight">
                  Car Wash
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`nav-link ${
                  activeSection === item.id ? 'active' : ''
                } px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:text-primary focus:outline-none focus:text-primary`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleCallClick}
              iconName="Phone"
              iconPosition="left"
              iconSize={18}
              className="text-primary hover:text-primary-700 font-semibold"
            >
              (555) CAR-WASH
            </Button>
            <Button
              variant="primary"
              onClick={handleQuoteClick}
              iconName="Calendar"
              iconPosition="left"
              iconSize={18}
              className="bg-accent hover:bg-accent-700 text-accent-foreground font-semibold shadow-cta hover:shadow-lg transition-all duration-200"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={handleCallClick}
              iconName="Phone"
              iconSize={20}
              className="text-primary p-2"
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-text-primary hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary"
              aria-label="Toggle menu"
            >
              <Icon 
                name={isMenuOpen ? "X" : "Menu"} 
                size={24} 
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg animate-fade-in">
            <nav className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left nav-link ${
                    activeSection === item.id ? 'active' : ''
                  } px-3 py-3 text-base font-medium transition-colors duration-200 ease-in-out hover:text-primary focus:outline-none focus:text-primary border-b border-surface last:border-b-0`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  onClick={handleCallClick}
                  iconName="Phone"
                  iconPosition="left"
                  iconSize={18}
                  fullWidth
                  className="justify-center font-semibold"
                >
                  Call (555) CAR-WASH
                </Button>
                <Button
                  variant="primary"
                  onClick={handleQuoteClick}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={18}
                  fullWidth
                  className="justify-center bg-accent hover:bg-accent-700 text-accent-foreground font-semibold shadow-cta"
                >
                  Get Free Quote
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;