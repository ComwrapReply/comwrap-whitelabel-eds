# Element Grouping Guide for Universal Editor Blocks

## Overview

Element grouping allows you to use multiple select and multiselect fields in a single block by using underscore notation. This pattern groups related fields together and applies them as CSS classes to the block element.

## Pattern Structure

Use the naming convention: `{groupName}_{fieldName}` where:
- `{groupName}` is the group identifier (commonly `classes`)
- `{fieldName}` is the specific field name

## Field Types for Element Grouping

### 1. Select Fields (Single Choice)
```json
{
  "component": "select",
  "name": "classes_layout",
  "label": "Layout",
  "valueType": "string",
  "options": [
    {"name": "Default", "value": ""},
    {"name": "Stack", "value": "stack"},
    {"name": "Align", "value": "align"}
  ],
  "value": ""
}
```

### 2. Multiselect Fields (Multiple Choices)
```json
{
  "component": "multiselect",
  "name": "classes_effects",
  "label": "Effects",
  "valueType": "string",
  "options": [
    {
      "name": "Animation",
      "children": [
        {"name": "Fade In", "value": "fade-in"},
        {"name": "Slide Up", "value": "slide-up"}
      ]
    },
    {
      "name": "Style",
      "children": [
        {"name": "Shadow", "value": "shadow"},
        {"name": "Border", "value": "border"}
      ]
    }
  ],
  "value": ""
}
```

### 3. Boolean Fields (Toggle)
```json
{
  "component": "select",
  "name": "classes_fullwidth",
  "label": "Full Width",
  "valueType": "string",
  "options": [
    {"name": "No", "value": ""},
    {"name": "Yes", "value": "fullwidth"}
  ],
  "value": ""
}
```

## JavaScript Implementation

### Extract Element Grouping Classes
```javascript
/**
 * Extract classes from element grouping fields
 * @param {HTMLElement} block - The block DOM element
 * @param {string} groupName - The group name (e.g., 'classes')
 * @returns {Object} Object containing all grouped options
 */
function extractElementGroupingClasses(block, groupName = 'classes') {
  const options = {};
  const rows = Array.from(block.children);
  
  rows.forEach((row, index) => {
    const textContent = row.textContent?.trim();
    if (!textContent) return;

    // Look for groupName_ prefixed fields
    const fieldMatch = textContent.match(new RegExp(`${groupName}_(\\w+)[^:]*:\\s*(.+)`));
    if (!fieldMatch) return;

    const [, fieldName, value] = fieldMatch;
    
    // Process different field types
    if (value.includes(',')) {
      // Multiselect - split by comma
      options[fieldName] = value.split(',').map(v => v.trim()).filter(Boolean);
    } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      // Boolean field
      options[fieldName] = value.toLowerCase() === 'true';
    } else {
      // Single select
      options[fieldName] = value;
    }
  });

  return options;
}
```

### Apply Classes to Block
```javascript
/**
 * Apply element grouping classes to block element
 * @param {HTMLElement} block - The block DOM element
 * @param {Object} options - Extracted options object
 */
function applyElementGroupingClasses(block, options) {
  Object.entries(options).forEach(([fieldName, value]) => {
    if (Array.isArray(value)) {
      // Multiselect - apply each value as a class
      value.forEach(className => {
        if (className) block.classList.add(className);
      });
    } else if (typeof value === 'boolean' && value) {
      // Boolean - apply field name as class if true
      block.classList.add(fieldName);
    } else if (typeof value === 'string' && value) {
      // Select - apply value as class
      block.classList.add(value);
    }
  });
}
```

### Complete Block Implementation
```javascript
export default function decorate(block) {
  // Extract element grouping classes
  const options = extractElementGroupingClasses(block, 'classes');
  
  // Apply classes to block
  applyElementGroupingClasses(block, options);
  
  // Continue with other block processing...
}
```

## CSS Implementation

### Base Block Styles
```css
.block.blockname {
  /* Base styles */
  margin: 2rem 0;
  padding: 2rem;
}

/* Layout options */
.block.blockname.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.block.blockname.align {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

/* Effect options */
.block.blockname.fade-in {
  animation: fadeIn 0.6s ease-in;
}

.block.blockname.slide-up {
  animation: slideUp 0.6s ease-out;
}

.block.blockname.shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.block.blockname.border {
  border: 2px solid #ccc;
}

/* Boolean options */
.block.blockname.fullwidth {
  width: 100%;
  margin: 0;
  padding: 2rem 0;
}
```

## Best Practices

1. **Consistent Naming**: Always use the same group name (e.g., `classes`) for consistency
2. **Semantic Values**: Use meaningful class names that describe the visual effect
3. **Default Values**: Provide sensible defaults for all fields
4. **Validation**: Validate field values before applying as classes
5. **Documentation**: Document all available options and their effects

## Example: Button Container Block

```json
{
  "id": "buttons",
  "fields": [
    {
      "component": "select",
      "name": "classes_layout",
      "label": "Layout",
      "valueType": "string",
      "options": [
        {"name": "Default", "value": ""},
        {"name": "Stack", "value": "stack"},
        {"name": "Align", "value": "align"}
      ],
      "value": ""
    },
    {
      "component": "multiselect",
      "name": "classes_effects",
      "label": "Effects",
      "valueType": "string",
      "options": [
        {
          "name": "Animation",
          "children": [
            {"name": "Fade In", "value": "fade-in"},
            {"name": "Slide Up", "value": "slide-up"}
          ]
        }
      ],
      "value": ""
    }
  ]
}
```

This approach provides a flexible way to create configurable blocks with multiple styling options while maintaining clean, maintainable code.
