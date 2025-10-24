import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const CAROUSEL_CONFIG = {
  SLIDE_TRANSITION_DURATION: 500, // Smooth shifting animation
  AUTO_PLAY_INTERVAL: 6000, // 6 seconds when play button is pressed
  TOUCH_THRESHOLD: 50,
  BREAKPOINTS: {
    MOBILE: 600,
    DESKTOP: 900,
  },
};

/**
 * Initialize carousel functionality
 * @param {HTMLElement} block - The carousel block element
 * @param {HTMLElement} track - The carousel track element
 * @param {number} slideCount - Number of slides
 * @param {Object} options - Configuration options
 */
function initializeCarousel(block, track, slideCount, options) {
  let currentSlide = 0;
  let autoPlayTimer;
  let touchStartX = 0;
  let touchEndX = 0;

  const {
    prevButton,
    nextButton,
    dotsContainer,
    playPauseButton,
  } = options;
  let isPlaying = false; // Default: no autoplay

  // Update carousel position with smooth animation
  function updateCarousel(slideIndex, animate = true) {
    currentSlide = slideIndex;
    const translateX = -currentSlide * 100;

    // Add smooth shifting animation
    if (animate) {
      track.style.transition = `transform ${CAROUSEL_CONFIG.SLIDE_TRANSITION_DURATION}ms ease-in-out`;
    } else {
      track.style.transition = 'none';
    }

    track.style.transform = `translateX(${translateX}%)`;

    // Update active states
    track.querySelectorAll('.carousel-slide').forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    // Update arrow states - no longer disable at ends for auto-loop
    if (prevButton) prevButton.disabled = false;
    if (nextButton) nextButton.disabled = false;
  }

  // Auto-play functionality with auto-loop
  function startAutoPlay() {
    if (slideCount <= 1) return;

    autoPlayTimer = setInterval(() => {
      // Auto-loop: go to next slide, or back to first if at the end
      const nextIndex = (currentSlide + 1) % slideCount;
      updateCarousel(nextIndex);
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

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    isPlaying = false;
    updatePlayPauseButton();
  }

  // Touch/swipe support
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    stopAutoPlay();
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > CAROUSEL_CONFIG.TOUCH_THRESHOLD) {
      if (swipeDistance > 0) {
        // Swipe left - next slide with auto-loop
        const nextIndex = (currentSlide + 1) % slideCount;
        updateCarousel(nextIndex);
      } else if (swipeDistance < 0) {
        // Swipe right - previous slide with auto-loop
        const prevIndex = currentSlide === 0 ? slideCount - 1 : currentSlide - 1;
        updateCarousel(prevIndex);
      }
    }

    if (isPlaying) {
      setTimeout(() => {
        startAutoPlay();
        isPlaying = true;
        updatePlayPauseButton();
      }, 1000); // Restart auto-play after 1 second
    }
  }

  // Event listeners with auto-loop support
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      stopAutoPlay();
      // Previous slide with auto-loop
      const prevIndex = currentSlide === 0 ? slideCount - 1 : currentSlide - 1;
      updateCarousel(prevIndex);
      if (isPlaying) {
        setTimeout(() => {
          startAutoPlay();
          isPlaying = true;
          updatePlayPauseButton();
        }, 3000);
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      stopAutoPlay();
      // Next slide with auto-loop
      const nextIndex = (currentSlide + 1) % slideCount;
      updateCarousel(nextIndex);
      if (isPlaying) {
        setTimeout(() => {
          startAutoPlay();
          isPlaying = true;
          updatePlayPauseButton();
        }, 3000);
      }
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

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-dot')) {
        stopAutoPlay();
        const slideIndex = parseInt(e.target.dataset.slideIndex, 10);
        updateCarousel(slideIndex);
        if (isPlaying) {
          setTimeout(() => {
            startAutoPlay();
            isPlaying = true;
            updatePlayPauseButton();
          }, 3000);
        }
      }
    });
  }

  // Touch events
  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Keyboard navigation with auto-loop
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoPlay();
      // Previous slide with auto-loop
      const prevIndex = currentSlide === 0 ? slideCount - 1 : currentSlide - 1;
      updateCarousel(prevIndex);
      if (isPlaying) {
        setTimeout(() => {
          startAutoPlay();
          isPlaying = true;
          updatePlayPauseButton();
        }, 3000);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoPlay();
      // Next slide with auto-loop
      const nextIndex = (currentSlide + 1) % slideCount;
      updateCarousel(nextIndex);
      if (isPlaying) {
        setTimeout(() => {
          startAutoPlay();
          isPlaying = true;
          updatePlayPauseButton();
        }, 3000);
      }
    }
  });

  // Initialize
  updateCarousel(0, false); // No animation on initial load
  updatePlayPauseButton();

  // No autoplay by default - user must press play button

  // Handle window resize
  const handleResize = () => {
    // Maintain current position without animation during resize
    updateCarousel(currentSlide, false);
  };

  window.addEventListener('resize', handleResize);

  // Intersection Observer for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && isPlaying) {
        // Pause when carousel is not visible
        stopAutoPlay();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(block);
}

export default function decorate(block) {
  const slides = [...block.children];

  if (slides.length === 0) return;

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
      // Handle images
      if (element.querySelector('picture')) {
        element.className = 'carousel-slide-image';
        slide.append(element);
      } else if (element.textContent.trim()) {
        // Determine if it's title or text based on content or position
        const isTitle = element.querySelector('h1, h2, h3, h4, h5, h6')
                       || elements.indexOf(element) === elements.findIndex((el) => !el.querySelector('picture'));

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

  // Optimize images
  carouselTrack.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ width: '750' }, { width: '1200' }],
    );
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
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
    playPauseButton.setAttribute('aria-label', 'Play carousel');
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

  // Initialize carousel functionality
  initializeCarousel(block, carouselTrack, slides.length, {
    prevButton,
    nextButton,
    dotsContainer,
    playPauseButton,
  });
}
