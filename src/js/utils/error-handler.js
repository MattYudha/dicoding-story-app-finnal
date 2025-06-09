// src/js/utils/error-handler.js - Centralized error handling
export class ErrorHandler {
  constructor() {
    this.setupGlobalErrorHandling();
    this.errorQueue = [];
    this.maxErrors = 50;
  }

  setupGlobalErrorHandling() {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Handle network errors
    window.addEventListener('offline', () => {
      this.showUserFriendlyError('You are offline. Some features may not work.');
    });

    window.addEventListener('online', () => {
      this.showUserFriendlyMessage('Connection restored!');
    });
  }

  logError(error) {
    console.error('Error logged:', error);
    
    // Add to error queue
    this.errorQueue.push(error);
    
    // Keep only recent errors
    if (this.errorQueue.length > this.maxErrors) {
      this.errorQueue.shift();
    }

    // Store in localStorage for debugging
    try {
      localStorage.setItem('app-errors', JSON.stringify(this.errorQueue.slice(-10)));
    } catch (e) {
      // localStorage might be full
    }

    // Show user-friendly message for critical errors
    if (this.isCriticalError(error)) {
      this.showUserFriendlyError('Something went wrong. Please try refreshing the page.');
    }
  }

  isCriticalError(error) {
    const criticalPatterns = [
      /network/i,
      /fetch/i,
      /api/i,
      /authentication/i,
      /authorization/i
    ];
    
    return criticalPatterns.some(pattern => 
      pattern.test(error.message) || pattern.test(error.stack || '')
    );
  }

  showUserFriendlyError(message) {
    this.showToast(message, 'error');
  }

  showUserFriendlyMessage(message) {
    this.showToast(message, 'success');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  // Get error reports for debugging
  getErrorReports() {
    return this.errorQueue;
  }

  // Clear error queue
  clearErrors() {
    this.errorQueue = [];
    localStorage.removeItem('app-errors');
  }
}

// API error handler
export function handleApiError(error, context = '') {
  const errorHandler = new ErrorHandler();
  
  let userMessage = 'Something went wrong. Please try again.';
  
  if (error.message.includes('network') || error.message.includes('fetch')) {
    userMessage = 'Network error. Please check your connection.';
  } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
    userMessage = 'Please log in again.';
    // Redirect to login
    setTimeout(() => {
      window.location.hash = '#/login';
    }, 2000);
  } else if (error.message.includes('403') || error.message.includes('forbidden')) {
    userMessage = 'You do not have permission to perform this action.';
  } else if (error.message.includes('404')) {
    userMessage = 'The requested resource was not found.';
  } else if (error.message.includes('500')) {
    userMessage = 'Server error. Please try again later.';
  }

  errorHandler.logError({
    type: 'api',
    context,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });

  errorHandler.showUserFriendlyError(userMessage);
  
  return userMessage;
}