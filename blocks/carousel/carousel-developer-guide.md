# Carousel Block - Developer Guide

## Overview

The Carousel block is a responsive, touch-enabled component for AEM Edge Delivery Services that displays a series of slides with images and content. It includes navigation arrows, dot indicators, play/pause controls, and full Universal Editor integration.

---

## Table of Contents

1. [Technical Architecture](#technical-architecture)
2. [File Structure](#file-structure)
3. [Configuration](#configuration)
4. [Core Functions](#core-functions)
5. [Universal Editor Integration](#universal-editor-integration)
6. [Performance Optimization](#performance-optimization)
7. [Browser Support](#browser-support)
8. [Accessibility Implementation](#accessibility-implementation)
9. [API Reference](#api-reference)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Technical Architecture

### Technology Stack

- **CSS Transforms**: Hardware-accelerated slide transitions
- **Intersection Observer API**: Visibility-based autoplay optimization
- **Touch Events API**: Swipe gesture support
- **MutationObserver API**: Universal Editor mode detection
- **Passive Event Listeners**: Scroll performance optimization
- **RequestAnimationFrame**: Smooth animation rendering

### Dependencies

```javascript
// Required imports
import { decorateIcons } from '../../scripts/aem.js';
import { sampleRUM } from '../../scripts/scripts.js';
import { isEditorMode, observeEditorMode } from '../../scripts/utils.js';
```

### State Management

The carousel maintains state through closure variables:

```javascript
let currentSlide = 0;           // Current slide index
let isPlaying = true;           // Autoplay state
let autoPlayTimer = null;       // Autoplay interval ID
let interactionTimeout = null;  // User interaction timeout ID
```

---

## File Structure

```
blocks/carousel/
├── _carousel.json          # Block definition and content model
├── carousel.js             # Core JavaScript functionality
├── carousel.css            # Styling and visual presentation
└── README.md              # This documentation
```

### Block Definition (_carousel.json)

```json
{
  "definitions": [
    {
      "title": "Carousel",
      "id": "carousel",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Carousel",
              "model": "carousel"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "carousel",
      "fields": [
        {
          "component": "container",
          "name": "slides",
          "label": "Slides",
          "multi": true
        }
      ]
    }
  ]
}
```

---

## Configuration

### Carousel Configuration Object

All timing and threshold values are centralized in `CAROUSEL_CONFIG`:

```javascript
const CAROUSEL_CONFIG = {
  // Animation and timing
  SLIDE_TRANSITION_DURATION: 500,    // Slide transition animation (ms)
  AUTO_PLAY_INTERVAL: 6000,          // Time between auto-advances (ms)
  INTERACTION_RESTART_DELAY: 3000,   // Delay before autoplay resumes (ms)
  
  // Touch and interaction
  TOUCH_THRESHOLD: 50,                // Minimum swipe distance (px)
  
  // Performance
  RESIZE_DEBOUNCE_DELAY: 150,        // Resize event debounce (ms)
  
  // Responsive breakpoints
  BREAKPOINTS: {
    MOBILE: 600,                      // Max width for mobile (px)
    DESKTOP: 900,                     // Min width for desktop (px)
  },
};
```

### Customizing Configuration

To modify default values, update `CAROUSEL_CONFIG` before initialization:

```javascript
// Example: Slower transitions and longer autoplay
CAROUSEL_CONFIG.SLIDE_TRANSITION_DURATION = 800;
CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL = 10000;
```

### CSS Custom Properties

```css
:root {
  --primary-color: #0063be;      /* Active indicators, focus states */
  --background-color: #fff;       /* Slide backgrounds */
  --heading-color: #333;          /* Slide titles */
  --text-color: #666;             /* Slide descriptions */
  --focus-color: #005ce6;         /* Focus outline color */
}
```

Override in your project's CSS:

```css
.carousel {
  --primary-color: #ff6b35;
  --heading-color: #2d3748;
}
```

---

## Core Functions

### Main Export Function

```javascript
/**
 * Decorates the carousel block
 * @param {Element} block - The carousel block element
 */
export default async function decorate(block) {
  // Extract variation options from block classes
  const options = {
    hideArrows: block.classList.contains('no-arrows'),
    hideDots: block.classList.contains('no-dots'),
  };

  // Build carousel structure
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';
  
  const track = document.createElement('div');
  track.className = 'carousel-track';
  
  // Process slides...
  
  // Initialize carousel functionality
  initializeCarousel(block, track, slideCount, options);
}
```

### initializeCarousel()

Main initialization function that sets up all carousel functionality:

```javascript
/**
 * Initialize carousel with all interactive features
 * @param {Element} block - Carousel block element
 * @param {Element} track - Carousel track element
 * @param {number} slideCount - Total number of slides
 * @param {Object} options - Configuration options
 */
function initializeCarousel(block, track, slideCount, options) {
  // Cache DOM queries
  const prevButton = block.querySelector('.carousel-prev');
  const nextButton = block.querySelector('.carousel-next');
  const dots = block.querySelectorAll('.carousel-dot');
  const playPauseButton = block.querySelector('.carousel-play-pause');
  const slides = track.querySelectorAll('.carousel-slide');

  // State management
  let currentSlide = 0;
  let isPlaying = true;
  let autoPlayTimer = null;
  let interactionTimeout = null;

  // Touch handling
  let touchStartX = 0;
  let touchEndX = 0;

  // Core functions defined here...
  
  // Event listeners
  setupNavigationListeners();
  setupTouchListeners();
  setupKeyboardNavigation();
  setupAutoPlay();
  setupResizeHandler();
}
```

### updateCarousel()

Updates carousel position and active states:

```javascript
/**
 * Update carousel to show specified slide
 * @param {number} slideIndex - Target slide index
 * @param {boolean} animate - Whether to animate transition
 */
function updateCarousel(slideIndex, animate = true) {
  // Ensure valid slide index
  currentSlide = ((slideIndex % slideCount) + slideCount) % slideCount;

  // Calculate new position
  const slideWidth = slides[0].offsetWidth;
  const offset = -currentSlide * slideWidth;

  // Apply transform with optional animation
  track.style.transition = animate 
    ? `transform ${CAROUSEL_CONFIG.SLIDE_TRANSITION_DURATION}ms ease-in-out`
    : 'none';
  
  // Use requestAnimationFrame for smooth rendering
  requestAnimationFrame(() => {
    track.style.transform = `translateX(${offset}px)`;
  });

  // Update active states
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
    slide.setAttribute('aria-hidden', index !== currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
    dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
  });

  // Instrument for RUM
  sampleRUM('carousel:navigate', { 
    target: currentSlide,
    total: slideCount 
  });
}
```

### Navigation Functions

```javascript
/**
 * Navigate to next slide
 */
function nextSlide() {
  updateCarousel(currentSlide + 1);
  handleUserInteraction();
}

/**
 * Navigate to previous slide
 */
function prevSlide() {
  updateCarousel(currentSlide - 1);
  handleUserInteraction();
}

/**
 * Navigate to specific slide
 * @param {number} index - Target slide index
 */
function goToSlide(index) {
  updateCarousel(index);
  handleUserInteraction();
}
```

### Auto-Play Management

```javascript
/**
 * Start autoplay timer
 */
function startAutoPlay() {
  if (!isPlaying || checkEditorMode()) return;
  
  stopAutoPlay(); // Clear existing timer
  
  autoPlayTimer = setInterval(() => {
    nextSlide();
  }, CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL);
}

/**
 * Stop autoplay timer
 */
function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
}

/**
 * Toggle play/pause state
 */
function togglePlayPause() {
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    startAutoPlay();
    playPauseButton.setAttribute('aria-label', 'Pause carousel');
    playPauseButton.textContent = 'Pause';
  } else {
    stopAutoPlay();
    playPauseButton.setAttribute('aria-label', 'Play carousel');
    playPauseButton.textContent = 'Play';
  }
  
  sampleRUM('carousel:autoplay', { playing: isPlaying });
}

/**
 * Handle user interaction - pause and schedule resume
 */
function handleUserInteraction() {
  if (!isPlaying) return;
  
  stopAutoPlay();
  
  // Clear existing timeout
  if (interactionTimeout) {
    clearTimeout(interactionTimeout);
  }
  
  // Resume after delay
  interactionTimeout = setTimeout(() => {
    if (isPlaying && !checkEditorMode()) {
      startAutoPlay();
    }
  }, CAROUSEL_CONFIG.INTERACTION_RESTART_DELAY);
}
```

---

## Universal Editor Integration

### Editor Mode Detection

The carousel uses utility functions to detect Universal Editor:

```javascript
import { isEditorMode, observeEditorMode } from '../../scripts/utils.js';

/**
 * Check if currently in Universal Editor
 * @returns {boolean} True if in editor mode
 */
function checkEditorMode() {
  try {
    // Check parent window
    if (window.parent && window.parent.document.body.classList.contains('appContainer')) {
      return true;
    }
    
    // Check top window
    if (window.top && window.top.document.body.classList.contains('appContainer')) {
      return true;
    }
  } catch (e) {
    // Cross-origin iframe - assume not in editor
    console.debug('Unable to check editor mode:', e);
  }
  
  return false;
}
```

### Auto-Play Control in Editor

```javascript
/**
 * Setup autoplay with editor mode detection
 */
function setupAutoPlay() {
  // Don't start autoplay in editor mode
  if (checkEditorMode()) {
    isPlaying = false;
    playPauseButton.textContent = 'Play';
    playPauseButton.setAttribute('aria-label', 'Play carousel');
    return;
  }

  // Use Intersection Observer for visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && isPlaying) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(block);
}

/**
 * Watch for editor mode changes
 */
observeEditorMode((inEditor) => {
  if (inEditor && isPlaying) {
    stopAutoPlay();
  } else if (!inEditor && isPlaying) {
    startAutoPlay();
  }
});
```

### Testing Editor Integration

```javascript
// Manual testing in console
window.testEditorMode = () => {
  console.log('Editor mode:', checkEditorMode());
  console.log('Autoplay active:', autoPlayTimer !== null);
};
```

---

## Performance Optimization

### Hardware Acceleration

```css
.carousel-track {
  /* Enable GPU acceleration */
  transform: translateX(0);
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### Debounced Resize Handler

```javascript
/**
 * Debounced resize handler for performance
 */
function setupResizeHandler() {
  let resizeTimeout;
  
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
      // Update carousel without animation
      updateCarousel(currentSlide, false);
    }, CAROUSEL_CONFIG.RESIZE_DEBOUNCE_DELAY);
  };
  
  window.addEventListener('resize', handleResize, { passive: true });
  
  // Cleanup on component unmount
  block.addEventListener('disconnect', () => {
    window.removeEventListener('resize', handleResize);
  });
}
```

### Passive Event Listeners

```javascript
/**
 * Setup touch listeners with passive flag
 */
function setupTouchListeners() {
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}
```

### Intersection Observer

```javascript
/**
 * Only autoplay when visible
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Carousel is visible
      if (isPlaying && !checkEditorMode()) {
        startAutoPlay();
      }
    } else {
      // Carousel is hidden
      stopAutoPlay();
    }
  });
}, {
  threshold: 0.5,  // 50% visibility required
  rootMargin: '0px'
});

observer.observe(block);
```

### Image Optimization

```javascript
// Leverage AEM's decorateImages utility
await decorateImages(block);

// Images are automatically:
// - Lazy loaded
// - Responsive (srcset generated)
// - Optimized for device pixel ratio
// - WebP format when supported
```

### Cached DOM Queries

```javascript
// Cache frequently accessed elements
const cachedElements = {
  slides: track.querySelectorAll('.carousel-slide'),
  dots: block.querySelectorAll('.carousel-dot'),
  prevButton: block.querySelector('.carousel-prev'),
  nextButton: block.querySelector('.carousel-next'),
  playPauseButton: block.querySelector('.carousel-play-pause'),
};

// Reuse cached elements instead of querying repeatedly
function updateActiveStates() {
  cachedElements.slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
}
```

---

## Browser Support

### Supported Browsers

| Browser | Version | Desktop | Mobile | Notes |
|---------|---------|---------|--------|-------|
| Chrome | Latest 2 | ✅ | ✅ | Full support |
| Firefox | Latest 2 | ✅ | ✅ | Full support |
| Safari | Latest 2 | ✅ | ✅ | Full support |
| Edge | Latest 2 | ✅ | ✅ | Full support |
| Mobile Safari | iOS 12+ | N/A | ✅ | Full support |
| Chrome Mobile | Android 8+ | N/A | ✅ | Full support |

### Feature Detection

```javascript
// Check for Intersection Observer support
if ('IntersectionObserver' in window) {
  // Use Intersection Observer for autoplay
  setupIntersectionObserver();
} else {
  // Fallback: Always run autoplay
  startAutoPlay();
}

// Check for passive event listener support
let passiveSupported = false;
try {
  const options = {
    get passive() {
      passiveSupported = true;
      return false;
    }
  };
  window.addEventListener('test', null, options);
  window.removeEventListener('test', null, options);
} catch (err) {
  passiveSupported = false;
}

// Use passive if supported
const listenerOptions = passiveSupported ? { passive: true } : false;
```

### Polyfills

No polyfills required. The carousel uses only well-supported modern APIs:
- CSS Transforms (IE9+)
- Touch Events (iOS 2+, Android 2.1+)
- IntersectionObserver (Chrome 51+, with graceful fallback)

---

## Accessibility Implementation

### ARIA Attributes

```javascript
/**
 * Setup ARIA attributes for carousel
 */
function setupAccessibility() {
  // Carousel container
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Content carousel');
  block.setAttribute('aria-roledescription', 'carousel');

  // Slides
  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slideCount}`);
    slide.setAttribute('aria-hidden', index !== currentSlide);
  });

  // Navigation buttons
  prevButton.setAttribute('aria-label', 'Previous slide');
  nextButton.setAttribute('aria-label', 'Next slide');
  
  // Dot indicators
  dots.forEach((dot, index) => {
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
  });

  // Play/pause button
  playPauseButton.setAttribute('aria-label', isPlaying ? 'Pause carousel' : 'Play carousel');
}
```

### Keyboard Navigation

```javascript
/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
  block.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        sampleRUM('carousel:keyboard', { key: 'left' });
        break;
        
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        sampleRUM('carousel:keyboard', { key: 'right' });
        break;
        
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
        
      case 'End':
        e.preventDefault();
        goToSlide(slideCount - 1);
        break;
    }
  });

  // Ensure carousel is focusable
  if (!block.hasAttribute('tabindex')) {
    block.setAttribute('tabindex', '0');
  }
}
```

### Focus Management

```css
/* Visible focus indicators */
.carousel-prev:focus,
.carousel-next:focus,
.carousel-dot:focus,
.carousel-play-pause:focus {
  outline: 2px solid var(--focus-color, #005ce6);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .carousel-prev:focus,
  .carousel-next:focus,
  .carousel-dot:focus {
    outline-width: 3px;
    outline-offset: 3px;
  }
}
```

### Reduced Motion Support

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    transition: none !important;
  }
  
  .carousel-slide {
    animation: none !important;
  }
  
  .block.carousel * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Screen Reader Announcements

```javascript
/**
 * Announce slide changes to screen readers
 */
function announceSlideChange() {
  // Create live region if not exists
  let liveRegion = block.querySelector('.sr-only-live');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only-live';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    block.appendChild(liveRegion);
  }
  
  // Update announcement
  liveRegion.textContent = `Slide ${currentSlide + 1} of ${slideCount}`;
}

// Call on slide change
function updateCarousel(slideIndex, animate = true) {
  // ... update logic ...
  announceSlideChange();
}
```

```css
/* Screen reader only class */
.sr-only-live {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## API Reference

### Block Options

Options are derived from CSS classes on the block element and from the `classes` select field in the block model defined in `_carousel.json`.

- `classes` (from model):
  - `""` (Default): standard light background
  - `"dark"`: applies dark theme styles to the block

Supported CSS class options on the block element:

| Class | Effect |
|-------|--------|
| `dark` | Dark background theme for headings and text inside `.carousel` (from `_carousel.json` option and `.carousel.dark` styles) |
| `no-arrows` | Hides previous/next arrow buttons |
| `no-dots` | Hides dot navigation indicators |
| `full-height` | Increases visual height – sets `.carousel-track` to `max-height: 95vh` |
| `overlay` | Positions content as an overlay with gradient on image (`.carousel.overlay .carousel-slide-content`) |
| `compact` | Compact variant with reduced heights/padding for track, content, and dots |

### Configuration Constants

```javascript
CAROUSEL_CONFIG = {
  SLIDE_TRANSITION_DURATION: 500,    // ms
  AUTO_PLAY_INTERVAL: 6000,          // ms
  TOUCH_THRESHOLD: 50,                // px
  RESIZE_DEBOUNCE_DELAY: 150,        // ms
  INTERACTION_RESTART_DELAY: 3000,   // ms
  BREAKPOINTS: {
    MOBILE: 600,                      // px
    DESKTOP: 900,                     // px
  }
}
### CSS Class Names and Structure

These are the key structural and utility classes used by the carousel (from `carousel.css`). Use them for styling hooks and DOM querying:

- Block and containers
  - `.carousel` – block root
  - `.carousel-container` – inner container (do not style the container in themes; prefer wrapper or block as per project rules)
  - `.carousel-track` – flex track that translates horizontally

- Slides and content
  - `.carousel-slide` – individual slide; the active one gets `.active`
  - `.carousel-slide-content` – textual content area
  - `.carousel-slide-image` – image wrapper; contains `<img>`

- Navigation and controls
  - `.carousel-arrows` – wrapper for arrows
  - `.carousel-prev`, `.carousel-next` – previous/next buttons
  - `.carousel-controls` – bottom controls wrapper
  - `.carousel-play-pause` – play/pause button
  - `.carousel-dots` – dots container
  - `.carousel-dot` – individual dot; active dot gets `.active`
  - `.carousel-progress-bar`, `.carousel-progress-fill` – progress indicator used with dots

Variant scopes from `carousel.css`:

- `.carousel.dark { ... }` – dark theme styles
- `.carousel.no-arrows .carousel-arrows { display: none; }`
- `.carousel.no-dots .carousel-dots { display: none; }`
- `.carousel.full-height .carousel-track { max-height: 95vh; }`
- `.carousel.overlay .carousel-slide-content { position: absolute; background: linear-gradient(transparent, rgb(0 0 0 / 70%)); color: var(--color-white); }`
- `.carousel.compact ...` – reduced sizes for track/content/dots

```

### Public Methods

While the carousel doesn't expose a formal API, you can access internals via DOM:

```javascript
// Get carousel instance
const carousel = document.querySelector('.carousel');

// Trigger navigation programmatically
carousel.querySelector('.carousel-next').click();

// Check current slide
const currentDot = carousel.querySelector('.carousel-dot.active');
const currentIndex = Array.from(carousel.querySelectorAll('.carousel-dot')).indexOf(currentDot);

// Pause/play
carousel.querySelector('.carousel-play-pause').click();
```

### Custom Events

```javascript
// Dispatch custom event on slide change
block.dispatchEvent(new CustomEvent('carousel:change', {
  detail: {
    currentSlide,
    previousSlide,
    slideCount,
  }
}));

// Listen for custom events
carousel.addEventListener('carousel:change', (e) => {
  console.log('Slide changed to:', e.detail.currentSlide);
});
```

---

## Testing

### Unit Testing

```javascript
// Example: Test slide navigation
describe('Carousel Navigation', () => {
  let carousel;
  
  beforeEach(() => {
    carousel = createCarousel(3); // 3 slides
  });
  
  test('should advance to next slide', () => {
    const nextButton = carousel.querySelector('.carousel-next');
    nextButton.click();
    
    const activeDot = carousel.querySelector('.carousel-dot.active');
    expect(activeDot.dataset.index).toBe('1');
  });
  
  test('should wrap from last to first slide', () => {
    goToSlide(2);
    const nextButton = carousel.querySelector('.carousel-next');
    nextButton.click();
    
    expect(getCurrentSlide()).toBe(0);
  });
});
```

### Integration Testing

```javascript
// Example: Test autoplay behavior
describe('Carousel Autoplay', () => {
  test('should auto-advance after interval', async () => {
    const carousel = createCarousel(3);
    
    expect(getCurrentSlide()).toBe(0);
    
    // Wait for autoplay interval
    await wait(6000);
    
    expect(getCurrentSlide()).toBe(1);
  });
  
  test('should pause on user interaction', async () => {
    const carousel = createCarousel(3);
    
    // Click next button
    carousel.querySelector('.carousel-next').click();
    
    const slideBeforeWait = getCurrentSlide();
    
    // Wait less than restart delay
    await wait(2000);
    
    // Should not have auto-advanced
    expect(getCurrentSlide()).toBe(slideBeforeWait);
  });
});
```

### Accessibility Testing

```javascript
// Example: Test keyboard navigation
describe('Carousel Accessibility', () => {
  test('should navigate with arrow keys', () => {
    const carousel = createCarousel(3);
    carousel.focus();
    
    // Press right arrow
    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(getCurrentSlide()).toBe(1);
    
    // Press left arrow
    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(getCurrentSlide()).toBe(0);
  });
  
  test('should have proper ARIA attributes', () => {
    const carousel = createCarousel(3);
    
    expect(carousel.getAttribute('role')).toBe('region');
    expect(carousel.getAttribute('aria-label')).toBeTruthy();
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    slides.forEach((slide) => {
      expect(slide.getAttribute('aria-roledescription')).toBe('slide');
    });
  });
});
```

### Performance Testing

```javascript
// Example: Test performance metrics
describe('Carousel Performance', () => {
  test('should update in under 16ms', () => {
    const carousel = createCarousel(10);
    
    const start = performance.now();
    updateCarousel(5);
    const end = performance.now();
    
    expect(end - start).toBeLessThan(16); // 60fps
  });
  
  test('should not cause layout thrashing', () => {
    const carousel = createCarousel(10);
    
    // Monitor layout calculations
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const layoutCount = entries.filter(e => e.name === 'Layout').length;
      expect(layoutCount).toBeLessThan(2);
    });
    
    observer.observe({ entryTypes: ['measure'] });
    updateCarousel(5);
  });
});
```

### Cross-Browser Testing

Use BrowserStack or similar for testing:

```javascript
// Playwright example
const { test, expect, devices } = require('@playwright/test');

test.describe('Carousel Cross-Browser', () => {
  test('should work on iPhone', async ({ page }) => {
    await page.emulate(devices['iPhone 12']);
    await page.goto('/carousel-test');
    
    // Test swipe gesture
    await page.touchscreen.swipe(/* ... */);
    
    const currentSlide = await page.locator('.carousel-slide.active');
    expect(currentSlide).toBeVisible();
  });
  
  test('should work on Desktop Safari', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit');
    
    await page.goto('/carousel-test');
    
    // Test keyboard navigation
    await page.keyboard.press('ArrowRight');
    
    // Verify slide changed
    const activeDot = await page.locator('.carousel-dot.active');
    expect(await activeDot.getAttribute('data-index')).toBe('1');
  });
});
```

---

## Deployment

### Build Process

```bash
# Standard EDS build (no special steps required)
npm run build

# Lint before deploy
npm run lint

# Run tests
npm test
```

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passed (axe-core)
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Code reviewed and approved

### Deployment Steps

1. **Merge to main branch**
   ```bash
   git checkout main
   git merge feature/carousel
   git push origin main
   ```

2. **Automatic preview build**
   - AEM Code Sync automatically builds preview
   - Preview URL: `https://main--{repo}--{org}.aem.page`

3. **Test on preview**
   - Verify all functionality works
   - Test with Universal Editor
   - Check mobile responsiveness

4. **Publish to production**
   - Use Universal Editor or Sidekick
   - Production URL: `https://main--{repo}--{org}.aem.live`

### Monitoring

```javascript
// RUM instrumentation is built-in
sampleRUM('carousel:navigate', { target: currentSlide });
sampleRUM('carousel:autoplay', { playing: isPlaying });
sampleRUM('carousel:keyboard', { key: 'left' });

// Monitor in RUM dashboard
// https://rum.hlx.page/
```

### Rollback Procedure

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

---

## Troubleshooting

### Common Issues

#### Carousel Not Rendering

**Symptoms:** Blank space where carousel should be

**Diagnosis:**
```javascript
// Check if block is decorated
console.log(block.classList.contains('carousel'));

// Check for slides
console.log(block.querySelectorAll('.carousel-slide').length);
```

**Solutions:**
1. Verify block name is exactly "Carousel" in content
2. Check for JavaScript errors in console
3. Ensure at least 2 rows in table (1 header + 1+ slides)
4. Verify `decorate()` function is being called

#### Auto-Play Not Working

**Symptoms:** Slides don't advance automatically

**Diagnosis:**
```javascript
// Check autoplay state
console.log('Is playing:', isPlaying);
console.log('Timer active:', autoPlayTimer !== null);
console.log('In editor mode:', checkEditorMode());
```

**Solutions:**
1. Verify not in Universal Editor (autoplay disabled by design)
2. Check if carousel is visible (Intersection Observer)
3. Verify no JavaScript errors
4. Check browser doesn't block timers (some privacy settings)

#### Touch/Swipe Not Working

**Symptoms:** Cannot swipe on mobile devices

**Diagnosis:**
```javascript
// Test touch events
track.addEventListener('touchstart', (e) => {
  console.log('Touch start:', e.touches[0].screenX);
});

track.addEventListener('touchend', (e) => {
  console.log('Touch end:', e.changedTouches[0].screenX);
});
```

**Solutions:**
1. Verify `touch-action: pan-y` in CSS
2. Check for conflicting touch handlers
3. Test on real device (desktop simulators can be unreliable)
4. Ensure touch threshold is reasonable (50px default)

#### Performance Issues

**Symptoms:** Sluggish animations, dropped frames

**Diagnosis:**
```javascript
// Monitor performance
const observer = new PerformanceObserver((list) => {
  console.log(list.getEntries());
});
observer.observe({ entryTypes: ['measure', 'paint'] });
```

**Solutions:**
1. Optimize images (use WebP, compress)
2. Reduce number of slides (max 10 recommended)
3. Check for layout thrashing (minimize DOM queries)
4. Verify hardware acceleration (CSS transforms)
5. Profile with Chrome DevTools Performance tab

#### Editor Mode Not Detected

**Symptoms:** Autoplay runs in Universal Editor

**Diagnosis:**
```javascript
// Test editor detection
console.log('Parent has appContainer:', 
  window.parent?.document.body.classList.contains('appContainer'));
console.log('Top has appContainer:', 
  window.top?.document.body.classList.contains('appContainer'));
```

**Solutions:**
1. Verify `.appContainer` class exists in editor
2. Check for cross-origin errors (inspect console)
3. Test `isEditorMode()` utility function
4. Add fallback detection if needed

### Debug Mode

```javascript
// Enable debug logging
const DEBUG = true;

function log(...args) {
  if (DEBUG) {
    console.log('[Carousel]', ...args);
  }
}

// Use throughout code
log('Initializing carousel with', slideCount, 'slides');
log('Current slide:', currentSlide);
log('Autoplay active:', autoPlayTimer !== null);
```

### Performance Profiling

```javascript
// Measure update performance
function updateCarousel(slideIndex, animate = true) {
  performance.mark('carousel-update-start');
  
  // ... update logic ...
  
  performance.mark('carousel-update-end');
  performance.measure(
    'carousel-update',
    'carousel-update-start',
    'carousel-update-end'
  );
  
  const measure = performance.getEntriesByName('carousel-update')[0];
  if (measure.duration > 16) {
    console.warn('Slow carousel update:', measure.duration, 'ms');
  }
}
```

---

## Advanced Customization

### Custom Transitions

```javascript
/**
 * Add fade transition option
 */
function updateCarousel(slideIndex, animate = true, transitionType = 'slide') {
  currentSlide = ((slideIndex % slideCount) + slideCount) % slideCount;
  
  if (transitionType === 'fade') {
    // Fade out current
    slides.forEach(slide => slide.style.opacity = '0');
    
    // Fade in target
    setTimeout(() => {
      slides[currentSlide].style.opacity = '1';
    }, 250);
  } else {
    // Standard slide transition
    const offset = -currentSlide * slideWidth;
    track.style.transform = `translateX(${offset}px)`;
  }
}
```

### Analytics Integration

```javascript
/**
 * Send analytics events
 */
function trackCarouselInteraction(action, data = {}) {
  // Adobe Analytics
  if (window._satellite) {
    _satellite.track('carousel-interaction', {
      action,
      slideNumber: currentSlide + 1,
      totalSlides: slideCount,
      ...data
    });
  }
  
  // Google Analytics
  if (window.gtag) {
    gtag('event', 'carousel_interaction', {
      event_category: 'Carousel',
      event_action: action,
      event_label: `Slide ${currentSlide + 1} of ${slideCount}`,
      ...data
    });
  }
  
  // RUM (built-in)
  sampleRUM(`carousel:${action}`, data);
}

// Use in navigation functions
function nextSlide() {
  updateCarousel(currentSlide + 1);
  trackCarouselInteraction('next', { method: 'button' });
}
```

### Lazy Loading Optimization

```javascript
/**
 * Preload adjacent slides
 */
function preloadAdjacentSlides() {
  const nextIndex = (currentSlide + 1) % slideCount;
  const prevIndex = (currentSlide - 1 + slideCount) % slideCount;
  
  [nextIndex, prevIndex].forEach(index => {
    const slide = slides[index];
    const images = slide.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
      // Force load adjacent images
      img.loading = 'eager';
      
      // Create new image to trigger load
      const tempImg = new Image();
      tempImg.src = img.src;
    });
  });
}

// Call after slide change
function updateCarousel(slideIndex, animate = true) {
  // ... update logic ...
  preloadAdjacentSlides();
}
```

---

## Security Considerations

### Content Sanitization

```javascript
/**
 * Sanitize user content to prevent XSS
 */
function sanitizeContent(html) {
  const temp = document.createElement('div');
  temp.textContent = html; // Escapes HTML entities
  return temp.innerHTML;
}

// Use when processing slide content
const slideContent = sanitizeContent(rawContent);
```

### CSP Compliance

```html
<!-- Required Content Security Policy -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               img-src 'self' data: https:; 
               style-src 'self' 'unsafe-inline';">
```

The carousel is CSP-compliant:
- No inline event handlers
- No `eval()` or `Function()` constructors
- All styles in external CSS or style attributes
- Images loaded from trusted sources only

---

## Contributing

### Code Style

```javascript
// Follow EDS conventions
// - 2 space indentation
// - Single quotes for strings
// - Semicolons required
// - Descriptive variable names

// Good
const currentSlideIndex = 0;
const slideElement = track.querySelector('.carousel-slide');

// Bad
var i = 0;
let el = track.querySelector(".carousel-slide")
```

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Run linter and tests
5. Submit PR with clear description
6. Address review comments
7. Squash commits before merge

### Testing Requirements

All PRs must include:
- Unit tests for new functions
- Integration tests for user flows
- Accessibility tests (keyboard, screen reader)
- Performance benchmarks
- Cross-browser verification

---

## Resources

### Documentation
- [AEM Edge Delivery Services](https://www.aem.live/docs/)
- [Universal Editor Guide](https://www.aem.live/developer/universal-editor)
- [Block Development](https://www.aem.live/developer/block-collection)

### Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web Performance](https://web.dev/vitals/)

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [BrowserStack](https://www.browserstack.com/)

---

*Last Updated: October 2025*
*Version: 1.0.0*
