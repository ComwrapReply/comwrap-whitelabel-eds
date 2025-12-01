# Dynamic Content Filter Block - Developer Guide

## Overview

The Dynamic Content Filter block is an interactive filtering component for AEM Edge Delivery Services that works in conjunction with the Dynamic Content block. It automatically extracts tags from displayed content, creates filter buttons, and allows users to filter content by selecting tags. The block supports both single-select and multi-select filtering modes, polls for content availability, and provides smooth filtering interactions.

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
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Technical Architecture

### Technology Stack

- **DOM Querying**: Finds and interacts with Dynamic Content block
- **Polling Mechanism**: Uses `setInterval` to wait for content availability
- **Event Handling**: Click events for tag pill interactions
- **DOM Manipulation**: Creates filter UI and manages content visibility
- **State Management**: Tracks selected tags and filter state

### Dependencies

```javascript
// No external dependencies required
// Self-contained component that works with Dynamic Content block
```

### Block Relationship

The filter block must be placed **before** the Dynamic Content block in the DOM structure:

```
<section>
  <div class="dynamic-content-filter block">...</div>
</section>
<section>
  <div class="dynamic-content block">...</div>
</section>
```

The filter finds the Dynamic Content block by:
1. Getting the parent element of the filter block
2. Finding the next sibling section
3. Querying for `.dynamic-content.block` within that section

---

## File Structure

```
blocks/dynamic-content-filter/
├── _dynamic-content-filter.json  # Block definition and content model
├── dynamic-content-filter.js     # Core JavaScript functionality
├── dynamic-content-filter.css    # Styling and visual presentation
└── dynamic-content-filter-developer-guide.md  # This documentation
```

### Block Definition (_dynamic-content-filter.json)

```json
{
  "definitions": [
    {
      "title": "Dynamic Content Filter",
      "id": "dynamiccontentfilter",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Dynamic Content Filter",
              "model": "dynamiccontentfilter"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "dynamiccontentfilter",
      "fields": [
        {
          "component": "boolean",
          "name": "multipleSelect",
          "label": "Multiple Select",
          "description": "Allow multiple tags to be selected",
          "valueType": "boolean",
          "value": true
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

The block accepts one configuration option:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `multipleSelect` | `boolean` | `true` | When `true`, users can select multiple tags simultaneously. When `false`, only one tag can be selected at a time. |

### Configuration Values

- **Multiple Select = true**: 
  - Users can click multiple tag pills
  - Content matching ANY selected tag is shown
  - Clicking an active tag deselects it
  - Empty selection shows all content

- **Multiple Select = false**:
  - Only one tag can be active at a time
  - Clicking a tag selects it and deselects others
  - Clicking the active tag deselects it (shows all)
  - Simpler, focused filtering experience

---

## Core Functions

### Main Export Function

```javascript
/**
 * Decorates the dynamic content filter block
 * Finds the associated Dynamic Content block and creates filter UI
 * @param {HTMLElement} block - The filter block element
 */
export default async function decorate(block) {
  // Find the Dynamic Content block in next sibling section
  const contentWrapper = block.parentElement.nextElementSibling;
  const dynamicContentBlock = contentWrapper?.querySelector('.dynamic-content.block');

  if (!dynamicContentBlock) {
    console.log('No dynamic content block found');
    return;
  }

  // Get configuration and set up filtering...
}
```

### Finding Dynamic Content Block

```javascript
/**
 * Locates the Dynamic Content block that this filter should control
 * Structure: Filter block and content block are in sibling sections
 */
const contentWrapper = block.parentElement.nextElementSibling;
const dynamicContentBlock = contentWrapper?.querySelector('.dynamic-content.block');
```

### Content Filtering Function

```javascript
/**
 * Filters content items based on selected tags
 * Shows content that has ANY of the selected tags
 * @param {string[]} selectedTags - Array of selected tag names
 */
