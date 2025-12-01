/**
 * Info Counter block implementation
 * Creates an animated counter with number and inline text
 * Animation triggers when block enters viewport and counts from 0 to target
 */

import { isEditorMode as checkEditorMode, observeEditorMode } from '../../scripts/utils.js';

const ANIMATION_CONFIG = {
  DURATION: 10000, // Animation duration in milliseconds
  EASING: 'ease-out', // Animation easing function
};

/**
 * Update all digit elements to display a specific number
 * @param {HTMLElement} counterElement - The counter container element
 * @param {number} currentNumber - The current number to display
 */
function updateCounterDisplay(counterElement, currentNumber) {
  const numberString = currentNumber.toString().padStart(
    counterElement.querySelectorAll('.info-counter-digit').length,
    '0',
  );
  const digits = counterElement.querySelectorAll('.info-counter-digit');

  digits.forEach((digitContainer, index) => {
    const digitElement = digitContainer.querySelector('.info-counter-digit-value');
    if (digitElement) {
      digitElement.textContent = numberString[index] || '0';
    }
  });
}

/**
 * Animate counter from 0 to target number
 * @param {HTMLElement} counterElement - The counter container element
 * @param {number} targetNumber - The target number to count to
 * @returns {Promise<void>} Promise that resolves when animation completes
 */
function animateCounter(counterElement, targetNumber) {
  const digits = counterElement.querySelectorAll('.info-counter-digit');

  if (digits.length === 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const startTime = performance.now();
    const duration = ANIMATION_CONFIG.DURATION;
    const startNumber = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out cubic)
      const easedProgress = 1 - (1 - progress) ** 3;

      // Calculate current number value
      const currentNumber = Math.floor(
        startNumber + (targetNumber - startNumber) * easedProgress,
      );

      // Update all digits to show current number
      updateCounterDisplay(counterElement, currentNumber);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final value is set exactly
        updateCounterDisplay(counterElement, targetNumber);
        resolve();
      }
    };

    requestAnimationFrame(animate);
  });
}

/**
 * Initialize counter animation when block enters viewport
 * Only animates when NOT in editor mode
 * @param {HTMLElement} block - The info-counter block element
 */
function initializeCounterAnimation(block) {
  const counterElement = block.querySelector('.info-counter-number');
  if (!counterElement) return;

  const targetNumber = parseInt(block.dataset.targetNumber, 10);

  if (Number.isNaN(targetNumber) || targetNumber < 0) {
    return;
  }

  // Mark as animated to prevent re-animation
  if (block.dataset.animated === 'true') {
    return;
  }

  // Check if in editor mode
  const isInEditorMode = checkEditorMode();

  // If in editor mode, show target number immediately without animation
  if (isInEditorMode) {
    updateCounterDisplay(counterElement, targetNumber);
    block.dataset.animated = 'true';
    return;
  }

  // Use Intersection Observer to trigger animation when block enters viewport
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3, // Trigger when 30% of block is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && block.dataset.animated !== 'true') {
        block.dataset.animated = 'true';
        animateCounter(counterElement, targetNumber);
        observer.unobserve(block);
      }
    });
  }, observerOptions);

  observer.observe(block);
}

/**
 * Create digit containers for the counter
 * @param {string} numberString - The number as a string
 * @returns {DocumentFragment} Fragment containing digit containers
 */
function createDigitContainers(numberString) {
  const fragment = document.createDocumentFragment();

  numberString.split('').forEach(() => {
    const digitContainer = document.createElement('div');
    digitContainer.className = 'info-counter-digit';

    const digitValue = document.createElement('span');
    digitValue.className = 'info-counter-digit-value';
    digitValue.textContent = '0';
    digitValue.setAttribute('aria-hidden', 'true');

    digitContainer.appendChild(digitValue);
    fragment.appendChild(digitContainer);
  });

  return fragment;
}

/**
 * Remove Universal Editor attributes from HTML element
 * @param {HTMLElement} element - Element to clean
 */
function removeAueAttributes(element) {
  const attrs = element.attributes;
  const attrsToRemove = [];

  for (let i = 0; i < attrs.length; i += 1) {
    const attrName = attrs[i].name;
    if (attrName.startsWith('data-aue-') || attrName.startsWith('data-richtext-')) {
      attrsToRemove.push(attrName);
    }
  }

  attrsToRemove.forEach((attr) => element.removeAttribute(attr));

  // Recursively clean child elements
  Array.from(element.children).forEach((child) => removeAueAttributes(child));
}

/**
 * Extract number from text
 * @param {string} text - Text to extract number from
 * @returns {number|null} Extracted number or null
 */
