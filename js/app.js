/**
 * Main application functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  // Add page transition effect
  document.body.classList.add('fade-in');
  
  // Animate decorative elements
  animateDecorations();
}

/**
 * Animate decorative elements with random delays
 */
function animateDecorations() {
  const decorations = document.querySelectorAll('.decoration');
  decorations.forEach(decoration => {
    const delay = Math.random() * 2;
    decoration.style.animationDelay = `${delay}s`;
  });
}

/**
 * Format a date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Create an element with classes
 * @param {string} tag - HTML tag
 * @param {Array} classes - CSS classes
 * @param {string} text - Text content
 * @returns {HTMLElement} Created element
 */
function createElement(tag, classes = [], text = '') {
  const element = document.createElement(tag);
  if (classes.length) {
    element.classList.add(...classes);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

// Make utility functions globally available
window.formatDate = formatDate;
window.createElement = createElement;