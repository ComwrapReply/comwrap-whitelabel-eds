/**
 * Accordion Item Component
 * Basic processing for accordion items and their child components
 */

export default function decorate(block) {
  // Add semantic class for styling
  block.classList.add('accordion-item');

  // Process child components - this ensures they get loaded and their JS executes
  const childBlocks = block.querySelectorAll('[data-block-name]');
  childBlocks.forEach(() => {
    // The child block's JavaScript will be loaded automatically
    // We just need to make sure the block is processed
  });
}
