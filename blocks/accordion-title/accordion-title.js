/**
 * Accordion Title Component
 * Title component for accordion items
 */

export default function decorate(block) {
  // Add semantic class for styling
  block.classList.add('accordion-title-content');

  // Process the title content
  const titleDiv = block.querySelector('div');
  if (titleDiv) {
    titleDiv.classList.add('accordion-title');
  }
}
