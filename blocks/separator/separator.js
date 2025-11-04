import { isEditorMode } from '../../scripts/utils.js';

/**
 * Separator block implementation
 * A minimal decorative block used to visually separate content sections
 *
 * @param {HTMLElement} block - The block's DOM element
 */
export default function decorate(block) {
  // Create a child separator element
  const separatorLine = document.createElement('div');
  separatorLine.classList.add('separator-line');

  // Clear block content and add the separator line as a child
  block.innerHTML = '';
  block.appendChild(separatorLine);

  // Add editor mode padding to the block container, not the separator line
  if (isEditorMode()) {
    block.classList.add('editor-mode');
  }
}
