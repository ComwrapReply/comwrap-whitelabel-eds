# Video - Developer Guide

> **INSTRUCTION:** Replace [Component/Block Name] with your actual component name, e.g., "Carousel", "Hero Banner", "Accordion", etc.

---

## Overview

> **INSTRUCTION:** Provide a 2-3 sentence technical description of the component, its purpose, and key technical features.

The Video block is a sophisticated video player component for AEM Edge Delivery Services that provides teaser video playback, full-screen modal video viewing, and responsive video handling. It includes configurable playback options (autoplay, loop, muted, controls), dynamic width settings, and mobile-optimized video loading strategies. The component features custom play/pause animations, overlay content support, and full Universal Editor integration.

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

> **INSTRUCTION:** Document the technical architecture and technology stack used.

### Technology Stack

> **INSTRUCTION:** List all technologies, APIs, and techniques used in this component.

- **HTML5 Video API**: Native video element for playback control
- **MediaQueryList API**: Responsive video behavior based on screen size
- **CSS Transforms**: Hardware-accelerated positioning and animations
- **DOM Manipulation**: Dynamic video element creation and configuration
- **Event Listeners**: Play/pause controls and user interactions
- **CSS Custom Properties**: Theme-aware styling (when integrated with theme system)

### Dependencies

> **INSTRUCTION:** List all required imports and dependencies.

```javascript
// No external dependencies required
// Component uses native browser APIs only
```

### State Management

> **INSTRUCTION:** Document how the component manages state. If no state management, remove this section.

The component manages state through DOM attributes and element properties:

```javascript
// Video playback state
video.paused  // Boolean - current playback state
video.currentTime  // Number - playback position

// Configuration state (stored in DOM)
video.hasAttribute('autoplay')  // Boolean
video.hasAttribute('loop')  // Boolean
video.hasAttribute('muted')  // Boolean
video.hasAttribute('controls')  // Boolean

// UI state
fullVideoContainer.style.display  // 'none' or 'block'
```

---

## File Structure

> **INSTRUCTION:** Document the file structure for this component.

```
blocks/video/
├── _video.json     # Block definition and content model
├── video.js        # Core JavaScript functionality
├── video.css       # Styling and visual presentation
├── README.md       # Author documentation
└── DEVELOPER.md    # This documentation
```

### Block Definition (_video.json)

> **INSTRUCTION:** Provide the JSON structure for the block definition.

```json
{
  "definitions": [
    {
      "title": "Video",
      "id": "video",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Video",
              "model": "video"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "video",
      "fields": [
        {
          "component": "reference",
          "name": "video",
          "label": "Video",
          "valueType": "string"
        },
        {
          "component": "select",
          "name": "video-width",
          "label": "Video Width",
          "valueType": "string",
          "options": [
            { "name": "100%", "value": "100%" },
            { "name": "75%", "value": "75%" },
            { "name": "50%", "value": "50%" }
          ],
          "value": "100%"
        },
        {
          "component": "boolean",
          "name": "video-autoplay",
          "label": "Autoplay"
        },
        {
          "component": "boolean",
          "name": "video-loop",
          "label": "Loop"
        },
        {
          "component": "boolean",
          "name": "video-muted",
          "label": "Muted"
        },
        {
          "component": "boolean",
          "name": "video-controls",
          "label": "Controls"
        }
      ]
    }
  ],
  "filters": []
}
```

---

## Configuration

> **INSTRUCTION:** Document all configuration options for the component.

### Configuration Object

> **INSTRUCTION:** If your component uses a configuration object, document it here. Otherwise, remove this section.

The component uses inline configuration through DOM attributes and properties. Video options are configured through the content model and applied during decoration.

### Customizing Configuration

> **INSTRUCTION:** Explain how developers can modify configuration values.

Configuration is applied through the `decorateVideoOptions` function which reads values from the block's DOM structure:

```javascript
// Video width is applied via inline style
videoContainer.style.width = widthValue;  // '100%', '75%', or '50%'

// Boolean options are applied as HTML attributes
video.toggleAttribute('autoplay', autoplayValue === 'true');
video.toggleAttribute('loop', loopValue === 'true');
video.toggleAttribute('muted', mutedValue === 'true');
video.toggleAttribute('controls', controlsValue === 'true');
```

### CSS Custom Properties

> **INSTRUCTION:** Document CSS variables used by the component.

