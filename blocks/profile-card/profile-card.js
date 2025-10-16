/**
 * Profile Card block implementation
 * Creates a professional profile card with image, name, title, and contact information
 * Based on Figma design with responsive layout and accessibility features
 */

/**
 * Extract block options from classes field
 * @param {HTMLElement} block - The block DOM element
 * @returns {Object} Object containing block options
 */
function extractBlockOptions(block) {
  const options = {
    variant: '',
  };

  // Find the classes field in the block structure
  const rows = Array.from(block.children);
  rows.forEach((row) => {
    const textContent = row.textContent?.trim();
    if (textContent && (textContent === 'compact' || textContent === 'centered' || textContent === 'card')) {
      options.variant = textContent;
    }
  });

  return options;
}

/**
 * Apply block options as CSS classes to the block element
 * @param {HTMLElement} block - The block DOM element
 * @param {Object} options - Block options object
 */
function applyBlockOptions(block, options) {
  if (options.variant) {
    block.classList.add(options.variant);
  }
}

/**
 * Add semantic CSS classes to profile card elements
 * @param {HTMLElement} wrapper - The profile card wrapper element
 */
function addSemanticClasses(wrapper) {
  const imageContainer = wrapper.querySelector('.profile-card-image');
  const contentContainer = wrapper.querySelector('.profile-card-content');
  const nameElement = wrapper.querySelector('.profile-card-name');
  const titleElement = wrapper.querySelector('.profile-card-title');
  const contactContainer = wrapper.querySelector('.profile-card-contact');

  // Add additional semantic classes for styling
  if (imageContainer) {
    imageContainer.classList.add('profile-image-container');
  }
  
  if (contentContainer) {
    contentContainer.classList.add('profile-content-container');
  }
  
  if (nameElement) {
    nameElement.classList.add('profile-name-heading');
  }
  
  if (titleElement) {
    titleElement.classList.add('profile-title-text');
  }
  
  if (contactContainer) {
    contactContainer.classList.add('profile-contact-info');
  }
}

/**
 * Add accessibility features to the profile card
 * @param {HTMLElement} wrapper - The profile card wrapper element
 */
function addAccessibilityFeatures(wrapper) {
  // Add ARIA labels and roles
  const image = wrapper.querySelector('img');
  if (image && !image.getAttribute('aria-label')) {
    const altText = image.getAttribute('alt');
    if (altText) {
      image.setAttribute('aria-label', `Profile photo of ${altText}`);
    }
  }

  // Add semantic roles
  const nameElement = wrapper.querySelector('.profile-card-name');
  if (nameElement) {
    nameElement.setAttribute('role', 'heading');
    nameElement.setAttribute('aria-level', '2');
  }

  // Make email and phone links accessible
  const emailLink = wrapper.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.setAttribute('aria-label', `Send email to ${emailLink.textContent}`);
  }

  const phoneLink = wrapper.querySelector('a[href^="tel:"]');
  if (phoneLink) {
    phoneLink.setAttribute('aria-label', `Call ${phoneLink.textContent}`);
  }
}

/**
 * Create contact link elements
 * @param {string} phone - Phone number
 * @param {string} email - Email address
 * @returns {HTMLElement} Contact container element
 */
function createContactElements(phone, email) {
  const contactDiv = document.createElement('div');
  contactDiv.className = 'profile-card-contact';

  if (phone) {
    const phoneElement = document.createElement('p');
    phoneElement.className = 'profile-card-phone';
    phoneElement.textContent = phone;
    contactDiv.appendChild(phoneElement);
  }

  if (email) {
    const emailElement = document.createElement('p');
    emailElement.className = 'profile-card-email';
    
    const emailLink = document.createElement('a');
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
    emailLink.className = 'profile-email-link';
    
    emailElement.appendChild(emailLink);
    contactDiv.appendChild(emailElement);
  }

  return contactDiv;
}

/**
 * Main decoration function for profile-card block
 * @param {HTMLElement} block - The block DOM element
 */
export default async function decorate(block) {
  // Extract block options and apply them
  const blockOptions = extractBlockOptions(block);
  applyBlockOptions(block, blockOptions);

  // Extract content from block structure
  const [
    imageRow,
    imageAltRow,
    nameRow,
    titleRow,
    phoneRow,
    emailRow,
  ] = Array.from(block.children);

  // Extract values and clean up
  const image = imageRow?.querySelector('picture') || imageRow?.querySelector('img');
  const imageAlt = imageAltRow?.textContent?.trim() || '';
  const name = nameRow?.textContent?.trim() || '';
  const jobTitle = titleRow?.textContent?.trim() || '';
  const phone = phoneRow?.textContent?.trim() || '';
  const email = emailRow?.textContent?.trim() || '';

  // Clear the block content
  block.textContent = '';

  // Create the profile card structure
  const wrapper = document.createElement('div');
  wrapper.className = 'profile-card-wrapper';

  // Create image container
  const imageDiv = document.createElement('div');
  imageDiv.className = 'profile-card-image';

  if (image) {
    // Set alt text if provided
    const img = image.querySelector ? image.querySelector('img') : image;
    if (img && imageAlt) {
      img.alt = imageAlt;
    }
    imageDiv.appendChild(image);
  } else {
    // Create placeholder image if no image provided
    const placeholderImg = document.createElement('img');
    placeholderImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjIyMCIgdmlld0JveD0iMCAwIDIyMCAyMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMjAiIGhlaWdodD0iMjIwIiBmaWxsPSIjRjdGNkY1Ii8+CjxjaXJjbGUgY3g9IjExMCIgY3k9IjkwIiByPSIzMCIgZmlsbD0iIzc3NzY3MyIvPgo8cGF0aCBkPSJNNzAgMTcwQzc5IDE0NSAxMDAgMTMwIDExMCAxMzBDMTIwIDEzMCAxNDEgMTQ1IDE1MCAxNzBINzBaIiBmaWxsPSIjNzc3NjczIi8+Cjwvc3ZnPgo=';
    placeholderImg.alt = imageAlt || 'Profile placeholder';
    placeholderImg.className = 'profile-placeholder';
    imageDiv.appendChild(placeholderImg);
  }

  // Create content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'profile-card-content';

  // Create name and title container
  const nameContainer = document.createElement('div');
  nameContainer.className = 'profile-card-info';

  if (name) {
    const nameElement = document.createElement('h2');
    nameElement.className = 'profile-card-name';
    nameElement.textContent = name;
    nameContainer.appendChild(nameElement);
  }

  if (jobTitle) {
    const titleElement = document.createElement('p');
    titleElement.className = 'profile-card-title';
    titleElement.textContent = jobTitle;
    nameContainer.appendChild(titleElement);
  }

  contentDiv.appendChild(nameContainer);

  // Create contact information
  if (phone || email) {
    const contactElements = createContactElements(phone, email);
    contentDiv.appendChild(contactElements);
  }

  // Assemble the profile card
  wrapper.appendChild(imageDiv);
  wrapper.appendChild(contentDiv);
  block.appendChild(wrapper);

  // Add semantic classes and accessibility features
  addSemanticClasses(wrapper);
  addAccessibilityFeatures(wrapper);
}
