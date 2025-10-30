/**
 * Tags block
 * Renders page tags (meta[name="tags"]) as small blue tags.
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
 * Read and parse the meta tags content into an array of strings
 * @returns {string[]}
 */
function getTags() {
  const meta = document.head.querySelector('meta[name="tags"]');
  if (!meta) return [];
  const content = meta.getAttribute('content') || '';
  return content
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
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
