
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export const showStatusAlert = (title: string, description: string, type: AlertType = 'success') => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  toast({
    title: title,
    description: (
      <div className="flex items-center gap-2">
        {getIcon()}
        <span>{description}</span>
      </div>
    ),
    variant: getVariant(),
    duration: 3000,
  });
};

// Additional helper functions for specific status alerts
export const showSuccessAlert = (title: string, description: string) => {
  showStatusAlert(title, description, 'success');
};

export const showErrorAlert = (title: string, description: string) => {
  showStatusAlert(title, description, 'error');
};

export const showWarningAlert = (title: string, description: string) => {
  showStatusAlert(title, description, 'warning');
};

export const showInfoAlert = (title: string, description: string) => {
  showStatusAlert(title, description, 'info');
};