The component uses standard CSS without custom properties. For theme integration, consider adding:

```css
:root {
  --video-background-color: #000;  /* Video container background */
  --video-control-color: #fff;     /* Control button color */
  --video-overlay-bg: rgba(0, 0, 0, 0.5);  /* Overlay background */
  --video-animation-duration: 400ms;  /* Animation timing */
}
```

Override in your project's CSS:

```css
.video.block {
  --video-background-color: #1a1a1a;
  --video-control-color: #f0f0f0;
}
```

---

## Core Functions

> **INSTRUCTION:** Document all major functions in the component.

### Main Export Function

```javascript
/**
 * Decorates the video block
 * @param {Element} block - The video block element
 */
export default function decorate(block) {
  // Step 1: Setup video banner structure
  const videoBanner = block.children[0];
  videoBanner.classList.add('hero-video-banner');
  const heroContent = videoBanner.children[0];
  heroContent.classList.add('teaser-video-container');

  // Step 2: Extract video and image elements
  const teaserVideoLink = heroContent.querySelector('a');
  const teaserPicture = heroContent.querySelector('img');
  const placeholderImage = heroContent.querySelectorAll('picture')[1];

  // Step 3: Decorate teaser video
  decorateTeaser(teaserVideoLink, teaserPicture, heroContent, placeholderImage);
  
  // Step 4: Apply video options (width, autoplay, loop, muted, controls)
  decorateVideoOptions(block);

  // Step 5: Setup overlay and full-screen video
  const overlay = videoBanner.children[1];
  overlay.classList = 'overlay';
  const fullScreenVideoLink = overlay.querySelector('a:last-of-type');
  
  if (fullScreenVideoLink) {
    const fullScreenVideoLinkHref = fullScreenVideoLink.href;
    decorateOverlayButton(fullScreenVideoLink, block, overlay);
    decorateFullScreenVideo(fullScreenVideoLinkHref, teaserPicture, videoBanner);
  }
}
```

### decorateTeaser

> **INSTRUCTION:** Document the main initialization or primary function.

Main function that sets up the teaser video with responsive behavior:

```javascript
/**
 * Decorates the teaser video element with responsive behavior
 * @param {HTMLAnchorElement} video - Link to video file
 * @param {HTMLImageElement} teaserPicture - Poster/thumbnail image
 * @param {Element} target - Target container element
 */
function decorateTeaser(video, teaserPicture, target) {
  // Handle case where neither video nor picture exists
  if (!video && !teaserPicture) {
    return;
  }

  // If no video, use image as fallback
  if (!video) {
    teaserPicture.style.setProperty('display', 'block', 'important');
    decorateTeaserPicture(teaserPicture, target);
    return;
  }

  // Create video element
  const videoTag = document.createElement('video');
  
  // Set poster image if available
  if (teaserPicture) {
    videoTag.setAttribute('poster', teaserPicture.currentSrc);
    decorateTeaserPicture(teaserPicture, target);
  } else {
    videoTag.style.setProperty('display', 'block', 'important');
  }

  videoTag.classList.add('video-cover');

  // Responsive behavior: mobile vs desktop
  const mql = window.matchMedia('only screen and (max-width: 768px)');
  if (mql.matches && teaserPicture) {
    // Mobile: preload metadata only
    videoTag.setAttribute('preload', 'metadata');
  } else {
    // Desktop: enable autoplay
    videoTag.toggleAttribute('autoplay', true);
  }

  // Handle screen size changes
  mql.onchange = (e) => {
    if (!e.matches && !videoTag.hasAttribute('autoplay')) {
      videoTag.toggleAttribute('autoplay', true);
      videoTag.play();
    }
  };

  // Set video source and insert into DOM
  videoTag.innerHTML = `<source src="${video.href}" type="video/mp4">`;
  target.prepend(videoTag);
  videoTag.muted = true;
  video.remove();
}
```

### decorateVideoOptions

> **INSTRUCTION:** Document other important functions. Add more subsections as needed.

