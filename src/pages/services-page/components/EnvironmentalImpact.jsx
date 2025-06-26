import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalImpact = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    waterSaved: 0,
    carsWashed: 0,
    co2Reduced: 0,
    wasteDiverted: 0
  });

  const finalNumbers = {
    waterSaved: 250000,
    carsWashed: 10000,
    co2Reduced: 15000,
    wasteDiverted: 5000
  };

  const serviceImpact = {
    basic: {
      waterSavings: 30,
      ecoProducts: 'Standard',
      certification: 'EPA Compliant',
      features: [
        'Biodegradable soaps',
        'Water recycling system',
        'Minimal chemical runoff',
        'Energy-efficient equipment'
      ]
    },
    premium: {
      waterSavings: 40,
      ecoProducts: 'Premium',
      certification: 'Green Seal Certified',
      features: [
        'Plant-based cleaning agents',
        'Advanced water filtration',
        'Zero harmful chemicals',
        'Solar-powered equipment',
        'Rainwater collection system'
      ]
    },
    executive: {
      waterSavings: 50,
      ecoProducts: 'Ultra Premium',
      certification: 'Carbon Neutral',
      features: [
        'Organic cleaning compounds',
        'Closed-loop water system',
        'Microfiber waste reduction',
        'Renewable energy powered',
        'Carbon offset program',
        'Eco-friendly packaging'
      ]
    }
  };

  const certifications = [
    {
      name: 'EPA WaterSense',
      icon: 'Droplets',
      description: 'Water conservation certified',
      color: 'blue'
    },
    {
      name: 'Green Seal',
      icon: 'Leaf',
      description: 'Environmentally responsible',
      color: 'green'
    },
    {
      name: 'Carbon Neutral',
      icon: 'TreePine',
      description: 'Net-zero carbon emissions',
      color: 'emerald'
    },
    {
      name: 'LEED Certified',
      icon: 'Building',
      description: 'Sustainable facility design',
      color: 'teal'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDelay = duration / steps;

    const timer = setInterval(() => {
      setAnimatedNumbers(prev => {
        const newNumbers = {};
        Object.keys(finalNumbers).forEach(key => {
          const current = prev[key];
          const target = finalNumbers[key];
          const increment = target / steps;
          newNumbers[key] = Math.min(current + increment, target);
        });
        return newNumbers;
      });
    }, stepDelay);

    setTimeout(() => {
      clearInterval(timer);
      setAnimatedNumbers(finalNumbers);
    }, duration);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return Math.floor(num).toLocaleString();
  };

  return (
    <section className="section-padding bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Our <span className="text-green-600">Environmental</span> Impact
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Every service makes a difference - see how we're protecting California's environment
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Droplets" size={32} color="white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatNumber(animatedNumbers.waterSaved)}
            </div>
            <p className="text-text-secondary">Gallons Water Saved</p>
            <div className="text-sm text-green-600 font-semibold mt-1">This Month</div>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Car" size={32} color="white" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatNumber(animatedNumbers.carsWashed)}
            </div>
            <p className="text-text-secondary">Eco-Friendly Washes</p>
            <div className="text-sm text-green-600 font-semibold mt-1">This Month</div>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="TreePine" size={32} color="white" />
            </div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {formatNumber(animatedNumbers.co2Reduced)}
            </div>
            <p className="text-text-secondary">lbs CO₂ Reduced</p>
            <div className="text-sm text-green-600 font-semibold mt-1">This Month</div>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Recycle" size={32} color="white" />
            </div>
            <div className="text-3xl font-bold text-teal-600 mb-2">
              {formatNumber(animatedNumbers.wasteDiverted)}
            </div>
            <p className="text-text-secondary">lbs Waste Diverted</p>
            <div className="text-sm text-green-600 font-semibold mt-1">This Month</div>
          </div>
        </div>

        {/* Service-Specific Impact */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(serviceImpact).map(([serviceId, impact]) => (
            <div key={serviceId} className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-text-primary capitalize mb-2">
                  {serviceId} Service
                </h3>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="text-3xl font-bold text-green-600">{impact.waterSavings}%</div>
                  <div className="text-sm text-text-secondary">Water Savings</div>
                </div>
                <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  <Icon name="Award" size={16} className="mr-2" />
                  {impact.certification}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Eco Products:</span>
                  <span className="font-semibold text-green-600">{impact.ecoProducts}</span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Environmental Features:</h4>
                  <ul className="space-y-2">
                    {impact.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200 mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Our Environmental Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-${cert.color}-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={cert.icon} size={36} color="white" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">{cert.name}</h4>
                <p className="text-sm text-text-secondary">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Statement */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-12 text-white">
          <Icon name="Heart" size={48} color="white" className="mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Our Environmental Commitment</h3>
          <p className="text-xl mb-6 max-w-4xl mx-auto">
            We're not just cleaning cars - we're protecting California's future. Every wash uses 50% less water 
            than traditional methods, all our products are biodegradable, and we offset 100% of our carbon footprint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Icon name="Droplets" size={20} className="mr-2" />
              <span className="font-semibold">Water Conservation</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Icon name="Leaf" size={20} className="mr-2" />
              <span className="font-semibold">Eco-Friendly Products</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Icon name="TreePine" size={20} className="mr-2" />
              <span className="font-semibold">Carbon Neutral</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Icon name="Recycle" size={20} className="mr-2" />
              <span className="font-semibold">Waste Reduction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalImpact;