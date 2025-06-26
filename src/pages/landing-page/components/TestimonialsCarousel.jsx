import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      location: 'Los Angeles, CA',
      rating: 5,
      service: 'Premium Detail',
      vehicleType: '2021 Honda Accord',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: `I've been using California Car Wash for over a year now, and they never disappoint. The team is professional, the results are consistently excellent, and the convenience factor is unbeatable. My car always looks showroom-ready, and I love that I can drop it off and grab coffee while they work their magic.`,
      beforeImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',afterImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',date: '2 weeks ago',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Chen',location: 'San Francisco, CA',rating: 5,service: 'Luxury Spa',vehicleType: '2020 BMW X5',avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: `As a busy mom with three kids, finding time to wash my car was nearly impossible. California Car Wash has been a lifesaver! The staff is incredibly friendly, they pay attention to every detail, and my BMW has never looked better. The eco-friendly approach is also important to me as a California resident.`,
      beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',afterImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',date: '1 week ago',
      verified: true
    },
    {
      id: 3,
      name: 'David Thompson',location: 'San Diego, CA',rating: 5,service: 'Premium Detail',vehicleType: '2019 Ford F-150',avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      quote: `I was skeptical about professional car washing at first, but California Car Wash completely changed my mind. They transformed my work truck from dusty and grimy to absolutely pristine. The value for money is outstanding, and I love supporting a local California business that cares about the environment.`,
      beforeImage: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',afterImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',date: '3 days ago',
      verified: true
    },
    {
      id: 4,
      name: 'Jennifer Martinez',location: 'Sacramento, CA',rating: 5,service: 'Basic Wash',vehicleType: '2022 Toyota Camry',avatar: 'https://randomuser.me/api/portraits/women/28.jpg',quote: `Excellent service every single time! I've tried other car washes in Sacramento, but none compare to the quality and attention to detail at California Car Wash. The staff remembers my preferences, and my car always comes out looking fantastic. Highly recommend to anyone who values quality and convenience.`,
      beforeImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      afterImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      date: '5 days ago',
      verified: true
    },
    {
      id: 5,
      name: 'Robert Kim',
      location: 'Los Angeles, CA',
      rating: 5,
      service: 'Luxury Spa',
      vehicleType: '2021 Tesla Model S',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      quote: `Being a Tesla owner, I'm very particular about who touches my car. California Car Wash exceeded all my expectations with their meticulous attention to detail and eco-friendly practices. The team is knowledgeable about electric vehicles and treats each car with the respect it deserves. Five stars!`,
      beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',afterImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',date: '1 day ago',
      verified: true
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            What Our <span className="text-primary">California Customers</span> Say
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Real reviews from satisfied customers across California
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-background rounded-2xl shadow-xl border border-border overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Testimonial Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={current.avatar}
                    alt={`${current.name} testimonial`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-xl font-bold text-text-primary">{current.name}</h4>
                      {current.verified && (
                        <Icon name="BadgeCheck" size={20} color="var(--color-success)" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="MapPin" size={14} />
                      <span>{current.location}</span>
                      <span>•</span>
                      <span>{current.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex">
                    {[...Array(current.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} color="var(--color-warning)" className="fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="bg-primary-100 text-primary px-3 py-1 rounded-full font-semibold">
                      {current.service}
                    </span>
                    <span className="text-text-secondary">• {current.vehicleType}</span>
                  </div>
                </div>

                <blockquote className="text-lg text-text-secondary leading-relaxed mb-8 italic">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    View Full Review
                  </Button>
                  <span className="text-sm text-text-secondary">Verified Google Review</span>
                </div>
              </div>

              {/* Before/After Images */}
              <div className="bg-surface p-8 lg:p-12 flex flex-col justify-center">
                <h5 className="text-lg font-bold text-text-primary mb-6 text-center">
                  Transformation Results
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src={current.beforeImage}
                        alt="Before car wash"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded text-xs font-bold">
                        BEFORE
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">Needs attention</p>
                  </div>
                  <div className="text-center">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src={current.afterImage}
                        alt="After car wash"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-success text-success-foreground px-2 py-1 rounded text-xs font-bold">
                        AFTER
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">Showroom quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              iconName="ChevronLeft"
              iconSize={20}
              className="w-12 h-12 p-0 rounded-full"
            />

            {/* Testimonial Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-border hover:bg-primary-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextTestimonial}
              iconName="ChevronRight"
              iconSize={20}
              className="w-12 h-12 p-0 rounded-full"
            />
          </div>

          {/* Auto-play Control */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 mx-auto px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              <span>{isAutoPlaying ? 'Pause' : 'Play'} Auto-rotation</span>
            </button>
          </div>
        </div>

        {/* Google Reviews Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-background rounded-xl border border-border shadow-lg">
            <div className="flex items-center space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-6 h-6"
              />
              <span className="font-semibold text-text-primary">Google Reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} color="var(--color-warning)" className="fill-current" />
                ))}
              </div>
              <span className="font-bold text-warning">4.9</span>
            </div>
            <div className="text-text-secondary">
              <span className="font-semibold">2,847</span> reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;