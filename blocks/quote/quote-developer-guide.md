# Quote Block - Developer Guide

## Overview

The Quote block is a simple, semantic component for AEM Edge Delivery Services that displays quoted text with attribution. It transforms structured content into semantic HTML using `<blockquote>` elements and supports multiple visual theme options through CSS classes.

---

## Table of Contents

1. [Technical Architecture](#technical-architecture)
2. [File Structure](#file-structure)
3. [Configuration](#configuration)
4. [Core Functions](#core-functions)
5. [Universal Editor Integration](#universal-editor-integration)
6. [Performance Optimization](#performance-optimization)
7. [Browser Support](#browser-support)
8. [Accessibility Implementation](#accessibility-implementation)
9. [API Reference](#api-reference)
10. [Testing](#testing)
11. [Troubleshooting](#troubleshooting)

---

## Technical Architecture

### Technology Stack

- **Vanilla JavaScript**: No dependencies required
- **Semantic HTML**: Uses native `<blockquote>` element
- **CSS Custom Properties**: Theme-aware styling
- **AEM Block Model**: Content structure defined in JSON

### Dependencies

```javascript
// No external dependencies required
// Quote block is self-contained
```

### Content Structure

The quote block receives content from AEM as a table structure:
- Row 0: Quote text (rich text content)
- Row 1: Author attribution (plain text)

---

## File Structure

```
blocks/quote/
├── _quote.json          # Block definition and content model
├── quote.js             # Core JavaScript functionality
├── quote.css            # Styling and visual presentation
├── quote-author-guide.md # Author documentation
└── quote-developer-guide.md # This documentation
```

### Block Definition (_quote.json)

```json
{
  "definitions": [
    {
      "title": "Quote",
      "id": "quote",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Quote",
              "model": "quote"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "quote",
      "fields": [
        {
          "component": "richtext",
          "name": "quote",
          "label": "Quote",
          "valueType": "string"
        },
        {
          "component": "text",
          "name": "author",
          "label": "Author",
          "valueType": "string"
        },
        {
          "component": "select",
          "name": "classes",
          "label": "Background Styles",
          "valueType": "string",
          "options": [
            { "name": "Default", "value": "" },
            { "name": "Highlight", "value": "highlight" },
            { "name": "Dark", "value": "dark" },
            { "name": "Light", "value": "light" }
          ]
        }
      ]
    }
  ],
  "filters": []
}
```

---

## Configuration

### Block Options

The quote block supports styling options through the `classes` field in the content model:

- `""` (Default): Light blue background with subtle styling
- `"highlight"`: Yellow/gold gradient background with emphasis
- `"dark"`: Dark background with light text
- `"light"`: Light gray background with subtle border

These classes are applied directly to the `.block.quote` element when content is authored.

### CSS Custom Properties

The quote block uses theme variables for consistent styling:

```css
:root {
  --background-color: white;
  --text-color: #131313;
  --heading-text-color: #200a80;
  --link-color: #3b63fb;
  --light-color: #f0f0f0;
  --dark-color: #333;
  --primary-color: #ffc107;
  --secondary-color: #6c757d;
  --info-color: #0dcaf0;
  --color-blue: #3b63fb;
  --color-primary-blue: #200a80;
}
```

---

## Core Functions

### Main Export Function

```javascript
/**
 * Entry point to the block's JavaScript.
 * Must be exported as default and accept a block's DOM element.
 * This function is called by the project's scripts.js, passing the block's element.
 *
 * @param {HTMLElement} block represents the block's DOM element/tree
 */
export default function decorate(block) {
  const children = [...block.children];

  if (children.length === 0) {
    return;
  }

  // Clear the block content
  block.innerHTML = '';

  // Process each row
  children.forEach((row, index) => {
    const cells = [...row.children];

    if (index === 0 && cells.length > 0) {
      // First row is the quote
      const quoteCell = cells[0];
      const blockquote = document.createElement('blockquote');
      blockquote.innerHTML = quoteCell.innerHTML;
      block.appendChild(blockquote);
    } else if (index === 1 && cells.length > 0) {
      // Second row is the author
      const authorCell = cells[0];
      if (authorCell.textContent.trim()) {
        const authorDiv = document.createElement('div');
        authorDiv.classList.add('quote-author');
        authorDiv.innerHTML = authorCell.innerHTML;
        block.appendChild(authorDiv);
      }
    }
  });
}
```

### Function Breakdown

#### 1. Input Validation

```javascript
if (children.length === 0) {
  return;
}
```

Prevents errors when block has no content.

#### 2. Content Processing

The function processes two expected rows:
- **Row 0**: Quote text → converted to `<blockquote>` element
- **Row 1**: Author attribution → converted to `<div class="quote-author">` element

#### 3. DOM Structure Creation

The final structure after decoration:

```html
<div class="block quote [option-class]">
  <blockquote>
    <!-- Quote text content -->
  </blockquote>
  <div class="quote-author">
    <!-- Author attribution -->
  </div>
</div>
```

---

## Universal Editor Integration

### Content Model

The quote block uses a standard AEM block model:

- **Quote Field**: Rich text editor (`richtext` component)
- **Author Field**: Plain text input (`text` component)
- **Classes Field**: Select dropdown with predefined options

### Editor Experience

1. Author adds Quote block to page
2. Fills in Quote field using rich text editor
3. Adds Author attribution
4. Selects Background Style from dropdown
5. Changes appear immediately in Universal Editor

### Content Persistence

All content is stored as properties in AEM:
- `quote`: Rich text HTML content
- `author`: Plain text string
- `classes`: CSS class name(s) for styling

---

## Performance Optimization

### Minimal DOM Manipulation

The quote block performs minimal DOM manipulation:
- Only transforms structure once on load
- No event listeners required
- No timers or observers

### Efficient Rendering

```javascript
// Single pass processing
children.forEach((row, index) => {
  // Process row only once
});
```

### CSS Performance

All styling is CSS-only:
- No JavaScript-based animations
- Hardware-accelerated transitions (if any)
- Efficient CSS selectors

```css
/* Scoped selectors for performance */
.block.quote {
  /* Styles apply only to quote blocks */
}
```

---

## Browser Support

### Supported Browsers

| Browser | Version | Desktop | Mobile | Notes |
|---------|---------|---------|--------|-------|
| Chrome | Latest 2 | ✅ | ✅ | Full support |
| Firefox | Latest 2 | ✅ | ✅ | Full support |
| Safari | Latest 2 | ✅ | ✅ | Full support |
| Edge | Latest 2 | ✅ | ✅ | Full support |
| Mobile Safari | iOS 12+ | N/A | ✅ | Full support |
| Chrome Mobile | Android 8+ | N/A | ✅ | Full support |

### Feature Detection

No feature detection required. The quote block uses only:
- Standard DOM APIs (widely supported)
- CSS custom properties (IE11+ with fallbacks)
- Semantic HTML5 elements (IE9+)

### Polyfills

No polyfills required. All features are natively supported in modern browsers.

---

## Accessibility Implementation

### Semantic HTML

The quote block uses proper semantic HTML:

```html
<blockquote>
  <!-- Quote content -->
</blockquote>
```

The `<blockquote>` element provides semantic meaning that screen readers understand.

### ARIA Attributes

While semantic HTML provides most accessibility, you can enhance with ARIA:

```javascript
// Optional: Add ARIA label for context
blockquote.setAttribute('aria-label', 'Quote');
blockquote.setAttribute('cite', authorUrl); // If author has URL
```

### Keyboard Navigation

No interactive elements require keyboard navigation. The quote is a presentational component.

### Focus Management

Not applicable - quote block has no focusable elements.

### Screen Reader Support

Screen readers will:
1. Announce the blockquote element
2. Read the quote content
3. Recognize the author attribution as separate content

### High Contrast Mode

```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .block.quote {
    border: 2px solid currentColor;
  }
}
```

### Reduced Motion Support

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .block.quote {
    transition: none !important;
  }
}
```

---

## API Reference

### Block Options

Options are set through the `classes` field in the content model:

| Option Value | CSS Class | Description |
|--------------|-----------|-------------|
| `""` | (none) | Default light blue background |
| `"highlight"` | `.highlight` | Yellow/gold gradient background |
| `"dark"` | `.dark` | Dark background with light text |
| `"light"` | `.light` | Light gray background with border |

### CSS Class Names and Structure

Key CSS classes used by the quote block:

- **Block container**: `.block.quote` - Main block wrapper
- **Quote element**: `blockquote` - Semantic quote container
- **Author container**: `.quote-author` - Author attribution wrapper

Variant classes:
- `.block.quote.highlight` - Highlight theme styles
- `.block.quote.dark` - Dark theme styles
- `.block.quote.light` - Light theme styles

### CSS Custom Properties

Theme variables used:

```css
--background-color: Base background color
--text-color: Primary text color
--heading-text-color: Headings color
--link-color: Link color
--light-color: Light border/shadow color
--dark-color: Dark text/border color
--primary-color: Primary accent color
--secondary-color: Secondary color
--info-color: Info accent color
--color-blue: Blue accent color
--color-primary-blue: Primary blue color
```

### DOM Structure

Final rendered structure:

```html
<div class="block quote [theme-class]">
  <blockquote>
    <p>Quote text content here...</p>
  </blockquote>
  <div class="quote-author">
    <p>— Author Name</p>
  </div>
</div>
```

---

## Testing

### Unit Testing

```javascript
// Example: Test quote decoration
describe('Quote Block', () => {
  let block;
  
  beforeEach(() => {
    block = document.createElement('div');
    block.className = 'block quote';
    
    // Add table structure
    const row1 = document.createElement('div');
    row1.innerHTML = '<div><p>Test quote</p></div>';
    
    const row2 = document.createElement('div');
    row2.innerHTML = '<div>Test Author</div>';
    
    block.appendChild(row1);
    block.appendChild(row2);
  });
  
  test('should create blockquote element', () => {
    decorate(block);
    const blockquote = block.querySelector('blockquote');
    expect(blockquote).toBeTruthy();
    expect(blockquote.innerHTML).toContain('Test quote');
  });
  
  test('should create author element', () => {
    decorate(block);
    const author = block.querySelector('.quote-author');
    expect(author).toBeTruthy();
    expect(author.textContent).toContain('Test Author');
  });
  
  test('should handle empty block', () => {
    const emptyBlock = document.createElement('div');
    decorate(emptyBlock);
    expect(emptyBlock.children.length).toBe(0);
  });
  
  test('should handle missing author', () => {
    const blockWithoutAuthor = document.createElement('div');
    blockWithoutAuthor.className = 'block quote';
    blockWithoutAuthor.innerHTML = '<div><div><p>Quote only</p></div></div>';
    
    decorate(blockWithoutAuthor);
    const blockquote = blockWithoutAuthor.querySelector('blockquote');
    const author = blockWithoutAuthor.querySelector('.quote-author');
    
    expect(blockquote).toBeTruthy();
    expect(author).toBeFalsy();
  });
});
```

### Integration Testing

```javascript
// Example: Test with Universal Editor
describe('Quote Block Integration', () => {
  test('should work with AEM content model', async () => {
    // Mock AEM content structure
    const mockContent = {
      quote: '<p>Test quote</p>',
      author: 'Test Author',
      classes: 'highlight'
    };
    
    // Simulate AEM rendering
    const block = createBlockFromAEMContent(mockContent);
    
    // Decorate
    decorate(block);
    
    // Verify structure
    expect(block.classList.contains('highlight')).toBe(true);
    expect(block.querySelector('blockquote')).toBeTruthy();
    expect(block.querySelector('.quote-author')).toBeTruthy();
  });
});
```

### Accessibility Testing

```javascript
// Example: Test accessibility
describe('Quote Block Accessibility', () => {
  test('should have semantic blockquote element', () => {
    const block = createQuoteBlock();
    decorate(block);
    
    const blockquote = block.querySelector('blockquote');
    expect(blockquote).toBeTruthy();
    expect(blockquote.tagName).toBe('BLOCKQUOTE');
  });
  
  test('should have proper structure for screen readers', () => {
    const block = createQuoteBlock();
    decorate(block);
    
    // Check semantic structure
    const blockquote = block.querySelector('blockquote');
    const author = block.querySelector('.quote-author');
    
    expect(blockquote).toBeTruthy();
    expect(author).toBeTruthy();
    
    // Author should follow quote
    expect(blockquote.nextElementSibling).toBe(author);
  });
});
```

### Visual Regression Testing

```javascript
// Example: Test theme variations
describe('Quote Block Themes', () => {
  const themes = ['', 'highlight', 'dark', 'light'];
  
  themes.forEach(theme => {
    test(`should render ${theme || 'default'} theme correctly`, () => {
      const block = createQuoteBlock(theme);
      decorate(block);
      
      if (theme) {
        expect(block.classList.contains(theme)).toBe(true);
      }
      
      // Visual regression test would compare screenshots here
    });
  });
});
```

---

## Deployment

### Build Process

```bash
# Standard EDS build (no special steps required)
npm run build

# Build component definitions
npm run build:json

# Lint before deploy
npm run lint
```

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Accessibility audit passed
- [ ] Cross-browser testing completed
- [ ] Theme options render correctly
- [ ] Documentation updated
- [ ] Code reviewed and approved

### Deployment Steps

1. **Merge to main branch**
   ```bash
   git checkout main
   git merge feature/quote
   git push origin main
   ```

2. **Automatic preview build**
   - AEM Code Sync automatically builds preview
   - Preview URL: `https://main--{repo}--{org}.aem.page`

3. **Test on preview**
   - Verify quote rendering
   - Test all theme options
   - Check Universal Editor integration
   - Validate accessibility

4. **Publish to production**
   - Use Universal Editor or Sidekick
   - Production URL: `https://main--{repo}--{org}.aem.live`

---

## Troubleshooting

### Common Issues

#### Quote Not Rendering

**Symptoms:** Blank space or no quote displayed

**Diagnosis:**
```javascript
// Check if block is decorated
console.log(block.classList.contains('quote'));
console.log(block.querySelector('blockquote'));

// Check content structure
console.log('Children:', block.children.length);
```

**Solutions:**
1. Verify block name is exactly "Quote" in content
2. Check for JavaScript errors in console
3. Ensure at least quote field is filled in content model
4. Verify `decorate()` function is being called

#### Theme Not Applying

**Symptoms:** Background style not changing

**Diagnosis:**
```javascript
// Check if theme class is applied
console.log('Block classes:', block.classList.toString());

// Check content model
console.log('Classes value:', block.dataset.classes);
```

**Solutions:**
1. Verify `classes` field is set in Properties panel
2. Check CSS file is loaded
3. Ensure CSS class name matches option value
4. Verify theme CSS is not overridden by other styles

#### Author Not Displaying

**Symptoms:** Quote shows but no author attribution

**Diagnosis:**
```javascript
// Check author element
const author = block.querySelector('.quote-author');
console.log('Author element:', author);
console.log('Author content:', author?.textContent);
```

**Solutions:**
1. Verify Author field is filled in content model
2. Check author text is not empty after trimming
3. Verify row structure is correct (author in row 1)
4. Check for CSS hiding the author element

#### Styling Issues

**Symptoms:** Quote doesn't match design expectations

**Diagnosis:**
```javascript
// Inspect computed styles
const blockquote = block.querySelector('blockquote');
const styles = window.getComputedStyle(blockquote);
console.log('Blockquote styles:', styles);
```

**Solutions:**
1. Check theme CSS variables are defined
2. Verify CSS specificity (no conflicting styles)
3. Check browser developer tools for overridden styles
4. Ensure CSS file is loaded after theme CSS

### Debug Mode

```javascript
// Enable debug logging
const DEBUG = true;

function log(...args) {
  if (DEBUG) {
    console.log('[Quote]', ...args);
  }
}

// Use in decorate function
export default function decorate(block) {
  log('Decorating quote block');
  log('Children count:', block.children.length);
  // ... rest of code
}
```

### CSS Debugging

```css
/* Add temporary debug styles */
.block.quote {
  outline: 2px solid red; /* Visualize block boundaries */
}

.block.quote blockquote {
  outline: 1px solid blue; /* Visualize quote element */
}

.block.quote .quote-author {
  outline: 1px solid green; /* Visualize author element */
}
```

---

## Advanced Customization

### Custom Theme

Add a new theme option:

1. **Update content model** (`_quote.json`):
```json
{
  "component": "select",
  "name": "classes",
  "options": [
    // ... existing options ...
    {
      "name": "Custom Theme",
      "value": "custom-theme"
    }
  ]
}
```

2. **Add CSS** (`quote.css`):
```css
.block.quote.custom-theme {
  background: /* your custom styles */;
  /* ... */
}
```

### Custom Author Format

Modify author rendering:

```javascript
// In decorate function
if (index === 1 && cells.length > 0) {
  const authorCell = cells[0];
  if (authorCell.textContent.trim()) {
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('quote-author');
    
    // Custom format: Add icon or additional markup
    const authorIcon = document.createElement('span');
    authorIcon.classList.add('author-icon');
    authorIcon.textContent = '👤';
    
    authorDiv.appendChild(authorIcon);
    authorDiv.appendChild(document.createTextNode(' '));
    authorDiv.innerHTML += authorCell.innerHTML;
    
    block.appendChild(authorDiv);
  }
}
```

### Enhanced Accessibility

Add citation link:

```javascript
// Add cite attribute if author has URL
const authorDiv = block.querySelector('.quote-author');
if (authorDiv && authorUrl) {
  const citeLink = document.createElement('a');
  citeLink.href = authorUrl;
  citeLink.textContent = authorDiv.textContent;
  citeLink.setAttribute('rel', 'external');
  
  authorDiv.innerHTML = '';
  authorDiv.appendChild(citeLink);
  
  // Update blockquote cite attribute
  blockquote.setAttribute('cite', authorUrl);
}
```

---

## Security Considerations

### Content Sanitization

The quote block receives content from AEM's rich text editor, which should already sanitize HTML. However, for additional security:

```javascript
// If processing external content, sanitize
function sanitizeHTML(html) {
  const temp = document.createElement('div');
  temp.textContent = html; // Escapes HTML
  return temp.innerHTML;
}

// Use when processing quote content
const quoteCell = cells[0];
const blockquote = document.createElement('blockquote');
blockquote.innerHTML = sanitizeHTML(quoteCell.innerHTML);
```

### XSS Prevention

- Content from AEM is trusted source
- Rich text editor provides sanitization
- No `eval()` or `innerHTML` with user input without sanitization
- Use `textContent` where possible for plain text

---

## Contributing

### Code Style

```javascript
// Follow EDS conventions
// - 2 space indentation
// - Single quotes for strings
// - Semicolons required
// - Descriptive variable names

// Good
const quoteCell = cells[0];
const blockquote = document.createElement('blockquote');

// Bad
var cell = cells[0];
let el = document.createElement("blockquote")
```

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Run linter and tests
5. Submit PR with clear description
6. Address review comments
7. Squash commits before merge

---

## Resources

### Documentation
- [AEM Edge Delivery Services](https://www.aem.live/docs/)
- [Universal Editor Guide](https://www.aem.live/developer/universal-editor)
- [Block Development](https://www.aem.live/developer/block-collection)

### Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [HTML5 Blockquote Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantic_elements)

---

*Last Updated: December 2024*  
*Version: 1.0.0*

