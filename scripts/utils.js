/**
 * Get node value from block at specified index
 * @param {HTMLElement} block - HTML block element
 * @param {number} index - Node index
 * @returns {string} Node value (text content)
 */
export const getNodeValue = (block, index) => {
  // Defensive check - ensure block exists
  if (!block || typeof index !== 'number') {
    return '';
  }

  const node = block.children[index];
  if (!node) {
    return '';
  }

  try {
    const deepestElement = node.querySelector('*:not(:has(*))');
    return deepestElement?.textContent?.trim() || '';
  } catch (error) {
    console.warn('getNodeValue: error querying element', error);
    return '';
  }
};

/**
 * Set block items options
 * @param {HTMLElement} blockItem - HTML element of a block
 * @param {Array} blockItemMap - Map of settings for each type of block item
 * @param {Array} blockItemsOptions - Array of options for each block item (accumulative)
 * @returns {void}
 */
export const setBlockItemOptions = (blockItem, blockItemMap, blockItemsOptions) => {
  // Defensive checks
  if (!blockItem || !Array.isArray(blockItemMap) || !Array.isArray(blockItemsOptions)) {
    console.warn('setBlockItemOptions: invalid arguments');
    return;
  }

  const itemOptions = {};

  blockItemMap.forEach((blockItemOption, index) => {
    if (blockItemOption && typeof blockItemOption.name === 'string') {
      itemOptions[blockItemOption.name] = getNodeValue(blockItem, index);
    }
  });

  blockItemsOptions.push(itemOptions);
};

/**
 * Get block children with optional filtering
 * @param {HTMLElement} block - HTML block element
 * @param {Object} [options={}] - Options object
 * @param {number} [options.exceptIndex] - Index to exclude from results
 * @returns {Array<HTMLElement>} Array of child elements
 */
export const getBlockChildren = (block, options = {}) => {
  // Defensive check - ensure block exists
  if (!block || !block.children) {
    return [];
  }

  const { exceptIndex } = options;
  const isExcluding = typeof exceptIndex === 'number';

  return [...block.children].filter((_, index) => !isExcluding || index !== exceptIndex);
};

/**
 * Move classes from block to its targeted child
 * @param {HTMLElement} block - The block element
 * @param {HTMLElement} target - The target child element
 * @param {boolean} [removeBlockClass=false] - Whether to remove classes from block
 * @returns {void}
 */
export const moveClassToTargetedChild = (block, target, removeBlockClass = false) => {
  // Defensive checks
  if (!block || !target) {
    console.warn('moveClassToTargetedChild: block and target must be provided');
    return;
  }

  if (!block.classList || !target.classList) {
    console.warn('moveClassToTargetedChild: block and target must have classList');
    return;
  }

  const blockName = block.getAttribute('data-block-name');

  const classes = Array.from(block.classList).filter(
    (className) => className !== 'block' && className !== blockName && className.trim() !== '',
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
 * Editor mode is detected by the presence of the 'appContainer' class element
 * This checks both the current document and parent/top frame for Universal Editor
 * @returns {boolean} True if in editor mode, false otherwise
 */
export const isEditorMode = () => {
  // Config constants
  const SELECTOR = '.appContainer';

  /**
   * Helper function to check for appContainer class in a document
   * @param {Document} doc - Document to check
   * @returns {boolean} True if appContainer exists
   */
  const hasAppContainer = (doc) => {
    if (!doc || typeof doc.querySelector !== 'function') return false;
    return doc.querySelector(SELECTOR) !== null;
  };

  // Check current document first (most common case)
  if (hasAppContainer(document)) {
    return true;
  }

  // Check parent window (iframe context)
  try {
    if (window.parent && window.parent !== window && window.parent.document) {
      if (hasAppContainer(window.parent.document)) {
        return true;
      }
    }
  } catch (e) {
    // Cross-origin iframe - can't access parent, silently fail
  }

  // Check top window (Universal Editor context)
  try {
    if (window.top && window.top !== window && window.top.document) {
      if (hasAppContainer(window.top.document)) {
        return true;
      }
    }
  } catch (e) {
    // Cross-origin iframe - can't access top, silently fail
  }

  return false;
};

/**
 * Observe changes to editor mode state
 * @param {Function} callback - Function to call when editor mode changes
 * @param {boolean} initialCall - Whether to call callback immediately (default: true)
 * @returns {Function} Cleanup function that disconnects all observers
 */
export const observeEditorMode = (callback, initialCall = true) => {
  // Config constants
  const OBSERVER_OPTIONS = {
    childList: true,
    subtree: true,
  };

  const observers = [];

  // Defensive check - ensure callback is a function
  if (typeof callback !== 'function') {
    console.warn('observeEditorMode: callback must be a function');
    return () => {}; // Return no-op cleanup function
  }

  // Initial check
  if (initialCall) {
    try {
      callback(isEditorMode());
    } catch (error) {
      console.error('observeEditorMode: error in initial callback', error);
    }
  }

  /**
   * Safely call the callback with error handling
   * @returns {void}
   */
  const safeCallback = () => {
    try {
      callback(isEditorMode());
    } catch (error) {
      console.error('observeEditorMode: error in callback', error);
    }
  };

  // Observe current document for appContainer changes
  try {
    if (document.body) {
      const currentObserver = new MutationObserver(safeCallback);

      currentObserver.observe(document.body, OBSERVER_OPTIONS);
      observers.push(currentObserver);
    }
  } catch (error) {
    console.warn('observeEditorMode: failed to observe current document', error);
  }

  // Also observe parent window if we're in an iframe
  try {
    const hasParentWindow = window.parent && window.parent !== window;
    const hasParentBody = hasParentWindow && window.parent.document && window.parent.document.body;

    if (hasParentBody) {
      const parentObserver = new MutationObserver(safeCallback);

      parentObserver.observe(window.parent.document.body, OBSERVER_OPTIONS);
      observers.push(parentObserver);
    }
  } catch (error) {
    // Cross-origin iframe - can't access parent
  }

  /**
   * Cleanup function that disconnects all observers
   * @returns {void}
   */
  const cleanup = () => {
    observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('observeEditorMode: error disconnecting observer', error);
      }
    });
    observers.length = 0; // Clear array
  };

  // Store cleanup method for backward compatibility
  cleanup.disconnect = cleanup;

  return cleanup;
};

