import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsGrid = () => {
  const [counters, setCounters] = useState({
    timeWeekly: 0,
    timeMonthly: 0,
    waterSaved: 0,
    satisfactionRate: 0
  });

  const benefits = [
    {
      id: 'time-saving',
      icon: 'Clock',
      title: 'Save Precious Time',
      description: 'Reclaim your weekends and spend time on what matters most to you',
      features: [
        'No more 2-3 hour weekend car washing sessions',
        'Professional service completed in 15-40 minutes',
        'Drop-off and relax or wait in comfort',
        'More time for family, hobbies, and relaxation'
      ],
      color: 'primary',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'quality-results',
      icon: 'Award',
      title: 'Superior Quality Results',
      description: 'Professional-grade equipment and techniques deliver showroom-quality finish',
      features: [
        'Commercial-grade cleaning products and tools',
        'Trained technicians with years of experience',
        'Consistent, streak-free results every time',
        'Paint protection and preservation techniques'
      ],
      color: 'success',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'eco-friendly',
      icon: 'Leaf',
      title: 'Environmentally Responsible',
      description: 'Water-saving techniques and eco-friendly products protect California\'s environment',
      features: [
        'Uses 80% less water than home washing',
        'Biodegradable, non-toxic cleaning products',
        'Proper wastewater treatment and recycling',
        'Compliant with California environmental regulations'
      ],
      color: 'success',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'convenience',
      icon: 'MapPin',
      title: 'Ultimate Convenience',
      description: 'Multiple locations, flexible scheduling, and hassle-free service',
      features: [
        'Convenient California locations near you',
        'Online booking and mobile scheduling',
        'No equipment, supplies, or cleanup needed',
        'Weather-protected indoor facilities'
      ],
      color: 'accent',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'value',
      icon: 'DollarSign',
      title: 'Exceptional Value',
      description: 'Cost-effective solution when you factor in time, supplies, and results',
      features: [
        'No need to buy expensive equipment and supplies',
        'Prevents costly paint damage from improper washing',
        'Membership discounts and loyalty rewards',
        'Satisfaction guarantee or money back'
      ],
      color: 'warning',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'protection',
      icon: 'Shield',
      title: 'Vehicle Protection',
      description: 'Professional care that maintains and protects your investment',
      features: [
        'Prevents paint oxidation and fading',
        'Removes harmful contaminants and road salt',
        'Protects interior from wear and deterioration',
        'Maintains vehicle value and resale potential'
      ],
      color: 'primary',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const stats = [
    { key: 'timeWeekly', target: 180, suffix: 'min', label: 'Saved Weekly' },
    { key: 'timeMonthly', target: 12, suffix: 'hrs', label: 'Saved Monthly' },
    { key: 'waterSaved', target: 120, suffix: 'gal', label: 'Water Saved Per Wash' },
    { key: 'satisfactionRate', target: 98, suffix: '%', label: 'Customer Satisfaction' }
  ];

  useEffect(() => {
    const animateCounters = () => {
      stats.forEach(stat => {
        let current = 0;
        const increment = stat.target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            current = stat.target;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [stat.key]: Math.floor(current)
          }));
        }, 50);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById('benefits-stats');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-100 text-primary border-primary-200',
      success: 'bg-success-100 text-success border-success-200',
      accent: 'bg-accent-100 text-accent border-accent-200',
      warning: 'bg-warning-100 text-warning border-warning-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Why Choose <span className="text-primary">Professional Car Care</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience the benefits that thousands of California drivers already enjoy
          </p>
        </div>

        {/* Animated Stats */}
        <div id="benefits-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={stat.key} className="text-center p-6 bg-surface rounded-xl border border-border">
              <div className="text-4xl font-bold text-primary mb-2">
                {counters[stat.key]}{stat.suffix}
              </div>
              <p className="text-text-secondary font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-background rounded-xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 h-full">
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${getColorClasses(benefit.color)}`}>
                    <Icon name={benefit.icon} size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6">
                    {benefit.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Icon 
                          name="Check" 
                          size={16} 
                          color="var(--color-success)" 
                          className="mt-1 flex-shrink-0" 
                        />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                <div className="relative h-64 md:h-full">
                  <img
                    src={benefit.image}
                    alt={`${benefit.title} illustration`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Satisfaction Guarantee */}
        <div className="bg-gradient-to-r from-success-50 to-primary-50 rounded-xl p-8 border border-success-200">
          <div className="text-center">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Shield" size={32} color="white" />
            </div>
            
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              100% Satisfaction Guarantee
            </h3>
            
            <p className="text-xl text-text-secondary mb-6 max-w-2xl mx-auto">
              We stand behind our work with a complete satisfaction guarantee. If you're not completely happy with your service, we'll make it right or refund your money.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <Icon name="ThumbsUp" size={24} color="var(--color-success)" className="mx-auto mb-2" />
                <p className="font-semibold text-success">Quality Promise</p>
                <p className="text-sm text-text-secondary">Professional results every time</p>
              </div>
              <div className="text-center">
                <Icon name="RotateCcw" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
                <p className="font-semibold text-primary">Redo Guarantee</p>
                <p className="text-sm text-text-secondary">We'll redo any unsatisfactory work</p>
              </div>
              <div className="text-center">
                <Icon name="DollarSign" size={24} color="var(--color-warning)" className="mx-auto mb-2" />
                <p className="font-semibold text-warning">Money Back</p>
                <p className="text-sm text-text-secondary">Full refund if not satisfied</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;