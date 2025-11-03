## How to Add an Embed

> Provide step-by-step instructions for adding this component in Universal Editor.

### Creating Your First Embed in Universal Editor

**Step 1: Add the Embed Block**

1. Open your page in Universal Editor
2. Click the "+" button to add a new component
3. Search for or select "Embed" from the block library
4. The component will be inserted into your page

**Step 2: Configure the Embed**

1. Select the Embed block on the page
2. In the Properties panel, enter the embed URL (e.g., YouTube, Vimeo, Google Maps, etc.)
3. Choose an Aspect Ratio (16:9, 4:3, 1:1, 21:9, or Custom)
4. If you choose Custom, enter Width (px) and Height (px)

**Step 3: Edit Content**

For this component, you can add:
- **Embed URL**: The iframe source URL to display external content
- **Aspect Ratio**: Controls how the embed scales responsively
- **Custom Dimensions**: Width/Height in pixels (only when Aspect Ratio is set to Custom)

**Step 4: Configure Options**

1. Select the Embed block
2. In the Properties panel, configure:
   - "Embed URL": Paste a full URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
   - "Aspect Ratio": 16:9 (default), 4:3, 1:1, 21:9, or Custom
   - "Width (px)" and "Height (px)": Visible only when Aspect Ratio is Custom

**Step 5: Preview and Publish**

1. Preview your Embed using the preview mode
2. Test on different device sizes
3. Publish when ready

---

## Embed Options

> Document all available configuration options for this component.

Available in the Properties panel:
- **Embed URL** (string): The source URL to embed (e.g., YouTube/Vimeo/Maps)
- **Aspect Ratio** (select): 16-9, 4-3, 1-1, 21-9, custom
- **Width (px)** (number): Used when Aspect Ratio = custom
- **Height (px)** (number): Used when Aspect Ratio = custom

Notes:
- If "custom" is selected, the iframe is rendered with the exact pixel dimensions you provide.
- For all other ratios, the embed is responsive and fills the container maintaining the chosen ratio.

---

## Content Guidelines

### URLs (Required)

