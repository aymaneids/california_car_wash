import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BeforeAfterGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const transformations = [
    {
      id: 1,
      category: 'sedan',
      before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      service: 'Premium Detail',
      duration: '25 min',
      customerName: 'Michael R.',
      location: 'Los Angeles',
      rating: 5,
      quote: 'Absolutely amazing transformation! My car looks better than when I bought it.',
      vehicleType: 'Honda Accord 2019'
    },
    {
      id: 2,
      category: 'suv',
      before: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      service: 'Luxury Spa',
      duration: '40 min',
      customerName: 'Sarah M.',
      location: 'San Francisco',
      rating: 5,
      quote: 'Professional service that exceeded my expectations. Worth every penny!',
      vehicleType: 'Toyota RAV4 2021'
    },
    {
      id: 3,
      category: 'truck',
      before: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      service: 'Premium Detail',
      duration: '30 min',
      customerName: 'David L.',
      location: 'San Diego',
      rating: 5,
      quote: 'They made my work truck look like it just rolled off the lot.',
      vehicleType: 'Ford F-150 2020'
    },
    {
      id: 4,
      category: 'luxury',
      before: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      service: 'Luxury Spa',
      duration: '45 min',
      customerName: 'Jennifer K.',
      location: 'Sacramento',
      rating: 5,
      quote: 'Exceptional attention to detail. My BMW has never looked this good.',
      vehicleType: 'BMW X5 2022'
    },
    {
      id: 5,
      category: 'sedan',
      before: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      service: 'Basic Wash',
      duration: '15 min',
      customerName: 'Robert T.',
      location: 'Los Angeles',
      rating: 5,
      quote: 'Quick, efficient, and affordable. Perfect for my weekly maintenance.',
      vehicleType: 'Toyota Camry 2018'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Vehicles', icon: 'Car' },
    { id: 'sedan', label: 'Sedans', icon: 'Car' },
    { id: 'suv', label: 'SUVs', icon: 'Truck' },
    { id: 'truck', label: 'Trucks', icon: 'Truck' },
    { id: 'luxury', label: 'Luxury', icon: 'Crown' }
  ];

  const filteredTransformations = selectedCategory === 'all' 
    ? transformations 
    : transformations.filter(t => t.category === selectedCategory);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % filteredTransformations.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, filteredTransformations.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % filteredTransformations.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + filteredTransformations.length) % filteredTransformations.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentTransformation = filteredTransformations[currentSlide];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            <span className="text-accent">Amazing</span> Transformations
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See the incredible before and after results from our satisfied California customers
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentSlide(0);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-background text-text-secondary hover:bg-primary-50 hover:text-primary border border-border'
              }`}
            >
              <Icon name={category.icon} size={18} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Main Gallery */}
        <div className="relative">
          {/* Before/After Comparison */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Before Image */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src={currentTransformation?.before}
                  alt={`Before car wash - ${currentTransformation?.vehicleType}`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-error text-error-foreground px-3 py-1 rounded-full font-bold text-sm">
                  BEFORE
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-semibold">{currentTransformation?.vehicleType}</p>
                  <p className="text-sm opacity-90">Needs professional attention</p>
                </div>
              </div>
            </div>

            {/* After Image */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src={currentTransformation?.after}
                  alt={`After car wash - ${currentTransformation?.vehicleType}`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-success text-success-foreground px-3 py-1 rounded-full font-bold text-sm">
                  AFTER
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-semibold">Showroom Quality Result</p>
                  <p className="text-sm opacity-90">Completed in {currentTransformation?.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Testimonial */}
          <div className="bg-background rounded-xl p-6 shadow-lg border border-border mb-8">
            <div className="flex items-start space-x-4">
              <img
                src={`https://randomuser.me/api/portraits/${currentSlide % 2 === 0 ? 'men' : 'women'}/${30 + currentSlide}.jpg`}
                alt={`${currentTransformation?.customerName} testimonial`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-bold text-text-primary">{currentTransformation?.customerName}</h4>
                  <div className="flex">
                    {[...Array(currentTransformation?.rating || 5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} color="var(--color-warning)" className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">• {currentTransformation?.location}</span>
                </div>
                <p className="text-text-secondary italic mb-3">"{currentTransformation?.quote}"</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-primary-100 text-primary px-3 py-1 rounded-full font-semibold">
                    {currentTransformation?.service}
                  </span>
                  <span className="text-text-secondary">
                    Completed in {currentTransformation?.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevSlide}
              iconName="ChevronLeft"
              iconSize={20}
              className="w-12 h-12 p-0 rounded-full"
            />

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {filteredTransformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-primary' : 'bg-border hover:bg-primary-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              iconName="ChevronRight"
              iconSize={20}
              className="w-12 h-12 p-0 rounded-full"
            />
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 mx-auto px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              <span>{isAutoPlaying ? 'Pause' : 'Play'} Slideshow</span>
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-text-secondary">Vehicles Transformed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">4.9★</div>
            <p className="text-text-secondary">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">98%</div>
            <p className="text-text-secondary">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">15min</div>
            <p className="text-text-secondary">Average Service Time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;