/**
 * Headline block implementation
 * Creates a headline block with subtitle (p) and title (h3) elements
 * Supports two background variants: light and dark
 */

// Configuration object for block settings
const config = {
  selectors: {
    subtitle: 'p',
    title: 'h3',
    wrapper: '.headline-wrapper',
    content: '.headline',
  },
  classes: {
    wrapper: 'headline-wrapper',
    content: 'headline',
    subtitle: 'headline-subtitle',
    title: 'headline-title',
  },
  attributes: {
    role: 'banner',
    ariaLabel: 'Headline section',
  },
};

/**
 * Add semantic CSS classes to block elements
 * @param {HTMLElement} block - The block DOM element
 */
function addSemanticClasses(block) {
  // Create wrapper div if it doesn't exist
  let wrapper = block.querySelector(`.${config.classes.wrapper}`);
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = config.classes.wrapper;

    // Move all children to wrapper
    while (block.firstChild) {
      wrapper.appendChild(block.firstChild);
    }

    block.appendChild(wrapper);
  }

  // Create content div if it doesn't exist
  let content = wrapper.querySelector(`.${config.classes.content}`);
  if (!content) {
    content = document.createElement('div');
    content.className = config.classes.content;

    // Move all children to content
    while (wrapper.firstChild) {
      content.appendChild(wrapper.firstChild);
    }

    wrapper.appendChild(content);
  }

  // Add classes to subtitle (p element)
  const subtitle = content.querySelector(config.selectors.subtitle);
  if (subtitle) {
    subtitle.classList.add(config.classes.subtitle);
  }

  // Add classes to title (h3 element)
  const title = content.querySelector(config.selectors.title);
  if (title) {
    title.classList.add(config.classes.title);
  }
}

/**
 * Apply background variant class based on content
 * @param {HTMLElement} block - The block DOM element
 */
function applyBackgroundVariant(block) {
  // Look for background variant in the block content
  const rows = Array.from(block.children);

  rows.forEach((row) => {
    const textContent = row.textContent?.trim().toLowerCase();
    if (!textContent) return;

    // Check for background variant indicators
    if (textContent === 'dark' || textContent.includes('dark')) {
      block.classList.add('dark');
    } else if (textContent === 'light' || textContent.includes('light')) {
      block.classList.add('light');
    }
  });

  // Default to light if no variant is specified
  if (!block.classList.contains('dark') && !block.classList.contains('light')) {
    block.classList.add('light');
  }
}

/**
 * Add accessibility features to the block
 * @param {HTMLElement} block - The block DOM element
 */
function addAccessibilityFeatures(block) {
  // Add ARIA attributes
  block.setAttribute('role', config.attributes.role);
  block.setAttribute('aria-label', config.attributes.ariaLabel);

  // Ensure proper heading hierarchy
  const title = block.querySelector(`.${config.classes.title}`);
  if (title && !title.id) {
    const titleText = title.textContent?.trim();
    if (titleText) {
      const id = titleText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      title.id = `headline-${id}`;
    }
  }

  // Add focus management for interactive elements
  const focusableElements = block.querySelectorAll('h3, p');
  focusableElements.forEach((element) => {
    if (!element.getAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
  });
}

/**
 * Process block content and enhance structure
 * @param {HTMLElement} block - The block DOM element
 */
function processBlockContent(block) {
  // Check if block exists and has content
  if (!block || !block.children.length) {
    return;
  }

  // Add semantic classes
  addSemanticClasses(block);

  // Apply background variant
  applyBackgroundVariant(block);

  // Add accessibility features
  addAccessibilityFeatures(block);
}

/**
 * Entry point to block's JavaScript
 * Must be exported as default and accept a block's DOM element
 * @param {HTMLElement} block - The block's DOM element/tree
 */
export default function decorate(block) {
  try {
    // Defensive coding: check if block exists
    if (!block) {
      return;
    }

    // Process the block content
    processBlockContent(block);
  } catch (error) {
    // Silent error handling for production
  }
}
