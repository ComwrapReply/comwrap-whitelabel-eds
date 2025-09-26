# Headline Block

A flexible headline block component that displays a subtitle (p element) and title (h3 element) with two background variants.

## Features

- **Two Background Variants**: Light and dark themes
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: ARIA attributes, focus management, and keyboard navigation
- **Theme Integration**: Uses CSS custom properties from the theme system
- **Semantic HTML**: Proper heading hierarchy and structure

## Usage

### Content Model

The headline block includes three fields:

1. **Subtitle** (text): Short descriptive text displayed above the title
2. **Title** (text): Main headline text
3. **Background Variant** (select): Choose between "Light" and "Dark" backgrounds

### Background Variants

#### Light Variant (Default)
- Light gradient background using theme variables
- Dark text color for optimal readability
- Blue accent color for subtitle

#### Dark Variant
- Dark gradient background using theme variables
- Light text color for optimal readability
- Blue accent color for subtitle

## CSS Classes

### Block Structure
- `.block.headline` - Main block container
- `.headline-wrapper` - Content wrapper
- `.headline` - Inner content container
- `.headline-subtitle` - Subtitle styling (p element)
- `.headline-title` - Title styling (h3 element)

### Background Variants
- `.light` - Light background variant (default)
- `.dark` - Dark background variant

## Responsive Behavior

- **Mobile (≤768px)**: Reduced padding and font sizes
- **Tablet (769px-1024px)**: Medium padding and font sizes
- **Desktop (≥1025px)**: Full padding and font sizes

## Accessibility Features

- Proper heading hierarchy with h3 element
- ARIA attributes for screen readers
- Focus management for keyboard navigation
- High contrast mode support
- Reduced motion support

## Theme Variables Used

- `--background-color` - Primary background color
- `--text-color` - Primary text color
- `--light-color` - Light background/shadow color
- `--dark-color` - Dark text/border color
- `--link-color` - Accent color for subtitle
- `--heading-font-family` - Font family for title
- `--body-font-family` - Font family for subtitle
- `--heading-font-size-xl` - Large heading size
- `--heading-font-size-l` - Medium heading size
- `--body-font-size-s` - Small body text size
- `--body-font-size-xs` - Extra small body text size

## Example Usage

```html
<div class="block headline light">
  <div class="headline-wrapper">
    <div class="headline">
      <p class="headline-subtitle">Welcome to our site</p>
      <h3 class="headline-title">Amazing Products Await</h3>
    </div>
  </div>
</div>
```

## JavaScript Features

- Defensive coding with error handling
- Automatic class application based on content
- Accessibility enhancements
- Development logging for debugging

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Mobile-first responsive design
