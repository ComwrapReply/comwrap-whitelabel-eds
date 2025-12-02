Modal - Author Guide

---

## Overview

The `Modal` block lets you show additional information in a popup dialog when a visitor clicks a link or button. It is ideal for things like legal text, terms and conditions, detailed explanations, or reusable content fragments that should not clutter the main page.

This guide covers creating and managing `Modal` blocks in AEM Universal Editor with Edge Delivery Services (EDS).

---

## How to Add a Modal

### Creating Your First Modal in Universal Editor

**Step 1: Add the Modal Block**

1. Open your page in Universal Editor.
2. Click the `+` button to add a new component.
3. Search for or select `Modal` from the block library.
4. The `Modal` block will be inserted into your page as a simple table with fields for the reference and trigger text.

**Step 2: Select the Modal Content Reference**

1. Select the `Modal` block on the page.
2. In the table, locate the `Modal Content Reference` field.
3. Use the content picker to choose the page or fragment that should appear inside the modal.
4. Confirm your selection so the reference path is saved.

**Step 3: Edit the Trigger Text**

1. In the `Trigger Link Text` field (second cell/row), enter the text you want visitors to click.
2. Examples: `Read more`, `View terms`, `Open details`.
3. If you leave this empty, the default label `Open Modal` will be used.

**Step 4: Configure Style Options**

1. With the `Modal` block selected, open the Properties panel.
2. Under `Style`, choose how the trigger should look:
   - `link` (default): renders as a standard text link.
   - `button`: allows you to style the trigger as a button when used inside button‑styled sections.

**Step 5: Preview and Publish**

1. Use Preview mode to test the `Modal` block:
   - Click the trigger link or button.
   - Confirm the dialog opens and shows the correct content.
   - Click the close icon or outside the dialog to close it.
2. Check the behavior on different device sizes (desktop, tablet, mobile).
3. Publish the page when you are satisfied with the result.

---

## Modal Options

### Style

Available in the Properties panel via the `Style` (classes) field:

- **link**:  
  - Default mode.  
  - The trigger appears as a text link, typically underlined and following your site’s link styling.

- **button**:  
  - Use when the trigger should visually behave like a button (for example, inside a CTA area).  
  - Combine with surrounding layout or button styling to achieve the desired look.

There are no additional layout or color options specific to the `Modal` block; it inherits colors and typography from your site’s theme.

---

## Content Guidelines

### Modal Content (Referenced Fragment or Page)

The `Modal` block does not store the actual content; instead it points to another page or fragment. That referenced content is what your visitors see inside the popup.

**Recommended Content Types:**

- Short articles or descriptions that support the main page.
- Legal information (privacy, terms, disclaimers).
- Extra help text, FAQs, or instructions.
- Reusable fragments that may be used in multiple modals.

**Best Practices:**

- Keep modal content focused on a single topic.
- Avoid very long pages inside the modal; use headings and short paragraphs.
- Ensure the referenced fragment has a clear title and structure.
- Do not include another `Modal` block inside the referenced content to avoid confusing nested dialogs.

### Titles and Headings

Inside the referenced fragment:

**Best Practices:**

- Use a clear heading at the top of the fragment (for example, an H2 title).
- Keep headings short and descriptive (3–7 words).
- Match the heading text to the trigger text if possible, so users see a clear connection.
- Use a logical heading hierarchy for any sub‑sections.

**Good Examples:**

- `Terms & Conditions`
- `More About This Product`
- `How We Use Your Data`

**Avoid:**

- ❌ Vague headings like `More Info` without context.  
- ❌ Using multiple top‑level headings that confuse the main topic.  
- ❌ All‑caps or shouty headings that look aggressive.

### Descriptions and Body Text

**Best Practices:**

- Length: aim for 1–3 short paragraphs per modal.
- Focus: cover one task or concept per modal to keep it easy to scan.
- Language: use clear, plain language and avoid internal jargon.
- Action: if the modal should lead to a next step, end with a short call to action or clear conclusion.

### Trigger Links and Buttons

The text of the trigger link or button sets expectations for visitors.

**Guidelines:**

- Use action‑oriented text that clearly describes what will open:
  - `View terms and conditions`
  - `Read more about privacy`
  - `See full details`
- Avoid generic text like `Click here` or `More` without context.
- Make sure trigger text matches the actual modal content (title and topic).
- Use only one modal trigger per logical topic to avoid duplication.

---

## Writing Tips

### Do’s ✅

- Use the `Modal` block for secondary details that support the main content.
- Keep the referenced content short and easy to scan.
- Make trigger text clear and specific about what will appear.
- Use headings and lists in the fragment to structure information.
- Test the modal on mobile devices to ensure readability and easy closing.

### Don’ts ❌

- Don’t hide essential or mandatory information solely inside a modal.
- Don’t put very long articles or multi‑step flows inside a modal.
- Don’t use multiple nested modals from the same trigger.
- Don’t use unclear trigger text like `Click here` or `More`.
- Don’t rely on the modal for navigation; it should be informational, not a full page replacement.

---

## How Users Will Experience Your Modal

### Desktop Experience

- Users see a link or button in your content.
- When they click it, a centered dialog appears on top of the page with a darkened background.
- The rest of the page is dimmed, and scrolling is locked while the modal is open.
- Users can:
  - Read the content.
  - Scroll inside the modal if the content is longer than the viewport.
  - Close the modal using the `X` icon or by clicking outside the dialog.

### Mobile Experience

- On small screens, the modal fills most of the viewport.
- Users can scroll vertically inside the modal content area.
- The main page underneath does not scroll while the modal is open.
- The close button is positioned in the top‑right corner of the popup.
- It should remain easy to reach with a thumb on touch devices.

### Accessibility Features

