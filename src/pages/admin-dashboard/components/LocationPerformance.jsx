import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationPerformance = ({ locations = [] }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timeFilter, setTimeFilter] = useState('today');

  const totalBookings = locations?.reduce((sum, location) => sum + (location?.todayBookings || 0), 0) || 0;
  const totalRevenue = locations?.reduce((sum, location) => sum + (location?.revenue || 0), 0) || 0;
  const totalStaff = locations?.reduce((sum, location) => sum + (location?.staffCount || 0), 0) || 0;

  const performanceMetrics = [
    {
      title: 'Total Locations',
      value: locations?.length || 0,
      icon: 'MapPin',
      color: 'text-primary'
    },
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: 'Calendar',
      color: 'text-success'
    },
    {
      title: 'Combined Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-warning'
    },
    {
      title: 'Total Staff',
      value: totalStaff,
      icon: 'Users',
      color: 'text-error'
    }
  ];

  const getPerformanceColor = (bookings) => {
    if (bookings >= 15) return 'bg-success-50 text-success border-success-200';
    if (bookings >= 10) return 'bg-warning-50 text-warning border-warning-200';
    return 'bg-error-50 text-error border-error-200';
  };

  const getPerformanceLabel = (bookings) => {
    if (bookings >= 15) return 'Excellent';
    if (bookings >= 10) return 'Good';
    return 'Needs Attention';
  };

  const heatMapData = [
    { hour: '8 AM', downtown: 2, mall: 1, airport: 3 },
    { hour: '9 AM', downtown: 4, mall: 2, airport: 2 },
    { hour: '10 AM', downtown: 6, mall: 4, airport: 1 },
    { hour: '11 AM', downtown: 8, mall: 6, airport: 2 },
    { hour: '12 PM', downtown: 10, mall: 8, airport: 4 },
    { hour: '1 PM', downtown: 9, mall: 7, airport: 3 },
    { hour: '2 PM', downtown: 12, mall: 10, airport: 2 },
    { hour: '3 PM', downtown: 8, mall: 9, airport: 1 },
    { hour: '4 PM', downtown: 6, mall: 8, airport: 2 },
    { hour: '5 PM', downtown: 4, mall: 6, airport: 5 },
  ];

  const getHeatIntensity = (value, max = 12) => {
    const intensity = (value / max) * 100;
    if (intensity >= 80) return 'bg-error';
    if (intensity >= 60) return 'bg-warning';
    if (intensity >= 40) return 'bg-primary';
    if (intensity >= 20) return 'bg-success';
    return 'bg-surface';
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-background rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {metric.value}
                </p>
              </div>
              <Icon name={metric.icon} size={24} className={metric.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Time Filter */}
      <div className="bg-background rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-text-primary">
            Location Performance Analysis
          </h3>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            
            <Button variant="outline" iconName="Download" size="sm">
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location List */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              Location Overview
            </h3>
            <p className="text-sm text-text-secondary">
              Performance comparison across all locations
            </p>
          </div>
          
          <div className="divide-y divide-border">
            {locations?.length > 0 ? (
              locations.map((location) => (
                <div 
                  key={location.id}
                  className={`p-4 cursor-pointer hover:bg-surface transition-colors duration-200 ${
                    selectedLocation?.id === location.id ? 'bg-primary-50 border-r-2 border-r-primary' : ''
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-primary">
                          {location?.name || 'Unknown Location'}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPerformanceColor(location?.todayBookings || 0)}`}>
                          {getPerformanceLabel(location?.todayBookings || 0)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-text-secondary">Bookings</p>
                          <p className="font-semibold text-text-primary">
                            {location?.todayBookings || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Revenue</p>
                          <p className="font-semibold text-text-primary">
                            ${(location?.revenue || 0).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Staff</p>
                          <p className="font-semibold text-text-primary">
                            {location?.staffCount || 0}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-xs text-text-secondary">
                          Peak: {location?.peakHours || 'Not available'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon name="MapPin" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No locations found
                </h3>
                <p className="text-text-secondary">
                  Start by adding your first location.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              {selectedLocation ? 'Location Details' : 'Select a Location'}
            </h3>
          </div>
          
          {selectedLocation ? (
            <div className="p-6 space-y-6">
              {/* Location Info */}
              <div>
                <h4 className="text-xl font-semibold text-text-primary mb-2">
                  {selectedLocation?.name || 'Unknown Location'}
                </h4>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-text-secondary" />
                  <span className="text-text-secondary">
                    Peak Hours: {selectedLocation?.peakHours || 'Not available'}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm text-text-secondary">Today's Bookings</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {selectedLocation?.todayBookings || 0}
                  </p>
                </div>
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm text-text-secondary">Today's Revenue</p>
                  <p className="text-2xl font-bold text-text-primary">
                    ${(selectedLocation?.revenue || 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm text-text-secondary">Active Staff</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {selectedLocation?.staffCount || 0}
                  </p>
                </div>
                <div className="bg-surface rounded-lg p-4">
                  <p className="text-sm text-text-secondary">Avg. Order Value</p>
                  <p className="text-2xl font-bold text-text-primary">
                    ${selectedLocation?.todayBookings > 0 
                      ? Math.round((selectedLocation?.revenue || 0) / selectedLocation.todayBookings) 
                      : 0}
                  </p>
                </div>
              </div>

              {/* Performance Status */}
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Performance Status</p>
                    <p className="font-semibold text-text-primary">
                      {getPerformanceLabel(selectedLocation?.todayBookings || 0)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded border ${getPerformanceColor(selectedLocation?.todayBookings || 0)}`}>
                    {selectedLocation?.todayBookings || 0} bookings
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button variant="primary" iconName="TrendingUp" fullWidth>
                  View Detailed Analytics
                </Button>
                <Button variant="outline" iconName="Users" fullWidth>
                  Manage Staff
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Icon name="MapPin" size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Select a Location
              </h3>
              <p className="text-text-secondary">
                Choose a location from the list to view detailed performance metrics and analytics.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Heat Map */}
      <div className="bg-background rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Peak Hours Heat Map
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Demand patterns across locations throughout the day
        </p>
        
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-11 gap-1 text-xs">
              {/* Header */}
              <div className="p-2 font-medium text-text-secondary">Time</div>
              <div className="p-2 font-medium text-text-secondary">Downtown</div>
              <div className="p-2 font-medium text-text-secondary">Mall</div>
              <div className="p-2 font-medium text-text-secondary">Airport</div>
              <div className="col-span-7"></div>
              
              {/* Data rows */}
              {heatMapData.map((row, index) => (
                <React.Fragment key={index}>
                  <div className="p-2 font-medium text-text-primary">
                    {row.hour}
                  </div>
                  <div className={`p-2 rounded text-center font-medium text-white ${getHeatIntensity(row.downtown)}`}>
                    {row.downtown}
                  </div>
                  <div className={`p-2 rounded text-center font-medium text-white ${getHeatIntensity(row.mall)}`}>
                    {row.mall}
                  </div>
                  <div className={`p-2 rounded text-center font-medium text-white ${getHeatIntensity(row.airport)}`}>
                    {row.airport}
                  </div>
                  <div className="col-span-7"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-surface rounded"></div>
            <span className="text-text-secondary">Low (0-2)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-text-secondary">Moderate (3-5)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-text-secondary">Busy (6-8)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span className="text-text-secondary">Very Busy (9-10)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span className="text-text-secondary">Peak (11+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPerformance;