import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { isEditorMode as checkEditorMode, observeEditorMode } from '../../scripts/utils.js';

const CAROUSEL_CONFIG = {
  SLIDE_TRANSITION_DURATION: 500, // Smooth shifting animation
  AUTO_PLAY_INTERVAL: 6000, // 6 seconds when play button is pressed
  TOUCH_THRESHOLD: 50,
  RESIZE_DEBOUNCE_DELAY: 150, // Debounce resize events
  INTERACTION_RESTART_DELAY: 3000, // Restart autoplay after user interaction
  BREAKPOINTS: {
    MOBILE: 600,
    DESKTOP: 900,
  },
};

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Initialize carousel functionality
 * @param {HTMLElement} block - The carousel block element
 * @param {HTMLElement} track - The carousel track element
 * @param {number} slideCount - Number of slides
 * @param {Object} options - Configuration options
 */
function initializeCarousel(block, track, slideCount, options) {
  // State management
  let currentSlide = 0;
  let autoPlayTimer = null;
  let touchStartX = 0;
  let touchEndX = 0;
  let interactionTimeout = null;
  let isPlaying = true; // Default: autoplay enabled

  // Destructure options with defensive checks
  const {
    prevButton = null,
    nextButton = null,
    dotsContainer = null,
    playPauseButton = null,
  } = options;

  // Cache DOM queries for better performance
  const slides = track.querySelectorAll('.carousel-slide');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

  // Const selectors and patterns
  const selectors = {
    slide: '.carousel-slide',
    dot: '.carousel-dot',
  };

  const patterns = {
    nextSlide: () => (currentSlide + 1) % slideCount,
    prevSlide: () => (currentSlide === 0 ? slideCount - 1 : currentSlide - 1),
  };

  // Update carousel position with smooth animation
  function updateCarousel(slideIndex, animate = true) {
    currentSlide = slideIndex;
    const translateX = -currentSlide * 100;

    // Use will-change CSS property for better performance
    track.style.willChange = 'transform';

    // Add smooth shifting animation
    track.style.transition = animate
      ? `transform ${CAROUSEL_CONFIG.SLIDE_TRANSITION_DURATION}ms ease-in-out`
      : 'none';

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      track.style.transform = `translateX(${translateX}%)`;

      // Update active states using cached DOM elements
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update dots using cached elements
      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          if (index === currentSlide) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      // Remove will-change after animation completes
      if (animate) {
        setTimeout(() => {
          track.style.willChange = 'auto';
        }, CAROUSEL_CONFIG.SLIDE_TRANSITION_DURATION);
      } else {
        track.style.willChange = 'auto';
      }
    });

    // Update arrow states - no longer disable at ends for auto-loop
    if (prevButton) prevButton.disabled = false;
    if (nextButton) nextButton.disabled = false;
  }

  /**
   * Check if currently in editor mode (cached for performance)
   * @returns {boolean} True if in editor mode
   */
  const inEditorMode = () => checkEditorMode();

  // Auto-play functionality with auto-loop
  function startAutoPlay() {
    if (slideCount <= 1 || inEditorMode()) return;

    autoPlayTimer = setInterval(() => {
      // Auto-loop: go to next slide, or back to first if at the end
      updateCarousel(patterns.nextSlide());
    }, CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL);
  }

  function updatePlayPauseButton() {
    if (playPauseButton) {
      playPauseButton.setAttribute('aria-label', isPlaying ? 'Pause carousel' : 'Play carousel');
      playPauseButton.innerHTML = isPlaying
        ? '<span class="carousel-pause-icon">⏸</span>'
        : '<span class="carousel-play-icon">▶</span>';
    }
  }

  function stopAutoPlay(updateButton = true) {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    if (updateButton) {
      isPlaying = false;
      updatePlayPauseButton();
    }
  }

  // Listen for editor mode events
  block.addEventListener('carousel-pause', () => {
    stopAutoPlay(true);
  });

  block.addEventListener('carousel-resume', () => {
    // Only resume if not in editor mode
    if (isPlaying && slideCount > 1 && !inEditorMode()) {
      startAutoPlay();
    }
  });

  /**
   * Handle user interaction - pause and schedule restart
   */
  function handleInteraction() {
    stopAutoPlay(false);

    // Clear any existing restart timeout
    if (interactionTimeout) {
      clearTimeout(interactionTimeout);
      interactionTimeout = null;
    }

    // Schedule autoplay restart if it was playing and not in editor mode
    if (isPlaying && !inEditorMode()) {
      interactionTimeout = setTimeout(() => {
        startAutoPlay();
      }, CAROUSEL_CONFIG.INTERACTION_RESTART_DELAY);
    }
  }

  // Touch/swipe support - optimized
  function handleTouchStart(e) {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX = e.touches[0].clientX;
    handleInteraction();
  }

  function handleTouchEnd(e) {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > CAROUSEL_CONFIG.TOUCH_THRESHOLD) {
      if (swipeDistance > 0) {
        // Swipe left - next slide with auto-loop
        updateCarousel(patterns.nextSlide());
      } else {
        // Swipe right - previous slide with auto-loop
        updateCarousel(patterns.prevSlide());
      }
    }
  }

  // Event listeners with auto-loop support - optimized
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      handleInteraction();
      updateCarousel(patterns.prevSlide());
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      handleInteraction();
      updateCarousel(patterns.nextSlide());
    });
  }

  // Play/Pause button event listener
  if (playPauseButton) {
    playPauseButton.addEventListener('click', () => {
      if (isPlaying) {
        stopAutoPlay();
      } else {
        isPlaying = true;
        updatePlayPauseButton();
        startAutoPlay();
      }
    });
  }

  // Use event delegation for dots - more efficient
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains(selectors.dot.replace('.', ''))) {
        handleInteraction();
        const slideIndex = parseInt(e.target.dataset.slideIndex, 10);
        if (!Number.isNaN(slideIndex) && slideIndex >= 0 && slideIndex < slideCount) {
          updateCarousel(slideIndex);
        }
      }
    });
  }

  // Touch events
  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Keyboard navigation with auto-loop - optimized
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleInteraction();
      updateCarousel(patterns.prevSlide());
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleInteraction();
      updateCarousel(patterns.nextSlide());
    }
  });

  // Initialize
  updateCarousel(0, false); // No animation on initial load
  updatePlayPauseButton();

  // Check if we're in editor mode - if so, don't start autoplay
  const isEditorModeInitial = inEditorMode();

  // Start autoplay by default if multiple slides AND not in editor mode
  if (slideCount > 1 && !isEditorModeInitial) {
    isPlaying = true;
    startAutoPlay();
    updatePlayPauseButton();
  } else if (isEditorModeInitial) {
    // In editor mode, explicitly disable autoplay
    isPlaying = false;
    updatePlayPauseButton();
  }

  // Handle window resize with debouncing for better performance
  const handleResize = debounce(() => {
    // Maintain current position without animation during resize
    updateCarousel(currentSlide, false);
  }, CAROUSEL_CONFIG.RESIZE_DEBOUNCE_DELAY);

  window.addEventListener('resize', handleResize, { passive: true });

  // Intersection Observer for performance - pause when not visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Resume autoplay when carousel becomes visible (if it was playing and not in editor mode)
        if (isPlaying && !autoPlayTimer && slideCount > 1 && !inEditorMode()) {
          startAutoPlay();
        }
      } else if (isPlaying) {
        // Pause when carousel is not visible (don't update button state)
        stopAutoPlay(false);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '50px', // Start observing slightly before element enters viewport
  });

  observer.observe(block);

  // Observe editor mode changes and pause/resume accordingly
  const editorModeObserverCleanup = observeEditorMode((inEditor) => {
    if (inEditor) {
      // Entered editor mode - pause autoplay
      if (isPlaying && autoPlayTimer) {
        stopAutoPlay(false); // Don't update button state
      }
      return;
    }
    // Exited editor mode - resume autoplay if it was playing
    if (isPlaying && !autoPlayTimer && slideCount > 1) {
      startAutoPlay();
    }
  }, false); // Don't call on initial load, we already handle that below

  // Cleanup function for memory management
  const cleanup = () => {
    // Stop autoplay
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    // Clear interaction timeout
    if (interactionTimeout) {
      clearTimeout(interactionTimeout);
      interactionTimeout = null;
    }
    // Remove event listeners
    window.removeEventListener('resize', handleResize);
    // Disconnect observers
    observer.disconnect();
    // Cleanup editor mode observer
    if (editorModeObserverCleanup && typeof editorModeObserverCleanup === 'function') {
      editorModeObserverCleanup();
    }
  };

  // Store cleanup function for potential future use
  block.dataset.carouselCleanup = 'initialized';

  // Return cleanup function for manual cleanup if needed
  return cleanup;
}

export default function decorate(block) {
  // Defensive check - ensure block exists and has content
  if (!block || block.children.length === 0) return;

  const slides = [...block.children];

  // Check for variations
  const showDots = !block.classList.contains('no-dots');
  const showArrows = !block.classList.contains('no-arrows');

  // Create carousel container structure
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  const carouselTrack = document.createElement('div');
  carouselTrack.className = 'carousel-track';

  // Process slides
  slides.forEach((row, index) => {
    // Defensive check - ensure row exists
    if (!row) return;

    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.dataset.slideIndex = index;

    moveInstrumentation(row, slide);

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'carousel-slide-content';

    // Process each element in the row
    const elements = [...row.children];
    elements.forEach((element) => {
      // Defensive check - ensure element exists
      if (!element) return;

      // Handle images
      if (element.querySelector('picture')) {
        element.className = 'carousel-slide-image';
        slide.append(element);
      } else if (element.textContent && element.textContent.trim()) {
        // Determine if it's title or text based on content or position
        const isTitle = element.querySelector('h1, h2, h3, h4, h5, h6')
                       || elements.indexOf(element) === elements.findIndex((el) => el && !el.querySelector('picture'));

        if (isTitle) {
          const titleDiv = document.createElement('div');
          titleDiv.className = 'carousel-slide-content-title';
          titleDiv.innerHTML = element.innerHTML;
          moveInstrumentation(element, titleDiv);
          contentContainer.append(titleDiv);
        } else {
          const textDiv = document.createElement('div');
          textDiv.className = 'carousel-slide-content-text';
          textDiv.innerHTML = element.innerHTML;
          moveInstrumentation(element, textDiv);
          contentContainer.append(textDiv);
        }
      }
    });

    // Only append content container if it has children
    if (contentContainer.children.length > 0) {
      slide.append(contentContainer);
    }

    carouselTrack.append(slide);
  });

  // Optimize images - batch process for better performance
  const imagesToOptimize = carouselTrack.querySelectorAll('picture > img');
  imagesToOptimize.forEach((img) => {
    // Defensive check - ensure img exists and has src
    if (!img || !img.src) return;

    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ width: '750' }, { width: '1200' }],
    );
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    const pictureParent = img.closest('picture');
    if (pictureParent) {
      pictureParent.replaceWith(optimizedPic);
    }
  });

  // Create navigation arrows
  let prevButton;
  let nextButton;
  if (showArrows) {
    const arrowsContainer = document.createElement('div');
    arrowsContainer.className = 'carousel-arrows';

    prevButton = document.createElement('button');
    prevButton.className = 'carousel-arrow carousel-prev';
    prevButton.setAttribute('aria-label', 'Previous slide');
    prevButton.innerHTML = '<span class="carousel-arrow-icon"></span>';

    nextButton = document.createElement('button');
    nextButton.className = 'carousel-arrow carousel-next';
    nextButton.setAttribute('aria-label', 'Next slide');
    nextButton.innerHTML = '<span class="carousel-arrow-icon"></span>';

    arrowsContainer.append(prevButton, nextButton);
    carouselContainer.append(arrowsContainer);
  }

  // Create carousel controls (play/pause + dots)
  let controlsContainer;
  let playPauseButton;
  let dotsContainer;
  if (showDots && slides.length > 1) {
    controlsContainer = document.createElement('div');
    controlsContainer.className = 'carousel-controls';

    // Play/Pause button
    playPauseButton = document.createElement('button');
    playPauseButton.className = 'carousel-play-pause';
    playPauseButton.setAttribute('aria-label', 'Pause carousel'); // Default state is playing
    playPauseButton.innerHTML = '<span class="carousel-play-pause-icon"></span>';

    // Dots container
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';

    // Progress bar disabled - not creating progress bar elements

    // Dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.dataset.slideIndex = index;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dotsContainer.append(dot);
    });

    controlsContainer.append(playPauseButton, dotsContainer);
  }

  // Assemble carousel
  carouselContainer.append(carouselTrack);
  if (controlsContainer) carouselContainer.append(controlsContainer);

  // Replace block content
  block.textContent = '';
  block.append(carouselContainer);

  // Initialize carousel functionality (editor mode is checked inside)
  initializeCarousel(block, carouselTrack, slides.length, {
    prevButton,
    nextButton,
    dotsContainer,
    playPauseButton,
  });
}
