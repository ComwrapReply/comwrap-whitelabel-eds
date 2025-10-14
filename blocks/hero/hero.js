/**
 * Hero block implementation
 * Handles hero content with image background and CTA buttons
 */

/**
 * Process image reference and convert to actual image element
 * @param {HTMLElement} block - The hero block DOM element
 */
function processImageReference(block) {
  // Find the first link that points to an image (this is how AEM renders image references)
  const imageLinks = [...block.querySelectorAll('a')].filter((link) => {
    const href = link.href || '';
    return href.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
           || href.includes('/adobe/assets/')
           || href.includes('adobeaemcloud.com');
  });

  if (imageLinks.length > 0) {
    const imageLink = imageLinks[0];
    const imageUrl = imageLink.href;
    const imageAlt = imageLink.title || imageLink.textContent || '';

    // Create picture element
    const picture = document.createElement('picture');
    picture.classList.add('hero-image-wrapper');

    // Create img element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = imageAlt;
    img.classList.add('hero-image');
    img.loading = 'eager'; // Hero images should load immediately

    picture.appendChild(img);

    // Replace the link with the picture element
    const linkParent = imageLink.closest('div');
    if (linkParent) {
      linkParent.innerHTML = '';
      linkParent.appendChild(picture);
    }
  }
}

/**
 * Process CTA buttons and clean up structure
 * @param {HTMLElement} block - The hero block DOM element
 */
function processCtaButtons(block) {
  // Find all remaining links (after image has been processed) - these are CTAs
  const allLinks = [...block.querySelectorAll('a:not(.hero-image-wrapper a)')];

  // Separate valid CTA links from URL-only links
  const validCtaLinks = [];
  const urlOnlyLinks = [];
  allLinks.forEach((link) => {
    const text = link.parentElement.nextElementSibling.textContent.trim();
    const { href } = link;
    link.textContent = text;

    // If the link text is a URL or path, it's probably a raw field value
    if (text.startsWith('http') || text.startsWith('/content/') || text === href) {
      urlOnlyLinks.push(link);
    } else {
      // This is a proper button with label text
      validCtaLinks.push(link);
    }
  });

  // Remove URL-only links and their containers
  allLinks.forEach((link) => {
    const parent = link.closest('div').parentElement;
    if (parent) {
      parent.remove();
    }
  });

  // Create a container for CTA buttons if we have valid ones
  if (validCtaLinks.length > 0) {
    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('button-container');

    validCtaLinks.forEach((link) => {
      // Ensure button class is applied
      const button = document.createElement('button');
      button.appendChild(link.cloneNode(true));

      // Move link to the CTA container
      ctaContainer.appendChild(button);
    });

    // Add the CTA container to the content area
    const contentDiv = block.querySelector('.hero-content');
    if (contentDiv) {
      contentDiv.appendChild(ctaContainer);
    }
  }

  // Clean up any empty paragraphs left behind
  block.querySelectorAll('p:empty').forEach((p) => p.remove());
}

/**
 * Add semantic classes to hero elements
 * @param {HTMLElement} block - The hero block DOM element
 */
function addSemanticClasses(block) {
  // Mark content area - find the div with text content
  const contentDivs = [...block.querySelectorAll(':scope > div > div')];

  contentDivs.forEach((div) => {
    // If it has heading or paragraph (not just links), it's content
    if (div.querySelector('h1, h2, h3, h4, h5, h6, p')) {
      div.classList.add('hero-content');
    }
  });

  // Process title - find the first non-empty text content in content area
  const contentArea = block.querySelector('.hero-content');
  if (contentArea) {
    // Find first div with text content that's not a link or button
    const titleElements = [...contentArea.children].filter((child) => {
      const hasText = child.textContent.trim().length > 0;
      const isNotLink = !child.querySelector('a');
      const isNotEmpty = child.children.length > 0 || child.textContent.trim().length > 0;
      return hasText && isNotLink && isNotEmpty;
    });

    if (titleElements.length > 0) {
      const titleElement = titleElements[0];
      const titleText = titleElement.textContent.trim();

      // Create h1 with the title text
      const h1 = document.createElement('h1');
      h1.textContent = titleText;
      h1.classList.add('hero-title');

      // Replace the original element
      titleElement.replaceWith(h1);
    }
  }

  // Mark description paragraphs (paragraphs that are not button containers or titles)
  const paragraphs = block.querySelectorAll('p');
  paragraphs.forEach((p) => {
    const isButton = p.querySelector('a') || p.classList.contains('button-container');
    const isEmpty = p.textContent.trim().length === 0;

    if (!isButton && !isEmpty) {
      p.classList.add('hero-description');
    }
  });
}

/**
 * Entry point to hero block's JavaScript
 * Must be exported as default and accept a block's DOM element
 * @param {HTMLElement} block - The block's DOM element/tree
 */
export default function decorate(block) {
  // Process image reference first
  processImageReference(block);

  // Add semantic CSS classes
  addSemanticClasses(block);

  // Process and clean up CTA buttons
  processCtaButtons(block);
}
