/**
 * Accordion Image Component
 * Image component for accordion items
 */

export default function decorate(block) {
  // Add semantic class for styling
  block.classList.add('accordion-image-content');

  // Process the image
  const picture = block.querySelector('picture');
  if (picture) {
    picture.classList.add('accordion-image');
  }

  const img = block.querySelector('img');
  if (img) {
    img.classList.add('accordion-image');
  }
}
