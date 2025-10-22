/**
 * Teaser Info Block
 * Displays an image with overlay and content section with heading, arrow animation, and body text
 */

/**
 * Configuration object for block selectors and classes
 */
const config = {
  selectors: {
    picture: 'picture',
    image: 'img',
    heading: 'h1, h2, h3, h4, h5, h6',
    paragraph: 'p',
    firstChild: ':scope > div:first-child',
    lastChild: ':scope > div:last-child',
  },
  classes: {
    imageWrapper: 'teaser-info-image-wrapper',
    imageOverlay: 'teaser-info-image-overlay',
    image: 'teaser-info-image',
    contentWrapper: 'teaser-info-content-wrapper',
    headingWrapper: 'teaser-info-heading-wrapper',
    heading: 'teaser-info-heading',
    arrowWrapper: 'teaser-info-arrow-wrapper',
    arrow: 'teaser-info-arrow',
    bodyWrapper: 'teaser-info-body-wrapper',
    bodyText: 'teaser-info-body-text',
  },
};

/**
 * Creates and adds the arrow animation element
 * @param {HTMLElement} headingWrapper - The heading wrapper element
 */
function addArrowAnimation(headingWrapper) {
  const arrowWrapper = document.createElement('div');
  arrowWrapper.className = config.classes.arrowWrapper;

  const arrow = document.createElement('div');
  arrow.className = config.classes.arrow;
  arrow.innerHTML = `
    <svg viewBox="0 0 96 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="24" x2="90" y2="24" stroke="currentColor" stroke-width="5"/>
      <path d="M72 4 L96 24 L72 44" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  arrowWrapper.appendChild(arrow);
  headingWrapper.appendChild(arrowWrapper);
}

/**
 * Processes the image section of the block
 * @param {HTMLElement} imageDiv - The image container div
 */
function processImageSection(imageDiv) {
  if (!imageDiv) return;

  imageDiv.className = config.classes.imageWrapper;

  // Add overlay div
  const overlay = document.createElement('div');
  overlay.className = config.classes.imageOverlay;
  imageDiv.appendChild(overlay);

  // Add class to image
  const img = imageDiv.querySelector(config.selectors.image);
  if (img) {
    img.classList.add(config.classes.image);
  }
}

/**
 * Processes the content section of the block
 * @param {HTMLElement} contentDiv - The content container div
 */
function processContentSection(contentDiv) {
  if (!contentDiv) return;

  contentDiv.className = config.classes.contentWrapper;

  // Find and process heading
  const heading = contentDiv.querySelector(config.selectors.heading);
  if (heading) {
    // Create heading wrapper
    const headingWrapper = document.createElement('div');
    headingWrapper.className = config.classes.headingWrapper;
    
    // Add class to heading
    heading.classList.add(config.classes.heading);
    
    // Wrap heading
    heading.parentNode.insertBefore(headingWrapper, heading);
    headingWrapper.appendChild(heading);

    // Add arrow animation
    addArrowAnimation(headingWrapper);
  }

  // Process body text
  const paragraphs = contentDiv.querySelectorAll(config.selectors.paragraph);
  paragraphs.forEach((p) => {
    if (!p.closest(`.${config.classes.headingWrapper}`)) {
      // Create body wrapper if it doesn't exist
      let bodyWrapper = contentDiv.querySelector(`.${config.classes.bodyWrapper}`);
      if (!bodyWrapper) {
        bodyWrapper = document.createElement('div');
        bodyWrapper.className = config.classes.bodyWrapper;
        contentDiv.appendChild(bodyWrapper);
      }

      // Add class to paragraph and move to body wrapper
      p.classList.add(config.classes.bodyText);
      bodyWrapper.appendChild(p);
    }
  });
}

/**
 * Adds accessibility features to the block
 * @param {HTMLElement} block - The block DOM element
 */
function addAccessibilityFeatures(block) {
  // Add ARIA label to image if needed
  const img = block.querySelector(`.${config.classes.image}`);
  if (img && !img.getAttribute('alt')) {
    img.setAttribute('alt', 'Teaser image');
  }

  // Ensure heading has proper ID for anchor links
  const heading = block.querySelector(`.${config.classes.heading}`);
  if (heading && !heading.id) {
    const id = heading.textContent
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    heading.id = id || `heading-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Entry point for block decoration
 * Must be exported as default and accept a block's DOM element
 * @param {HTMLElement} block - The block DOM element
 */
export default function decorate(block) {
  // Get main sections
  const [imageDiv, contentDiv] = block.children;

  // Process image section
  processImageSection(imageDiv);

  // Process content section
  processContentSection(contentDiv);

  // Add accessibility features
  addAccessibilityFeatures(block);
}

