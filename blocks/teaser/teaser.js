import { moveClassToTargetedChild } from '../../scripts/utils.js';
import { renderButton } from '../../components/button/button.js';

export default function decorate(block) {
  const [
    title,
    description,
    image,
    link,
    label,
    target,
  ] = Array.from(block.children)
    .map((row, index) => {
      switch (index) {
        case 0: // Title
        case 1: // Description
        case 3: // Link
        case 4: // Label
        case 5: // Target
        { // Read value and remove row from the DOM
          const value = row.textContent.trim();
          row.remove();
          return value;
        }
        case 2: // Image
        { // Get the picture element and remove row from the DOM
          const picture = row.querySelector('picture');
          row.remove();
          return picture;
        }
        default:
          return '';
      }
    });

  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-block';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'teaser-image';

  if (image) {
    imageDiv.appendChild(image);
  } else {
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/400x200';
    img.alt = 'Teaser Image';
    imageDiv.appendChild(img);
  }

  const contentDiv = document.createElement('div');
  contentDiv.className = 'teaser-content';

  const titleEl = document.createElement('h2');
  titleEl.className = 'teaser-title';
  titleEl.textContent = title || '';

  const descEl = document.createElement('p');
  descEl.className = 'teaser-description';
  descEl.textContent = description || '';

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'teaser-button';
  if (label) {
    buttonDiv.appendChild(renderButton({
      link,
      label,
      target,
      block,
    }));
    moveClassToTargetedChild(block, buttonDiv.querySelector('.button'));
  }

  contentDiv.appendChild(titleEl);
  contentDiv.appendChild(descEl);
  contentDiv.appendChild(buttonDiv);

  wrapper.appendChild(imageDiv);
  wrapper.appendChild(contentDiv);

  block.textContent = '';
  block.appendChild(wrapper);
}
