import { isEditorMode } from '../../scripts/utils.js';

/**
 * Separator block implementation
 * A minimal decorative block used to visually separate content sections
 *
 * @param {HTMLElement} block - The block's DOM element
 */
export default function decorate(block) {
  // Minimal decoration - separator is primarily a visual element
  // The block structure is simple and doesn't require extensive DOM manipulation
  block.classList.add('separator-block');

  if (isEditorMode()) {
    block.style.padding = '2rem 0';
  }
}
