/**
 * Facts and Figures Cards Block
 * Container block that displays individual Facts and Figures Card items
 * Supports responsive columns, gradient backgrounds, and scroll animations
 * Updated to handle container/item structure with individual card models
 */

// Configuration object for animation and layout settings
const CONFIG = {
  animationDelay: 100,
  animationDuration: 600,
  intersectionThreshold: 0.1,
  defaultColumns: 2,
  defaultRows: 1,
};

// CSS class selectors for easier maintenance
const SELECTORS = {
  wrapper: '.facts-figures-cards-wrapper',
  card: '.block.facts-figures-card',
  figure: '.facts-figures-card-figure',
  figureUnit: '.facts-figures-card-figure-unit',
  description: '.facts-figures-card-description',
  text: '.facts-figures-card-text',
};

// CSS classes for styling and animation
const CLASSES = {
  wrapper: 'facts-figures-cards-wrapper',
  animateIn: 'animate-in',
  cols: 'cols-',
  card: 'facts-figures-card',
};

/**
 * Creates and configures the wrapper element for the cards grid
 * @param {HTMLElement} block - The main block element
 * @param {string} columns - Number of columns from template
 * @param {string} rows - Number of rows from template
 * @returns {HTMLElement} The configured wrapper element
 */
function createWrapper(block, columns, rows) {
  const wrapper = document.createElement('div');
  wrapper.className = CLASSES.wrapper;

  // Add dynamic column class based on template property
  const colCount = parseInt(columns, 10) || CONFIG.defaultColumns;
  wrapper.classList.add(`${CLASSES.cols}${colCount}`);

  // Add row information as data attribute for potential future use
  wrapper.setAttribute('data-rows', rows || CONFIG.defaultRows);

  return wrapper;
}

/**
 * Processes individual card content and applies semantic classes
 * Updated to handle richtext content and style classes from the card model
 * @param {HTMLElement} card - Individual card element
 * @param {number} index - Card index for animation delay
 */
function processCard(card, index) {
  if (!card) return;

  // Find the text content (richtext field from the model)
  const textContent = card.querySelector('div:last-child');
  if (!textContent) return;

  // Create a wrapper for the text content
  const textWrapper = document.createElement('div');
  textWrapper.className = 'facts-figures-card-text';
  textWrapper.innerHTML = textContent.innerHTML;

  // Clear the original content and add our wrapper
  card.innerHTML = '';
  card.appendChild(textWrapper);

  // Process the text content to identify figures and descriptions
  const figureElements = textWrapper.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
  let figureElement = null;
  const descriptionElements = [];

  // Identify figure vs description based on content patterns
  figureElements.forEach((element) => {
    const text = element.textContent?.trim() || '';

    // Check if this looks like a figure (contains numbers, currency, percentages)
    const isFigure = /[\d€$£¥%]/.test(text) && text.length < 50;

    if (isFigure && !figureElement) {
      figureElement = element;
    } else {
      descriptionElements.push(element);
    }
  });

  // Process figure element
  if (figureElement) {
    figureElement.className = 'facts-figures-card-figure';

    // Extract unit from figure text (e.g., "€7.1 billion" -> "€7.1" + "billion")
    const text = figureElement.textContent?.trim() || '';
    const unitMatch = text.match(/^(.*?)(\s+(?:billion|million|thousand|%|percent|employees|customers|years|months|days))$/i);

    if (unitMatch) {
      const [, figure, unit] = unitMatch;
      figureElement.innerHTML = `${figure.trim()}<span class="facts-figures-card-figure-unit">${unit.trim()}</span>`;
    }
  }

  // Process description elements
  if (descriptionElements.length > 0) {
    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = 'facts-figures-card-description';

    descriptionElements.forEach((element) => {
      const p = document.createElement('p');
      p.innerHTML = element.innerHTML;
      descriptionWrapper.appendChild(p);
      element.remove();
    });

    textWrapper.appendChild(descriptionWrapper);
  }

  // Apply style classes from the model (classes field)
  applyStyleClasses(card);

  // Set up animation delay based on card index
  card.style.transitionDelay = `${index * CONFIG.animationDelay}ms`;

  // Add accessibility attributes
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `Fact card ${index + 1}`);
}

