`Modal` Block - Developer Guide

---

## Overview

The `modal` block is a lightweight popup dialog component for AEM Edge Delivery Services that loads its content from a referenced fragment. Authors configure a fragment path and trigger text; at runtime the block renders a single trigger link which opens the fragment inside a native HTML `dialog` element. The implementation is dependency‑free (besides the shared `fragment` utility), optimized for Universal Editor authoring, and keeps the DOM footprint minimal.

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

- **Vanilla JavaScript (ES6+)**: Core block logic, DOM manipulation, and event handling.
- **Native HTML `dialog` element**: Renders the modal UI with built‑in focus management and Escape‑key handling.
- **AEM Edge Delivery Fragment Loader**: Reuses the shared `loadFragment` helper to fetch fragment content into the dialog.
- **CSS3**: Styles the trigger link, dialog shell, backdrop, close button, and respects reduced‑motion preferences.

### Dependencies

The modal block has a single direct dependency on the shared `fragment` block utility:

```javascript
// blocks/modal/modal.js
import { loadFragment } from '../fragment/fragment.js';
```

There are no external libraries or build‑time dependencies; everything runs in the browser as part of the standard EDS block loading model.

### State Management

The component maintains minimal internal state to prevent duplicate dialog creation:

```javascript
// Track if a modal is currently opening to prevent race conditions
let isModalOpening = false; // true while an open operation is in progress
```

This flag is reset in a `finally` block so it recovers correctly even if loading or rendering fails.

---

## File Structure

The `modal` block follows the standard Edge Delivery block layout:

```
blocks/modal/
├── _modal.json              # Block definition and content model for Universal Editor
├── modal.js                 # Core JavaScript functionality (fragment loading + dialog)
├── modal.css                # Styling and visual presentation
└── modal-developer-guide.md # This developer documentation
```

### Block Definition (`_modal.json`)

The block definition registers the block and its model with the Universal Editor:

```json
{
  "definitions": [
    {
      "title": "Modal",
      "id": "modal",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "Modal",
              "model": "modal"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "modal",
      "fields": [
        {
          "component": "aem-content",
          "name": "reference",
          "label": "Modal Content Reference"
        },
        {
          "component": "text",
          "name": "triggerText",
          "label": "Trigger Link Text",
          "valueType": "string",
          "value": "Open Modal"
        },
        {
          "component": "select",
          "name": "classes",
          "label": "Style",
          "options": [
            {
              "name": "link",
              "value": ""
            },
            {
              "name": "button",
              "value": "button"
            }
          ],
          "value": "link"
        }
      ]
    }
  ],
  "filters": []
}
```

---

## Configuration

The modal block is intentionally small and does not expose a JavaScript configuration object. Most of its behavior is controlled by:

- The Universal Editor model fields (`reference`, `triggerText`, `classes`).
- Global theme variables (e.g. `--color-primary`, `--color-white`, `--color-black`).

### CSS Custom Properties

The block uses existing project‑level CSS variables for colors; no modal‑specific variables are defined:

```css
:root {
  /* defined elsewhere in styles/theme */
  --color-primary: [project primary color]; /* Trigger and focus color */
  --color-white: [project white color];     /* Button text color on dark backgrounds */
  --color-black: [project text color];      /* Dialog border + close icon */
}
```

You can override how the modal looks by targeting the dialog and trigger classes:

```css
.modal .modal-link {
  /* Customize trigger appearance */
  color: var(--color-primary);
}

.modal-dialog {
  /* Customize dialog shell */
  border-radius: 8px;
}
```

---

## Core Functions

### Main Export Function: `decorate(block)`

```javascript
/**
 * Decorates the modal block.
 * Transforms the authored reference + trigger text into a single trigger link
 * and wires it to open a fragment in a dialog.
 * @param {HTMLElement} block - The modal block element
 */
export default async function decorate(block) {
  // 1. Inspect authored content (reference link + trigger text).
  const link = block.querySelector('a');
  const fragmentPath = link?.getAttribute('href') || '';

  // 2. Derive trigger label from the second row or use default.
  const triggerText = block.children[1]?.textContent?.trim() || 'Open Modal';

  // 3. Fail fast if no reference path is configured.
  if (!fragmentPath) {
    block.textContent = 'Modal: No reference path';
    return;
  }

  // 4. Replace block contents with a single trigger link.
  block.innerHTML = '';
  const trigger = document.createElement('a');
  trigger.href = fragmentPath;
  trigger.textContent = triggerText;
  trigger.classList.add('modal-link');

  // 5. Intercept clicks to open the dialog instead of navigating.
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(fragmentPath);
  });

  block.append(trigger);
}
```

