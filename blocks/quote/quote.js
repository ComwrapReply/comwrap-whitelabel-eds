/**
 * Entry point to the block's JavaScript.
 * Must be exported as default and accept a block's DOM element.
 * This function is called by the project's scripts.js, passing the block's element.
 *
 * @param {HTMLElement} block represents the block's DOM element/tree
 */
export default function decorate(block) {
  const children = [...block.children];

  if (children.length === 0) {
    return;
  }

  // Clear the block content
  block.innerHTML = '';

  // Process each row
  children.forEach((row, index) => {
    const cells = [...row.children];

    if (index === 0 && cells.length > 0) {
      // First row is the quote
      const quoteCell = cells[0];
      const blockquote = document.createElement('blockquote');
      blockquote.innerHTML = quoteCell.innerHTML;
      block.appendChild(blockquote);
    } else if (index === 1 && cells.length > 0) {
      // Second row is the author
      const authorCell = cells[0];
      if (authorCell.textContent.trim()) {
        const authorDiv = document.createElement('div');
        authorDiv.classList.add('quote-author');
        authorDiv.innerHTML = authorCell.innerHTML;
        block.appendChild(authorDiv);
      }
    }
  });
}
