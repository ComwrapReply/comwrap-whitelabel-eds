# Dynamic Content Block - Author Guide

## Overview

The Dynamic Content block automatically displays a list of content items (articles, pages, etc.) based on a parent page you select. It fetches content from your site's content index and displays it in an organized, filterable format. Perfect for creating article listings, blog post feeds, or any collection of related content.

---

## How to Add Dynamic Content

### Creating Your First Dynamic Content Block in Universal Editor

**Step 1: Add the Dynamic Content Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Dynamic Content" from the block library
4. The dynamic content block will be inserted into your page

**Step 2: Configure the Parent Page**

1. Click on the dynamic content block to select it
2. In the Properties panel, you'll see the "Parent page" field
3. Click on "Parent page" and select the page whose child content you want to display
4. The block will automatically fetch and display all child pages from the selected parent

**Step 3: (Optional) Add Dynamic Content Filter**

If you want users to filter the content by tags:
1. Add a "Dynamic Content Filter" block **before** the Dynamic Content block
2. Configure the filter options (see Dynamic Content Filter guide)
3. The filter will automatically work with your dynamic content

**Step 4: Preview and Publish**

1. Preview your dynamic content using the preview mode
2. Test on different device sizes
3. Verify content is loading correctly
4. Publish when ready

---

## Dynamic Content Options

### Parent Page Selection

The Dynamic Content block has one required configuration:

- **Parent page**: Select the AEM page whose child content you want to display
  - The block will automatically find all child pages under this parent
  - Content is filtered to exclude Index pages, navigation, and footer pages
  - Only published content will appear

---

## Content Guidelines

### Parent Page Structure

**Best Practices:**
- **Organization**: Ensure your parent page contains child pages with consistent structure
- **Naming**: Use clear, descriptive names for your content pages
- **Metadata**: Add proper metadata (title, description, tags) to child pages for better display

**Good Examples:**
- Parent: `/articles` with children like `/articles/article-1`, `/articles/article-2`
- Parent: `/blog` with children like `/blog/post-1`, `/blog/post-2`
- Parent: `/resources` with children like `/resources/resource-1`

**Avoid:**
- ❌ Selecting a parent page with no child content
- ❌ Using deeply nested page structures (keep it simple)
- ❌ Mixing unrelated content types under one parent

### Child Page Content

**Best Practices:**
- **Title**: Use clear, descriptive titles (will appear as the content card title)
- **Description**: Add a brief description or excerpt (appears below the title)
- **Images**: Include a featured image for visual appeal
- **Tags**: Add relevant tags for filtering (see Dynamic Content Filter)
- **Metadata**: Ensure all child pages have proper metadata set

**Content Structure:**
Each child page should have:
- Page title (used as the card title)
- Page description or excerpt (optional but recommended)
- Featured image (optional but recommended)
- Tags for categorization (optional but needed for filtering)

---

## Writing Tips

### Do's ✅

- Use a logical parent page structure
- Add descriptive titles to all child pages
- Include images for visual interest
- Add tags to enable filtering
- Keep child page content organized and consistent
- Test that content appears correctly after publishing
- Update child pages regularly to keep content fresh
- Use clear, descriptive page names

### Don'ts ❌

- Don't select a parent page with no children
- Don't mix unrelated content types under one parent
- Don't forget to add metadata (title, description, images)
- Don't use the same page as both parent and child
- Don't expect content to appear immediately (may need page refresh)
- Don't forget to publish child pages for them to appear
- Don't use very long page titles (keep them concise)

---

## How Users Will Experience Your Dynamic Content

### Desktop Experience

- Content appears in a grid or list layout
- Each content item displays as a card with:
  - Featured image (if available)
  - Title
  - Description/excerpt
  - Tags (if available)
  - "Read more" button
- Cards are clickable and link to the full content
- Smooth hover effects on interactive elements
- Clear visual hierarchy and spacing

### Mobile Experience

- Content adapts to mobile screen sizes
- Cards stack vertically for easy scrolling
- Touch-friendly button sizes
- Images automatically resize
- Readable text at all screen sizes

### Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly
- Alt text for images (from page metadata)
- Focus indicators on interactive elements

### Dynamic Loading Behavior

- Content is fetched from the site's content index
- Only published content appears
- Automatically excludes Index pages, navigation, and footer pages
- Content updates when child pages are added or modified

---

## Common Questions

### Q: Why isn't my content showing up?
**A:** Check that:
- The parent page is correctly selected
- Child pages exist under the parent page
- Child pages are published
- The page names don't include "Index", "/nav", or "/footer"
- Try refreshing the page

