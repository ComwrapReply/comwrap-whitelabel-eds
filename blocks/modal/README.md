# Modal Block

A popup that appears over other site content. The modal block is not a traditional block component - instead, links to `/modals/` paths are automatically transformed into modals. Other blocks can also use the `createModal()` and `openModal()` functions programmatically.

## Overview

The modal block provides a way to display content in a popup dialog that appears over the main page content. It supports:

- **Automatic modal opening** for links to `/modals/` paths anywhere on the page
- **Programmatic creation and opening** of modals via exported functions
- **Automatic close** on backdrop click
- **Keyboard and accessibility** support

This implementation is based on the [official Adobe AEM Block Collection](https://github.com/adobe/aem-block-collection/blob/main/blocks/modal/modal.js).

## Usage

### Automatic Link Transformation

Any link on the page that points to a `/modals/` path will automatically open in a modal when clicked. This is handled by the `autolinkModals()` function in `scripts.js`, which is called during page initialization.

**Example:**

```html
<a href="/modals/sample-disclaimer">Show Disclaimer</a>
```

The link doesn't need to be inside any special block - it will work anywhere on the page.

### Programmatic Usage

The modal block exports utility functions that can be used by other blocks:

```javascript
import { createModal, openModal } from '../modal/modal.js';

// Open a modal from a fragment URL
await openModal('/modals/sample-disclaimer');

// Create a modal with custom content nodes
const contentNodes = [/* DOM nodes */];
const { showModal } = await createModal(contentNodes);
showModal();
```

## Implementation Details

### Not a Traditional Block

This is **not a traditional block**, so there is no `decorate()` function. Instead:

- Links to `/modals/` paths are automatically transformed into modals via `autolinkModals()` in `scripts.js`
- The modal functions can be imported and used programmatically by other blocks
- Modal content is loaded as fragments and goes through the full decoration pipeline

### Global Link Handler

The `autolinkModals()` function in `scripts.js` sets up a click event listener that:

- Intercepts clicks on any link containing `/modals/` in the href
- Prevents default navigation
- Dynamically imports the modal module
- Opens the modal with the link's href

This function is called in `loadEager()` to ensure modal links work as early as possible.

## Block Definition

The modal block definition in `_modal.json` is provided for Universal Editor integration, but the modal functionality works independently of this definition. The block definition includes:

- **Modal Content Reference** (`reference`): AEM content link to the modal content page
- **Trigger Link Text** (`triggerText`): Text to display on the trigger link (default: "Open Modal")

## Styling

The modal uses CSS custom properties for theming. The styles are based on the [official Adobe AEM Block Collection CSS](https://github.com/adobe/aem-block-collection/blob/main/blocks/modal/modal.css).

### CSS Custom Properties

- `--header-height`: Height of the header (used for max-height calculations)
- `--text-color`: Text color for close button
- `--dark-color`: Border color for modal dialog

### Key Styles

- Modal dialog uses `calc(100vw - 48px)` width on mobile, `calc(100vw - 64px)` on desktop
- Max height is calculated based on viewport height minus header height
- Close button is positioned absolutely in the top-right corner
- Backdrop uses `rgb(19 19 19 / 75%)` for semi-transparent overlay

## Accessibility

- Close button has proper ARIA label (`aria-label="Close"`)
- Modal dialog uses semantic `<dialog>` element
- Keyboard navigation supported (ESC key closes modal)
- Focus management on open/close
- Click outside dialog closes the modal

## Browser Support

The modal block uses the native `<dialog>` element, which is supported in:

- Chrome 37+
- Edge 79+
- Safari 15.4+
- Firefox 98+

For older browsers, a polyfill may be required.

## API Reference

### `createModal(contentNodes)`

Creates a modal dialog with the provided content nodes.

**Parameters:**
- `contentNodes` (Node[]): Array of DOM nodes to display in the modal

**Returns:**
- `Promise<Object>`: Object containing:
  - `block` (HTMLElement): The modal block element
  - `showModal` (Function): Function to show the modal

**Example:**

```javascript
const contentNodes = [document.createElement('div')];
contentNodes[0].innerHTML = '<h2>Modal Title</h2><p>Modal content</p>';

const { showModal } = await createModal(contentNodes);
showModal();
```

### `openModal(fragmentUrl)`

Opens a modal by loading content from a fragment URL.

**Parameters:**
- `fragmentUrl` (string): URL path to the fragment content

**Returns:**
- `Promise<void>`

**Example:**

```javascript
await openModal('/modals/sample-content');
```

## Examples

### Example 1: Simple Modal Link

Any link to a `/modals/` path automatically opens as a modal:

```html
<a href="/modals/sample-disclaimer">Show Disclaimer</a>
```

### Example 2: Programmatic Modal

Open a modal programmatically from another block:

```javascript
import { openModal } from '../modal/modal.js';

// In your block's decorate function
const button = block.querySelector('.open-modal-button');
button.addEventListener('click', async () => {
  await openModal('/modals/sample-content');
});
```

### Example 3: Custom Content Modal

Create a modal with custom DOM nodes:

```javascript
import { createModal } from '../modal/modal.js';

const customContent = document.createElement('div');
customContent.innerHTML = '<h2>Custom Modal</h2><p>This is custom content.</p>';

const { showModal } = await createModal([customContent]);
showModal();
```

### Example 4: Button with Modal

Create a button that opens a modal:

```html
<button class="open-modal-btn" data-modal-path="/modals/terms">View Terms</button>
```

```javascript
// In your block's decorate function
const button = block.querySelector('.open-modal-btn');
if (button) {
  button.addEventListener('click', async () => {
    const modalPath = button.dataset.modalPath;
    const { openModal } = await import('../modal/modal.js');
    await openModal(modalPath);
  });
}
```

## Technical Notes

- Modal content is loaded as fragments, so it goes through the full decoration pipeline
- The modal automatically closes when clicking outside the dialog
- Body scroll is disabled when modal is open (`body.modal-open { overflow: hidden; }`)
- Modal is removed from DOM when closed
- The `autolinkModals()` function uses event delegation, so it works with dynamically added links
- Modal module is dynamically imported only when needed to avoid circular dependencies

## References

- [Official Adobe AEM Block Collection - Modal](https://github.com/adobe/aem-block-collection/blob/main/blocks/modal/modal.js)
- [Official Adobe AEM Block Collection - Modal CSS](https://github.com/adobe/aem-block-collection/blob/main/blocks/modal/modal.css)
- [MDN - Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