const filterContent = (selectedTags) => {
  const contentContainer = dynamicContentBlock.querySelector('.content-container');
  const contentLinks = contentContainer?.querySelectorAll('a[data-tags]');

  contentLinks.forEach((link) => {
    if (selectedTags.length === 0) {
      // Show all items if no tags selected
      link.style.display = '';
    } else {
      // Show items that have ANY of the selected tags
      const tagsAttr = link.getAttribute('data-tags');
      if (tagsAttr) {
        const tagArray = tagsAttr.split(', ').map((tag) => tag.trim());
        const hasSelectedTag = selectedTags.some((selectedTag) => 
          tagArray.includes(selectedTag)
        );
        link.style.display = hasSelectedTag ? '' : 'none';
      } else {
        link.style.display = 'none';
      }
    }
  });
};
```

### Getting Configuration Value

```javascript
/**
 * Extracts multipleSelect boolean value from block content
 * Boolean fields are rendered as text "true" or "false" in DOM
 * @returns {boolean} - True if multiple select is enabled
 */
const getMultipleSelect = () => {
  const divs = Array.from(block.querySelectorAll('div'));

  // Find div containing "true" or "false"
  const booleanDiv = divs.find((div) => {
    const text = div.textContent.trim().toLowerCase();
    return text === 'true' || text === 'false';
  });

  if (booleanDiv) {
    const value = booleanDiv.textContent.trim().toLowerCase() === 'true';
    // Remove the div after reading its value
    booleanDiv.remove();
    return value;
  }

  // Default to true if not found
  return true;
};
```

### Tag Processing

```javascript
/**
 * Processes content links to extract unique tags and create filter UI
 * @param {NodeList} contentLinks - Links with data-tags attributes
 */
const processTags = (contentLinks) => {
  // Extract all tags from content
  const tagPills = [];
  contentLinks.forEach((link) => {
    const tagsAttr = link.getAttribute('data-tags');
    if (tagsAttr) {
      const tags = tagsAttr.split(', ').map((tag) => tag.trim());
      tagPills.push(...tags);
    }
  });

  // Get unique tags and sort
  const uniqueTagPills = [...new Set(tagPills)].sort();
  const multipleSelect = getMultipleSelect();

  // Create filter UI...
};
```

### Filter Button Creation

```javascript
/**
 * Creates individual tag pill buttons with click handlers
 * @param {string} tag - Tag name
 * @param {HTMLElement} tagsContainer - Container for buttons
 * @param {string[]} selectedTags - Array to track selected tags
 * @param {boolean} multipleSelect - Multiple select mode flag
 */
uniqueTagPills.forEach((tag) => {
  const tagPill = document.createElement('button');
  tagPill.type = 'button';
  tagPill.classList.add('tag-pill');
  tagPill.innerHTML = `<span class="tag-pill-text">${tag}</span>`;
  tagPill.setAttribute('data-tag', tag);

  // Click handler - behavior depends on multipleSelect
  tagPill.addEventListener('click', (e) => {
    e.stopPropagation();
    const tagIndex = selectedTags.indexOf(tag);

    if (multipleSelect) {
      // Multiple select mode: toggle selection
      if (tagIndex > -1) {
        selectedTags.splice(tagIndex, 1);
        tagPill.classList.remove('active');
      } else {
        selectedTags.push(tag);
        tagPill.classList.add('active');
      }
    } else {
      // Single select mode
      if (tagIndex > -1) {
        // Deselect if clicking active pill
        selectedTags.splice(tagIndex, 1);
        tagPill.classList.remove('active');
      } else {
        // Deselect all others and select this one
        selectedTags.length = 0;
        selectedTags.push(tag);
        tags.querySelectorAll('.tag-pill').forEach((pill) => {
          pill.classList.remove('active');
        });
        tagPill.classList.add('active');
      }
    }
    filterContent(selectedTags);
  });

  tags.appendChild(tagPill);
});
```

### Polling Mechanism

```javascript
/**
 * Checks if content is available, polls until found
 * Uses polling because Dynamic Content loads asynchronously
 */
const checkForContent = () => {
  const contentContainer = dynamicContentBlock.querySelector('.content-container');
  const contentLinks = contentContainer?.querySelectorAll('a[data-tags]');
  if (contentContainer && contentLinks && contentLinks.length > 0) {
    return contentLinks;
  }
  return null;
};

// Check immediately
const links = checkForContent();
if (links) {
  processTags(links);
  return;
}

