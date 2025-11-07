## How to Add an Accordion

> Provide step-by-step instructions for adding this component in Universal Editor.

### Creating Your First Accordion in Universal Editor

**Step 1: Add the Accordion Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Accordion" from the block library
4. The Accordion container will be inserted into your page

**Step 2: Add Accordion Items**

1. Select the Accordion block
2. Click "+" inside the Accordion to add an "Accordion Item"
3. Repeat to add as many items as needed

**Step 3: Edit Content**

For this component, you can add:
- **Accordion Title (Container)**: Optional heading for the whole accordion
- **Accordion Item Title**: The clickable heading for each item
- **Accordion Item Content**: Rich text content (paragraphs, lists, links)
- **Image + Alt Text (Item)**: Optional visual for the item
- **CTA (Item)**: Button link, text, and style (Primary/Secondary)
- **Layout (Item)**: Image Left/Right/Top/Bottom
- **Initially Open (Item)**: Toggle to open an item by default

**Step 4: Configure Options**

1. Select the Accordion block (container)
   - "Accordion Title": Optional text shown above the items
2. Select an Accordion Item
   - "Accordion Item Title": Required
   - "Accordion Item Content": Rich text body
   - "Image": Optional asset reference
   - "Image Alt Text": Recommended when image is used
   - "Button Link" and "Button Text": Optional CTA
   - "Button Style": Primary or Secondary
   - "Accordion Layout": Image Left/Right/Top/Bottom
   - "Initially Open": Opens this item on page load

**Step 5: Preview and Publish**

1. Preview your Accordion using the preview mode
2. Test expand/collapse behavior on different device sizes
3. Publish when ready

---

## Accordion Options

> Document all available configuration options for this component.

### Container (Accordion)
- **Accordion Title** (string): Optional heading for the group

### Item (Accordion Item)
- **Accordion Item Title** (string): Required label for the trigger
- **Accordion Item Content** (richtext): Body content displayed when open
- **Image** (reference): Optional image for the item
- **Image Alt Text** (string): Alternate text for accessibility
- **Button Link** (aem-content): URL for CTA
- **Button Text** (string): CTA label
- **Button Style** (select): "primary" or "secondary"
- **Accordion Layout** (select): "image-left", "image-right", "image-top", "image-bottom"
- **Initially Open** (boolean): If enabled, the item is expanded on load

---

## Content Guidelines

### Images

**Recommended Specifications:**
- **Size**: At least 750px width (component optimizes responsive sizes)
- **Format**: JPG, PNG, WebP
- **File Size**: Keep under 300KB where possible
- **Alt Text**: Provide meaningful description of the image

**Best Practices:**
- Choose images that reinforce the item’s content
- Keep visuals consistent across items
- Avoid text-heavy images; prefer real text in content
- Provide relevant, concise alt text

### Titles/Headings

**Best Practices:**
- **Length**: 3–7 words is ideal
- **Format**: Use clear, scannable phrasing
- **Style**: State the benefit or topic (e.g., "Key Features")
- **Tone**: Direct and informative

**Good Examples:**
- Pricing FAQs
- What’s Included
- Product Specifications

**Avoid:**
- ❌ Vague labels like "Item 1"
- ❌ Overly long sentences
- ❌ All-caps or shouty titles

### Descriptions/Body Text

**Best Practices:**
- **Length**: 1–2 short paragraphs per item
- **Focus**: One key idea per item
- **Language**: Clear, concise, and user-focused
- **Action**: Use a CTA when helpful (e.g., "Learn more")

### Links/Buttons

- Use descriptive button text (e.g., "Download Brochure")
- Choose Primary for main actions; Secondary for secondary actions
- Ensure links are accessible and keyboard focusable

---

## Writing Tips

### Do's ✅

- Write clear, specific item titles
- Keep content concise and scannable
- Use images only when they add value
- Provide alt text for images
- Use CTAs sparingly and purposefully

### Don'ts ❌

