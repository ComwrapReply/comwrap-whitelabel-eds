# Tabs Block

Display content in vertical tabs with an animated indicator line. The design features a dark blue background with vertical tab navigation on the left and content area on the right.

## Content Model

**Block Type:** Collection

Each row represents one tab:
- **Column 1:** Tab title (plain text)
- **Column 2:** Tab content (rich HTML - headings, paragraphs, lists, images, links)

## Example

### In Universal Editor

1. **Add a Tabs Block** to your page
2. **Add Tab Items** - Each tab item has two fields:
   - **Tab Title** (required): Short text like "Tab 1", "Getting Started", etc.
   - **Tab Content**: Rich text with headings, paragraphs, lists, images, and links

The Universal Editor will automatically structure the content as a collection where each tab item becomes one tab in the interface.

### In Document Editor (Google Docs/SharePoint)

Create a table like this:

| Tabs |
|------|
| Tab 1 | <h2>Block headline</h2><p>Lorem ipsum dolor sit amet...</p> |
| Tab 2 | <h2>Another headline</h2><p>Content for tab 2...</p> |
| Tab 3 | <h2>Third tab content</h2><p>More content here...</p> |

### HTML Structure

```html
<div class="tabs">
  <div>
    <div>Tab 1</div>
    <div>
      <h2>Block headline</h2>
      <p>Lorem ipsum dolor sit amet...</p>
    </div>
  </div>
  <div>
    <div>Tab 2</div>
    <div>
      <h2>Another headline</h2>
      <p>Content for tab 2...</p>
    </div>
  </div>
</div>
```

## Features

### Design
- **Vertical Tab Layout:** Tabs positioned on the left side with content on the right
- **Dark Background:** Uses brand dark blue (#0c2863)
- **Animated Indicator:** Sliding vertical line highlights the active tab
- **Typography:** Active tab is larger (44px) with inactive tabs at 32px
- **Responsive:** Adapts to horizontal layout on mobile devices

### Accessibility
- **ARIA Attributes:** Proper role="tab" and role="tabpanel" semantics
- **Keyboard Navigation:** 
  - Arrow Up/Down (or Left/Right): Navigate between tabs
  - Home: Jump to first tab
  - End: Jump to last tab
- **Screen Reader Support:** Full ARIA labeling and relationships
- **Focus Management:** Visible focus indicators and proper tab management

### Interaction
- **Click to Switch:** Click any tab to view its content
- **Keyboard Control:** Full keyboard navigation support
- **First Tab Active:** First tab is active by default
- **Smooth Transitions:** Animated indicator movement between tabs

## Usage Guidelines

### Tab Titles
- Keep titles short and descriptive (1-3 words ideal)
- Use clear, action-oriented language
- Avoid technical jargon unless appropriate for audience

### Tab Content
- Use semantic HTML (headings, paragraphs, lists)
- Include H2 for the main content heading
- Can include images, links, and other HTML elements
- Keep content focused and organized

### Best Practices
- Use 3-7 tabs for optimal usability
- Organize content logically across tabs
- Ensure each tab contains meaningful content
- Test on different devices and screen sizes
- Consider content hierarchy within each tab

## Responsive Behavior

### Desktop (1200px+)
- Vertical tabs on the left (480px width)
- Content area on the right (up to 1000px)
- Full padding (104px vertical, 200px horizontal)
- Large typography (44px active, 32px inactive)

### Tablet (768px - 1200px)
- Slightly reduced padding and tab widths
- Maintains vertical layout
- Adjusted typography sizes

### Mobile (< 768px)
- Horizontal tab layout at top
- Horizontal scrolling for tabs if needed
- Indicator moves horizontally below tabs
- Reduced padding and typography sizes
- Content area below tabs

## Variants

The tabs block can support variants for different styling options:
- `Tabs (Light)` - Light background version
- `Tabs (Horizontal)` - Horizontal tab layout on desktop
- `Tabs (Compact)` - Reduced padding and spacing

## Testing

Test page available at: `/drafts/tabs-test.html`

Run the development server with HTML folder support:

```bash
aem up --html-folder drafts
```

Then navigate to `http://localhost:3000/drafts/tabs-test` to see the tabs block in action.

## Technical Details

### Files
- `tabs.js` - Block decoration and functionality
- `tabs.css` - Styling and responsive design
- `_tabs.json` - Block metadata

### Dependencies
- `scripts/scripts.js` - Uses `moveInstrumentation` helper

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported (uses modern JavaScript)

## Related Blocks
- **Accordion** - Alternative for collapsible content
- **Columns** - For side-by-side content without tabbing
- **Fragment** - For embedding complex nested content
