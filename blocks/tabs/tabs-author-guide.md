# Tabs Block - Universal Editor Configuration

This document explains how the Tabs block is configured for use in the Universal Editor.

## Block Structure

The Tabs block uses a **Collection Model** pattern in Universal Editor, consisting of:

### 1. Tabs Container Block
- **Title**: "Tabs"
- **ID**: `tabs`
- **Type**: Block container
- **Purpose**: Holds multiple Tab items

### 2. Tab Item Component
- **Title**: "Tab"
- **ID**: `tab`
- **Type**: Block item
- **Purpose**: Individual tab with title and content

## Content Model

Each Tab item has two fields:

### Tab Title (Required)
- **Field Type**: Text
- **Component**: `text`
- **Purpose**: Short descriptive title displayed in the tab button
- **Examples**: "Tab 1", "Getting Started", "Features", "Pricing"
- **Best Practice**: Keep it short (1-3 words)

### Tab Content
- **Field Type**: Rich Text
- **Component**: `richtext`
- **Purpose**: Full content displayed when the tab is active
- **Supports**: 
  - Headings (H2, H3, etc.)
  - Paragraphs
  - Lists (bulleted and numbered)
  - Images
  - Links
  - Other formatting

## Author Workflow in Universal Editor

### Adding a Tabs Block

1. **Insert Component**
   - Click "+ Add component" on your page
   - Search for "Tabs"
   - Select "Tabs" block

2. **Add Tab Items**
   - Click "+ Add item" or "Add Tab"
   - Fill in the "Tab Title" field (required)
   - Add rich content in the "Tab Content" field
   - Repeat for each tab you want to create

3. **Reorder Tabs**
   - Use drag-and-drop to reorder tabs
   - The first tab will be active by default

4. **Edit Tab Content**
   - Click on any tab item to edit
   - Modify the title or content
   - Changes are saved automatically

### Content Guidelines

**Tab Titles:**
- Keep short and descriptive (1-3 words ideal)
- Use clear, action-oriented language
- Avoid jargon unless appropriate
- Examples: "Overview", "Features", "Pricing", "FAQ"

**Tab Content:**
- Start with an H2 heading for the main content
- Use clear, scannable paragraphs
- Include lists for easy reading
- Add images or media as needed
- Keep content focused on the tab's topic

## Technical Implementation

### JSON Configuration

The `_tabs.json` file defines:

```json
{
  "definitions": [
    {
      "title": "Tabs",
      "id": "tabs",
      // Container block definition
    },
    {
      "title": "Tab",
      "id": "tab",
      // Individual tab item definition
    }
  ],
  "models": [
    {
      "id": "tab",
      "fields": [
        // Tab Title field (text)
        // Tab Content field (richtext)
      ]
    }
  ],
  "filters": [
    {
      "id": "tabs",
      "components": ["tab"]
    }
  ]
}
```

### Field Mapping

Universal Editor fields map to the HTML structure:

| Universal Editor Field | HTML Output | Notes |
|------------------------|-------------|-------|
| Tab Title | First `<div>` in row | Tab button text |
| Tab Content | Second `<div>` in row | Panel content (rich HTML) |

### Output Structure

Universal Editor generates this HTML structure:

```html
<div class="tabs">
  <div>
    <div>Tab Title 1</div>
    <div>
      <h2>Content Heading</h2>
      <p>Content paragraph...</p>
    </div>
  </div>
  <div>
    <div>Tab Title 2</div>
    <div>
      <h2>Another Heading</h2>
      <p>More content...</p>
    </div>
  </div>
</div>
```

The JavaScript decoration (`tabs.js`) transforms this into the interactive tab interface.

## Comparison with Document-Based Authoring

| Aspect | Universal Editor | Document Editor (Google Docs) |
|--------|------------------|-------------------------------|
| **Interface** | Form-based fields | Table structure |
| **Tab Title** | Text field | First column cell |
| **Tab Content** | Rich text editor | Second column cell with HTML |
| **Reordering** | Drag and drop | Copy/paste rows |
| **Validation** | Required fields | Manual |
| **Preview** | Real-time | After publish |

## Best Practices

### For Authors

1. **Use 3-7 tabs** - Too few is limiting, too many is overwhelming
2. **Consistent content length** - Try to balance content across tabs
3. **Logical organization** - Order tabs by user journey or importance
4. **Clear titles** - Make it obvious what each tab contains
5. **Rich content** - Use formatting to make content scannable

### For Developers

1. **Field validation** - Tab Title is required
2. **Default content** - Consider placeholder text in the model
3. **Content limits** - May want to add character limits for titles
4. **Preview support** - Ensure proper preview rendering
5. **Accessibility** - JavaScript maintains ARIA attributes

## Troubleshooting

### Tab not appearing
- Check that Tab Title is filled in (required field)
- Verify the tab item is inside the Tabs container
- Check browser console for JavaScript errors

### Content not displaying
- Ensure Tab Content field has content
- Check for invalid HTML in rich text
- Verify JavaScript is loading correctly

### Styling issues
- Check that `tabs.css` is loaded
- Verify there are no CSS conflicts
- Test in different browsers

## Additional Resources

- **Block README**: `blocks/tabs/README.md` - Full block documentation
- **Test Page**: `/drafts/tabs-test.html` - Example implementation
- **JavaScript**: `blocks/tabs/tabs.js` - Block decoration code
- **Styles**: `blocks/tabs/tabs.css` - Block styling

## Support

For issues or questions:
1. Check the main README.md
2. Review the test page at `/drafts/tabs-test`
3. Verify JSON configuration in `_tabs.json`
4. Check browser console for errors

