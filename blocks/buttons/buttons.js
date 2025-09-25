/**
 * Buttons Container block implementation
 * Handles container layout options and individual button processing
 * Uses element grouping pattern for layout and effects configuration
 */

// Configuration constants
const CONFIG = {
  animationDelay: 100,
  intersectionThreshold: 0.1,
};

// CSS class constants
const CLASSES = {
  container: 'buttons-container',
  wrapper: 'buttons-wrapper',
  buttons: 'buttons',
  button: 'button',
  primary: 'primary',
  secondary: 'secondary',
  animateIn: 'animate-in',
};

// Selector constants
const SELECTORS = {
  button: '.button',
  buttonItem: '.button-item',
};

/**
 * Extract element grouping classes from block content
 * @param {HTMLElement} block - The block DOM element
 * @param {string} groupName - The group name (e.g., 'classes')
 * @returns {Object} Object containing all grouped options
 */
function extractElementGroupingClasses(block, groupName = 'classes') {
  const options = {};
  const rows = Array.from(block.children);
  
  rows.forEach((row, index) => {
    const textContent = row.textContent?.trim();
    if (!textContent) return;

    // Look for groupName_ prefixed fields
    const fieldMatch = textContent.match(new RegExp(`${groupName}_(\\w+)[^:]*:\\s*(.+)`));
    if (!fieldMatch) return;

    const [, fieldName, value] = fieldMatch;
    
    // Process different field types
    if (value.includes(',')) {
      // Multiselect - split by comma
      options[fieldName] = value.split(',').map(v => v.trim()).filter(Boolean);
    } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      // Boolean field
      options[fieldName] = value.toLowerCase() === 'true';
    } else {
      // Single select
      options[fieldName] = value;
    }
  });

  return options;
}

/**
 * Apply element grouping classes to block element
 * @param {HTMLElement} block - The block DOM element
 * @param {Object} options - Extracted options object
 */
function applyElementGroupingClasses(block, options) {
  Object.entries(options).forEach(([fieldName, value]) => {
    if (Array.isArray(value)) {
      // Multiselect - apply each value as a class
      value.forEach(className => {
        if (className) block.classList.add(className);
      });
    } else if (typeof value === 'boolean' && value) {
      // Boolean - apply field name as class if true
      block.classList.add(fieldName);
    } else if (typeof value === 'string' && value) {
      // Select - apply value as class
      block.classList.add(value);
    }
  });
}

/**
 * Create button element from content
 * @param {HTMLElement} item - The button item element
 * @returns {HTMLElement} The processed button element
 */
function createButton(item) {
  const link = item.querySelector('a');
  if (!link) return null;

  // Extract button style from link type
  const linkType = link.getAttribute('data-link-type') || 'primary';
  const buttonClass = linkType === 'primary' ? CLASSES.primary : CLASSES.secondary;
  
  // Create button element
  const button = document.createElement('a');
  button.href = link.href;
  button.textContent = link.textContent;
  button.title = link.title || '';
  button.className = `${CLASSES.button} ${buttonClass}`;
  
  // Copy any data attributes
  Array.from(link.attributes).forEach(attr => {
    if (attr.name.startsWith('data-')) {
      button.setAttribute(attr.name, attr.value);
    }
  });

  return button;
}

/**
 * Process individual button items
 * @param {HTMLElement} item - The button item element
 * @param {number} index - The item index
 */
function processButtonItem(item, index) {
  item.classList.add('button-item');
  item.setAttribute('data-index', index);
  
  // Create button from content
  const button = createButton(item);
  if (button) {
    // Clear existing content and add button
    item.innerHTML = '';
    item.appendChild(button);
  }
}

/**
 * Add animation classes to buttons
 * @param {HTMLElement} container - The buttons container
 */
function addAnimationClasses(container) {
  const buttons = container.querySelectorAll(SELECTORS.button);
  
  buttons.forEach((button, index) => {
    // Add staggered animation delay
    const delay = index * CONFIG.animationDelay;
    button.style.animationDelay = `${delay}ms`;
    
    // Add animation class
    button.classList.add(CLASSES.animateIn);
  });
}

/**
 * Add intersection observer for animations
 * @param {HTMLElement} container - The buttons container
 */
function addIntersectionObserver(container) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: CONFIG.intersectionThreshold,
  });

  observer.observe(container);
}

/**
 * Main block decoration function
 * @param {HTMLElement} block - The block DOM element
 */
export default function decorate(block) {
  // Extract element grouping classes
  const options = extractElementGroupingClasses(block, 'classes');
  
  // Apply classes to block
  applyElementGroupingClasses(block, options);
  
  // Add semantic classes
  block.classList.add(CLASSES.container);
  
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = CLASSES.wrapper;
  
  // Process button items
  const buttonItems = Array.from(block.children).filter(child => 
    child.tagName === 'DIV' && child.children.length > 0
  );
  
  if (buttonItems.length === 0) return;
  
  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = CLASSES.buttons;
  
  // Process each button item
  buttonItems.forEach((item, index) => {
    processButtonItem(item, index);
    buttonsContainer.appendChild(item);
  });
  
  // Add buttons container to wrapper
  wrapper.appendChild(buttonsContainer);
  
  // Clear block content and add wrapper
  block.innerHTML = '';
  block.appendChild(wrapper);
  
  // Add animation classes
  addAnimationClasses(buttonsContainer);
  
  // Add intersection observer for animations
  addIntersectionObserver(buttonsContainer);
}