```javascript
/**
 * Applies video configuration options from content model
 * @param {Element} block - The video block element
 */
function decorateVideoOptions(block) {
  const video = block.querySelector('video');
  if (!video) {
    return;
  }

  // Handle video width (from block.children[1])
  const widthField = block.children[1];
  if (widthField) {
    const widthValue = widthField.querySelector('p')?.textContent.trim();
    if (widthValue) {
      const videoContainer = video.closest('.teaser-video-container') || video.parentElement;
      if (videoContainer) {
        videoContainer.style.width = widthValue;
      }
    }
  }

  // Handle boolean options (indices: autoplay=2, loop=3, muted=4, controls=5)
  const autoplay = block.children[2];
  const autoplayValue = autoplay.querySelector('p').textContent.trim();
  const loop = block.children[3];
  const loopValue = loop.querySelector('p').textContent.trim();
  const muted = block.children[4];
  const mutedValue = muted.querySelector('p').textContent.trim();
  const controls = block.children[5];
  const controlsValue = controls.querySelector('p').textContent.trim();
  
  // Apply attributes
  video.toggleAttribute('autoplay', autoplayValue === 'true');
  video.toggleAttribute('loop', loopValue === 'true');
  video.toggleAttribute('muted', mutedValue === 'true');
  video.toggleAttribute('controls', controlsValue === 'true');
  
  // Clean up configuration DOM elements
  autoplay.remove();
  loop.remove();
  muted.remove();
  controls.remove();
  widthField.remove();
}
```

### decorateFullScreenVideo

> **INSTRUCTION:** Continue documenting all core functions following the pattern above.

```javascript
/**
 * Creates and decorates the full-screen video modal
 * @param {string} fullScreenVideoLink - URL to full-screen video file
 * @param {HTMLImageElement} teaserPicture - Poster image for full-screen video
 * @param {Element} target - Target container for modal
 */
async function decorateFullScreenVideo(fullScreenVideoLink, teaserPicture, target) {
  // Create modal container
  const fullVideoContainer = document.createElement('div');
  fullVideoContainer.classList.add('full-video-container');

  // Create video element
  const video = document.createElement('video');
  video.classList.add('video-cover');
  video.innerHTML = `<source src="${fullScreenVideoLink}" type="video/mp4">`;
  video.setAttribute('preload', 'metadata');
  video.setAttribute('poster', teaserPicture.currentSrc);

  // Click video to play/pause
  video.addEventListener('click', () => { toggleVideoPlay(video); });

  // Create close button
  const closeVideoButton = document.createElement('div');
  closeVideoButton.classList.add('close-video');
  createIcons(closeVideoButton, ['close-video']);
  closeVideoButton.addEventListener('click', () => {
    video.removeEventListener('pause', pauseVideoAnimation);
    video.removeEventListener('play', playVideoAnimation);
    video.pause();
    video.currentTime = 0;
    video.load();
    fullVideoContainer.style.display = 'none';
  });

  // Create play/pause button
  const playPauseVideoButton = document.createElement('div');
  playPauseVideoButton.classList.add('play-pause-fullscreen-button');
  createIcons(playPauseVideoButton, ['full-screen-play', 'full-screen-pause']);
  playPauseVideoButton.addEventListener('click', () => { toggleVideoPlay(video); });

  // Assemble modal
  fullVideoContainer.appendChild(closeVideoButton);
  fullVideoContainer.appendChild(playPauseVideoButton);
  fullVideoContainer.appendChild(video);
  target.appendChild(fullVideoContainer);
}
```

### Additional Functions

```javascript
/**
 * Toggles video play/pause state
 * @param {HTMLVideoElement} video - Video element to control
 */
function toggleVideoPlay(video) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/**
 * Animates play icon on video play event
 * @param {Event} e - Play event
 */
function playVideoAnimation(e) {
  const [playIcon] = e.target
    .closest('.hero-video')
    .querySelectorAll('.play-pause-fullscreen-button svg');
  playIcon.style.opacity = 1;
  setTimeout(() => {
    playIcon.style.opacity = 0;
  }, 400);
}

/**
 * Animates pause icon on video pause event
 * @param {Event} e - Pause event
 */
function pauseVideoAnimation(e) {
  const [, pauseIcon] = e.target
    .closest('.hero-video')
    .querySelectorAll('.play-pause-fullscreen-button svg');
  pauseIcon.style.opacity = 1;
  setTimeout(() => {
    pauseIcon.style.opacity = 0;
  }, 400);
}
```

---

## Universal Editor Integration

> **INSTRUCTION:** Document how the component integrates with Universal Editor.

### Editor Mode Detection

> **INSTRUCTION:** Document editor mode detection if applicable.

The component works seamlessly in Universal Editor. Video playback may be limited in editor preview mode, but all configuration options are available through the Properties panel.