/**
 * Applies style classes to the card based on the classes field from the model
 * @param {HTMLElement} card - Individual card element
 */
function applyStyleClasses(card) {
  // Get the classes from the card's data attributes or dataset
  // The classes field from the model will be available as a data attribute
  const classes = card.getAttribute('data-classes') || 
                 card.dataset.classes || 
                 card.getAttribute('data-style') || 
                 card.dataset.style || 
                 '';

  if (classes) {
    // Split multiple classes if they exist
    const classList = classes.split(' ').filter(cls => cls.trim());
    
    // Apply each class to the card
    classList.forEach(className => {
      if (className.trim()) {
        card.classList.add(className.trim());
      }
    });
  }
}

/**
 * Sets up intersection observer for scroll-triggered animations
 * @param {HTMLElement} block - The main block element
 */
function setupScrollAnimation(block) {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Skip animations and show all cards immediately
    const cards = block.querySelectorAll(SELECTORS.card);
    cards.forEach((card) => {
      card.classList.add(CLASSES.animateIn);
    });
    return;
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(SELECTORS.card);

          // Animate cards with staggered delay
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add(CLASSES.animateIn);
            }, index * CONFIG.animationDelay);
          });

          // Stop observing after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: CONFIG.intersectionThreshold,
      rootMargin: '0px 0px -10% 0px',
    }
  );
  
  observer.observe(block);
}

/**
 * Handles responsive layout changes on window resize
 * @param {HTMLElement} wrapper - The wrapper element
 */
function setupResponsiveHandler(wrapper) {
  let resizeTimeout;
  
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Trigger reflow for any layout-dependent calculations
      wrapper.style.transform = 'translateZ(0)';
      requestAnimationFrame(() => {
        wrapper.style.transform = '';
      });
    }, 150);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup function (stored on wrapper for potential future use)
  wrapper.cleanupResize = () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
  };
}

/**
 * Extracts template properties from the block element
 * Aligned with columns block structure for consistency
 * @param {HTMLElement} block - The main block element
 * @returns {Object} Template properties object
 */
function getTemplateProperties(block) {
  // Get columns and rows from block attributes (set by template properties)
  // This follows the same pattern as the columns block
  const columns = block.getAttribute('data-columns')
                 || block.dataset.columns
                 || CONFIG.defaultColumns.toString();
  const rows = block.getAttribute('data-rows')
              || block.dataset.rows
              || CONFIG.defaultRows.toString();

  return { columns, rows };
}

/**
 * Main decoration function for Facts and Figures Cards block
 * Updated to handle container/item structure with individual card models
 * @param {HTMLElement} block - The main block element
 */
export default async function decorate(block) {
  if (!block) {
    return;
  }

  try {
    // Extract template properties (columns and rows from template)
    const { columns, rows } = getTemplateProperties(block);

    // Create wrapper element with proper column configuration
    const wrapper = createWrapper(block, columns, rows);

    // Get all child card elements (these are the individual facts-figures-card blocks)
    const cards = [...block.children];

    if (cards.length === 0) {
      return;
    }

    // Process each card and move to wrapper
    cards.forEach((card, index) => {
      if (card && card.nodeType === Node.ELEMENT_NODE) {
        // Add the facts-figures-card class to each child block
        card.classList.add(CLASSES.card);
        processCard(card, index);
        wrapper.appendChild(card);
      }
    });

    // Clear block content and add wrapper
    block.innerHTML = '';
    block.appendChild(wrapper);

    // Set up scroll-triggered animations
    setupScrollAnimation(block);

    // Set up responsive handling
    setupResponsiveHandler(wrapper);

    // Add block-level accessibility attributes
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', 'Facts and figures');
  } catch (error) {
    console.error('Facts and Figures Cards decoration failed:', error);
    // Fallback: ensure cards are visible even if decoration fails
    const cards = block.querySelectorAll(SELECTORS.card);
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }
}
