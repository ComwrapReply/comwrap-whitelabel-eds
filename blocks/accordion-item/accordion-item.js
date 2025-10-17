import { moveInstrumentation } from '../../scripts/scripts.js';

const generateUniqueId = () => `accordion-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Find all accordion item sections and group consecutive ones into accordion containers
 */
function groupAccordionItems() {
  // Find all sections with accordion item data attribute
  const accordionItemSections = document.querySelectorAll('section[data-block-name="accordionitem"]');

  if (accordionItemSections.length === 0) return;

  // Group consecutive accordion item sections
  const accordionGroups = [];
  let currentGroup = [];

  accordionItemSections.forEach((section, index) => {
    const prevSection = accordionItemSections[index - 1];

    // If this is the first section or not consecutive, start a new group
    if (!prevSection || !section.previousElementSibling?.isSameNode(prevSection)) {
      if (currentGroup.length > 0) {
        accordionGroups.push([...currentGroup]);
      }
      currentGroup = [section];
    } else {
      currentGroup.push(section);
    }
  });

  // Add the last group
  if (currentGroup.length > 0) {
    accordionGroups.push(currentGroup);
  }

  // Process each group
  accordionGroups.forEach((group) => {
    if (group.length === 0) return;

    // Create accordion container
    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'accordion-container';

    const ul = document.createElement('ul');
    ul.className = 'accordion';
    ul.setAttribute('role', 'list');

    // Process each accordion item in the group
    group.forEach((section) => {
      const li = document.createElement('li');
      moveInstrumentation(section, li);
      li.setAttribute('role', 'listitem');

      const heading = document.createElement('h3');
      const button = document.createElement('button');
      button.className = 'accordion-trigger';
      button.setAttribute('type', 'button');

      // Check if accordion item should be initially open
      const accordionItemOpenField = section.querySelector('[data-field="accordion-item-open"]');
      const isInitiallyOpen = accordionItemOpenField && accordionItemOpenField.textContent.trim() === 'true';
      button.setAttribute('aria-expanded', isInitiallyOpen);

      const uniqueId = generateUniqueId();
      button.setAttribute('aria-controls', uniqueId);
      button.id = `trigger-${uniqueId}`;

      const titleSpan = document.createElement('span');
      titleSpan.className = 'accordion-title';
      const iconSpan = document.createElement('span');
      iconSpan.className = 'accordion-icon';
      iconSpan.setAttribute('aria-hidden', 'true');

      // Get title from accordion item title field
      const titleField = section.querySelector('[data-field="accordion-item-title"]');
      if (titleField) {
        titleSpan.textContent = titleField.textContent.trim();
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

      // Get all content from the section (excluding section metadata)
      // Skip the first few divs which contain section metadata and accordion fields
      const allDivs = section.querySelectorAll(':scope > div');
      let skipCount = 0;
      
      // Count how many metadata/field divs to skip
      allDivs.forEach((div, index) => {
        const text = div.textContent.toLowerCase();
        if (text.includes('section name') || 
            text.includes('style') || 
            text.includes('accordion-item-title') ||
            text.includes('accordion-item-open')) {
          skipCount = index + 1;
        }
      });
      
      // Get content divs (skip the metadata divs)
      const actualContentElements = section.querySelectorAll(`:scope > div:nth-child(n+${skipCount + 1})`);
      actualContentElements.forEach((element) => {
        contentDiv.appendChild(element.cloneNode(true));
      });

      panel.appendChild(contentDiv);
      li.appendChild(panel);

      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        panel.toggleAttribute('hidden', isExpanded);
      });

      ul.appendChild(li);
    });

    accordionContainer.appendChild(ul);

    // Replace the first section in the group with the accordion container
    const firstSection = group[0];
    firstSection.parentNode.insertBefore(accordionContainer, firstSection);

    // Remove all sections in the group
    group.forEach((section) => {
      section.remove();
    });
  });
}

/**
 * Initialize accordion functionality
 * This is called for each accordion item section
 */
export default function decorate() {
  // Use a global flag to ensure grouping only happens once
  if (typeof window.accordionInitialized === 'undefined') {
    window.accordionInitialized = true;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', groupAccordionItems);
    } else {
      groupAccordionItems();
    }
  }
}
