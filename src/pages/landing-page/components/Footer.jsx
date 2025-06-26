import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const locations = [
    {
      name: 'Los Angeles',
      address: '123 Sunset Blvd, LA, CA 90028',
      phone: '(555) 123-4567'
    },
    {
      name: 'San Francisco',
      address: '456 Market St, SF, CA 94102',
      phone: '(555) 234-5678'
    },
    {
      name: 'San Diego',
      address: '789 Harbor Dr, SD, CA 92101',
      phone: '(555) 345-6789'
    },
    {
      name: 'Sacramento',
      address: '321 Capitol Mall, SAC, CA 95814',
      phone: '(555) 456-7890'
    }
  ];

  const services = [
    'Basic Wash',
    'Premium Detail',
    'Luxury Spa',
    'Fleet Services',
    'Membership Plans',
    'Gift Cards'
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Locations', href: '#locations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refunds' },
    { name: 'Accessibility', href: '/accessibility' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/californiacarwash' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com/californiacarwash' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/californiacarwash' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/californiacarwash' }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const targetElement = document.getElementById(href.replace('#', ''));
      if (targetElement) {
        const headerHeight = 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  const handleCallClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@californiacarwash.com';
  };

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Droplets" size={28} color="white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white leading-tight">
                  California
                </span>
                <span className="text-lg font-semibold text-primary-200 leading-tight">
                  Car Wash
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Professional car wash services across California. Eco-friendly, convenient, and guaranteed to make your vehicle shine.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} color="var(--color-primary)" />
                <button
                  onClick={() => handleCallClick('(555) CAR-WASH')}
                  className="text-primary hover:text-primary-300 font-semibold transition-colors"
                >
                  (555) CAR-WASH
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} color="var(--color-primary)" />
                <button
                  onClick={handleEmailClick}
                  className="text-primary hover:text-primary-300 transition-colors"
                >
                  info@californiacarwash.com
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={18} color="var(--color-primary)" />
                <span className="text-gray-300">Mon-Sun: 7AM-8PM</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick('#services')}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Our Locations</h3>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="text-sm">
                  <h4 className="font-semibold text-white mb-1">{location.name}</h4>
                  <p className="text-gray-300 mb-1">{location.address}</p>
                  <button
                    onClick={() => handleCallClick(location.phone)}
                    className="text-primary hover:text-primary-300 transition-colors"
                  >
                    {location.phone}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with Special Offers
              </h3>
              <p className="text-gray-300">
                Get exclusive discounts, car care tips, and be the first to know about new services.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="primary"
                iconName="Mail"
                iconPosition="left"
                className="bg-accent hover:bg-accent-700 text-accent-foreground font-semibold whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media & Certifications */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 font-semibold">Follow Us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(social.href)}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon name={social.icon} size={20} color="white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Leaf" size={20} color="var(--color-success)" />
                <span className="text-sm text-gray-300">California Green Business</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} color="var(--color-primary)" />
                <span className="text-sm text-gray-300">Insured & Bonded</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} color="var(--color-warning)" />
                <span className="text-sm text-gray-300">BBB A+ Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 py-6">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} California Car Wash. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              {legalLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;