# Buttons Container Block

A flexible container block for displaying multiple buttons with configurable layout and styling options using element grouping patterns.

## Features

- **Container Layout**: Stack or align button arrangements
- **Button Styles**: Primary and secondary button variants
- **Element Grouping**: Uses `classes_` prefixed fields for configuration
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: Full keyboard navigation and screen reader support
- **Animations**: Optional fade-in and slide-up effects

## Block Options (Element Grouping)

### Layout Options
- `classes_layout`: Controls button arrangement
  - `stack`: Vertical arrangement (default on mobile)
  - `align`: Horizontal arrangement with alignment

### Effects Options
- `classes_effects`: Multiple effects can be applied
  - `fade-in`: Fade in animation
  - `slide-up`: Slide up animation
  - `shadow`: Add shadow effect
  - `border`: Enhanced border styling

## Usage

### In Universal Editor
1. Add "Buttons Container" block to your page
2. Configure layout and effects using the block options
3. Add "Button Item" components as children
4. Configure each button with text, link, and style (primary/secondary)

### Content Model

#### Container Model (`buttons`)
```json
{
  "classes_layout": "stack|align",
  "classes_effects": "fade-in,slide-up,shadow,border"
}
```

#### Button Item Model (`button-item`)
```json
{
  "link": "/path/to/page",
  "linkText": "Button Text",
  "linkTitle": "Button Title",
  "linkType": "primary|secondary"
}
```

## CSS Classes

### Container Classes
- `.block.buttons` - Main block container
- `.buttons-wrapper` - Content wrapper
- `.buttons` - Buttons container

### Layout Classes
- `.stack` - Vertical button arrangement
- `.align` - Horizontal button arrangement

### Effect Classes
- `.fade-in` - Fade in animation
- `.slide-up` - Slide up animation
- `.shadow` - Shadow effect
- `.border` - Enhanced border

### Button Classes
- `.button` - Base button class
- `.primary` - Primary button style
- `.secondary` - Secondary button style

## Responsive Behavior

- **Mobile**: Always stacks vertically regardless of layout setting
- **Tablet**: Respects layout setting with adjusted spacing
- **Desktop**: Full layout options with enhanced spacing

## Accessibility Features

- Full keyboard navigation support
- Proper focus indicators
- Screen reader compatible
- High contrast mode support
- Reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Example Implementation

```html
<div class="buttons stack fade-in shadow">
  <div class="buttons-wrapper">
    <div class="buttons">
      <div class="button-item">
        <a href="/primary-action" class="button primary">Primary Action</a>
      </div>
      <div class="button-item">
        <a href="/secondary-action" class="button secondary">Secondary Action</a>
      </div>
    </div>
  </div>
</div>
```

## Development Notes

This block demonstrates the element grouping pattern for Universal Editor blocks, allowing multiple configuration options through `classes_` prefixed fields. The implementation includes proper error handling, defensive coding, and follows the project's coding standards.