This function is called by the global page decoration pipeline for every `modal` block instance.

### `normalizePath(path)`

```javascript
/**
 * Normalizes AEM content path to relative path.
 * Removes /content/{site-name} prefix for EDS compatibility.
 * @param {string} path - The path to normalize
 * @returns {string} - Normalized relative path
 */
function normalizePath(path) {
  // Handle full URLs
  if (path.startsWith('http')) {
    const url = new URL(path, window.location);
    return normalizePath(url.pathname);
  }

  // Remove /content/{site-name} prefix if present (AEM author paths)
  const aemPathMatch = path.match(/^\/content\/[^/]+(\/.*)$/);
  if (aemPathMatch) {
    return aemPathMatch[1];
  }

  return path;
}
```

This helper ensures that both author‑mode AEM paths and live EDS paths resolve correctly when passed to `loadFragment`.

### `openModal(fragmentUrl)`

```javascript
/**
 * Opens a modal with fragment content.
 * Creates a <dialog> with a close button, loads fragment HTML,
 * wires close interactions, and prevents duplicate openings.
 * @param {string} fragmentUrl - Path to the fragment
 */
export async function openModal(fragmentUrl) {
  // Prevent duplicate modal opening
  if (isModalOpening) return;
  isModalOpening = true;

  try {
    const path = normalizePath(fragmentUrl);

    const fragment = await loadFragment(path);
    if (!fragment) {
      // eslint-disable-next-line no-console
      console.error(`Failed to load modal fragment: ${path}`);
      return;
    }

    // Create dialog
    const dialog = document.createElement('dialog');
    dialog.classList.add('modal-dialog');

    // Close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.type = 'button';
    closeButton.innerHTML = '<span class="icon icon-close"></span>';
    closeButton.addEventListener('click', () => dialog.close());

    // Content wrapper
    const content = document.createElement('div');
    content.classList.add('modal-content');
    content.append(...fragment.childNodes);

    dialog.append(closeButton, content);
    document.body.append(dialog);

    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    // Cleanup on close
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      dialog.remove();
    });

    // Show modal
    dialog.showModal();
    document.body.classList.add('modal-open');
    content.scrollTop = 0;
  } finally {
    isModalOpening = false;
  }
}
```

Key responsibilities:

- Normalizes the fragment path and loads the fragment HTML.
- Creates the dialog structure (`<dialog>`, close button, content wrapper).
- Wires close interactions (close button, backdrop click, native Escape behavior).
- Manages body scrolling via the `modal-open` class.

---

## Universal Editor Integration

### Authoring Model

The `_modal.json` definition configures:

- A required `reference` field (AEM content picker) pointing to the fragment or page to show.
- A `triggerText` text field for the visible link label.
- A `classes` select field used to apply additional style classes to the block (e.g. `button`).

When authors place a `Modal` block:

1. They pick a content path via the **Modal Content Reference** field.
2. They set **Trigger Link Text** (optional; defaults to `Open Modal`).
3. They optionally choose a **Style** which maps to CSS classes on the block.

### Editor Mode Detection

The modal block does not implement explicit editor‑mode detection. It relies on the standard EDS authoring contract:

- The authored table structure yields a link in the first row and trigger text in the second row.
- The decoration logic runs the same way in preview and live; the Universal Editor handles block selection and inline editing.

No editor‑specific behavior is currently implemented (e.g. dialogs are still fully functional in the editor).

---

## Performance Optimization

The modal block is deliberately minimal and has low performance overhead:

- **No global listeners**: All listeners are scoped to the dialog instance or trigger link.
- **Single fragment load per open**: Each click creates a new dialog and does one `loadFragment` call.
- **DOM reuse is not required**: Dialogs are removed from the DOM on close to avoid memory leaks.

### DOM Query Caching

The code performs a small, fixed set of queries per block:

- `block.querySelector('a')` for the reference link.
- `block.children[1]` for the trigger label.

