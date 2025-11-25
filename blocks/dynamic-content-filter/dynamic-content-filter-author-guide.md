# Dynamic Content Filter Block - Author Guide

## Overview

The Dynamic Content Filter block allows users to filter Dynamic Content blocks by tags. When placed before a Dynamic Content block, it automatically extracts all unique tags from the displayed content and creates filter buttons. Users can click these buttons to show only content matching selected tags. Perfect for creating browsable, filterable content collections.

---

## How to Add Dynamic Content Filter

### Creating Your First Dynamic Content Filter in Universal Editor

**Important:** The Dynamic Content Filter block must be placed **before** the Dynamic Content block on your page for it to work correctly.

**Step 1: Add the Dynamic Content Filter Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Dynamic Content Filter" from the block library
4. The filter block will be inserted into your page

**Step 2: Add Dynamic Content Block**

1. Add a "Dynamic Content" block **after** the filter block
2. Configure the Dynamic Content block with a parent page (see Dynamic Content guide)
3. Ensure child pages have tags set in their metadata

**Step 3: Configure Filter Options**

1. Click on the Dynamic Content Filter block to select it
2. In the Properties panel, you'll see the "Multiple Select" option
3. Configure the filter behavior:
   - **Multiple Select ON**: Users can select multiple tags simultaneously
   - **Multiple Select OFF**: Users can only select one tag at a time

**Step 4: Verify Tags**

1. Ensure child pages in your Dynamic Content block have tags in their metadata
2. Tags should be comma-separated (e.g., "Technology, Innovation, Updates")
3. The filter will automatically extract all unique tags from the content

**Step 5: Preview and Publish**

1. Preview your page to see the filter in action
2. Test filtering functionality by clicking different tag buttons
3. Test on different device sizes
4. Publish when ready

---

## Dynamic Content Filter Options

### Multiple Select

Available in the Properties panel:
- **Multiple Select (ON)**: Users can select multiple tags at once to show content matching any of the selected tags
  - Clicking a tag adds it to the selection
  - Clicking an active tag removes it from the selection
  - Multiple tags can be active simultaneously
- **Multiple Select (OFF)**: Users can select only one tag at a time
  - Clicking a tag selects it and deselects others
  - Clicking the active tag deselects it (showing all content)
  - Only one tag can be active at a time

---

## Content Guidelines

### Tag Setup

**Best Practices:**
- **Consistency**: Use consistent tag names across related content
- **Relevance**: Tags should accurately describe content topics
- **Quantity**: 2-5 tags per content item is ideal
- **Format**: Use comma-separated tags in page metadata

**Good Examples:**
- "Technology, Innovation"
- "Marketing, Strategy, Best Practices"
- "News, Updates, Product Launch"
- "Tutorial, Getting Started, Video"

**Avoid:**
- ❌ Inconsistent tag spelling or capitalization
- ❌ Too many tags per item (makes filtering confusing)
- ❌ Very generic tags that apply to everything
- ❌ Tags with special characters that might cause issues

### Content Organization

**Best Practices:**
- **Themes**: Group content by themes that make sense to filter
- **Categories**: Use tags to represent clear content categories
- **User Intent**: Think about what users might want to filter by
- **Balance**: Ensure multiple items share common tags for filtering to be useful

**Tag Strategy:**
- Use broad category tags (e.g., "Technology", "Marketing")
- Use specific topic tags (e.g., "API Documentation", "Social Media")
- Use format tags if relevant (e.g., "Video", "Tutorial", "Case Study")
- Use audience tags if applicable (e.g., "Beginner", "Advanced")

---

## Writing Tips

### Do's ✅

- Place the filter block before the Dynamic Content block
- Use consistent tag naming conventions
- Add 2-5 relevant tags to each content item
- Test filtering functionality before publishing
- Consider how users will want to filter content
- Use clear, descriptive tag names
- Group related tags together
- Keep tag names concise

### Don'ts ❌

- Don't place the filter after the Dynamic Content block
- Don't use inconsistent tag spelling or case
- Don't add too many tags per content item
- Don't use tags that are too specific (only one item matches)
- Don't forget to add tags to content items
- Don't use special characters in tag names unnecessarily
- Don't create filters without any content tags

---

## How Users Will Experience Your Dynamic Content Filter

### Desktop Experience

- Filter buttons appear above the content
- Tags are displayed as clickable pill-shaped buttons
- Selected tags are visually highlighted
- Clicking a tag filters content instantly
- No page reload required
- Smooth transitions when filtering

### Mobile Experience

- Filter buttons adapt to mobile screen sizes
- Tags wrap to multiple lines as needed
- Touch-friendly button sizes
- Easy scrolling through available tags
- Same filtering functionality as desktop

### Accessibility Features

- Keyboard accessible filter buttons
- Clear focus indicators
- Screen reader friendly
- Semantic HTML structure
- ARIA labels for interactive elements

### Filtering Behavior

**Multiple Select Mode (ON):**
- Users can click multiple tags to combine filters
- Content matching ANY selected tag will be shown
- Clicking an active tag removes it from the selection
- Clicking all tags off shows all content

**Single Select Mode (OFF):**
- Users can only have one tag active at a time
- Clicking a tag selects it and deselects others
- Clicking the active tag shows all content again
- Simple, focused filtering experience

### Content Filtering Logic