### Component-Specific Editor Behavior

> **INSTRUCTION:** Document any component-specific behavior in the editor (e.g., disabled features, modified functionality).

```javascript
/**
 * Video component behavior in Universal Editor
 * - All configuration options available in Properties panel
 * - Video preview may be limited in editor mode
 * - Full functionality available on published page
 */
function setupEditorMode() {
  // Video autoplay may be restricted in editor preview
  // Full-screen modal functionality works on published pages
  // All configuration options are editable in Properties panel
}
```

### Testing Editor Integration

> **INSTRUCTION:** Provide testing methods for editor integration.

```javascript
// Manual testing in console
window.testVideoComponent = () => {
  const block = document.querySelector('.block.video');
  console.log('Video element:', block.querySelector('video'));
  console.log('Full-screen container:', block.querySelector('.full-video-container'));
  console.log('Video options:', {
    autoplay: block.querySelector('video')?.hasAttribute('autoplay'),
    loop: block.querySelector('video')?.hasAttribute('loop'),
    muted: block.querySelector('video')?.hasAttribute('muted'),
    controls: block.querySelector('video')?.hasAttribute('controls')
  });
};
```

---

## Performance Optimization

> **INSTRUCTION:** Document all performance optimization techniques used.

### Mobile Video Optimization

> **INSTRUCTION:** If using CSS transforms or animations, document GPU acceleration techniques.

```javascript
// Mobile devices: preload metadata only to save bandwidth
const mql = window.matchMedia('only screen and (max-width: 768px)');
if (mql.matches && teaserPicture) {
  videoTag.setAttribute('preload', 'metadata');
} else {
  // Desktop: enable autoplay for better UX
  videoTag.toggleAttribute('autoplay', true);
}
```

### Video Loading Strategy

> **INSTRUCTION:** Document any debounced handlers for performance.

```javascript
/**
 * Optimized video loading based on viewport
 * - Mobile: Metadata preload only
 * - Desktop: Autoplay enabled
 * - Responsive: Adapts to screen size changes
 */
function optimizeVideoLoading(videoTag, teaserPicture) {
  const mql = window.matchMedia('only screen and (max-width: 768px)');
  
  if (mql.matches && teaserPicture) {
    // Mobile: conserve bandwidth
    videoTag.setAttribute('preload', 'metadata');
  } else {
    // Desktop: ready for autoplay
    videoTag.toggleAttribute('autoplay', true);
  }
  
  // Handle screen size changes
  mql.onchange = (e) => {
    if (!e.matches && !videoTag.hasAttribute('autoplay')) {
      videoTag.toggleAttribute('autoplay', true);
      videoTag.play();
    }
  };
}
```

### Image Optimization

> **INSTRUCTION:** Document image optimization if component uses images.

```javascript
// Poster images are used for:
// 1. Initial display before video loads
// 2. Fallback when video cannot play
// 3. Full-screen modal poster

// Images should be optimized:
// - Format: WebP or JPG
// - Size: Match video aspect ratio
// - Compression: Optimized for web (< 200KB recommended)
```

### Cached DOM Queries

> **INSTRUCTION:** Document DOM query caching strategy.

```javascript
// Cache video elements during decoration
const cachedElements = {
  video: block.querySelector('video'),
  videoContainer: block.querySelector('.teaser-video-container'),
  fullVideoContainer: block.querySelector('.full-video-container'),
  overlay: block.querySelector('.overlay')
};

// Reuse cached elements in event handlers
function handleVideoInteraction() {
  cachedElements.video.play();
}
```

---

## Browser Support

> **INSTRUCTION:** Document browser compatibility and support matrix.

### Supported Browsers

| Browser | Version | Desktop | Mobile | Notes |
|---------|---------|---------|--------|-------|
| Chrome | Latest 2 | ✅ | ✅ | Full support |
| Firefox | Latest 2 | ✅ | ✅ | Full support |
| Safari | Latest 2 | ✅ | ✅ | Autoplay restrictions apply |
| Edge | Latest 2 | ✅ | ✅ | Full support |
| Mobile Safari | iOS 12+ | N/A | ✅ | Autoplay may be restricted |
| Chrome Mobile | Android 8+ | N/A | ✅ | Full support |

### Feature Detection

> **INSTRUCTION:** Document feature detection for any progressive enhancement.

