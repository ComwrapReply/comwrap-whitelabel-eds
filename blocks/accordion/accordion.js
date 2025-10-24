import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const generateUniqueId = () => `accordion-${Math.random().toString(36).substr(2, 9)}`;

export default function decorate(block) {
  // Universal Editor creates this structure:
  // div[0] = Name (required field)
  // div[1] = Mark as Unbound Form Element
  // div[2] = Show Component
  // div[3] = Enable Component
  // div[4] = Read-only
  // div[5] = Column Span
  // div[6+] = Accordion items

  const children = [...block.children];

  // Skip the first 6 divs (Universal Editor metadata) and process accordion items
  // from div[6] onwards
  const accordionItemDivs = children.slice(9);

  const ul = document.createElement('ul');
  ul.className = 'accordion';
  ul.setAttribute('role', 'list');

  // Process accordion items
  accordionItemDivs.forEach((row) => {
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
    contentDiv.firstChild.classList.add('accordion-text');

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
        contentDiv.insertBefore(optimizedPic, contentDiv.firstChild);
      }
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

        contentDiv.appendChild(buttonElement);
      }
    }

    panel.appendChild(contentDiv);
    li.appendChild(panel);

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      panel.toggleAttribute('hidden', isExpanded);
    });

    ul.appendChild(li);

    const layout = row.querySelector(':scope > div:nth-child(7)');
    contentDiv.classList.add(layout.firstChild.innerHTML);
  });

  block.textContent = '';
  block.appendChild(ul);
}
