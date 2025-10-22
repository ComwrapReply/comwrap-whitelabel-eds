# Teaser Info Block

A responsive content block that displays an image with an overlay alongside content including a heading, animated arrow, and body text.

## Overview

The Teaser Info block is designed to showcase content in an engaging way with:
- A prominent image with a blue overlay effect
- A large, eye-catching heading
- An animated arrow that draws attention
- Body text for additional details
- Support for image-left or image-right layouts

## Features

- **Responsive Design**: Adapts seamlessly from desktop to mobile
- **Animated Arrow**: Hover animation on the arrow element
- **Flexible Layout**: Choose between image-left (default) or image-right variants
- **Theme Integration**: Uses CSS custom properties for consistent theming
- **Accessibility**: Includes proper ARIA labels, focus states, and reduced motion support

## Usage

### Content Model Fields

The block accepts the following fields:

- **Image** (reference): Main image for the block
- **Image Alt Text** (text): Alternative text for the image
- **Heading** (text): Main heading text
- **Heading Type** (select): Choose between H1, H2, H3, or H4 (default: H2)
- **Body Text** (richtext): Main body content
- **Layout Variant** (select): Choose "Image Left" (default) or "Image Right"

### Example Configuration

#### Image Left (Default)
- Image: /content/dam/career-image.jpg
- Image Alt Text: "People working together"
- Heading: "Check out our career opportunities"
- Heading Type: H2
- Body Text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr..."
- Layout Variant: Image Left

#### Image Right
Same as above, but:
- Layout Variant: Image Right

## Styling

The block uses the following CSS custom properties for theming:

### Colors
- `--link-color` - Primary color for heading and arrow (default: #0073DD)
- `--text-color` - Body text color (default: #000)

### Typography
- `--heading-font-family` - Heading font (default: 'Albert Sans', sans-serif)
- `--body-font-family` - Body text font (default: 'Albert Sans', sans-serif)
- `--heading-font-size-xl` - Desktop heading size (default: 44px)
- `--heading-font-size-l` - Tablet heading size (default: 34px)
- `--heading-font-size-m` - Mobile heading size (default: 27px)
- `--body-font-size-s` - Desktop body size (default: 20px)
- `--body-font-size-xs` - Mobile body size (default: 17px)

## Responsive Behavior

### Desktop (1024px and up)
- Side-by-side layout with image and content
- Image: 760px width, 513px height
- 20px gap between sections
- Full typography sizes

### Tablet (768px - 1023px)
- Side-by-side layout maintained
- Image scales to 50% width, 400px height
- Reduced gaps and padding
- Slightly smaller typography

### Mobile (767px and below)
- Stacked vertical layout
- Image takes full width, 300px height
- Reduced spacing throughout
- Smallest typography sizes
- Image-right variant reverts to standard stacking

## CSS Classes

The block uses the following semantic classes:

- `.teaser-info-image-wrapper` - Image container
- `.teaser-info-image` - Image element
- `.teaser-info-image-overlay` - Blue overlay effect
- `.teaser-info-content-wrapper` - Content container
- `.teaser-info-heading-wrapper` - Heading and arrow container
- `.teaser-info-heading` - Heading element
- `.teaser-info-arrow-wrapper` - Arrow container
- `.teaser-info-arrow` - Arrow SVG element
- `.teaser-info-body-wrapper` - Body text container
- `.teaser-info-body-text` - Body paragraph elements

## Block Options

### Layout Variants

#### Image Left (Default)
Standard layout with image on the left, content on the right.

Classes: none (default)

#### Image Right
Reversed layout with image on the right, content on the left.

Classes: `image-right`

## Accessibility Features

- Proper semantic HTML structure
- ARIA labels for images
- Focus states for interactive elements
- Reduced motion support for animations
- Keyboard navigation support
- Proper heading hierarchy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### File Structure
- `_teaser-info.json` - Block definition and content model
- `teaser-info.js` - JavaScript functionality and DOM manipulation
- `teaser-info.css` - Styling and visual presentation
- `README.md` - Documentation

### Build Process

After making changes to the block definition JSON file, run:

`npm run build:json`

This merges the block definition into the component registry.

## Best Practices

1. **Image Quality**: Use high-quality images at least 1600px wide for best results
2. **Alt Text**: Always provide descriptive alt text for accessibility
3. **Heading Length**: Keep headings concise (2-3 lines maximum)
4. **Body Text**: Limit body text to 2-3 paragraphs for optimal readability
5. **Heading Type**: Use appropriate heading levels for proper document structure

## Customization

To customize the block for specific needs:

1. **Colors**: Override theme variables in your theme.css file
2. **Spacing**: Adjust gap values in the CSS
3. **Image Size**: Modify width/height values for different proportions
4. **Overlay**: Change overlay width, opacity, or color in CSS

## Known Limitations

- Image overlay is always positioned on the left (or right for image-right variant)
- Arrow animation is hover-only on desktop
- Maximum recommended heading length is 3 lines

## Future Enhancements

Potential improvements for future versions:
- Multiple overlay color options
- Configurable overlay position and opacity
- Additional animation options
- Button/CTA field support
- Background pattern options

