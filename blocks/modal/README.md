# Modal Block

A popup that appears over other site content. The modal block can be used to display content in a dialog overlay, either by linking to modal content or programmatically.

## Overview

The modal block provides a way to display content in a popup dialog that appears over the main page content. It supports:

- Opening modals via links to `/modals/` paths
- Programmatic creation and opening of modals
- Automatic close on backdrop click
- Keyboard and accessibility support

## Usage

### As a Block Component

Add a modal block to your page in the Universal Editor. The block can contain a link that opens modal content:

1. Add a Modal block to your page
2. Configure the `Modal Content Reference` field to point to the modal content page
3. Optionally set the `Trigger Link Text` field for custom link text

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

### Link-Based Usage

Any link on the page that points to a `/modals/` path will automatically open in a modal when clicked. The link should be within a modal block or you can use the `openModal()` function programmatically.

## Block Definition

The modal block is defined in `_modal.json` with the following fields:

- **Modal Content Reference** (`reference`): AEM content link to the modal content page
- **Trigger Link Text** (`triggerText`): Text to display on the trigger link (default: "Open Modal")

## Styling

The modal uses CSS custom properties for theming:

- `--header-height`: Height of the header (used for max-height calculations)
- `--text-color`: Text color for close button
- `--dark-color`: Border color for modal dialog
- `--link-color`: Focus outline color

## Accessibility

- Close button has proper ARIA label
- Modal dialog uses semantic `<dialog>` element
- Keyboard navigation supported
- Focus management on open/close
- Reduced motion support via CSS media query

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

### `openModal(fragmentUrl)`

Opens a modal by loading content from a fragment URL.

**Parameters:**
- `fragmentUrl` (string): URL path to the fragment content

**Returns:**
- `Promise<void>`

### `decorate(block)`

Decorates the modal block, handling links to modal paths.

**Parameters:**
- `block` (HTMLElement): The modal block element

**Returns:**
- `Promise<void>`

## Examples

### Example 1: Simple Modal Link

```html
<div class="modal block">
  <div>
    <div>
      <a href="/modals/sample-disclaimer">Show Disclaimer</a>
    </div>
  </div>
</div>
```

### Example 2: Programmatic Modal

```javascript
import { openModal } from '../modal/modal.js';

// In your block's decorate function
const button = block.querySelector('.open-modal-button');
button.addEventListener('click', async () => {
  await openModal('/modals/sample-content');
});
```

### Example 3: Custom Content Modal

```javascript
import { createModal } from '../modal/modal.js';

const customContent = document.createElement('div');
customContent.innerHTML = '<h2>Custom Modal</h2><p>This is custom content.</p>';

const { showModal } = await createModal([customContent]);
showModal();
```

## Notes

- Modal content is loaded as fragments, so it goes through the full decoration pipeline
- The modal automatically closes when clicking outside the dialog
- Body scroll is disabled when modal is open
- Modal is removed from DOM when closed

