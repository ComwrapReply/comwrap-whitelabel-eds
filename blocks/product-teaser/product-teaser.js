/**
 * Product Teaser Block Implementation
 * Interactive product teaser component with multiple states and responsive behavior
 */

export default function decorate(block) {
  // Configuration object for block behavior
  const config = {
    animationDuration: 300,
    breakpoints: {
      mobile: 768,
      tablet: 1024
    },
    selectors: {
      image: '.product-teaser-image',
      button: '.product-teaser-button',
      content: '.product-teaser-content',
      arrow: '.product-teaser-arrow',
      title: '.product-teaser-title'
    }
  };

  // Add semantic CSS classes for better maintainability
  addSemanticClasses(block);
  
  // Process content and create appropriate structure
  processContent(block);
  
  // Add interactive features
  addEventListeners(block, config);
  
  // Add accessibility features
  addAccessibilityFeatures(block);
  
  // Add responsive behavior
  addResponsiveBehavior(block, config);
}

/**
 * Add semantic CSS classes to block elements
 * @param {HTMLElement} block - The block DOM element
 */
function addSemanticClasses(block) {
  // Add base classes
  block.classList.add('product-teaser');
  
  // Process image wrapper
  const picture = block.querySelector('picture');
  if (picture) {
    picture.classList.add('product-teaser-image-wrapper');
    
    // Add class to image element
    const image = picture.querySelector('img');
    if (image) {
      image.classList.add('product-teaser-image');
    }
  }
  
  // Mark content area
  const contentDiv = block.querySelector(':scope > div:last-child');
  if (contentDiv) {
    contentDiv.classList.add('product-teaser-content');
  }
}

/**
 * Process content and create appropriate structure based on variant
 * @param {HTMLElement} block - The block DOM element
 */
function processContent(block) {
  // Get block data from data attributes or content
  const title = block.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim() || '';
  const image = block.querySelector('img');
  const link = block.querySelector('a')?.href || '';
  const linkText = block.querySelector('a')?.textContent?.trim() || '';
  
  // Determine variant based on content
  const hasImage = !!image;
  const isSeeAll = title.toLowerCase().includes('see all') || title.toLowerCase().includes('all products');
  const isLocked = block.classList.contains('locked') || linkText.toLowerCase().includes('lock');
  
  // Add variant classes
  if (isSeeAll) {
    block.classList.add('product-teaser-see-all');
  } else if (hasImage) {
    block.classList.add('product-teaser-with-image');
  }
  
  if (isLocked) {
    block.classList.add('product-teaser-locked');
  }
  
  // Create appropriate content structure
  if (isSeeAll) {
    createSeeAllStructure(block, title, link);
  } else {
    createProductStructure(block, title, link, linkText, isLocked);
  }
  
  // Add responsive size classes
  addResponsiveSizeClasses(block);
}

/**
 * Create structure for "See All Products" variant
 * @param {HTMLElement} block - The block DOM element
 * @param {string} title - The title text
 * @param {string} link - The link URL
 */
function createSeeAllStructure(block, title, link) {
  const content = block.querySelector('.product-teaser-content');
  if (!content) return;
  
  // Clear existing content
  content.innerHTML = '';
  
  // Create headline
  const headline = document.createElement('h3');
  headline.className = 'product-teaser-headline';
  headline.textContent = title || 'See all Products';
  content.appendChild(headline);
  
  // Create arrow animation
  const arrowContainer = document.createElement('div');
  arrowContainer.className = 'product-teaser-arrow';
  
  const arrowLine = document.createElement('div');
  arrowLine.className = 'product-teaser-arrow-line';
  arrowContainer.appendChild(arrowLine);
  
  const arrowIcon = document.createElement('div');
  arrowIcon.className = 'product-teaser-arrow-icon';
  // Add arrow SVG or use CSS for arrow
  arrowIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  arrowContainer.appendChild(arrowIcon);
  
  content.appendChild(arrowContainer);
  
  // Make the entire block clickable
  if (link) {
    block.style.cursor = 'pointer';
    block.setAttribute('data-link', link);
  }
}

/**
 * Create structure for product area variant
 * @param {HTMLElement} block - The block DOM element
 * @param {string} title - The title text
 * @param {string} link - The link URL
 * @param {string} linkText - The link text
 * @param {boolean} isLocked - Whether the item is locked
 */
function createProductStructure(block, title, link, linkText, isLocked) {
  const content = block.querySelector('.product-teaser-content');
  if (!content) return;
  
  // Clear existing content
  content.innerHTML = '';
  
  // Create button
  const button = document.createElement('a');
  button.className = 'product-teaser-button';
  button.href = link || '#';
  button.textContent = linkText || title || 'Learn More';
  
  // Add lock icon if locked
  if (isLocked) {
    const lockIcon = document.createElement('div');
    lockIcon.className = 'product-teaser-lock-icon';
    lockIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    button.insertBefore(lockIcon, button.firstChild);
  }
  
  content.appendChild(button);
  
  // Add title below image on mobile
  if (title && !linkText) {
    const titleElement = document.createElement('h4');
    titleElement.className = 'product-teaser-title';
    titleElement.textContent = title;
    block.appendChild(titleElement);
  }
}