// Poll every 50ms until content is found
const interval = setInterval(() => {
  const foundLinks = checkForContent();
  if (foundLinks) {
    clearInterval(interval);
    processTags(foundLinks);
  }
}, 50);
```

---

## Universal Editor Integration

### Content Model Integration

The block integrates with Universal Editor through:
- **Boolean Field**: `multipleSelect` field allows authors to toggle filter mode
- **Real-time Preview**: Changes to filter mode reflect immediately
- **Visual Feedback**: Filter buttons update based on configuration

### Editor Experience

1. Author adds Dynamic Content Filter block before Dynamic Content block
2. Configures "Multiple Select" option in Properties panel
3. Filter automatically extracts tags from Dynamic Content block
4. Filtering works in preview and published modes

### Configuration Persistence

The `multipleSelect` boolean value is:
- Stored as a property in AEM
- Rendered as text "true" or "false" in DOM
- Extracted and removed during block decoration
- Used to configure filter behavior

---

## Performance Optimization

### Efficient Polling

```javascript
// Polling interval set to 50ms for responsive detection
// Stops immediately when content is found
// Clears interval to prevent memory leaks
const interval = setInterval(() => {
  const foundLinks = checkForContent();
  if (foundLinks) {
    clearInterval(interval); // Important: clean up
    processTags(foundLinks);
  }
}, 50);
```

### Cached DOM Queries

```javascript
// Cache reference to Dynamic Content block
const dynamicContentBlock = contentWrapper?.querySelector('.dynamic-content.block');

// Reuse cached reference in filter function
const contentContainer = dynamicContentBlock.querySelector('.content-container');
```

### Efficient Filtering

- Filtering uses `style.display` which is fast
- No DOM manipulation, just visibility changes
- Batch operations on all links at once

### Event Handler Optimization

```javascript
// Single event listener per tag pill
// Uses event.stopPropagation() to prevent bubbling
// Direct DOM manipulation for fast updates
tagPill.addEventListener('click', (e) => {
  e.stopPropagation();
  // Update state and filter
});
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

No special feature detection needed. Uses only:
- Standard DOM APIs
- `setInterval` / `clearInterval`
- Event listeners
- Array methods

### Polyfills

No polyfills required. All features are natively supported.

---

## Accessibility Implementation

### ARIA Attributes

Consider adding ARIA attributes for better accessibility:

```javascript
// Enhanced accessibility example:
tagPill.setAttribute('role', 'button');
tagPill.setAttribute('aria-pressed', 'false');
tagPill.setAttribute('aria-label', `Filter by ${tag}`);

// Update on selection:
tagPill.setAttribute('aria-pressed', 'true');
```

### Keyboard Navigation

- All tag pills are `<button>` elements (keyboard accessible)
- Tab order follows tag order
- Enter/Space activate buttons
- Focus indicators should be visible

### Focus Management

```css
/* Focus indicators */
.tag-pill:focus {
  outline: 2px solid var(--link-color);
  outline-offset: 2px;
}

.tag-pill.active:focus {
  outline-color: var(--primary-color);
}
```

### Screen Reader Support

```javascript
// Enhanced for screen readers:
tagPill.setAttribute('aria-label', `Filter content by ${tag} tag`);
tagPill.setAttribute('aria-pressed', 'false');

// Update when active:
if (tagPill.classList.contains('active')) {
  tagPill.setAttribute('aria-pressed', 'true');
  tagPill.setAttribute('aria-label', `Remove ${tag} filter`);
}
```

---

## API Reference

### Block Options

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `multipleSelect` | `boolean` | `true` | Enable/disable multiple tag selection |

### CSS Classes

Generated structure uses these classes:

- `.tags` - Container for all tag pills
- `.tag-pill` - Individual filter button
- `.tag-pill.active` - Active/selected state
- `.tag-pill-text` - Text wrapper inside pill

### Data Attributes

- `data-tag` - Tag name on each pill button
- `data-tags` - On content links (from Dynamic Content block)

### Filtering Logic

**Multiple Select Mode (multipleSelect = true):**
- Shows content matching ANY selected tag
- Multiple tags can be active simultaneously
- Empty selection shows all content

**Single Select Mode (multipleSelect = false):**
- Shows content matching the selected tag
- Only one tag can be active at a time
- Empty selection shows all content

---

## Testing

### Unit Testing

