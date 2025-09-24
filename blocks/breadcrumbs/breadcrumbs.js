/**
 * Gets the meta title of the current page
 * @returns {string} The page title
 */
function getCurrentPageTitle() {
  const metaTitle = document.querySelector('meta[property="og:title"]');
  return metaTitle ? metaTitle.content : document.title;
}

/**
 * Converts URL segment to readable label
 * @param {string} segment The URL segment
 * @returns {string} Human readable label
 */
function getReadableLabel(segment) {
  // Remove any IDs or special characters (e.g., pfdsfs94394)
  const cleanSegment = segment.replace(/[0-9]+$/, '').replace(/-/g, ' ').trim();
  // Capitalize first letter of each word
  return cleanSegment.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates a breadcrumb link element
 * @param {string} href The link URL
 * @param {string} label The link text
 * @param {boolean} isCurrent Whether this is the current page
 * @returns {HTMLElement} The link element
 */
function createBreadcrumbLink(href, label, isCurrent = false) {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;

  if (isCurrent) {
    link.setAttribute('aria-current', 'page');
  }

  return link;
}

/**
 * Decorates the breadcrumbs block
 * @param {HTMLElement} block The breadcrumbs block element
 */
export default function decorate(block) {
  // Create nav element with proper ARIA role
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.setAttribute('role', 'navigation');

  // Create ordered list for breadcrumbs
  const list = document.createElement('ol');

  // Get current path segments
  const pathSegments = window.location.pathname.split('/');

  // Remove empty segments and locale identifiers (e.g., com-en)
  const validSegments = pathSegments.filter((segment) => segment && !segment.match(/^[a-z]{2}-[a-z]{2}$/i));

  // Create home link
  const homeLi = document.createElement('li');
  homeLi.appendChild(createBreadcrumbLink('/', 'Homepage'));
  list.appendChild(homeLi);

  // Build path progressively
  let currentPath = '';
  validSegments.forEach((segment, index) => {
    const isLast = index === validSegments.length - 1;
    currentPath += `/${segment}`;

    const li = document.createElement('li');
    const label = isLast ? getCurrentPageTitle() : getReadableLabel(segment);
    li.appendChild(createBreadcrumbLink(currentPath, label, isLast));
    list.appendChild(li);
  });

  nav.appendChild(list);
  block.appendChild(nav);
}
