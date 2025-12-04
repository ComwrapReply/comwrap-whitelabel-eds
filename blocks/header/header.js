import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Configuration for AEM Experience Fragments
const AEM_XF_CONFIG = {
  enabled: true,
  authorUrl: 'https://author-p24706-e491522.adobeaemcloud.com',
  publishUrl: 'https://publish-p24706-e491522.adobeaemcloud.com',
  useDev: true,
  xfPath: '/content/experience-fragments/wknd/language-masters/en/site/header/master',
};

// Media query for desktop/mobile detection
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Closes expanded navigation on Escape key
 * @param {KeyboardEvent} e - The keyboard event
 */
function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

/**
 * Closes expanded navigation on focus loss
 * @param {FocusEvent} e - The focus event
 */
function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

/**
 * Opens navigation on keyboard interaction
 * @param {KeyboardEvent} e - The keyboard event
 */
function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

/**
 * Adds keyboard listener to focused nav section
 */
function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections - The container element
 * @param {Boolean} expanded - Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav - The container element
 * @param {Element} navSections - The nav sections within the container element
 * @param {*} forceExpanded - Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? !forceExpanded
    : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  // Enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // Enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * Fetches Experience Fragment from AEM
 * @returns {Promise<Element|null>} The XF content element
 */
async function fetchExperienceFragment() {
  const customXfPath = getMetadata('header-xf-path');
  const xfPath = customXfPath || AEM_XF_CONFIG.xfPath;
  const baseUrl = AEM_XF_CONFIG.useDev ? AEM_XF_CONFIG.authorUrl : AEM_XF_CONFIG.publishUrl;
  const xfUrl = `${baseUrl}${xfPath}.html`;

  try {
    const response = await fetch(xfUrl, {
      credentials: 'include',
      headers: { Accept: 'text/html' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch XF: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Try multiple selectors to find XF content
    const selectors = [
      '.cmp-container .aem-Grid .responsivegrid.container',
      '.cmp-container .aem-Grid',
      '.cmp-container',
      '.aem-Grid',
    ];

    const xfContent = selectors.reduce((found, selector) => {
      if (found) return found;
      return doc.querySelector(selector);
    }, null);

    // Fallback: try body > div with children
    if (!xfContent) {
      const bodyDivs = Array.from(doc.body.querySelectorAll(':scope > div'));
      const foundDiv = bodyDivs.find((div) => div.children.length > 0);
      return foundDiv || null;
    }

    return xfContent;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading Experience Fragment:', error);
    return null;
  }
}

/**
 * Extracts content path from navigation or XF path
 * @param {Element} content - The content element
 * @returns {string} The content path
 */
function extractContentPath(content) {
  const navGroup = content.querySelector('.cmp-navigation__group');

  if (navGroup) {
    const firstNavLink = navGroup.querySelector('a[href*="/content/"]');
    if (firstNavLink) {
      const href = firstNavLink.getAttribute('href');
      const pathMatch = href.match(/(\/content\/[^/]+\/language-masters\/[^/]+)/);
      if (pathMatch) {
        return pathMatch[1];
      }
    }
  }

  // Fallback: extract from XF path
  const { xfPath } = AEM_XF_CONFIG;
  const langMatch = xfPath.match(/\/language-masters\/([a-z]{2})\//);
  const lang = langMatch ? langMatch[1] : 'en';
  return `/content/wknd/language-masters/${lang}`;
}

/**
 * Fixes image paths to use absolute URLs
 * @param {Element} content - The content element
 * @param {string} baseUrl - The base URL
 */
function fixImagePaths(content, baseUrl) {
  content.querySelectorAll('img[src^="/"]').forEach((img) => {
    if (!img.src.startsWith('http')) {
      img.src = `${baseUrl}${img.src}`;
    }
  });
}

/**
 * Fixes navigation links to use absolute URLs
 * @param {Element} content - The content element
 * @param {string} baseUrl - The base URL
 * @param {string} contentPath - The content path
 */
function fixNavigationLinks(content, baseUrl, contentPath) {
  const links = content.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href');

    if (!href
        || href.startsWith('http')
        || href.startsWith('#')
        || href.startsWith('mailto:')
        || href.startsWith('//')) {
      return;
    }

    if (href.startsWith('/content/')) {
      link.setAttribute('href', `${baseUrl}${href}`);
    } else if (href.startsWith('/')) {
      link.setAttribute('href', `${baseUrl}${contentPath}${href}.html`);
    }
  });
}

/**
 * Filters navigation to show only nested items
 * @param {Element} content - The content element
 */
function filterNavigation(content) {
  const navigation = content.querySelector('.cmp-navigation');
  if (!navigation) return;

  const mainNavGroup = navigation.querySelector(':scope > ul.cmp-navigation__group');
  if (!mainNavGroup) return;

  const level0Items = mainNavGroup.querySelectorAll(':scope > li.cmp-navigation__item--level-0');

  level0Items.forEach((level0Item) => {
    const nestedNavGroup = level0Item.querySelector(':scope > ul.cmp-navigation__group');

    if (nestedNavGroup) {
      const level1Items = nestedNavGroup.querySelectorAll(':scope > li.cmp-navigation__item--level-1');

      // Remove parent link
      const parentLink = level0Item.querySelector(':scope > a');
      if (parentLink) {
        parentLink.remove();
      }

      // Promote level-1 items to main navigation
      level1Items.forEach((level1Item) => {
        const clonedItem = level1Item.cloneNode(true);
        mainNavGroup.insertBefore(clonedItem, level0Item);
      });

      level0Item.remove();
    }
  });
}

/**
 * Processes and cleans the XF content for EDS
 * @param {Element} xfContent - The XF content element
 * @returns {Element} Processed content
 */
function processXfContent(xfContent) {
  const content = xfContent.cloneNode(true);
  const baseUrl = AEM_XF_CONFIG.useDev ? AEM_XF_CONFIG.authorUrl : AEM_XF_CONFIG.publishUrl;

  // Extract content path
  const contentPath = extractContentPath(content);

  // Fix paths
  fixImagePaths(content, baseUrl);
  fixNavigationLinks(content, baseUrl, contentPath);

  // Filter navigation structure
  filterNavigation(content);

  return content;
}

/**
 * Decorates nav sections for EDS compatibility
 * @param {Element} nav - The nav element
 */
function decorateNavSections(nav) {
  const selectors = ['.cmp-navigation', '.navigation', '.nav-sections', 'nav ul'];
  const navSections = selectors.reduce((found, selector) => {
    if (found) return found;
    return nav.querySelector(selector);
  }, null);

  if (!navSections) {
    return;
  }

  let sections = navSections;

  // Wrap in nav-sections if needed
  if (!navSections.classList.contains('nav-sections')) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('nav-sections');
    navSections.parentNode.insertBefore(wrapper, navSections);
    wrapper.appendChild(navSections);
    sections = wrapper;
  }

  // Add nav-drop class and click handlers
  const listItems = sections.querySelectorAll('li');

  listItems.forEach((item) => {
    if (item.querySelector('ul')) {
      item.classList.add('nav-drop');
    }

    item.addEventListener('click', () => {
      if (isDesktop.matches) {
        const expanded = item.getAttribute('aria-expanded') === 'true';
        toggleAllNavSections(sections);
        item.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      }
    });
  });
}

/**
 * Loads fragment from XF or standard source
 * @returns {Promise<Element|null>} The fragment element
 */
async function loadHeaderFragment() {
  const useStandardFragment = getMetadata('use-standard-nav') === 'true';

  if (AEM_XF_CONFIG.enabled && !useStandardFragment) {
    const xfContent = await fetchExperienceFragment();

    if (xfContent) {
      return processXfContent(xfContent);
    }
  }

  // Load standard fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  return loadFragment(navPath);
}

/**
 * Applies nav classes to children
 * @param {Element} nav - The nav element
 */
function applyNavClasses(nav) {
  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((className, index) => {
    const section = nav.children[index];
    if (section) {
      section.classList.add(`nav-${className}`);
    }
  });
}

/**
 * Cleans brand section
 * @param {Element} nav - The nav element
 */
function cleanBrandSection(nav) {
  const navBrand = nav.querySelector('.nav-brand');
  if (!navBrand) return;

  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    const buttonContainer = brandLink.closest('.button-container');
    if (buttonContainer) {
      buttonContainer.className = '';
    }
  }
}

