import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingCalculator = ({ 
  selectedService, 
  selectedLocation, 
  membershipDiscount, 
  onLocationChange, 
  onMembershipToggle 
}) => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [vehicleSize, setVehicleSize] = useState('medium');
  const [isCalculating, setIsCalculating] = useState(false);

  const basePrices = {
    basic: 15,
    premium: 35,
    executive: 55
  };

  const locationAdjustments = {
    'los-angeles': { multiplier: 1.1, name: 'Los Angeles', surcharge: 'High demand area' },
    'san-francisco': { multiplier: 1.15, name: 'San Francisco', surcharge: 'Premium location' },
    'san-diego': { multiplier: 1.0, name: 'San Diego', surcharge: 'Standard pricing' },
    'sacramento': { multiplier: 0.95, name: 'Sacramento', surcharge: 'Value pricing' },
    'fresno': { multiplier: 0.9, name: 'Fresno', surcharge: 'Best value' }
  };

  const vehicleSizeAdjustments = {
    compact: { multiplier: 0.9, name: 'Compact Car', description: 'Cars, hatchbacks' },
    medium: { multiplier: 1.0, name: 'Mid-size Vehicle', description: 'Sedans, coupes' },
    large: { multiplier: 1.2, name: 'Large Vehicle', description: 'SUVs, trucks' },
    xl: { multiplier: 1.4, name: 'Extra Large', description: 'Vans, large trucks' }
  };

  const addons = [
    { id: 'wax', name: 'Premium Wax', price: 10, description: 'Long-lasting protection' },
    { id: 'interior', name: 'Deep Interior', price: 15, description: 'Complete interior detail' },
    { id: 'engine', name: 'Engine Bay', price: 12, description: 'Engine compartment cleaning' },
    { id: 'ceramic', name: 'Ceramic Coating', price: 25, description: 'Ultimate protection' },
    { id: 'headlight', name: 'Headlight Restoration', price: 8, description: 'Crystal clear visibility' },
    { id: 'pet-hair', name: 'Pet Hair Removal', price: 7, description: 'Specialized pet hair cleaning' }
  ];

  const membershipBenefits = {
    discount: 0.15,
    name: 'VIP Membership',
    benefits: ['15% off all services', 'Priority booking', 'Free add-on monthly', 'No wait guarantee']
  };

  const calculatePrice = () => {
    const basePrice = basePrices[selectedService] || 0;
    const locationMultiplier = locationAdjustments[selectedLocation]?.multiplier || 1;
    const sizeMultiplier = vehicleSizeAdjustments[vehicleSize]?.multiplier || 1;
    
    let servicePrice = basePrice * locationMultiplier * sizeMultiplier;
    
    const addonPrice = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);

    const subtotal = servicePrice + addonPrice;
    const membershipSavings = membershipDiscount ? subtotal * membershipBenefits.discount : 0;
    const total = subtotal - membershipSavings;

    return {
      servicePrice: Math.round(servicePrice * 100) / 100,
      addonPrice,
      subtotal: Math.round(subtotal * 100) / 100,
      membershipSavings: Math.round(membershipSavings * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  };

  const handleAddonToggle = (addonId) => {
    setIsCalculating(true);
    setTimeout(() => {
      setSelectedAddons(prev => 
        prev.includes(addonId) 
          ? prev.filter(id => id !== addonId)
          : [...prev, addonId]
      );
      setIsCalculating(false);
    }, 300);
  };

  const pricing = calculatePrice();

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            <span className="text-primary">Smart</span> Pricing Calculator
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get instant pricing with location-based adjustments and membership benefits
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Controls */}
          <div className="space-y-8">
            {/* Location Selector */}
            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <Icon name="MapPin" size={20} className="mr-2 text-primary" />
                Select Location
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(locationAdjustments).map(([key, location]) => (
                  <button
                    key={key}
                    onClick={() => onLocationChange?.(key)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 ${
                      selectedLocation === key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface hover:bg-primary-50 border border-border'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{location.name}</div>
                        <div className={`text-sm ${selectedLocation === key ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                          {location.surcharge}
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${selectedLocation === key ? 'text-primary-foreground' : 'text-primary'}`}>
                        {location.multiplier > 1 ? '+' : ''}{Math.round((location.multiplier - 1) * 100)}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Size */}
            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <Icon name="Car" size={20} className="mr-2 text-primary" />
                Vehicle Size
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(vehicleSizeAdjustments).map(([key, size]) => (
                  <button
                    key={key}
                    onClick={() => setVehicleSize(key)}
                    className={`p-4 rounded-lg text-center transition-all duration-200 ${
                      vehicleSize === key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface hover:bg-primary-50 border border-border'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{size.name}</div>
                    <div className={`text-xs ${vehicleSize === key ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                      {size.description}
                    </div>
                    <div className={`text-sm font-bold mt-1 ${vehicleSize === key ? 'text-primary-foreground' : 'text-primary'}`}>
                      {size.multiplier > 1 ? '+' : ''}{Math.round((size.multiplier - 1) * 100)}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <Icon name="Plus" size={20} className="mr-2 text-primary" />
                Add-on Services
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {addons.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => handleAddonToggle(addon.id)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 ${
                      selectedAddons.includes(addon.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface hover:bg-primary-50 border border-border'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{addon.name}</div>
                        <div className={`text-sm ${selectedAddons.includes(addon.id) ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                          {addon.description}
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${selectedAddons.includes(addon.id) ? 'text-primary-foreground' : 'text-primary'}`}>
                        +${addon.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Membership Toggle */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary flex items-center">
                  <Icon name="Crown" size={20} className="mr-2 text-primary" />
                  {membershipBenefits.name}
                </h3>
                <button
                  onClick={() => onMembershipToggle?.(!membershipDiscount)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    membershipDiscount ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    membershipDiscount ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
              <ul className="space-y-1">
                {membershipBenefits.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-text-secondary">
                    <Icon name="Check" size={14} color="var(--color-success)" className="mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-background rounded-xl p-8 border border-border shadow-lg">
              <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
                Price Breakdown
              </h3>

              {isCalculating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-text-secondary">Calculating...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Service Price */}
                  <div className="flex justify-between items-center py-2 border-b border-surface">
                    <span className="text-text-secondary">
                      {selectedService?.charAt(0).toUpperCase() + selectedService?.slice(1)} Service
                    </span>
                    <span className="font-semibold">${pricing.servicePrice}</span>
                  </div>

                  {/* Add-ons */}
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-surface">
                      <span className="text-text-secondary">
                        Add-ons ({selectedAddons.length})
                      </span>
                      <span className="font-semibold">+${pricing.addonPrice}</span>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-2 border-b border-surface">
                    <span className="text-text-primary font-semibold">Subtotal</span>
                    <span className="font-semibold">${pricing.subtotal}</span>
                  </div>

                  {/* Membership Discount */}
                  {membershipDiscount && (
                    <div className="flex justify-between items-center py-2 border-b border-surface text-success">
                      <span className="flex items-center">
                        <Icon name="Crown" size={16} className="mr-2" />
                        VIP Discount (15%)
                      </span>
                      <span className="font-semibold">-${pricing.membershipSavings}</span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between items-center py-4 bg-primary-50 rounded-lg px-4">
                    <span className="text-xl font-bold text-primary">Total</span>
                    <span className="text-3xl font-bold text-primary">${pricing.total}</span>
                  </div>

                  {/* Savings Badge */}
                  {membershipDiscount && (
                    <div className="text-center">
                      <div className="inline-flex items-center bg-success-100 text-success px-4 py-2 rounded-full">
                        <Icon name="TrendingDown" size={16} className="mr-2" />
                        <span className="font-semibold">You saved ${pricing.membershipSavings}!</span>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    iconName="Calendar"
                    iconPosition="left"
                    className="bg-primary hover:bg-primary/90 text-white font-bold shadow-cta mt-6"
                  >
                    Book for ${pricing.total}
                  </Button>

                  {/* Contact Button */}
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Call for Quote
                  </Button>
                </div>
              )}
            </div>

            {/* Guarantee Badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-success-100 text-success px-6 py-3 rounded-lg border border-success-200">
                <Icon name="Shield" size={20} className="mr-3" />
                <div className="text-left">
                  <div className="font-bold">Price Match Guarantee</div>
                  <div className="text-sm">We'll beat any competitor's price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;