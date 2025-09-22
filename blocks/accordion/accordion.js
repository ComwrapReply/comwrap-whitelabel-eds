import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const generateUniqueId = () => `accordion-${Math.random().toString(36).substr(2, 9)}`;

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'accordion';
  ul.setAttribute('role', 'list');

  const singleOpenDiv = block.querySelector(':scope > div:first-child');
  const singleOpen = singleOpenDiv && singleOpenDiv.textContent.trim() === 'true';

  [...block.children].slice(1).forEach((row) => {
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

    const titleSpan = document.createElement('span');
    titleSpan.className = 'accordion-title';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'accordion-icon';
    iconSpan.setAttribute('aria-hidden', 'true');

    const questionDiv = row.querySelector(':scope > div:first-child');
    if (questionDiv) {
      titleSpan.textContent = questionDiv.textContent.trim();
    }

    button.appendChild(titleSpan);
    button.appendChild(iconSpan);
    heading.appendChild(button);
    li.appendChild(heading);

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

    const answerDiv = row.querySelector(':scope > div:nth-child(2)');
    if (answerDiv) {
      contentDiv.innerHTML = answerDiv.innerHTML;
    }

    const imageDiv = row.querySelector(':scope > div:nth-child(3) picture');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
          { width: '750' },
        ]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        contentDiv.insertBefore(optimizedPic, contentDiv.firstChild);
      }
    }

    panel.appendChild(contentDiv);
    li.appendChild(panel);

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (singleOpen) {
        ul.querySelectorAll(`.accordion-trigger:not(#${button.id})`).forEach((otherButton) => {
          otherButton.setAttribute('aria-expanded', 'false');
          const otherPanel = otherButton.parentElement.nextElementSibling;
          otherPanel.setAttribute('hidden', 'true');
        });
        button.setAttribute('aria-expanded', true);
        panel.removeAttribute('hidden');
      } else {
        button.setAttribute('aria-expanded', !isExpanded);
        panel.toggleAttribute('hidden', isExpanded);
      }
    });

    ul.appendChild(li);
  });

  block.textContent = '';
  block.appendChild(ul);
}
