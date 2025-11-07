# Page Properties Guide for Junior Developers

## Overview

This guide explains how to work with custom page properties in AEM Universal Editor. Page properties allow authors to configure metadata and settings that apply to entire pages, and these properties can vary based on the page template type.

## Table of Contents

1. [Understanding Page Metadata](#understanding-page-metadata)
2. [How Templates Work](#how-templates-work)
3. [Base Page Metadata Model](#base-page-metadata-model)
4. [Template-Specific Models](#template-specific-models)
5. [Conditional Fields](#conditional-fields)
6. [Field Inheritance](#field-inheritance)
7. [Adding a New Template](#adding-a-new-template)
8. [Adding Fields to Existing Templates](#adding-fields-to-existing-templates)
9. [Common Patterns](#common-patterns)
10. [Troubleshooting](#troubleshooting)

## Understanding Page Metadata

Page metadata is information about a page that is stored separately from the page content. This includes:

- **SEO Information**: Title, description, keywords
- **Social Sharing**: Open Graph tags for social media
- **Template-Specific Data**: Fields that only apply to certain page types

In AEM, page metadata is defined in the `models/_page.json` file. Each model defines what fields authors can edit in the Universal Editor.

## How Templates Work

Templates are page types that determine what content structure and properties are available. Currently, the system supports three templates:

1. **Default**: Standard pages with basic metadata
2. **Article**: Blog posts or articles with author information
3. **Events**: Event pages with organizer information

When an author selects a template, the Universal Editor shows only the relevant fields for that template type.

## Base Page Metadata Model

The `page-metadata` model is the foundation for all page types. It contains fields that are available on every page:

### Template Selector

```json
{
  "component": "select",
  "name": "template",
  "label": "Template",
  "options": [
    { "name": "Default", "value": "" },
    { "name": "Article", "value": "article" },
    { "name": "Events", "value": "events" }
  ],
  "condition": {
    "===": [
      { "var": "initialContentRefTarget" },
      "true"
    ]
  }
}
```

**Key Points:**
- The template field only appears when `initialContentRefTarget` is `true` (when creating new pages)
- The value `""` (empty string) represents the Default template
- Template values like `"article"` and `"events"` are used for conditional field display

### Common Fields

All pages have these fields:

- **Title** (`jcr:title`): The page title used in the browser tab and SEO
- **Description** (`jcr:description`): Meta description for SEO
- **Keywords** (`keywords`): Multi-value field for SEO keywords
- **Social Container**: Contains fields for social media sharing:
  - `og:title`: Open Graph title for social sharing
  - `link`: Social sharing link
  - `linkText`: Text for the social link

## Template-Specific Models

Template-specific models extend the base `page-metadata` model and add fields unique to that template type.

### Article Metadata Model

The `article-metadata` model is used for blog posts and articles:

```json
{
  "id": "article-metadata",
  "fields": [
    {
      "...": "#/models/page-metadata/fields/template"
    },
    {
      "component": "aem-tag",
      "name": "tags",
      "label": "Tags"
    },
    {
      "component": "container",
      "name": "social",
      "fields": [
        {
          "...": "#/models/page-metadata/fields/social/fields"
        },
        {
          "component": "text",
          "name": "article:author",
          "label": "Author",
          "condition": {
            "===": [
              { "var": "template" },
              "article"
            ]
          }
        }
      ]
    }
  ]
}
```

**What This Model Does:**
1. Inherits the template field from `page-metadata`
2. Adds a Tags field for categorizing articles
3. Extends the social container to include an Author field
4. The Author field only appears when the template is set to "article"

### Events Metadata Model

The `events-metadata` model is used for event pages:

```json
{
  "id": "events-metadata",
  "fields": [
    {
      "...": "#/models/page-metadata/fields/template"
    },
    {
      "component": "aem-tag",
      "name": "tags",
      "label": "Tags"
    },
    {
      "component": "text",
      "name": "events:organizer",
      "label": "Organizer",
      "condition": {
        "===": [
          { "var": "template" },
          "events"
        ]
      }
    }
  ]
}
```

**What This Model Does:**
1. Inherits the template field from `page-metadata`
2. Adds a Tags field for categorizing events
3. Adds an Organizer field that only appears when the template is "events"

## Conditional Fields

Conditional fields are fields that only appear when certain conditions are met. This is done using the `condition` property.

### Condition Syntax

```json
{
  "condition": {
    "===": [
      { "var": "template" },
      "article"
    ]
  }
}
```

**Breaking Down the Condition:**
- `"==="`: The operator (equals exactly)
- `{ "var": "template" }`: The variable to check (the template field value)
- `"article"`: The value to compare against

**Result:** The field only shows when the template is set to "article"

### Common Condition Operators

- `"==="`: Exact match (strict equality)
- `"=="`: Loose equality
- `"!=="`: Not equal (strict)
- `"!="`: Not equal (loose)
- `"and"`: All conditions must be true
- `"or"`: At least one condition must be true

### Example: Multiple Conditions

```json
{
  "condition": {
    "and": [
      {
        "===": [
          { "var": "template" },
          "article"
        ]
      },
      {
        "===": [
          { "var": "showAuthor" },
          true
        ]
      }
    ]
  }
}
```

This field only shows when the template is "article" AND `showAuthor` is `true`.

## Field Inheritance

The `"..."` syntax allows you to inherit fields from other models without duplicating code.

### Inheriting a Single Field

```json
{
  "...": "#/models/page-metadata/fields/template"
}
```

This copies the entire template field definition from `page-metadata`.

### Inheriting Multiple Fields

```json
{
  "...": "#/models/page-metadata/fields/social/fields"
}
```

This copies all fields from the social container in `page-metadata`.

**Path Structure:**
- `#/models/`: Reference to the models array
- `page-metadata`: The model ID
- `fields/`: The fields array
- `template` or `social/fields`: The specific field or nested fields

## Adding a New Template

To add a new template type (e.g., "Product"), follow these steps:

### Step 1: Add Template Option to Base Model

In `models/_page.json`, add the new option to the template selector:

```json
{
  "component": "select",
  "name": "template",
  "label": "Template",
  "options": [
    { "name": "Default", "value": "" },
    { "name": "Article", "value": "article" },
    { "name": "Events", "value": "events" },
    { "name": "Product", "value": "product" }  // Add this
  ]
}
```

### Step 2: Create Template-Specific Model

Add a new model for your template:

```json
{
  "id": "product-metadata",
  "fields": [
    {
      "...": "#/models/page-metadata/fields/template"
    },
    {
      "component": "text",
      "name": "product:sku",
      "label": "SKU",
      "condition": {
        "===": [
          { "var": "template" },
          "product"
        ]
      }
    },
    {
      "component": "text",
      "name": "product:price",
      "label": "Price",
      "condition": {
        "===": [
          { "var": "template" },
          "product"
        ]
      }
    }
  ]
}
```

### Step 3: Register the Model

The model must be included in the `models/_page.json` file's `models` array. It will automatically be available once added.

## Adding Fields to Existing Templates

To add a field to an existing template, edit the corresponding model in `models/_page.json`.

### Example: Adding Publication Date to Articles

```json
{
  "id": "article-metadata",
  "fields": [
    // ... existing fields ...
    {
      "component": "date-time",
      "name": "article:publicationDate",
      "label": "Publication Date",
      "valueType": "date",
      "condition": {
        "===": [
          { "var": "template" },
          "article"
        ]
      }
    }
  ]
}
```

## Common Patterns

### Pattern 1: Template-Specific Field Groups

Group related fields in a container:

```json
{
  "component": "container",
  "name": "articleDetails",
  "label": "Article Details",
  "fields": [
    {
      "component": "text",
      "name": "article:author",
      "label": "Author"
    },
    {
      "component": "date-time",
      "name": "article:publicationDate",
      "label": "Publication Date"
    }
  ],
  "condition": {
    "===": [
      { "var": "template" },
      "article"
    ]
  }
}
```

### Pattern 2: Shared Fields with Template Variations

Some fields appear on all templates but with different labels:

```json
{
  "component": "text",
  "name": "category",
  "label": "Category",
  "condition": {
    "or": [
      {
        "===": [
          { "var": "template" },
          "article"
        ]
      },
      {
        "===": [
          { "var": "template" },
          "events"
        ]
      }
    ]
  }
}
```

### Pattern 3: Required Fields for Specific Templates

```json
{
  "component": "text",
  "name": "events:startDate",
  "label": "Start Date",
  "required": true,
  "condition": {
    "===": [
      { "var": "template" },
      "events"
    ]
  }
}
```

## Troubleshooting

### Field Not Appearing

**Problem:** A field doesn't show up in the Universal Editor.

**Solutions:**
1. Check the condition syntax - ensure the template value matches exactly
2. Verify the model ID matches the template name pattern (`{template}-metadata`)
3. Ensure the field is inside the correct model's `fields` array
4. Check for JSON syntax errors (missing commas, brackets, etc.)

### Field Appearing on Wrong Template

**Problem:** A field shows on all templates when it should be template-specific.

**Solution:** Add a condition to the field:

```json
{
  "condition": {
    "===": [
      { "var": "template" },
      "your-template-value"
    ]
  }
}
```

### Inheritance Not Working

**Problem:** The `"..."` syntax doesn't copy fields correctly.

**Solutions:**
1. Verify the path is correct: `#/models/{model-id}/fields/{field-name}`
2. Ensure the referenced model exists
3. Check that the field name in the path matches exactly

### Template Selector Not Showing

**Problem:** The template dropdown doesn't appear.

**Solution:** The template field has a condition that only shows it when `initialContentRefTarget` is `true`. This is intentional - it only appears when creating new pages, not when editing existing ones.

## Best Practices

1. **Use Descriptive Field Names**: Prefix template-specific fields with the template name (e.g., `article:author`, `events:organizer`)

2. **Group Related Fields**: Use containers to organize related fields together

3. **Always Add Conditions**: If a field is template-specific, always add a condition to prevent it from showing on other templates

4. **Inherit Common Fields**: Use the `"..."` syntax to avoid duplicating common fields like the template selector

5. **Test All Templates**: When adding new fields, test that they appear correctly on the intended template and don't appear on others

6. **Document Custom Fields**: Add comments or descriptions to explain what custom fields are used for

## Quick Reference

### Model IDs Pattern

- Base model: `page-metadata`
- Template models: `{template-name}-metadata`
  - Example: `article-metadata`, `events-metadata`, `product-metadata`

### Common Field Components

- `text`: Single-line text input
- `richtext`: Rich text editor
- `reference`: File/asset picker
- `aem-content`: Internal content link
- `aem-tag`: Tag selector
- `select`: Dropdown menu
- `multiselect`: Multiple selection dropdown
- `date-time`: Date and time picker
- `boolean`: Checkbox
- `container`: Group of fields

### Condition Variable Names

- `template`: The selected template value
- `initialContentRefTarget`: Whether this is a new page (boolean)

## Summary

Page properties in AEM Universal Editor are organized by templates. Each template can have its own metadata model that extends the base `page-metadata` model. Use conditional fields to show template-specific fields, and use field inheritance to avoid code duplication. When adding new templates or fields, always test that they work correctly and don't interfere with existing functionality.

