/**
 * Counter block implementation
 * Animated numerical display that counts up from 1 to target value when visible
 */

// Configuration object for counter behavior
const config = {
  animationDuration: 3000, // Total animation duration in ms
  frameRate: 60, // Animation frame rate
  intersectionThreshold: 0.1, // Intersection observer threshold
  hasAnimated: new Set(), // Track which counters have already animated
};

/**
 * Create digit elements for counter display
 * @param {number} digit - The digit to create (0-9)
 * @returns {HTMLElement} - The digit element
 */
function createDigitElement(digit) {
  const digitElement = document.createElement('div');
  digitElement.className = 'counter-digit';
  digitElement.setAttribute('aria-label', `Digit ${digit}`);

  // Create number stack for smooth animation (0-9 for each digit position)
  for (let i = 0; i <= 9; i += 1) {
    const numberElement = document.createElement('div');
    numberElement.className = 'counter-number';
    numberElement.textContent = i.toString();
    numberElement.setAttribute('data-value', i.toString());
    digitElement.appendChild(numberElement);
  }

  return digitElement;
}

/**
 * Animate a single digit from 0 to target value
 * @param {HTMLElement} digitElement - The digit element to animate
 * @param {number} targetValue - The target value to count to
 * @param {number} delay - Animation delay in ms
 * @returns {Promise} - Promise that resolves when animation completes
 */
async function animateDigit(digitElement, targetValue, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numbers = digitElement.querySelectorAll('.counter-number');
      const frameDelay = 100; // 100ms between each number change
      let currentValue = 0;

      const animate = () => {
        if (currentValue <= targetValue) {
          // Hide all numbers first
          numbers.forEach((num) => {
            num.style.transform = 'translateY(100%)';
            num.style.opacity = '0';
          });

          // Show current value
          const currentNumber = numbers[currentValue];
          if (currentNumber) {
            currentNumber.style.transform = 'translateY(0)';
            currentNumber.style.opacity = '1';
            currentNumber.classList.add('animating');
          }

          currentValue += 1;

          if (currentValue <= targetValue) {
            setTimeout(animate, frameDelay);
          } else {
            resolve();
          }
        } else {
          resolve();
        }
      };

      animate();
    }, delay);
  });
}

/**
 * Parse number into individual digits
 * @param {string|number} number - The number to parse
 * @returns {number[]} - Array of individual digits
 */
function parseDigits(number) {
  const numStr = number.toString();
  return numStr.split('').map((digit) => parseInt(digit, 10));
}

/**
 * Create counter display structure
 * @param {HTMLElement} block - The block element
 * @param {string} targetNumber - The target number to count to
 * @param {string} description - The description text
 * @param {string} theme - The theme (dark/light)
 */
function createCounterStructure(block, targetNumber, description, theme) {
  // Clear existing content
  block.innerHTML = '';

  // Create container structure
  const container = document.createElement('div');
  container.className = 'counter-container';

  const wrapper = document.createElement('div');
  wrapper.className = 'counter-wrapper';

  const counter = document.createElement('div');
  counter.className = `counter ${theme}`;
  counter.setAttribute('role', 'img');
  counter.setAttribute('aria-label', `Counter showing ${targetNumber}`);

  // Create numbers container
  const numbersContainer = document.createElement('div');
  numbersContainer.className = 'counter-numbers';
  numbersContainer.setAttribute('aria-live', 'polite');

  // Create description
  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'counter-description';
  descriptionElement.innerHTML = description;

  // Parse target number into digits
  const digits = parseDigits(targetNumber);

  // Create digit elements
  digits.forEach((digit, index) => {
    const digitElement = createDigitElement(digit);
    digitElement.setAttribute('data-digit-index', index.toString());
    numbersContainer.appendChild(digitElement);
  });

  // Assemble structure
  counter.appendChild(numbersContainer);
  counter.appendChild(descriptionElement);
  wrapper.appendChild(counter);
  container.appendChild(wrapper);
  block.appendChild(container);

  // Store target number for animation
  block.setAttribute('data-target-number', targetNumber);
  block.setAttribute('data-animated', 'false');
}

/**
 * Animate counter from 1 to target value
 * @param {HTMLElement} block - The block element
 */
async function animateCounter(block) {
  const targetNumber = block.getAttribute('data-target-number');
  const digits = parseDigits(targetNumber);
  const numbersContainer = block.querySelector('.counter-numbers');
  const digitElements = numbersContainer.querySelectorAll('.counter-digit');

  // Animate each digit with slight delay for visual effect
  const animationPromises = digitElements.map((digitElement, index) => {
    const targetValue = digits[index];
    const delay = index * 200; // Stagger animation by 200ms per digit
    return animateDigit(digitElement, targetValue, delay);
  });

  await Promise.all(animationPromises);

  // Mark as animated
  block.setAttribute('data-animated', 'true');
  config.hasAnimated.add(block);
}

/**
 * Set up intersection observer for animation trigger
 * @param {HTMLElement} block - The block element
 */
function setupIntersectionObserver(block) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !config.hasAnimated.has(block)) {
        animateCounter(block);
        observer.unobserve(block);
      }
    });
  }, {
    threshold: config.intersectionThreshold,
    rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% from bottom of viewport
  });

  observer.observe(block);
}

/**
 * Add accessibility features
 * @param {HTMLElement} block - The block element
 */
function addAccessibilityFeatures(block) {
  const counter = block.querySelector('.counter');
  const numbersContainer = block.querySelector('.counter-numbers');

  if (counter && !counter.getAttribute('aria-label')) {
    const targetNumber = block.getAttribute('data-target-number') || '0';
    counter.setAttribute('aria-label', `Animated counter displaying ${targetNumber}`);
  }

  if (numbersContainer) {
    numbersContainer.setAttribute('aria-live', 'polite');
    numbersContainer.setAttribute('aria-atomic', 'true');
  }

  // Add keyboard navigation support
  counter.setAttribute('tabindex', '0');

  // Handle keyboard events for screen readers
  counter.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (block.getAttribute('data-animated') === 'false') {
        animateCounter(block);
      }
    }
  });
}

/**
 * Process block content and set up counter
 * @param {HTMLElement} block - The block DOM element
 */
function processBlockContent(block) {
  // Extract content from block structure
  const [numberDiv, descriptionDiv] = block.children;

  let targetNumber = '123';
  let description = 'units of Fresubin clinical nutrition are consumed every minute worldwide.';
  let theme = 'dark';

  // Extract number from first div
  if (numberDiv) {
    const numberText = numberDiv.textContent?.trim();
    if (numberText && !Number.isNaN(parseInt(numberText, 10))) {
      targetNumber = numberText;
    }
  }

  // Extract description from second div
  if (descriptionDiv) {
    const descriptionText = descriptionDiv.textContent?.trim();
    if (descriptionText) {
      description = descriptionText;
    }
  }

  // Check for theme classes
  if (block.classList.contains('light')) {
    theme = 'light';
  }

  // Create counter structure
  createCounterStructure(block, targetNumber, description, theme);

  // Add accessibility features
  addAccessibilityFeatures(block);

  // Set up intersection observer
  setupIntersectionObserver(block);
}

/**
 * Main counter block decoration function
 * @param {HTMLElement} block - The block DOM element
 */
export default function decorate(block) {
  // Check if block exists
  if (!block) return;

  // Add semantic classes
  block.classList.add('counter-block');

  // Process block content
  processBlockContent(block);
}
