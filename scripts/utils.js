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
 * Editor mode is detected by the presence of the 'editor-app' element
 * @returns {boolean} True if in editor mode, false otherwise
 */
export const isEditorMode = () => document.getElementById('editor-app') !== null;

/**
 * Observe changes to editor mode state
 * @param {Function} callback - Function to call when editor mode changes
 * @param {boolean} initialCall - Whether to call callback immediately (default: true)
 * @returns {MutationObserver} The observer instance for manual disconnect
 */
export const observeEditorMode = (callback, initialCall = true) => {
  // Initial check
  if (initialCall) {
    callback(isEditorMode());
  }

  // Observe document body for editor-app changes
  const observer = new MutationObserver(() => {
    callback(isEditorMode());
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
};
