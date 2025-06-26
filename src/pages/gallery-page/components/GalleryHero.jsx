import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GalleryHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const heroImages = [
    {
      id: 1,
      beforeImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Luxury SUV Transformation',
      description: 'Executive Treatment - 40 minutes',
      location: 'Los Angeles',
      rating: 5,
      service: 'Executive Treatment'
    },
    {
      id: 2,
      beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Sports Car Detail',
      description: 'Premium Detail - 25 minutes',
      location: 'San Francisco',
      rating: 5,
      service: 'Premium Detail'
    },
    {
      id: 3,
      beforeImage: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Truck Restoration',
      description: 'Premium Detail - 30 minutes',
      location: 'San Diego',
      rating: 5,
      service: 'Premium Detail'
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, heroImages.length]);

  const currentImage = heroImages[currentSlide];

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('transformation-gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Before/After Comparison */}
      <div className="absolute inset-0">
        <div className="flex h-full">
          {/* Before Side */}
          <div className="w-1/2 relative">
            <img
              src={currentImage?.beforeImage}
              alt="Before transformation"
              className="w-full h-full object-cover transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-8 left-8 bg-error text-error-foreground px-4 py-2 rounded-lg font-bold">
              BEFORE
            </div>
          </div>
          
          {/* After Side */}
          <div className="w-1/2 relative">
            <img
              src={currentImage?.afterImage}
              alt="After transformation"
              className="w-full h-full object-cover transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-8 right-8 bg-success text-success-foreground px-4 py-2 rounded-lg font-bold">
              AFTER
            </div>
          </div>
        </div>

        {/* Center Divider */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-white rounded-full opacity-80"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Stats Badge */}
          <div className="inline-flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <div className="flex items-center space-x-2">
              <Icon name="Image" size={20} />
              <span className="font-semibold">100+</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} />
              <span className="font-semibold">4.9★</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span className="font-semibold">10K+</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Amazing
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transformations
            </span>
            Gallery
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Real results from real customers across California. See the incredible before and after transformations.
          </p>

          {/* Current Image Info */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-12 max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-2">{currentImage?.title}</h3>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <Icon name="Clock" size={16} className="mr-1" />
                {currentImage?.description}
              </div>
              <div className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-1" />
                {currentImage?.location}
              </div>
              <div className="flex items-center">
                {[...Array(currentImage?.rating || 5)].map((_, i) => (
                  <Icon key={i} name="Star" size={14} color="gold" className="fill-current" />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToGallery}
              iconName="Image"
              iconPosition="left"
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-cta px-8 py-4"
            >
              Explore Full Gallery
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Upload"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4"
            >
              Submit Your Photos
            </Button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 mx-auto text-white/80 hover:text-white transition-colors"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
              <span className="text-sm">{isPlaying ? 'Pause' : 'Play'} Slideshow</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} color="white" />
      </div>
    </section>
  );
};

export default GalleryHero;