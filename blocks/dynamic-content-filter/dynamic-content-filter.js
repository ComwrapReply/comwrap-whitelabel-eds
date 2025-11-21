export default async function decorate(block) {
  // Find the dynamic-content block - it's in the next sibling wrapper
  const contentWrapper = block.parentElement.nextElementSibling;
  console.log('contentWrapper:', contentWrapper);
  const dynamicContentBlock = contentWrapper?.querySelector('.dynamic-content.block');
  console.log('dynamicContentBlock:', dynamicContentBlock);

  if (!dynamicContentBlock) {
    console.log('No dynamic content block found');
    return;
  }

  // Filter content items based on selected tags (show if content has ANY selected tag)
  const filterContent = (selectedTags) => {
    const contentContainer = dynamicContentBlock.querySelector('.content-container');
    const contentLinks = contentContainer?.querySelectorAll('a[data-tags]');

    contentLinks.forEach((link) => {
      if (selectedTags.length === 0) {
        // Show all items if no tags selected
        link.style.display = '';
      } else {
        // Show items that have ANY of the selected tags
        const tagsAttr = link.getAttribute('data-tags');
        if (tagsAttr) {
          const tagArray = tagsAttr.split(', ').map((tag) => tag.trim());
          const hasSelectedTag = selectedTags.some((selectedTag) => tagArray.includes(selectedTag));
          if (hasSelectedTag) {
            link.style.display = '';
          } else {
            link.style.display = 'none';
          }
        } else {
          link.style.display = 'none';
        }
      }
    });
  };

  // Get multipleSelect value from block content
  const getMultipleSelect = () => {
    // Boolean fields in blocks are rendered as text "true" or "false"
    // Look for the value in block's child divs
    const divs = Array.from(block.querySelectorAll('div'));

    // Check each div for boolean values
    const booleanDiv = divs.find((div) => {
      const text = div.textContent.trim().toLowerCase();
      return text === 'true' || text === 'false';
    });

    if (booleanDiv) {
      return booleanDiv.textContent.trim().toLowerCase() === 'true';
    }

    // Default to true if not found
    return true;
  };

  // Process tags when content is found - non-blocking
  const processTags = (contentLinks) => {
    const tagPills = [];
    contentLinks.forEach((link) => {
      const tagsAttr = link.getAttribute('data-tags');
      if (tagsAttr) {
        // Split by ', ' and add each tag to the array
        const tags = tagsAttr.split(', ').map((tag) => tag.trim());
        tagPills.push(...tags);
      }
    });

    const uniqueTagPills = [...new Set(tagPills)].sort();
    const multipleSelect = getMultipleSelect();

    const tags = document.createElement('div');
    tags.classList.add('tags');
    const selectedTags = [];

    uniqueTagPills.forEach((tag) => {
      const tagPill = document.createElement('button');
      tagPill.type = 'button';
      tagPill.classList.add('tag-pill');
      tagPill.innerHTML = `<span class="tag-pill-text">${tag}</span>`;
      tagPill.setAttribute('data-tag', tag);

      // Click handler - behavior depends on multipleSelect
      tagPill.addEventListener('click', (e) => {
        e.stopPropagation();
        const tagIndex = selectedTags.indexOf(tag);

        if (multipleSelect) {
          // Multiple select mode: toggle selection
          if (tagIndex > -1) {
            // Deselect if already selected
            selectedTags.splice(tagIndex, 1);
            tagPill.classList.remove('active');
          } else {
            // Select if not selected
            selectedTags.push(tag);
            tagPill.classList.add('active');
          }
        } else if (tagIndex > -1) {
          // Single select mode: deselect if clicking the active pill
          selectedTags.splice(tagIndex, 1);
          tagPill.classList.remove('active');
        } else {
          // Single select mode: deselect all others and select this one
          selectedTags.length = 0;
          selectedTags.push(tag);
          tags.querySelectorAll('.tag-pill').forEach((pill) => {
            pill.classList.remove('active');
          });
          tagPill.classList.add('active');
        }
        filterContent(selectedTags);
      });

      tags.appendChild(tagPill);
    });

    block.appendChild(tags);
  };

  const checkForContent = () => {
    const contentContainer = dynamicContentBlock.querySelector('.content-container');
    const contentLinks = contentContainer?.querySelectorAll('a[data-tags]');
    if (contentContainer && contentLinks && contentLinks.length > 0) {
      return contentLinks;
    }
    return null;
  };

  // Check immediately
  const links = checkForContent();
  if (links) {
    processTags(links);
    return;
  }

  // Poll every 50ms until content is found - non-blocking
  const interval = setInterval(() => {
    const foundLinks = checkForContent();
    if (foundLinks) {
      clearInterval(interval);
      processTags(foundLinks);
    }
  }, 50);
}
