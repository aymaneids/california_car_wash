import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingWidget = ({ selectedService, show, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        isToday: i === 0,
        isTomorrow: i === 1
      });
    }
    return dates;
  };

  const dates = generateDates();

  // Generate time slots based on service duration
  const generateTimeSlots = (serviceId) => {
    const slots = [];
    const serviceDurations = {
      basic: 15,
      premium: 25,
      executive: 40
    };
    
    const duration = serviceDurations[serviceId] || 25;
    const startHour = 8; // 8 AM
    const endHour = 18; // 6 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        
        // Check if there's enough time for the service before closing
        const endTime = new Date(time);
        endTime.setMinutes(endTime.getMinutes() + duration);
        
        if (endTime.getHours() <= endHour) {
          const timeString = time.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          });
          
          // Simulate availability (in real app, this would come from API)
          const isAvailable = Math.random() > 0.3;
          const isPopular = Math.random() > 0.7;
          
          slots.push({
            value: timeString,
            label: timeString,
            available: isAvailable,
            popular: isPopular,
            duration: duration
          });
        }
      }
    }
    
    return slots;
  };

  useEffect(() => {
    if (selectedDate && selectedService) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setAvailableSlots(generateTimeSlots(selectedService));
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDate, selectedService]);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      // Handle booking logic here
      alert(`Booking confirmed for ${selectedDate} at ${selectedTime}`);
      onClose?.();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Book Your Service</h2>
            <p className="text-text-secondary">
              {selectedService?.charAt(0).toUpperCase() + selectedService?.slice(1)} Service
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface transition-colors"
          >
            <Icon name="X" size={24} color="var(--color-text-secondary)" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center">
                <Icon name="Calendar" size={20} className="mr-2 text-primary" />
                Select Date
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {dates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => {
                      setSelectedDate(date.value);
                      setSelectedTime('');
                    }}
                    className={`p-4 rounded-lg text-left transition-all duration-200 ${
                      selectedDate === date.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface hover:bg-primary-50 border border-border'
                    }`}
                  >
                    <div className="font-semibold">{date.label}</div>
                    <div className={`text-sm ${
                      selectedDate === date.value ? 'text-primary-foreground/80' : 'text-text-secondary'
                    }`}>
                      {date.isToday ? 'Today' : date.isTomorrow ? 'Tomorrow' : 'Available'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Service Summary */}
              <div className="bg-surface rounded-lg p-4 border border-border">
                <h4 className="font-semibold text-text-primary mb-2">Service Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Service:</span>
                    <span className="font-medium">
                      {selectedService?.charAt(0).toUpperCase() + selectedService?.slice(1)} Detail
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Duration:</span>
                    <span className="font-medium">
                      {selectedService === 'basic' ? '10-15 min' : 
                       selectedService === 'premium' ? '20-25 min' : '35-40 min'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Price:</span>
                    <span className="font-medium text-primary">
                      ${selectedService === 'basic' ? '15' : 
                        selectedService === 'premium' ? '35' : '55'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center">
                <Icon name="Clock" size={20} className="mr-2 text-primary" />
                Available Times
                {selectedDate && (
                  <span className="ml-2 text-sm font-normal text-text-secondary">
                    for {dates.find(d => d.value === selectedDate)?.label}
                  </span>
                )}
              </h3>

              {!selectedDate ? (
                <div className="text-center py-12">
                  <Icon name="Calendar" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4 opacity-50" />
                  <p className="text-text-secondary">Please select a date first</p>
                </div>
              ) : isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-text-secondary">Loading available times...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Morning Slots */}
                  <div>
                    <h4 className="text-sm font-semibold text-text-secondary mb-2 flex items-center">
                      <Icon name="Sunrise" size={16} className="mr-2" />
                      Morning (8:00 AM - 12:00 PM)
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.filter(slot => {
                        const hour = new Date(`2000-01-01 ${slot.value}`).getHours();
                        return hour >= 8 && hour < 12;
                      }).map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => setSelectedTime(slot.value)}
                          disabled={!slot.available}
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                            !slot.available
                              ? 'bg-surface text-text-secondary cursor-not-allowed opacity-50'
                              : selectedTime === slot.value
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-surface hover:bg-primary-50 border border-border'
                          }`}
                        >
                          {slot.label}
                          {slot.popular && slot.available && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon Slots */}
                  <div>
                    <h4 className="text-sm font-semibold text-text-secondary mb-2 flex items-center">
                      <Icon name="Sun" size={16} className="mr-2" />
                      Afternoon (12:00 PM - 6:00 PM)
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.filter(slot => {
                        const hour = new Date(`2000-01-01 ${slot.value}`).getHours();
                        return hour >= 12 && hour < 18;
                      }).map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => setSelectedTime(slot.value)}
                          disabled={!slot.available}
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                            !slot.available
                              ? 'bg-surface text-text-secondary cursor-not-allowed opacity-50'
                              : selectedTime === slot.value
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-surface hover:bg-primary-50 border border-border'
                          }`}
                        >
                          {slot.label}
                          {slot.popular && slot.available && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center space-x-4 text-xs text-text-secondary mt-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                      Popular time
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-surface border border-border rounded-full mr-2"></div>
                      Unavailable
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Actions */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                iconName="Calendar"
                iconPosition="left"
                className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedDate && selectedTime 
                  ? `Confirm Booking - ${selectedTime}` 
                  : 'Select Date & Time'
                }
              </Button>
            </div>

            {selectedDate && selectedTime && (
              <div className="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg">
                <div className="flex items-center text-success">
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  <span className="font-semibold">
                    Ready to book for {dates.find(d => d.value === selectedDate)?.label} at {selectedTime}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;