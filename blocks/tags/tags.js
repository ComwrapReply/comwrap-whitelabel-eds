/**
 * Tags block
 * Renders page tags from AEM's cq:tags system (meta[name="cq-tags"]) as small blue tags.
 */

/**
 * Create a single tag element
 * @param {string} label
 * @returns {HTMLElement}
 */
function createTag(label) {
  const span = document.createElement('span');
  span.className = 'tag';
  span.textContent = label;
  return span;
}

/**
 * Extract readable tag name from AEM tag ID
 * AEM tag IDs can be in formats like:
 * - content/cq:tags/namespace:tag
 * - namespace:tag
 * - tag (simple name)
 * @param {string} tagId - The AEM tag ID
 * @returns {string} The readable tag name
 */
function extractTagName(tagId) {
  // Remove leading/trailing whitespace
  let tagName = tagId.trim();
  if (!tagName) return '';

  // If tag ID contains a path separator, get the last part
  if (tagName.includes('/')) {
    const parts = tagName.split('/');
    tagName = parts[parts.length - 1];
  }

  // If tag ID contains namespace separator (:), get the part after the colon
  if (tagName.includes(':')) {
    const parts = tagName.split(':');
    tagName = parts[parts.length - 1];
  }

  // Return as-is if no special formatting
  return tagName;
}

/**
 * Read and parse the cq-tags meta tag content into an array of readable tag names
 * AEM automatically maps cq:tags to meta[name="cq-tags"] as comma-separated tag IDs
 * @returns {string[]}
 */
function getTags() {
  const meta = document.head.querySelector('meta[name="cq-tags"]');
  if (!meta) return [];
  const content = meta.getAttribute('content') || '';
  return content
    .split(',')
    .map((tagId) => extractTagName(tagId))
    .filter((tagName) => tagName.length > 0);
}

export default function decorate(block) {
  const tags = getTags();

  // Clear authored content; this block is data-driven from meta
  block.innerHTML = '';

  if (tags.length === 0) {
    block.style.display = 'none';
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'tags-wrapper';

  tags.forEach((word) => {
    wrapper.appendChild(createTag(word));
  });

  block.appendChild(wrapper);
}
