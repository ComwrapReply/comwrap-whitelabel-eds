/**
 * Get node value
 * @param {HTMLElement} block html
 * @param {Number} index node index
 * @returns {String} node value
 */
export const getNodeValue = (block, index) => {
  const node = block.children[index];
  if (node) {
    const deepestElement = node.querySelector('*:not(:has(*))');
    return deepestElement?.textContent.trim();
  }
  return '';
};

/**
 * Set block items options
 * @param {HTMLElement} blockItem HTML element of a block
 * @param {Array} blockItemMap Map of settings for each type of block item
 * @param {Array} blockItemsOptions Array of options for each block item (accumulative)
 */
export const setBlockItemOptions = (blockItem, blockItemMap, blockItemsOptions) => {
  const itemOptions = {};

  blockItemMap.forEach((blockItemOption, index) => {
    itemOptions[blockItemOption.name] = getNodeValue(blockItem, index);
  });

  blockItemsOptions.push(itemOptions);
};

/**
 * Get block children
 * @param {HTMLElement} block html
 * @param {Object | undefined} options options
 */
export const getBlockChildren = (block, options) => {
  const exceptIndex = options && options.exceptIndex;

  if (!block) return [];

  return [...block.children].filter((_, index) => index !== exceptIndex);
};

/**
 * Move classes from block to its first child
 * @param {HTMLElement} block The block element
 */
export const moveClassToTargetedChild = (block, target, removeBlockClass = false) => {
  const blockName = block.getAttribute('data-block-name');

  const classes = Array.from(block.classList).filter(
    (className) => className !== 'block' && className !== blockName,
  );

  if (classes.length > 0) {
    classes.forEach((className) => {
      target.classList.add(className);
      if (removeBlockClass) {
        block.classList.remove(className);
      }
    });
  }
};

/**
 * Check if the page is currently in editor mode
 * Editor mode is detected by the presence of the 'appContainer' element
 * This checks both the current document and parent/top frame for Universal Editor
 * @returns {boolean} True if in editor mode, false otherwise
 */
export const isEditorMode = () => {
  // Check current document
  if (document.getElementById('appContainer') !== null) {
    return true;
  }

  // Check parent window (iframe context)
  try {
    if (window.parent && window.parent !== window) {
      if (window.parent.document.getElementById('appContainer') !== null) {
        return true;
      }
    }
  } catch (e) {
    // Cross-origin iframe - can't access parent
  }

  // Check top window (Universal Editor context)
  try {
    if (window.top && window.top !== window) {
      if (window.top.document.getElementById('appContainer') !== null) {
        return true;
      }
    }
  } catch (e) {
    // Cross-origin iframe - can't access top
  }

  return false;
};

/**
 * Observe changes to editor mode state
 * @param {Function} callback - Function to call when editor mode changes
 * @param {boolean} initialCall - Whether to call callback immediately (default: true)
 * @returns {Array<MutationObserver>} Array of observer instances for manual disconnect
 */
export const observeEditorMode = (callback, initialCall = true) => {
  const observers = [];

  // Initial check
  if (initialCall) {
    callback(isEditorMode());
  }

  // Observe current document for appContainer changes
  const currentObserver = new MutationObserver(() => {
    callback(isEditorMode());
  });

  currentObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  observers.push(currentObserver);

  // Also observe parent window if we're in an iframe
  try {
    if (window.parent && window.parent !== window && window.parent.document.body) {
      const parentObserver = new MutationObserver(() => {
        callback(isEditorMode());
      });

      parentObserver.observe(window.parent.document.body, {
        childList: true,
        subtree: true,
      });

      observers.push(parentObserver);
    }
  } catch (e) {
    // Cross-origin iframe - can't access parent
  }

  // Return a cleanup function that disconnects all observers
  const cleanup = () => {
    observers.forEach((observer) => observer.disconnect());
  };

  // Store cleanup method
  cleanup.disconnect = cleanup;

  return cleanup;
};
