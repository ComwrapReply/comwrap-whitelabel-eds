# Quote Block - Author Guide

## Overview

The Quote block allows you to display memorable quotes, testimonials, or highlighted text with an attribution. Perfect for showcasing customer testimonials, expert insights, or emphasizing key messages.

---

## How to Add a Quote

### Creating Your First Quote in Universal Editor

**Step 1: Add the Quote Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Quote" from the block library
4. The quote block will be inserted into your page

**Step 2: Add Quote Content**

1. Click on the quote block to select it
2. In the Properties panel, you'll see two main fields:
   - **Quote**: The main quote text
   - **Author**: The person or source of the quote

**Step 3: Edit Content**

For this component, you can add:
- **Quote**: Rich text content with formatting options
- **Author**: Attribution text (name, title, company, etc.)

**Step 4: Configure Options**

1. Select the quote block
2. In the Properties panel, configure:
   - **Background Styles**: Choose from Default, Highlight, Dark, or Light

**Step 5: Preview and Publish**

1. Preview your quote using the preview mode
2. Test on different device sizes
3. Publish when ready

---

## Quote Options

### Background Styles

Available in the Properties panel:
- **Default**: Light blue background with subtle styling (default option)
- **Highlight**: Yellow/gold gradient background with enhanced emphasis
- **Dark**: Dark background with light text for high contrast
- **Light**: Light gray background with subtle border

### Visual Differences

- **Default**: Soft blue tinted background (`rgb(201 232 251 / 30%)`)
- **Highlight**: Warm gradient with gold/yellow tones and left border accent
- **Dark**: Dark gradient background with light text, ideal for dramatic quotes
- **Light**: Clean light background with subtle border and accent line

---

## Content Guidelines

### Quote Text

**Best Practices:**
- **Length**: Keep quotes concise and impactful (1-3 sentences ideal)
- **Format**: Use the rich text editor to format important words or phrases
- **Style**: Use italics for emphasis when appropriate
- **Tone**: Match the tone to your content and audience

**Good Examples:**
- "The only way to do great work is to love what you do."
- "Innovation distinguishes between a leader and a follower."
- "Success is not final, failure is not fatal: it is the courage to continue that counts."

**Avoid:**
- ❌ Extremely long quotes (over 2-3 sentences)
- ❌ Quotes without attribution
- ❌ Generic or clichéd phrases
- ❌ Quotes that don't match your brand voice

### Author Attribution

**Best Practices:**
- **Length**: Keep author attribution concise
- **Format**: Include name, and optionally title or company
- **Style**: Use proper capitalization and punctuation
- **Credibility**: Only attribute quotes to real people or legitimate sources

**Good Examples:**
- Steve Jobs
- Jane Smith, CEO
- Dr. Sarah Johnson, Lead Researcher
- Customer Name, Company Name

**Avoid:**
- ❌ Anonymous or "Anonymous Customer"
- ❌ Fictional attributions
- ❌ Very long attributions (keep to 1-2 lines)
- ❌ Missing attribution altogether

---

## Writing Tips

### Do's ✅

- Use authentic, meaningful quotes
- Keep quotes concise and memorable
- Include proper attribution
- Choose background style that matches content tone
- Format important words or phrases for emphasis
- Use quotes that support your page's message
- Verify quote accuracy and attribution
- Consider cultural and contextual appropriateness

### Don'ts ❌

- Don't use quotes without attribution
- Don't fabricate or misattribute quotes
- Don't use extremely long quotes
- Don't use quotes that contradict your brand values
- Don't mix different quote styles on the same page unnecessarily
- Don't use quotes just to fill space

---

## How Users Will Experience Your Quote

### Desktop Experience

- Quote appears in a styled block with prominent quotation mark
- Text is large and easily readable
- Author attribution appears below the quote, right-aligned
- Background styling provides visual emphasis
- Smooth transitions and hover effects (if applicable)

### Mobile Experience

- Quote adapts to mobile screen sizes
- Text remains readable and well-spaced
- Author attribution maintains proper alignment
- Background styles work effectively on small screens
- Touch-friendly for reading

### Accessibility Features

- Semantic HTML structure with `<blockquote>` element
- Proper text contrast based on background style
- Screen reader friendly with clear quote and attribution structure
- Keyboard accessible
- Supports high contrast mode preferences

### Visual Styling

