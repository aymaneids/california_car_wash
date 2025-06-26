import React from 'react';
import Icon from '../AppIcon';

const BookingProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  onStepClick,
  className = '' 
}) => {
  const defaultSteps = [
    { id: 1, label: 'Service', icon: 'Car', description: 'Choose your package' },
    { id: 2, label: 'Schedule', icon: 'Calendar', description: 'Pick date & time' },
    { id: 3, label: 'Details', icon: 'User', description: 'Your information' },
    { id: 4, label: 'Confirm', icon: 'CheckCircle', description: 'Review & book' }
  ];

  const progressSteps = steps.length > 0 ? steps : defaultSteps;

  const handleStepClick = (stepId) => {
    if (onStepClick && stepId <= currentStep) {
      onStepClick(stepId);
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-surface text-text-secondary border-border';
      default:
        return 'bg-surface text-text-secondary border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Progress Bar */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-text-primary">
            {progressSteps.find(step => step.id === currentStep)?.label}
          </h3>
          <p className="text-sm text-text-secondary">
            {progressSteps.find(step => step.id === currentStep)?.description}
          </p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden lg:block">
        <nav aria-label="Booking progress">
          <ol className="flex items-center justify-between">
            {progressSteps.map((step, index) => {
              const status = getStepStatus(step.id);
              const isClickable = step.id <= currentStep && onStepClick;
              
              return (
                <li key={step.id} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isClickable}
                      className={`
                        w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ease-in-out
                        ${getStepClasses(status)}
                        ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      `}
                      aria-current={status === 'current' ? 'step' : undefined}
                    >
                      {status === 'completed' ? (
                        <Icon 
                          name="Check" 
                          size={20} 
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Icon 
                          name={step.icon} 
                          size={20} 
                          strokeWidth={2}
                        />
                      )}
                    </button>
                    
                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <div className={`text-sm font-medium ${
                        status === 'current' ? 'text-primary' : 
                        status === 'completed'? 'text-success' : 'text-text-secondary'
                      }`}>
                        {step.label}
                      </div>
                      <div className="text-xs text-text-secondary mt-1 max-w-24">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < progressSteps.length - 1 && (
                    <div className="flex-1 mx-4 mt-[-2rem]">
                      <div className={`h-0.5 transition-all duration-300 ease-in-out ${
                        getConnectorClasses(step.id)
                      }`}></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name="Clock" 
              size={20} 
              color="var(--color-text-secondary)" 
              strokeWidth={2}
            />
            <span className="text-sm text-text-secondary">
              Estimated completion time: 3-5 minutes
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name="Shield" 
              size={16} 
              color="var(--color-success)" 
              strokeWidth={2}
            />
            <span className="text-xs text-success font-medium">
              Secure Booking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;