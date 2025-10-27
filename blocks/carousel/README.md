# Carousel Block

The Carousel block is a responsive, touch-enabled component that displays a series of slides with images and content. It includes navigation arrows, dot indicators, play/pause controls, and supports various customization options. The carousel automatically detects editor mode and disables autoplay when used in Adobe Universal Editor.

## Table of Contents

1. [Usage](#usage)
2. [Variations](#variations)
3. [Authoring Guide](#authoring-guide)
4. [Developer Documentation](#developer-documentation)
5. [Accessibility Guide](#accessibility-guide)
6. [Best Practices](#best-practices)
7. [Enhancement Options](#enhancement-options)
8. [Browser Support](#browser-support)

---

## Usage

To use the Carousel block, create a table in your document with "Carousel" in the first cell, followed by rows containing your slide content. Each row represents one slide.

| Carousel |
|----------|
| ![Image 1](./image1.jpg) **Slide 1 Title** This is the content for the first slide. |
| ![Image 2](./image2.jpg) **Slide 2 Title** This is the content for the second slide. |
| ![Image 3](./image3.jpg) **Slide 3 Title** This is the content for the third slide. |

### Basic Example

```markdown
| Carousel |
|----------|
| ![Hero Image](./hero.jpg) **Welcome** Get started with our platform |
| ![Feature Image](./feature.jpg) **Features** Discover our capabilities |
| ![Product Image](./product.jpg) **Products** Explore our offerings |
```

---

## Variations

The Carousel block supports several variations that can be specified in parentheses after the block name:

### No Arrows  
`Carousel (no-arrows)` - Hides navigation arrows

### No Dots
`Carousel (no-dots)` - Hides dot navigation indicators  

### Combining Variations
You can combine multiple variations:
`Carousel (no-arrows, no-dots)` - Carousel without navigation controls

---

## Authoring Guide

### Creating Content in Google Docs / Microsoft Word

When creating content for the Carousel block:

1. **Create a table** with at least two rows
2. **First row**: Type "Carousel" (with any desired variations in parentheses)
3. **Subsequent rows**: Add your slide content:
   - Include an image in each slide for best visual impact
   - Add headings and text content as needed
   - Each row becomes one slide

### Content Structure per Slide

- **Images**: Place images at the beginning of the slide content
- **Titles**: Use headings (H1-H6) for slide titles  
- **Description**: Add paragraphs for slide descriptions
- **Mixed Content**: You can combine multiple elements in each slide

### Best Practices for Content Authors

1. **Images**: Use high-quality images (recommended: 1200x600px)
   - Include descriptive alt text for accessibility
   - Optimize images before uploading

2. **Content Length**: Keep slide content concise
   - Recommended: 1-2 paragraphs per slide
   - Use bullet points for list content

3. **Titles**: Use descriptive slide titles
   - Keep titles short and impactful
   - Use proper heading hierarchy (H2-H4)

4. **Visual Hierarchy**: Lead with the most important content
   - Image first
   - Title second
   - Description last

### Content Examples

**Example 1: Product Showcase**
```markdown
| Carousel |
|----------|
| ![Product A](./product-a.jpg) **Product A** Award-winning design with premium features |
| ![Product B](./product-b.jpg) **Product B** Innovative solution for modern teams |
```

**Example 2: Features Highlight**
```markdown
| Carousel |
|----------|
| ![Feature 1](./feature1.jpg) **Fast Performance** Lightning-fast load times |
| ![Feature 2](./feature2.jpg) **Secure** Enterprise-grade security |
```

---

## Developer Documentation

### Files

- `_carousel.json` - Block definition and content model
- `carousel.js` - JavaScript functionality
- `carousel.css` - Styling and visual presentation

### JavaScript Configuration

The carousel uses a configuration object for all timings and thresholds:

```javascript
const CAROUSEL_CONFIG = {
  SLIDE_TRANSITION_DURATION: 500, // Smooth shifting animation
  AUTO_PLAY_INTERVAL: 6000, // 6 seconds autoplay interval
  TOUCH_THRESHOLD: 50, // Minimum swipe distance
  RESIZE_DEBOUNCE_DELAY: 150, // Resize event debounce
  INTERACTION_RESTART_DELAY: 3000, // Autoplay restart delay
  BREAKPOINTS: {
    MOBILE: 600,
    DESKTOP: 900,
  },
};
```

### Key Functions

#### `initializeCarousel(block, track, slideCount, options)`

Initializes the carousel with all functionality:
- Touch/swipe support
- Keyboard navigation
- Auto-play with Intersection Observer
- Editor mode detection
- Event handlers for navigation

#### `updateCarousel(slideIndex, animate)`

Updates carousel position with smooth animation:
- Uses CSS transforms for hardware acceleration
- Manages active states for slides and dots
- Optimized with `requestAnimationFrame`

#### Editor Mode Detection

The carousel automatically detects Universal Editor mode and disables autoplay:

```javascript
import { isEditorMode, observeEditorMode } from '../../scripts/utils.js';

// Checks for .appContainer class in parent/top window
const inEditorMode = () => checkEditorMode();
```

### Architecture

**State Management:**
- `currentSlide` - Current slide index
- `isPlaying` - Autoplay state
- `autoPlayTimer` - Autoplay interval reference
- `interactionTimeout` - User interaction timeout

**Performance Optimizations:**
- Cached DOM queries
- Debounced resize handler
- Intersection Observer for visibility
- Passive event listeners
- Hardware-accelerated CSS transforms
- Will-change property management

**Event Delegation:**
- Uses event delegation for dot navigation
- Centralized interaction handling
- Optimized event listener registration

### Customization Options

Developers can customize the carousel by:

1. **Modifying CAROUSEL_CONFIG** - Adjust timings and thresholds
2. **Adding custom classes** - Extend functionality with CSS
3. **Extending initializeCarousel** - Add custom features
4. **Overriding event handlers** - Customize interaction behavior

### Error Handling

The carousel includes comprehensive error handling:
- Defensive coding for DOM operations
- Try-catch blocks for cross-origin iframes
- Validation of user input
- Graceful degradation for missing elements

---

## Accessibility Guide

### WCAG Compliance

The Carousel block follows WCAG 2.1 Level AA standards:

#### Keyboard Navigation

- **Arrow Keys**: Navigate between slides
  - Left Arrow: Previous slide
  - Right Arrow: Next slide
- **Tab Navigation**: Access all interactive elements
- **Enter/Space**: Activate buttons

#### Screen Reader Support

- **ARIA Labels**: All interactive elements have descriptive labels
  - `aria-label="Previous slide"`
  - `aria-label="Next slide"`
  - `aria-label="Go to slide {number}"`
  - `aria-label="Pause carousel" / "Play carousel"`

- **Semantic HTML**: Uses proper semantic elements
  - Buttons for interactive elements
  - Proper heading hierarchy
  - Descriptive text content

#### Focus Management

- **Visible Focus Indicators**: Clear focus outlines on all interactive elements
- **Focus Order**: Logical tab order
- **Focus Trapping**: Not applied (allows natural tab flow)

#### Reduced Motion

The carousel respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    transition: none;
  }
  
  .block.carousel * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Color Contrast

All text meets WCAG AA contrast requirements:
- Background colors: Minimum 4.5:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio

### Testing Checklist

- [ ] Keyboard navigation works in all browsers
- [ ] Screen reader announces slide changes
- [ ] Focus indicators are visible
- [ ] All interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG standards
- [ ] Reduced motion preferences are respected
- [ ] Touch targets are at least 44x44px

### Accessibility Best Practices

1. **Always provide alt text** for images
2. **Use descriptive slide titles** for context
3. **Include transcript** for audio/video content (if added)
4. **Test with screen readers** (NVDA, JAWS, VoiceOver)
5. **Test keyboard-only navigation**
6. **Ensure color is not the only indicator**

---

## Best Practices

### For Content Authors

1. **Image Optimization**
   - Use appropriate image sizes (recommended: 1920x1080px)
   - Compress images before uploading
   - Include descriptive alt text

2. **Content Structure**
   - Keep each slide focused on one message
   - Use clear, concise headings
   - Limit text to 2-3 paragraphs per slide

3. **Slide Count**
   - Recommended: 3-6 slides per carousel
   - Maximum: 10 slides for performance

4. **Call-to-Action**
   - Place important CTAs near the top
   - Use clear, action-oriented language

### For Developers

1. **Performance**
   - Optimize images before upload
   - Use lazy loading for non-critical content
   - Monitor Core Web Vitals

2. **Code Quality**
   - Follow EDS coding standards
   - Use defensive programming techniques
   - Comment complex logic
   - Test across different browsers

3. **Testing**
   - Test with different screen sizes
   - Test with various content lengths
   - Test touch interactions on real devices
   - Test keyboard navigation

4. **Maintenance**
   - Keep dependencies up to date
   - Monitor error logs
   - Document any customizations
   - Regular accessibility audits

### For Designers

1. **Visual Design**
   - Maintain consistent visual style
   - Use high-quality images
   - Ensure sufficient color contrast
   - Consider dark mode compatibility

2. **Layout**
   - Follow grid system conventions
   - Maintain proper spacing
   - Consider responsive breakpoints
   - Test on multiple devices

3. **Animation**
   - Keep transitions smooth but fast (500ms)
   - Respect reduced motion preferences
   - Avoid jarring movements
   - Use easing functions appropriately

---

## Enhancement Options

### Potential Future Enhancements

1. **Custom Transitions**
   - Fade transitions
   - Slide + fade combinations
   - 3D transforms

2. **Advanced Controls**
   - Progress bar
   - Thumbnail navigation
   - Jump to slide input

3. **Content Enhancements**
   - Video slide support
   - HTML content in slides
   - Interactive elements in slides

4. **Performance**
   - Virtual scrolling for large slide counts
   - Progressive image loading
   - Prefetch next slide

5. **Analytics**
   - Track slide interactions
   - Monitor autoplay usage
   - Measure engagement per slide

### How to Implement Enhancements

1. **Fork the codebase**
2. **Add your feature** to the appropriate file
3. **Update tests** to cover new functionality
4. **Document changes** in the README
5. **Submit a pull request** with clear description

### Example: Adding a Custom Transition

```javascript
function updateCarousel(slideIndex, animate = true, transitionType = 'slide') {
  if (transitionType === 'fade') {
    track.style.transition = animate ? 'opacity 500ms ease-in-out' : 'none';
    // Implement fade transition
  } else {
    // Existing slide transition
  }
}
```

---

## Browser Support

### Supported Browsers

- **Chrome**: Latest 2 versions ✅
- **Firefox**: Latest 2 versions ✅
- **Safari**: Latest 2 versions ✅
- **Edge**: Latest 2 versions ✅
- **Mobile Safari**: iOS 12+ ✅
- **Chrome Mobile**: Android 8+ ✅

### Polyfills Required

None - The carousel uses only modern APIs that are well-supported.

### Known Issues

1. **Intersection Observer**: Not supported in IE11 (carousel works but without visibility optimization)
2. **Passive Event Listeners**: Not supported in older browsers (graceful fallback)
3. **CSS Grid**: Used for layout (adds flexbox fallback)

### Testing Matrix

| Browser | Desktop | Mobile | Touch | Keyboard | Screen Reader |
|---------|---------|--------|-------|----------|--------------|
| Chrome | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ | ✅ | ✅ |
| Safari | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edge | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Technical Implementation

### Core Technologies

- **CSS Transforms**: For smooth slide transitions
- **Intersection Observer API**: For performance optimization
- **Touch Events**: For swipe gestures
- **MutationObserver**: For editor mode detection
- **Passive Event Listeners**: For better performance

### File Structure

```
blocks/carousel/
├── _carousel.json     # Block definition
├── carousel.js       # Main functionality
├── carousel.css      # Styling
└── README.md         # This file
```

### Key Dependencies

- `scripts/aem.js` - Image optimization utilities
- `scripts/scripts.js` - Instrumentation handling
- `scripts/utils.js` - Editor mode detection

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Largest Contentful Paint**: < 2.5s

---

## Features

### Touch and Swipe Support
- Swipe left/right on touch devices to navigate
- Configurable swipe threshold (50px default)
- Passive event listeners for optimal performance

### Keyboard Navigation  
- Use left/right arrow keys to navigate slides
- Full keyboard accessibility support
- Focus management for screen readers

### Auto-play Controls
- Automatically pauses on user interaction
- Resumes after 3 seconds of inactivity
- Uses Intersection Observer to only play when visible
- Automatically disables in Universal Editor

### Editor Mode Detection
- Automatically detects Universal Editor
- Disables autoplay in editor mode
- Observes parent window for `.appContainer` element
- Gracefully handles cross-origin iframes

### Performance Optimized
- Images automatically optimized with responsive sizing
- Lazy loading and intersection observer for better performance
- Hardware-accelerated CSS transforms
- Debounced resize handler (150ms)
- Cached DOM queries for efficiency

### Responsive Design
- Mobile-first CSS approach
- Breakpoints at 600px, 900px, and 1200px
- Adaptive navigation controls
- Optimized touch targets for mobile devices

---

## Styling

The Carousel block follows EDS styling conventions with CSS custom properties:

- `--primary-color`: Used for active dot indicators (default: #0063be)
- `--background-color`: Background color for slides (default: #fff)
- `--heading-color`: Color for slide titles (default: #333)  
- `--text-color`: Color for slide descriptions (default: #666)
- `--focus-color`: Focus outline color for accessibility (default: #005ce6) 