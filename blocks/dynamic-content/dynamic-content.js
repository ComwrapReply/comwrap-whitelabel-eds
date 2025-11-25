import {
  getCurrentCountryLanguage,
} from '../helpers.js';

export default async function decorate(block) {
  const referenceLink = block.querySelector('a');
  const referencePath = referenceLink ? referenceLink.getAttribute('href').replace('/content/comwrap-whitelabel-eds', '') : '';

  const [currentCountry, currentLanguage] = getCurrentCountryLanguage();
  let response = await fetch('/query-index.json');

  if (currentCountry && currentLanguage) {
    response = await fetch('/query-index.json');
  }

  const dynamicContentRaw = await response.json();

  const container = document.createElement('div');
  container.classList.add('content-container');
  const dynamicContent = dynamicContentRaw.data.filter((content) => {
    const { path, title } = content;
    return path.includes(`${referencePath}/`)
      && !title.includes('Index')
      && !path.includes('/nav')
      && !path.includes('/footer')
      && (!referencePath || path.startsWith(referencePath));
  });
  dynamicContent.forEach((content) => {
    const contentLink = document.createElement('a');
    contentLink.href = content.path;
    const contentElement = document.createElement('content');
    contentElement.classList.add('content');
    contentLink.appendChild(contentElement);

    if (content.image) {
      const image = document.createElement('img');
      image.src = content.image;
      image.alt = content.title;
      contentElement.appendChild(image);
    }

    const contentBody = document.createElement('div');
    contentBody.classList.add('content-body');
    contentElement.appendChild(contentBody);

    const title = document.createElement('p');
    title.classList.add('content-title');
    title.textContent = content.title;
    contentBody.appendChild(title);

    if (content.description) {
      const contentDescription = document.createElement('p');
      contentDescription.classList.add('description');
      contentDescription.textContent = content.description;
      contentBody.appendChild(contentDescription);
    }

    if (content.tags) {
      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('tags-container');
      const tagArray = content.tags.split(', ').filter((tag) => tag.trim());
      tagArray.forEach((tag) => {
        const tagPill = document.createElement('span');
        tagPill.classList.add('tag-pill');
        tagPill.textContent = tag.trim();
        tagsContainer.appendChild(tagPill);
      });
      contentBody.appendChild(tagsContainer);
    }

    const readMoreButton = document.createElement('a');
    readMoreButton.classList.add('button', 'primary');
    readMoreButton.textContent = 'Read more';
    readMoreButton.href = content.path;
    contentBody.appendChild(readMoreButton);

    // Add data-tags attribute for filtering
    if (content.tags) {
      contentLink.setAttribute('data-tags', content.tags);
    }

    container.appendChild(contentLink);
    block.textContent = '';
    block.append(container);
  });
}
