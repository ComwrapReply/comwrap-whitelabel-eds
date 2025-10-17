import decorateAccordionImage from '../accordion-image/accordion-image.js';

/**
 * Manually process accordion components within the accordion-item
 * @param {HTMLElement} block - The accordion item block
 */
async function processAccordionComponents(block) {
  // Find all divs that might contain accordion components
  const allDivs = Array.from(block.querySelectorAll('div'));

  // Look for accordion-image identifier
  const accordionImageDiv = allDivs.find((div) => div.textContent?.trim() === 'accordion-image');

  if (accordionImageDiv) {
    // Found the identifier, get the parent container
    const componentDiv = accordionImageDiv.closest('div').parentElement;

    // Remove the identifier div
    accordionImageDiv.parentElement.remove();

    // Create a mock block element
    const mockBlock = document.createElement('div');
    mockBlock.classList.add('block', 'accordion-image');
    mockBlock.innerHTML = componentDiv.innerHTML;

    // Call the accordion-image decorate function with the entire div
    decorateAccordionImage(mockBlock);

    // Replace the component content with processed result
    componentDiv.innerHTML = '';
    componentDiv.appendChild(mockBlock);
  }
}

/**
 * Accordion Item Component
 * Basic processing for accordion items and their child components
 */
export default function decorate(block) {
  // Add semantic class for styling
  block.classList.add('accordion-item');

  // Process accordion components manually since they're rendered as content, not separate blocks
  processAccordionComponents(block);
}
