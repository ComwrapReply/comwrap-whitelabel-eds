# Hero Block

The Hero block displays a full-width hero section with a background image, text content, and optional CTA buttons.

## Features

- **Background Image**: Full-width background image with alt text support
- **Rich Text Content**: Supports headings and formatted text
- **Button Components**: Add any number of button components as children
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Includes proper focus states and semantic HTML

## Content Model Fields

### Image
- **Image** (required): Background image for the hero section
- **Alt**: Alternative text for the background image

### Text Content
- **Text** (required): Rich text content including headings and paragraphs

### Buttons
Instead of configuring buttons in the hero dialog, you can add Button components as children to the hero block. This provides more flexibility:
- Add any number of buttons
- Each button can be configured independently with its own style
- Button component fields:
  - **Link**: URL for the button (internal or external)
  - **Text**: Button label text
  - **Title**: Optional title attribute for accessibility
  - **Type**: Button style (default, primary, secondary)

## Usage

1. Add a Hero block to your page
2. Configure the hero block:
   - Upload a background image and provide alt text
   - Add your hero text content (heading and description) using the rich text editor
3. Add Button components as children to the hero:
   - Click the "+" button in the content tree under the hero block
   - Select "Button" from the component list
   - Configure each button:
     - Add a link URL
     - Add button text
     - Optional: Add a title for accessibility
     - Select button type/style (default, primary, or secondary)
4. Add as many buttons as needed (typically 1-2 for best UX)
5. Preview and publish your changes

## Styling

The hero block uses CSS custom properties from the theme system for consistent styling across the site:

- `--background-color`: Used for button backgrounds and text
- `--link-color`: Primary button background color
- `--link-hover-color`: Primary button hover state
- `--text-color`: Text color for button states
- `--body-font-size-m`: Description text size

### Button Styles

The button component supports these styles:
- **Default**: Standard button styling
- **Primary**: Solid colored button (recommended for main action)
- **Secondary**: Outlined button (good for secondary actions)

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

### Hero Block Configuration:
- **Image**: High-quality product image
- **Alt**: `New innovative product showcase`
- **Text**: 
  ```html
  <h1>Introducing Our Latest Innovation</h1>
  <p>Experience the future of technology with our groundbreaking new product.</p>
  ```

### Button Components (added as children):

**Button 1 (Primary CTA):**
- Link: `/products/new-launch`
- Text: `Learn More`
- Title: `Learn more about our new product`
- Type: `primary`

**Button 2 (Secondary CTA):**
- Link: `/contact`
- Text: `Contact Sales`
- Title: `Contact our sales team`
- Type: `secondary`

## Technical Implementation

The hero block uses:
- **Container Pattern**: Hero accepts button components as children through a filter
- **Component Composition**: Buttons are added as separate components, making them reusable
- **Type Inference**: Images are automatically converted from references to proper `<picture>` elements
- **CSS Classes**: Semantic classes are added for improved styling and accessibility
- **JavaScript Enhancement**: 
  - Converts image links to proper image elements
  - Groups button components into a flex container
  - Adds semantic HTML structure for titles and descriptions

