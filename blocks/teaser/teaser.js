/**
 * Teaser block implementation
 * Based on Figma design with image, heading, description, and up to 2 CTA buttons
 * Supports full block linking and multiple layout variants
 */

/**
 * Create a button element with proper styling
 * @param {string} link - Button URL
 * @param {string} text - Button text
 * @param {string} type - Button type (primary or secondary)
 * @returns {HTMLElement} Button element
 */
const createButton = (link, text, type = 'primary') => {
  if (!link || !text) return null;

  const button = document.createElement('a');
  button.href = link;
  button.textContent = text;
  button.className = `button ${type}`;
  
  // Add external link attributes if needed
  if (link.startsWith('http') && !link.includes(window.location.hostname)) {
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
  }
  
  return button;
};

/**
 * Add semantic CSS classes to block elements
 * @param {HTMLElement} block - The block DOM element
 */
const addSemanticClasses = (block) => {
  // Add class to image wrapper
  const picture = block.querySelector('picture');
  if (picture) {
    const imageWrapper = picture.parentElement;
    if (imageWrapper) {
      imageWrapper.classList.add('teaser-image');
    }
  }

  // Mark content area
  const rows = Array.from(block.children);
  if (rows.length > 1) {
    const contentDiv = rows[1];
    contentDiv.classList.add('teaser-content');
  }
};

/**
 * Create the teaser structure
 * @param {HTMLElement} block - The block DOM element
 * @param {Object} data - Teaser data
 */
const createTeaserStructure = (block, data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-wrapper';

  // Create image container
  const imageDiv = document.createElement('div');
  imageDiv.className = 'teaser-image';
  
  if (data.image) {
    imageDiv.appendChild(data.image);
    
    // Add blue overlay for image-left variant (matching Figma design)
    if (block.classList.contains('image-left')) {
      const overlay = document.createElement('div');
      overlay.className = 'teaser-image-overlay';
      imageDiv.appendChild(overlay);
    }
  }

  // Create content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'teaser-content';

  // Create heading with arrow (matching Figma design)
  if (data.heading) {
    const headingWrapper = document.createElement('div');
    headingWrapper.className = 'teaser-heading-wrapper';
    
    const heading = document.createElement('h2');
    heading.className = 'teaser-heading';
    heading.textContent = data.heading;
    
    const arrow = document.createElement('div');
    arrow.className = 'teaser-arrow';
    arrow.innerHTML = '<svg width="96" height="48" viewBox="0 0 96 48" fill="none"><line x1="0" y1="24" x2="90" y2="24" stroke="currentColor" stroke-width="5"/><path d="M72 8L96 24L72 40" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    
    headingWrapper.appendChild(heading);
    headingWrapper.appendChild(arrow);
    contentDiv.appendChild(headingWrapper);
  }

  // Create description
  if (data.description) {
    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = 'teaser-description-wrapper';
    
    const description = document.createElement('div');
    description.className = 'teaser-description';
    description.innerHTML = data.description;
    
    descriptionWrapper.appendChild(description);
    contentDiv.appendChild(descriptionWrapper);
  }

  // Create buttons container
  const hasButtons = data.primaryLink || data.secondaryLink;
  if (hasButtons) {
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'teaser-buttons';

    const primaryButton = createButton(
      data.primaryLink, 
      data.primaryLinkText, 
      data.primaryLinkType || 'primary'
    );
    if (primaryButton) {
      buttonsDiv.appendChild(primaryButton);
    }

    const secondaryButton = createButton(
      data.secondaryLink, 
      data.secondaryLinkText, 
      data.secondaryLinkType || 'secondary'
    );
    if (secondaryButton) {
      buttonsDiv.appendChild(secondaryButton);
    }

    contentDiv.appendChild(buttonsDiv);
  }

  // Assemble wrapper
  wrapper.appendChild(imageDiv);
  wrapper.appendChild(contentDiv);

  // Handle full block link
  if (data.fullBlockLink && !hasButtons) {
    const blockLink = document.createElement('a');
    blockLink.href = data.fullBlockLink;
    blockLink.className = 'teaser-block-link';
    blockLink.setAttribute('aria-label', data.heading || 'Teaser link');
    
    // Add external link attributes if needed
    if (data.fullBlockLink.startsWith('http') && !data.fullBlockLink.includes(window.location.hostname)) {
      blockLink.target = '_blank';
      blockLink.rel = 'noopener noreferrer';
    }
    
    blockLink.appendChild(wrapper);
    block.textContent = '';
    block.appendChild(blockLink);
  } else {
    block.textContent = '';
    block.appendChild(wrapper);
  }
};

/**
 * Extract data from block children
 * @param {HTMLElement} block - The block DOM element
 * @returns {Object} Extracted data
 */
const extractData = (block) => {
  const data = {
    image: null,
    imageAlt: '',
    heading: '',
    description: '',
    fullBlockLink: '',
    primaryLink: '',
    primaryLinkText: '',
    primaryLinkType: 'primary',
    secondaryLink: '',
    secondaryLinkText: '',
    secondaryLinkType: 'secondary',
  };

  const rows = Array.from(block.children);
  
  // Extract image
  const imageRow = rows[0];
  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      data.image = picture;
    }
  }

  // Extract text fields
  rows.forEach((row, index) => {
    const text = row.textContent?.trim();
    
    switch (index) {
      case 1: // imageAlt
        data.imageAlt = text;
        break;
      case 2: // heading
        data.heading = text;
        break;
      case 3: // description
        data.description = row.innerHTML?.trim();
        break;
      case 4: // fullBlockLink
        data.fullBlockLink = text;
        break;
      case 5: // primaryLink
        data.primaryLink = text;
        break;
      case 6: // primaryLinkText
        data.primaryLinkText = text;
        break;
      case 7: // primaryLinkType
        data.primaryLinkType = text || 'primary';
        break;
      case 8: // secondaryLink
        data.secondaryLink = text;
        break;
      case 9: // secondaryLinkText
        data.secondaryLinkText = text;
        break;
      case 10: // secondaryLinkType
        data.secondaryLinkType = text || 'secondary';
        break;
      default:
        break;
    }
  });

  // Set image alt text
  if (data.image && data.imageAlt) {
    const img = data.image.querySelector('img');
    if (img) {
      img.alt = data.imageAlt;
    }
  }

  return data;
};

/**
 * Add event tracking for analytics
 * @param {HTMLElement} block - The block DOM element
 */
const addAnalytics = (block) => {
  const buttons = block.querySelectorAll('.button');
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'teaser_cta_click',
          block_type: 'teaser',
          button_position: index === 0 ? 'primary' : 'secondary',
          button_text: button.textContent,
          button_url: button.href,
        });
      }
    });
  });

  const blockLink = block.querySelector('.teaser-block-link');
  if (blockLink) {
    blockLink.addEventListener('click', () => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'teaser_block_click',
          block_type: 'teaser',
          block_url: blockLink.href,
        });
      }
    });
  }
};

/**
 * Main decoration function
 * @param {HTMLElement} block - The block DOM element
 */
export default async function decorate(block) {
  // Extract data from block children
  const data = extractData(block);

  // Create teaser structure
  createTeaserStructure(block, data);

  // Add semantic classes
  addSemanticClasses(block);

  // Add analytics tracking
  addAnalytics(block);
}
