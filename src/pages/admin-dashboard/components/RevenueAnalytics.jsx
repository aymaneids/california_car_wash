import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueAnalytics = ({ data = {} }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');

  const monthlyData = data?.monthly || [];
  
  const totalRevenue = monthlyData.reduce((sum, month) => sum + (month?.revenue || 0), 0);
  const totalProfit = monthlyData.reduce((sum, month) => sum + (month?.profit || 0), 0);
  const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;

  const servicePopularity = [
    { service: 'Premium Wash', revenue: 45000, percentage: 35, bookings: 320 },
    { service: 'Full Detail', revenue: 38000, percentage: 30, bookings: 180 },
    { service: 'Basic Wash', revenue: 25000, percentage: 20, bookings: 480 },
    { service: 'Interior Only', revenue: 19000, percentage: 15, bookings: 220 }
  ];

  const revenueMetrics = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign'
    },
    {
      title: 'Total Profit',
      value: `$${totalProfit.toLocaleString()}`,
      change: '+8.3%',
      changeType: 'positive',
      icon: 'TrendingUp'
    },
    {
      title: 'Profit Margin',
      value: `${profitMargin}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Percent'
    },
    {
      title: 'Avg. Order Value',
      value: '$45',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Calculator'
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
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueMetrics.map((metric, index) => (
          <div key={index} className="bg-background rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {metric.value}
                </p>
                <p className={`text-xs font-medium mt-1 ${getChangeColor(metric.changeType)}`}>
                  {metric.change} from last period
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <Icon name={metric.icon} size={24} className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart and Controls */}
      <div className="bg-background rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Revenue Analytics
          </h3>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            
            <Button variant="outline" iconName="Download" size="sm">
              Export
            </Button>
          </div>
        </div>

        {/* Simple Chart Representation */}
        <div className="space-y-4">
          {monthlyData.map((month, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-text-secondary">
                {month?.month || `Month ${index + 1}`}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-primary">Revenue</span>
                  <span className="text-sm font-semibold text-text-primary">
                    ${(month?.revenue || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${((month?.revenue || 0) / 60000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-primary">Profit</span>
                  <span className="text-sm font-semibold text-text-primary">
                    ${(month?.profit || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{ width: `${((month?.profit || 0) / 25000) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Popularity */}
      <div className="bg-background rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Service Popularity & Revenue
        </h3>
        
        <div className="space-y-4">
          {servicePopularity.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-text-primary">
                    {service.service}
                  </h4>
                  <span className="text-sm font-semibold text-text-primary">
                    ${service.revenue.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex-1">
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {service.percentage}% of revenue
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary">
                  {service.bookings} bookings this quarter
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-background rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Financial Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-surface rounded-lg">
            <Icon name="TrendingUp" size={32} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-text-secondary">Total Revenue</p>
          </div>
          
          <div className="text-center p-4 bg-surface rounded-lg">
            <Icon name="DollarSign" size={32} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">
              ${totalProfit.toLocaleString()}
            </p>
            <p className="text-sm text-text-secondary">Net Profit</p>
          </div>
          
          <div className="text-center p-4 bg-surface rounded-lg">
            <Icon name="Percent" size={32} className="text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">
              {profitMargin}%
            </p>
            <p className="text-sm text-text-secondary">Profit Margin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;