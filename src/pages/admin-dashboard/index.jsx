import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import DashboardMetrics from './components/DashboardMetrics';
import BookingManagement from './components/BookingManagement';
import CustomerDatabase from './components/CustomerDatabase';
import RevenueAnalytics from './components/RevenueAnalytics';
import StaffManagement from './components/StaffManagement';
import InventoryTracking from './components/InventoryTracking';
import LocationPerformance from './components/LocationPerformance';
import NotificationPanel from './components/NotificationPanel';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    metrics: {},
    bookings: [],
    customers: [],
    revenue: {},
    staff: [],
    inventory: [],
    locations: []
  });

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'LayoutDashboard' },
    { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
    { id: 'customers', label: 'Customers', icon: 'Users' },
    { id: 'revenue', label: 'Revenue', icon: 'TrendingUp' },
    { id: 'staff', label: 'Staff', icon: 'UserCheck' },
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
    { id: 'locations', label: 'Locations', icon: 'MapPin' }
  ];

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      // In a real app, this would fetch from an API
      setDashboardData({
        metrics: {
          todayBookings: 28,
          weeklyRevenue: 12500,
          completionRate: 94,
          customerSatisfaction: 4.8,
          activeStaff: 12,
          pendingBookings: 6
        },
        bookings: [
          {
            id: 1,
            customerName: 'John Smith',
            service: 'Premium Wash',
            time: '09:00 AM',
            status: 'confirmed',
            location: 'Downtown',
            phone: '(555) 123-4567'
          },
          {
            id: 2,
            customerName: 'Sarah Johnson',
            service: 'Full Detail',
            time: '10:30 AM',
            status: 'in-progress',
            location: 'Mall',
            phone: '(555) 234-5678'
          }
        ],
        customers: [
          {
            id: 1,
            name: 'John Smith',
            email: 'john@email.com',
            phone: '(555) 123-4567',
            totalVisits: 15,
            lastVisit: '2024-01-15',
            preferredService: 'Premium Wash',
            totalSpent: 450
          }
        ],
        revenue: {
          monthly: [
            { month: 'Jan', revenue: 45000, profit: 18000 },
            { month: 'Feb', revenue: 52000, profit: 21000 },
            { month: 'Mar', revenue: 48000, profit: 19200 }
          ]
        },
        staff: [
          {
            id: 1,
            name: 'Mike Johnson',
            position: 'Wash Technician',
            schedule: 'Morning Shift',
            performance: 92,
            certifications: ['Premium Wash', 'Detail Service']
          }
        ],
        inventory: [
          {
            id: 1,
            item: 'Car Shampoo',
            currentStock: 25,
            minStock: 10,
            status: 'good',
            lastRestocked: '2024-01-10'
          },
          {
            id: 2,
            item: 'Microfiber Towels',
            currentStock: 5,
            minStock: 15,
            status: 'low',
            lastRestocked: '2024-01-05'
          }
        ],
        locations: [
          {
            id: 1,
            name: 'Downtown Location',
            todayBookings: 18,
            revenue: 2800,
            peakHours: '10 AM - 2 PM',
            staffCount: 6
          },
          {
            id: 2,
            name: 'Mall Location',
            todayBookings: 10,
            revenue: 1500,
            peakHours: '2 PM - 6 PM',
            staffCount: 4
          }
        ]
      });

      // Simulate notifications
      setNotifications([
        {
          id: 1,
          type: 'urgent',
          message: 'Low inventory: Microfiber Towels need restock',
          time: '5 minutes ago'
        },
        {
          id: 2,
          type: 'info',
          message: 'New customer booking at Downtown location',
          time: '10 minutes ago'
        }
      ]);
    };

    loadDashboardData();
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardMetrics data={dashboardData.metrics} />;
      case 'bookings':
        return <BookingManagement bookings={dashboardData.bookings} />;
      case 'customers':
        return <CustomerDatabase customers={dashboardData.customers} />;
      case 'revenue':
        return <RevenueAnalytics data={dashboardData.revenue} />;
      case 'staff':
        return <StaffManagement staff={dashboardData.staff} />;
      case 'inventory':
        return <InventoryTracking inventory={dashboardData.inventory} />;
      case 'locations':
        return <LocationPerformance locations={dashboardData.locations} />;
      default:
        return <DashboardMetrics data={dashboardData.metrics} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary">
      <Header />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-text-secondary">
                  Comprehensive business intelligence and operational control
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0">
                <NotificationPanel notifications={notifications} />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{/* Icon placeholder */}</span>
                      <span>{tab.label}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="animate-fade-in">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;