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
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  `;

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
