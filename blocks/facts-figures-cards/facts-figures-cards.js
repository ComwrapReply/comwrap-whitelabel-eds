/**
 * Facts and Figures Cards block implementation
 * Handles container and individual card processing with title, text, and styling
 */

// Configuration constants
const CONFIG = {
  defaultColumns: 2,
  defaultRows: 1,
  animationDelay: 150,
  intersectionThreshold: 0.1,
};

// CSS class constants
const CLASSES = {
  container: 'facts-figures-cards-wrapper',
  card: 'facts-figures-card',
  title: 'facts-figures-card-title',
  text: 'facts-figures-card-text',
  figure: 'facts-figures-card-figure',
  figureUnit: 'facts-figures-card-figure-unit',
  description: 'facts-figures-card-description',
  animateIn: 'animate-in',
};

// Selector constants
const SELECTORS = {
  card: '.facts-figures-card',
  title: '.facts-figures-card-title',
  text: '.facts-figures-card-text',
};

// Element grouping field patterns
const ELEMENT_GROUPING_PATTERNS = {
  container: {
    style: /classes_style[^:]*:\s*(\w+)/,
    layout: /classes_layout[^:]*:\s*(\w+)/,
    animation: /classes_animation[^:]*:\s*(\w+)/,
  },
  card: {
    style: /classes_style[^:]*:\s*(\w+)/,
    size: /classes_size[^:]*:\s*(\w+)/,
    emphasis: /classes_emphasis[^:]*:\s*(\w+)/,
  },
};

/**
 * Creates the wrapper element for the facts and figures cards
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @returns {HTMLElement} Wrapper element
 */
function createWrapper(columns, rows) {
  const wrapper = document.createElement('div');
  wrapper.className = CLASSES.container;
  // Set CSS custom properties for grid layout
  wrapper.style.setProperty('--columns', columns || CONFIG.defaultColumns);
  wrapper.style.setProperty('--rows', rows || CONFIG.defaultRows);

  // Add row information as data attribute for potential future use
  wrapper.setAttribute('data-rows', rows || CONFIG.defaultRows);

  return wrapper;
}

/**
 * Extracts classes from element grouping fields using regex patterns
 * @param {HTMLElement} element - The element to extract classes from
 * @param {Object} patterns - The patterns to match against
 * @returns {string[]} Array of class names to apply
 */
function extractElementGroupingClasses(element, patterns) {
  const classesToApply = [];
  const textContent = element.textContent || '';

  Object.entries(patterns).forEach(([, pattern]) => {
    const match = textContent.match(pattern);
    if (match && match[1] && match[1] !== 'default' && match[1].trim()) {
      classesToApply.push(match[1].trim());
    }
  });

  return classesToApply;
}

/**
 * Applies style classes to all cards based on the container's element grouping fields
 * @param {HTMLElement} container - The container element
 * @param {HTMLElement[]} cards - Array of card elements
 */
function applyContainerStyleClasses(container, cards) {
  const classesToApply = extractElementGroupingClasses(
    container,
    ELEMENT_GROUPING_PATTERNS.container,
  );

  // Apply all classes to all cards
  if (classesToApply.length > 0) {
    cards.forEach((card) => {
      classesToApply.forEach((className) => {
        card.classList.add(className);
      });
    });
  }
}

/**
 * Applies style classes to individual card based on element grouping fields
 * @param {HTMLElement} card - Individual card element
 */
function applyCardStyleClasses(card) {
  const classesToApply = extractElementGroupingClasses(card, ELEMENT_GROUPING_PATTERNS.card);

  // Apply all classes to the card
  if (classesToApply.length > 0) {
    classesToApply.forEach((className) => {
      card.classList.add(className);
    });
  }
}

/**
 * Creates a title element from text content
 * @param {string} text - The title text
 * @returns {HTMLElement} The title element
 */
function createTitleElement(text) {
  const titleElement = document.createElement('h3');
  titleElement.className = CLASSES.title;
  titleElement.textContent = text;
  return titleElement;
}

/**
 * Processes figure content and extracts units
 * @param {HTMLElement} element - The figure element
 */
function processFigureElement(element) {
  element.className = CLASSES.figure;

  const figureText = element.textContent || '';
  const unitMatch = figureText.match(/([€$£¥%]|[A-Za-z]+)$/);

  if (unitMatch) {
    const unit = unitMatch[1];
    const value = figureText.replace(unit, '').trim();

    element.innerHTML = value;

    const unitElement = document.createElement('span');
    unitElement.className = CLASSES.figureUnit;
    unitElement.textContent = unit;

    element.appendChild(unitElement);
  }
}

/**
 * Processes description elements and wraps them
 * @param {HTMLElement[]} descriptionElements - Array of description elements
 * @returns {HTMLElement} The description wrapper
 */
