'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  onClose?: () => void;
  autoHideDuration?: number | null;
  showIcon?: boolean;
}

export const Alert = ({
  message,
  type = 'error',
  onClose,
  autoHideDuration = 5000,
  showIcon = true,
}: AlertProps) => {
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (autoHideDuration && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, isVisible]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const styles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: 'text-red-400',
      darkBg: 'dark:bg-red-900/20',
      darkBorder: 'dark:border-red-800',
      darkText: 'dark:text-red-200',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-800',
      icon: 'text-green-400',
      darkBg: 'dark:bg-green-900/20',
      darkBorder: 'dark:border-green-800',
      darkText: 'dark:text-green-200',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      icon: 'text-yellow-400',
      darkBg: 'dark:bg-yellow-900/20',
      darkBorder: 'dark:border-yellow-800',
      darkText: 'dark:text-yellow-200',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      icon: 'text-blue-400',
      darkBg: 'dark:bg-blue-900/20',
      darkBorder: 'dark:border-blue-800',
      darkText: 'dark:text-blue-200',
    },
  };

  const currentStyle = styles[type];

  const icons = {
    error: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div
      className={`
        relative rounded-lg border p-4
        ${currentStyle.bg} ${currentStyle.border} ${currentStyle.darkBg} ${currentStyle.darkBorder}
        transform transition-all duration-300 ease-in-out
        ${isLeaving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
      role="alert"
    >
      <div className="flex items-start space-x-3">
        {showIcon && (
          <div className={`flex-shrink-0 ${currentStyle.icon}`}>
            {icons[type]}
          </div>
        )}
        <div className="flex-1 space-y-1">
          <p className={`whitespace-pre-line text-sm font-medium ${currentStyle.text} ${currentStyle.darkText}`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            className={`flex-shrink-0 ${currentStyle.text} ${currentStyle.darkText} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type}-500`}
            onClick={handleClose}
          >
            <span className="sr-only">{t('alert.close')}</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}; 