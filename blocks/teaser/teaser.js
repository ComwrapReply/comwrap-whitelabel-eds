// TODO: Create missing utility functions
// import { moveClassToTargetedChild } from '../../scripts/utils.js';
// import { renderButton } from '../../components/button/button.js';

/**
 * Teaser block implementation with element grouping for block options
 * Supports multiple styling variants through classes_ prefixed fields
 */

/**
 * Simple button renderer (temporary implementation)
 * @param {Object} options - Button options
 * @returns {HTMLElement} Button element
 */
function renderButton({ link, label, target }) {
  const button = document.createElement('a');
  button.href = link || '#';
  button.textContent = label || 'Click here';
  button.className = 'button';
  if (target) {
    button.target = target;
  }
  return button;
}

/**
 * Move classes from block to target child (temporary implementation)
 * @param {HTMLElement} block - Source block element
 * @param {HTMLElement} target - Target child element
 */
function moveClassToTargetedChild(block, target) {
  if (!target) return;
  // Simple implementation - could be enhanced
  const blockClasses = Array.from(block.classList);
  blockClasses.forEach((className) => {
    if (className !== 'block' && className !== 'teaser') {
      target.classList.add(className);
    }
  });
}

/**
 * Extract block options from classes_ prefixed fields
 * @param {HTMLElement} block - The block DOM element
 * @returns {Object} Object containing all block options
 */
function extractBlockOptions(block) {
  const options = {
    variant: '',
    background: 'light',
    layout: 'image-left',
    effects: [],
    fullwidth: false,
    centered: false,
  };

  // Extract all classes_ prefixed fields from the block
  const rows = Array.from(block.children);
  rows.forEach((row, index) => {
    const textContent = row.textContent?.trim();
    if (!textContent) return;

    // Map field positions to option names
    const fieldMapping = {
      5: 'classes_variant',
      6: 'classes_background',
      7: 'classes_layout',
      8: 'classes_effects',
      9: 'classes_fullwidth',
      10: 'classes_centered',
    };

    const fieldName = fieldMapping[index];
    if (!fieldName) return;

    // Process different field types
    switch (fieldName) {
      case 'classes_variant':
      case 'classes_background':
      case 'classes_layout':
        options[fieldName.replace('classes_', '')] = textContent;
        break;
      case 'classes_effects':
        // Handle multiselect - split by comma and trim
        options.effects = textContent ? textContent.split(',').map((effect) => effect.trim()) : [];
        break;
      case 'classes_fullwidth':
      case 'classes_centered':
        // Handle boolean fields
        options[fieldName.replace('classes_', '')] = textContent.toLowerCase() === 'true';
        break;
      default:
        // No action needed for unknown field types
        break;
    }
  });

  return options;
}

/**
 * Apply block options as CSS classes to the block element
 * @param {HTMLElement} block - The block DOM element
 * @param {Object} options - Block options object
 */
function applyBlockOptions(block, options) {
  // Apply variant class
  if (options.variant) {
    block.classList.add(options.variant);
  }

  // Apply background class
  if (options.background) {
    block.classList.add(options.background);
  }

  // Apply layout class
  if (options.layout) {
    block.classList.add(options.layout);
  }

  // Apply effects classes
  if (options.effects && options.effects.length > 0) {
    options.effects.forEach((effect) => {
      if (effect) {
        block.classList.add(effect);
      }
    });
  }

  // Apply boolean classes
  if (options.fullwidth) {
    block.classList.add('fullwidth');
  }

  if (options.centered) {
    block.classList.add('centered');
  }
}

export default function decorate(block) {
  // Extract block options from classes_ fields
  const blockOptions = extractBlockOptions(block);
  // Apply block options as CSS classes
  applyBlockOptions(block, blockOptions);

  const [
    title,
    description,
    image,
    link,
    label,
    target,
  ] = Array.from(block.children)
    .map((row, index) => {
      switch (index) {
        case 0: // Title
        case 1: // Description
        case 3: // Link
        case 4: // Label
        case 5: // Target
        { // Read value and remove row from the DOM
          const value = row.textContent.trim();
          row.remove();
          return value;
        }
        case 2: // Image
        { // Get the picture element and remove row from the DOM
          const picture = row.querySelector('picture');
          row.remove();
          return picture;
        }
        default:
          return '';
      }
    });

  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-block';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'teaser-image';

  if (image) {
    imageDiv.appendChild(image);
  } else {
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/400x200';
    img.alt = 'Teaser Image';
    imageDiv.appendChild(img);
  }

  const contentDiv = document.createElement('div');
  contentDiv.className = 'teaser-content';

  const titleEl = document.createElement('h2');
  titleEl.className = 'teaser-title';
  titleEl.textContent = title || '';

  const descEl = document.createElement('p');
  descEl.className = 'teaser-description';
  descEl.textContent = description || '';

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'teaser-button';
  if (label) {
    buttonDiv.appendChild(renderButton({
      link,
      label,
      target,
      block,
    }));
    moveClassToTargetedChild(block, buttonDiv.querySelector('.button'));
  }

  contentDiv.appendChild(titleEl);
  contentDiv.appendChild(descEl);
  contentDiv.appendChild(buttonDiv);

  wrapper.appendChild(imageDiv);
  wrapper.appendChild(contentDiv);

  block.textContent = '';
  block.appendChild(wrapper);
}
