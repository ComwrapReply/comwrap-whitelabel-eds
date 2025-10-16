# Profile Card Block

A professional profile card component that displays personal information including photo, name, job title, and contact details. Based on the Figma design with responsive layout and accessibility features.

## Features

- **Professional Layout**: Clean, modern design with image and content side-by-side
- **Responsive Design**: Adapts to different screen sizes with mobile-first approach
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Multiple Variants**: Default, compact, centered, and card styling options
- **Contact Integration**: Clickable email links with proper mailto functionality
- **Semantic HTML**: Proper heading hierarchy and semantic structure

## Content Model

The profile card accepts the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | Reference | No | Profile photo (220x220px recommended) |
| `imageAlt` | Text | No | Alt text for the profile image |
| `name` | Text | Yes | Full name of the person |
| `title` | Text | No | Job title or position |
| `phone` | Text | No | Phone number |
| `email` | Text | No | Email address (automatically becomes clickable) |
| `classes` | Select | No | Style variant (default, compact, centered, card) |

## Style Variants

### Default
Standard layout with image on the left and content on the right, bordered with dashed line.

### Compact
Smaller image (120x120px) and tighter spacing for more condensed display.

### Centered
Stacked layout with image on top and centered text alignment.

### Card
Adds card styling with background, border radius, and subtle shadow.

## Usage Examples

### Basic Profile Card
```
| Profile Card |
|--------------|
| [Profile Image] |
| John Doe |
| Senior Developer |
| +1 (555) 123-4567 |
| john.doe@company.com |
```

### Compact Profile Card
```
| Profile Card |
|--------------|
| [Profile Image] |
| Jane Smith |
| Product Manager |
| +1 (555) 987-6543 |
| jane.smith@company.com |
| compact |
```

## Responsive Behavior

- **Desktop (>768px)**: Side-by-side layout with full-size image
- **Tablet (≤768px)**: Stacked layout with medium-size image
- **Mobile (≤480px)**: Stacked layout with smaller image and adjusted typography

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- ARIA labels for profile images and contact links
- Keyboard navigation support for interactive elements
- High contrast mode support
- Screen reader friendly content structure
- Focus indicators for all interactive elements

## Technical Implementation

### Files Structure
```
blocks/profile-card/
├── _profile-card.json    # Block definition and content model
├── profile-card.js       # JavaScript decoration and functionality
├── profile-card.css      # Styling and responsive design
├── index.js             # Entry point
└── README.md            # This documentation
```

### CSS Classes

#### Block Classes
- `.block.profile-card` - Main block container
- `.profile-card-wrapper` - Inner wrapper with flex layout

#### Content Classes
- `.profile-card-image` - Image container
- `.profile-card-content` - Content container
- `.profile-card-info` - Name and title container
- `.profile-card-name` - Person's name (h2 element)
- `.profile-card-title` - Job title
- `.profile-card-contact` - Contact information container
- `.profile-card-phone` - Phone number
- `.profile-card-email` - Email address
- `.profile-email-link` - Email link element

#### Variant Classes
- `.compact` - Compact variant styling
- `.centered` - Centered variant styling
- `.card` - Card variant styling

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (with CSS custom properties polyfill)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Lazy loading for profile images
- Optimized CSS with minimal specificity
- No external dependencies
- Efficient DOM manipulation
- Responsive images support

## Customization

The profile card uses CSS custom properties from the design system:

- `--color-primary` - Primary brand color for email links
- `--color-black` - Text color for name and title
- `--font-family-semibold` - Font for names and contact info
- `--font-family-regular` - Font for job titles
- `--space-*` - Spacing variables for consistent layout

## Known Issues

- None currently identified

## Version History

- **v1.0.0** - Initial implementation based on Figma design
  - Basic profile card functionality
  - Responsive design
  - Accessibility features
  - Multiple style variants
