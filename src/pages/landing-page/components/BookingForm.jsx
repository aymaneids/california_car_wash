import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import LocationSelector from '../../../components/ui/LocationSelector';
import BookingProgressIndicator from '../../../components/ui/BookingProgressIndicator';

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    location: null,
    date: '',
    time: '',
    vehicleType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      id: 'basic',
      name: 'Basic Wash',
      price: 15,
      duration: '10-15 min',
      description: 'Exterior wash, wheel cleaning, tire shine, hand dry'
    },
    {
      id: 'premium',
      name: 'Premium Detail',
      price: 35,
      duration: '20-25 min',
      description: 'Complete interior & exterior cleaning, windows, vacuum',
      popular: true
    },
    {
      id: 'luxury',
      name: 'Luxury Spa',
      price: 55,
      duration: '35-40 min',
      description: 'Ultimate treatment with wax, clay bar, leather conditioning'
    }
  ];

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  const vehicleTypes = [
    'Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Van', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== '';
      case 2:
        return formData.location && formData.date && formData.time;
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.vehicleType;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setCurrentStep(5); // Success step
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getSelectedService = () => {
    return services.find(s => s.id === formData.service);
  };

  return (
    <section id="booking-form" className="section-padding bg-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Book Your <span className="text-accent">Car Wash</span> Today
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Quick and easy booking process - get your car cleaned in just a few clicks
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <BookingProgressIndicator
            currentStep={currentStep}
            totalSteps={4}
            onStepClick={handleStepClick}
            className="mb-12"
          />

          {/* Booking Form */}
          <div className="bg-background rounded-xl border border-border shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Choose Your Service</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.service === service.id
                            ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                        }`}
                        onClick={() => handleInputChange('service', service.id)}
                      >
                        {service.popular && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                              Most Popular
                            </span>
                          </div>
                        )}
                        
                        <div className="text-center">
                          <h4 className="text-xl font-bold text-text-primary mb-2">{service.name}</h4>
                          <div className="text-3xl font-bold text-primary mb-2">${service.price}</div>
                          <div className="text-sm text-success font-semibold mb-4">{service.duration}</div>
                          <p className="text-sm text-text-secondary">{service.description}</p>
                        </div>
                        
                        <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.service === service.id
                            ? 'border-primary bg-primary' :'border-border'
                        }`}>
                          {formData.service === service.id && (
                            <Icon name="Check" size={14} color="white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Schedule Selection */}
              {currentStep === 2 && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Pick Date & Time</h3>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-3">
                        Select Location
                      </label>
                      <LocationSelector
                        onLocationSelect={(location) => handleInputChange('location', location)}
                        className="mb-6"
                      />
                      
                      <label className="block text-sm font-semibold text-text-primary mb-3">
                        Preferred Date
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        min={getTomorrowDate()}
                        className="mb-6"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-3">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleInputChange('time', time)}
                            className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                              formData.time === time
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border hover:border-primary-300 text-text-secondary hover:text-primary'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Personal Details */}
              {currentStep === 3 && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Vehicle Type *
                      </label>
                      <select
                        value={formData.vehicleType}
                        onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="">Select vehicle type</option>
                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        placeholder="Any special instructions or requests..."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Review & Confirm</h3>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-surface rounded-lg p-6 border border-border">
                        <h4 className="font-bold text-text-primary mb-4">Service Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Service:</span>
                            <span className="font-semibold text-text-primary">{getSelectedService()?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Duration:</span>
                            <span className="text-text-primary">{getSelectedService()?.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Price:</span>
                            <span className="font-bold text-primary text-lg">${getSelectedService()?.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-surface rounded-lg p-6 border border-border">
                        <h4 className="font-bold text-text-primary mb-4">Appointment Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Location:</span>
                            <span className="text-text-primary">{formData.location?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Date:</span>
                            <span className="text-text-primary">{formData.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Time:</span>
                            <span className="text-text-primary">{formData.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-surface rounded-lg p-6 border border-border">
                        <h4 className="font-bold text-text-primary mb-4">Customer Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Name:</span>
                            <span className="text-text-primary">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Email:</span>
                            <span className="text-text-primary">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Phone:</span>
                            <span className="text-text-primary">{formData.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Vehicle:</span>
                            <span className="text-text-primary">{formData.vehicleType}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-success-50 rounded-lg p-6 border border-success-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon name="Shield" size={24} color="var(--color-success)" />
                          <h4 className="font-bold text-success">Satisfaction Guarantee</h4>
                        </div>
                        <p className="text-sm text-success-700">
                          100% satisfaction guaranteed or your money back. We stand behind our work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Step */}
              {currentStep === 5 && (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Check" size={32} color="white" />
                  </div>
                  <h3 className="text-3xl font-bold text-text-primary mb-4">Booking Confirmed!</h3>
                  <p className="text-xl text-text-secondary mb-8">
                    Your appointment has been successfully booked. We'll see you soon!
                  </p>
                  
                  <div className="bg-surface rounded-lg p-6 border border-border max-w-md mx-auto mb-8">
                    <h4 className="font-bold text-text-primary mb-4">Appointment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Service:</span>
                        <span className="text-text-primary">{getSelectedService()?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Date & Time:</span>
                        <span className="text-text-primary">{formData.date} at {formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Location:</span>
                        <span className="text-text-primary">{formData.location?.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      iconName="Calendar"
                      iconPosition="left"
                      className="bg-accent hover:bg-accent-700 text-accent-foreground"
                    >
                      Add to Calendar
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Phone"
                      iconPosition="left"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Call Location
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex items-center justify-between p-8 bg-surface border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                    className="text-text-secondary hover:text-primary disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Lock" size={16} color="var(--color-success)" />
                    <span className="text-sm text-success font-medium">Secure Booking</span>
                  </div>
                  
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleNextStep}
                      disabled={!validateCurrentStep()}
                      iconName="ChevronRight"
                      iconPosition="right"
                      className="bg-primary hover:bg-primary-700 disabled:opacity-50"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      loading={isSubmitting}
                      iconName="Check"
                      iconPosition="left"
                      className="bg-accent hover:bg-accent-700 text-accent-foreground font-bold"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;