Each background style option creates a distinct visual experience:
- **Default**: Subtle, professional appearance
- **Highlight**: Eye-catching and attention-grabbing
- **Dark**: Dramatic and sophisticated
- **Light**: Clean and minimal

---

## Common Questions

### Q: How long should my quote be?
**A:** Keep quotes concise (1-3 sentences) for maximum impact. Longer quotes can work but may lose reader attention.

### Q: Can I format the quote text?
**A:** Yes! Use the rich text editor to format text, add emphasis, or include links within your quote if needed.

### Q: Do I need to include an author?
**A:** While not technically required, including attribution adds credibility and context to your quote.

### Q: Can I use quotes from multiple authors on the same page?
**A:** Yes, you can add multiple quote blocks on a page with different authors and styles.

### Q: What's the difference between the background style options?
**A:** Each option provides different visual emphasis:
- **Default**: Subtle blue background
- **Highlight**: Gold/yellow gradient with warm tones
- **Dark**: Dark background with light text
- **Light**: Light gray with minimal styling

### Q: Can I change the quote styling after publishing?
**A:** Yes, you can edit the quote content, author, and background style at any time in Universal Editor.

### Q: Why isn't my quote showing the formatting I added?
**A:** Make sure you're using the rich text editor properly. Some formatting may be limited by the component's design.

### Q: Can I use quotes in different languages?
**A:** Yes, the quote block supports content in any language. Just ensure the background style you choose works well with the text.

### Q: Should I use the same background style for all quotes on a page?
**A:** Not necessarily, but consistency helps. Use different styles purposefully to create visual hierarchy or emphasize specific quotes.

---

## Troubleshooting

### Quote not showing on published page

**Check:**
- Have you published your changes?
- Is the quote block properly configured with content?
- Try clearing browser cache
- Verify the block name is exactly "Quote" in content

### Author attribution not displaying

**Check:**
- Is the Author field filled in the Properties panel?
- Does the author text have any special characters that might cause issues?
- Try re-entering the author information

### Background style not applying

**Check:**
- Have you selected a background style in the Properties panel?
- Ensure you've saved your changes
- Try selecting the block and reapplying the style
- Verify you've run the build script (`npm run build:json`) if you recently modified options

### Can't edit quote

**Check:**
- Check edit permissions
- Is the page locked by another user?
- Try refreshing Universal Editor
- Log out and back in

### Changes not saving

**Check:**
- Check for error messages
- Ensure stable internet connection
- Try saving in smaller increments
- Check permissions
- Verify the quote field contains valid content

### Quote text not formatting correctly

**Check:**
- Are you using the rich text editor tools correctly?
- Try removing and re-adding formatting
- Some advanced formatting may not be supported

### Background color option not visible

**Check:**
- Select the quote block (click on it)
- Look in Properties panel under "Background Styles"
- Ensure you've run build script (`npm run build:json`) if customizations were made

---

## Tips for Success

### Choose the Right Style
Match your background style to your content:
- Use **Default** for general, professional quotes
- Use **Highlight** for important testimonials or key messages
- Use **Dark** for dramatic, impactful quotes
- Use **Light** for subtle emphasis without distraction

### Keep It Authentic
Use real quotes from real people. Authenticity builds trust and credibility with your audience.

### Strategic Placement
Place quotes strategically on your page to:
- Break up long text blocks
- Emphasize key messages
- Build social proof with testimonials
- Highlight expert insights

### Maintain Consistency
While you can mix styles, maintaining consistency across similar types of quotes (like all testimonials) creates a cohesive experience.

### Quality Over Quantity
One well-chosen, impactful quote is better than multiple generic ones. Choose quotes that truly support your message.

### Consider Context
Ensure your quote makes sense in the context of surrounding content. Quotes should enhance, not interrupt, the user's reading experience.

### Format Thoughtfully
Use rich text formatting sparingly. Over-formatting can distract from the quote's message. Bold or italicize only the most important parts.

### Test Responsiveness
Always preview your quotes on different device sizes to ensure they display well and remain readable.

---

## Quick Reference

**Recommended Quote Length**: 1-3 sentences  
**Author Attribution**: Required for credibility  
**Available Background Styles**: Default, Highlight, Dark, Light  
**Maximum Quotes per Page**: No limit, but use strategically  
**Rich Text Formatting**: Supported in quote field  
**Mobile Optimization**: Automatic

---

*Last Updated: December 2024*  
*For technical documentation, see quote-developer-guide.md*  
*For AEM Universal Editor support, contact your AEM administrator*