- Content items must have tags set in their metadata
- Tags are extracted from all displayed content items
- Only unique tags appear as filter buttons
- Tags are sorted alphabetically
- Content with no tags won't appear when any filter is active
- Clicking a tag shows content that has that tag (or any selected tag in multiple mode)

---

## Common Questions

### Q: Why isn't the filter showing any tags?
**A:** Check that:
- The Dynamic Content Filter block is placed before the Dynamic Content block
- Child pages have tags in their metadata
- Tags are properly formatted (comma-separated)
- Content has been loaded in the Dynamic Content block

### Q: How do I add tags to content?
**A:** Tags are added through page metadata on individual child pages. Set tags as comma-separated values in the page properties/metadata.

### Q: What's the difference between Multiple Select ON and OFF?
**A:** 
- **ON**: Users can select multiple tags at once (shows content matching any selected tag)
- **OFF**: Users can only select one tag at a time (shows content matching that tag)

### Q: Can I control which tags appear in the filter?
**A:** Tags are automatically extracted from all content items in the Dynamic Content block. To control which tags appear, add or remove tags from the child page metadata.

### Q: Why are some tags missing?
**A:** Only unique tags from displayed content appear. If a tag doesn't appear:
- Check that content items have that tag in their metadata
- Verify the content is loading in the Dynamic Content block
- Ensure tags are properly formatted

### Q: Can I have multiple filter blocks on one page?
**A:** Each filter block works with the Dynamic Content block that follows it. You can have multiple filter/content pairs on one page.

### Q: What happens if content has no tags?
**A:** Content without tags won't appear when any filter is active. It will only show when no filters are selected (showing all content).

### Q: Can I change the filter option after publishing?
**A:** Yes, you can change the Multiple Select setting at any time in Universal Editor. Changes will be reflected after publishing.

### Q: Why isn't filtering working in Universal Editor?
**A:** Filtering relies on the Dynamic Content block loading content first. The filter may take a moment to initialize. Test on the published page for full functionality.

---

## Troubleshooting

### Filter not showing any tags

**Check:**
- Is the Dynamic Content Filter block placed before the Dynamic Content block?
- Do child pages have tags in their metadata?
- Are tags properly formatted (comma-separated)?
- Has the Dynamic Content block loaded its content?
- Try refreshing the page
- Check browser console for errors

### Tags not updating after adding them

**Check:**
- Have you published the child pages with new tags?
- Did you refresh the page?
- Is the Dynamic Content block loading the updated content?
- Verify tags are set correctly in page metadata
- Check that tag format is correct

### Filter not working (no content filtering)

**Check:**
- Is the filter block placed before the Dynamic Content block?
- Are both blocks on the same page?
- Check browser console for JavaScript errors
- Verify Dynamic Content block is loading content
- Test on published page (not just in editor)
- Ensure tags are properly formatted on content items

### Multiple Select option not visible

**Check:**
- Select the Dynamic Content Filter block (not the Dynamic Content block)
- Look in Properties panel under "Multiple Select"
- Ensure you have edit permissions
- Try refreshing Universal Editor

### Can't edit filter settings

**Check:**
- Check edit permissions
- Is the page locked by another user?
- Try refreshing Universal Editor
- Log out and back in
- Ensure you're selecting the correct block

### Changes not saving

**Check:**
- Check for error messages
- Ensure stable internet connection
- Verify you have edit permissions
- Try saving in smaller increments
- Refresh Universal Editor

### Filter position not correct

**Check:**
- The filter block must be before the Dynamic Content block
- Check block order in Universal Editor
- Reorder blocks if necessary
- Filter looks for content in the next section

---

## Tips for Success

### Plan Your Tag Strategy

Before adding tags to content, think about:
- How users will want to filter
- What categories make sense
- Which tags will be most useful
- Tag consistency across content

### Test Filtering

Before publishing:
- Test all filter buttons
- Verify content filters correctly
- Check both Multiple Select modes
- Test on mobile devices
- Ensure tags are working as expected

### Use Consistent Tagging

- Use the same tag names across related content
- Follow a consistent naming convention
- Keep tag names clear and descriptive
- Avoid typos or variations in spelling

### Coordinate with Content Structure

- Ensure child pages in Dynamic Content have tags
- Use tags that align with your content organization
- Consider how tags relate to parent page structure
- Plan tags as you create content

### Choose the Right Mode

- **Multiple Select ON**: Best for complex filtering where users might want to combine topics
- **Multiple Select OFF**: Best for simple, focused filtering where users pick one category

### Regular Maintenance

- Review tags periodically
- Remove unused or outdated tags
- Add new tags as content categories evolve
- Ensure tags remain relevant

### Placement Matters

Always place the Dynamic Content Filter block before the Dynamic Content block. The filter needs to see the content to extract tags.

### Tag Formatting

- Use comma-separated tags in metadata
- Keep tag names concise but descriptive
- Avoid special characters when possible
- Use consistent capitalization

---

## Quick Reference

**Placement**: Must be before Dynamic Content block  
**Multiple Select**: ON = multiple tags, OFF = single tag  
**Tag Source**: Automatically extracted from Dynamic Content  
**Tag Format**: Comma-separated in page metadata  
**Update Method**: Add tags to child page metadata and publish  
**Filtering Logic**: Shows content matching selected tag(s)

---

*Last Updated: December 2024*  
*For technical documentation, see dynamic-content-filter-developer-guide.md*  
*For AEM Universal Editor support, contact your AEM administrator*

