# Component Requirement Details - Facts and Figures Cards Block

## Overview
The Facts and Figures Cards block is a flexible component that displays statistical information and key facts in various card layouts. It supports multiple card variants with different sizes, typography, and visual treatments, including highlighted cards with special styling.

## Component Structure

### Block Configuration
- **Component Name**: Facts and Figures Cards
- **Block Type**: Franklin Block
- **Component Group**: {site.name} - Content
- **Block Classes**: `facts-figures-cards-container`, `facts-figures-cards-wrapper`, `facts-figures-cards`

### File Structure
```
blocks/facts-figures-cards/
├── _facts-figures-cards.json
├── facts-figures-cards.css
├── facts-figures-cards.js
└── index.js
```

## Card Variants

### 1. Card H4 - Default
- **Width**: 4 columns (480px)
- **Typography**: H4 (Albert Sans SemiBold, 32px, line-height 40px)
- **Text Color**: #000000
- **Background**: Warm White Gradient (from #ffffff to #f7f6f5)
- **Text Limit**: Maximum 45 characters
- **Padding**: 56px
- **Text Alignment**: Center

### 2. Card H3 - Highlighted
- **Width**: 4 columns (480px)
- **Typography**: H3 (Albert Sans SemiBold, 44px, line-height 56px)
- **Text Color**: #FFFFFF
- **Background**: Blue Gradient
- **Text Limit**: Maximum 45 characters
- **Padding**: 56px
- **Text Alignment**: Center

### 3. Card H5 - Default Short Text
- **Width**: 5 columns (610px)
- **Typography**: H5 (Albert Sans SemiBold, 24px, line-height 32px)
- **Text Color**: #000000
- **Background**: Warm White Gradient (from #ffffff to #f7f6f5)
- **Text Limit**: Maximum 80 characters
- **Padding**: 56px
- **Text Alignment**: Left

### 4. Card H5 - Default Long Text
- **Width**: 5 columns (610px)
- **Typography**: H5 (Albert Sans SemiBold, 24px, line-height 32px)
- **Text Color**: #000000
- **Background**: Warm White Gradient (from #f7f6f5 to #ffffff)
- **Text Limit**: Maximum 200 characters
- **Padding**: 56px
- **Text Alignment**: Left

## Layout Configurations

### 3 Cards Layout
- **Grid**: 3 cards in a row
- **Card Distribution**: Flexible based on content
- **Responsive**: Stacks on mobile devices

### 4 Cards Layout
- **Grid**: 4 cards in a row
- **Card Distribution**: Equal width distribution
- **Responsive**: 2x2 grid on tablet, single column on mobile

### 6 Cards Layout
- **Grid**: 6 cards in a row
- **Card Distribution**: Equal width distribution
- **Responsive**: 3x2 grid on tablet, single column on mobile

### 5 Cards Layout
- **Grid**: 5 cards utilizing full grid width
- **Card Distribution**: Flexible width distribution
- **Responsive**: Adaptive grid based on screen size

## Design System Integration

### Typography
- **Font Family**: Albert Sans
- **H3**: SemiBold, 44px, line-height 56px
- **H4**: SemiBold, 32px, line-height 40px
- **H5**: SemiBold, 24px, line-height 32px

### Colors
- **Primary Text**: #000000 (Black)
- **Highlighted Text**: #FFFFFF (White)
- **Brand Blue**: #0063BE
- **Grey Text**: #777673
- **Background White**: #FFFFFF
- **Background Warm White**: #F7F6F5

### Gradients
- **Warm White Gradient**: Linear gradient from #ffffff to #f7f6f5
- **Blue Gradient**: Brand-specific blue gradient for highlighted cards

## Animation Requirements

### Entry Animation
- **Trigger**: Elements enter viewport from the left (entry point = start position)
- **Behavior**: Elements slide vertically from bottom to top toward center of viewport
- **Timing**: Smooth transition with consistent behavior across all card variants
- **Performance**: Hardware-accelerated animations for smooth performance

### Scroll Behavior
- **Direction**: Vertical scrolling
- **Trigger Point**: When cards reach midpoint of viewport
- **Alignment**: Cards align correctly when reaching mid-position
- **Responsive**: Animation behavior consistent across all device sizes

## Responsive Design

### Desktop (1920px+)
- **Grid System**: 12-column grid with 90px columns
- **Gutters**: 40px between columns
- **Card Spacing**: 40px between cards
- **Maximum Width**: 1520px container

### Tablet (768px - 1919px)
- **Grid System**: Adaptive grid based on screen size
- **Card Distribution**: 2-3 cards per row
- **Spacing**: Proportional spacing maintained

### Mobile (320px - 767px)
- **Grid System**: Single column layout
- **Card Distribution**: Stacked vertically
- **Spacing**: Reduced spacing for mobile optimization

## Content Management

### Required Fields
- **Card Text**: Main content text for each card
- **Card Type**: Selection of card variant (H4 default, H3 highlighted, H5 short, H5 long)
- **Highlight Status**: Boolean for highlighted cards
- **Card Order**: Optional ordering for card sequence

### Optional Fields
- **Background Color Override**: Custom background color option
- **Text Color Override**: Custom text color option
- **Custom Padding**: Override default padding values
- **Animation Disable**: Option to disable animations

## Technical Implementation

### CSS Classes
```css
.facts-figures-cards-container {
  /* Container styles - no direct styling */
}

.facts-figures-cards-wrapper {
  /* Wrapper styles for layout and spacing */
}

.facts-figures-cards {
  /* Main block styles */
}

.facts-figures-card {
  /* Individual card styles */
}

.facts-figures-card--h4-default {
  /* H4 default card variant */
}

.facts-figures-card--h3-highlighted {
  /* H3 highlighted card variant */
}

.facts-figures-card--h5-short {
  /* H5 short text card variant */
}

.facts-figures-card--h5-long {
  /* H5 long text card variant */
}
```

### JavaScript Requirements
- **Animation Controller**: Handle entry animations and scroll triggers
- **Responsive Handler**: Manage layout changes on resize
- **Accessibility**: Ensure proper ARIA labels and keyboard navigation
- **Performance**: Lazy loading for off-screen cards

### AEMaaCS Integration
- **Resource Type**: `core/franklin/components/block/v1/block`
- **Template**: Facts and Figures Cards
- **Model**: facts-figures-cards
- **Filter**: facts-figures-cards

## Accessibility Requirements

### WCAG Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic markup
- **Focus Management**: Clear focus indicators

### Semantic HTML
- **Structure**: Proper heading hierarchy (H3, H4, H5)
- **Landmarks**: Appropriate ARIA landmarks
- **Descriptive Text**: Meaningful content for assistive technologies

## Performance Considerations

### Optimization
- **CSS**: Scoped styles to prevent conflicts
- **JavaScript**: Minimal JavaScript footprint
- **Images**: Optimized assets and lazy loading
- **Animations**: Hardware-accelerated CSS animations

### Loading Strategy
- **Critical CSS**: Inline critical styles
- **Non-critical CSS**: Loaded asynchronously
- **JavaScript**: Deferred loading for non-essential functionality

## Browser Support

### Modern Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Fallbacks
- **CSS Grid**: Flexbox fallback for older browsers
- **Animations**: Reduced motion support
- **Gradients**: Solid color fallbacks

## Testing Requirements

### Unit Tests
- **Component Rendering**: Verify correct HTML structure
- **Styling**: CSS class application and visual appearance
- **Responsive**: Layout behavior across breakpoints

### Integration Tests
- **AEMaaCS**: Content authoring and publishing
- **Animation**: Smooth animation performance
- **Accessibility**: Screen reader compatibility

### Visual Regression Tests
- **Design Fidelity**: Match Figma design specifications
- **Cross-browser**: Consistent appearance across browsers
- **Responsive**: Proper scaling and layout

## Content Guidelines

### Text Requirements
- **Character Limits**: Strict adherence to specified limits
- **Content Quality**: Clear, concise, and meaningful text
- **Localization**: Support for multiple languages
- **Accessibility**: Descriptive and informative content

### Visual Guidelines
- **Consistency**: Maintain design system standards
- **Hierarchy**: Clear visual hierarchy between card types
- **Contrast**: Ensure sufficient color contrast
- **Spacing**: Consistent spacing and alignment

## Future Enhancements

### Planned Features
- **Interactive Cards**: Hover effects and click interactions
- **Data Visualization**: Charts and graphs integration
- **Custom Animations**: Advanced animation options
- **Theme Support**: Dark mode and custom themes

### Scalability
- **Dynamic Content**: API-driven content updates
- **A/B Testing**: Built-in testing capabilities
- **Analytics**: Usage tracking and performance metrics
- **Personalization**: User-specific content delivery
