# Dynamic Content Block - Developer Guide

## Overview

The Dynamic Content block is a content aggregation component for AEM Edge Delivery Services that fetches and displays child pages from a selected parent page. It queries the site's content index (`query-index.json`), filters content based on path patterns, and renders content cards with images, titles, descriptions, tags, and links. The block supports integration with the Dynamic Content Filter block for tag-based filtering.

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

- **Fetch API**: Retrieves content from query-index.json
- **Country/Language Detection**: Uses helper function for localization support
- **DOM Manipulation**: Creates content cards dynamically
- **Data Filtering**: Filters content based on path patterns and metadata

### Dependencies

```javascript
import {
  getCurrentCountryLanguage,
} from '../helpers.js';
```

The block relies on the `getCurrentCountryLanguage()` helper function to determine the current locale context.

### Content Index Structure

The block expects a `query-index.json` file with this structure:

```json
{
  "columns": ["path", "lastModified", "robots", "title", "description", "keywords", "template", "tags", "image"],
  "data": [
    {
      "path": "/content/path",
      "title": "Page Title",
      "description": "Page description",
      "tags": "Tag1, Tag2",
      "image": "/path/to/image.jpg"
    }
  ]
}
```

---

## File Structure

```
blocks/dynamic-content/
├── _dynamic-content.json      # Block definition and content model
├── dynamic-content.js         # Core JavaScript functionality
├── dynamic-content.css        # Styling and visual presentation
├── mock-query-index.json      # Sample data for development
└── dynamic-content-developer-guide.md  # This documentation
```

### Block Definition (_dynamic-content.json)

```json
{
  "definitions": [
    {
      "title": "Dynamic Content",
      "id": "dynamiccontent",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "dynamic content",
              "model": "dynamiccontent",
              "filter": "dynamiccontent"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "dynamiccontent",
      "fields": [
        {
          "component": "aem-content",
          "name": "link",
          "label": "Parent page",
          "value": "",
          "valueType": "string",
          "validation": {
            "rootPath": "/content/comwrap-whitelabel-eds"
          }
        }
      ]
    }
  ],
  "filters": []
}
```

---

## Configuration

### Content Model

The block accepts one field:
- **link** (`aem-content`): Reference to the parent page whose children should be displayed

### Content Filtering Rules

The block automatically filters out:
- Pages with "Index" in the title
- Navigation pages (paths containing "/nav")
- Footer pages (paths containing "/footer")
- Pages that don't match the parent path pattern

### Path Matching Logic

```javascript
// Content must:
// 1. Include the parent path
// 2. Not include "/nav" or "/footer"
// 3. Not have "Index" in the title
// 4. Start with the parent path (if parent path exists)
```

---

## Core Functions

### Main Export Function

```javascript
/**
 * Decorates the dynamic content block
 * Fetches content from query-index.json and renders content cards
 * @param {HTMLElement} block - The dynamic content block element
 */
export default async function decorate(block) {
  // Extract parent page reference
  const referenceLink = block.querySelector('a');
  const referencePath = referenceLink 
    ? referenceLink.getAttribute('href').replace('/content/comwrap-whitelabel-eds', '') 
    : '';

  // Get current locale context
  const [currentCountry, currentLanguage] = getCurrentCountryLanguage();
  
  // Fetch content index
  let response = await fetch('/query-index.json');
  
  // Process response...
}
```

### Content Fetching

```javascript
// Fetch query index
const response = await fetch('/query-index.json');
const dynamicContentRaw = await response.json();

// Filter content based on parent path and rules
const dynamicContent = dynamicContentRaw.data.filter((content) => {
  const { path, title } = content;
  return path.includes(`${referencePath}/`)
    && !title.includes('Index')
    && !path.includes('/nav')
    && !path.includes('/footer')
    && (!referencePath || path.startsWith(referencePath));
});
```

### Content Card Creation

