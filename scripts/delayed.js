/**
 * Creates and manages the back to top button
 */
function createBackToTopButton() {
  // Create the button element
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  button.setAttribute('title', 'Back to top');

  // Add the up arrow icon
  const icon = document.createElement('img');
  icon.src = `${window.hlx.codeBasePath}/icons/arrow-up.svg`;
  icon.alt = 'Back to top';
  icon.style.filter = 'brightness(0) invert(1)'; // Makes the SVG white
  icon.style.width = '24px';
  icon.style.height = '24px';
  button.appendChild(icon);

  // Add click event listener
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Add keyboard support
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  });

  // Append to body
  document.body.appendChild(button);

  // Show/hide button based on scroll position
  const toggleButtonVisibility = () => {
    const scrollThreshold = 300; // Show button after scrolling 300px

    if (window.scrollY > scrollThreshold) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  };

  // Initial check
  toggleButtonVisibility();

  // Listen to scroll events with throttling for better performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
      toggleButtonVisibility();
    });
  }, { passive: true });
}

// Initialize back to top button
createBackToTopButton();
