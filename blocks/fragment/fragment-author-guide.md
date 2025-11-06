# Fragment - Author Guide

## Overview

The Fragment block allows you to include reusable content from another page or document directly into your current page. This is perfect for creating shared content elements like headers, footers, announcements, or any content that needs to appear across multiple pages.

This guide covers creating and managing Fragment blocks in AEM Universal Editor with Edge Delivery Services (EDS).

---

## How to Add a Fragment

### Creating Your First Fragment Block in Universal Editor

**Step 1: Add the Fragment Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Fragment" from the block library
4. The Fragment block will be inserted into your page

**Step 2: Reference the Fragment Content**

1. Select the Fragment block on your page
2. In the Properties panel, you'll see the "Reference" field
3. Click on the Reference field to open the content browser
4. Navigate to and select the page or document you want to include as a fragment
5. The selected page's content will be referenced and loaded into your Fragment block

**Note**: The referenced page should exist and be accessible. The Fragment block will load the entire content from that page.

**Step 3: Configure Style Option**

1. While the Fragment block is selected, look for the "Style" option in the Properties panel
2. Choose your preferred style:
   - **Default**: Standard styling (no additional classes)
   - **Dark**: Applies a dark background with white text styling

**Step 4: Preview and Publish**

1. Preview your Fragment block using the preview mode
2. Verify that the referenced content loads correctly
3. Test on different device sizes
4. Publish when ready

---

## Fragment Options

### Style Options

Available in the Properties panel:

- **Default**: The fragment uses standard page styling without any special background or text color modifications.

- **Dark**: Applies dark theme styling with:
  - Dark blue background color
  - White text color
  - Full-width background with padding
  - Useful for creating visually distinct sections or call-out areas

---

## Content Guidelines

### Referenced Pages/Documents

**What Can Be Referenced:**

- Any page or document within your AEM site
- The referenced page should contain valid HTML content
- Content from the referenced page will be loaded and displayed inline

**Best Practices:**

- **Structure**: Create dedicated pages for fragment content to ensure they're reusable and maintainable
- **Naming**: Use clear, descriptive names for fragment pages (e.g., "Announcement Banner", "Product Disclaimer")
- **Content Organization**: Keep fragment pages focused on a single purpose or piece of content
- **Testing**: Always test the referenced page independently before using it as a fragment

**Recommended Fragment Use Cases:**

- Shared headers or footers
- Reusable announcement banners
- Common disclaimers or legal text
- Product information that appears on multiple pages
- Promotional content blocks
- Navigation components

### Fragment Content Structure

**Best Practices:**

- **Complete Content**: The fragment will include all content from the referenced page
- **Media Assets**: Images and media referenced in the fragment will automatically have their paths corrected to work correctly
- **Nested Components**: Fragments can contain other blocks and components, including other Fragment blocks (nested fragments)
- **Styling**: The fragment inherits styling from both the referenced page and the current page context

---

## Writing Tips

### Do's ✅

- **Create dedicated fragment pages** for reusable content elements
- **Use descriptive names** for fragment pages to make them easy to identify
- **Test fragments independently** before using them on pages
- **Keep fragment content focused** - each fragment should serve a clear purpose
- **Use the Dark style option** to create visual distinction for important content
- **Document fragment purposes** in page metadata or descriptions
- **Update fragment pages centrally** - changes will automatically reflect wherever the fragment is used

### Don'ts ❌

- **Don't create circular references** - avoid referencing fragments that reference each other
- **Don't use fragments for unique content** - fragments are for reusable, shared content
- **Don't ignore broken references** - always verify that referenced pages exist and are accessible
- **Don't overuse nesting** - limit nested fragments to avoid performance and maintenance issues
- **Don't reference unpublished content** - ensure referenced pages are published or accessible

---

## How Users Will Experience Your Fragment

### Desktop Experience

- Fragments load seamlessly and appear as integrated content within the page
- Dark style fragments create visually distinct sections with full-width dark backgrounds
- Content from fragments appears immediately when the page loads
- All interactive elements within fragments function normally (links, buttons, forms, etc.)

### Mobile Experience

- Fragments are fully responsive and adapt to mobile screen sizes
- Dark style fragments maintain their visual distinction on mobile devices
- Touch interactions work correctly with fragment content
- Media and images within fragments are optimized for mobile viewing

### Accessibility Features

- **Screen reader support**: Fragment content is properly structured and accessible to screen readers
- **Keyboard navigation**: All interactive elements within fragments are keyboard accessible
- **Semantic HTML**: Fragment content maintains proper semantic structure for accessibility
- **ARIA compliance**: Fragments preserve accessibility attributes from the source content

### Fragment Loading Behavior

- Fragments load asynchronously when the page loads
- Media paths are automatically corrected to work regardless of the fragment's source location
- All blocks and components within the fragment are fully decorated and functional
- The fragment's style options (like Dark theme) are applied to create visual distinction

---

## Common Questions

### Q: Can I edit the fragment content directly from this page?

**A:** No, you need to edit the referenced page directly. Changes to the fragment page will automatically appear wherever that fragment is used.

