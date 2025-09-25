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
 * Applies style classes to all cards based on the container's classes field
 * @param {HTMLElement} container - The container element
 * @param {HTMLElement[]} cards - Array of card elements
 */
function applyContainerStyleClasses(container, cards) {
  // Look for the classes in the container's text content
  // The classes field from the container model appears as text content
  const containerText = container.textContent || '';

  // Check if the text contains class information (e.g., "facts-and-figures-cards, blue")
  const classMatch = containerText.match(/(?:facts-and-figures-cards|facts-figures-cards),\s*(\w+)/);

  let containerClass = '';
  if (classMatch) {
    const className = classMatch[1];
    if (className && ['blue', 'grey', 'bordered', 'highlighted', 'minimal'].includes(className)) {
      containerClass = className;
    }
  }

  // Also check for classes in data attributes as fallback
  if (!containerClass) {
    const classes = container.getAttribute('data-classes')
      || container.dataset.classes
      || container.getAttribute('data-style')
      || container.dataset.style
      || '';

    if (classes) {
      const classList = classes.split(' ').filter((cls) => cls.trim());
      containerClass = classList.find((cls) => ['blue', 'grey', 'bordered', 'highlighted', 'minimal'].includes(cls.trim())) || '';
    }
  }

  // Apply the container class to all cards
  if (containerClass) {
    cards.forEach((card) => {
      card.classList.add(containerClass);
    });
  }
}

/**
 * Processes individual card content and applies semantic classes
 * Updated to handle title, richtext content and style classes from the card model
 * @param {HTMLElement} card - Individual card element
 * @param {number} index - Card index for animation delay
 */
function processCard(card, index) {
  if (!card) return;

  // Find the title content (first div)
  const titleContent = card.querySelector('div:first-child');
  let titleElement = null;

  if (titleContent && titleContent.textContent?.trim()) {
    // Create title element
    titleElement = document.createElement('h3');
    titleElement.className = CLASSES.title;
    titleElement.textContent = titleContent.textContent.trim();
  }

  // Find the text content (richtext field from the model - second div)
  const textContent = card.querySelector('div:last-child');
  if (!textContent) return;

  // Create a wrapper for the text content
  const textWrapper = document.createElement('div');
  textWrapper.className = CLASSES.text;
  textWrapper.innerHTML = textContent.innerHTML;

  // Clear the original content and add our wrapper
  card.innerHTML = '';

  // Add title if it exists
  if (titleElement) {
    card.appendChild(titleElement);
  }

  card.appendChild(textWrapper);

  // Clean up text content - remove class information that appears as text
  const allTextElements = textWrapper.querySelectorAll('*');
  allTextElements.forEach((element) => {
    const text = element.textContent?.trim() || '';

    // Remove class information that appears as text (e.g., "facts-and-figures-card, grey")
    if (text.match(/^(?:facts-and-figures-card|facts-figures-card),\s*\w+$/)) {
      element.remove();
    }
  });

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
    figureElement.className = CLASSES.figure;

    // Extract unit if present (e.g., "€", "%", "M")
    const figureText = figureElement.textContent || '';
    const unitMatch = figureText.match(/([€$£¥%]|[A-Za-z]+)$/);

    if (unitMatch) {
      const unit = unitMatch[1];
      const value = figureText.replace(unit, '').trim();

      figureElement.innerHTML = value;

      const unitElement = document.createElement('span');
      unitElement.className = CLASSES.figureUnit;
      unitElement.textContent = unit;

      figureElement.appendChild(unitElement);
    }
  }

  // Process description elements
  if (descriptionElements.length > 0) {
    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = CLASSES.description;

    descriptionElements.forEach((element) => {
      const p = document.createElement('p');
      p.innerHTML = element.innerHTML;
      descriptionWrapper.appendChild(p);
      element.remove();
    });

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
 * Main decoration function
 * @param {HTMLElement} block - The main block element
 */
export default function decorate(block) {
  try {
    // Get template properties (columns, rows)
    const columns = block.getAttribute('data-columns') || CONFIG.defaultColumns;
    const rows = block.getAttribute('data-rows') || CONFIG.defaultRows;

    // Create wrapper
    const wrapper = createWrapper(parseInt(columns, 10), parseInt(rows, 10));

    // Process each card
    const cards = block.querySelectorAll(':scope > div');
    cards.forEach((card, index) => {
      // Add card class
      card.classList.add(CLASSES.card);

      // Process card content
      processCard(card, index);

      // Move card to wrapper
      wrapper.appendChild(card);
    });

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