Given the simplicity, additional caching is not necessary and would not materially improve performance.

### Image Optimization

The modal itself does not manipulate images directly. Any images inside the referenced fragment are already processed by the fragment block and the standard Edge Delivery image optimization pipeline (lazy loading, `srcset`, WebP, etc.).

---

## Browser Support

### Supported Browsers

| Browser        | Version    | Desktop | Mobile | Notes                                              |
|----------------|-----------|---------|--------|----------------------------------------------------|
| Chrome         | Latest 2  | ✅      | ✅     | Full `dialog` support                              |
| Firefox        | Latest 2  | ✅      | ✅     | Full `dialog` support                              |
| Safari         | Latest 2  | ✅      | ✅     | `dialog` supported in recent versions              |
| Edge           | Latest 2  | ✅      | ✅     | Chromium‑based, same as Chrome                     |
| Mobile Safari  | iOS 16+   | N/A     | ✅     | Requires modern iOS with `dialog` support          |
| Chrome Mobile  | Latest 2  | N/A     | ✅     | Chromium support for `dialog`                      |

### Feature Detection and Fallbacks

The current implementation calls `dialog.showModal()` without feature detection. In environments without `HTMLDialogElement` support, this will throw and prevent opening the modal.

If you need to harden this for older browsers, you can wrap dialog creation and `showModal()` calls with feature detection and a basic fallback (e.g. simple full‑page navigation to the fragment URL). This is not implemented by default to keep the block small.

### Polyfills

No polyfills are bundled with the block. If strict support for older browsers is required, consider:

- A general `dialog` polyfill at application level, or
- A custom fallback inside `openModal` based on `'HTMLDialogElement' in window`.

---

## Accessibility Implementation

### ARIA Attributes and Semantics

Accessibility is primarily handled via:

- **Native `dialog` semantics**: The HTML `dialog` element provides a semantic modal container and built‑in Escape‑key close behavior.
- **Close button ARIA label**: The close button is given `aria-label="Close"` to make its purpose clear to screen readers.

```javascript
const closeButton = document.createElement('button');
closeButton.classList.add('close-button');
closeButton.setAttribute('aria-label', 'Close');
closeButton.type = 'button';
```

### Keyboard Navigation

- Focus is managed by the browser for `dialog.showModal()`. The active element moves inside the dialog when it opens.
- Escape (`Esc`) closes the dialog automatically via the `dialog` element’s built‑in behavior.
- The close button is focusable and has a clearly visible focus outline via CSS:

```css
.modal-dialog .close-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Focus Management and Reduced Motion

The CSS includes support for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .modal-dialog,
  .modal-dialog::backdrop {
    transition: none;
  }
}
```

There are no custom animations; this ensures that any future transitions will respect user preferences.

---

## API Reference

### Block Options

Block options are derived from the `classes` field in the model and applied as CSS classes to the block:

| Class Value | Effect                                                                 |
|-------------|------------------------------------------------------------------------|
| `''`        | Default link styling (`.modal .modal-link`)                            |
| `button`    | Allows styling the trigger as if it were inside a `.button` container |

In CSS:

- `.modal .modal-link` – default inline link style with underline.
- `.button .modal-link` – alternative styling when used inside a button‑styled context.

### Public Functions

The block exposes one named export besides the default decorator:

```javascript
import decorate, { openModal } from '../modal/modal.js';

// Programmatically open a modal from any click handler
openModal('/path/to/fragment');
```

Arguments:

- `fragmentUrl: string` – absolute or relative URL/path to the fragment or page whose content should appear in the dialog.

### Custom Events

The modal block does not dispatch custom DOM events by default. If you need instrumentation, you can:

- Wrap `openModal` and fire your own `CustomEvent`, or
- Hook into the dialog’s `close` event for high‑level monitoring.

---

## Testing

### Unit‑Level Checks (Manual / Console)

Recommended manual checks:

- **Path normalization**: Call `normalizePath` (from console via a temporary exported helper) with:
  - `/content/site/en/page` → `/en/page`
  - `https://example.com/content/site/en/page` → `/en/page`
  - `/en/page` → `/en/page`
- **Error handling**: Verify that when `reference` is empty, the block renders `Modal: No reference path`.

### Integration Scenarios

