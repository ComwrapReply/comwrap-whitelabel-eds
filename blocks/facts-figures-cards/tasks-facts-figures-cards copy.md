# Tasks - Facts and Figures Cards Block

## Relevant Files

- `blocks/facts-figures-cards/_facts-figures-cards.json` - Block definition and content model configuration
- `blocks/facts-figures-cards/facts-figures-cards.css` - Block styling with theme variable integration
- `blocks/facts-figures-cards/facts-figures-cards.js` - Block JavaScript functionality and DOM manipulation
- `blocks/facts-figures-cards/index.js` - Block entry point and export
- `component-definition.json` - Update to register new block component
- `component-models.json` - Update to include block model definition
- `component-filters.json` - Update to include block filter (if container block)
- `models/_section.json` - Update to include block filter (if container block)
- `styles/styles.css` - Update theme variables if new ones are needed

### Notes

- All CSS must be scoped to `.block.facts-figures-cards` to prevent conflicts
- **CRITICAL**: All styling must use CSS custom properties from `styles/styles.css` - NO hardcoded values
- JavaScript must use defensive coding and follow Airbnb style guide
- Block classes follow pattern: `facts-figures-cards-container`, `facts-figures-cards-wrapper`, `facts-figures-cards`
- No styling should be applied to the container class
- Use theme variables from `styles/styles.css` for consistent theming across all breakpoints
- Example: Use `color: var(--text-color)` instead of `color: #000000`

## Tasks

- [ ] 1.0 Block Definition and Model Setup
  - [ ] 1.1 Create `_facts-figures-cards.json` with block definition using `core/franklin/components/block/v1/block` resource type
  - [ ] 1.2 Define content model with required fields: card text, card type, highlight status, card order
  - [ ] 1.3 Add optional fields: background color override, text color override, custom padding, animation disable
  - [ ] 1.4 Configure card type selection with options: H4 default, H3 highlighted, H5 short, H5 long
  - [ ] 1.5 Set up proper field validation and character limits (45, 80, 200 characters)
  - [ ] 1.6 Configure multiselect for layout options (3, 4, 5, 6 cards layout)

- [ ] 2.0 CSS Styling Implementation with Theme Integration
  - [ ] 2.1 Create base block styles scoped to `.block.facts-figures-cards` using theme variables
  - [ ] 2.2 Implement card container styles with proper grid layout using CSS Grid
  - [ ] 2.3 Create card variant styles: `--h4-default`, `--h3-highlighted`, `--h5-short`, `--h5-long`
  - [ ] 2.4 Implement warm white gradient background using theme variables
  - [ ] 2.5 Add blue gradient for highlighted cards using brand colors
  - [ ] 2.6 Configure typography using theme font variables (heading-font-family, heading-font-size-*)
  - [ ] 2.7 Implement responsive grid layouts for 3, 4, 5, and 6 card configurations
  - [ ] 2.8 Add proper spacing and padding using theme variables
  - [ ] 2.9 Ensure no styling is applied to container class, only wrapper and block

- [ ] 3.0 JavaScript Functionality and Animation Controller
  - [ ] 3.1 Create main `facts-figures-cards.js` file with proper EDS structure
  - [ ] 3.2 Implement animation controller for entry animations (slide from bottom to top)
  - [ ] 3.3 Add scroll trigger functionality using Intersection Observer API
  - [ ] 3.4 Create responsive handler for layout changes on window resize
  - [ ] 3.5 Implement lazy loading for off-screen cards for performance
  - [ ] 3.6 Add animation disable functionality based on user preference
  - [ ] 3.7 Use defensive coding patterns and proper error handling
  - [ ] 3.8 Follow Airbnb style guide with const variables and config objects
  - [ ] 3.9 Add thorough code comments and documentation

- [ ] 4.0 AEMaaCS Integration and Component Registration
  - [ ] 4.1 Update `component-definition.json` to register Facts and Figures Cards block
  - [ ] 4.2 Add block to "Blocks" group with proper resource type configuration
  - [ ] 4.3 Update `component-models.json` to include facts-figures-cards model
  - [ ] 4.4 Configure `component-filters.json` for container block functionality
  - [ ] 4.5 Set up proper template configuration with model and filter references
  - [ ] 4.6 Ensure component group is set to "{site.name} - Content"
  - [ ] 4.7 Test component registration in Universal Editor

- [ ] 5.0 Accessibility Implementation and ARIA Support
  - [ ] 5.1 Add proper ARIA labels for card containers and individual cards
  - [ ] 5.2 Implement keyboard navigation support for interactive elements
  - [ ] 5.3 Ensure proper heading hierarchy (H3, H4, H5) for screen readers
  - [ ] 5.4 Add focus management and clear focus indicators
  - [ ] 5.5 Implement reduced motion support for animations
  - [ ] 5.6 Ensure color contrast meets WCAG 4.5:1 ratio requirements
  - [ ] 5.7 Add semantic HTML structure with proper landmarks
  - [ ] 5.8 Test with screen readers and assistive technologies

- [ ] 6.0 Responsive Design and Layout Management
  - [ ] 6.1 Implement mobile-first responsive design approach
  - [ ] 6.2 Configure desktop layout (1920px+) with 12-column grid system
  - [ ] 6.3 Set up tablet layout (768px-1919px) with 2-3 cards per row
  - [ ] 6.4 Configure mobile layout (320px-767px) with single column stack
  - [ ] 6.5 Implement proper spacing and gutters for each breakpoint
  - [ ] 6.6 Add responsive typography scaling using theme variables
  - [ ] 6.7 Test layout behavior across all device sizes
  - [ ] 6.8 Ensure consistent animation behavior across breakpoints

- [ ] 7.0 Testing and Validation
  - [ ] 7.1 Create unit tests for component rendering and HTML structure
  - [ ] 7.2 Test CSS class application and visual appearance
  - [ ] 7.3 Validate responsive layout behavior across breakpoints
  - [ ] 7.4 Test AEMaaCS content authoring and publishing workflow
  - [ ] 7.5 Verify smooth animation performance and hardware acceleration
  - [ ] 7.6 Test screen reader compatibility and accessibility features
  - [ ] 7.7 Perform cross-browser testing (Chrome, Firefox, Safari, Edge)
  - [ ] 7.8 Validate design fidelity against Figma specifications
  - [ ] 7.9 Test character limits and content validation
  - [ ] 7.10 Verify theme variable integration and no hardcoded values