```javascript
// Check for HTML5 video support
if (document.createElement('video').canPlayType) {
  // HTML5 video supported
  // Use native video element
} else {
  // Fallback: Display poster image only
  // Or use alternative video player library
}

// Check for MediaQueryList support
if (window.matchMedia) {
  // Responsive video behavior supported
  const mql = window.matchMedia('only screen and (max-width: 768px)');
} else {
  // Fallback: Use fixed mobile behavior
}
```

### Polyfills

> **INSTRUCTION:** Document any polyfills required or explicitly state none are needed.

**None required**

No polyfills required. The component uses only well-supported modern APIs:
- HTML5 Video API (supported in all modern browsers)
- MediaQueryList API (supported in all modern browsers)
- CSS Transforms (supported in all modern browsers)

---

## Accessibility Implementation

> **INSTRUCTION:** Document all accessibility features and WCAG compliance.

### ARIA Attributes

> **INSTRUCTION:** Document all ARIA attributes used.

```javascript
/**
 * Setup ARIA attributes for video component
 * Note: Current implementation could be enhanced with ARIA
 */
function setupAccessibility() {
  const video = block.querySelector('video');
  
  // Add ARIA label for video
  if (video && !video.getAttribute('aria-label')) {
    const poster = video.getAttribute('poster');
    video.setAttribute('aria-label', 'Video player');
  }
  
  // Add ARIA labels for controls
  const playButton = block.querySelector('.play-pause-fullscreen-button');
  if (playButton) {
    playButton.setAttribute('aria-label', 'Play/Pause video');
    playButton.setAttribute('role', 'button');
  }
  
  const closeButton = block.querySelector('.close-video');
  if (closeButton) {
    closeButton.setAttribute('aria-label', 'Close video');
    closeButton.setAttribute('role', 'button');
  }
}
```

### Keyboard Navigation

> **INSTRUCTION:** Document keyboard interaction patterns.

```javascript
/**
 * Setup keyboard navigation for video controls
 */
function setupKeyboardNavigation() {
  const video = block.querySelector('video');
  const playButton = block.querySelector('.play-pause-fullscreen-button');
  const closeButton = block.querySelector('.close-video');
  
  // Video element keyboard support (native)
  video.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleVideoPlay(video);
    }
  });
  
  // Play/pause button keyboard support
  if (playButton) {
    playButton.setAttribute('tabindex', '0');
    playButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleVideoPlay(video);
      }
    });
  }
  
  // Close button keyboard support
  if (closeButton) {
    closeButton.setAttribute('tabindex', '0');
    closeButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        closeButton.click();
      }
    });
  }
}
```

### Focus Management

> **INSTRUCTION:** Document focus management and visible indicators.

```css
/* Visible focus indicators */
.video button:focus,
.video [tabindex]:focus {
  outline: 2px solid var(--focus-color, #0078d4);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .video button:focus {
    outline-width: 3px;
    outline-offset: 3px;
  }
}
```

### Reduced Motion Support

> **INSTRUCTION:** Document how component respects motion preferences.

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .video * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  
  .play-pause-fullscreen-button svg {
    transition: none !important;
  }
}
```

### Screen Reader Announcements

> **INSTRUCTION:** Document screen reader support if applicable.

```javascript
/**
 * Announce video state changes to screen readers
 */
function announceVideoState(state) {
  let liveRegion = block.querySelector('.sr-only-live');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only-live';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    block.appendChild(liveRegion);
  }
  
  liveRegion.textContent = `Video ${state}`;
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

> **INSTRUCTION:** Document the component's API, options, and public methods.

### Block Options

> **INSTRUCTION:** Document options derived from CSS classes or data attributes.

Options are derived from content model fields and applied as HTML attributes:

| Field | Type | Effect |
|-------|------|--------|
| `video-width` | select | Sets video container width: '100%', '75%', or '50%' |
| `video-autoplay` | boolean | Enables automatic video playback |
| `video-loop` | boolean | Enables video looping |
| `video-muted` | boolean | Mutes video by default |
| `video-controls` | boolean | Shows native video controls |

### Configuration Constants

> **INSTRUCTION:** List all configuration constants available.

```javascript
// Video configuration applied via HTML attributes
const VIDEO_CONFIG = {
  WIDTH_OPTIONS: ['100%', '75%', '50%'],  // Available width values
  MOBILE_BREAKPOINT: 768,  // px - Mobile/desktop breakpoint
  ANIMATION_DURATION: 400,  // ms - Play/pause icon animation
  PRELOAD_STRATEGY: {
    MOBILE: 'metadata',  // Mobile: preload metadata only
    DESKTOP: 'auto'      // Desktop: full preload for autoplay
  }
}
```

