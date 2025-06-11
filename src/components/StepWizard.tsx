
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
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Order Tracking
          </h2>
          <p className="text-gray-600 text-lg">Follow your order journey in real-time</p>
        </div>
        
        {/* Modern Progress Container */}
        <div className="relative mb-16">
          {/* Background Line */}
          <div className="absolute top-12 left-0 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                cancelled 
                  ? 'bg-gradient-to-r from-red-400 to-red-600' 
                  : 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500'
              }`}
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {/* Steps Container */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const Icon = step.icon;
              
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer group transition-all duration-500 ${
                    !cancelled ? 'hover:scale-110' : ''
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Circle */}
                  <div
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl transition-all duration-500 transform group-hover:shadow-2xl ${
                      status === 'completed' 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 scale-110 ring-4 ring-green-200' 
                        : status === 'active'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse scale-110 ring-4 ring-blue-200'
                        : status === 'cancelled'
                        ? 'bg-gradient-to-br from-red-500 to-red-700 ring-4 ring-red-200'
                        : 'bg-gradient-to-br from-gray-300 to-gray-400'
                    }`}
                  >
                    {status === 'cancelled' ? (
                      <X size={32} className="drop-shadow-sm" />
                    ) : status === 'completed' ? (
                      <Check size={32} className="drop-shadow-sm" />
                    ) : (
                      <Icon size={32} className="drop-shadow-sm" />
                    )}
                    
                    {/* Animated ring for active step */}
                    {status === 'active' && (
                      <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping"></div>
                    )}
                  </div>
                  
                  {/* Step Info */}
                  <div className="mt-6 text-center max-w-32">
                    <p className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                      status === 'active' ? 'text-blue-600' : 
                      status === 'cancelled' ? 'text-red-600' :
                      status === 'completed' ? 'text-green-600' :
                      'text-gray-600'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-12">
          {!cancelled && currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <span>Next Step</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </button>
          )}
          
          {!cancelled && (
            <button
              onClick={handleCancel}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Cancel Order
            </button>
          )}
          
          {cancelled && (
            <div className="text-center bg-red-50 p-6 rounded-xl border-2 border-red-200">
              <p className="text-red-600 font-bold text-xl mb-2">Order Cancelled</p>
              <p className="text-red-500">Your order has been cancelled successfully</p>
            </div>
          )}
          
          {currentStep === steps.length - 1 && !cancelled && (
            <div className="text-center bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <p className="text-green-600 font-bold text-xl mb-2 flex items-center justify-center gap-2">
                <Check className="w-6 h-6" />
                Order Delivered!
              </p>
              <p className="text-green-500">Thank you for your order</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepWizard;
