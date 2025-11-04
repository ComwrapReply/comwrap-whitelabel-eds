# Developer Guide: Adding Select and Multiselect Components to Blocks

This guide provides step-by-step instructions for adding select dropdown and multiselect components to Universal Editor blocks. These components are commonly used to provide block options (variants) that authors can choose to customize the appearance or behavior of blocks.

The guide covers two approaches:
- **Single `classes` Field**: Traditional approach using one select/multiselect field named `classes`
- **Element Grouping Pattern**: Advanced approach using multiple `classes_*` fields (e.g., `classes_style`, `classes_layout`) for categorized options

## Table of Contents

1. [Overview](#overview)
2. [When to Use Select vs Multiselect](#when-to-use-select-vs-multiselect)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Configuration Examples](#configuration-examples)
6. [Element Grouping Pattern for Block Options](#element-grouping-pattern-for-block-options)
7. [Implementation Checklist](#implementation-checklist)
8. [Common Issues and Solutions](#common-issues-and-solutions)
9. [CSS Implementation](#css-implementation)
10. [Testing](#testing)

---

## Overview

### What are Select and Multiselect Components?

**Select Component**: A dropdown that allows authors to choose a single option from a list. The selected value is applied as a CSS class to the block.

**Multiselect Component**: A dropdown that allows authors to select multiple options simultaneously. Selected values are combined and applied as multiple CSS classes to the block.

### Key Concepts

- **Block Options**: Visual variants or configurations of a block that authors can choose
- **Classes Field**: A special field name (`classes`) that applies CSS classes to the block element
- **Element Grouping**: An alternative pattern using multiple `classes_*` fields (e.g., `classes_style`, `classes_layout`) for categorized options
- **Container Blocks**: Blocks that can contain child items (require both `model` and `filter` in definition)
- **Simple Blocks**: Standalone blocks (only require `model` in definition)

---

## When to Use Select vs Multiselect

### Use Select When:

- ✅ Authors should choose **one option** from a set of mutually exclusive choices
- ✅ Options are simple and straightforward
- ✅ Only one variant should be active at a time

**Examples:**
- Background color (Light/Dark/Default)
- Layout direction (Left/Right/Center)
- Size variant (Small/Medium/Large)

### Use Multiselect When:

- ✅ Authors should choose **multiple options** that can work together
- ✅ Options are grouped into categories
- ✅ Multiple variants can be active simultaneously

**Examples:**
- Layout + Style combinations (Side-by-side + Dark theme)
- Multiple effects (Shadow + Border + Animation)
- Feature toggles (Full-width + Centered + Highlighted)

---

## Prerequisites

Before adding select/multiselect components, ensure you have:

1. ✅ A block definition file (`_blockname.json`)
2. ✅ A block model defined in the models section
3. ✅ The block definition references the model (for simple blocks) or both model and filter (for container blocks)
4. ✅ Build script configured (`npm run build:json` or equivalent)

---

## Step-by-Step Guide

### Step 1: Locate Your Block Definition File

Navigate to your block directory:
```
blocks/your-block-name/_your-block-name.json
```

### Step 2: Verify Block Definition Structure

Ensure your block definition includes the `model` reference in the template:

**For Simple Blocks:**
```json
{
  "definitions": [{
    "title": "Your Block",
    "id": "your-block",
    "plugins": {
      "xwalk": {
        "page": {
          "resourceType": "core/franklin/components/block/v1/block",
          "template": {
            "name": "Your Block",
            "model": "your-block"  // ← Required for options to appear
          }
        }
      }
    }
  }]
}
```

**For Container Blocks:**
```json
{
  "definitions": [{
    "title": "Your Block",
    "id": "your-block",
    "plugins": {
      "xwalk": {
        "page": {
          "resourceType": "core/franklin/components/block/v1/block",
          "template": {
            "name": "Your Block",
            "model": "your-block",    // ← Required for container options
            "filter": "your-block"     // ← Required for child item filtering
          }
        }
      }
    }
  }]
}
```

⚠️ **Common Mistake**: Missing `model` reference means options won't appear in Universal Editor!

### Step 3: Add Select or Multiselect Field to Model

Locate the `models` section and add your field to the appropriate model:

#### For Select Component:

```json
{
  "models": [
    {
      "id": "your-block",
      "fields": [
        // ... existing fields ...
        {
          "component": "select",
          "name": "classes",
          "label": "Block Variant",
          "valueType": "string",
          "value": "",
          "options": [
            {
              "name": "Default",
              "value": ""
            },
            {
              "name": "Variant A",
              "value": "variant-a"
            },
            {
              "name": "Variant B",
              "value": "variant-b"
            }
          ]
        }
      ]
    }
  ]
}
```

#### For Multiselect Component:

```json
{
  "models": [
    {
      "id": "your-block",
      "fields": [
        // ... existing fields ...
        {
          "component": "multiselect",
          "name": "classes",
          "label": "Block Options",
          "valueType": "string",
          "value": "",
          "options": [
            {
              "name": "Layout",
              "children": [
                { "name": "Default", "value": "" },
                { "name": "Side by Side", "value": "side-by-side" },
                { "name": "Stacked", "value": "stacked" }
              ]
            },
            {
              "name": "Style",
              "children": [
                { "name": "Light Theme", "value": "light" },
                { "name": "Dark Theme", "value": "dark" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Step 4: Field Configuration Details

#### Required Properties:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `component` | string | Component type | `"select"` or `"multiselect"` |
| `name` | string | Must be `"classes"` for block options | `"classes"` |
| `label` | string | Display name in editor | `"Block Variant"` |
| `valueType` | string | Data type | `"string"` |
| `value` | string | Default value | `""` (empty string) |
| `options` | array | Available options | See examples below |

#### Select Options Structure:

```json
{
  "name": "Display Name",    // What authors see
  "value": "css-class"       // CSS class applied to block
}
```

#### Multiselect Options Structure:

```json
{
  "name": "Category Name",   // Category/group name
  "children": [               // Options in this category
    { "name": "Option 1", "value": "class-1" },
    { "name": "Option 2", "value": "class-2" }
  ]
}
```

### Step 5: Build Component Definitions

After making changes, rebuild the component definitions:

```bash
npm run build:json
```

This merges all `_*.json` files from the `blocks/` directory and generates:
- `component-definition.json`
- `component-models.json`
- `component-filters.json`

### Step 6: Test in Universal Editor

1. Open Universal Editor for your site
2. Add or select your block
3. Check the Properties panel - your select/multiselect should appear
4. Select an option and verify the CSS class is applied to the block element

---

## Configuration Examples

### Example 1: Simple Select - Background Color

**Use Case**: Allow authors to choose a background color variant.

```json
{
  "component": "select",
  "name": "classes",
  "label": "Background Color",
  "valueType": "string",
  "value": "",
  "options": [
    {
      "name": "Default",
      "value": ""
    },
    {
      "name": "Light",
      "value": "light"
    },
    {
      "name": "Dark",
      "value": "dark"
    },
    {
      "name": "Highlighted",
      "value": "highlighted"
    }
  ]
}
```

**Result**: Block receives class `light`, `dark`, or `highlighted` based on selection.

### Example 2: Select with Multiple Classes

**Use Case**: Allow authors to choose a combination that maps to multiple CSS classes.

```json
{
  "component": "select",
  "name": "classes",
  "label": "Layout Style",
  "valueType": "string",
  "value": "",
  "options": [
    {
      "name": "Default",
      "value": ""
    },
    {
      "name": "Blue Right Layout",
      "value": "blue right-to-left"
    },
    {
      "name": "Grey Left Layout",
      "value": "grey left-to-right"
    }
  ]
}
```

**Result**: Block receives space-separated classes like `blue right-to-left`.

### Example 3: Multiselect with Categories

**Use Case**: Allow authors to combine multiple independent options.

```json
{
  "component": "multiselect",
  "name": "classes",
  "label": "Block Options",
  "valueType": "string",
  "value": "",
  "options": [
    {
      "name": "Layout",
      "children": [
        { "name": "Default", "value": "" },
        { "name": "Centered", "value": "centered" },
        { "name": "Full Width", "value": "full-width" }
      ]
    },
    {
      "name": "Style",
      "children": [
        { "name": "Light", "value": "light" },
        { "name": "Dark", "value": "dark" },
        { "name": "Highlighted", "value": "highlighted" }
      ]
    },
    {
      "name": "Effects",
      "children": [
        { "name": "Shadow", "value": "shadow" },
        { "name": "Border", "value": "border" },
        { "name": "Rounded", "value": "rounded" }
      ]
    }
  ]
}
```

**Result**: Block can receive multiple classes like `centered dark shadow` when multiple options are selected.

### Example 4: Select with Descriptions (Optional)

**Use Case**: Provide helpful descriptions for each option.

```json
{
  "component": "select",
  "name": "classes",
  "label": "Background Styles",
  "description": "Choose the background style for this block",
  "valueType": "string",
  "value": "",
  "options": [
    {
      "name": "Default",
      "value": "",
      "description": "The default background style"
    },
    {
      "name": "Highlight",
      "value": "highlight",
      "description": "Use highlighted background to draw attention"
    },
    {
      "name": "Dark",
      "value": "dark",
      "description": "Dark background for content areas"
    }
  ]
}
```

---

## Element Grouping Pattern for Block Options

### Overview

The **Element Grouping Pattern** allows you to provide multiple independent select/multiselect fields for block options instead of using a single `classes` field. This approach is particularly useful when:

- ✅ You have many options that are logically grouped (e.g., Style, Layout, Effects)
- ✅ Authors need to select from multiple independent categories
- ✅ Some options are mutually exclusive within categories but can combine across categories
- ✅ You want a cleaner authoring experience with separate dropdowns

### When to Use Element Grouping vs Single `classes` Field

**Use Single `classes` Field When:**
- You have a small number of mutually exclusive options
- Options are simple and don't need categorization
- Authors select one variant from a list

**Use Element Grouping Pattern When:**
- You have multiple option categories (Style, Layout, Animation, etc.)
- Authors need to select from different categories independently
- You want to provide better UX with separate configuration fields

### Element Grouping Field Naming Convention

Use the pattern: `classes_{category}` where `{category}` describes the option group:

```json
{
  "component": "select",
  "name": "classes_style",      // ← Element grouping pattern
  "label": "Card Style",
  "valueType": "string",
  "value": "",
  "options": [
    {"name": "Default", "value": ""},
    {"name": "Blue", "value": "blue"},
    {"name": "Dark", "value": "dark"}
  ]
}
```

### Complete Element Grouping Example

**Use Case**: Facts Figures Cards block with Style, Layout, and Animation options.

```json
{
  "models": [
    {
      "id": "facts-figures-cards",
      "fields": [
        {
          "component": "select",
          "name": "classes_style",
          "label": "Card Style",
          "description": "The background style for all cards",
          "valueType": "string",
          "value": "",
          "options": [
            {"name": "Default", "value": ""},
            {"name": "Blue", "value": "blue"},
            {"name": "Grey", "value": "grey"},
            {"name": "Dark", "value": "dark"}
          ]
        },
        {
          "component": "select",
          "name": "classes_layout",
          "label": "Card Layout",
          "description": "The layout style for all cards",
          "valueType": "string",
          "value": "",
          "options": [
            {"name": "Default", "value": ""},
            {"name": "Compact", "value": "compact"},
            {"name": "Spacious", "value": "spacious"},
            {"name": "Centered", "value": "centered"}
          ]
        },
        {
          "component": "select",
          "name": "classes_animation",
          "label": "Animation Style",
          "description": "The animation style for all cards",
          "valueType": "string",
          "value": "",
          "options": [
            {"name": "Default", "value": ""},
            {"name": "Fade In", "value": "fade-in"},
            {"name": "Slide Up", "value": "slide-up"}
          ]
        }
      ]
    }
  ]
}
```

**Result**: Block can receive multiple classes like `blue compact fade-in` when authors select options from different categories.

### How Universal Editor Renders Element Grouping Fields

Universal Editor renders each `classes_*` field as a separate row in the block's table structure:

```html
<div class="block facts-figures-cards">
  <div data-head="classes_style">blue</div>
  <div data-head="classes_layout">compact</div>
  <div data-head="classes_animation">fade-in</div>
  <!-- ... card content ... -->
</div>
```

### JavaScript Implementation: Extracting Element Grouping Classes

You need to extract classes from these fields and apply them to the block. Here's the recommended approach:

#### Method 1: Using `data-head` Attributes (Recommended)

```javascript
/**
 * Extract classes from element grouping fields using data-head attributes
 * @param {HTMLElement} block - The block DOM element
 * @param {string[]} fieldNames - Array of field names to extract (e.g., ['classes_style', 'classes_layout'])
 * @returns {string[]} Array of CSS class names to apply
 */
function extractElementGroupingClasses(block, fieldNames) {
  const classesToApply = [];
  const cells = Array.from(block.children).filter((el) => el.tagName === 'DIV');

  cells.forEach((cell) => {
    const head = (cell.getAttribute('data-head') || '').trim();
    const value = (cell.textContent || '').trim();

    // Check if this cell contains one of our element grouping fields
    if (fieldNames.includes(head) && value) {
      // Split by comma/space for multiselect values, otherwise use value directly
      const classTokens = value
        .split(/[,\s]+/)
        .map((token) => token.trim())
        .filter(Boolean)
        .filter((token) => /^[a-z0-9\-_]+$/.test(token)); // Sanitize CSS class names

      classesToApply.push(...classTokens);
    }
  });

  return [...new Set(classesToApply)]; // Remove duplicates
}

/**
 * Apply element grouping classes to block element
 * @param {HTMLElement} block - The block DOM element
 * @param {string[]} classNames - Array of CSS class names to apply
 */
function applyElementGroupingClasses(block, classNames) {
  classNames.forEach((className) => {
    if (className) {
      block.classList.add(className);
    }
  });
}
```

#### Method 2: Regex Fallback (For Legacy Content)

```javascript
/**
 * Extract classes using regex patterns (fallback for older content)
 * @param {HTMLElement} element - The element to extract classes from
 * @param {Object} patterns - Regex patterns for each field type
 * @returns {string[]} Array of class names to apply
 */
function extractElementGroupingClassesRegex(element, patterns) {
  const classesToApply = [];
  const textContent = element.textContent || '';

  Object.entries(patterns).forEach(([fieldName, pattern]) => {
    const match = textContent.match(pattern);
    if (match && match[1] && match[1] !== 'default' && match[1].trim()) {
      classesToApply.push(match[1].trim());
    }
  });

  return classesToApply;
}

// Example patterns object
const ELEMENT_GROUPING_PATTERNS = {
  style: /classes_style[^:]*:\s*(\w+)/,
  layout: /classes_layout[^:]*:\s*(\w+)/,
  animation: /classes_animation[^:]*:\s*(\w+)/,
};
```

#### Complete Block Implementation Example

```javascript
/**
 * Block decoration with element grouping support
 * @param {HTMLElement} block - The block DOM element
 */
export default function decorate(block) {
  // Define which element grouping fields to extract
  const ELEMENT_GROUPING_FIELDS = [
    'classes_style',
    'classes_layout',
    'classes_animation',
  ];

  // Extract classes from element grouping fields (preferred method)
  const classesToApply = extractElementGroupingClasses(block, ELEMENT_GROUPING_FIELDS);

  // Apply classes to block
  if (classesToApply.length > 0) {
    applyElementGroupingClasses(block, classesToApply);
  }

  // Continue with other block decoration...
  // Process card items, add semantic classes, etc.
}
```

### Container Blocks with Element Grouping

For container blocks (blocks with child items), you can apply element grouping at both container and item levels:

**Container-Level Options** (apply to all child items):
```json
{
  "id": "facts-figures-cards",
  "fields": [
    {
      "component": "select",
      "name": "classes_style",
      "label": "Card Style",
      "description": "Applies to all cards in this container"
    }
  ]
}
```

**Item-Level Options** (apply to individual items):
```json
{
  "id": "facts-figures-card",
  "fields": [
    {
      "component": "select",
      "name": "classes_style",
      "label": "Card Style",
      "description": "Individual card style override"
    },
    {
      "component": "select",
      "name": "classes_size",
      "label": "Card Size",
      "description": "Individual card size"
    }
  ]
}
```

**JavaScript Implementation for Container Blocks**:

```javascript
/**
 * Apply container-level classes to all child items
 * @param {HTMLElement} container - The container block element
 * @param {HTMLElement[]} items - Array of child item elements
 */
function applyContainerStyleClasses(container, items) {
  const CONTAINER_FIELDS = ['classes_style', 'classes_layout', 'classes_animation'];
  const classesToApply = extractElementGroupingClasses(container, CONTAINER_FIELDS);

  if (classesToApply.length > 0) {
    items.forEach((item) => {
      classesToApply.forEach((className) => {
        item.classList.add(className);
      });
    });
  }
}

/**
 * Process individual item with element grouping classes
 * @param {HTMLElement} item - Individual item element
 */
function processItem(item) {
  const ITEM_FIELDS = ['classes_style', 'classes_size', 'classes_emphasis'];
  const classesToApply = extractElementGroupingClasses(item, ITEM_FIELDS);

  if (classesToApply.length > 0) {
    classesToApply.forEach((className) => {
      item.classList.add(className);
    });
  }

  // Continue processing item content...
}
```

### CSS Implementation for Element Grouping

Write CSS that handles multiple independent classes:

```css
/* Base block styles */
.block.facts-figures-cards {
  /* Default styles */
}

/* Style variants (from classes_style) */
.block.facts-figures-cards .facts-figures-card.blue {
  background: linear-gradient(135deg, var(--link-color) 0%, var(--link-hover-color) 100%);
  color: var(--background-color);
}

.block.facts-figures-cards .facts-figures-card.dark {
  background-color: var(--dark-color);
  color: var(--background-color);
}

/* Layout variants (from classes_layout) */
.block.facts-figures-cards .facts-figures-card.compact {
  padding: 1rem;
}

.block.facts-figures-cards .facts-figures-card.spacious {
  padding: 2.5rem;
}

.block.facts-figures-cards .facts-figures-card.centered {
  text-align: center;
}

/* Animation variants (from classes_animation) */
.block.facts-figures-cards .facts-figures-card.fade-in {
  animation: fade-in 0.6s ease-in-out;
}

.block.facts-figures-cards .facts-figures-card.slide-up {
  animation: slide-up 0.6s ease-out;
}

/* Combined classes (all three categories) */
.block.facts-figures-cards .facts-figures-card.blue.compact.fade-in {
  /* Styles for blue + compact + fade-in combination */
}
```

### Advantages of Element Grouping Pattern

1. **Better UX**: Authors see separate fields for each category, making configuration clearer
2. **Flexible Combinations**: Authors can mix options from different categories (e.g., Blue + Compact + Fade-in)
3. **Maintainable**: Easy to add new categories without modifying existing fields
4. **Intuitive**: Field names like `classes_style` clearly indicate what they control
5. **Scalable**: Can handle many options across multiple categories without overwhelming authors

### Limitations and Considerations

1. **More JavaScript**: Requires custom extraction logic (though reusable)
2. **Multiple Classes**: Results in multiple CSS classes that need proper styling
3. **Testing**: Need to test combinations of all categories
4. **Documentation**: Must document which classes come from which fields

### Migration from Single `classes` Field

If you have an existing block using a single `classes` field and want to migrate to element grouping:

1. **Add New Fields**: Add `classes_*` fields alongside existing `classes` field
2. **Support Both**: Extract from both patterns in JavaScript
3. **Gradual Migration**: Existing content continues to work
4. **Remove Old Field**: Once all content is migrated, remove the old `classes` field

```javascript
// Support both patterns during migration
const classesFromSingleField = block.classList.contains('classes') 
  ? extractFromSingleField(block) 
  : [];

const classesFromElementGrouping = extractElementGroupingClasses(
  block, 
  ['classes_style', 'classes_layout']
);

const allClasses = [...classesFromSingleField, ...classesFromElementGrouping];
applyElementGroupingClasses(block, allClasses);
```

### Real-World Example: Facts Figures Cards

See `blocks/facts-figures-cards/_facts-figures-cards.json` and `blocks/facts-figures-cards/facts-figures-cards.js` for a complete implementation.

**Key Points from the Implementation**:
- Container-level element grouping: `classes_style`, `classes_layout`, `classes_animation`
- Item-level element grouping: `classes_style`, `classes_size`, `classes_emphasis`
- Uses `data-head` attribute extraction with regex fallback
- Applies container classes to all child items
- Handles both container and item-level classes

---

## Implementation Checklist

Use this checklist to ensure you've completed all steps:

- [ ] **Block Definition** - Block definition file exists at `blocks/your-block/_your-block.json`
- [ ] **Model Reference** - Block definition template includes `"model": "your-block"`
- [ ] **Field Added** - Select or multiselect field added to the model's `fields` array
- [ ] **Field Name** - Field name is exactly `"classes"` (for block options)
- [ ] **Component Type** - `component` is `"select"` or `"multiselect"`
- [ ] **Options Defined** - At least one option in the `options` array
- [ ] **Default Value** - Default `value` is empty string `""`
- [ ] **Value Types** - Option values are valid CSS class names (kebab-case recommended)
- [ ] **Built Definitions** - Ran `npm run build:json` after changes
- [ ] **Tested in Editor** - Verified option appears in Universal Editor
- [ ] **CSS Classes Applied** - Verified classes are applied to block element
- [ ] **CSS Styling** - Added corresponding CSS styles for each class
- [ ] **Documentation** - Updated README with new options

---

## Common Issues and Solutions

### Issue 1: Option Not Appearing in Universal Editor

**Symptoms**: Select/multiselect field doesn't show in Properties panel.

**Possible Causes & Solutions**:

1. **Missing Model Reference**
   ```json
   // ❌ WRONG - Missing model
   "template": {
     "name": "Carousel",
     "filter": "carousel"
   }
   
   // ✅ CORRECT - Has model
   "template": {
     "name": "Carousel",
     "model": "carousel",
     "filter": "carousel"
   }
   ```

2. **Field Name Incorrect**
   ```json
   // ❌ WRONG - Wrong field name
   "name": "variants"
   
   // ✅ CORRECT - Must be "classes" for block options
   "name": "classes"
   ```

3. **Build Not Run**
   - Solution: Run `npm run build:json` to regenerate definitions

4. **Model ID Mismatch**
   ```json
   // ❌ WRONG - ID doesn't match
   "id": "carousel",
   "template": { "model": "carousel-block" }
   
   // ✅ CORRECT - IDs match
   "id": "carousel",
   "template": { "model": "carousel" }
   ```

### Issue 2: Classes Not Applied to Block

**Symptoms**: Selected option doesn't add CSS class to block element.

**Possible Causes & Solutions**:

1. **Wrong Field Name**
   - Only `"classes"` field name applies classes to block
   - Other field names create data attributes, not classes

2. **Build Cache**
   - Solution: Clear browser cache and rebuild definitions

3. **JavaScript Override**
   - Check if JavaScript is removing classes
   - Ensure `decorate()` function preserves block classes

### Issue 3: Invalid JSON Syntax

**Symptoms**: Build fails or editor shows errors.

**Possible Causes & Solutions**:

1. **Missing Commas**
   ```json
   // ❌ WRONG
   {
     "name": "Option 1"
     "value": "option-1"  // Missing comma
   }
   
   // ✅ CORRECT
   {
     "name": "Option 1",
     "value": "option-1"
   }
   ```

2. **Trailing Commas**
   ```json
   // ❌ WRONG
   {
     "name": "Option 1",
     "value": "option-1",  // Trailing comma
   }
   
   // ✅ CORRECT
   {
     "name": "Option 1",
     "value": "option-1"
   }
   ```

3. **Invalid Option Values**
   - Use kebab-case: `"value": "dark-theme"`
   - Avoid spaces unless intentional: `"value": "dark theme"` (applies two classes)

### Issue 4: Multiselect Not Working

**Symptoms**: Multiselect appears but selections don't persist.

**Possible Causes & Solutions**:

1. **Wrong Structure**
   ```json
   // ❌ WRONG - Flat array
   "options": [
     { "name": "Option 1", "value": "opt1" },
     { "name": "Option 2", "value": "opt2" }
   ]
   
   // ✅ CORRECT - Grouped with children
   "options": [
     {
       "name": "Category",
       "children": [
         { "name": "Option 1", "value": "opt1" },
         { "name": "Option 2", "value": "opt2" }
       ]
     }
   ]
   ```

2. **Missing Default Value**
   - Always set `"value": ""` for multiselect

---

## CSS Implementation

After adding select/multiselect options, implement corresponding CSS styles.

### Basic Pattern

```css
/* Default state (no class) */
.block.your-block {
  /* Default styles */
}

/* Select option - single class */
.block.your-block.dark {
  background-color: #333;
  color: white;
}

/* Multiselect option - multiple classes */
.block.your-block.light.highlighted {
  background-color: #f0f0f0;
  border: 2px solid #0063be;
}

/* Combined options */
.block.your-block.centered.dark {
  text-align: center;
  background-color: #333;
  color: white;
}
```

### Using CSS Custom Properties (Theme Variables)

```css
/* Default */
.block.your-block {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Dark variant */
.block.your-block.dark {
  background-color: var(--dark-color);
  color: var(--background-color);
}

/* Light variant */
.block.your-block.light {
  background-color: var(--light-color);
  color: var(--dark-color);
}
```

### Responsive Considerations

```css
.block.your-block.full-width {
  width: 100%;
  margin: 0;
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .block.your-block.full-width {
    padding: 1rem 0;
  }
}
```

### Example: Complete CSS for Select Options

```css
/* blocks/your-block/your-block.css */

/* Base block styles */
.block.your-block {
  padding: 2rem;
  margin: 2rem 0;
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Light variant */
.block.your-block.light {
  background-color: var(--light-color);
  border: 1px solid var(--light-color);
}

/* Dark variant */
.block.your-block.dark {
  background-color: var(--dark-color);
  color: var(--background-color);
}

/* Highlighted variant */
.block.your-block.highlighted {
  background: linear-gradient(135deg, 
    var(--light-color) 0%, 
    var(--background-color) 100%);
  border-left: 4px solid var(--link-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Combined classes (for multiselect) */
.block.your-block.centered.dark {
  text-align: center;
  background-color: var(--dark-color);
  color: var(--background-color);
}
```

---

## Testing

### Manual Testing Checklist

1. **Universal Editor Testing**
   - [ ] Option appears in Properties panel
   - [ ] Options are clearly labeled
   - [ ] Default option is selected initially
   - [ ] Can select different options
   - [ ] Selected value persists after save
   - [ ] Can change selection multiple times

2. **Visual Testing**
   - [ ] CSS classes are applied to block element
   - [ ] Styles render correctly for each option
   - [ ] Combined options (multiselect) work correctly
   - [ ] No conflicting styles
   - [ ] Responsive behavior is correct

3. **Functional Testing**
   - [ ] Default state works without selected option
   - [ ] Switching options updates styles immediately
   - [ ] Multiple selections (multiselect) combine correctly
   - [ ] Options work with block variations

4. **Browser Testing**
   - [ ] Works in Chrome
   - [ ] Works in Firefox
   - [ ] Works in Safari
   - [ ] Works in Edge
   - [ ] Mobile browsers

### Test Scenarios

#### Scenario 1: Simple Select
1. Add block to page
2. Open Properties panel
3. Select "Dark" option
4. Verify block receives `dark` class
5. Verify dark styles are applied

#### Scenario 2: Multiselect with Categories
1. Add block to page
2. Open Properties panel
3. Select "Centered" from Layout
4. Select "Dark" from Style
5. Verify block receives both `centered dark` classes
6. Verify combined styles render correctly

#### Scenario 3: Changing Selections
1. Select an option
2. Change to different option
3. Verify previous class is removed
4. Verify new class is applied
5. Verify styles update correctly

---

## Real-World Examples

### Example: Carousel Block

See `blocks/carousel/_carousel.json` for a working example:

```json
{
  "definitions": [{
    "title": "Carousel",
    "id": "carousel",
    "plugins": {
      "xwalk": {
        "page": {
          "resourceType": "core/franklin/components/block/v1/block",
          "template": {
            "name": "Carousel",
            "model": "carousel",
            "filter": "carousel"
          }
        }
      }
    }
  }],
  "models": [{
    "id": "carousel",
    "fields": [{
      "component": "select",
      "name": "classes",
      "label": "Carousel background color",
      "valueType": "string",
      "value": "",
      "options": [
        { "name": "Default", "value": "" },
        { "name": "Dark", "value": "dark" }
      ]
    }]
  }]
}
```

### Example: Quote Block

See `blocks/quote/_quote.json` for a select with descriptions:

```json
{
  "component": "select",
  "name": "classes",
  "value": "",
  "label": "Background Styles",
  "description": "The background styles of the quote",
  "valueType": "string",
  "options": [
    {
      "name": "Default",
      "value": "",
      "description": "The default background style"
    },
    {
      "name": "Highlight",
      "value": "highlight",
      "description": "The highlight background style"
    },
    {
      "name": "Dark",
      "value": "dark",
      "description": "The dark background style"
    }
  ]
}
```

---

## Best Practices

### Naming Conventions

1. **CSS Class Values**: Use kebab-case
   - ✅ `"value": "dark-theme"`
   - ❌ `"value": "darkTheme"` or `"value": "dark_theme"`

2. **Option Names**: Use Title Case for display
   - ✅ `"name": "Dark Theme"`
   - ❌ `"name": "dark theme"` or `"name": "darkTheme"`

3. **Labels**: Be descriptive but concise
   - ✅ `"label": "Background Color"`
   - ❌ `"label": "Color"` or `"label": "Choose the background color variant"`

### Field Configuration

1. **Always Set Default Value**: Use `"value": ""` for empty default
2. **Provide Descriptions**: Help authors understand options
3. **Group Related Options**: Use multiselect categories for organization
4. **Limit Options**: Keep lists manageable (5-7 options for select, 2-3 categories for multiselect)

### CSS Best Practices

1. **Use Theme Variables**: Leverage CSS custom properties for consistency
2. **Scope Selectors**: Always scope to `.block.blockname`
3. **Mobile-First**: Design responsive styles
4. **Test Combinations**: Ensure multiselect combinations work well together

### Documentation

1. **Update README**: Document new options in block README
2. **Include Examples**: Show authors how to use options
3. **Add Screenshots**: Visual guides help authors understand

---

## Additional Resources

- [Universal Editor Block Development Guide](../../../.cursor/rules/ai-agent-block-development-guide.mdc)
- [Component Model Definitions Documentation](../../../.cursor/rules/component-model-definitions.mdc)
- [Block Definition Guide](../../../.cursor/rules/block-definition.mdc)

---

## Quick Reference

### Select Component Template

```json
{
  "component": "select",
  "name": "classes",
  "label": "Your Label",
  "valueType": "string",
  "value": "",
  "options": [
    { "name": "Default", "value": "" },
    { "name": "Option 1", "value": "option-1" }
  ]
}
```

### Multiselect Component Template

```json
{
  "component": "multiselect",
  "name": "classes",
  "label": "Your Label",
  "valueType": "string",
  "value": "",
  "options": [
    {
      "name": "Category",
      "children": [
        { "name": "Option 1", "value": "option-1" }
      ]
    }
  ]
}
```

### Element Grouping Template

```json
{
  "component": "select",
  "name": "classes_style",      // ← Use classes_{category} pattern
  "label": "Style",
  "description": "Optional description",
  "valueType": "string",
  "value": "",
  "options": [
    { "name": "Default", "value": "" },
    { "name": "Option 1", "value": "option-1" }
  ]
}
```

**Multiple Element Grouping Fields**:
```json
{
  "fields": [
    {
      "component": "select",
      "name": "classes_style",
      "label": "Style",
      "valueType": "string",
      "value": "",
      "options": [
        { "name": "Default", "value": "" },
        { "name": "Dark", "value": "dark" }
      ]
    },
    {
      "component": "select",
      "name": "classes_layout",
      "label": "Layout",
      "valueType": "string",
      "value": "",
      "options": [
        { "name": "Default", "value": "" },
        { "name": "Centered", "value": "centered" }
      ]
    }
  ]
}
```

### Required Block Definition Template

```json
{
  "template": {
    "name": "Block Name",
    "model": "block-name",     // ← Required!
    "filter": "block-name"      // ← Only for container blocks
  }
}
```

---

## Support and Troubleshooting

If you encounter issues not covered in this guide:

1. Check the console for JavaScript errors
2. Verify JSON syntax is valid
3. Ensure build script completed successfully
4. Review similar working blocks in the codebase
5. Check Universal Editor documentation

---

**Last Updated**: 2024
**Maintained By**: Development Team