function processDescriptionElements(descriptionElements) {
  const descriptionWrapper = document.createElement('div');
  descriptionWrapper.className = CLASSES.description;

  descriptionElements.forEach((element) => {
    const p = document.createElement('p');
    p.innerHTML = element.innerHTML;
    descriptionWrapper.appendChild(p);
    element.remove();
  });

  return descriptionWrapper;
}

/**
 * Processes individual card content and applies semantic classes
 * @param {HTMLElement} card - Individual card element
 * @param {number} index - Card index for animation delay
 */
function processCard(card, index) {
  if (!card) return;

  // Apply element grouping style classes to the card
  applyCardStyleClasses(card);

  // Get all child divs (title and text content)
  const childDivs = Array.from(card.children).filter((child) => child.tagName === 'DIV');

  let titleElement = null;
  let textContent = null;

  // Process each child div
  childDivs.forEach((div, divIndex) => {
    const text = div.textContent?.trim() || '';

    // Skip empty divs or divs that contain only class information
    if (!text || text.match(/^(?:facts-figures-card|facts-and-figures-card),\s*\w+$/)) {
      return;
    }

    // First non-empty div is likely the title
    if (!titleElement && divIndex === 0) {
      titleElement = createTitleElement(text);
    } else {
      // Subsequent divs are text content
      textContent = div;
    }
  });

  // Create a wrapper for the text content
  const textWrapper = document.createElement('div');
  textWrapper.className = CLASSES.text;

  if (textContent) {
    textWrapper.innerHTML = textContent.innerHTML;
  } else {
    // If no text content found, use the card's innerHTML
    textWrapper.innerHTML = card.innerHTML;
  }

  // Clear the original content
  card.innerHTML = '';

  // Add title if it exists
  if (titleElement) {
    card.appendChild(titleElement);
  }

  // Add text wrapper
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
    processFigureElement(figureElement);
  }

  // Process description elements
  if (descriptionElements.length > 0) {
    const descriptionWrapper = processDescriptionElements(descriptionElements);
    textWrapper.appendChild(descriptionWrapper);
  }

  // Set up animation delay based on card index
  card.style.transitionDelay = `${index * CONFIG.animationDelay}ms`;

  // Add accessibility attributes
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `Fact card ${index + 1}`);
}

/**
 * Sets up intersection observer for scroll-triggered animations
 * @param {HTMLElement} block - The main block element
 */
function setupScrollAnimation(block) {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // If reduced motion is preferred, show all cards immediately
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
    },
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
}

/**
 * Creates a placeholder card when no cards are found
 * @returns {HTMLElement} The placeholder card element
 */
function createPlaceholderCard() {
  const placeholder = document.createElement('div');
  placeholder.className = CLASSES.card;
  placeholder.innerHTML = '<p>No cards found. Please add Facts Figures Card items.</p>';
  return placeholder;
}

/**
 * Processes all cards and adds them to the wrapper
 * @param {HTMLElement[]} cards - Array of card elements
 * @param {HTMLElement} wrapper - The wrapper element
 */
function processCards(cards, wrapper) {
  if (cards.length === 0) {
    const placeholder = createPlaceholderCard();
    wrapper.appendChild(placeholder);
    return;
  }

  cards.forEach((card, index) => {
    // Add card class
    card.classList.add(CLASSES.card);

    // Process card content
    processCard(card, index);

    // Move card to wrapper
    wrapper.appendChild(card);
  });
}

/**
 * Main decoration function
 * @param {HTMLElement} block - The main block element
 */
export default function decorate(block) {
  try {
    // Get template properties (columns, rows) - these come from the block's data attributes
    const columns = block.getAttribute('data-columns') || CONFIG.defaultColumns;
    const rows = block.getAttribute('data-rows') || CONFIG.defaultRows;

    // Create wrapper
    const wrapper = createWrapper(parseInt(columns, 10), parseInt(rows, 10));

    // Process each child div as a card
    const cards = Array.from(block.children).filter((child) => child.tagName === 'DIV');

    // Process cards and add to wrapper
    processCards(cards, wrapper);

    // Apply container-level styling to all cards
    applyContainerStyleClasses(block, cards);

    // Replace block content with wrapper
    block.innerHTML = '';
    block.appendChild(wrapper);

    // Set up animations
    setupScrollAnimation(block);

    // Set up responsive handling
    setupResponsiveHandler(wrapper);

    // Add accessibility attributes
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', 'Facts and figures');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Facts and Figures Cards decoration failed:', error);
    // Fallback: ensure cards are visible even if decoration fails
    const cards = block.querySelectorAll(SELECTORS.card);
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }
}
