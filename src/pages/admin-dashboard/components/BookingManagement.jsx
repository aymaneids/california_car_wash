import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingManagement = ({ bookings = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    'confirmed': 'bg-primary-50 text-primary border-primary-200',
    'in-progress': 'bg-warning-50 text-warning border-warning-200',
    'completed': 'bg-success-50 text-success border-success-200',
    'cancelled': 'bg-error-50 text-error border-error-200'
  };

  const filteredBookings = bookings?.filter(booking => {
    if (filterStatus === 'all') return true;
    return booking.status === filterStatus;
  }) || [];

  const handleStatusChange = (bookingId, newStatus) => {
    // In a real app, this would update the booking status via API
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
  };

  const handleReschedule = (bookingId) => {
    // In a real app, this would open a reschedule modal
    console.log(`Rescheduling booking ${bookingId}`);
  };

  return (
    <div className="space-y-6">
      {/* Booking Filters */}
      <div className="bg-background rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <Button
            variant="primary"
            iconName="Plus"
            iconPosition="left"
            className="bg-primary hover:bg-primary-700 text-primary-foreground"
          >
            New Booking
          </Button>
        </div>
      </div>

      {/* Booking Schedule */}
      <div className="bg-background rounded-xl border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">
            Today's Schedule
          </h3>
          <p className="text-sm text-text-secondary">
            {filteredBookings.length} bookings scheduled
          </p>
        </div>
        
        <div className="divide-y divide-border">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-surface transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-text-secondary">TIME</p>
                      <p className="text-lg font-semibold text-text-primary">
                        {booking.time}
                      </p>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-text-primary">
                          {booking.customerName}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[booking.status]}`}>
                          {booking.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-1">
                        Service: {booking.service}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={14} />
                          <span>{booking.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Phone" size={14} />
                          <span>{booking.phone}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                      onClick={() => handleReschedule(booking.id)}
                    >
                      Reschedule
                    </Button>
                    
                    <div className="relative">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="px-3 py-1 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none pr-8"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <Icon 
                        name="ChevronDown" 
                        size={14} 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-secondary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No bookings found
              </h3>
              <p className="text-text-secondary mb-4">
                No bookings match your current filters.
              </p>
              <Button variant="primary" iconName="Plus">
                Add New Booking
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Booking Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Today', value: bookings?.length || 0, icon: 'Calendar' },
          { label: 'Confirmed', value: bookings?.filter(b => b.status === 'confirmed').length || 0, icon: 'CheckCircle' },
          { label: 'In Progress', value: bookings?.filter(b => b.status === 'in-progress').length || 0, icon: 'Clock' },
          { label: 'Completed', value: bookings?.filter(b => b.status === 'completed').length || 0, icon: 'Check' }
        ].map((stat, index) => (
          <div key={index} className="bg-background rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              </div>
              <Icon name={stat.icon} size={20} className="text-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement;