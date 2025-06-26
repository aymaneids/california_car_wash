import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProblemSection = () => {
  const [activeTab, setActiveTab] = useState('dirty');

  const problems = [
    {
      id: 'dirty',
      title: 'Dirty Vehicle Frustrations',
      icon: 'Car',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      issues: [
        'Embarrassing appearance at work or social events',
        'Reduced vehicle value and resale potential',
        'Dirt and grime affecting interior comfort',
        'Professional image concerns for business owners'
      ]
    },
    {
      id: 'time',
      title: 'Time-Consuming DIY Washing',
      icon: 'Clock',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      issues: [
        'Hours spent every weekend on car maintenance',
        'Physical exhaustion from scrubbing and detailing',
        'Missing family time and personal activities',
        'Inconsistent results despite time investment'
      ]
    },
    {
      id: 'water',
      title: 'California Water Restrictions',
      icon: 'Droplets',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      issues: [
        'Drought restrictions limiting home car washing',
        'Fines for excessive water usage during washing',
        'Environmental guilt about water waste',
        'Lack of proper drainage for soap runoff'
      ]
    }
  ];

  const environmentalStats = [
    { label: 'Gallons saved per wash', value: '120+', icon: 'Droplets' },
    { label: 'Eco-friendly products used', value: '100%', icon: 'Leaf' },
    { label: 'Water recycling rate', value: '85%', icon: 'RotateCcw' },
    { label: 'Carbon footprint reduction', value: '40%', icon: 'TreePine' }
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Stop Struggling with <span className="text-accent">Car Care Challenges</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            California vehicle owners face unique challenges that make professional car care essential
          </p>
        </div>

        {/* Problem Tabs */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
            {problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => setActiveTab(problem.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === problem.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-background text-text-secondary hover:bg-primary-50 hover:text-primary'
                }`}
              >
                <Icon name={problem.icon} size={20} />
                <span className="hidden sm:inline">{problem.title}</span>
                <span className="sm:hidden">{problem.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Problem Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-background rounded-xl p-8 shadow-lg border border-border">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={problems.find(p => p.id === activeTab)?.icon} 
                      size={24} 
                      color="var(--color-error)" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {problems.find(p => p.id === activeTab)?.title}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {problems.find(p => p.id === activeTab)?.issues.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="X" size={20} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{issue}</span>
                    </li>
                  ))}
                </ul>

                {activeTab === 'water' && (
                  <div className="mt-6 p-4 bg-warning-50 rounded-lg border border-warning-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                      <span className="font-semibold text-warning">California Water Alert</span>
                    </div>
                    <p className="text-sm text-warning-700">
                      Current drought conditions may result in fines up to $500 for excessive residential water use
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src={problems.find(p => p.id === activeTab)?.image}
                  alt={`${problems.find(p => p.id === activeTab)?.title} illustration`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-semibold text-lg mb-2">Don't let this be you</p>
                  <p className="text-sm opacity-90">Professional service eliminates these frustrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact Stats */}
        <div className="bg-success-50 rounded-xl p-8 border border-success-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-success mb-2">Our Environmental Impact</h3>
            <p className="text-success-700">Professional car washing is more eco-friendly than DIY</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {environmentalStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat.icon} size={24} color="white" />
                </div>
                <div className="text-3xl font-bold text-success mb-1">{stat.value}</div>
                <p className="text-sm text-success-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Teaser */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-100 text-primary rounded-full">
            <Icon name="ArrowDown" size={20} />
            <span className="font-semibold">See how we solve these problems</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;