import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = ({ onSelectPackage }) => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [usageFrequency, setUsageFrequency] = useState(4);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Wash',
      description: 'Perfect for regular maintenance',
      price: { single: 15, monthly: 12, annual: 10 },
      duration: '10-15 min',
      features: [
        'Exterior wash and rinse',
        'Wheel cleaning',
        'Basic tire shine',
        'Hand dry with microfiber towels',
        'Spot-free rinse'
      ],
      popular: false,
      color: 'border-border',
      savings: 20
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      description: 'Most popular choice for complete care',
      price: { single: 35, monthly: 28, annual: 24 },
      duration: '20-25 min',
      features: [
        'Everything in Basic Wash',
        'Interior vacuum and wipe down',
        'Dashboard and console cleaning',
        'Window cleaning (inside & out)',
        'Premium tire shine',
        'Air freshener application',
        'Floor mat cleaning'
      ],
      popular: true,
      color: 'border-primary',
      savings: 31
    },
    {
      id: 'luxury',
      name: 'Luxury Spa',
      description: 'Ultimate showroom-quality treatment',
      price: { single: 55, monthly: 44, annual: 38 },
      duration: '35-40 min',
      features: [
        'Everything in Premium Detail',
        'Clay bar treatment',
        'Paint protection application',
        'Leather conditioning',
        'Engine bay cleaning',
        'Undercarriage wash',
        'Premium wax application',
        'Headlight restoration'
      ],
      popular: false,
      color: 'border-accent',
      savings: 45
    }
  ];

  const membershipBenefits = [
    { icon: 'Percent', title: 'Save up to 31%', description: 'Significant discounts on every wash' },
    { icon: 'Calendar', title: 'Priority Booking', description: 'Skip the wait with member-only time slots' },
    { icon: 'Gift', title: 'Exclusive Perks', description: 'Free upgrades and seasonal promotions' },
    { icon: 'RotateCcw', title: 'Flexible Plans', description: 'Pause or cancel anytime, no contracts' }
  ];

  const calculateMonthlySavings = () => {
    const singlePrice = packages.find(p => p.id === selectedPlan)?.price.single || 0;
    const memberPrice = packages.find(p => p.id === selectedPlan)?.price[billingCycle] || 0;
    return (singlePrice - memberPrice) * usageFrequency;
  };

  const calculateAnnualSavings = () => {
    return calculateMonthlySavings() * 12;
  };

  const handlePackageSelect = (packageId) => {
    setSelectedPlan(packageId);
    if (onSelectPackage) {
      const pkg = packages.find(p => p.id === packageId);
      onSelectPackage(pkg);
    }
  };

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            <span className="text-accent">Transparent</span> Pricing Plans
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose the perfect plan for your car care needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-background rounded-lg p-1 border border-border">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
                billingCycle === 'monthly' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 relative ${
                billingCycle === 'annual' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-primary'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-background rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                pkg.popular ? 'border-primary shadow-lg scale-105' : pkg.color
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{pkg.name}</h3>
                  <p className="text-text-secondary mb-6">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-5xl font-bold text-primary">
                        ${pkg.price[billingCycle]}
                      </span>
                      <div className="text-left">
                        <div className="text-sm text-text-secondary">per wash</div>
                        <div className="text-sm text-success font-semibold">{pkg.duration}</div>
                      </div>
                    </div>
                    
                    {billingCycle !== 'single' && (
                      <div className="mt-2">
                        <span className="text-sm text-text-secondary line-through">
                          ${pkg.price.single} regular price
                        </span>
                        <span className="ml-2 text-sm text-success font-semibold">
                          Save ${pkg.savings}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} color="var(--color-success)" className="mt-1 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.popular ? "primary" : "outline"}
                  fullWidth
                  onClick={() => handlePackageSelect(pkg.id)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className={pkg.popular ? "bg-accent hover:bg-accent-700 text-accent-foreground" : ""}
                >
                  {pkg.popular ? 'Get Started' : 'Choose Plan'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Membership Benefits */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mb-12 border border-primary-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Membership Benefits
            </h3>
            <p className="text-text-secondary">
              Join thousands of satisfied members enjoying exclusive perks
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit.icon} size={24} color="white" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">{benefit.title}</h4>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Calculator */}
        <div className="bg-background rounded-xl p-8 border border-border shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Calculate Your Savings
            </h3>
            <p className="text-text-secondary">
              See how much you can save with a membership plan
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  How often do you wash your car?
                </label>
                <div className="space-y-2">
                  {[
                    { value: 2, label: 'Twice a month' },
                    { value: 4, label: 'Weekly (Recommended)' },
                    { value: 8, label: 'Twice a week' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setUsageFrequency(option.value)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        usageFrequency === option.value
                          ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Your Savings Summary
                </label>
                <div className="bg-success-50 rounded-lg p-4 border border-success-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Monthly Savings:</span>
                      <span className="font-bold text-success">${calculateMonthlySavings()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Annual Savings:</span>
                      <span className="font-bold text-success">${calculateAnnualSavings()}</span>
                    </div>
                    <div className="border-t border-success-200 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-text-primary">Total Value:</span>
                        <span className="font-bold text-success text-lg">${calculateAnnualSavings() + 200}</span>
                      </div>
                      <p className="text-xs text-success-700 mt-1">
                        Including time saved and convenience value
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                iconName="Calculator"
                iconPosition="left"
                className="bg-accent hover:bg-accent-700 text-accent-foreground font-bold"
              >
                Start Saving Today
              </Button>
            </div>
          </div>
        </div>

        {/* Limited Time Offer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-warning-100 border border-warning-200 rounded-lg p-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Icon name="Clock" size={24} color="var(--color-warning)" />
              <span className="text-lg font-bold text-warning">Limited Time Offer</span>
            </div>
            <p className="text-warning-700 mb-4">
              Get your first month FREE when you sign up for any annual membership plan
            </p>
            <div className="text-2xl font-bold text-warning">
              Save an additional $50 this month!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;