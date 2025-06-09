// src/js/utils/accessibility.js - Enhanced accessibility features
export class AccessibilityManager {
  constructor() {
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupFocusManagement();
    this.setupColorContrastDetection();
  }

  setupKeyboardNavigation() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      // Skip to main content (Alt + M)
      if (event.altKey && event.key === 'm') {
        event.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          this.announceToScreenReader('Jumped to main content');
        }
      }

      // Open navigation menu (Alt + N)
      if (event.altKey && event.key === 'n') {
        event.preventDefault();
        const nav = document.querySelector('nav');
        if (nav) {
          const firstLink = nav.querySelector('a');
          if (firstLink) {
            firstLink.focus();
            this.announceToScreenReader('Navigation menu focused');
          }
        }
      }

      // Search functionality (Alt + S)
      if (event.altKey && event.key === 's') {
        event.preventDefault();
        // Focus search if available
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
          searchInput.focus();
          this.announceToScreenReader('Search focused');
        }
      }

      // Escape key to close modals/overlays
      if (event.key === 'Escape') {
        this.closeActiveModal();
      }
    });

    // Arrow key navigation for story grids
    this.setupGridNavigation();
  }

  setupGridNavigation() {
    document.addEventListener('keydown', (event) => {
      const activeElement = document.activeElement;
      const storyItems = Array.from(document.querySelectorAll('.story-item'));
      
      if (storyItems.includes(activeElement)) {
        const currentIndex = storyItems.indexOf(activeElement);
        let nextIndex = currentIndex;

        switch (event.key) {
          case 'ArrowRight':
            nextIndex = Math.min(currentIndex + 1, storyItems.length - 1);
            break;
          case 'ArrowLeft':
            nextIndex = Math.max(currentIndex - 1, 0);
            break;
          case 'ArrowDown':
            // Move to next row (assuming 3 columns)
            nextIndex = Math.min(currentIndex + 3, storyItems.length - 1);
            break;
          case 'ArrowUp':
            // Move to previous row
            nextIndex = Math.max(currentIndex - 3, 0);
            break;
          default:
            return;
        }

        if (nextIndex !== currentIndex) {
          event.preventDefault();
          storyItems[nextIndex].focus();
        }
      }
    });
  }

  setupScreenReaderSupport() {
    // Create live region for announcements
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(this.liveRegion);

    // Announce page changes
    this.observePageChanges();
  }

  observePageChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target.id === 'content') {
          const newContent = mutation.target.querySelector('h1, h2');
          if (newContent) {
            setTimeout(() => {
              this.announceToScreenReader(`Page loaded: ${newContent.textContent}`);
            }, 500);
          }
        }
      });
    });

    const contentElement = document.getElementById('content');
    if (contentElement) {
      observer.observe(contentElement, { childList: true, subtree: true });
    }
  }

  announceToScreenReader(message) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        this.liveRegion.textContent = '';
      }, 1000);
    }
  }

  setupFocusManagement() {
    // Track focus for better UX
    let lastFocusedElement = null;

    document.addEventListener('focusin', (event) => {
      lastFocusedElement = event.target;
    });

    // Restore focus when returning from modal
    this.restoreFocus = () => {
      if (lastFocusedElement && document.contains(lastFocusedElement)) {
        lastFocusedElement.focus();
      }
    };

    // Focus trap for modals
    this.setupFocusTrap();
  }

  setupFocusTrap() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        const modal = document.querySelector('.modal:not([hidden])');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    });
  }

  setupColorContrastDetection() {
    // Check if user prefers high contrast
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }

    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }

    // Listen for changes
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      document.body.classList.toggle('high-contrast', e.matches);
    });

    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      document.body.classList.toggle('reduced-motion', e.matches);
    });
  }

  closeActiveModal() {
    const activeModal = document.querySelector('.modal:not([hidden])');
    if (activeModal) {
      activeModal.hidden = true;
      this.restoreFocus();
      this.announceToScreenReader('Modal closed');
    }
  }

  // Add ARIA labels dynamically
  enhanceAriaLabels() {
    // Enhance story items
    document.querySelectorAll('.story-item').forEach((item, index) => {
      if (!item.getAttribute('aria-label')) {
        const title = item.querySelector('h3')?.textContent || 'Story';
        const author = item.querySelector('.author-info h3')?.textContent || 'Unknown author';
        item.setAttribute('aria-label', `Story ${index + 1}: ${title} by ${author}`);
      }
    });

    // Enhance buttons without labels
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
      const text = button.textContent.trim();
      const icon = button.querySelector('.btn-icon')?.textContent;
      if (text) {
        button.setAttribute('aria-label', text);
      } else if (icon) {
        button.setAttribute('aria-label', `Button with ${icon} icon`);
      }
    });
  }

  // Check accessibility compliance
  auditAccessibility() {
    const issues = [];

    // Check for missing alt text
    document.querySelectorAll('img:not([alt])').forEach(img => {
      issues.push(`Image missing alt text: ${img.src}`);
    });

    // Check for missing form labels
    document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) {
        issues.push(`Input missing label: ${input.type} input`);
      }
    });

    // Check for missing headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
      issues.push('Page missing heading structure');
    }

    // Check for color contrast (basic check)
    this.checkColorContrast(issues);

    return issues;
  }

  checkColorContrast(issues) {
    // This is a simplified check - in production, you'd use a proper contrast checking library
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Basic check for very light text on light background
      if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgb(255, 255, 255)') {
        issues.push(`Potential contrast issue: white text on white background`);
      }
    });
  }
}

// Initialize accessibility manager
export const accessibilityManager = new AccessibilityManager();

// Auto-enhance ARIA labels when content changes
const observer = new MutationObserver(() => {
  accessibilityManager.enhanceAriaLabels();
});

observer.observe(document.body, { childList: true, subtree: true });