### Q: What happens if I delete or unpublish the referenced page?

**A:** The fragment will not load, and you may see an error or empty block. Always ensure referenced pages are published and accessible.

### Q: Can I use a fragment within another fragment?

**A:** Yes, fragments can be nested, but use this feature carefully to avoid circular references or performance issues.

### Q: How do I change the content of a fragment?

**A:** Edit the original page that is referenced by the fragment. All pages using that fragment will automatically show the updated content.

### Q: Can I override the fragment's styling on a specific page?

**A:** The fragment inherits styling from both its source page and the current page context. You can also use the Style option (Default/Dark) to apply predefined styling variants.

### Q: Why isn't my fragment showing up on the published page?

**A:** Check that:
- The referenced page exists and is published
- The reference path is correct
- There are no circular reference issues
- The fragment block itself is published

### Q: Can I see fragment content in Universal Editor preview?

**A:** Yes, fragments should load in Universal Editor preview mode. If they don't, verify the referenced page exists and is accessible.

### Q: What file types can I reference as fragments?

**A:** Fragments reference entire pages or documents. The system loads the HTML content from `.plain.html` version of the referenced resource.

---

## Troubleshooting

### Fragment not loading or showing empty

**Check:**
- Verify the referenced page exists and is accessible
- Ensure the reference path in the Properties panel is correct
- Check that the referenced page is published
- Verify there are no circular reference loops
- Test the referenced page independently to ensure it loads correctly

**Resolution:** Edit the Fragment block, verify the reference, and republish both the fragment source page and the page containing the fragment.

### Fragment content displaying incorrectly

**Check:**
- The referenced page's content structure
- Whether styles are conflicting between the fragment source and destination page
- If media assets are loading correctly
- Browser console for any JavaScript errors
- Network tab to see if fragment resources are loading

**Resolution:** Review the fragment source page styling and ensure it's compatible with the destination page context.

### Can't select or edit fragment reference

**Check:**
- You have proper permissions to access the content browser
- The content browser is functioning correctly
- Refresh the Universal Editor interface
- Try removing and re-adding the Fragment block

**Resolution:** Contact your AEM administrator if content browser access issues persist.

### Dark style not applying correctly

**Check:**
- The Style option is set to "Dark" in the Properties panel
- The block has been saved after selecting the Dark option
- CSS styles are loading correctly on the page
- No conflicting styles are overriding the Dark theme

**Resolution:** Verify the Style selection, save the block, and check for CSS conflicts in browser developer tools.

### Changes to fragment source not appearing

**Check:**
- The fragment source page has been published after changes
- Browser cache is cleared or hard refresh is used
- The fragment is being loaded correctly (check network requests)
- Multiple fragment references aren't conflicting

**Resolution:** Publish the fragment source page, clear cache, and verify fragment loading in browser developer tools.

### Fragment causing page performance issues

> **Note:** If fragments contain heavy content or multiple nested fragments, this can impact page load performance.

**Check:**
- Number of fragments on the page
- Content size within fragment pages
- Whether fragments are nested deeply
- Network requests for fragment resources

**Resolution:** Optimize fragment source pages, limit fragment usage per page, and avoid deep nesting.

### Media not displaying in fragment

**Check:**
- Media paths in the fragment source page
- Whether media assets are published
- Media file formats and sizes
- Browser console for media loading errors

---

## Tips for Success

### Content Management Strategy

Create a dedicated folder structure for fragment pages. For example, use `/fragments/` or `/shared-content/` to organize reusable fragments. This makes it easier to find and manage fragment content.

### Naming Conventions

Use clear, descriptive names for fragment pages. Names like "product-disclaimer-fragment" or "announcement-banner-2024" are much better than "page-1" or "fragment-test".

### Style Consistency

When creating fragment source pages, design them to work well in different page contexts. Avoid hard-coded widths or absolute positioning that might break when the fragment is included on different pages.

### Content Testing

Always test fragments in isolation first. Create a test page, add your fragment, and verify everything works correctly before using it on production pages.

### Documentation

Maintain a list or documentation of which pages use which fragments. This helps when you need to update content - you'll know which pages will be affected.

### Performance Optimization

Keep fragment source pages lightweight. Minimize heavy images, complex layouts, or too many nested components within fragments to ensure fast page loading.

### Version Control

Consider creating versioned fragment pages for content that changes frequently. For example, "announcement-banner-v1" and "announcement-banner-v2" allow you to update references gradually across pages.

---

## Quick Reference

**Content Type**: Reference to another page or document  
**Reference Field**: Required - must select a page/document from content browser  
**Style Options**: Default, Dark  
**Maximum Fragments per Page**: No strict limit, but consider performance  
**Nested Fragments**: Supported (use with caution)  
**Content Updates**: Edit source page - changes reflect automatically  
**Media Handling**: Automatic path correction  
**Page Requirements**: Referenced page must exist and be published

---

*Last Updated: December 2024*  
*For technical documentation, see README.md*  
*For AEM Universal Editor support, contact your AEM administrator*