/**
 * Decorates standard nav sections
 * @param {Element} navSections - The nav sections element
 */
function decorateStandardNavSections(navSections) {
  navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((item) => {
    if (item.querySelector('ul')) {
      item.classList.add('nav-drop');
    }

    item.addEventListener('click', () => {
      if (isDesktop.matches) {
        const expanded = item.getAttribute('aria-expanded') === 'true';
        toggleAllNavSections(navSections);
        item.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      }
    });
  });
}

/**
 * Creates mobile hamburger menu
 * @param {Element} nav - The nav element
 * @param {Element} navSections - The nav sections element
 * @returns {Element} The hamburger element
 */
function createHamburger(nav, navSections) {
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
    <span class="nav-hamburger-icon"></span>
  </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  return hamburger;
}

/**
 * Loads and decorates the header
 * @param {Element} block - The header block element
 */
export default async function decorate(block) {
  const fragment = await loadHeaderFragment();

  // Create nav element
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';

  // Append fragment children
  if (fragment) {
    while (fragment.firstElementChild) {
      nav.append(fragment.firstElementChild);
    }
  }

  // Apply nav classes
  applyNavClasses(nav);
  cleanBrandSection(nav);

  // Decorate nav sections
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    decorateStandardNavSections(navSections);
  } else {
    decorateNavSections(nav);
  }

  // Add hamburger menu
  const finalNavSections = navSections || nav.querySelector('.nav-sections');
  if (finalNavSections) {
    const hamburger = createHamburger(nav, finalNavSections);
    nav.prepend(hamburger);
    nav.setAttribute('aria-expanded', 'false');

    // Handle desktop/mobile toggle
    toggleMenu(nav, finalNavSections, isDesktop.matches);
    isDesktop.addEventListener('change', () => toggleMenu(nav, finalNavSections, isDesktop.matches));
  }

  // Wrap and append
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