### Public Methods

> **INSTRUCTION:** Document any public methods or APIs exposed by the component.

While the component doesn't expose a formal API, you can access internals via DOM:

```javascript
// Get video element
const video = document.querySelector('.block.video video');

// Control playback
video.play();
video.pause();

// Access full-screen container
const fullScreenContainer = document.querySelector('.full-video-container');
fullScreenContainer.style.display = 'block';

// Get video configuration
const config = {
  autoplay: video.hasAttribute('autoplay'),
  loop: video.hasAttribute('loop'),
  muted: video.hasAttribute('muted'),
  controls: video.hasAttribute('controls')
};
```

### Custom Events

> **INSTRUCTION:** Document any custom events dispatched by the component.

Currently, the component does not dispatch custom events. To add event dispatching:

```javascript
// Example: Dispatch event on video play
video.addEventListener('play', () => {
  block.dispatchEvent(new CustomEvent('video:play', {
    detail: {
      videoSrc: video.currentSrc,
      currentTime: video.currentTime
    }
  });
});

// Listen for custom events
block.addEventListener('video:play', (e) => {
  console.log('Video playing:', e.detail);
});
```

---

## Testing

> **INSTRUCTION:** Provide testing guidelines and examples for the component.

### Unit Testing

> **INSTRUCTION:** Provide unit test examples.

```javascript
// Example: Test video decoration
describe('Video Component Decoration', () => {
  let block;
  
  beforeEach(() => {
    block = document.createElement('div');
    block.className = 'block video';
    block.innerHTML = `
      <div>
        <div>
          <a href="/path/to/video.mp4">Video</a>
          <img src="/path/to/poster.jpg" alt="Poster">
        </div>
      </div>
    `;
  });
  
  test('should create video element', () => {
    decorate(block);
    const video = block.querySelector('video');
    expect(video).toBeTruthy();
  });
  
  test('should apply poster image', () => {
    decorate(block);
    const video = block.querySelector('video');
    expect(video.getAttribute('poster')).toBeTruthy();
  });
});
```

### Integration Testing

> **INSTRUCTION:** Provide integration test examples.

```javascript
// Example: Test full video workflow
describe('Video Component Integration', () => {
  test('should open full-screen modal on button click', async () => {
    const block = createVideoBlock();
    decorate(block);
    
    const button = block.querySelector('.video-banner-btn');
    const fullScreenContainer = block.querySelector('.full-video-container');
    
    expect(fullScreenContainer.style.display).toBe('none');
    
    button.click();
    
    expect(fullScreenContainer.style.display).toBe('block');
  });
});
```

### Accessibility Testing

> **INSTRUCTION:** Provide accessibility test examples.

```javascript
// Example: Test keyboard navigation
describe('Video Component Accessibility', () => {
  test('should toggle play/pause with spacebar', () => {
    const block = createVideoBlock();
    decorate(block);
    const video = block.querySelector('video');
    
    video.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    
    expect(video.paused).toBe(false);
  });
  
  test('should have proper ARIA attributes', () => {
    const block = createVideoBlock();
    decorate(block);
    
    const playButton = block.querySelector('.play-pause-fullscreen-button');
    expect(playButton.getAttribute('role')).toBe('button');
    expect(playButton.getAttribute('aria-label')).toBeTruthy();
  });
});
```

### Performance Testing

> **INSTRUCTION:** Provide performance test examples.

```javascript
// Example: Test video loading performance
describe('Video Component Performance', () => {
  test('should load video metadata quickly', () => {
    const block = createVideoBlock();
    const start = performance.now();
    
    decorate(block);
    
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // Should complete in < 100ms
  });
});
```

### Cross-Browser Testing

> **INSTRUCTION:** Provide guidance on cross-browser testing.

Use BrowserStack or similar for testing:

```javascript
// Playwright example
const { test, expect, devices } = require('@playwright/test');

test.describe('Video Component Cross-Browser', () => {
  test('should work on mobile Safari', async ({ page }) => {
    await page.emulate(devices['iPhone 12']);
    await page.goto('/test-video-page');
    
    const video = await page.locator('.block.video video');
    await expect(video).toBeVisible();
  });
});
```

