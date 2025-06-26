import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceShowcase = ({ onSelectPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [selectedAddons, setSelectedAddons] = useState([]);

  const packages = [
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
        'Hand dry with microfiber towels'
      ],
      popular: false,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      price: 35,
      duration: '20-25 min',
      description: 'Complete interior and exterior professional care',
      features: [
        'Everything in Basic Wash',
        'Interior vacuum and wipe down',
        'Dashboard and console cleaning',
        'Window cleaning (inside & out)',
        'Premium tire shine',
        'Air freshener application'
      ],
      popular: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'luxury',
      name: 'Luxury Spa',
      price: 55,
      duration: '35-40 min',
      description: 'Ultimate showroom-quality treatment',
      features: [
        'Everything in Premium Detail',
        'Clay bar treatment',
        'Paint protection application',
        'Leather conditioning',
        'Engine bay cleaning',
        'Undercarriage wash',
        'Premium wax application'
      ],
      popular: false,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const addons = [
    { id: 'wax', name: 'Premium Wax', price: 10, icon: 'Sparkles' },
    { id: 'interior', name: 'Deep Interior Clean', price: 15, icon: 'Home' },
    { id: 'engine', name: 'Engine Bay Detail', price: 12, icon: 'Zap' },
    { id: 'headlight', name: 'Headlight Restoration', price: 8, icon: 'Sun' }
  ];

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    if (onSelectPackage) {
      const pkg = packages.find(p => p.id === packageId);
      onSelectPackage(pkg);
    }
  };

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const packagePrice = packages.find(p => p.id === selectedPackage)?.price || 0;
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    return packagePrice + addonsPrice;
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Choose Your <span className="text-primary">Perfect Package</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Professional car care tailored to your needs and schedule
          </p>
        </div>

        {/* Package Selection */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-background rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                selectedPackage === pkg.id
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary-300'
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                  <img
                    src={pkg.image}
                    alt={`${pkg.name} service example`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-primary">{pkg.duration}</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{pkg.name}</h3>
                  <p className="text-text-secondary mb-4">{pkg.description}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-primary">${pkg.price}</span>
                    <div className="text-left">
                      <div className="text-sm text-text-secondary">starting at</div>
                      <div className="text-sm text-success font-semibold">{pkg.duration}</div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} color="var(--color-success)" className="mt-1 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={selectedPackage === pkg.id ? "primary" : "outline"}
                  fullWidth
                  iconName={selectedPackage === pkg.id ? "Check" : "Plus"}
                  iconPosition="left"
                  className={selectedPackage === pkg.id ? "bg-primary" : ""}
                >
                  {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-surface rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Enhance Your Service
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon) => (
              <div
                key={addon.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAddons.includes(addon.id)
                    ? 'border-primary bg-primary-50' :'border-border bg-background hover:border-primary-300'
                }`}
                onClick={() => handleAddonToggle(addon.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedAddons.includes(addon.id) ? 'bg-primary' : 'bg-surface'
                  }`}>
                    <Icon 
                      name={addon.icon} 
                      size={20} 
                      color={selectedAddons.includes(addon.id) ? "white" : "var(--color-text-secondary)"} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-text-primary">{addon.name}</div>
                    <div className="text-sm text-primary font-bold">+${addon.price}</div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedAddons.includes(addon.id)
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {selectedAddons.includes(addon.id) && (
                      <Icon name="Check" size={12} color="white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-text-primary">Your Selection</h4>
              <p className="text-text-secondary">
                {packages.find(p => p.id === selectedPackage)?.name}
                {selectedAddons.length > 0 && ` + ${selectedAddons.length} add-on${selectedAddons.length > 1 ? 's' : ''}`}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">${calculateTotal()}</div>
              <div className="text-sm text-text-secondary">Total Price</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              iconName="Calendar"
              iconPosition="left"
              className="flex-1 bg-accent hover:bg-accent-700 text-accent-foreground font-semibold"
            >
              Book This Service
            </Button>
            <Button
              variant="outline"
              iconName="Calculator"
              iconPosition="left"
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Get Detailed Quote
            </Button>
          </div>
        </div>

        {/* Service Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-3 px-6 py-4 bg-success-100 rounded-lg border border-success-200">
            <Icon name="Shield" size={24} color="var(--color-success)" />
            <div className="text-left">
              <div className="font-bold text-success">100% Satisfaction Guarantee</div>
              <div className="text-sm text-success-700">Not happy? We'll make it right or refund your money</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;