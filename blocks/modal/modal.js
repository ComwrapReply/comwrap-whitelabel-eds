/*
 * Modal Block
 * A popup that appears over other site content.
 * Can be opened via links to /modals/ paths or programmatically using createModal() and openModal()
 */

import { loadFragment } from '../fragment/fragment.js';
import {
  buildBlock, decorateBlock, loadBlock, loadCSS,
} from '../../scripts/aem.js';

/**
 * Creates a modal dialog with the provided content nodes
 * @param {Node[]} contentNodes - Array of DOM nodes to display in the modal
 * @returns {Promise<Object>} Object containing the block element and showModal function
 */
export async function createModal(contentNodes) {
  // Config constants
  const CSS_PATH = `${window.hlx.codeBasePath}/blocks/modal/modal.css`;
  const CLOSE_BUTTON_LABEL = 'Close';
  const CLOSE_ICON_CLASS = 'icon icon-close';

  // Defensive check - ensure contentNodes is valid
  if (!contentNodes || !Array.isArray(contentNodes) || contentNodes.length === 0) {
    console.warn('createModal: contentNodes must be a non-empty array');
    return null;
  }

  // Load modal CSS
  await loadCSS(CSS_PATH);

  // Create dialog element
  const dialog = document.createElement('dialog');
  const dialogContent = document.createElement('div');
  dialogContent.classList.add('modal-content');
  dialogContent.append(...contentNodes);
  dialog.append(dialogContent);

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.setAttribute('aria-label', CLOSE_BUTTON_LABEL);
  closeButton.type = 'button';
  closeButton.innerHTML = `<span class="${CLOSE_ICON_CLASS}"></span>`;
  closeButton.addEventListener('click', () => {
    dialog.close();
  });
  dialog.prepend(closeButton);

  // Build and load modal block
  const block = buildBlock('modal', '');
  const mainElement = document.querySelector('main');
  if (!mainElement) {
    console.warn('createModal: main element not found');
    return null;
  }
  mainElement.append(block);
  decorateBlock(block);
  await loadBlock(block);

  // Close on click outside the dialog
  dialog.addEventListener('click', (e) => {
    const {
      left, right, top, bottom,
    } = dialog.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      dialog.close();
    }
  });

  // Handle dialog close event
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (block && block.parentElement) {
      block.remove();
    }
  });

  // Replace block content with dialog
  block.innerHTML = '';
  block.append(dialog);

  /**
   * Shows the modal dialog
   * @returns {void}
   */
  const showModal = () => {
    dialog.showModal();
    // Reset scroll position
    setTimeout(() => {
      dialogContent.scrollTop = 0;
    }, 0);
    document.body.classList.add('modal-open');
  };

  return {
    block,
    showModal,
  };
}

/**
 * Opens a modal by loading content from a fragment URL
 * @param {string} fragmentUrl - URL path to the fragment content
 * @returns {Promise<void>}
 */
export async function openModal(fragmentUrl) {
  // Defensive check - ensure fragmentUrl is valid
  if (!fragmentUrl || typeof fragmentUrl !== 'string') {
    console.warn('openModal: fragmentUrl must be a non-empty string');
    return;
  }

  // Normalize path
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  // Load fragment content
  const fragment = await loadFragment(path);
  if (!fragment) {
    console.warn('openModal: failed to load fragment from', path);
    return;
  }

  // Create and show modal
  const { showModal } = await createModal(fragment.childNodes);
  if (showModal) {
    showModal();
  }
}

/**
 * Decorates the modal block
 * Handles links to /modals/ paths and transforms them into modal triggers
 * @param {HTMLElement} block - The modal block element
 * @returns {Promise<void>}
 */
export default async function decorate(block) {
  // Config constants
  const MODAL_PATH_PREFIX = '/modals/';
  const LINK_SELECTOR = 'a';

  // Defensive check - ensure block exists
  if (!block) {
    console.warn('modal decorate: block element is required');
    return;
  }

  // Find all links in the block
  const links = block.querySelectorAll(LINK_SELECTOR);

  // Process each link
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) {
      return;
    }

    // Check if link points to a modal path
    const isModalLink = href.includes(MODAL_PATH_PREFIX) || href.startsWith('/modals/');

    if (isModalLink) {
      // Prevent default navigation
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        await openModal(href);
      });
    }
  });
}