---

## Deployment

> **INSTRUCTION:** Document the deployment process and requirements.

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

> **INSTRUCTION:** Customize this checklist for your component.

- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passed (axe-core)
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed (especially autoplay behavior)
- [ ] Video files optimized for web delivery
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Code reviewed and approved

### Deployment Steps

1. **Merge to main branch**
   ```bash
   git checkout main
   git merge feature/video-component
   git push origin main
   ```

2. **Automatic preview build**
   - AEM Code Sync automatically builds preview
   - Preview URL: `https://main--{repo}--{org}.aem.page`

3. **Test on preview**
   - Verify video playback works
   - Test autoplay behavior
   - Check mobile responsiveness
   - Test full-screen modal
   - Verify Universal Editor integration

4. **Publish to production**
   - Use Universal Editor or Sidekick
   - Production URL: `https://main--{repo}--{org}.aem.live`

### Monitoring

> **INSTRUCTION:** Document monitoring and instrumentation.

```javascript
// RUM instrumentation
sampleRUM('video:play', { videoSrc: video.currentSrc });
sampleRUM('video:pause', { duration: video.currentTime });
sampleRUM('video:fullscreen', { action: 'open' });

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

> **INSTRUCTION:** Document common issues and their solutions.

### Common Issues

#### Video Not Displaying

**Symptoms:** Video element not visible or not rendering

**Diagnosis:**
```javascript
// Check if video element exists
const video = block.querySelector('video');
console.log('Video element:', video);

// Check video source
console.log('Video source:', video?.querySelector('source')?.src);

// Check container visibility
const container = block.querySelector('.teaser-video-container');
console.log('Container display:', window.getComputedStyle(container).display);
```

**Solutions:**
1. Verify video file path is correct in content model
2. Check video file format (MP4 recommended)
3. Ensure video file is accessible (not blocked by CORS)
4. Verify container has proper width/height
5. Check browser console for video loading errors

#### Autoplay Not Working

**Symptoms:** Video doesn't autoplay even when enabled

**Diagnosis:**
```javascript
// Check autoplay attribute
const video = block.querySelector('video');
console.log('Autoplay attribute:', video?.hasAttribute('autoplay'));

// Check muted attribute (required for autoplay)
console.log('Muted attribute:', video?.hasAttribute('muted'));

// Check browser autoplay policy
console.log('Browser:', navigator.userAgent);
```

**Solutions:**
1. Ensure "Muted" option is enabled (required for autoplay in most browsers)
2. Check browser autoplay policy (Safari and Chrome have restrictions)
3. Verify video is not in an iframe (autoplay may be blocked)
4. Test on published page (not just Universal Editor preview)
5. Check mobile device restrictions (autoplay often disabled on mobile)

#### Full-Screen Modal Not Opening

**Symptoms:** Clicking overlay button doesn't open full-screen video

**Diagnosis:**
```javascript
// Check if full-screen container exists
const container = block.querySelector('.full-video-container');
console.log('Full-screen container:', container);

// Check button event listener
const button = block.querySelector('.video-banner-btn');
console.log('Button:', button);
```

**Solutions:**
1. Verify full-screen video link is configured in content
2. Check JavaScript console for errors
3. Ensure button click event is properly attached
4. Test on published page (not just Universal Editor)
5. Verify full-screen video file path is correct

#### Video Options Not Applying

**Symptoms:** Width, autoplay, loop, etc. not working

**Diagnosis:**
```javascript
// Check video options
const video = block.querySelector('video');
console.log('Video attributes:', {
  autoplay: video?.hasAttribute('autoplay'),
  loop: video?.hasAttribute('loop'),
  muted: video?.hasAttribute('muted'),
  controls: video?.hasAttribute('controls')
});

// Check width
const container = block.querySelector('.teaser-video-container');
console.log('Container width:', container?.style.width);
```

**Solutions:**
1. Verify options are set in Universal Editor Properties panel
2. Check that `decorateVideoOptions` function is being called
3. Verify content model field values are correct
4. Check browser console for JavaScript errors
5. Ensure block structure matches expected format

### Debug Mode

> **INSTRUCTION:** Provide debug mode or logging instructions.

```javascript
// Enable debug logging
const DEBUG = true;

function log(...args) {
  if (DEBUG) {
    console.log('[Video Component]', ...args);
  }
}

