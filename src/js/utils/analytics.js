// src/js/utils/analytics.js - Privacy-focused analytics
export class Analytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track page views
  trackPageView(page) {
    this.trackEvent('page_view', {
      page,
      timestamp: Date.now(),
      session_id: this.sessionId
    });
  }

  // Track user interactions
  trackEvent(eventName, properties = {}) {
    const event = {
      event: eventName,
      properties: {
        ...properties,
        timestamp: Date.now(),
        session_id: this.sessionId,
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        connection: navigator.connection?.effectiveType || 'unknown'
      }
    };

    this.events.push(event);
    console.log('Analytics event:', event);

    // Keep only recent events in memory
    if (this.events.length > 100) {
      this.events.shift();
    }

    // Store in localStorage for offline analysis
    this.storeEvents();
  }

  // Track story interactions
  trackStoryInteraction(action, storyId) {
    this.trackEvent('story_interaction', {
      action, // 'view', 'like', 'share', 'save'
      story_id: storyId
    });
  }

  // Track app performance
  trackPerformance(metric, value) {
    this.trackEvent('performance', {
      metric,
      value,
      page: window.location.hash
    });
  }

  // Track errors (privacy-safe)
  trackError(errorType, message) {
    this.trackEvent('error', {
      type: errorType,
      message: message.substring(0, 100), // Limit message length
      page: window.location.hash
    });
  }

  // Store events locally
  storeEvents() {
    try {
      const recentEvents = this.events.slice(-50); // Keep only 50 recent events
      localStorage.setItem('analytics_events', JSON.stringify(recentEvents));
    } catch (error) {
      console.warn('Could not store analytics events:', error);
    }
  }

  // Get analytics summary
  getAnalyticsSummary() {
    const sessionDuration = Date.now() - this.startTime;
    const pageViews = this.events.filter(e => e.event === 'page_view').length;
    const storyInteractions = this.events.filter(e => e.event === 'story_interaction').length;
    const errors = this.events.filter(e => e.event === 'error').length;

    return {
      session_id: this.sessionId,
      session_duration: sessionDuration,
      page_views: pageViews,
      story_interactions: storyInteractions,
      errors: errors,
      total_events: this.events.length
    };
  }

  // Export data for analysis (privacy-compliant)
  exportData() {
    return {
      summary: this.getAnalyticsSummary(),
      events: this.events.map(event => ({
        ...event,
        properties: {
          ...event.properties,
          // Remove potentially sensitive data
          user_agent: undefined
        }
      }))
    };
  }
}

// Initialize analytics
export const analytics = new Analytics();

// Auto-track page views
window.addEventListener('hashchange', () => {
  analytics.trackPageView(window.location.hash);
});

// Track app installation
window.addEventListener('beforeinstallprompt', () => {
  analytics.trackEvent('install_prompt_shown');
});

// Track app usage patterns
window.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    analytics.trackEvent('app_backgrounded');
  } else {
    analytics.trackEvent('app_foregrounded');
  }
});