- Overload items with long text blocks
- Duplicate content across items
- Use vague button labels like "Click here"
- Add multiple primary CTAs per item
- Depend on images to convey critical information

---

## How Users Will Experience Your Accordion

### Desktop Experience

- Users click item headers to expand/collapse content
- Only the selected item’s content is revealed (others remain as authored)
- Optional images appear per the chosen layout (left/right/top/bottom)
- CTA buttons render below the text content within each item

### Mobile Experience

- Touch targets are large and easy to tap
- Items stack vertically; content collapses to save space
- Images scale to the container with mobile-friendly spacing

### Accessibility Features

- Buttons use `aria-expanded` and `aria-controls`
- Panels use `role="region"` and `aria-labelledby`
- Keyboard operable: Tab to header, Enter/Space toggles panel
- Focus and semantics align with accessible disclosure patterns

### Component-Specific Behavior

- "Initially Open" expands the item on page load
- Layout class is applied to content to position image relative to text
- Images are optimized via project utilities for performance

---

## Common Questions

### Q: Can multiple items be open at once?
**A:** Yes. Each item toggles independently; open states are not mutually exclusive.

### Q: How do I make an item open by default?
**A:** Enable the "Initially Open" option on that item in the Properties panel.

### Q: Where do I place the image?
**A:** Add it to the item’s Image field; choose the layout to position it left, right, top, or bottom.

### Q: Why isn’t my button showing?
**A:** Ensure both Button Link and Button Text are provided. Also choose a Button Style.

### Q: What heading level is used?
**A:** The component renders item headers as semantic headings and accessible buttons; heading level styling follows theme CSS.

### Q: Can I nest other blocks inside accordion content?
**A:** Use rich text for paragraphs, links, and simple markup. Complex nested blocks are not supported.

### Q: Why does an item look empty?
**A:** Remove empty placeholder rows and ensure the item has at least a title or content.

---

## Troubleshooting

### Accordion not showing on published page

**Check:**
- Confirm the Accordion block is present (not removed during edits)
- Ensure at least one Accordion Item exists
- Republish the page after changes
- Verify no page-level CSS overrides hide `.accordion`

### Item content not displaying correctly

**Check:**
- Ensure the item has content in "Accordion Item Content"
- Verify the chosen layout suits your content (image sizes, text)
- Remove conflicting inline styles pasted from external sources
- Check that images resolve (no 404s)

### Can’t edit the component

**Check:**
- Select the container vs. a specific item as needed
- Open the Properties panel on the right
- Verify you have author permissions
- Reload the editor if fields don’t appear

### Changes not saving

**Check:**
- Click Save/Publish and wait for confirmation
- Resolve any validation warnings in the Properties panel
- Check connectivity and retry
- Refresh the page in the editor

### Initially Open not working

**Check:**
- Ensure the boolean is enabled on the correct item
- Avoid conflicting scripts or duplicate IDs in custom code

---

## Tips for Success

### Structure
Keep item titles short and content focused; use one idea per item.

### Imagery
Use images to complement text; avoid decorative-only images.

### CTAs
Limit to one primary action per item; secondary for less prominent actions.

### Performance
Keep images optimized; minimize heavy content in panels.

### Accessibility
Favor clear headings and ensure meaningful button text.

### Consistency
Use consistent layout choices across items for a cohesive look.

### Testing
- Test expand/collapse with keyboard
- Verify mobile spacing and tap targets
- Check links and CTAs

---

## Quick Reference

**Container Field**: Accordion Title (optional)
**Item Fields**: Title (required), Content (richtext), Image + Alt, CTA (link/text/style), Layout, Initially Open
**Layouts**: image-left, image-right, image-top, image-bottom
**CTA Styles**: primary, secondary
**A11y**: `aria-expanded`, `aria-controls`, `role=region`, `aria-labelledby`

---

*Last Updated: October 2025*  
*For technical details, see `accordion.js` and `_accordion.json`*