// Use throughout code
log('Decorating video:', video.href);
log('Video options:', { autoplay, loop, muted, controls });
```

### Performance Profiling

> **INSTRUCTION:** Provide performance profiling examples.

```javascript
// Measure video decoration performance
function decorate(block) {
  performance.mark('video-decorate-start');
  
  // ... decoration logic ...
  
  performance.mark('video-decorate-end');
  performance.measure(
    'video-decoration',
    'video-decorate-start',
    'video-decorate-end'
  );
  
  const measure = performance.getEntriesByName('video-decoration')[0];
  if (measure.duration > 100) {
    console.warn('Slow video decoration:', measure.duration, 'ms');
  }
}
```

---

## Advanced Customization

> **INSTRUCTION:** Document extension points and customization options.

### Custom Video Player Controls

> **INSTRUCTION:** Provide examples of common customizations.

```javascript
/**
 * Add custom video controls
 */
function addCustomControls(video) {
  const controls = document.createElement('div');
  controls.className = 'custom-video-controls';
  
  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play';
  playBtn.addEventListener('click', () => toggleVideoPlay(video));
  
  controls.appendChild(playBtn);
  video.parentElement.appendChild(controls);
}
```

### Analytics Integration

> **INSTRUCTION:** Provide analytics integration examples.

```javascript
/**
 * Send analytics events for video interactions
 */
function trackVideoInteraction(action, data = {}) {
  // Adobe Analytics
  if (window._satellite) {
    _satellite.track('video-interaction', {
      action,
      videoSrc: data.videoSrc,
      duration: data.duration,
      ...data
    });
  }
  
  // Google Analytics
  if (window.gtag) {
    gtag('event', 'video_interaction', {
      event_category: 'Video',
      event_action: action,
      event_label: data.videoSrc,
      ...data
    });
  }
  
  // RUM (built-in)
  sampleRUM(`video:${action}`, data);
}

// Track video events
video.addEventListener('play', () => {
  trackVideoInteraction('play', { videoSrc: video.currentSrc });
});

video.addEventListener('pause', () => {
  trackVideoInteraction('pause', {
    videoSrc: video.currentSrc,
    duration: video.currentTime
  });
});
```

---

## Security Considerations

> **INSTRUCTION:** Document security best practices and considerations.

### Content Sanitization

> **INSTRUCTION:** Document XSS prevention if component handles user content.

```javascript
/**
 * Sanitize video source URLs to prevent XSS
 */
function sanitizeVideoSource(url) {
  // Only allow http, https, and data URLs
  const allowedProtocols = ['http:', 'https:', 'data:'];
  try {
    const parsedUrl = new URL(url, window.location.href);
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      console.error('Invalid video source protocol:', parsedUrl.protocol);
      return null;
    }
    return parsedUrl.href;
  } catch (e) {
    console.error('Invalid video URL:', url);
    return null;
  }
}
```

### CSP Compliance

> **INSTRUCTION:** Document Content Security Policy requirements.

The component is CSP-compliant:
- No inline event handlers
- No `eval()` or `Function()` constructors
- All styles in external CSS
- Video sources from trusted domains only

---

## Contributing

> **INSTRUCTION:** Provide contribution guidelines.

### Code Style

```javascript
// Follow EDS conventions
// - 2 space indentation
// - Single quotes for strings
// - Semicolons required
// - Descriptive variable names

// Good
const videoElement = block.querySelector('video');
const teaserPicture = heroContent.querySelector('img');

// Bad
var v = block.querySelector('video');
let img = heroContent.querySelector('img')
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
- Integration tests for video workflows
- Accessibility tests (keyboard, screen reader)
- Performance benchmarks
- Cross-browser verification
- Mobile device testing

---

## Resources

> **INSTRUCTION:** Provide links to relevant documentation and resources.

### Documentation
- [AEM Edge Delivery Services](https://www.aem.live/docs/)
- [Universal Editor Guide](https://www.aem.live/developer/universal-editor)
- [Block Development](https://www.aem.live/developer/block-collection)
- [HTML5 Video API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement)

### Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web Performance](https://web.dev/vitals/)
- [Media Accessibility](https://www.w3.org/WAI/media/av/)

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [BrowserStack](https://www.browserstack.com/)
- [Video.js](https://videojs.com/) - Alternative video player library

---

*Last Updated: December 2024*  
*Version: 1.0.0*  
*For author documentation, see README.md*