/**
 * Add responsive size classes based on screen size
 * @param {HTMLElement} block - The block DOM element
 */
function addResponsiveSizeClasses(block) {
  const updateSizeClasses = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Remove existing size classes
    block.classList.remove('product-teaser-size-xl', 'product-teaser-size-xxs');
    
    if (isMobile) {
      block.classList.add('product-teaser-size-xxs');
    } else {
      block.classList.add('product-teaser-size-xl');
    }
  };
  
  // Set initial size
  updateSizeClasses();
  
  // Update on resize
  window.addEventListener('resize', updateSizeClasses);
}

/**
 * Add event listeners for interactive features
 * @param {HTMLElement} block - The block DOM element
 * @param {Object} config - Configuration object
 */
function addEventListeners(block, config) {
  // Click handler for See All Products variant
  if (block.classList.contains('product-teaser-see-all')) {
    block.addEventListener('click', (e) => {
      const link = block.getAttribute('data-link');
      if (link && link !== '#') {
        e.preventDefault();
        window.location.href = link;
      }
    });
  }
  
  // Hover effects for image zoom
  const image = block.querySelector('.product-teaser-image');
  if (image) {
    block.addEventListener('mouseenter', () => {
      image.style.transform = 'scale(1.01)';
    });
    
    block.addEventListener('mouseleave', () => {
      image.style.transform = 'scale(1)';
    });
  }
  
  // Arrow animation for See All Products
  const arrow = block.querySelector('.product-teaser-arrow');
  if (arrow) {
    block.addEventListener('mouseenter', () => {
      arrow.style.width = block.classList.contains('product-teaser-size-xxs') ? '41.336px' : '90px';
    });
    
    block.addEventListener('mouseleave', () => {
      arrow.style.width = block.classList.contains('product-teaser-size-xxs') ? '20.668px' : '42px';
    });
  }
  
  // Analytics tracking
  addAnalyticsTracking(block);
}

/**
 * Add accessibility features
 * @param {HTMLElement} block - The block DOM element
 */
function addAccessibilityFeatures(block) {
  // Add ARIA labels
  const image = block.querySelector('.product-teaser-image');
  if (image && !image.getAttribute('aria-label')) {
    const altText = image.getAttribute('alt') || 'Product area image';
    image.setAttribute('aria-label', altText);
  }
  
  // Add keyboard navigation
  const button = block.querySelector('.product-teaser-button');
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
  
  // Make See All Products variant keyboard accessible
  if (block.classList.contains('product-teaser-see-all')) {
    block.setAttribute('tabindex', '0');
    block.setAttribute('role', 'button');
    block.setAttribute('aria-label', 'See all products');
    
    block.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        block.click();
      }
    });
  }
  
  // Add focus management
  block.addEventListener('focus', () => {
    block.classList.add('focused');
  });
  
  block.addEventListener('blur', () => {
    block.classList.remove('focused');
  });
}

/**
 * Add responsive behavior
 * @param {HTMLElement} block - The block DOM element
 * @param {Object} config - Configuration object
 */
function addResponsiveBehavior(block, config) {
  // Handle mobile-specific behavior
  const handleMobileBehavior = () => {
    const isMobile = window.innerWidth <= config.breakpoints.mobile;
    
    if (isMobile) {
      // Add mobile-specific classes
      block.classList.add('product-teaser-mobile');
    } else {
      block.classList.remove('product-teaser-mobile');
    }
  };
  
  // Set initial state
  handleMobileBehavior();
  
  // Update on resize
  window.addEventListener('resize', handleMobileBehavior);
}

/**
 * Add analytics tracking
 * @param {HTMLElement} block - The block DOM element
 */
function addAnalyticsTracking(block) {
  const trackInteraction = (action, element) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'product_teaser_interaction',
        block_type: 'product-teaser',
        action: action,
        element: element,
        timestamp: new Date().toISOString()
      });
    }
  };
  
  // Track clicks
  block.addEventListener('click', (e) => {
    const element = e.target.classList.contains('product-teaser-button') ? 'button' : 'block';
    trackInteraction('click', element);
  });
  
  // Track hover
  let hoverStartTime;
  block.addEventListener('mouseenter', () => {
    hoverStartTime = Date.now();
  });
  
  block.addEventListener('mouseleave', () => {
    if (hoverStartTime) {
      const hoverDuration = Date.now() - hoverStartTime;
      if (hoverDuration > 1000) { // Only track hovers longer than 1 second
        trackInteraction('hover', 'block');
      }
    }
  });
}

/**
 * Add performance optimizations
 * @param {HTMLElement} block - The block DOM element
 */
function addPerformanceOptimizations(block) {
  // Lazy load images
  const images = block.querySelectorAll('img[data-src]');
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Preload critical images
  const criticalImage = block.querySelector('.product-teaser-image');
  if (criticalImage && criticalImage.src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = criticalImage.src;
    document.head.appendChild(link);
  }
}
