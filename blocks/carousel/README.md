# Carousel Block

This block creates a responsive, touch-enabled carousel component that displays a series of slides with images and content. The carousel includes navigation arrows, dot indicators, and supports various customization options.

## Usage

To use the Carousel block, create a table in your document with "Carousel" in the first cell, followed by rows containing your slide content. Each row represents one slide.

| Carousel |
|----------|
| ![Image 1](./image1.jpg) **Slide 1 Title** This is the content for the first slide. |
| ![Image 2](./image2.jpg) **Slide 2 Title** This is the content for the second slide. |
| ![Image 3](./image3.jpg) **Slide 3 Title** This is the content for the third slide. |

## Variations

The Carousel block supports several variations that can be specified in parentheses after the block name:

### Auto-play
`Carousel (auto-play)` - Automatically advances slides every 5 seconds

### No Arrows  
`Carousel (no-arrows)` - Hides navigation arrows

### No Dots
`Carousel (no-dots)` - Hides dot navigation indicators  

### Full Height
`Carousel (full-height)` - Makes the carousel take up more vertical space (60-85vh)

### Overlay Content
`Carousel (overlay)` - Places content as an overlay on top of images with dark gradient background

### Compact
`Carousel (compact)` - Smaller carousel height for use in tight spaces

### Combining Variations
You can combine multiple variations:
`Carousel (auto-play, overlay, no-dots)` - Auto-playing carousel with overlay content and no dots

## Authoring

When creating content for the Carousel block in Google Docs or Microsoft Word:

1. Create a table with at least two rows
2. In the first cell of the first row, type "Carousel" (with any desired variations in parentheses)
3. In subsequent rows, add your slide content:
   - Include an image in each slide for best visual impact
   - Add headings and text content as needed
   - Each row becomes one slide

### Content Structure per Slide
- **Images**: Place images at the beginning of the slide content
- **Titles**: Use headings (H1-H6) for slide titles  
- **Description**: Add paragraphs for slide descriptions
- **Mixed Content**: You can combine multiple elements in each slide

## Features

### Touch and Swipe Support
- Swipe left/right on touch devices to navigate
- Configurable swipe threshold for better UX

### Keyboard Navigation  
- Use left/right arrow keys to navigate slides
- Full keyboard accessibility support

### Auto-play Controls
- Pauses on hover or touch interaction
- Resumes after user interaction ends
- Uses Intersection Observer to only play when visible

### Performance Optimized
- Images are automatically optimized with responsive sizing
- Lazy loading and intersection observer for better performance
- Respects `prefers-reduced-motion` for accessibility

### Responsive Design
- Mobile-first CSS with breakpoints at 600px, 900px, and 1200px
- Adapts navigation and sizing based on screen size
- Optimized touch targets for mobile devices

## Styling

The Carousel block follows EDS styling conventions with CSS custom properties:

- `--primary-color`: Used for active dot indicators (default: #0063be)
- `--background-color`: Background color for slides (default: #fff)
- `--heading-color`: Color for slide titles (default: #333)  
- `--text-color`: Color for slide descriptions (default: #666)
- `--focus-color`: Focus outline color for accessibility (default: #005ce6)

## Accessibility

The carousel includes comprehensive accessibility features:

- ARIA labels for all interactive elements
- Keyboard navigation support
- Focus management and visual focus indicators
- Respects reduced motion preferences
- Semantic HTML structure
- Screen reader friendly content

## Technical Implementation

- Uses CSS transforms for smooth slide transitions
- Implements touch event handling with passive listeners
- Leverages Intersection Observer API for performance
- Follows EDS patterns with proper instrumentation handling
- Optimizes images using EDS's `createOptimizedPicture` utility

## Browser Support

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Includes `-webkit-` prefixes for Safari compatibility
- Graceful degradation on older browsers
- Touch events supported on all touch-capable devices 