import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StaffManagement = ({ staff = [] }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [scheduleView, setScheduleView] = useState('today');

  const scheduleData = {
    today: [
      { time: '8:00 AM', staff: 'Mike Johnson', location: 'Downtown', status: 'active' },
      { time: '9:00 AM', staff: 'Sarah Wilson', location: 'Mall', status: 'active' },
      { time: '10:00 AM', staff: 'David Chen', location: 'Downtown', status: 'break' },
      { time: '11:00 AM', staff: 'Lisa Rodriguez', location: 'Mall', status: 'active' }
    ],
    week: [
      { day: 'Monday', staffCount: 8, hoursWorked: 64 },
      { day: 'Tuesday', staffCount: 7, hoursWorked: 56 },
      { day: 'Wednesday', staffCount: 9, hoursWorked: 72 }
    ]
  };

  const performanceMetrics = [
    {
      title: 'Active Staff',
      value: staff?.length || 0,
      icon: 'Users',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Avg. Performance',
      value: '92%',
      icon: 'TrendingUp',
      change: '+3%',
      changeType: 'positive'
    },
    {
      title: 'Certifications',
      value: '94%',
      icon: 'Award',
      change: '+1%',
      changeType: 'positive'
    },
    {
      title: 'On Time Rate',
      value: '98%',
      icon: 'Clock',
      change: '-1%',
      changeType: 'negative'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-50 text-success border-success-200';
      case 'break':
        return 'bg-warning-50 text-warning border-warning-200';
      case 'off':
        return 'bg-error-50 text-error border-error-200';
      default:
        return 'bg-surface text-text-secondary border-border';
    }
  };

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
      {/* Staff Performance Metrics */}
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
                <p className={`text-xs font-medium mt-1 ${getChangeColor(metric.changeType)}`}>
                  {metric.change} from last week
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <Icon name={metric.icon} size={24} className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff List */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">
                Staff Members
              </h3>
              <Button variant="primary" iconName="UserPlus" size="sm">
                Add Staff
              </Button>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {staff?.length > 0 ? (
              staff.map((member) => (
                <div 
                  key={member.id}
                  className={`p-4 cursor-pointer hover:bg-surface transition-colors duration-200 ${
                    selectedStaff?.id === member.id ? 'bg-primary-50 border-r-2 border-r-primary' : ''
                  }`}
                  onClick={() => setSelectedStaff(member)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {member?.name?.charAt(0) || 'N'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {member?.name || 'Unknown Staff'}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {member?.position || 'No position'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-semibold text-text-primary">
                        {member?.performance || 0}%
                      </p>
                      <p className="text-xs text-text-secondary">
                        Performance
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No staff members
                </h3>
                <p className="text-text-secondary">
                  Start by adding your first staff member.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Staff Details/Schedule */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">
                {selectedStaff ? 'Staff Details' : 'Staff Schedule'}
              </h3>
              {!selectedStaff && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setScheduleView('today')}
                    className={`px-3 py-1 text-sm rounded ${
                      scheduleView === 'today' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setScheduleView('week')}
                    className={`px-3 py-1 text-sm rounded ${
                      scheduleView === 'week' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Week
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {selectedStaff ? (
            <div className="p-6 space-y-6">
              {/* Staff Profile */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {selectedStaff?.name?.charAt(0) || 'N'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-text-primary">
                    {selectedStaff?.name || 'Unknown Staff'}
                  </h4>
                  <p className="text-text-secondary">
                    {selectedStaff?.position || 'No position specified'}
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-sm text-text-secondary">Performance</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {selectedStaff?.performance || 0}%
                  </p>
                </div>
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-sm text-text-secondary">Schedule</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {selectedStaff?.schedule || 'Not set'}
                  </p>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <h5 className="font-semibold text-text-primary">Certifications</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedStaff?.certifications?.map((cert, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full border border-primary-200"
                    >
                      {cert}
                    </span>
                  )) || (
                    <p className="text-sm text-text-secondary">No certifications listed</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <Button variant="primary" iconName="Calendar" fullWidth>
                  Edit Schedule
                </Button>
                <Button variant="outline" iconName="Award" fullWidth>
                  Manage Certifications
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {scheduleView === 'today' ? (
                <div className="space-y-3">
                  {scheduleData.today.map((shift, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-text-primary">
                          {shift.time}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {shift.staff} - {shift.location}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(shift.status)}`}>
                        {shift.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {scheduleData.week.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <span className="font-medium text-text-primary">
                        {day.day}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-medium text-text-primary">
                          {day.staffCount} staff
                        </p>
                        <p className="text-xs text-text-secondary">
                          {day.hoursWorked} hours
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;