import { loadFragment } from '../fragment/fragment.js';
import { getPlaceholder } from '../../scripts/utils.js';

/**
 * Modal Block - Simple popup dialog
 * Creates a trigger link that opens fragment content in a modal
 */

/**
 * Normalizes AEM content path to relative path
 * Removes /content/{site-name} prefix for EDS compatibility
 * @param {string} path - The path to normalize
 * @returns {string} - Normalized relative path
 */
function normalizePath(path) {
  // Handle full URLs
  if (path.startsWith('http')) {
    const url = new URL(path, window.location);
    return normalizePath(url.pathname);
  }

  // Remove /content/{site-name} prefix if present (AEM author paths)
  // Pattern: /content/site-name/... → /...
  const aemPathMatch = path.match(/^\/content\/[^/]+(\/.*)$/);
  if (aemPathMatch) {
    return aemPathMatch[1];
  }

  return path;
}

// Track if modal is currently opening to prevent duplicates
let isModalOpening = false;

/**
 * Opens a modal with fragment content
 * @param {string} fragmentUrl - Path to the fragment
 */
export async function openModal(fragmentUrl) {
  // Prevent duplicate modal opening
  if (isModalOpening) return;
  isModalOpening = true;

  try {
    const path = normalizePath(fragmentUrl);

    const fragment = await loadFragment(path);
    if (!fragment) {
      // eslint-disable-next-line no-console
      console.error(`Failed to load modal fragment: ${path}`);
      return;
    }

    // Create dialog
    const dialog = document.createElement('dialog');
    dialog.classList.add('modal-dialog');

    // Close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.type = 'button';
    closeButton.innerHTML = '<span class="icon icon-close"></span>';
    closeButton.addEventListener('click', () => dialog.close());

    // Content wrapper
    const content = document.createElement('div');
    content.classList.add('modal-content');
    content.append(...fragment.childNodes);

    dialog.append(closeButton, content);
    document.body.append(dialog);

    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    // Cleanup on close
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      dialog.remove();
    });

    // Show modal
    dialog.showModal();
    document.body.classList.add('modal-open');
    content.scrollTop = 0;
  } finally {
    isModalOpening = false;
  }
}

/**
 * Decorates the modal block
 * @param {HTMLElement} block - The modal block element
 */
export default async function decorate(block) {
  // Get fragment path from link
  const link = block.querySelector('a');
  const fragmentPath = link?.getAttribute('href') || '';

  // Get trigger text from second row, fallback to placeholder
  const defaultTriggerText = await getPlaceholder('modal-open', 'Open Modal');
  const triggerText = block.children[1]?.textContent?.trim() || defaultTriggerText;

  if (!fragmentPath) {
    const noLinkText = await getPlaceholder('modal-no-link', 'Modal: No reference path');
    block.textContent = noLinkText;
    return;
  }

  // Create trigger link
  block.innerHTML = '';
  const trigger = document.createElement('a');
  trigger.href = fragmentPath;
  trigger.textContent = triggerText;
  trigger.classList.add('modal-link');

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(fragmentPath);
  });

  block.append(trigger);
}
