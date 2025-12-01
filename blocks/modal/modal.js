import { loadFragment } from '../fragment/fragment.js';
import {
  buildBlock, decorateBlock, loadBlock,
} from '../../scripts/aem.js';

/*
  This is not a traditional block, so there is no decorate function.
  Instead, links to a /modals/ path are automatically transformed into a modal.
  Other blocks can also use the createModal() and openModal() functions.
*/

export async function createModal(contentNodes) {
  // await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);
  const dialog = document.createElement('dialog');
  const dialogContent = document.createElement('div');
  dialogContent.classList.add('modal-content');
  dialogContent.append(...contentNodes);
  dialog.append(dialogContent);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.type = 'button';
  closeButton.innerHTML = '<span class="icon icon-close"></span>';
  closeButton.addEventListener('click', () => dialog.close());
  dialog.prepend(closeButton);

  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);
  decorateBlock(block);
  await loadBlock(block);

  // close on click outside the dialog
  dialog.addEventListener('click', (e) => {
    const {
      left, right, top, bottom,
    } = dialog.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    block.remove();
  });

  block.innerHTML = '';
  block.append(dialog);

  return {
    block,
    showModal: () => {
      dialog.showModal();
      // reset scroll position
      setTimeout(() => { dialogContent.scrollTop = 0; }, 0);
      document.body.classList.add('modal-open');
    },
  };
}

export async function openModal(fragmentUrl) {
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  const fragment = await loadFragment(path);
  // Defensive coding: Check if fragment loaded successfully
  if (!fragment) {
    // eslint-disable-next-line no-console
    console.error(`Failed to load modal fragment: ${path}`);
    return;
  }

  const { showModal } = await createModal(fragment.childNodes);
  showModal();
}

/**
 * Decorates the modal block by creating a trigger link with custom text
 * @param {HTMLElement} block - The modal block element
 */
export default async function decorate(block) {
  // Get fragment path from link (aem-content reference field)
  const link = block.querySelector('a');
  const fragmentPath = link ? link.getAttribute('href') : block.textContent?.trim();

  // Get trigger text from block content
  // Block structure: first child = reference, second child = triggerText
  const children = [...block.children];
  let triggerText = 'Open Modal';

  // Extract trigger text from second row if it exists
  if (children.length >= 2) {
    const triggerTextContent = children[1].textContent?.trim();
    if (triggerTextContent && triggerTextContent !== '') {
      triggerText = triggerTextContent;
    }
  }

  // Defensive coding: Ensure we have a valid fragment path
  if (!fragmentPath || fragmentPath === '') {
    // eslint-disable-next-line no-console
    console.error('Modal block has no valid reference path');
    block.innerHTML = '<p>Modal configuration error: No reference path provided</p>';
    return;
  }

  // Clear the block
  block.innerHTML = '';

  // Create link with custom trigger text
  const modalLink = document.createElement('a');
  modalLink.href = fragmentPath;
  modalLink.textContent = triggerText;
  modalLink.classList.add('modal-link');
  modalLink.title = `Open ${triggerText}`;

  // Prevent default link behavior and open modal instead
  modalLink.addEventListener('click', async (e) => {
    e.preventDefault();
    await openModal(fragmentPath);
  });

  block.append(modalLink);
}
