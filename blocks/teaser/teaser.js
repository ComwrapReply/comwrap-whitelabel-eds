/**
 * Teaser block implementation
 * Based on Figma design with image, heading, description, and up to 2 CTA buttons
 * Supports full block linking and multiple layout variants
 * Uses element grouping for buttons (primaryButton_, secondaryButton_)
 */

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
  }

  // Create content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'teaser-content';

  // Create heading
  if (data.heading) {
    const headingWrapper = document.createElement('div');
    headingWrapper.className = 'teaser-heading-wrapper';

    const heading = document.createElement('h2');
    heading.className = 'teaser-heading';
    heading.textContent = data.heading;

    headingWrapper.appendChild(heading);
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
  const hasButtons = data.primaryButton || data.secondaryButton;
  if (hasButtons) {
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'teaser-buttons';

    if (data.primaryButton) {
      buttonsDiv.appendChild(data.primaryButton);
    }

    if (data.secondaryButton) {
      buttonsDiv.appendChild(data.secondaryButton);
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
 * With element grouping, buttons are already rendered as <a> tags
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
    primaryButton: null,
    secondaryButton: null,
  };

  const rows = Array.from(block.children);

  // Extract fields based on position
  // Note: The order matches the JSON field definition order
  rows.forEach((row, index) => {
    const text = row.textContent?.trim();

    switch (index) {
      case 0: // image (with alt text)
        {
          const picture = row.querySelector('picture');
          if (picture) {
            data.image = picture;
            const img = picture.querySelector('img');
            if (img && img.alt) {
              data.imageAlt = img.alt;
            }
          }
        }
        break;
      case 1: // heading
        data.heading = text;
        break;
      case 2: // description (richtext)
        {
          // For richtext, get the inner HTML content
          const descDiv = row.querySelector('div');
          const content = descDiv?.innerHTML?.trim() || row.innerHTML?.trim();
          data.description = content;
        }
        break;
      case 3: // fullBlockLink
        data.fullBlockLink = text;
        break;
      case 4: // primaryButton (element grouped)
        {
          const button = row.querySelector('a');
          if (button && button.href) {
            // Element grouping creates: P0=button, P1=label, P2=style classes
            const allParagraphs = Array.from(row.querySelectorAll('p'));

            // Get label from second paragraph
            if (allParagraphs[1]) {
              const label = allParagraphs[1].textContent?.trim();
              if (label) {
                button.textContent = label;
              }
            }

            // Get style classes from third paragraph and apply to button
            if (allParagraphs[2]) {
              const styleClasses = allParagraphs[2].textContent?.trim();
              if (styleClasses) {
                // Add each class (could be comma-separated for multiselect)
                styleClasses.split(',').forEach((cls) => {
                  const trimmedClass = cls.trim();
                  if (trimmedClass) {
                    button.classList.add(trimmedClass);
                  }
                });
              }
            }

            data.primaryButton = button;
            // Ensure button has proper class
            if (!button.classList.contains('button')) {
              button.classList.add('button');
            }
          }
        }
        break;
      case 5: // secondaryButton (element grouped)
        {
          const button = row.querySelector('a');
          if (button && button.href) {
            // Element grouping creates: P0=button, P1=label, P2=style classes
            const allParagraphs = Array.from(row.querySelectorAll('p'));

            // Get label from second paragraph
            if (allParagraphs[1]) {
              const label = allParagraphs[1].textContent?.trim();
              if (label) {
                button.textContent = label;
              }
            }

            // Get style classes from third paragraph and apply to button
            if (allParagraphs[2]) {
              const styleClasses = allParagraphs[2].textContent?.trim();
              if (styleClasses) {
                // Add each class (could be comma-separated for multiselect)
                styleClasses.split(',').forEach((cls) => {
                  const trimmedClass = cls.trim();
                  if (trimmedClass) {
                    button.classList.add(trimmedClass);
                  }
                });
              }
            }

            data.secondaryButton = button;
            // Ensure button has proper class
            if (!button.classList.contains('button')) {
              button.classList.add('button');
            }
          }
        }
        break;
      default:
        break;
    }
  });

  return data;
};

/**
 * Add event tracking for analytics
 * @param {HTMLElement} block - The block DOM element
 */
const addAnalytics = (block) => {
  // Track button clicks
  const buttonsContainer = block.querySelector('.teaser-buttons');
  if (buttonsContainer) {
    const buttons = buttonsContainer.querySelectorAll('a');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'teaser_cta_click',
            block_type: 'teaser',
            button_position: index === 0 ? 'primary' : 'secondary',
            button_text: button.textContent?.trim(),
            button_url: button.href,
            button_style: button.className,
          });
        }
      });
    });
  }

  // Track full block link clicks
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
