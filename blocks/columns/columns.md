# Columns Block Documentation

## Overview

The Columns block is a responsive layout component that allows authors to organize content in multiple columns. It automatically adapts from a single-column mobile layout to a multi-column desktop layout, providing a flexible and user-friendly content organization system.

## Features

- **Responsive Design**: Automatically switches between single-column (mobile) and multi-column (desktop) layouts
- **Flexible Content**: Supports text, images, buttons, and titles within each column
- **Dynamic Column Detection**: Automatically detects and styles based on the number of columns
- **Image Optimization**: Special handling for image-only columns
- **Universal Editor Integration**: Seamless authoring experience with real-time preview

## Usage

### Adding the Columns Block

1. In the Universal Editor, navigate to the "Blocks" section
2. Select "Columns" from the available components
3. The block will be added with a default 2-column layout

### Configuring Columns

The Columns block provides two configuration options:

- **Columns**: Number of columns (default: 2)
- **Rows**: Number of rows (default: 1)

### Adding Content to Columns

Each column can contain:
- Text components
- Image components
- Button components
- Title components

Simply drag and drop these components into the desired column within the Columns block.

## Technical Implementation

### File Structure

```
blocks/columns/
├── _columns.json    # Block definition and content model
├── columns.css      # Responsive styling and layout
├── columns.js       # JavaScript functionality
└── columns.md       # This documentation file
```

### Block Definition

The block is defined using the `core/franklin/components/columns/v1/columns` resource type with the following template properties:

```json
{
  "template": {
    "columns": "2",
    "rows": "1"
  }
}
```

### Content Model

The Columns block includes two configurable fields:

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `columns` | number | Number of columns in the layout | 2 |
| `rows` | number | Number of rows in the layout | 1 |

### CSS Classes

The block uses the following CSS class hierarchy:

- `.columns` - Main container wrapper
- `.columns-{n}-cols` - Dynamic class based on column count (e.g., `columns-2-cols`, `columns-3-cols`)
- `.columns-img-col` - Special class for columns containing only images

### JavaScript Functionality

The `columns.js` file provides:

1. **Dynamic Column Detection**: Counts columns and applies appropriate CSS classes
2. **Image Column Identification**: Detects columns containing only images and applies special styling
3. **Responsive Enhancement**: Enhances the responsive behavior of the layout

## Responsive Behavior

### Mobile Layout (< 900px)
- **Layout**: Single column (stacked vertically)
- **Image Order**: Images appear first in the content flow
- **Spacing**: Uses default block spacing
- **Content Flow**: Top to bottom reading order

### Desktop Layout (≥ 900px)
- **Layout**: Multi-column (side-by-side)
- **Image Order**: Natural document order
- **Spacing**: 24px gap between columns
- **Alignment**: Center-aligned columns with equal width distribution

## Styling Guidelines

### CSS Structure

The CSS follows a mobile-first approach:

```css
/* Mobile styles (default) */
.columns > div {
  display: flex;
  flex-direction: column;
}

/* Desktop styles (≥ 900px) */
@media (width >= 900px) {
  .columns > div {
    align-items: center;
    flex-direction: unset;
    gap: 24px;
  }
  
  .columns > div > div {
    flex: 1;
    order: unset;
  }
}
```

### Image Handling

Images within columns are automatically optimized:

- **Full Width**: Images scale to fill their column width
- **Image-Only Columns**: Special styling for columns containing only images
- **Responsive Images**: Automatic responsive behavior

## Accessibility

### Semantic Structure
- Uses proper HTML structure for screen readers
- Maintains logical reading order across all screen sizes
- Supports keyboard navigation

### Screen Reader Support
- Column structure is properly announced
- Content order is logical regardless of visual layout
- Images include appropriate alt text

## Browser Support

The Columns block is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

### CSS Optimization
- Uses efficient CSS selectors
- Minimal layout-triggering properties
- Optimized for smooth animations

### JavaScript Performance
- Lightweight DOM manipulation
- Efficient event handling
- Minimal impact on page load times

## Common Use Cases

### Content Layout
- **Two-Column Text**: Side-by-side text content
- **Image and Text**: Image with accompanying text
- **Feature Lists**: Multiple features in separate columns
- **Comparison Tables**: Comparing different options

### Marketing Content
- **Product Features**: Highlighting different product aspects
- **Testimonials**: Multiple customer testimonials
- **Benefits**: Different benefit statements
- **Call-to-Actions**: Multiple action buttons

## Best Practices

### Content Organization
1. **Logical Grouping**: Group related content in the same column
2. **Balanced Content**: Keep column content roughly equal in length
3. **Clear Hierarchy**: Use headings to establish content hierarchy
4. **Consistent Styling**: Apply consistent styling across columns

### Responsive Design
1. **Mobile-First**: Always consider mobile experience first
2. **Content Priority**: Place most important content in the first column
3. **Image Optimization**: Use appropriately sized images
4. **Text Readability**: Ensure text is readable at all screen sizes

### Performance
1. **Image Optimization**: Use WebP format when possible
2. **Content Length**: Avoid extremely long content in columns
3. **Loading Speed**: Consider content loading order
4. **Testing**: Test across different devices and browsers

## Troubleshooting

### Common Issues

**Columns not displaying correctly**
- Check that the block is properly configured in `component-definitions.json`
- Verify CSS classes are being applied correctly
- Ensure responsive breakpoints are working

**Content not appearing in columns**
- Verify that content components are properly nested
- Check that the column filter allows the content type
- Ensure JavaScript is loading correctly

**Responsive behavior not working**
- Check CSS media queries
- Verify viewport meta tag is present
- Test on actual devices, not just browser dev tools

### Debug Mode

To enable debug mode, add the following to the browser console:

```javascript
// Enable debug logging for columns
window.columnsDebug = true;
```

## Future Enhancements

### Planned Features
- **Column Width Control**: Custom column width settings
- **Vertical Alignment**: Control vertical alignment of column content
- **Advanced Spacing**: More granular spacing controls
- **Animation Support**: Smooth transitions between layouts

### Customization Options
- **Theme Integration**: Better integration with theme system
- **Custom Breakpoints**: Configurable responsive breakpoints
- **Column Borders**: Optional column dividers
- **Background Colors**: Column-specific background colors

## Support

For technical support or feature requests:
- Check the project documentation
- Review the component requirements
- Test with different content types and configurations
- Verify browser compatibility

## Version History

- **v1.0.0**: Initial implementation with basic column functionality
- **v1.1.0**: Added responsive design and image optimization
- **v1.2.0**: Enhanced JavaScript functionality and accessibility

---

*This documentation is maintained as part of the Universal Editor block system. For updates or corrections, please refer to the project repository.*