```javascript
/**
 * Creates a content card element for each content item
 * @param {Object} content - Content item from query index
 * @param {HTMLElement} container - Container to append cards to
 */
dynamicContent.forEach((content) => {
  // Create link wrapper
  const contentLink = document.createElement('a');
  contentLink.href = content.path;
  
  // Create content element
  const contentElement = document.createElement('content');
  contentElement.classList.add('content');
  
  // Add image if available
  if (content.image) {
    const image = document.createElement('img');
    image.src = content.image;
    image.alt = content.title;
    contentElement.appendChild(image);
  }
  
  // Add content body with title, description, tags
  const contentBody = document.createElement('div');
  contentBody.classList.add('content-body');
  
  // Add title
  const title = document.createElement('p');
  title.classList.add('content-title');
  title.textContent = content.title;
  
  // Add description
  if (content.description) {
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = content.description;
  }
  
  // Add tags container
  if (content.tags) {
    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tags-container');
    // Parse and render tags...
  }
  
  // Add data-tags attribute for filtering
  if (content.tags) {
    contentLink.setAttribute('data-tags', content.tags);
  }
});
```

### Tag Processing

```javascript
/**
 * Parses and renders tags for a content item
 * @param {string} tagsString - Comma-separated tags string
 * @param {HTMLElement} container - Container to append tag pills
 */
if (content.tags) {
  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('tags-container');
  const tagArray = content.tags.split(', ').filter((tag) => tag.trim());
  
  tagArray.forEach((tag) => {
    const tagPill = document.createElement('span');
    tagPill.classList.add('tag-pill');
    tagPill.textContent = tag.trim();
    tagsContainer.appendChild(tagPill);
  });
  
  contentBody.appendChild(tagsContainer);
}
```

---

## Universal Editor Integration

### Content Model Integration

The block integrates with Universal Editor through:
- **Parent Page Selection**: Authors select a parent page via `aem-content` component
- **Automatic Content Discovery**: Child pages are automatically discovered and displayed
- **Real-time Preview**: Changes to child pages reflect after publishing and refresh

### Editor Experience

1. Author adds Dynamic Content block
2. Selects parent page in Properties panel
3. Block automatically fetches and displays child pages
4. Content updates when child pages are added/modified

### Content Updates

```javascript
// Content is fetched fresh from query-index.json on each page load
// No caching means content always reflects current published state
// Authors see changes after:
// 1. Publishing child pages
// 2. Refreshing the page
// 3. Waiting for query-index.json to update
```

---

## Performance Optimization

### Async Content Loading

The block uses async/await for non-blocking content fetching:

```javascript
export default async function decorate(block) {
  // Fetch happens asynchronously
  const response = await fetch('/query-index.json');
  // Page continues rendering while fetching
}
```

### Efficient DOM Operations

- Batch DOM creation by building elements before appending
- Use document fragments for multiple insertions (if needed)
- Minimize reflows by constructing complete elements first

### Content Filtering

Filtering happens in memory before DOM creation:

```javascript
// Filter in JavaScript (fast) before creating DOM elements
const dynamicContent = dynamicContentRaw.data.filter((content) => {
  // Filter logic...
});
```

### Image Optimization

Images are loaded from content metadata:
- Source URLs come from query-index.json
- Consider lazy loading for images (add `loading="lazy"` attribute)
- Images should be optimized server-side

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

```javascript
// Fetch API is well-supported, but can check:
if (window.fetch) {
  // Use fetch API
} else {
  // Fallback to XMLHttpRequest (rarely needed)
}
```

### Polyfills

No polyfills required. The component uses:
- Fetch API (widely supported)
- Async/await (ES2017, supported in all modern browsers)
- Template literals (ES6)
- Array methods (ES5+)

---

## Accessibility Implementation

### Semantic HTML

```javascript
// Content cards use semantic structure:
// - <a> for links (keyboard accessible)
// - <p> for text content
// - Semantic class names for styling hooks
```

### ARIA Attributes

Consider adding ARIA labels for better screen reader support:

```javascript
// Example enhancement:
contentLink.setAttribute('aria-label', `Read more about ${content.title}`);
contentLink.setAttribute('role', 'article');
```

### Keyboard Navigation

- All content cards are keyboard accessible via `<a>` elements
- Tab order follows content order
- Enter/Space activate links

### Image Accessibility

```javascript
// Images include alt text from content title
if (content.image) {
  const image = document.createElement('img');
  image.src = content.image;
  image.alt = content.title; // Always provide alt text
}
```

