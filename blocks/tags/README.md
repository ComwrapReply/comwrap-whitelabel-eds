---
description: Tags block author documentation
alwaysApply: false
---

## How to Add Tags

> **INSTRUCTION:** The Tags block automatically displays page tags from AEM's native tag system (cq:tags). You don't need to add content to the block itself—it reads tags from the page properties.

### Creating Your First Tags Block in Universal Editor

**Step 1: Add the Tags Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Tags" from the block library
4. The Tags block will be inserted into your page

**Step 2: Set Up Page Tags Using AEM Tag System**

> **Note:** The Tags block reads from AEM's native tag system (cq:tags) configured in page properties. You'll use the standard AEM tag picker interface to select tags.

1. Open the page properties panel in Universal Editor
2. Navigate to the "Basic" or "Tags" tab in Page Properties
3. Click on the "Tags" field (labeled "cq:tags")
4. Use the AEM tag picker to browse and select tags:
   - Search for tags using the search bar
   - Navigate through tag categories in the left panel
   - Select tags by checking the boxes next to tag names
   - Click "Select" to confirm your tag selections
5. Save the page properties

**Step 3: Verify Tags Display**

1. The Tags block will automatically read the page tags
2. Each tag will appear as a small blue rounded pill
3. Tags are displayed in a horizontal row that wraps to multiple lines if needed
4. If no tags are set, the block will be hidden automatically

**Step 4: Preview and Publish**

1. Preview your tags block using the preview mode
2. Verify tags display correctly on the published page
3. Test on different device sizes to ensure responsive behavior
4. Publish when ready

---

## Tags Options

The Tags block currently has no configurable options in the Properties panel. The block automatically:

- Reads tags from AEM's native tag system (`cq:tags` / `meta[name="cq-tags"]`)
- Extracts readable tag names from AEM tag IDs
- Displays each tag as a blue pill-shaped badge
- Wraps to multiple lines on smaller screens
- Hides itself if no tags are found

---

## Content Guidelines

### Page Tags (AEM Tag System)

> **INSTRUCTION:** Provide guidance for using AEM's native tag system through the tag picker interface.

**Using the AEM Tag Picker:**
- Tags are managed through AEM's centralized tag system
- Use the tag picker interface in Page Properties to select from existing tags
- Tags can be organized in hierarchical structures (categories/subcategories)
- Tag IDs are automatically handled—the block extracts readable tag names for display

**Best Practices:**
- **Length**: Keep tag names short and descriptive (1-2 words)
- **Organization**: Use tag categories to organize related tags
- **Relevance**: Only include tags that accurately describe the page content
- **Quantity**: Use 3-8 tags per page for optimal display
- **Consistency**: Reuse existing tags from your tag library rather than creating duplicates
- **Naming**: Use clear, descriptive tag names that match your content taxonomy

**Good Examples:**
- Categories: "Content Types" with tags like "Blog Post", "Case Study", "Tutorial"
- Topics: "Web Design", "User Experience", "Interface Design"
- Industries: "Healthcare", "Finance", "Technology"

**Avoid:**
- ❌ Creating duplicate tags with slight variations (e.g., "Design" and "design")
- ❌ Very long tag names that don't fit well in the pill shape
- ❌ Using too many tags (more than 10 makes the display cluttered)
- ❌ Creating tags without considering your site's content taxonomy
- ❌ Using inconsistent tag naming conventions

### Tag Display Behavior

**Desktop Experience:**
- Tags display in a horizontal row
- If tags exceed the container width, they wrap to the next line
- Each tag has consistent spacing between others

**Mobile Experience:**
- Tags wrap more frequently to accommodate smaller screens
- Touch-friendly spacing is maintained
- Tags remain readable at all screen sizes

---

## Writing Tips

### Do's ✅

- Use clear, descriptive tag names that users understand
- Keep tags relevant to the actual page content
- Use consistent naming conventions across your site
- Update tags when page content changes significantly
- Review tags periodically for accuracy and relevance

