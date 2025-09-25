# Tasks - Facts and Figures Cards Block

## Relevant Files

- `blocks/facts-figures-cards/_facts-figures-cards.json` - Block definition with container and child structure (like columns)
- `blocks/facts-figures-cards/facts-figures-cards.css` - Block styling with theme variable integration
- `blocks/facts-figures-cards/facts-figures-cards.js` - Block JavaScript functionality and DOM manipulation
- `blocks/facts-figures-cards/index.js` - Block entry point and export
- `component-definition.json` - Update to register facts-figures-cards block
- `component-models.json` - Update to include facts-figures-cards model
- `component-filters.json` - Update to include facts-figures-cards and facts-figures-card filters
- `styles/styles.css` - Update theme variables if new ones are needed

### Notes

- Block CSS must be scoped to `.block.facts-figures-cards` to prevent conflicts
- Child item CSS must be scoped to `.block.facts-figures-card` to prevent conflicts
- **CRITICAL**: All styling must use CSS custom properties from `styles/styles.css` - NO hardcoded values
- JavaScript must use defensive coding and follow Airbnb style guide
- Block classes follow pattern: `facts-figures-cards-container`, `facts-figures-cards-wrapper`, `facts-figures-cards`
- Child item block classes follow pattern: `facts-figures-card-container`, `facts-figures-card-wrapper`, `facts-figures-card`
- No styling should be applied to the container class
- Facts-figures-cards block allows only `facts-figures-card` child items
- Facts-figures-card child items allow only `text` block content
- Use template properties `columns` and `rows` to define layout (like columns block)
- Use single multiselect `classes` field for gradient options (blue, grey)
- Use theme variables from `styles/styles.css` for consistent theming across all breakpoints
- Example: Use `color: var(--text-color)` instead of `color: #000000`

## Tasks

- [ ] 1.0 Block Definition and Model Setup
  - [ ] 1.1 Create `_facts-figures-cards.json` with definitions array containing both container and child item definitions
  - [ ] 1.2 Define container block using `core/franklin/components/block/v1/block` resource type with filter `facts-figures-cards`
  - [ ] 1.3 Define child item block using `core/franklin/components/block/v1/block/item` resource type
  - [ ] 1.4 Add template properties with default values: columns: "3", rows: "1"
  - [ ] 1.5 Add models array with facts-figures-cards model containing `columns` and `rows` text fields
  - [ ] 1.6 Add single multiselect `classes` field for gradient options: blue-gradient, grey-gradient
  - [ ] 1.7 Add filters array with facts-figures-cards filter allowing only facts-figures-card children
  - [ ] 1.8 Add filters array with facts-figures-card filter allowing only text blocks
  - [ ] 1.9 Update `component-definition.json` to register facts-figures-cards block
  - [ ] 1.10 Update `component-models.json` to include facts-figures-cards model
  - [ ] 1.11 Update `component-filters.json` to include both facts-figures-cards and facts-figures-card filters

- [ ] 2.0 CSS Styling Implementation with Theme Integration
  - [ ] 2.1 Create block styles scoped to `.block.facts-figures-cards` using theme variables
  - [ ] 2.2 Create child item styles scoped to `.block.facts-figures-card` using theme variables
  - [ ] 2.3 Implement grid layout using CSS Grid based on template properties (columns/rows)
  - [ ] 2.4 Implement child item card styles with proper spacing and padding
  - [ ] 2.5 Add blue gradient background option using theme variables
  - [ ] 2.6 Add grey gradient background option using theme variables
  - [ ] 2.7 Configure typography using theme font variables (heading-font-family, heading-font-size-*)
  - [ ] 2.8 Implement responsive grid layouts based on template properties
  - [ ] 2.9 Ensure no styling is applied to container class, only wrapper and block
  - [ ] 2.10 Style text content within child cards using theme variables

- [ ] 3.0 JavaScript Functionality and Animation Controller
  - [ ] 3.1 Create `facts-figures-cards.js` file with proper EDS structure
  - [ ] 3.2 Implement animation controller for entry animations (slide from bottom to top)
  - [ ] 3.3 Add scroll trigger functionality using Intersection Observer API
  - [ ] 3.4 Create responsive handler for layout changes on window resize
  - [ ] 3.5 Implement lazy loading for off-screen cards for performance
  - [ ] 3.6 Add animation disable functionality based on user preference
  - [ ] 3.7 Process child card content and apply appropriate styling classes
  - [ ] 3.8 Handle template properties (columns/rows) for layout configuration
  - [ ] 3.9 Handle multiselect classes for gradient options
  - [ ] 3.10 Use defensive coding patterns and proper error handling
  - [ ] 3.11 Follow Airbnb style guide with const variables and config objects
  - [ ] 3.12 Add thorough code comments and documentation

- [ ] 4.0 AEMaaCS Integration and Component Registration
  - [ ] 4.1 Update `component-definition.json` to register Facts and Figures Cards block
  - [ ] 4.2 Add block to "Blocks" group with proper resource type configuration
  - [ ] 4.3 Update `component-models.json` to include facts-figures-cards model
  - [ ] 4.4 Configure `component-filters.json` for facts-figures-cards allowing only facts-figures-card children
  - [ ] 4.5 Configure `component-filters.json` for facts-figures-card allowing only text blocks
  - [ ] 4.6 Set up proper template configuration with model and filter references
  - [ ] 4.7 Ensure component group is set to "{site.name} - Content"
  - [ ] 4.8 Test component registration in Universal Editor

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
  - [ ] 6.2 Configure desktop layout (1920px+) based on template properties
  - [ ] 6.3 Set up tablet layout (768px-1919px) with responsive grid based on columns property
  - [ ] 6.4 Configure mobile layout (320px-767px) with single column stack
  - [ ] 6.5 Implement proper spacing and gutters for each breakpoint
  - [ ] 6.6 Add responsive typography scaling using theme variables
  - [ ] 6.7 Test layout behavior across all device sizes
  - [ ] 6.8 Ensure consistent animation behavior across breakpoints

- [ ] 7.0 Testing and Validation
  - [ ] 7.1 Create unit tests for block rendering and HTML structure
  - [ ] 7.2 Test CSS class application and visual appearance for both container and child items
  - [ ] 7.3 Validate responsive layout behavior across breakpoints based on template properties
  - [ ] 7.4 Test AEMaaCS content authoring and publishing workflow
  - [ ] 7.5 Verify smooth animation performance and hardware acceleration
  - [ ] 7.6 Test screen reader compatibility and accessibility features
  - [ ] 7.7 Perform cross-browser testing (Chrome, Firefox, Safari, Edge)
  - [ ] 7.8 Validate design fidelity against Figma specifications
  - [ ] 7.9 Test text content rendering within child cards
  - [ ] 7.10 Verify theme variable integration and no hardcoded values
  - [ ] 7.11 Test template properties (columns/rows) functionality for layout configuration
  - [ ] 7.12 Test multiselect classes functionality for gradient options
  - [ ] 7.13 Test container filter allowing only child items
  - [ ] 7.14 Test child item filter allowing only text blocks
