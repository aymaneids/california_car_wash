import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LocationSelector = ({ onLocationSelect, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const locations = [
    {
      id: 'los-angeles',
      name: 'Los Angeles',
      address: '123 Sunset Blvd, Los Angeles, CA 90028',
      phone: '(555) 123-4567',
      hours: 'Mon-Sun: 7AM-7PM',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      availability: 'Available Today'
    },
    {
      id: 'san-francisco',
      name: 'San Francisco',
      address: '456 Market St, San Francisco, CA 94102',
      phone: '(555) 234-5678',
      hours: 'Mon-Sun: 8AM-6PM',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      availability: 'Next Available: Tomorrow'
    },
    {
      id: 'san-diego',
      name: 'San Diego',
      address: '789 Harbor Dr, San Diego, CA 92101',
      phone: '(555) 345-6789',
      hours: 'Mon-Sun: 7AM-8PM',
      coordinates: { lat: 32.7157, lng: -117.1611 },
      availability: 'Available Today'
    },
    {
      id: 'sacramento',
      name: 'Sacramento',
      address: '321 Capitol Mall, Sacramento, CA 95814',
      phone: '(555) 456-7890',
      hours: 'Mon-Sat: 8AM-6PM, Sun: 9AM-5PM',
      coordinates: { lat: 38.5816, lng: -121.4944 },
      availability: 'Available Today'
    }
  ];

  useEffect(() => {
    // Auto-detect user location on component mount
    detectUserLocation();
  }, []);

  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.');
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userCoords);
        
        // Find closest location
        const closest = findClosestLocation(userCoords);
        if (closest) {
          setSelectedLocation(closest);
          if (onLocationSelect) {
            onLocationSelect(closest);
          }
        }
        setIsDetecting(false);
      },
      (error) => {
        console.log('Error getting location:', error);
        // Default to Los Angeles if location detection fails
        const defaultLocation = locations[0];
        setSelectedLocation(defaultLocation);
        if (onLocationSelect) {
          onLocationSelect(defaultLocation);
        }
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const findClosestLocation = (userCoords) => {
    let closest = null;
    let minDistance = Infinity;

    locations.forEach(location => {
      const distance = calculateDistance(
        userCoords.lat,
        userCoords.lng,
        location.coordinates.lat,
        location.coordinates.lng
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closest = location;
      }
    });

    return closest;
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const handleCallLocation = (phone, e) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (location, e) => {
    e.stopPropagation();
    const query = encodeURIComponent(location.address);
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Location Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:border-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        disabled={isDetecting}
      >
        <div className="flex items-center space-x-3">
          <Icon 
            name="MapPin" 
            size={20} 
            color="var(--color-primary)" 
            strokeWidth={2}
          />
          <div className="text-left">
            {isDetecting ? (
              <span className="text-text-secondary">Detecting location...</span>
            ) : selectedLocation ? (
              <>
                <div className="font-semibold text-text-primary">
                  {selectedLocation.name}
                </div>
                <div className="text-sm text-text-secondary">
                  {selectedLocation.availability}
                </div>
              </>
            ) : (
              <span className="text-text-secondary">Select Location</span>
            )}
          </div>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="var(--color-text-secondary)" 
          strokeWidth={2}
        />
      </button>

      {/* Location Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-120 max-h-96 overflow-y-auto animate-fade-in">
          <div className="p-2">
            {/* Auto-detect button */}
            <button
              onClick={detectUserLocation}
              disabled={isDetecting}
              className="w-full flex items-center space-x-3 p-3 hover:bg-surface rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <Icon 
                name="Crosshair" 
                size={20} 
                color="var(--color-primary)" 
                strokeWidth={2}
              />
              <span className="font-medium text-primary">
                {isDetecting ? 'Detecting...' : 'Use My Location'}
              </span>
            </button>
            
            <div className="border-t border-border my-2"></div>
            
            {/* Location list */}
            {locations.map((location) => (
              <div
                key={location.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-surface ${
                  selectedLocation?.id === location.id ? 'bg-primary-50 border border-primary' : ''
                }`}
                onClick={() => handleLocationSelect(location)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-text-primary">
                        {location.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        location.availability.includes('Today') 
                          ? 'bg-success-100 text-success' :'bg-warning-100 text-warning'
                      }`}>
                        {location.availability}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      {location.address}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {location.hours}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleCallLocation(location.phone, e)}
                    iconName="Phone"
                    iconSize={16}
                    className="text-xs"
                  >
                    Call
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleGetDirections(location, e)}
                    iconName="Navigation"
                    iconSize={16}
                    className="text-xs text-primary"
                  >
                    Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;