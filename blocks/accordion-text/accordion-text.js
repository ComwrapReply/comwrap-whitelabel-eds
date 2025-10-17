/**
 * Accordion Text Component
 * Simple text component for accordion items
 */

export default function decorate(block) {
  // Add semantic class for styling
  block.classList.add('accordion-text-content');

  // Process the text content
  const textDiv = block.querySelector('div');
  if (textDiv) {
    textDiv.classList.add('accordion-text');
  }
}
