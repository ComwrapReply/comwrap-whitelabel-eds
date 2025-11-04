# Template Creation Guide for Universal Editor and Edge Delivery Services

This guide will walk you through creating custom templates with template-specific page properties for Adobe Universal Editor and Edge Delivery Services (EDS).

## Table of Contents

1. [Overview](#overview)
2. [Understanding the Structure](#understanding-the-structure)
3. [Step-by-Step Guide](#step-by-step-guide)
4. [Example: Creating a Blog Post Template](#example-creating-a-blog-post-template)
5. [Testing Your Template](#testing-your-template)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Overview

### What is a Template?

In AEM Edge Delivery Services, templates define:
- **Component Templates**: Structure and properties for individual components/blocks
- **Page Templates**: Page-level structure and metadata that controls page properties in Universal Editor

### What are Template-Specific Page Properties?

Template-specific page properties allow you to:
- Create custom page metadata models that only appear for specific page types
- Add fields that are unique to certain templates (e.g., blog posts, product pages)
- Control which properties editors can see and edit based on the page template

### Key Concepts

- **Model**: Defines the structure and fields available in Universal Editor
- **Page Metadata**: Global properties available on all pages (defined in `models/_page-metadata.json`)
- **Template-Specific Metadata**: Custom properties that only appear for specific templates

## Understanding the Structure

### Key Files

1. **`models/_page-metadata.json`**: Global page metadata (applies to all pages)
2. **`models/_component-models.json`**: Registry of all component models
3. **`component-models.json`**: Compiled list of all models (auto-generated)
4. **`component-definition.json`**: Component definitions for Universal Editor

### File Organization

```
models/
├── _page-metadata.json          # Global page properties
├── _component-models.json        # Model registry
├── _blog-post-metadata.json     # Template-specific metadata (you'll create this)
└── partials/                     # Reusable field definitions
    └── _article-types.json
```

## Step-by-Step Guide

### Step 1: Create Your Template-Specific Page Metadata Model

Create a new file in the `models/` directory:

**File**: `models/_blog-post-metadata.json`

```json
{
  "definitions": [],
  "models": [
    {
      "id": "blog-post-metadata",
      "fields": [
        {
          "component": "text",
          "valueType": "string",
          "name": "article-title",
          "label": "Article Title",
          "description": "Main title of the blog post"
        },
        {
          "component": "text",
          "valueType": "string",
          "name": "article-description",
          "label": "Article Description",
          "description": "SEO meta description",
          "multi": true
        },
        {
          "component": "text",
          "valueType": "string",
          "name": "author-email",
          "label": "Author Email",
          "description": "Email of the article author"
        },
        {
          "component": "date-time",
          "valueType": "date-time",
          "name": "article-publish-date",
          "label": "Publish Date",
          "placeholder": "YYYY-MM-DD",
          "displayFormat": null,
          "valueFormat": null
        },
        {
          "component": "aem-tag",
          "valueType": "string",
          "name": "cq:tags",
          "label": "Tags",
          "description": "Tags for categorizing the article"
        },
        {
          "component": "text",
          "valueType": "number",
          "name": "reading-time",
          "label": "Estimated Reading Time (minutes)",
          "description": "Estimated time to read the article"
        },
        {
          "component": "reference",
          "valueType": "string",
          "name": "featured-image",
          "label": "Featured Image",
          "description": "Main image for the blog post",
          "multi": false
        },
        {
          "component": "boolean",
          "valueType": "boolean",
          "name": "enable-comments",
          "label": "Enable Comments",
          "description": "Allow readers to comment on this post"
        },
        {
          "component": "select",
          "valueType": "string",
          "name": "blog-category",
          "label": "Blog Category",
          "options": [
            {
              "name": "Technology",
              "value": "technology"
            },
            {
              "name": "Business",
              "value": "business"
            },
            {
              "name": "Product Updates",
              "value": "product-updates"
            }
          ]
        }
      ]
    }
  ]
}
```

### Step 2: Register Your Model

Add your new model to the `models/_component-models.json` file:

**File**: `models/_component-models.json`

```json
[
  {
    "...": "./_page-metadata.json#/models"
  },
  {
    "...": "./_blog-post-metadata.json#/models"
  },
  {
    "...": "./_image.json#/models"
  },
  // ... rest of your models
]
```

**Important**: Add your new model reference after the page-metadata entry but before other component models.

### Step 3: Create a Page Template Definition (Optional)

If you want to create a page-level template (not just component-level), you can define it in your page structure. However, for page properties in Universal Editor, the model registration is usually sufficient.

For component templates, you would create a definition in `component-definition.json` or in a block's JSON file.

### Step 4: Use the Model in Your Pages

To use template-specific page properties:

1. **In AEM**: When creating a page, select the template that uses your custom metadata model
2. **In Universal Editor**: The page properties panel will show your custom fields when editing pages that use this template

### Step 5: Build the Project

After making changes, you need to rebuild the component models:

```bash
npm run build
```

Or if you're using the AEM CLI:

```bash
aem up
```

## Example: Creating a Blog Post Template

Let's create a complete example for a blog post template with template-specific properties.

### Example 1: Simple Blog Post Metadata

**File**: `models/_blog-post-metadata.json`

```json
{
  "definitions": [],
  "models": [
    {
      "id": "blog-post-metadata",
      "fields": [
        {
          "component": "text",
          "valueType": "string",
          "name": "article-title",
          "label": "Article Title"
        },
        {
          "component": "text",
          "valueType": "string",
          "name": "article-description",
          "label": "Article Description",
          "multi": true
        },
        {
          "component": "text",
          "valueType": "string",
          "name": "author-email",
          "label": "Author Email"
        },
        {
          "component": "date-time",
          "valueType": "date-time",
          "name": "article-publish-date",
          "label": "Publish Date",
          "placeholder": "YYYY-MM-DD"
        },
        {
          "component": "text",
          "valueType": "number",
          "name": "reading-time",
          "label": "Reading Time (minutes)"
        },
        {
          "component": "reference",
          "valueType": "string",
          "name": "featured-image",
          "label": "Featured Image",
          "multi": false
        },
        {
          "component": "boolean",
          "valueType": "boolean",
          "name": "enable-comments",
          "label": "Enable Comments"
        }
      ]
    }
  ]
}
```

### Example 2: Extending Existing Metadata

If you want to extend the existing page-metadata instead of creating a completely new one, you can use references:

```json
{
  "definitions": [],
  "models": [
    {
      "id": "blog-post-metadata",
      "fields": [
        {
          "...": "./_page-metadata.json#/models/0/fields"
        },
        {
          "component": "text",
          "valueType": "number",
          "name": "reading-time",
          "label": "Reading Time (minutes)"
        },
        {
          "component": "reference",
          "valueType": "string",
          "name": "featured-image",
          "label": "Featured Image",
          "multi": false
        }
      ]
    }
  ]
}
```

This includes all fields from `_page-metadata.json` plus your custom fields.

## Testing Your Template

### Step 1: Verify File Structure

Ensure your files are in the correct location:
- `models/_blog-post-metadata.json` exists
- `models/_component-models.json` includes your model reference

### Step 2: Build the Project

```bash
npm run build
```

Check for any build errors in the console.

### Step 3: Test in Universal Editor

1. Open your AEM instance
2. Navigate to a page that should use your template
3. Open Universal Editor
4. Click on the page (not a component) to see page properties
5. Verify that your custom fields appear in the properties panel

### Step 4: Validate JSON Structure

Ensure your JSON is valid:
- Use a JSON validator
- Check for missing commas, brackets, or quotes
- Verify component types match available options

### Step 5: Check Model Registration

Verify your model is included in `component-models.json` (this file is auto-generated but you can check if your model appears there).

## Troubleshooting

### Issue: Fields Don't Appear in Universal Editor

**Possible Causes:**
1. Model not registered in `_component-models.json`
2. Build not completed
3. Wrong page template selected
4. JSON syntax errors

**Solutions:**
- Check `models/_component-models.json` includes your model
- Run `npm run build` again
- Verify the page is using the correct template
- Validate your JSON syntax

### Issue: Build Errors

**Common Errors:**
- JSON syntax errors (missing commas, brackets)
- Invalid component types
- Missing required fields

**Solutions:**
- Use a JSON validator
- Check component types match available options (text, select, boolean, etc.)
- Ensure all required fields are present

### Issue: Model Not Found

**Possible Causes:**
- File path is incorrect
- File name doesn't match reference
- Model ID doesn't match

**Solutions:**
- Verify file path: `models/_blog-post-metadata.json`
- Check reference in `_component-models.json`: `"./blog-post-metadata.json#/models"`
- Ensure model ID matches: `"id": "blog-post-metadata"`

### Issue: Fields Appear But Don't Save

**Possible Causes:**
- Field names conflict with existing fields
- Missing valueType
- Incorrect component type

**Solutions:**
- Use unique field names
- Ensure valueType matches component type
- Verify component type is correct for the field

## Best Practices

### 1. Naming Conventions

- **Model IDs**: Use kebab-case (e.g., `blog-post-metadata`)
- **Field Names**: Use kebab-case (e.g., `reading-time`)
- **File Names**: Prefix with underscore (e.g., `_blog-post-metadata.json`)

### 2. Field Organization

- Group related fields together
- Use descriptive labels
- Add descriptions for clarity
- Set appropriate default values

### 3. Reusability

- Use partials for common field definitions
- Reference existing models when possible
- Create reusable field groups

### 4. Component Types

Common component types available:
- `text`: Single-line text input
- `richtext`: Rich text editor
- `select`: Dropdown selection
- `multiselect`: Multiple selection
- `boolean`: Checkbox
- `date-time`: Date picker
- `reference`: Asset reference
- `aem-content`: Content reference
- `aem-tag`: Tag selection
- `number`: Numeric input

### 5. File Structure

```
models/
├── _page-metadata.json              # Global (required)
├── _blog-post-metadata.json         # Template-specific
├── _product-page-metadata.json      # Template-specific
├── _component-models.json           # Model registry (required)
└── partials/                        # Reusable definitions
    └── _article-types.json
```

### 6. Documentation

- Comment your JSON files (using description fields)
- Document field purposes
- Keep examples in your codebase
- Update this guide with new patterns

### 7. Testing Checklist

Before deploying:
- [ ] JSON syntax is valid
- [ ] Model is registered in `_component-models.json`
- [ ] Build completes without errors
- [ ] Fields appear in Universal Editor
- [ ] Fields save correctly
- [ ] Fields display correctly on frontend
- [ ] No conflicts with existing models

## Component Type Reference

### Text Field
```json
{
  "component": "text",
  "valueType": "string",
  "name": "field-name",
  "label": "Field Label",
  "description": "Optional description",
  "multi": false  // Set to true for multiple values
}
```

### Select Dropdown
```json
{
  "component": "select",
  "valueType": "string",
  "name": "field-name",
  "label": "Field Label",
  "options": [
    {
      "name": "Display Name",
      "value": "actual-value"
    }
  ]
}
```

### Boolean (Checkbox)
```json
{
  "component": "boolean",
  "valueType": "boolean",
  "name": "field-name",
  "label": "Field Label"
}
```

### Date-Time
```json
{
  "component": "date-time",
  "valueType": "date-time",
  "name": "field-name",
  "label": "Field Label",
  "placeholder": "YYYY-MM-DD"
}
```

### Reference (Asset)
```json
{
  "component": "reference",
  "valueType": "string",
  "name": "field-name",
  "label": "Field Label",
  "multi": false
}
```

### Rich Text
```json
{
  "component": "richtext",
  "valueType": "string",
  "name": "field-name",
  "label": "Field Label"
}
```

## Additional Resources

- [AEM Edge Delivery Services Documentation](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring)
- [Content Modeling Guide](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling)
- [Universal Editor Documentation](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/universal-editor)

## Summary

To create a custom template with template-specific page properties:

1. Create `models/_your-template-metadata.json` with your fields
2. Register it in `models/_component-models.json`
3. Build the project: `npm run build`
4. Test in Universal Editor
5. Verify fields appear and save correctly

Remember to follow naming conventions, validate your JSON, and test thoroughly before deploying to production.

