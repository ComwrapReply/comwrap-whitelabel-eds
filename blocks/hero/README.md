# Hero Block

The Hero block displays a full-width hero section with a background image, text content, and optional CTA buttons.

## Features

- **Background Image**: Full-width background image with alt text support
- **Rich Text Content**: Supports headings and formatted text
- **Primary CTA Button**: Configurable call-to-action button with multiple style options
- **Secondary CTA Button**: Optional secondary call-to-action button
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Includes proper focus states and semantic HTML

## Content Model Fields

### Image
- **Image** (required): Background image for the hero section
- **Alt**: Alternative text for the background image

### Text Content
- **Text** (required): Rich text content including headings and paragraphs

### Primary CTA Button
- **Primary CTA Link**: URL for the primary button (internal or external)
- **Primary CTA Label**: Text displayed on the primary button
- **Primary CTA Target**: Choose to open link in same window or new tab
- **Primary CTA Style**: Choose from button style options:
  - **Primary**: Solid background with link color
  - **Secondary**: Outlined button with transparent background
  - **Tertiary**: Solid white background with colored text
  - **Text**: Text-only button with underline

### Secondary CTA Button (Optional)
- **Secondary CTA Link**: URL for the secondary button
- **Secondary CTA Label**: Text displayed on the secondary button
- **Secondary CTA Target**: Choose to open link in same window or new tab
- **Secondary CTA Style**: Choose from same style options as primary button

## Usage

1. Add a Hero block to your page
2. Upload a background image
3. Add your hero text content (heading and description)
4. Configure the primary CTA button:
   - Add a link URL
   - Add button label text
   - Choose link target (same window or new tab)
   - Select a button style (Primary, Secondary, Tertiary, or Text)
5. Optionally add a secondary CTA button following the same steps
6. Preview and publish your changes

## Styling

The hero block uses CSS custom properties from the theme system for consistent styling across the site:

- `--background-color`: Used for button backgrounds and text
- `--link-color`: Primary button background color
- `--link-hover-color`: Primary button hover state
- `--text-color`: Text color for button states
- `--body-font-size-m`: Description text size

### Button Styles

- **Primary**: Solid colored button (recommended for main action)
- **Secondary**: Outlined button (good for secondary actions)
- **Tertiary**: White background button (alternative to primary)
- **Text**: Minimal text-only button (for less prominent actions)

## Accessibility

The hero block includes:
- Semantic HTML structure
- Proper focus states for keyboard navigation
- Alt text support for background images
- Color contrast for text readability
- Responsive touch targets for buttons

## Best Practices

1. **Keep text concise**: Hero text should be brief and impactful
2. **Use high-quality images**: Background images should be optimized and high-resolution
3. **Choose contrasting colors**: Ensure text is readable against the background image
4. **Limit CTAs**: Use 1-2 buttons maximum for better conversion
5. **Primary vs Secondary**: Use primary style for the main action, secondary for alternatives
6. **Descriptive labels**: Button labels should clearly indicate the action

## Example Configuration

**Use Case: Product Launch Hero**

- **Image**: High-quality product image
- **Text**: 
  ```
  <h1>Introducing Our Latest Innovation</h1>
  <p>Experience the future of technology with our groundbreaking new product.</p>
  ```
- **Primary CTA**:
  - Link: `/products/new-launch`
  - Label: `Learn More`
  - Target: Same Window
  - Style: Primary
- **Secondary CTA**:
  - Link: `/contact`
  - Label: `Contact Sales`
  - Target: Same Window
  - Style: Secondary

## Technical Implementation

The hero block uses:
- **Field Grouping**: CTA fields are grouped using underscore notation (`primaryCta_`, `secondaryCta_`)
- **Type Inference**: Links are automatically rendered with proper semantic HTML
- **CSS Classes**: Buttons receive appropriate classes based on selected styles
- **JavaScript Enhancement**: Semantic classes are added for improved styling and accessibility