### Q: How do I control what content appears?
**A:** Content is automatically determined by:
- The parent page you select
- Published status of child pages
- Automatic filtering of Index/nav/footer pages
- You cannot manually select individual items

### Q: Can I add a filter to the content?
**A:** Yes! Add a "Dynamic Content Filter" block before the Dynamic Content block. It will automatically work with the content and allow filtering by tags.

### Q: How do I add tags to content for filtering?
**A:** Tags are added through page metadata. Set tags on individual child pages, and they will appear in the Dynamic Content Filter if enabled.

### Q: Why are some child pages not appearing?
**A:** Content is filtered to exclude:
- Pages with "Index" in the title
- Navigation pages (contain "/nav" in path)
- Footer pages (contain "/footer" in path)
- Unpublished pages

### Q: Can I use multiple Dynamic Content blocks on one page?
**A:** Yes, each block operates independently. Each block can display content from a different parent page.

### Q: How do I update the content?
**A:** Add, edit, or remove child pages under the selected parent page. The Dynamic Content block will automatically reflect changes after publishing and page refresh.

### Q: Why is the content not updating in Universal Editor?
**A:** Content is fetched from the published content index. Changes may require:
- Publishing the child pages
- Refreshing the page
- Waiting for the content index to update

### Q: Can I change the layout or styling?
**A:** Layout and styling are controlled by the theme CSS. For customizations, contact your development team.

---

## Troubleshooting

### Dynamic Content not showing on published page

**Check:**
- Is the parent page correctly selected in Properties?
- Do child pages exist under the selected parent?
- Are the child pages published?
- Try refreshing the browser page
- Check browser console for errors
- Verify the query-index.json file exists

### Content not updating after changes

**Check:**
- Have you published the child pages?
- Did you refresh the browser page?
- Is the content index updated?
- Check that page paths are correct
- Verify page metadata is set

### Can't select parent page

**Check:**
- Do you have permissions to access the page?
- Is the page path within the allowed root path?
- Try selecting a different parent page
- Check that the page exists and is accessible

### Some child pages missing

**Check:**
- Are the pages published?
- Do page titles include "Index"?
- Do page paths include "/nav" or "/footer"?
- Are pages nested too deeply?
- Check page metadata structure

### Images not displaying

**Check:**
- Is a featured image set on the child pages?
- Are images published?
- Check image paths in page metadata
- Verify image file formats are supported

### Tags not appearing

**Check:**
- Are tags set in page metadata?
- Have pages with tags been published?
- Is the Dynamic Content Filter block present?
- Verify tag format (comma-separated)

### Changes not saving

**Check:**
- Check for error messages
- Ensure stable internet connection
- Verify you have edit permissions
- Try saving in smaller increments
- Refresh Universal Editor

---

## Tips for Success

### Plan Your Content Structure

Think about how you want to organize content before creating pages. A well-structured parent-child relationship makes content management easier.

### Use Consistent Metadata

Ensure all child pages have:
- Descriptive titles
- Helpful descriptions
- Featured images where appropriate
- Relevant tags for filtering

### Test Before Publishing

Preview your dynamic content to ensure:
- Content appears correctly
- Images load properly
- Links work as expected
- Layout looks good on mobile

### Keep Content Fresh

Regularly update child pages with new content to keep your dynamic content block engaging and current.

### Organize with Tags

Use tags strategically to:
- Categorize content by topic
- Enable filtering functionality
- Improve content discoverability
- Create thematic groupings

### Use Clear Titles

Keep page titles concise and descriptive. They appear as card titles, so make them compelling and informative.

### Add Descriptions

Include brief descriptions or excerpts on child pages. They provide context and help users decide what to read.

### Coordinate with Filter Block

If using Dynamic Content Filter:
- Place the filter block before the dynamic content block
- Ensure child pages have tags
- Test filtering functionality
- Consider which tags to use for filtering

---

## Quick Reference

**Parent Page Field**: Required - Select the page whose children to display  
**Content Source**: Automatically fetched from query-index.json  
**Filtering**: Use Dynamic Content Filter block for tag-based filtering  
**Excluded Content**: Index pages, /nav pages, /footer pages, unpublished pages  
**Update Method**: Add/edit child pages under parent and publish  
**Multiple Blocks**: Supported - each operates independently

---

*Last Updated: December 2024*  
*For technical documentation, see dynamic-content-developer-guide.md*  
*For AEM Universal Editor support, contact your AEM administrator*

