import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Configuration for AEM Experience Fragments
const AEM_XF_CONFIG = {
  enabled: true, // Set to false to use standard fragment behavior
  // For development: Use Author instance
  // For production: Use Publish instance
  authorUrl: 'https://author-p24706-e491522.adobeaemcloud.com',
  publishUrl: 'https://publish-p24706-e491522.adobeaemcloud.com',
  useDev: true, // Set to true for development (uses Author), false for production (uses Publish)
  xfPath: '/content/experience-fragments/wknd/language-masters/en/site/header/master'
};

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

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

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
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

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * Fetches Experience Fragment from AEM Publish
 * @returns {Promise<Element|null>} The XF content element
 */
async function fetchExperienceFragment() {
  // Check if user has overridden the XF path in metadata
  const customXfPath = getMetadata('header-xf-path');
  const xfPath = customXfPath || AEM_XF_CONFIG.xfPath;
  
  // Use Author for dev, Publish for production
  const baseUrl = AEM_XF_CONFIG.useDev ? AEM_XF_CONFIG.authorUrl : AEM_XF_CONFIG.publishUrl;
  
  // Construct the XF URL with .html extension
  const xfUrl = `${baseUrl}${xfPath}.html`;
  
  console.log(`Loading header from AEM XF (${AEM_XF_CONFIG.useDev ? 'AUTHOR/DEV' : 'PUBLISH/PROD'}): ${xfUrl}`);
  
  try {
    const response = await fetch(xfUrl, {
      credentials: 'include', // Include credentials for Author access
      headers: {
        'Accept': 'text/html'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch XF: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    console.log('XF HTML received, length:', html.length);
    
    // Extract the XF content - try multiple selectors
    let xfContent = doc.querySelector('.xf-content-height, .experiencefragment, .cmp-experiencefragment');
    
    if (!xfContent) {
      console.log('Primary selectors not found, trying body content...');
      // Fallback: try to get the main content area
      xfContent = doc.querySelector('main, .root, body > div');
    }
    
    if (!xfContent) {
      console.error('Could not find XF content in response');
      console.log('Available classes in body:', Array.from(doc.body.querySelectorAll('[class]')).map(el => el.className).slice(0, 10));
      console.log('Body structure:', doc.body.innerHTML.substring(0, 500));
      return null;
    }
    
    console.log('XF content found with selector:', xfContent.className || xfContent.tagName);
    console.log('XF content children:', xfContent.children.length);
    console.log('Experience Fragment loaded successfully');
    return xfContent;
    
  } catch (error) {
    console.error('Error loading Experience Fragment:', error);
    return null;
  }
}

/**
 * Processes and cleans the XF content for EDS
 * @param {Element} xfContent - The XF content element
 * @returns {Element} Processed content
 */
function processXfContent(xfContent) {
  const content = xfContent.cloneNode(true);
  
  // Determine base URL for fixing paths
  const baseUrl = AEM_XF_CONFIG.useDev ? AEM_XF_CONFIG.authorUrl : AEM_XF_CONFIG.publishUrl;
  
  // Fix image paths - convert AEM DAM paths to full URLs
  content.querySelectorAll('img[src^="/content/dam"]').forEach(img => {
    img.src = `${baseUrl}${img.src}`;
  });
  
  // Fix relative image paths
  content.querySelectorAll('img[src^="/"]').forEach(img => {
    if (!img.src.startsWith('http')) {
      img.src = `${baseUrl}${img.src}`;
    }
  });
  
  // Fix link paths - convert AEM content paths to EDS paths
  content.querySelectorAll('a[href^="/content/"]').forEach(link => {
    const href = link.getAttribute('href');
    
    // For WKND links
    if (href.startsWith('/content/wknd/')) {
      const edsPath = href
        .replace('/content/wknd/us/en', '')
        .replace('/content/wknd/language-masters/en', '')
        .replace('.html', '');
      link.setAttribute('href', edsPath || '/');
    } else {
      // For other content paths
      const edsPath = href.replace('/content/ue-multitenant-root', '').replace('.html', '');
      link.setAttribute('href', edsPath || '/');
    }
  });
  
  return content;
}

/**
 * Decorates the nav sections for EDS compatibility
 * @param {Element} nav The nav element
 */
function decorateNavSections(nav) {
  const navSections = nav.querySelector('.nav-sections, nav ul, .cmp-navigation__group');
  
  if (!navSections) {
    console.warn('No nav sections found');
    return;
  }
  
  // Ensure it has the right class
  if (!navSections.classList.contains('nav-sections')) {
    navSections.classList.add('nav-sections');
  }
  
  // Look for list items that might be dropdowns
  const listItems = navSections.querySelectorAll('li');
  listItems.forEach((navSection) => {
    if (navSection.querySelector('ul')) {
      navSection.classList.add('nav-drop');
    }
    
    navSection.addEventListener('click', () => {
      if (isDesktop.matches) {
        const expanded = navSection.getAttribute('aria-expanded') === 'true';
        toggleAllNavSections(navSections);
        navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      }
    });
  });
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  let fragment;
  
  // Check if XF integration is enabled and metadata doesn't override it
  const useStandardFragment = getMetadata('use-standard-nav') === 'true';
  
  if (AEM_XF_CONFIG.enabled && !useStandardFragment) {
    console.log('Loading header from AEM Experience Fragment');
    
    // Try to fetch from Experience Fragment
    const xfContent = await fetchExperienceFragment();
    
    if (xfContent) {
      // Process the XF content
      fragment = processXfContent(xfContent);
    } else {
      console.warn('Failed to load XF, falling back to standard fragment');
      // Fallback to standard fragment loading
      const navMeta = getMetadata('nav');
      const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
      fragment = await loadFragment(navPath);
    }
  } else {
    console.log('Loading header from standard fragment');
    // Standard fragment loading
    const navMeta = getMetadata('nav');
    const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
    fragment = await loadFragment(navPath);
  }
  
  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  
  if (fragment) {
    while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  }

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) {
    const brandLink = navBrand.querySelector('.button');
    if (brandLink) {
      brandLink.className = '';
      brandLink.closest('.button-container').className = '';
    }
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  } else {
    // If standard nav sections not found, try to decorate what we have from XF
    decorateNavSections(nav);
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections || nav.querySelector('.nav-sections')));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  
  // prevent mobile nav behavior on window resize
  const finalNavSections = navSections || nav.querySelector('.nav-sections');
  if (finalNavSections) {
    toggleMenu(nav, finalNavSections, isDesktop.matches);
    isDesktop.addEventListener('change', () => toggleMenu(nav, finalNavSections, isDesktop.matches));
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
