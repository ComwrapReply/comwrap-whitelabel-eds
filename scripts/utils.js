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