function extractNumber(text) {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * Extract content from block rows
 * @param {Array<HTMLElement>} rows - Block rows
 * @returns {Object} Extracted content with targetNumber, descriptionText, descriptionHTML
 */
function extractContent(rows) {
  let targetNumber = null;
  let descriptionText = '';
  let descriptionHTML = '';

  // Process first row cells (Universal Editor structure)
  const firstRow = rows[0];
  const cells = [...firstRow.children];

  cells.forEach((cell) => {
    const aueProp = cell.getAttribute('data-aue-prop');
    const aueType = cell.getAttribute('data-aue-type');
    const cellText = cell.textContent.trim();
    const cellHTML = cell.innerHTML.trim();

    if (!cellText && !cellHTML) return;

    // Extract number
    if (aueProp === 'number' || cellText.match(/^\d+$/)) {
      if (targetNumber === null && cellText) {
        targetNumber = extractNumber(cellText);
      }
      return;
    }

    // Extract richtext
    if (aueProp === 'text' || aueType === 'richtext') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cellHTML;

      Array.from(tempDiv.children).forEach((child) => removeAueAttributes(child));

      const cleanedHTML = tempDiv.innerHTML.trim();
      const cleanedText = tempDiv.textContent.trim();

      if (cleanedText || cleanedHTML) {
        descriptionText = cleanedText || cellText;
        descriptionHTML = cleanedHTML || cellHTML;
      }
      return;
    }

    // Fallback: extract plain text
    if (!aueProp && cellText && !descriptionText) {
      descriptionText = cellText;
      descriptionHTML = cellHTML || cellText;
    }
  });

  // Fallback: check other rows for text
  if (!descriptionText && rows.length > 1) {
    for (let i = 1; i < rows.length; i += 1) {
      const rowText = rows[i].textContent.trim();
      const rowHTML = rows[i].innerHTML.trim();

      if (rowText && !rowText.match(/^\d+$/)) {
        descriptionText = rowText;
        descriptionHTML = rowHTML || rowText;
        break;
      }
    }
  }

  // Final fallback: extract from all block content
  if (targetNumber === null || !descriptionText) {
    const allText = rows.map((r) => r.textContent).join(' ').trim();
    const numberMatch = allText.match(/\d+/);

    if (numberMatch && targetNumber === null) {
      targetNumber = parseInt(numberMatch[0], 10);
    }

    if (!descriptionText && numberMatch) {
      descriptionText = allText.replace(numberMatch[0], '').trim();
    }
  }

  return {
    targetNumber: targetNumber || 0,
    descriptionText,
    descriptionHTML,
  };
}

/**
 * Clean HTML string by removing Universal Editor attributes
 * @param {string} html - HTML string to clean
 * @returns {string} Cleaned HTML
 */
function cleanHTML(html) {
  return html.replace(/\s*data-(aue|richtext)-[^=]*="[^"]*"/g, '');
}

/**
 * Create text paragraph element
 * @param {string} descriptionText - Plain text content
 * @param {string} descriptionHTML - HTML content
 * @returns {HTMLElement} Paragraph element
 */
function createTextParagraph(descriptionText, descriptionHTML) {
  const textParagraph = document.createElement('p');
  let cleanedHTML = descriptionHTML || descriptionText;

  // Remove Universal Editor attributes
  if (cleanedHTML.includes('data-aue-') || cleanedHTML.includes('data-richtext-')) {
    cleanedHTML = cleanHTML(cleanedHTML);
  }

  // Check if HTML contains tags
  const hasHTMLTags = cleanedHTML !== descriptionText && cleanedHTML.match(/<[^>]+>/);

  if (hasHTMLTags) {
    // If HTML has p wrapper, extract inner content
    if (cleanedHTML.match(/^<p[^>]*>.*<\/p>$/i)) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cleanedHTML;
      textParagraph.innerHTML = tempDiv.firstElementChild?.innerHTML || cleanedHTML;
    } else {
      // Use HTML directly
      textParagraph.innerHTML = cleanedHTML;
    }
  } else {
    // Use plain text
    textParagraph.textContent = descriptionText;
  }

  return textParagraph;
}

/**
 * Decorate the info-counter block
 * @param {HTMLElement} block - The block element to decorate
 */
export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length === 0) return;

  // Extract content from block
  const { targetNumber, descriptionText, descriptionHTML } = extractContent(rows);

  // Check for mode variant (dark or light)
  const isDarkMode = block.classList.contains('dark') || block.classList.contains('on-dark');
  const mode = isDarkMode ? 'dark' : 'light';

  // Clear block content
  block.innerHTML = '';
  block.classList.add(`info-counter-mode-${mode}`);

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'info-counter-wrapper';

  // Create number container
  const numberContainer = document.createElement('div');
  numberContainer.className = 'info-counter-number';
  numberContainer.setAttribute('aria-label', `Counter: ${targetNumber}`);

  // Create digit containers
  const numberString = targetNumber.toString();
  const digitContainers = createDigitContainers(numberString);
  numberContainer.appendChild(digitContainers);

  // Check if in editor mode
  const isInEditorMode = checkEditorMode();

  // Initialize display to 0 (or target if in editor mode)
  updateCounterDisplay(numberContainer, isInEditorMode ? targetNumber : 0);

  // Store target number for animation
  block.dataset.targetNumber = targetNumber.toString();

  // Create text container
  const textContainer = document.createElement('div');
  textContainer.className = 'info-counter-text';

  // Add text if available
  if (descriptionText && descriptionText.trim()) {
    const textParagraph = createTextParagraph(descriptionText, descriptionHTML);
    textContainer.appendChild(textParagraph);
  }

  // Assemble structure
  wrapper.appendChild(numberContainer);
  wrapper.appendChild(textContainer);
  block.appendChild(wrapper);

  // Initialize animation (will check editor mode internally)
  initializeCounterAnimation(block);

  // Observe editor mode changes and update display accordingly
  observeEditorMode((isEditorActive) => {
    const counterEl = block.querySelector('.info-counter-number');
    if (!counterEl) return;

    const target = parseInt(block.dataset.targetNumber, 10);
    if (Number.isNaN(target)) return;

    if (isEditorActive) {
      // In editor mode: show target number immediately
      updateCounterDisplay(counterEl, target);
      block.dataset.animated = 'true';
    } else {
      // Not in editor mode: reset to 0 and re-enable animation
      updateCounterDisplay(counterEl, 0);
      block.dataset.animated = 'false';
      initializeCounterAnimation(block);
    }
  }, false); // Don't call initially, we already handled it above
}