/**
 * Placeholders Utilities
 * Based on AEM.live placeholders pattern
 * @see https://www.aem.live/developer/placeholders
 * @see https://www.aem.live/docs/placeholders
 */

// Cache for placeholders by prefix (language folder)
const placeholdersCache = {};

/**
 * Converts a string to camelCase
 * Keys with spaces or dashes are converted for easier JavaScript access
 * Examples: "about us" → "aboutUs", "foo-bar" → "fooBar"
 * @param {string} name - String to convert
 * @returns {string} - camelCase string
 */
export const toCamelCase = (name) => {
  if (!name || typeof name !== 'string') return '';

  return name
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/[\s-]+/g, '');
};

/**
 * Fetches placeholders from placeholders.json
 * Supports multilingual sites by specifying a prefix (language folder)
 * @param {string} [prefix=''] - Language folder prefix (e.g., 'en', 'de')
 * @returns {Promise<Object>} - Object with placeholder key-value pairs (camelCased keys)
 */
export const fetchPlaceholders = async (prefix = '') => {
  const cacheKey = prefix || 'default';

  // Return cached placeholders if available
  if (placeholdersCache[cacheKey]) {
    return placeholdersCache[cacheKey];
  }

  // Build path based on prefix
  const path = prefix ? `/${prefix}/placeholders.json` : '/placeholders.json';

  try {
    const resp = await fetch(path);

    if (!resp.ok) {
      // eslint-disable-next-line no-console
      console.warn(`fetchPlaceholders: failed to fetch ${path} (${resp.status})`);
      placeholdersCache[cacheKey] = {};
      return placeholdersCache[cacheKey];
    }

    const json = await resp.json();
    const placeholders = {};

    // Process each placeholder entry
    if (json.data && Array.isArray(json.data)) {
      json.data.forEach(({ Key, Text }) => {
        if (Key) {
          // Store with camelCase key for easier access
          placeholders[toCamelCase(Key)] = Text || '';
        }
      });
    }

    placeholdersCache[cacheKey] = placeholders;
    return placeholders;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`fetchPlaceholders: error fetching ${path}`, error);
    placeholdersCache[cacheKey] = {};
    return placeholdersCache[cacheKey];
  }
};

/**
 * Gets a single placeholder value by key
 * @param {string} key - Placeholder key (will be converted to camelCase)
 * @param {string} [fallback=''] - Fallback value if not found
 * @param {string} [prefix=''] - Language folder prefix
 * @returns {Promise<string>} - Placeholder value or fallback
 */
export const getPlaceholder = async (key, fallback = '', prefix = '') => {
  if (!key || typeof key !== 'string') {
    return fallback;
  }

  const placeholders = await fetchPlaceholders(prefix);
  const camelKey = toCamelCase(key);

  return placeholders[camelKey] !== undefined ? placeholders[camelKey] : fallback;
};
