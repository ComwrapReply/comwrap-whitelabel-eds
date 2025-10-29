# Carousel Block - Author Guide

## Overview

The Carousel block allows you to showcase multiple pieces of content in an interactive, space-efficient slideshow format. Perfect for highlighting products, features, campaigns, or any content that benefits from visual storytelling.

---

## How to Add a Carousel

### Creating Your First Carousel in Universal Editor

**Step 1: Add the Carousel Block**
1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Carousel" from the block library
4. The carousel block will be inserted into your page

**Step 2: Add Slides**
1. Click on the carousel to select it
2. Use the "Add Slide" button or interface to add new slides
3. Add at least 2 slides (recommended: 3-6 slides)

**Step 3: Edit Slide Content**
For each slide, you can add:
- **Image**: Upload from DAM or select existing asset
- **Title**: Add as a heading (H2-H4 recommended)
- **Description**: Add text content using the rich text editor
- **Alt Text**: Always include descriptive alt text for images

**Step 4: Configure Options**
1. Select the carousel block
2. In the Properties panel, configure:
   - **Background Color**: Choose Default or Dark

**Step 5: Preview and Publish**
1. Preview your carousel using the preview mode
2. Test on different device sizes
3. Publish when ready

---

## Carousel Options

### Background Color
Available in the Properties panel:
- **Default**: Standard light background (default)
- **Dark**: Dark background with light text for contrast

### Navigation Options
- **No Arrows**: Hides previous/next navigation buttons
- **No Dots**: Hides dot indicators below carousel
- **Combined**: Can use both options together

---

## Content Guidelines

### Images

**Recommended Specifications:**
- **Size**: 1920x1080 pixels (16:9 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **File Size**: Under 200KB (AEM optimizes automatically)
- **Alt Text**: Always required for accessibility

**Best Practices:**
- Use high-quality images from AEM DAM
- Maintain consistent image style across slides
- Ensure images are relevant to slide content
- Add descriptive alt text for all images

### Titles

**Best Practices:**
- Keep titles short: 3-7 words ideal
- Use heading format (H2-H4)
- Be descriptive and compelling
- Use action-oriented language when appropriate

**Good Examples:**
- Transform Your Workflow
- Discover New Features
- Start Your Free Trial

**Avoid:**
- ❌ Very long titles
- ❌ Generic titles like "Slide 1"
- ❌ ALL CAPS text

### Descriptions

**Best Practices:**
- Keep concise: 1-2 short paragraphs maximum
- Focus on one key message per slide
- Use simple, direct language
- Include call-to-action when appropriate

### Slide Count

- **Minimum**: 2 slides required
- **Recommended**: 3-6 slides
- **Maximum**: 10 slides

---

## Writing Tips

### Do's ✅

- Use high-quality, relevant images
- Keep text concise and scannable
- Maintain consistent tone and style
- Include clear calls-to-action
- Test on mobile devices
- Use descriptive alt text
- Proofread all content
- Consider your audience

### Don'ts ❌

- Don't use too many slides (3-6 recommended)
- Don't include walls of text
- Don't use low-quality images
- Don't forget alt text
- Don't mix design styles
- Don't use unrelated slides

---

## How Users Will Experience Your Carousel

### Desktop Experience
- Navigation arrows on both sides
- Dot indicators below slides
- Auto-advances every 6 seconds
- Pause/play control available
- Keyboard arrow keys work for navigation

### Mobile Experience
- Swipe left/right to navigate
- Touch-friendly controls
- Optimized for smaller screens
- Images automatically resize

### Accessibility Features
- Screen reader support
- Keyboard accessible
- High contrast focus indicators
- Respects motion preferences

### Auto-Play Behavior
- Advances every 6 seconds
- Pauses on user interaction
- Resumes after 3 seconds inactivity
- Only plays when visible (performance)
- Disabled in Universal Editor

---

## Common Questions

### Q: How many slides should I include?
**A:** 3-6 slides recommended. Maximum is 10, but too many slides may lose user interest.

### Q: What if my images are different sizes?
**A:** AEM automatically optimizes images. For best results, use 1920x1080px (16:9 ratio).

### Q: Can I include videos in slides?
**A:** Currently supports images and text only. Video support may be added in future updates.

### Q: How do I preview my carousel?
**A:** Use Universal Editor preview mode to see changes immediately or test in a new tab.

### Q: Can I change the auto-play speed?
**A:** Default is 6 seconds and cannot be changed in Universal Editor. Contact development team for customization.

### Q: Why isn't my carousel auto-playing in the editor?
**A:** Auto-play is intentionally disabled in Universal Editor. It works normally on published pages.

### Q: How do I change the background color?
**A:** Select the carousel block, then in Properties panel choose "Default" or "Dark" under "Carousel background color".

### Q: Can I have multiple carousels on one page?
**A:** Yes, each carousel operates independently.

### Q: How do I reorder or delete slides?
**A:** Use the slide management interface in Universal Editor (drag-and-drop or use arrows/icons).

---

## Troubleshooting

### Carousel not showing on published page
- Have you published your changes?
- Is the carousel configured with at least 2 slides?
- Try clearing browser cache
- Contact development team if issue persists

### Images not displaying
- Are images selected from AEM DAM?
- Do you have permissions to access images?
- Are images published?
- Try re-selecting image from DAM

### Can't edit carousel
- Check edit permissions
- Is page locked by another user?
- Try refreshing Universal Editor
- Log out and back in

### Changes not saving
- Check for error messages
- Ensure stable internet connection
- Try smaller incremental changes
- Check permissions

### Auto-play not working in editor
**Note:** Auto-play is disabled in Universal Editor by design. Test on published page.

### Background color option not visible
- Select the carousel block (not individual slides)
- Look in Properties panel under "Carousel background color"
- Ensure you've run build script (`npm run build:json`)

---

## Tips for Success

### Start Simple
Begin with 3 slides to get comfortable. Add complexity later.

### Think Mobile-First
Many users view on mobile. Keep content concise and images clear at smaller sizes.

### Tell a Story
Arrange slides in logical sequence. Each slide should lead naturally to the next.

### Test Before Publishing
Preview and navigate through all slides. Test on different devices if possible.

### Update Regularly
Keep content fresh with seasonal updates, new products, or updated statistics.

### Less is More
A focused 3-4 slide carousel is often more effective than a lengthy one.

### Choose the Right Background
- **Default**: Best for light content and most use cases
- **Dark**: Use for dramatic effect or when you need high contrast

---

*Last Updated: October 2025*
*For technical documentation, see README.md*
*For AEM Universal Editor support, contact your AEM administrator*
