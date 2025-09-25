/**
 * Counter Block JavaScript
 * Implements animated counting functionality with intersection observer
 */

class CounterBlock {
  constructor(element) {
    this.element = element;
    this.targetValue = parseInt(element.dataset.targetValue) || 325;
    this.animationDuration = parseInt(element.dataset.animationDuration) || 2000;
    this.startDelay = parseInt(element.dataset.startDelay) || 0;
    this.hasAnimated = false;
    this.observer = null;
    
    this.init();
  }

  init() {
    // Set up intersection observer for viewport detection
    this.setupIntersectionObserver();
    
    // Initialize counter display
    this.initializeCounter();
    
    // Add accessibility attributes
    this.setupAccessibility();
  }

  setupIntersectionObserver() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers - animate immediately
      setTimeout(() => this.animateCounter(), this.startDelay);
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Trigger when 10% of element is visible
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          setTimeout(() => this.animateCounter(), this.startDelay);
          
          // Stop observing after animation starts
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.element);
  }

  initializeCounter() {
    const numbersContainer = this.element.querySelector('.counter-numbers');
    if (!numbersContainer) return;

    // Clear existing content
    numbersContainer.innerHTML = '';

    // Convert target value to string and create digit containers
    const targetString = this.targetValue.toString();
    const digits = targetString.split('');

    digits.forEach((digit, index) => {
      const digitContainer = this.createDigitContainer(digit, index);
      numbersContainer.appendChild(digitContainer);
    });
  }

  createDigitContainer(digit, index) {
    const digitContainer = document.createElement('div');
    digitContainer.className = 'counter-digit';
    digitContainer.setAttribute('data-digit-index', index);

    // Create number elements for animation
    const numberElement = document.createElement('div');
    numberElement.className = 'counter-digit-number';
    numberElement.setAttribute('aria-hidden', 'true');
    numberElement.textContent = '0';

    digitContainer.appendChild(numberElement);
    return digitContainer;
  }

  async animateCounter() {
    // Add animation class to container
    this.element.classList.add('animate-in');

    // Wait for container animation to complete
    await this.waitForAnimation(this.element, 'animate-in');

    // Animate each digit
    await this.animateDigits();
  }

  async animateDigits() {
    const digits = this.element.querySelectorAll('.counter-digit');
    const targetString = this.targetValue.toString();
    const targetDigits = targetString.split('');

    // Calculate delay between digit animations
    const digitDelay = this.animationDuration / targetDigits.length;

    for (let i = 0; i < digits.length; i++) {
      const digitElement = digits[i];
      const targetDigit = parseInt(targetDigits[i]);
      
      await this.animateSingleDigit(digitElement, targetDigit, digitDelay);
    }
  }

  async animateSingleDigit(digitElement, targetDigit, delay) {
    const numberElement = digitElement.querySelector('.counter-digit-number');
    if (!numberElement) return;

    // Create a range of numbers to animate through
    const numbers = Array.from({ length: targetDigit + 1 }, (_, i) => i);
    
    // Animate through each number
    for (let i = 0; i <= targetDigit; i++) {
      numberElement.textContent = i.toString();
      
      // Add counting animation class
      numberElement.classList.add('counting');
      
      // Wait for animation to complete
      await this.waitForAnimation(numberElement, 'counting');
      
      // Remove animation class
      numberElement.classList.remove('counting');
      
      // Small delay between numbers for smooth counting effect
      if (i < targetDigit) {
        await this.delay(delay / (targetDigit + 1));
      }
    }
  }

  waitForAnimation(element, className) {
    return new Promise((resolve) => {
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };

      element.addEventListener('animationend', handleAnimationEnd);
      
      // Fallback timeout in case animation doesn't fire
      setTimeout(resolve, 300);
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setupAccessibility() {
    // Add ARIA attributes for screen readers
    const numbersContainer = this.element.querySelector('.counter-numbers');
    if (numbersContainer) {
      numbersContainer.setAttribute('role', 'img');
      numbersContainer.setAttribute('aria-label', `Counter showing ${this.targetValue}`);
      numbersContainer.setAttribute('aria-live', 'polite');
    }

    // Add focus management
    this.element.setAttribute('tabindex', '0');
    this.element.setAttribute('role', 'region');
    this.element.setAttribute('aria-label', 'Animated counter display');
  }

  // Public method to reset animation (useful for testing)
  reset() {
    this.hasAnimated = false;
    this.initializeCounter();
    
    if (this.observer) {
      this.observer.observe(this.element);
    }
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Decorate function for Universal Editor
 * @param {HTMLElement} block - The block DOM element
 */
export default function decorate(block) {
  // Extract data from block content
  const targetValue = block.querySelector('[data-target-value]')?.textContent?.trim() || '325';
  const description = block.querySelector('[data-description]')?.textContent?.trim() || '';
  const mode = block.querySelector('[data-mode]')?.textContent?.trim() || 'light';
  const animationDuration = block.querySelector('[data-animation-duration]')?.textContent?.trim() || '2000';
  const startDelay = block.querySelector('[data-start-delay]')?.textContent?.trim() || '0';

  // Set up the block structure
  block.classList.add('counter');
  block.setAttribute('data-mode', mode);
  block.setAttribute('data-target-value', targetValue);
  block.setAttribute('data-animation-duration', animationDuration);
  block.setAttribute('data-start-delay', startDelay);

  // Create wrapper structure
  const wrapper = document.createElement('div');
  wrapper.className = 'counter-wrapper';

  // Create numbers container
  const numbersContainer = document.createElement('div');
  numbersContainer.className = 'counter-numbers';
  numbersContainer.setAttribute('role', 'img');
  numbersContainer.setAttribute('aria-label', `Counter showing ${targetValue}`);
  numbersContainer.setAttribute('aria-live', 'polite');

  // Create description container
  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'counter-description';
  descriptionContainer.innerHTML = description;

  // Assemble the structure
  wrapper.appendChild(numbersContainer);
  wrapper.appendChild(descriptionContainer);
  block.appendChild(wrapper);

  // Initialize the counter
  new CounterBlock(block);
}

// Initialize all counter blocks on page load
document.addEventListener('DOMContentLoaded', () => {
  const counterBlocks = document.querySelectorAll('.counter');
  
  counterBlocks.forEach((block) => {
    new CounterBlock(block);
  });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CounterBlock;
}

// Global access for testing
window.CounterBlock = CounterBlock;