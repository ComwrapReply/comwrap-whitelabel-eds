# Fragment - Developer Guide

## Overview

The Fragment block embeds authored content from another page (fragment) into the current page. It fetches the fragment's `.plain.html`, normalizes media URLs relative to the fragment path, decorates the markup via the project pipeline, and injects the fragment section content into the block. Optional style variants can be applied via the `classes` model field (e.g., `dark`).

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

- Fetch API: retrieve fragment `.plain.html` markup
- URL normalization: convert relative `./media_...` URLs to absolute using `URL`
- Project decoration pipeline: `decorateMain()` and `loadSections()` to apply blocks and sections

### Dependencies

```javascript
// Required imports
import { decorateMain } from '../../scripts/scripts.js';
import { loadSections } from '../../scripts/aem.js';
```

### State Management

No persistent component state; async flow resolves a fetched fragment and replaces the block's children with the fragment section content.

---

## File Structure

```
blocks/fragment/
├── _fragment.json           # Block definition and content model
├── fragment.js              # Core JavaScript functionality
├── fragment.css             # Styling (variant: .fragment.dark)
└── fragment-author-guide.md # Author documentation
```

### Block Definition (_fragment.json)

```json
{
  "definitions": [
    {
      "title": "Fragment",
      "id": "fragment",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Fragment",
              "model": "fragment"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "fragment",
      "fields": [
        { "component": "aem-content", "name": "reference", "label": "Reference" },
        {
          "component": "select",
          "name": "classes",
          "label": "Style",
          "valueType": "string",
          "value": "",
          "description": "The style of the fragment",
          "options": [
            { "name": "Default", "value": "" },
            { "name": "Dark", "value": "dark" }
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

This block does not require a runtime configuration object. Styling is driven by the `classes` field in the model and corresponding CSS.

### CSS Custom Properties

```css
/* Used by the dark variant */
.fragment.dark {
  padding: var(--space-24) 0;
  box-shadow: 0 0 0 100vmax var(--color-dark-blue);
  clip-path: inset(0 -100vmax);
  background-color: var(--color-dark-blue);
  color: var(--color-white);
}
```

---

## Core Functions

### Main Export Function

```javascript
/**
 * Decorates the fragment block
 * @param {Element} block - The fragment block element
 */
export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      block.classList.add(...fragmentSection.classList);
      block.classList.remove('section');
      block.replaceChildren(...fragmentSection.childNodes);
    }
  }
}
```

### loadFragment(path)

```javascript
/**
 * Loads a fragment from a given path and decorates it via project pipeline
 * @param {string} path - Fragment page path
 * @returns {HTMLElement|null} fragment main element or null
 */
export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    path = path.replace(/(\.plain)?\.html/, '');
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

      // Reset media base for assets authored under the fragment path
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
        });
      };
      resetAttributeBase('img', 'src');
      resetAttributeBase('source', 'srcset');

      decorateMain(main);
      await loadSections(main);
      return main;
    }
  }
  return null;
}
```

---

## Universal Editor Integration

No special behavior is required. The block uses a reference path authored via `aem-content` and loads published fragment content at runtime. Authoring of styles is provided via the `classes` select.

---

## Performance Optimization

- Network fetch of `${path}.plain.html` only when a valid absolute path is provided.
- Media URLs are normalized once; subsequent decoration avoids reflows by replacing children in one operation.
- Consider fragment size and image optimization on the source page to ensure good CWV.

---

## Browser Support

| Browser | Version | Desktop | Mobile | Notes |
|---------|---------|---------|--------|-------|
| Chrome | Latest 2 | ✅ | ✅ | Fetch API, URL supported |
| Firefox | Latest 2 | ✅ | ✅ |  |
| Safari | Latest 2 | ✅ | ✅ |  |
| Edge | Latest 2 | ✅ | ✅ |  |

No polyfills required for the used APIs in supported browsers.

---

## Accessibility Implementation

- Injected content keeps semantic structure from the source fragment page.
- Ensure the source fragment page uses proper heading hierarchy, alt text, and ARIA as needed.

---

## API Reference

### Block Options

Options are derived from the model and CSS classes applied on the block element:

| Class/Model Value | Effect |
|-------------------|--------|
| `""` (default)    | No additional styling |
| `dark`             | Applies `.fragment.dark` styles (dark background and light text) |

### Public Methods

No formal public API. Functionality is driven by authored `reference` and optional `classes`.

---

## Testing

### Unit Testing

```javascript
describe('Fragment', () => {
  test('loadFragment returns null for invalid path', async () => {
    expect(await loadFragment('relative-path')).toBeNull();
  });
});
```

### Integration Testing

```javascript
// Given a valid fragment path with a .section in markup
// 1) ensure children are replaced
// 2) ensure classes from fragment section are applied to the block
```

---

## Deployment

```bash
npm run build
npm run lint
```

Follow standard project deployment. No special steps are required for this block.

---

## Troubleshooting

### Fragment Not Rendering

```javascript
// Check authored reference
console.log(block.querySelector('a')?.getAttribute('href') || block.textContent.trim());
```

Solutions:
- Ensure the reference starts with `/` and points to an existing page
- Verify the fragment page publishes and serves `.plain.html`

### Media URLs Broken

Ensure media on the fragment page uses relative `./media_...` URLs so the block can normalize them to absolute URLs based on the fragment path.

---

*Last Updated: October 2025*
*Version: 1.0.0*


