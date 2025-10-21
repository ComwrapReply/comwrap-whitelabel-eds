# Teaser Block

A flexible teaser component designed to showcase content with an image, heading, description, and up to two call-to-action buttons. Based on the Figma design system with primary brand color (#0073DD).

## Features

- **Image Support**: Display a hero image with optional overlay effect
- **Rich Content**: Heading with animated arrow and rich text description
- **Dual CTA Buttons**: Support for primary and secondary call-to-action buttons
- **Full Block Linking**: Option to make the entire teaser clickable
- **Layout Variants**: 5 different layout options for flexible positioning
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Analytics**: Built-in event tracking for button and block clicks

## Content Model

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Image | Reference | Yes | Main teaser image |
| Image Alt Text | Text | Yes | Alt text for accessibility |
| Heading | Text | Yes | Main heading text (displays in brand blue) |
| Description | Rich Text | No | Supporting description text |
| Full Block Link | Text | No | URL to make entire teaser clickable (only works when no buttons are present) |
| Primary Button Link | Text | No | URL for primary CTA button |
| Primary Button Text | Text | No | Text for primary CTA button |
| Primary Button Type | Select | No | Style: Primary or Secondary |
| Secondary Button Link | Text | No | URL for secondary CTA button |
| Secondary Button Text | Text | No | Text for secondary CTA button |
| Secondary Button Type | Select | No | Style: Primary or Secondary |
| Layout Style | Select | Yes | Layout variant (see below) |

### Layout Variants

1. **Image Left** (default)
   - Image on left side with blue overlay
   - Content on right
   - Matches Figma design
   - Best for: Standard teasers

2. **Image Right**
   - Image on right side
   - Content on left
   - Best for: Breaking up page rhythm

3. **Image Top**
   - Image spans full width at top
   - Content below
   - Centered heading and buttons
   - Best for: Mobile-first designs

4. **Image Bottom**
   - Content at top
   - Image below
   - Centered heading and buttons
   - Best for: Editorial content

5. **Image Background**
   - Image as background
   - Content overlay with semi-transparent background
   - Best for: Hero sections

## Usage

### Basic Teaser with Single Button

Single image, heading, description, and one CTA button.

**Settings:**
- Image: Upload your image
- Image Alt Text: "Team collaboration"
- Heading: "Check out our career opportunities"
- Description: "Join our team and make an impact..."
- Primary Button Link: "/careers"
- Primary Button Text: "View Jobs"
- Primary Button Type: Primary
- Layout Style: Image Left

### Teaser with Two Buttons

Include both primary and secondary CTAs.

**Settings:**
- Image: Upload your image
- Heading: "Discover Our Services"
- Description: "We offer comprehensive solutions..."
- Primary Button Link: "/services"
- Primary Button Text: "Learn More"
- Primary Button Type: Primary
- Secondary Button Link: "/contact"
- Secondary Button Text: "Contact Us"
- Secondary Button Type: Secondary
- Layout Style: Image Right

### Clickable Block (Card Style)

Make the entire teaser clickable without buttons.

**Settings:**
- Image: Upload your image
- Heading: "Featured Article"
- Description: "Read our latest insights..."
- Full Block Link: "/blog/article-title"
- Layout Style: Image Top
- **Important**: Do not add button fields when using Full Block Link

### Hero Section

Use as a hero banner with background image.

**Settings:**
- Image: Upload hero image
- Heading: "Welcome to Our Platform"
- Description: "Transform your business with..."
- Primary Button Link: "/get-started"
- Primary Button Text: "Get Started"
- Layout Style: Image Background

## Design Specifications

Based on Figma design system:

### Colors
- Primary Brand: #0073DD
- Text: #000000
- White: #FFFFFF

### Typography
- Heading: 44px / 56px line-height, Semi-Bold
- Body: 20px / 32px line-height, Regular
- Button: Based on theme variables

### Spacing
- Content Gap: 48px
- Element Gap: 16px
- Description Indent: 48px (left/right layouts)

### Components
- Arrow: Animated SVG arrow (96x48px)
- Image Overlay: 190px wide, 40% opacity (image-left variant)
- Buttons: Primary and Secondary styles

## Responsive Behavior

### Desktop (> 1024px)
- Full Figma design specifications
- Image: 760px width
- Content: 740px width

### Tablet (768px - 1024px)
- Image: 50% width
- Content: 50% width
- Reduced font sizes

### Mobile (< 768px)
- Stacked layout (all variants)
- Full-width image (300px height)
- Full-width content
- Full-width buttons
- Removed indentation

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear focus states for all buttons and links
- **Screen Readers**: Proper ARIA labels and alt text
- **Reduced Motion**: Respects user's motion preferences

## Analytics Events

The block automatically tracks:

### Button Clicks
Event: `teaser_cta_click`
Properties:
- `block_type`: "teaser"
- `button_position`: "primary" or "secondary"
- `button_text`: Button text content
- `button_url`: Button destination URL

### Block Link Clicks
Event: `teaser_block_click`
Properties:
- `block_type`: "teaser"
- `block_url`: Link destination URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Images are lazy-loaded by default
- Minimal JavaScript overhead
- CSS uses theme variables for consistency
- Optimized for Core Web Vitals

## Best Practices

1. **Image Quality**: Use high-quality images (recommended: 1600x900px for image-left/right)
2. **Heading Length**: Keep headings concise (max 2 lines)
3. **Description**: Aim for 2-3 paragraphs maximum
4. **Button Text**: Use action-oriented text (e.g., "Get Started" not "Click Here")
5. **Alt Text**: Write descriptive alt text for all images
6. **Full Block Link**: Only use when no buttons are needed
7. **Layout Choice**: Match layout to content hierarchy

## Examples

### Marketing Campaign
Image Left layout with heading, description, and two buttons for primary and secondary actions.

### Blog Post Teaser
Image Top layout with clickable full block link (no buttons) for clean card-style presentation.

### Hero Banner
Image Background layout with bold heading and single primary CTA button.

### Feature Highlight
Image Right layout with detailed description and secondary button for additional information.

## Troubleshooting

**Issue**: Full block link not working
- **Solution**: Remove all button fields. Full block link only works when no buttons are present.

**Issue**: Image overlay not showing
- **Solution**: Overlay only appears on "Image Left" layout variant.

**Issue**: Buttons not aligned
- **Solution**: Check that both button link and text fields are filled for each button.

**Issue**: Layout not responsive on mobile
- **Solution**: All layouts automatically stack on mobile. Check browser cache if issue persists.

## Related Blocks

- **Hero**: For full-width hero sections
- **Cards**: For grid-based content display
- **Columns**: For multi-column layouts

## Support

For questions or issues, please refer to the project documentation or contact the development team.

