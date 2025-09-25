# Facts and Figures Cards Block

## Overview

The Facts and Figures Cards block is a responsive layout component designed to display statistical data, key figures, and important metrics in an engaging card-based format. It features animated entry effects, customizable gradient backgrounds, and responsive grid layouts.

## Features

- **Responsive Grid Layout**: Automatically adapts from single-column mobile to multi-column desktop layouts
- **Scroll Animations**: Cards animate from bottom to top when scrolled into view
- **Gradient Backgrounds**: Support for blue and grey gradient options
- **Theme Integration**: Uses CSS custom properties for consistent theming
- **Accessibility**: Full ARIA support and keyboard navigation
- **Performance Optimized**: Lazy loading and reduced motion support

## Usage

### Adding the Facts and Figures Cards Block

1. In the Universal Editor, navigate to the "Blocks" section
2. Select "Facts and Figures Cards" from the available components
3. The block will be added with a default 3-column layout

### Configuring the Container

The Facts and Figures Cards block provides these configuration options:

- **Columns**: Number of columns (default: 3)
- **Rows**: Number of rows (default: 1)
- **Background Options**: Choose from blue gradient or grey gradient backgrounds

### Adding Individual Cards

Each Facts and Figures Card can contain:

- **Figure/Number**: The main statistic or number
- **Figure Unit**: Unit description (e.g., "billion", "%", "employees")
- **Description**: Rich text description of the statistic
- **Card Style**: Individual card background options

### Content Structure

The block follows this structure:
- Container: `facts-figures-cards` (allows only `facts-figures-card` children)
- Child Items: `facts-figures-card` (allows only `text` blocks)

## Technical Implementation

### File Structure

```
blocks/facts-figures-cards/
├── _facts-figures-cards.json    # Block definition and content model
├── facts-figures-cards.css      # Responsive styling with theme variables
├── facts-figures-cards.js       # JavaScript functionality and animations
├── index.js                     # Block entry point
└── README.md                    # This documentation file
```

### Block Definition

The block uses a container-child pattern similar to the Cards block:

- **Container**: `core/franklin/components/block/v1/block` resource type
- **Child Items**: `core/franklin/components/block/v1/block/item` resource type

### Content Model

#### Container Model (facts-figures-cards)
- `columns`: Text field for number of columns
- `rows`: Text field for number of rows  
- `classes`: Multiselect for gradient background options

#### Child Model (facts-figures-card)
- `figure`: Text field for the main number/statistic
- `figureUnit`: Text field for the unit description
- `description`: Rich text field for card description
- `classes`: Multiselect for card styling options

### CSS Architecture

The CSS follows the project's theme variable system:

```css
/* Container styling */
.block.facts-figures-cards {
  /* Uses theme variables */
}

/* Individual card styling */
.block.facts-figures-card {
  /* Scoped styling with theme integration */
}
```

#### Available CSS Classes

**Card Background Options:**
- `.light-bg` - Light background using `--light-color`
- `.dark-bg` - Dark background using `--link-color`
- `.blue-gradient` - Blue gradient using `--link-color` to `--link-hover-color`
- `.grey-gradient` - Grey gradient using `--light-color` to `--dark-color`

**Layout Classes:**
- `.cols-1`, `.cols-2`, `.cols-3`, `.cols-4` - Dynamic column layouts
- `.facts-figures-cards-wrapper` - Grid container

### JavaScript Features

#### Animation Controller
- Scroll-triggered animations using Intersection Observer
- Staggered card animations with configurable delay
- Reduced motion support for accessibility

#### Responsive Handler
- Window resize handling for layout optimization
- Performance-optimized with debounced events

#### Content Processing
- Automatic figure/description detection
- Semantic HTML structure enhancement
- Unit extraction and formatting

### Responsive Breakpoints

- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1023px)**: 2 columns for 3+ column layouts
- **Desktop (1024px+)**: Full column count as configured
- **Large Desktop (1200px+)**: Optimized spacing

### Accessibility Features

- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management and indicators
- High contrast mode support
- Reduced motion preference handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Chrome Mobile

## Performance Considerations

- CSS animations use `transform` and `opacity` for hardware acceleration
- Intersection Observer for efficient scroll detection
- Debounced resize handlers to prevent excessive reflows
- Lazy loading support for off-screen content

## Example Usage

### Basic Configuration

```json
{
  "columns": "3",
  "rows": "1",
  "classes": "blue-gradient"
}
```

### Card Content Example

```json
{
  "figure": "€7.1",
  "figureUnit": "billion",
  "description": "<p>Sales in 2021</p>",
  "classes": "dark-bg"
}
```

## Troubleshooting

### Cards Not Animating
- Check if `prefers-reduced-motion` is enabled
- Verify Intersection Observer support in browser
- Ensure cards are not already visible on page load

### Layout Issues
- Verify `columns` and `rows` template properties
- Check CSS Grid support in target browsers
- Validate responsive breakpoint behavior

### Styling Problems
- Ensure all CSS uses theme variables from `styles/styles.css`
- Verify class names match the defined options
- Check for CSS conflicts with other blocks

## Development Notes

- All styling must use CSS custom properties - no hardcoded values
- JavaScript follows Airbnb style guide with defensive coding
- Block classes follow the pattern: `facts-figures-cards-container`, `facts-figures-cards-wrapper`, `facts-figures-cards`
- No styling should be applied to container classes
- Animation delays and durations are configurable via the CONFIG object
