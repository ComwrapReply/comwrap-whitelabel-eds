/**
 * Accordion Button Component
 * Button component for accordion items
 */

export default function decorate(block) {
  // Add semantic class for styling
  block.classList.add('accordion-button-content');

  // Process the button content
  const buttonDiv = block.querySelector('div');
  if (buttonDiv) {
    buttonDiv.classList.add('accordion-button');
  }
}