### Don'ts ❌

- Don't use overly technical jargon unless your audience understands it
- Don't create tags that are too similar (e.g., "Design" and "Designing")
- Don't include tags just for SEO—only use relevant tags
- Don't forget to update tags when page content changes
- Don't use special characters or symbols that may break display

---

## How Users Will Experience Your Tags

### Desktop Experience

- Tags appear as a row of small blue rounded pills below or above your content (depending on block placement)
- Tags are clearly readable with good contrast
- Users can quickly scan tags to understand page topics
- Tags wrap naturally when there are many of them

### Mobile Experience

- Tags display in a compact format optimized for smaller screens
- Tags wrap to multiple lines as needed
- Touch-friendly spacing ensures tags remain accessible
- Readable text size maintains usability on all devices

### Accessibility Features

- Tags use semantic HTML structure for screen readers
- High contrast colors ensure readability for all users
- Tags are static content (non-interactive) and don't interfere with navigation
- Responsive design ensures accessibility across all device types

### Tags-Specific Behavior

- Tags are automatically populated from page metadata
- The block hides itself if no tags are configured (improves page cleanliness)
- Tags update automatically when page metadata changes
- No user interaction is required—tags are display-only

---

## Common Questions

### Q: Why aren't tags showing on my page?

**A:** The Tags block reads from AEM's native tag system (cq:tags). Check that:
1. You've selected tags using the tag picker in Page Properties
2. The tags are saved in the page properties
3. The page has been saved and published
4. Tags are properly configured in your AEM tag library

### Q: How do I edit or remove tags?

**A:** Tags are managed through AEM's tag system in page properties:
1. Open page properties in Universal Editor
2. Navigate to the "Basic" or "Tags" tab
3. Click on the "cq:tags" field
4. Use the tag picker to add or remove tags
5. Click "Select" to confirm changes
6. Save and republish the page

### Q: Can I change the color or style of tags?

**A:** Currently, tags use the theme's primary color. To customize styling, you would need to modify the block's CSS file, which requires developer assistance.

### Q: How many tags should I include?

**A:** We recommend 3-8 tags per page for optimal display and usability. Too few tags may not provide enough context, while too many can clutter the display.

### Q: Do tags help with SEO?

**A:** While tags can help organize and categorize content, they're primarily for user experience and content organization. The page's meta description, title, and structured content are more important for SEO.

### Q: Can tags be clickable/links?

**A:** Currently, tags are display-only and not interactive. They serve to indicate page topics but don't link to tag archive pages.

### Q: Why doesn't the Tags block show content in Universal Editor?

**A:** The Tags block is data-driven from page metadata. In Universal Editor, you may need to preview the published page or ensure the meta tags are properly configured for the block to display tags.

### Q: Can I use different tag styles or sizes?

**A:** The Tags block uses a consistent style (blue rounded pills) for all tags. If you need different styles, this would require CSS customization by a developer.

---

## Troubleshooting

### Tags Not Showing on Published Page

**Check:**
- Verify you've selected tags using the AEM tag picker in Page Properties
- Ensure tags are saved in the page properties (cq:tags field)
- Check that a `<meta name="cq-tags" content="...">` tag exists in the page head
- Verify the Tags block is properly placed on the page
- Ensure the page has been published after adding tags
- Check browser console for any JavaScript errors

**If issue persists:**
- Clear browser cache and reload the page
- Check that the Tags block JavaScript file is loading correctly
- Verify tags are properly configured in your AEM tag library
- Check the page source to confirm the cq-tags meta tag exists

### Tags Displaying Incorrectly

**Check:**
- Verify tags are properly selected in the AEM tag picker
- Check that tag names are displaying correctly (tag IDs are automatically converted to readable names)
- Ensure tags don't have unusual characters that might break display
- Check browser developer tools for rendering issues

**If issue persists:**
- Review the actual meta tag content in the page source (`meta[name="cq-tags"]`)
- Verify CSS is loading correctly
- Check that tag IDs are in the expected format (the block handles various AEM tag ID formats)

