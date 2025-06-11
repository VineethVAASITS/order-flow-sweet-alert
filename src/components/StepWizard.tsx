
import React, { useState } from 'react';
import { Check, Clock, Package, Truck, MapPin, ShoppingBag, X } from 'lucide-react';
import { showStatusAlert } from '../utils/sweetAlert';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'completed' | 'active' | 'pending' | 'cancelled';
}

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Order Accept',
      description: 'Your order has been accepted',
      icon: Check,
      status: currentStep >= 0 ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: 'Start Ride',
      description: 'Delivery partner is on the way',
      icon: Truck,
      status: currentStep >= 1 ? (currentStep === 1 ? 'active' : 'completed') : 'pending'
    },
    {
      id: 3,
      title: 'Reached Shop',
      description: 'Arrived at pickup location',
      icon: MapPin,
      status: currentStep >= 2 ? (currentStep === 2 ? 'active' : 'completed') : 'pending'
    },
    {
      id: 4,
      title: 'Order Picked',
      description: 'Order picked up from shop',
      icon: ShoppingBag,
      status: currentStep >= 3 ? (currentStep === 3 ? 'active' : 'completed') : 'pending'
    },
    {
      id: 5,
      title: 'Shipped',
      description: 'Order is on the way to you',
      icon: Package,
      status: currentStep >= 4 ? (currentStep === 4 ? 'active' : 'completed') : 'pending'
    },
    {
      id: 6,
      title: 'Delivered',
      description: 'Order successfully delivered',
      icon: Check,
      status: currentStep >= 5 ? 'completed' : 'pending'
    }
  ];

  const handleStepClick = (stepIndex: number) => {
    if (cancelled) return;
    
    setCurrentStep(stepIndex);
    const step = steps[stepIndex];
    showStatusAlert(step.title, step.description, 'success');
  };

  const handleCancel = () => {
    setCancelled(true);
    showStatusAlert('Cancelled', 'Your order has been cancelled', 'error');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && !cancelled) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const step = steps[nextStep];
      showStatusAlert(step.title, step.description, 'success');
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (cancelled) return 'cancelled';
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Order Tracking</h2>
        
        {/* Progress Line */}
        <div className="relative mb-12">
          <div className="absolute top-8 left-0 w-full h-1 bg-muted rounded-full">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                cancelled ? 'bg-destructive' : 'bg-primary'
              }`}
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {/* Steps */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const Icon = step.icon;
              
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    !cancelled ? 'hover:scale-105' : ''
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
                      status === 'completed' 
                        ? 'bg-primary scale-110' 
                        : status === 'active'
                        ? 'bg-primary animate-pulse scale-110'
                        : status === 'cancelled'
                        ? 'bg-destructive'
                        : 'bg-muted-foreground'
                    }`}
                  >
                    {status === 'cancelled' ? (
                      <X size={24} />
                    ) : status === 'completed' ? (
                      <Check size={24} />
                    ) : (
                      <Icon size={24} />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`font-semibold text-sm ${
                      status === 'active' ? 'text-primary' : 
                      status === 'cancelled' ? 'text-destructive' :
                      'text-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-24">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {!cancelled && currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Next Step
            </button>
          )}
          
          {!cancelled && (
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Cancel Order
            </button>
          )}
          
          {cancelled && (
            <div className="text-center">
              <p className="text-destructive font-semibold text-lg">Order Cancelled</p>
              <p className="text-muted-foreground text-sm mt-1">Your order has been cancelled successfully</p>
            </div>
          )}
          
          {currentStep === steps.length - 1 && !cancelled && (
            <div className="text-center">
              <p className="text-primary font-semibold text-lg">Order Delivered!</p>
              <p className="text-muted-foreground text-sm mt-1">Thank you for your order</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepWizard;
