# Separator Block - Author Guide

## Overview

The Separator block is a minimal decorative component used to visually separate content sections on your page. It provides a clean, professional way to break up different areas of your page with a thin horizontal line.

---

## How to Add a Separator

### Creating Your First Separator in Universal Editor

**Step 1: Add the Separator Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Separator" from the block library
4. The separator block will be inserted into your page

**Step 2: Configure Color Option**

1. Select the separator block
2. In the Properties panel, configure:
   - *Color: Choose from Transparent, Blue, or Grey*

**Step 3: Preview and Publish**

1. Preview your separator using the preview mode
2. Test on different device sizes
3. Publish when ready

---

## Separator Options

### Color Options

Available in the Properties panel:
- **Transparent**: Creates a very subtle, barely visible line that provides minimal visual separation (default)
- **Blue**: A vibrant blue separator line (2px height) using the primary brand color
- **Grey**: A dark grey separator line (2px height) for a more subtle but visible division

---

## Content Guidelines

The Separator block is a purely visual element and does not contain editable content. It automatically creates a thin line that spans the full width of your content area.

**Best Practices:**
- Use separators to break up long sections of content
- Place between different topics or sections
- Use sparingly - too many separators can clutter the page
- Choose the color that best matches your page design

---

## Writing Tips

### Do's ✅

- Use separators to clearly separate different content sections
- Choose colors that complement your page design
- Place separators strategically between major content areas
- Test spacing visually in the editor
- Consider the visual hierarchy of your page

### Don'ts ❌

- Don't overuse separators - too many can make the page cluttered
- Don't use separators as a replacement for proper content structure
- Don't place separators too close together
- Don't forget to preview on different screen sizes

---

## How Users Will Experience Your Separator

### Desktop Experience

- Full-width separator line spanning the content area
- 4rem vertical margin above and below the separator
- Clear visual separation between content sections
- Color chosen appears as a 1-2px line depending on selection

### Mobile Experience

- Same full-width behavior
- Maintains visual hierarchy and spacing
- Responsive design ensures proper display

### Accessibility Features

- Semantic HTML structure
- Minimal visual impact for users with screen readers
- Does not interfere with keyboard navigation
- High contrast support through color options

### Editor Mode Behavior

- In Universal Editor, the separator has additional padding (2rem vertical) to make it easier to select and edit
- The padding is only visible in editor mode and does not appear on published pages
- This ensures content authors can easily identify and modify the separator block

---

## Common Questions

### Q: What's the difference between the three color options?
**A:** 
- **Transparent**: A very subtle, barely visible line for minimal separation
- **Blue**: A vibrant 2px blue line using the primary brand color
- **Grey**: A subtle but visible 2px dark grey line

### Q: Can I add text or content to the separator?
**A:** No, the separator is a purely visual element designed only for visual separation. If you need text, consider using a Headline or Text block instead.

### Q: Why does the separator look larger in Universal Editor?
**A:** The separator has extra padding (2rem vertical) in editor mode to make it easier to select and edit. This padding only appears in the editor and won't be visible on published pages.

### Q: How do I change the separator color?
**A:** Select the separator block, then in the Properties panel choose your desired color option (Transparent, Blue, or Grey).

### Q: Can I adjust the thickness or style of the separator?
**A:** The thickness is fixed at 1px for transparent and 2px for colored options. Style customization beyond color selection is not available through Universal Editor.

### Q: Where should I place separators on my page?
**A:** Use separators between major content sections, after headings, or between different topics. Avoid placing them too close together or using them excessively.

### Q: Does the separator work on mobile devices?
**A:** Yes, the separator is fully responsive and maintains its appearance across all device sizes.

### Q: What spacing does the separator provide?
**A:** The separator has 4rem (approximately 64px) of vertical margin above and below, providing clear visual separation between content sections.

---

## Troubleshooting

### Separator not showing on published page

**Check:**
- Have you published your changes?
- Is the separator block configured in the page?
- Try clearing browser cache
- Verify the block is added to a section

### Color option not visible

**Check:**
- Select the separator block (not just clicking the page)
- Look in Properties panel under "Color"
- Ensure you've run build script (`npm run build:json`)
- Refresh Universal Editor

### Separator looks too large in editor

**Note:** The separator has intentional padding (2rem vertical) in Universal Editor to make it easier to select. This padding does not appear on published pages - only the thin separator line with its normal margins will be visible.

### Can't select the separator

**Check:**
- Click directly on the separator block area
- Look for the block outline/border in editor mode
- Try refreshing Universal Editor
- Ensure you have edit permissions

### Color not changing

**Check:**
- Have you selected the separator block?
- Are you looking in the Properties panel (not Content panel)?
- Try saving and refreshing
- Verify the color option was saved

### Separator spacing seems too large/small

**Check:**
- The separator has fixed 4rem vertical margins
- Spacing cannot be customized through Universal Editor
- This spacing is intentional for clear visual separation
- Contact development team if different spacing is needed

### Separator appears as a large colored bar in editor

**Note:** In editor mode, the block container has padding to make selection easier. On published pages, only the thin separator line (1-2px) will be visible with the proper margins. This is intentional design behavior.

---

## Tips for Success

### Strategic Placement

Place separators between major content sections to create clear visual breaks and improve readability.

### Color Selection

- **Transparent**: Use when you want subtle separation without visual weight
- **Blue**: Use to match brand colors and add visual interest
- **Grey**: Use when you want visible separation without strong color contrast

### Visual Hierarchy

Use separators to reinforce your page's visual hierarchy by clearly delineating different sections and topics.

### Content Flow

Think about how separators affect the flow of your content. They should help guide readers, not interrupt them.

### Test Your Design

Preview your page with separators to ensure they enhance rather than clutter your layout.

### Less is More

A few well-placed separators are more effective than many separators scattered throughout the page.

### Consider Your Audience

Choose separator colors that work well with your overall page design and brand guidelines.

---

## Quick Reference

**Available Colors**: Transparent, Blue, Grey  
**Height**: 1px (transparent) or 2px (colored options)  
**Width**: 100% of content area  
**Vertical Margin**: 4rem (64px) above and below  
**Editor Padding**: 2rem vertical (editor mode only)  
**Content**: None - purely visual element

---

*Last Updated: December 2024*  
*For technical documentation, see README.md*  
*For AEM Universal Editor support, contact your AEM administrator*

