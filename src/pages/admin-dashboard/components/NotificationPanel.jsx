import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const urgentNotifications = notifications?.filter(n => n?.type === 'urgent') || [];
  const hasUrgentNotifications = urgentNotifications.length > 0;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent':
        return { icon: 'AlertTriangle', color: 'text-error' };
      case 'warning':
        return { icon: 'AlertCircle', color: 'text-warning' };
      case 'info':
        return { icon: 'Info', color: 'text-primary' };
      case 'success':
        return { icon: 'CheckCircle', color: 'text-success' };
      default:
        return { icon: 'Bell', color: 'text-text-secondary' };
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-error-50 border-error-200 hover:bg-error-100';
      case 'warning':
        return 'bg-warning-50 border-warning-200 hover:bg-warning-100';
      case 'info':
        return 'bg-primary-50 border-primary-200 hover:bg-primary-100';
      case 'success':
        return 'bg-success-50 border-success-200 hover:bg-success-100';
      default:
        return 'bg-surface border-border hover:bg-surface-200';
    }
  };

  const handleMarkAsRead = (notificationId) => {
    // In a real app, this would mark the notification as read via API
    console.log(`Marking notification ${notificationId} as read`);
  };

  const handleDismiss = (notificationId) => {
    // In a real app, this would dismiss the notification via API
    console.log(`Dismissing notification ${notificationId}`);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none"
      >
        <Icon name="Bell" size={24} />
        {hasUrgentNotifications && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
            {urgentNotifications.length}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  Notifications
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              {notifications?.length > 0 && (
                <p className="text-sm text-text-secondary mt-1">
                  {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                  {hasUrgentNotifications && (
                    <span className="text-error font-medium">
                      {' '}• {urgentNotifications.length} urgent
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-80">
              {notifications?.length > 0 ? (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => {
                    const iconInfo = getNotificationIcon(notification?.type);
                    const colorClass = getNotificationColor(notification?.type);
                    
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 cursor-pointer transition-colors duration-200 border-l-4 ${colorClass}`}
                        onClick={() => setSelectedNotification(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 pt-1">
                            <Icon 
                              name={iconInfo.icon} 
                              size={18} 
                              className={iconInfo.color}
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-text-primary font-medium leading-5">
                              {notification?.message || 'No message'}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              {notification?.time || 'Unknown time'}
                            </p>
                          </div>
                          
                          <div className="flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDismiss(notification.id);
                              }}
                              className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                            >
                              <Icon name="X" size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    No notifications
                  </h3>
                  <p className="text-text-secondary text-sm">
                    You're all caught up! New notifications will appear here.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications?.length > 0 && (
              <div className="p-4 border-t border-border bg-surface">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    iconName="Check"
                  >
                    Mark All Read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    iconName="Trash2"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedNotification(null)}
          >
            <div 
              className="bg-background rounded-xl border border-border p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Notification Details
                </h3>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  {(() => {
                    const iconInfo = getNotificationIcon(selectedNotification?.type);
                    return (
                      <Icon 
                        name={iconInfo.icon} 
                        size={24} 
                        className={iconInfo.color}
                      />
                    );
                  })()}
                  <div className="flex-1">
                    <p className="text-text-primary">
                      {selectedNotification?.message || 'No message'}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      {selectedNotification?.time || 'Unknown time'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      handleMarkAsRead(selectedNotification.id);
                      setSelectedNotification(null);
                    }}
                  >
                    Mark as Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      handleDismiss(selectedNotification.id);
                      setSelectedNotification(null);
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;