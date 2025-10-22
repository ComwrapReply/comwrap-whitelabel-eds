/**
 * Teaser Info block implementation
 * Creates a teaser block with image, title, description, and optional link
 */

export default function decorate(block) {
  // Add semantic CSS classes for better maintainability
  addSemanticClasses(block);
  
  // Process special content patterns
  processSpecialContent(block);
  
  // Add interactive features
  addEventListeners(block);
  
  // Add accessibility features
  addAccessibilityFeatures(block);
}

/**
 * Add semantic CSS classes to block elements
 * @param {HTMLElement} block - The block DOM element
 */
function addSemanticClasses(block) {
  // Add class to image wrapper
  const picture = block.querySelector('picture');
  if (picture) {
    picture.classList.add('teaser-info-image-wrapper');
  }

  // Add class to image element
  const image = block.querySelector('.teaser-info-image-wrapper img');
  if (image) {
    image.classList.add('teaser-info-image');
  }

  // Mark content area
  const contentDiv = block.querySelector(':scope > div:last-child');
  if (contentDiv) {
    contentDiv.classList.add('teaser-info-content');
  }

  // Mark title element
  const title = block.querySelector('h1,h2,h3,h4,h5,h6');
  if (title) {
    title.classList.add('teaser-info-title');
  }

  // Mark description element
  const description = block.querySelector('p');
  if (description) {
    description.classList.add('teaser-info-description');
  }

  // Mark button element
  const button = block.querySelector('.button');
  if (button) {
    button.classList.add('teaser-info-button');
  }
}

/**
 * Process special content patterns
 * @param {HTMLElement} block - The block DOM element
 */
function processSpecialContent(block) {
  // Process paragraphs for special styling
  block.querySelectorAll('p').forEach((paragraph) => {
    const innerHTML = paragraph.innerHTML?.trim();
    
    // Add special class for terms and conditions
    if (innerHTML?.startsWith('Terms and conditions:')) {
      paragraph.classList.add('terms-and-conditions');
    }
    
    // Add special class for disclaimers
    if (innerHTML?.startsWith('*')) {
      paragraph.classList.add('disclaimer');
    }
  });
}

/**
 * Add event listeners for interactive features
 * @param {HTMLElement} block - The block DOM element
 */
function addEventListeners(block) {
  const button = block.querySelector('.teaser-info-button');
  const image = block.querySelector('.teaser-info-image');

  if (button && image) {
    // Image zoom on button hover
    button.addEventListener('mouseover', () => {
      image.classList.add('zoom');
    });

    button.addEventListener('mouseout', () => {
      image.classList.remove('zoom');
    });

    // Analytics tracking
    button.addEventListener('click', (e) => {
      trackButtonClick(block, e);
    });
  }
}

/**
 * Add accessibility features
 * @param {HTMLElement} block - The block DOM element
 */
function addAccessibilityFeatures(block) {
  // Add ARIA labels
  const image = block.querySelector('.teaser-info-image');
  if (image && !image.getAttribute('aria-label')) {
    image.setAttribute('aria-label', 'Teaser Info image');
  }

  // Add keyboard navigation
  const button = block.querySelector('.teaser-info-button');
  if (button) {
    button.setAttribute('tabindex', '0');
    
    // Handle keyboard events
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  }
}

/**
 * Track button clicks for analytics
 * @param {HTMLElement} block - The block DOM element
 * @param {Event} event - Click event
 */
function trackButtonClick(block, event) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'block_interaction',
      block_type: 'teaser-info',
      action: 'button_click',
      element: event.target.textContent.trim()
    });
  }
}
