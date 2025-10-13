/**
 * Hero block implementation
 * Handles hero content with image background and CTA buttons
 */

/**
 * Add semantic CSS classes and enhance CTA buttons
 * @param {HTMLElement} block - The hero block DOM element
 */
function enhanceCtaButtons(block) {
  // Find all CTA links in the block
  const ctaLinks = block.querySelectorAll('p > a');
  
  ctaLinks.forEach((link) => {
    // Add button class if not already present
    if (!link.classList.contains('button')) {
      link.classList.add('button');
    }
    
    // Ensure parent paragraph has button-container class
    const parent = link.parentElement;
    if (parent && parent.tagName === 'P' && !parent.classList.contains('button-container')) {
      parent.classList.add('button-container');
    }
  });
}

/**
 * Add semantic classes to hero elements
 * @param {HTMLElement} block - The hero block DOM element
 */
function addSemanticClasses(block) {
  // Add class to image wrapper
  const picture = block.querySelector('picture');
  if (picture) {
    picture.classList.add('hero-image-wrapper');
  }

  // Add class to image element
  const image = block.querySelector('.hero-image-wrapper img');
  if (image) {
    image.classList.add('hero-image');
  }

  // Mark content area - typically the last div containing text and buttons
  const contentDivs = block.querySelectorAll(':scope > div');
  if (contentDivs.length > 0) {
    const lastDiv = contentDivs[contentDivs.length - 1];
    const innerDiv = lastDiv.querySelector(':scope > div');
    if (innerDiv) {
      innerDiv.classList.add('hero-content');
    }
  }

  // Mark title element
  const title = block.querySelector('h1, h2, h3, h4, h5, h6');
  if (title) {
    title.classList.add('hero-title');
  }

  // Mark description paragraphs (paragraphs that are not button containers)
  const paragraphs = block.querySelectorAll('p');
  paragraphs.forEach((p) => {
    if (!p.querySelector('a') && !p.classList.contains('button-container')) {
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
    console.log(block);
  // Add semantic CSS classes for better maintainability
  addSemanticClasses(block);
  
  // Enhance CTA buttons
  enhanceCtaButtons(block);
}