- Ensure clicking the trigger:
  - Creates exactly one `dialog.modal-dialog` in the DOM.
  - Adds `modal-open` to `body` while open.
  - Removes the dialog and `modal-open` class after closing.
- Verify backdrop click closes the dialog.
- Verify that Escape closes the dialog (browser behavior).

### Accessibility Testing

Using tools like axe or Lighthouse:

- Confirm that:
  - The close button has an accessible name.
  - The dialog content has a clear heading and understandable structure (driven by the fragment).
- Manually test with keyboard only:
  - Tab into the trigger.
  - Activate with Enter/Space.
  - Navigate to the close button and activate it.

---

## Deployment

### Build and Lint

The modal block is part of the standard EDS project and does not require any special build steps:

```bash
# Lint JavaScript and CSS
npm run lint
```

Ensure there are no ESLint or Stylelint errors before opening a PR.

### Pre‑Deployment Checklist

- [ ] Modal opens and closes correctly with valid fragment references.
- [ ] Body scrolling is disabled only while the dialog is open.
- [ ] No JavaScript errors in the console when opening/closing.
- [ ] Accessibility checks (keyboard + screen reader) have been performed.
- [ ] Cross‑browser smoke tests on current desktop + mobile browsers.
- [ ] Documentation (this guide and any author guide) kept in sync with implementation.

### Deployment Steps

Standard project workflow:

1. Create or update a feature branch.
2. Commit changes (if any) to `modal.js`, `modal.css`, `_modal.json`, and docs.
3. Push and open a PR against `main`.
4. Use the feature preview URL (`https://{branch}--{repo}--{owner}.aem.page`) to validate.
5. After review, merge to `main`; AEM Code Sync handles deployment to preview/live.

---

## Troubleshooting

### Modal Does Not Open

**Symptoms:** Clicking the trigger does nothing or logs an error.

**Checks:**

```javascript
// In browser console on the affected page
document.querySelector('.modal a')?.getAttribute('href');
```

If the result is empty or `null`, the `reference` field was not set correctly.

**Possible causes and fixes:**

1. **Missing reference path** – Ensure the author has selected a valid fragment/path.
2. **Fragment cannot be loaded** – Check network tab for 404/500 on the fragment URL.
3. **JavaScript error** – Look for errors mentioning `dialog` or `showModal`; add feature detection if older browsers must be supported.

### Content Looks Wrong Inside the Modal

**Symptoms:** Spacing or section padding inside the modal is off.

The modal intentionally resets padding on inner `.section` elements:

```css
.modal-dialog .modal-content .section {
  padding: 0;
}
```

If you need different spacing, adjust this selector or add container‑specific overrides inside the fragment content.

### Body Stays Locked (No Scroll) After Closing

**Symptoms:** After closing the modal, the page cannot be scrolled.

**Check:**

```javascript
document.body.classList.contains('modal-open'); // should be false after close
```

If this remains `true`, verify that the dialog’s `close` event is firing and that there are no errors thrown from within the `close` handler.

---

## Advanced Customization

### Programmatic Opening

You can reuse the `openModal` helper from other blocks or scripts:

```javascript
import { openModal } from '../blocks/modal/modal.js';

// Example: open a modal after a custom action
someElement.addEventListener('click', () => {
  openModal('/en/my-fragment');
});
```

### Analytics Integration

To instrument modal usage, wrap `openModal` or extend the click handler in `decorate`:

```javascript
trigger.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Example analytics hook
  if (window.sampleRUM) {
    window.sampleRUM('modal:open', { path: fragmentPath });
  }

  openModal(fragmentPath);
});
```

Keep analytics lightweight to avoid blocking dialog rendering.

---

## Security Considerations

### Content Source Trust

Modal content is loaded from authored fragments. Those fragments should be treated as trusted content:

- All HTML is authored within AEM and passes through the standard Edge Delivery sanitization pipeline.
- The modal block itself does not evaluate arbitrary scripts or inject unsafe HTML strings; it simply appends existing DOM nodes from the fragment.

### XSS and CSP

- No `innerHTML` is used with user‑generated strings except for the close icon, which uses a static hard‑coded template.
- The block does not add inline event handlers or use `eval`.
- It is compatible with standard project CSP rules as defined in `head.html` / server configuration.

---

Last Updated: March 2025  
Version: 1.0.0  
For author‑facing instructions, see the corresponding modal author guide (if present).


