import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerDatabase = ({ customers = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers?.filter(customer =>
    customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer?.phone?.includes(searchTerm)
  ) || [];

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleScheduleFollowUp = (customerId) => {
    // In a real app, this would schedule a follow-up
    console.log(`Scheduling follow-up for customer ${customerId}`);
  };

  const handleSendMessage = (customerId) => {
    // In a real app, this would open messaging interface
    console.log(`Sending message to customer ${customerId}`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-background rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download">
              Export
            </Button>
            <Button variant="primary" iconName="UserPlus">
              Add Customer
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer List */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              Customer List
            </h3>
            <p className="text-sm text-text-secondary">
              {filteredCustomers.length} customers found
            </p>
          </div>
          
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <div 
                  key={customer.id} 
                  className={`p-4 cursor-pointer hover:bg-surface transition-colors duration-200 ${
                    selectedCustomer?.id === customer.id ? 'bg-primary-50 border-r-2 border-r-primary' : ''
                  }`}
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {customer?.name?.charAt(0) || 'N'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {customer?.name || 'Unknown Customer'}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {customer?.email || 'No email'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-text-primary">
                        {customer?.totalVisits || 0} visits
                      </p>
                      <p className="text-xs text-text-secondary">
                        ${customer?.totalSpent || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No customers found
                </h3>
                <p className="text-text-secondary">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Start by adding your first customer.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              Customer Details
            </h3>
          </div>
          
          {selectedCustomer ? (
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {selectedCustomer?.name?.charAt(0) || 'N'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-text-primary">
                    {selectedCustomer?.name || 'Unknown Customer'}
                  </h4>
                  <p className="text-text-secondary">
                    Customer since {selectedCustomer?.lastVisit || 'Unknown'}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h5 className="font-semibold text-text-primary">Contact Information</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">
                      {selectedCustomer?.email || 'No email provided'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">
                      {selectedCustomer?.phone || 'No phone provided'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service History */}
              <div className="space-y-3">
                <h5 className="font-semibold text-text-primary">Service History</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface rounded-lg p-3">
                    <p className="text-sm text-text-secondary">Total Visits</p>
                    <p className="text-lg font-semibold text-text-primary">
                      {selectedCustomer?.totalVisits || 0}
                    </p>
                  </div>
                  <div className="bg-surface rounded-lg p-3">
                    <p className="text-sm text-text-secondary">Total Spent</p>
                    <p className="text-lg font-semibold text-text-primary">
                      ${selectedCustomer?.totalSpent || 0}
                    </p>
                  </div>
                </div>
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-sm text-text-secondary">Preferred Service</p>
                  <p className="font-medium text-text-primary">
                    {selectedCustomer?.preferredService || 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <Button
                  variant="primary"
                  iconName="Calendar"
                  fullWidth
                  onClick={() => handleScheduleFollowUp(selectedCustomer.id)}
                >
                  Schedule Follow-up
                </Button>
                <Button
                  variant="outline"
                  iconName="MessageSquare"
                  fullWidth
                  onClick={() => handleSendMessage(selectedCustomer.id)}
                >
                  Send Message
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Icon name="User" size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Select a Customer
              </h3>
              <p className="text-text-secondary">
                Choose a customer from the list to view their details and service history.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDatabase;