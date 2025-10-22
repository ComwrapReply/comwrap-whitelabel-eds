# Teaser Info Block

A flexible teaser block component that displays an image with overlay, title, description, and optional call-to-action button. Based on the Figma design, this block creates an engaging visual layout with interactive elements.

## Features

- **Image with Overlay**: Displays an image with customizable overlay effects
- **Flexible Content**: Title, description, and optional button
- **Interactive Elements**: Hover effects and analytics tracking
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Block Options**: Multiple layout and styling variants

## Block Options

### Layout Options
- **Default**: Image on left, content on right
- **Reversed**: Image on right, content on left
- **Stacked**: Image on top, content below (mobile-friendly)

### Style Options
- **Default**: Blue overlay on image
- **Dark Overlay**: Dark overlay covering entire image
- **Light Overlay**: Light overlay covering entire image

## Content Model

The block accepts the following fields:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `image` | Reference | Main image asset | Yes |
| `imageAlt` | Text | Alt text for accessibility | Yes |
| `title` | Text | Main heading | Yes |
| `description` | Rich Text | Description content | Yes |
| `link` | Text | Call-to-action URL | No |
| `linkText` | Text | Call-to-action text | No |
| `classes` | Multi-select | Block styling options | No |

## Usage

### Basic Usage
1. Add the Teaser Info block to your page
2. Upload an image and provide alt text
3. Enter a title and description
4. Optionally add a call-to-action link

### Advanced Usage
1. Select layout options (reversed, stacked)
2. Choose overlay styles (dark, light)
3. Customize button text and link

## Styling

The block uses semantic CSS classes for easy customization:

- `.teaser-info-image-wrapper` - Image container
- `.teaser-info-image` - Image element
- `.teaser-info-content` - Content container
- `.teaser-info-title` - Title element
- `.teaser-info-description` - Description element
- `.teaser-info-button` - Call-to-action button

## Responsive Behavior

- **Desktop**: Side-by-side layout with 760px image width
- **Tablet**: Reduced image size, maintained side-by-side layout
- **Mobile**: Stacked layout with full-width image

## Accessibility Features

- Proper heading hierarchy
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

## Analytics Integration

The block automatically tracks button clicks when `window.dataLayer` is available:

```javascript
{
  event: 'block_interaction',
  block_type: 'teaser-info',
  action: 'button_click',
  element: 'button_text'
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized image loading
- Efficient CSS animations
- Minimal JavaScript footprint
- Lazy loading support

## Examples

### Basic Teaser
```
Image: hero-image.jpg
Title: "Check out our career opportunities"
Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
Link: "/careers"
Link Text: "Learn More"
```

### Reversed Layout with Dark Overlay
```
Image: product-image.jpg
Title: "New Product Launch"
Description: "Discover our latest innovation..."
Classes: ["reversed", "dark-overlay"]
```

## Development Notes

- Uses Albert Sans font family
- Primary color: #0073dd
- Follows EDS block patterns
- Compatible with Universal Editor
- Supports multisite theming