- Modal uses the native HTML `dialog` element which:
  - Supports keyboard navigation and Escape‑key closing in modern browsers.
  - Helps screen readers understand that a dialog has opened.
- The close button includes an accessible label (`Close`) for screen readers.
- Visible focus styling is provided for the close button, helping keyboard users.
- The implementation respects the user’s `prefers-reduced-motion` setting.

### Modal-Specific Behavior

- The modal always loads the latest version of the referenced content when opened.
- If the reference is missing or invalid, the block shows a simple error text in edit/preview (`Modal: No reference path`).
- Only one dialog is created per click; duplicate dialogs during rapid clicks are prevented.

---

## Common Questions

### Q: Why is my Modal showing `Modal: No reference path`?
**A:** The block does not have a valid `Modal Content Reference`. Edit the block, open the content picker for the reference field, and select a valid page or fragment. Save and preview again.

### Q: Can I use the same fragment in multiple Modals?
**A:** Yes. You can point multiple `Modal` blocks to the same fragment. This is a good way to reuse legal text or other shared information.

### Q: How do I change the text of the trigger link?
**A:** In the `Trigger Link Text` field of the `Modal` block, edit the text to the label you want (for example, `View details`). The change will appear on the page after you save.

### Q: Can I make the Modal trigger look like a button?
**A:** Yes. In the Properties panel, set the `Style` option to `button` and place the block in a context that styles it as a button. Your project’s design system may add additional button styling.

### Q: Why does the page stop scrolling when the Modal is open?
**A:** This is intentional. While the modal is open, the background page is locked to keep the user focused on the dialog content and prevent scrolling behind the popup.

### Q: The Modal content looks cramped. How can I improve it?
**A:** Edit the referenced fragment or page and:
- Add a clear heading at the top.
- Use paragraphs and lists instead of long blocks of text.
- Avoid large margins that conflict with the modal’s own padding.

### Q: Does the Modal work the same in Universal Editor and on the live site?
**A:** Behavior is very similar in both. In Universal Editor, some browser features may behave slightly differently due to the editor frame, but opening and closing the modal, as well as loading the referenced content, should mirror the live site.

### Q: What happens if the referenced fragment is deleted?
**A:** The modal will no longer be able to load that content. You should update the `Modal Content Reference` field to point to a new or existing fragment. Always re‑check Modals after moving or deleting referenced pages.

---

## Troubleshooting

### Problem 1: Modal does not open when I click the trigger

**Check:**
- Ensure the `Modal` block has a valid `Modal Content Reference`.
- Confirm that the referenced fragment or page is published and accessible.
- Preview the page (not just the editor thumbnail) and try again.
- If it still does not open on the live site, contact your technical team to check for JavaScript errors.

### Problem 2: The wrong content appears in the Modal

**Check:**
- Verify the path in the `Modal Content Reference` field.
- Open the referenced fragment directly in a new tab to confirm its content.
- If someone recently updated or moved the fragment, re‑select it in the content picker.
- Clear your browser cache if you suspect stale content.

### Problem 3: I can’t edit the Modal’s trigger text

**Check:**
- Make sure you are selecting the `Modal` block itself, not only the surrounding section.
- Edit the `Trigger Link Text` cell in the block’s table view.
- If the text is coming from an older version of the block, try reloading the editor and editing again.

### Problem 4: The Modal looks broken on mobile

**Check:**
- Preview the page in mobile mode from Universal Editor or your browser dev tools.
- Ensure the fragment content is not too wide (for example, avoid very wide tables or fixed‑width elements).
- Reduce the amount of content or split it into simpler sections if necessary.

### Problem 5: The Style option is not visible in Properties

**Check:**
- Confirm that you have selected the `Modal` block, not a child element.
- If your project uses different naming or a customized model, the option may be under a different label; contact your AEM administrator if you cannot find it.

### Problem 6: Changes to the fragment are not reflected in the Modal

**Check:**
- Make sure the fragment is saved and published.
- Refresh the preview page to ensure you see the latest version.
- If using browser caching, try a hard refresh or opening in a private window.

---

## Tips for Success

### Keep Modals Focused
Use each modal for one clear topic, such as a single policy, explanation, or help section. If you need to communicate multiple unrelated topics, create separate modals.

### Use Clear Trigger Labels
Make the trigger text descriptive so users understand what they will see. For example, `Read cookie policy` is better than `More info`.

### Reuse Fragments Wisely
For content that appears in multiple places (like terms and conditions), store it in a dedicated fragment and reuse that fragment in multiple `Modal` blocks. This keeps content consistent and easier to maintain.

### Test on All Devices
Always check how your modal looks and behaves on desktop, tablet, and mobile. Ensure that text is readable, the close button is easy to tap, and scrolling works as expected.

### Avoid Overuse
Modals can be helpful, but too many popups on a single page can be distracting. Use them only when they genuinely improve clarity or usability.

### Coordinate with Design
If you plan to style the trigger as a button or use modals in key journeys (like sign‑ups), coordinate with your design and UX teams to keep the experience consistent with the rest of the site.

### Consider Accessibility
Make sure the fragment content uses proper headings, lists, and alt text for images. Screen reader users should understand the modal’s purpose and be able to read the content easily.

---

## Quick Reference

**Content Source**: Separate page or fragment selected via `Modal Content Reference`  
**Trigger Text**: Configured in `Trigger Link Text` (defaults to `Open Modal` if empty)  
**Style Options**: `link` (default) or `button` for the trigger appearance  
**Recommended Content Length**: 1–3 short paragraphs plus a heading  
**Use Cases**: Legal text, help content, detailed explanations, reusable fragments  

---

Last Updated: March 2025  
For technical details, see the `modal` developer guide.  
For AEM Universal Editor support, contact your AEM administrator.


