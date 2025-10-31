---
description: Tags block author documentation
alwaysApply: false
---

## How to Add Tags

> **INSTRUCTION:** The Tags block automatically displays page tags from the page metadata. You don't need to add content to the block itself—it reads tags from the page's meta tags.

### Creating Your First Tags Block in Universal Editor

**Step 1: Add the Tags Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Tags" from the block library
4. The Tags block will be inserted into your page

**Step 2: Set Up Page Tags**

> **Note:** The Tags block reads from the page's meta tags. To display tags, you need to configure them in the page metadata.

1. Open the page properties panel in Universal Editor
2. Navigate to the "Metadata" or "Page Properties" section
3. Find the "Tags" field (or `meta[name="tags"]` in the page head)
4. Enter your tags separated by commas (e.g., "Design, Marketing, Tutorial")
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

- Reads tags from page metadata (`meta[name="tags"]`)
- Displays each tag as a blue pill-shaped badge
- Wraps to multiple lines on smaller screens
- Hides itself if no tags are found

---

## Content Guidelines

### Page Tags (Metadata)

> **INSTRUCTION:** Provide guidance for setting up tags in page metadata.

**Format:**
- Tags must be separated by commas in the meta tag
- Example: `content="Design, Marketing, Tutorial"`
- Each tag will be trimmed of whitespace automatically

**Best Practices:**
- **Length**: Keep tag names short and descriptive (1-2 words)
- **Format**: Use title case or sentence case (e.g., "Web Design" or "web design")
- **Relevance**: Only include tags that accurately describe the page content
- **Quantity**: Use 3-8 tags per page for optimal display
- **Consistency**: Use consistent tag naming across similar pages

**Good Examples:**
- "Design, User Experience, Interface"
- "Marketing, Strategy, Digital"
- "Tutorial, JavaScript, Web Development"
- "Product, Features, Overview"

**Avoid:**
- ❌ Very long tag names that don't fit well in the pill shape
- ❌ Special characters that may break formatting
- ❌ Duplicate tags on the same page
- ❌ Too many tags (more than 10 makes the display cluttered)
- ❌ Tags with inconsistent casing (e.g., mixing "design", "Design", and "DESIGN")

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

**A:** The Tags block reads from the page's meta tags. Check that:
1. You've added a `<meta name="tags" content="...">` tag in the page head
2. The content attribute contains at least one tag
3. Tags are separated by commas
4. The page has been saved and published

### Q: How do I edit or remove tags?

**A:** Tags are managed in the page metadata, not in the block itself:
1. Open page properties in Universal Editor
2. Navigate to the metadata section
3. Edit the "Tags" field (or meta tag content)
4. Save and republish the page

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
- Verify the page has a `<meta name="tags" content="...">` tag in the head
- Ensure the content attribute contains tags separated by commas
- Check browser console for any JavaScript errors
- Verify the Tags block is properly placed on the page
- Ensure the page has been published after adding tags

**If issue persists:**
- Clear browser cache and reload the page
- Check that the Tags block JavaScript file is loading correctly
- Verify the page metadata is properly saved

### Tags Displaying Incorrectly

**Check:**
- Ensure tags are properly formatted (comma-separated)
- Check for special characters that might break parsing
- Verify tags don't contain HTML entities or code
- Ensure there are no extra spaces or formatting issues

**If issue persists:**
- Review the actual meta tag content in the page source
- Check browser developer tools for rendering issues
- Verify CSS is loading correctly

### Can't Find Tags Field in Page Properties

**Check:**
- Ensure you have access to edit page properties
- Look for "Metadata" or "Page Properties" in the Universal Editor
- Check if your site uses a different meta tag field name
- Verify page template supports custom metadata fields

**Note:** If you can't find a tags field, you may need to:
1. Ask your AEM administrator to add a tags metadata field
2. Or ensure tags are set in the page head HTML directly

### Tags Block Shows but is Empty

**Check:**
- Verify the meta tag exists and has a content attribute
- Ensure the content is not empty or just whitespace
- Check that commas are used as separators (not other characters)
- Verify tags are properly saved in page metadata

### Tags Not Updating After Changes

**Check:**
- Ensure page metadata has been saved after editing
- Verify the page has been republished
- Clear browser cache if viewing cached version
- Check that changes were saved in the correct metadata field

### Tags Block Hidden When Tags Exist

> **Note:** This is a known behavior—the block hides if it can't find tags. This is intentional to keep pages clean.

**Check:**
- Verify the meta tag name is exactly `meta[name="tags"]`
- Check that the content attribute has non-empty values
- Ensure JavaScript is running and can access the meta tag
- Verify there are no JavaScript errors preventing tag reading

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

**Meta Tag Format**: `<meta name="tags" content="Tag1, Tag2, Tag3">`  
**Recommended Tag Count**: 3-8 tags per page  
**Tag Separator**: Comma (`,`)  
**Tag Display**: Blue rounded pills in horizontal row  
**Responsive Behavior**: Tags wrap to multiple lines on smaller screens  
**Empty State**: Block automatically hides if no tags found  
**Configuration Options**: None (auto-populated from metadata)

---

*Last Updated: January 2025*  
*For technical documentation, see the block's JavaScript and CSS files*  
*For AEM Universal Editor support, contact your AEM administrator*