### Can't Find Tags Field in Page Properties

**Check:**
- Ensure you have access to edit page properties
- Look for the "Basic" or "Tags" tab in Page Properties
- Check for the "cq:tags" field (may be labeled as "Tags" or "cq:tags")
- Verify your page template includes the standard tag field
- Ensure you have permissions to edit page properties

**Note:** The Tags block uses AEM's native tag system (cq:tags), which should be available by default in page properties. If you can't find it:
1. Ask your AEM administrator to verify the page template includes the tag field
2. Check if custom page templates are overriding the default properties

### Tags Block Shows but is Empty

**Check:**
- Verify you've selected tags in the AEM tag picker
- Ensure tags are saved in page properties (not just selected temporarily)
- Check that the `<meta name="cq-tags" content="...">` tag exists and has content
- Verify tags are properly formatted in the meta tag (comma-separated tag IDs)
- Ensure the page has been saved and published after selecting tags

### Tags Not Updating After Changes

**Check:**
- Ensure page metadata has been saved after editing
- Verify the page has been republished
- Clear browser cache if viewing cached version
- Check that changes were saved in the correct metadata field

### Tags Block Hidden When Tags Exist

> **Note:** This is a known behavior—the block hides if it can't find tags. This is intentional to keep pages clean.

**Check:**
- Verify the meta tag name is exactly `meta[name="cq-tags"]` (not "tags")
- Check that the content attribute has non-empty values (comma-separated tag IDs)
- Ensure JavaScript is running and can access the meta tag
- Verify there are no JavaScript errors preventing tag reading
- Check that tags were properly saved after selecting them in the tag picker

### Styling Issues (Colors, Spacing)

**Check:**
- Verify CSS file is loading correctly
- Check if custom theme overrides are affecting tag styles
- Ensure browser hasn't cached old styles
- Verify CSS custom properties are defined in your theme

---

## Tips for Success

### Choosing Effective Tags

Select tags that accurately represent your page content. Think about what terms users might search for or use to categorize the page. Consider your site's content taxonomy when creating tags.

### Maintaining Consistency

Use a consistent tag vocabulary across your site. Consider creating a tag style guide that defines preferred tag names, capitalization, and usage guidelines. This helps maintain a professional appearance.

### Regular Review

Periodically review tags on existing pages to ensure they remain relevant as content evolves. Outdated or inaccurate tags can confuse users and reduce the value of the tagging system.

### Strategic Placement

Place the Tags block where it makes sense contextually—often near article content, at the bottom of blog posts, or in sidebars. Consider your site's design and user flow when positioning the block.

### Performance Consideration

The Tags block is lightweight and has minimal performance impact. However, if you're displaying many tags (10+), consider if all tags are necessary, as too many tags can clutter the display and slow visual processing.

### Content Organization

Use tags to help organize related content across your site. Well-organized tags can help users discover related pages and improve site navigation, even if tags aren't clickable.

### Accessibility Best Practices

While the Tags block is accessible by default, ensure your tag names are clear and descriptive. Avoid abbreviations that might not be understood by all users, especially those using screen readers.

---

## Quick Reference

**Tag Source**: AEM native tag system (cq:tags) via Page Properties  
**Meta Tag Format**: `<meta name="cq-tags" content="tagId1,tagId2,tagId3">` (automatically generated)  
**Recommended Tag Count**: 3-8 tags per page  
**Tag Selection**: Use AEM tag picker in Page Properties  
**Tag Display**: Blue rounded pills in horizontal row (shows readable tag names)  
**Tag ID Handling**: Automatically extracts readable names from AEM tag IDs  
**Responsive Behavior**: Tags wrap to multiple lines on smaller screens  
**Empty State**: Block automatically hides if no tags found  
**Configuration Options**: None (auto-populated from AEM tag system)

---

*Last Updated: January 2025*  
*For technical documentation, see the block's JavaScript and CSS files*  
*For AEM Universal Editor support, contact your AEM administrator*