```javascript
describe('Dynamic Content Filter', () => {
  let filterBlock;
  let contentBlock;
  
  beforeEach(() => {
    // Setup DOM structure
    const section1 = document.createElement('section');
    filterBlock = document.createElement('div');
    filterBlock.className = 'block dynamic-content-filter';
    section1.appendChild(filterBlock);
    
    const section2 = document.createElement('section');
    contentBlock = document.createElement('div');
    contentBlock.className = 'block dynamic-content';
    const container = document.createElement('div');
    container.className = 'content-container';
    
    // Add test content links
    const link1 = document.createElement('a');
    link1.setAttribute('data-tags', 'Tag1, Tag2');
    container.appendChild(link1);
    
    contentBlock.appendChild(container);
    section2.appendChild(contentBlock);
    
    document.body.appendChild(section1);
    document.body.appendChild(section2);
  });
  
  test('should find Dynamic Content block', async () => {
    await decorate(filterBlock);
    // Verify filter UI was created
    const tags = filterBlock.querySelector('.tags');
    expect(tags).toBeTruthy();
  });
  
  test('should extract unique tags', async () => {
    await decorate(filterBlock);
    const pills = filterBlock.querySelectorAll('.tag-pill');
    expect(pills.length).toBe(2); // Tag1, Tag2
  });
  
  test('should filter content on tag click', async () => {
    await decorate(filterBlock);
    const pill = filterBlock.querySelector('.tag-pill');
    pill.click();
    
    // Verify filtering occurred
    const link = contentBlock.querySelector('a[data-tags]');
    // Check visibility based on filter logic
  });
});
```

### Integration Testing

```javascript
describe('Filter Integration', () => {
  test('should work with Dynamic Content block', async () => {
    // Setup both blocks
    // Verify tags are extracted
    // Test filtering functionality
  });
  
  test('should handle multiple select mode', async () => {
    // Test multiple tag selection
    // Verify content filtering logic
  });
  
  test('should handle single select mode', async () => {
    // Test single tag selection
    // Verify only one tag active at a time
  });
});
```

---

## Deployment

### Build Process

```bash
# Standard EDS build
npm run build

# Build component definitions
npm run build:json

# Lint
npm run lint
```

### Pre-Deployment Checklist

- [ ] Filter block placement verified (before Dynamic Content block)
- [ ] Multiple select configuration tested
- [ ] Tag extraction working correctly
- [ ] Filtering logic tested
- [ ] Polling mechanism stops correctly
- [ ] Accessibility features verified
- [ ] Cross-browser testing completed

---

## Troubleshooting

### Filter Not Appearing

**Symptoms:** No tag pills visible

**Diagnosis:**
```javascript
// Check if Dynamic Content block is found
console.log('Content block:', dynamicContentBlock);

// Check if content links exist
const links = checkForContent();
console.log('Content links:', links);

// Check polling interval
console.log('Polling active:', interval);
```

**Solutions:**
1. Verify filter block is placed before Dynamic Content block
2. Ensure Dynamic Content block has loaded content
3. Check that content items have `data-tags` attributes
4. Verify tags are properly formatted (comma-separated)
5. Check browser console for errors

### Filtering Not Working

**Symptoms:** Tag clicks don't filter content

**Solutions:**
1. Verify `data-tags` attributes exist on content links
2. Check tag format matches (comma-separated)
3. Ensure filter function is being called
4. Check for JavaScript errors in console
5. Verify content container exists

### Polling Never Stops

**Symptoms:** Interval continues running indefinitely

**Solutions:**
1. Verify Dynamic Content block loads content
2. Check content structure matches expected format
3. Ensure `checkForContent()` returns correctly
4. Add timeout to prevent infinite polling:

```javascript
let pollCount = 0;
const maxPolls = 200; // 10 seconds at 50ms intervals

const interval = setInterval(() => {
  pollCount++;
  if (pollCount > maxPolls) {
    clearInterval(interval);
    console.warn('Filter: Content not found after timeout');
    return;
  }
  
  const foundLinks = checkForContent();
  if (foundLinks) {
    clearInterval(interval);
    processTags(foundLinks);
  }
}, 50);
```

### Configuration Not Applied

**Solutions:**
1. Verify `multipleSelect` value is being read correctly
2. Check boolean div removal is working
3. Ensure configuration is saved in Universal Editor
4. Verify default value handling

---

*Last Updated: December 2024*  
*Version: 1.0.0*

