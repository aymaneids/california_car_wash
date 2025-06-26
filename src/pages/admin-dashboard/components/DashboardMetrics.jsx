import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardMetrics = ({ data = {} }) => {
  const metrics = [
    {
      title: 'Today\'s Bookings',
      value: data?.todayBookings || 0,
      icon: 'Calendar',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Weekly Revenue',
      value: `$${(data?.weeklyRevenue || 0).toLocaleString()}`,
      icon: 'DollarSign',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Completion Rate',
      value: `${data?.completionRate || 0}%`,
      icon: 'CheckCircle',
      change: '+2%',
      changeType: 'positive'
    },
    {
      title: 'Customer Rating',
      value: `${data?.customerSatisfaction || 0}/5`,
      icon: 'Star',
      change: '+0.2',
      changeType: 'positive'
    },
    {
      title: 'Active Staff',
      value: data?.activeStaff || 0,
      icon: 'Users',
      change: 'No change',
      changeType: 'neutral'
    },
    {
      title: 'Pending Bookings',
      value: data?.pendingBookings || 0,
      icon: 'Clock',
      change: '-3',
      changeType: 'negative'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {metric.value}
                </p>
                <p className={`text-xs font-medium mt-1 ${getChangeColor(metric.changeType)}`}>
                  {metric.change}
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <Icon 
                  name={metric.icon} 
                  size={24} 
                  className="text-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-background rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200">
            <Icon name="Plus" size={20} className="text-primary mb-2" />
            <span className="text-sm font-medium text-text-primary">Add Booking</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200">
            <Icon name="UserPlus" size={20} className="text-primary mb-2" />
            <span className="text-sm font-medium text-text-primary">New Customer</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200">
            <Icon name="Package" size={20} className="text-primary mb-2" />
            <span className="text-sm font-medium text-text-primary">Update Inventory</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200">
            <Icon name="FileText" size={20} className="text-primary mb-2" />
            <span className="text-sm font-medium text-text-primary">Generate Report</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-background rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              icon: 'CheckCircle',
              message: 'Premium wash completed for John Smith',
              time: '2 minutes ago',
              type: 'success'
            },
            {
              icon: 'Calendar',
              message: 'New booking scheduled for 2:00 PM',
              time: '5 minutes ago',
              type: 'info'
            },
            {
              icon: 'AlertTriangle',
              message: 'Low inventory alert: Car soap running low',
              time: '10 minutes ago',
              type: 'warning'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                activity.type === 'success' ? 'bg-success-50' :
                activity.type === 'warning'? 'bg-warning-50' : 'bg-primary-50'
              }`}>
                <Icon 
                  name={activity.icon} 
                  size={16} 
                  className={
                    activity.type === 'success' ? 'text-success' :
                    activity.type === 'warning'? 'text-warning' : 'text-primary'
                  }
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">{activity.message}</p>
                <p className="text-xs text-text-secondary">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;