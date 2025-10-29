import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const generateUniqueId = () => `accordion-${Math.random().toString(36).substr(2, 9)}`;

export default function decorate(block) {
  const children = [...block.children];

  const ul = document.createElement('ul');
  ul.className = 'accordion';
  ul.setAttribute('role', 'list');

  // Process accordion items
  children.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.setAttribute('role', 'listitem');

    const heading = document.createElement('h3');
    const button = document.createElement('button');
    button.className = 'accordion-trigger';
    button.setAttribute('type', 'button');

    const accordionItemOpened = row.querySelector(':scope > div:last-child');
    const isInitiallyOpen = accordionItemOpened && accordionItemOpened.textContent.trim() === 'true';
    button.setAttribute('aria-expanded', isInitiallyOpen);
    const uniqueId = generateUniqueId();
    button.setAttribute('aria-controls', uniqueId);
    button.id = `trigger-${uniqueId}`;
    const questionDiv = row.querySelector(':scope > div:first-child');

    if (questionDiv && questionDiv.firstChild) {
      const titleSpan = document.createElement('span');
      titleSpan.className = 'accordion-title';
      const iconSpan = document.createElement('span');
      iconSpan.className = 'accordion-icon';
      iconSpan.setAttribute('aria-hidden', 'true');
      titleSpan.textContent = questionDiv.textContent.trim();
      button.appendChild(titleSpan);
      button.appendChild(iconSpan);
      heading.appendChild(button);
      li.appendChild(heading);
    }

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.id = uniqueId;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', `trigger-${uniqueId}`);

    if (!isInitiallyOpen) {
      panel.setAttribute('hidden', '');
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'accordion-content';

    // Create wrapper div for text and button content
    const textButtonWrapper = document.createElement('div');
    textButtonWrapper.className = 'accordion-text-button-wrapper';

    const answerDiv = row.querySelector(':scope > div:nth-child(2)');

    if (answerDiv && answerDiv.firstChild) {
      textButtonWrapper.innerHTML = answerDiv.innerHTML;
      textButtonWrapper.firstChild.classList.add('accordion-text');
    }

    // Process button fields (divs 4-6)
    const buttonLinkDiv = row.querySelector(':scope > div:nth-child(4)');
    const buttonTextDiv = row.querySelector(':scope > div:nth-child(5)');
    const buttonStyleDiv = row.querySelector(':scope > div:nth-child(6)');

    if (buttonLinkDiv && buttonTextDiv) {
      const link = buttonLinkDiv.querySelector('a')?.href || buttonLinkDiv.textContent?.trim();
      const text = buttonTextDiv.textContent?.trim();
      const style = buttonStyleDiv?.textContent?.trim() || 'primary';

      if (link && text) {
        const buttonElement = document.createElement('a');
        buttonElement.href = link;
        buttonElement.textContent = text;
        buttonElement.className = `button ${style} accordion-button`;

        textButtonWrapper.appendChild(buttonElement);
      }
    }

    // Get image from third div if it exists
    const imageDiv = row.querySelector(':scope > div:nth-child(3) picture');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
          { width: '750' },
        ]);
        optimizedPic.classList.add('accordion-image');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        contentDiv.appendChild(optimizedPic);
      }
    }

    // Add the text/button wrapper to content
    contentDiv.appendChild(textButtonWrapper);

    panel.appendChild(contentDiv);
    li.appendChild(panel);

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      panel.toggleAttribute('hidden', isExpanded);
    });

    ul.appendChild(li);

    const layout = row.querySelector(':scope > div:nth-child(7)');
    if (layout && layout.firstChild) {
      contentDiv.classList.add(layout.firstChild.innerHTML);
    }

    [...row.children].forEach((child) => {
      if (!child.firstChild) {
        child.remove();
      }
    });
  });

  block.textContent = '';
  block.appendChild(ul);
}
