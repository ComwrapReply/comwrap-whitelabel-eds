/**
 * Embed block implementation
 * Allows embedding of iframes with customizable aspect ratios and future-proof whitelisting
 */

// Whitelist configuration - empty array allows all sources
// To enable whitelisting, populate with allowed domains:
// const ALLOWED_SOURCES = ['youtube.com', 'vimeo.com', 'maps.google.com'];
const ALLOWED_SOURCES = []; // Empty array = allow all sources

/**
 * Check if a URL is allowed based on the whitelist
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL is allowed
 */
function isUrlAllowed(url) {
  if (ALLOWED_SOURCES.length === 0) {
    return true; // Allow all if whitelist is empty
  }

  try {
    const urlObj = new URL(url);
    return ALLOWED_SOURCES.some((allowed) => urlObj.hostname.endsWith(allowed));
  } catch {
    return false;
  }
}

/**
 * Create and configure iframe element
 * @param {string} url - The iframe source URL
 * @param {string} aspectRatio - The aspect ratio class
 * @param {number} customWidth - Custom width for custom aspect ratio
 * @param {number} customHeight - Custom height for custom aspect ratio
 * @returns {HTMLElement} - The configured iframe element
 */
function createIframe(url, aspectRatio, customWidth, customHeight) {
  const iframe = document.createElement('iframe');

  // Set iframe attributes
  iframe.src = url;
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
  iframe.setAttribute('title', 'Embedded content');

  // Handle custom dimensions
  if (aspectRatio === 'custom') {
    iframe.style.width = `${customWidth}px`;
    iframe.style.height = `${customHeight}px`;
    iframe.style.position = 'relative';
  }

  return iframe;
}

/**
 * Create error message element for invalid URLs
 * @param {string} message - Error message to display
 * @returns {HTMLElement} - Error message element
 */
function createErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'embed-error';
  errorDiv.textContent = message;
  return errorDiv;
}

/**
 * Extract block configuration from DOM
 * @param {HTMLElement} block - The block element
 * @returns {Object} - Configuration object
 */
function extractBlockConfig(block) {
  const config = {
    url: '',
    aspectRatio: '16-9',
    customWidth: 800,
    customHeight: 450,
  };

  // Try multiple approaches to find the URL
  // Approach 1: Look for links in the entire block
  const link = block.querySelector('a');
  if (link && link.href) {
    config.url = link.href;
  }

  if (!config.url) {
    // Approach 2: Look for text content in divs
    const divs = Array.from(block.querySelectorAll('div'));
    divs.find((div) => {
      const text = div.textContent?.trim();
      if (text && text !== '') {
        // Handle URLs with or without protocol
        if (text.startsWith('http://') || text.startsWith('https://')) {
          config.url = text;
          return true;
        }
        if (text.includes('.') && !text.includes(' ') && text.length > 3) {
          // Assume it's a URL without protocol and add https://
          config.url = `https://${text}`;
          return true;
        }
      }
      return false;
    });
  }

  // Extract aspect ratio from any div containing aspect ratio values
  const allDivs = Array.from(block.querySelectorAll('div'));
  allDivs.find((div) => {
    const text = div.textContent?.trim();
    if (text && ['16-9', '4-3', '1-1', '21-9', 'custom'].includes(text)) {
      config.aspectRatio = text;
      return true;
    }
    return false;
  });

  // Extract custom dimensions from any div containing numbers
  const numberDivs = allDivs.filter((div) => {
    const text = div.textContent?.trim();
    const num = parseInt(text, 10);
    return !Number.isNaN(num) && num > 0;
  });

  if (numberDivs.length >= 1) {
    config.customWidth = parseInt(numberDivs[0].textContent?.trim(), 10);
  }
  if (numberDivs.length >= 2) {
    config.customHeight = parseInt(numberDivs[1].textContent?.trim(), 10);
  }

  return config;
}

/**
 * Main block decoration function
 * @param {HTMLElement} block - The block DOM element
 */
export default function decorate(block) {
  // Extract configuration from block content
  const config = extractBlockConfig(block);

  // Debug logging (remove in production)
  if (window.location.hostname.includes('aem.page') || window.location.hostname.includes('localhost')) {
    // eslint-disable-next-line no-console
    console.log('Embed block config:', config);
    // eslint-disable-next-line no-console
    console.log('Block children:', [...block.children].map((child) => ({
      tagName: child.tagName,
      textContent: child.textContent?.trim(),
      innerHTML: child.innerHTML,
    })));
  }

  // Validate URL
  if (!config.url) {
    block.innerHTML = '';
    block.appendChild(createErrorMessage('No embed URL provided'));
    return;
  }

  if (!isUrlAllowed(config.url)) {
    block.innerHTML = '';
    block.appendChild(createErrorMessage('This embed source is not allowed'));
    return;
  }

  // Create wrapper div
  const wrapper = document.createElement('div');
  wrapper.className = 'embed-wrapper';
  wrapper.classList.add(`aspect-${config.aspectRatio}`);

  // Create iframe
  const iframe = createIframe(
    config.url,
    config.aspectRatio,
    config.customWidth,
    config.customHeight,
  );

  // Assemble the embed
  wrapper.appendChild(iframe);
  block.innerHTML = '';
  block.appendChild(wrapper);

  // Add block class for styling
  block.classList.add('embed');
}
