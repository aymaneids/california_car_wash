import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceComparison = () => {
  const [activeTab, setActiveTab] = useState('features');

  const services = [
    {
      id: 'basic',
      name: 'Basic Wash',
      price: 15,
      duration: '10-15 min',
      icon: 'Droplets',
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      price: 35,
      duration: '20-25 min',
      icon: 'Sparkles',
      color: 'purple',
      popular: true
    },
    {
      id: 'executive',
      name: 'Executive Treatment',
      price: 55,
      duration: '35-40 min',
      icon: 'Crown',
      color: 'amber'
    }
  ];

  const comparisonData = {
    features: [
      { name: 'Exterior Wash & Rinse', basic: true, premium: true, executive: true },
      { name: 'Wheel Cleaning', basic: true, premium: true, executive: true },
      { name: 'Basic Tire Shine', basic: true, premium: false, executive: false },
      { name: 'Hand Dry', basic: true, premium: true, executive: true },
      { name: 'Interior Vacuum', basic: 'Partial', premium: true, executive: true },
      { name: 'Dashboard Cleaning', basic: 'Basic', premium: true, executive: true },
      { name: 'Window Cleaning', basic: false, premium: true, executive: true },
      { name: 'Premium Tire Shine', basic: false, premium: true, executive: true },
      { name: 'Air Freshener', basic: false, premium: true, executive: true },
      { name: 'Seat Conditioning', basic: false, premium: 'Fabric Only', executive: true },
      { name: 'Door Jamb Cleaning', basic: false, premium: true, executive: true },
      { name: 'Clay Bar Treatment', basic: false, premium: false, executive: true },
      { name: 'Paint Protection', basic: false, premium: false, executive: true },
      { name: 'Leather Conditioning', basic: false, premium: false, executive: true },
      { name: 'Engine Bay Cleaning', basic: false, premium: false, executive: true },
      { name: 'Undercarriage Wash', basic: false, premium: false, executive: true },
      { name: 'Premium Wax', basic: false, premium: false, executive: true },
      { name: 'Headlight Restoration', basic: false, premium: false, executive: true },
      { name: 'Chrome Polishing', basic: false, premium: false, executive: true }
    ],
    benefits: [
      { name: 'Time to Complete', basic: '10-15 min', premium: '20-25 min', executive: '35-40 min' },
      { name: 'Satisfaction Guarantee', basic: true, premium: true, executive: true },
      { name: 'Eco-Friendly Products', basic: 'Standard', premium: 'Premium', executive: 'Ultra Premium' },
      { name: 'Water Conservation', basic: '30% less', premium: '40% less', executive: '50% less' },
      { name: 'Service Warranty', basic: '24 hours', premium: '48 hours', executive: '7 days' },
      { name: 'Priority Booking', basic: false, premium: false, executive: true },
      { name: 'Free Touch-ups', basic: false, premium: false, executive: '30 days' },
      { name: 'VIP Treatment', basic: false, premium: false, executive: true }
    ],
    addons: [
      { name: 'Premium Wax Protection', basic: '$10', premium: '$8', executive: 'Included' },
      { name: 'Deep Interior Detailing', basic: '$15', premium: '$12', executive: 'Included' },
      { name: 'Engine Bay Detailing', basic: '$12', premium: '$10', executive: 'Included' },
      { name: 'Ceramic Coating', basic: '$25', premium: '$22', executive: '$15' },
      { name: 'Headlight Restoration', basic: '$8', premium: '$6', executive: 'Included' },
      { name: 'Pet Hair Removal', basic: '$7', premium: '$5', executive: '$3' }
    ]
  };

  const competitors = [
    {
      name: 'Quick Wash Co.',
      basic: 18,
      premium: 38,
      executive: 65,
      rating: 3.8,
      notes: 'Basic service only'
    },
    {
      name: 'Premium Auto Spa',
      basic: 22,
      premium: 42,
      executive: 68,
      rating: 4.2,
      notes: 'Limited locations'
    },
    {
      name: 'Express Detail',
      basic: 16,
      premium: 40,
      executive: 62,
      rating: 4.0,
      notes: 'No warranty'
    }
  ];

  const renderFeatureValue = (value) => {
    if (value === true) {
      return <Icon name="Check" size={20} color="var(--color-success)" />;
    } else if (value === false) {
      return <Icon name="X" size={20} color="var(--color-error)" />;
    } else {
      return <span className="text-sm font-medium text-primary">{value}</span>;
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Compare Our <span className="text-primary">Service Packages</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See exactly what's included in each service tier and how we stack up against competitors
          </p>
        </div>

        {/* Comparison Table Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-surface rounded-lg p-1 flex space-x-1">
            {[
              { id: 'features', label: 'Features', icon: 'List' },
              { id: 'benefits', label: 'Benefits', icon: 'Award' },
              { id: 'addons', label: 'Add-ons', icon: 'Plus' },
              { id: 'competitors', label: 'Competitors', icon: 'TrendingUp' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Headers */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div></div>
          {services.map((service) => (
            <div key={service.id} className="text-center">
              <div className={`relative bg-${service.color}-50 rounded-xl p-6 border-2 ${
                service.popular ? 'border-primary' : 'border-border'
              }`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`w-12 h-12 bg-${service.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={service.icon} size={24} color="white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{service.name}</h3>
                <div className="text-3xl font-bold text-primary mb-1">${service.price}</div>
                <div className="text-sm text-text-secondary">{service.duration}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Content */}
        <div className="bg-background rounded-xl border border-border overflow-hidden">
          {activeTab === 'competitors' ? (
            <div className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-6">Price Comparison with Competitors</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold text-text-primary">Provider</th>
                      <th className="text-center py-4 px-4 font-semibold text-text-primary">Basic</th>
                      <th className="text-center py-4 px-4 font-semibold text-text-primary">Premium</th>
                      <th className="text-center py-4 px-4 font-semibold text-text-primary">Executive</th>
                      <th className="text-center py-4 px-4 font-semibold text-text-primary">Rating</th>
                      <th className="text-center py-4 px-4 font-semibold text-text-primary">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border bg-primary-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                            <Icon name="Crown" size={16} color="white" />
                          </div>
                          <span className="font-bold text-primary">California Car Wash</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4 font-bold text-primary">$15</td>
                      <td className="text-center py-4 px-4 font-bold text-primary">$35</td>
                      <td className="text-center py-4 px-4 font-bold text-primary">$55</td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center">
                          <span className="font-bold text-warning mr-1">4.9</span>
                          <Icon name="Star" size={16} color="var(--color-warning)" className="fill-current" />
                        </div>
                      </td>
                      <td className="text-center py-4 px-4 text-success font-semibold">Full service guarantee</td>
                    </tr>
                    {competitors.map((competitor, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-4 px-4 font-medium text-text-primary">{competitor.name}</td>
                        <td className="text-center py-4 px-4">${competitor.basic}</td>
                        <td className="text-center py-4 px-4">${competitor.premium}</td>
                        <td className="text-center py-4 px-4">${competitor.executive}</td>
                        <td className="text-center py-4 px-4">
                          <div className="flex items-center justify-center">
                            <span className="font-medium mr-1">{competitor.rating}</span>
                            <Icon name="Star" size={16} color="var(--color-warning)" className="fill-current" />
                          </div>
                        </td>
                        <td className="text-center py-4 px-4 text-text-secondary text-sm">{competitor.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {comparisonData[activeTab]?.map((item, index) => (
                    <tr key={index} className={`border-b border-border ${index % 2 === 0 ? 'bg-surface' : 'bg-background'}`}>
                      <td className="py-4 px-6 font-medium text-text-primary min-w-[200px]">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderFeatureValue(item.basic)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderFeatureValue(item.premium)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderFeatureValue(item.executive)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="text-center">
              <div className="bg-surface rounded-xl p-8 border border-border">
                <div className={`w-16 h-16 bg-${service.color}-500 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Icon name={service.icon} size={32} color="white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">{service.name}</h3>
                <p className="text-text-secondary mb-6">
                  {service.id === 'basic' && 'Perfect for regular maintenance and budget-conscious customers who want quality basic care.'}
                  {service.id === 'premium' && 'Our most popular choice offering the best balance of comprehensive service and value.'}
                  {service.id === 'executive' && 'Ultimate luxury experience with showroom-quality results and VIP treatment.'}
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="left"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Book {service.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;