**Recommended Specifications:**
- **Format**: Full HTTPS URL preferred (e.g., https://...)
- **Provider**: Use provider-specific embed URLs when applicable (e.g., YouTube `/embed/` URLs)
- **Accessibility**: Ensure embedded content has meaningful titles or labels within the provider

**Best Practices:**
- Prefer privacy-enhanced/embed endpoints when available
- Verify the provider allows embedding (some sites block iframes)
- Avoid query parameters that expose PII
- Test the URL in a published page as some providers restrict localhost/editor contexts

### Titles/Headings (Optional, in surrounding content)

**Best Practices:**
- **Length**: Keep short (3–7 words)
- **Format**: Use appropriate heading levels (H2–H4) before the embed, if context is needed
- **Style**: Describe what the embed shows (e.g., "Product Demo Video")
- **Tone**: Clear and descriptive

### Descriptions/Body Text (Optional, in surrounding content)

**Best Practices:**
- **Length**: 1–2 concise sentences
- **Focus**: Explain the purpose of the embedded content
- **Language**: Simple and direct
- **Action**: Provide a CTA if relevant (e.g., "Watch the full tutorial")

### Links/Buttons (Optional, in surrounding content)

- Consider adding a text link as an alternative (e.g., "Open video on YouTube")
- Use clear labels and set `target`/`rel` as needed
- Ensure focus and keyboard access for any surrounding interactive elements

---

## Writing Tips

### Do's ✅

- Use the correct provider embed URL format
- Choose the aspect ratio that matches your media source
- Provide custom dimensions only when necessary
- Add contextual heading/description around the embed if needed
- Test on mobile, tablet, and desktop

### Don'ts ❌

- Paste non-embed watch URLs when an embed URL is required
- Mix custom dimensions with non-custom aspect ratios
- Embed content that violates provider terms or is blocked by X-Frame-Options
- Rely only on the embed for key information without context
- Ignore accessibility (keyboard focus, visual clarity)

---

## How Users Will Experience Your Embed

### Desktop Experience

- The embed scales to the chosen aspect ratio within the content column
- For responsive ratios, the iframe fills the container and maintains the ratio
- If Custom is used, the iframe renders at the pixel size you set
- Focus styles are applied when the iframe receives keyboard focus

### Mobile Experience

- The embed is responsive and scales to the viewport width
- Rounded corners and spacing adapt per mobile styles
- Custom dimensions may introduce horizontal scrolling—prefer responsive ratios on mobile

### Accessibility Features

- Iframe includes `title` attribute for screen readers
- Visible focus outline when the iframe is focused
- High contrast and reduced motion modes supported via CSS

### Component-Specific Behavior

- URL validation: shows an inline error if the URL is missing or not allowed
- Optional whitelisting: project can restrict allowed hostnames (YouTube, Vimeo, etc.)
- Lazy loading: iframes use `loading="lazy"` for performance

---

## Common Questions

### Q: Which URLs are supported?
**A:** Any valid HTTPS URL. The project may optionally whitelist domains (e.g., YouTube, Vimeo, Maps). If restricted, unsupported domains won’t render.

### Q: Why is my embed not showing in the editor but works on publish?
**A:** Some providers block embeds in editor/localhost contexts. Test on the published URL.

### Q: What aspect ratio should I choose?
**A:** 16:9 for most videos, 4:3 for legacy content, 1:1 for square embeds, 21:9 for ultrawide. Use Custom only when you must set fixed pixel dimensions.

### Q: My custom width/height aren’t applied. Why?
**A:** Ensure "Aspect Ratio" is set to "Custom". Width/Height fields are ignored for non-custom ratios.

### Q: Can I link to a standard YouTube watch URL?
**A:** Use YouTube’s embed URL format (https://www.youtube.com/embed/VIDEO_ID) for best compatibility.

### Q: How does the block handle performance?
**A:** The iframe uses `loading=lazy`. Keep embeds above-the-fold minimal to avoid LCP impact.

### Q: Is there a domain allowlist?
**A:** It’s configurable in code. By default, all domains are allowed; projects can enable a whitelist for security/compliance.

### Q: Why do I see an error message in the block?
**A:** The URL is missing, invalid, or not allowed by the project’s whitelist.

---

## Troubleshooting

### Embed not showing on published page

**Check:**
- Verify the URL loads directly in a new browser tab
- Confirm the provider allows embedding (no `X-Frame-Options: DENY`)
- Check if your project enforces a whitelist and the domain is permitted
- Republish the page if recently updated

### Content not displaying correctly (wrong size or ratio)

**Check:**
- Confirm the correct Aspect Ratio is selected
- For Custom size, ensure both Width and Height are set and Aspect Ratio = Custom
- Remove conflicting inline styles in surrounding content
- Inspect CSS overrides that may affect `.embed-wrapper` or `iframe`

### Can’t edit the component

**Check:**
- Make sure the block is selected (blue outline in UE)
- Open the Properties panel; fields appear under "Embed"
- Ensure you have author permissions for this page
- Reload the editor if the panel doesn’t reflect latest fields

### Changes not saving

**Check:**
- Ensure you clicked "Save" or completed the publish workflow
- Resolve any validation errors in the Properties panel
- Check your network connection and retry
- If issue persists, try a full browser refresh

### Feature not working as expected (e.g., controls disabled)

> Note: Player controls and behavior are governed by the provider’s embed. Some features may be disabled or require specific URL parameters.

### Option not visible (Width/Height)

**Check:**
- The Width/Height fields only appear when Aspect Ratio is set to Custom
- Clear any invalid values and re-enter numeric pixel values
- Save and re-open Properties if the UI seems out of sync

---

## Tips for Success

### Choosing Ratios
Use 16:9 for most videos; reserve Custom for special layouts.

### URL Hygiene
Use official embed URLs and HTTPS; remove unnecessary query params.

### Accessibility
Add a nearby heading/description to give context; ensure focus visibility in your theme.

### Performance
Limit the number of embeds per page and prefer below-the-fold placement.

### Cross-Brand Readiness
Avoid hardcoded dimensions unless necessary; responsive ratios adapt best across themes.

### Testing
Validate in both Universal Editor and on the published site; providers sometimes block editor environments.

### Fallbacks
- Provide a backup link under or near the embed when appropriate
- Consider a poster image with a link for heavy third-party embeds

---

## Quick Reference

**Aspect Ratios**: 16:9 (default), 4:3, 1:1, 21:9, Custom  
**Custom Dimensions**: Only when Aspect Ratio = Custom (Width/Height in px)  
**Supports**: YouTube, Vimeo, Maps, and most HTTPS iframe sources  
**Accessibility**: Iframe `title`, focus outline, high-contrast and reduced-motion support  
**Notes**: Some providers block embedding in editor/localhost; test published pages

---

*Last Updated: October 2025*  
*For technical documentation, see `embed.js` and `_embed.json`*


