import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Accordion Image Component
 * Image component for accordion items
 */

export default function decorateAccordionImage(block) {
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

  // If there's no picture element but there's an img, create an optimized picture
  if (!picture && img) {
    const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '800' }]);
    optimizedPicture.classList.add('accordion-image');
    img.parentNode.replaceChild(optimizedPicture, img);
  }
}