### Focus Management

Links are focusable and should have visible focus indicators in CSS:

```css
.dynamic-content a:focus {
  outline: 2px solid var(--link-color);
  outline-offset: 2px;
}
```

---

## API Reference

### Block Options

The block accepts one configuration option:

| Field | Type | Description |
|-------|------|-------------|
| `link` | `aem-content` | Reference to parent page whose children to display |

### Content Index Format

Expected structure from `query-index.json`:

```json
{
  "columns": ["path", "title", "description", "tags", "image", ...],
  "data": [
    {
      "path": "/content/path/to/page",
      "title": "Page Title",
      "description": "Page description text",
      "tags": "Tag1, Tag2, Tag3",
      "image": "/path/to/image.jpg"
    }
  ]
}
```

### CSS Classes

Generated structure uses these classes:

- `.content-container` - Main container for all content cards
- `.content` - Individual content card element
- `.content-body` - Content card body section
- `.content-title` - Title paragraph
- `.description` - Description paragraph
- `.tags-container` - Container for tag pills
- `.tag-pill` - Individual tag element
- `.button.primary` - "Read more" button

### Data Attributes

- `data-tags` - Added to content links for filtering integration
  - Format: comma-separated string (e.g., "Tag1, Tag2, Tag3")

---

## Testing

### Unit Testing

```javascript
describe('Dynamic Content Block', () => {
  let block;
  let mockFetch;
  
  beforeEach(() => {
    block = document.createElement('div');
    block.className = 'block dynamic-content';
    
    // Mock query-index.json response
    mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({
        data: [
          {
            path: '/test/page1',
            title: 'Test Page 1',
            description: 'Description',
            tags: 'Tag1, Tag2',
            image: '/image.jpg'
          }
        ]
      })
    });
  });
  
  test('should fetch content from query-index.json', async () => {
    await decorate(block);
    expect(mockFetch).toHaveBeenCalledWith('/query-index.json');
  });
  
  test('should create content cards', async () => {
    await decorate(block);
    const cards = block.querySelectorAll('.content');
    expect(cards.length).toBeGreaterThan(0);
  });
  
  test('should filter out Index pages', async () => {
    // Test filtering logic
  });
});
```

### Integration Testing

```javascript
describe('Dynamic Content Integration', () => {
  test('should work with Dynamic Content Filter', async () => {
    // Setup filter block and content block
    // Verify tags are properly set for filtering
  });
  
  test('should handle missing parent page', async () => {
    // Test behavior when no parent page is selected
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

- [ ] query-index.json is accessible at root
- [ ] Helper function `getCurrentCountryLanguage` is available
- [ ] Content structure matches expected format
- [ ] Filtering logic works correctly
- [ ] Images load properly
- [ ] Tags are properly formatted
- [ ] Accessibility features work

---

## Troubleshooting

### Content Not Loading

**Symptoms:** No content cards appear

**Diagnosis:**
```javascript
// Check fetch response
console.log('Fetch response:', await fetch('/query-index.json').then(r => r.json()));

// Check filtered content
console.log('Filtered content:', dynamicContent);

// Check reference path
console.log('Reference path:', referencePath);
```

**Solutions:**
1. Verify query-index.json exists and is accessible
2. Check parent page path is correct
3. Ensure child pages exist and are published
4. Verify filtering rules aren't excluding all content
5. Check browser console for errors

### Images Not Displaying

**Solutions:**
1. Verify image paths in query-index.json are correct
2. Check images are published and accessible
3. Ensure image URLs are absolute or correct relative paths
4. Verify image metadata is included in content index

### Tags Not Working with Filter

**Solutions:**
1. Verify tags are added as `data-tags` attribute on links
2. Check tag format is comma-separated
3. Ensure Dynamic Content Filter block is present
4. Verify tags are properly formatted in query-index.json

### Path Matching Issues

**Solutions:**
1. Check parent path extraction logic
2. Verify path replacement logic (`/content/comwrap-whitelabel-eds`)
3. Ensure paths match expected format
4. Check filtering conditions aren't too restrictive

---

*Last Updated: December 2024*  
*Version: 1.0.0*

