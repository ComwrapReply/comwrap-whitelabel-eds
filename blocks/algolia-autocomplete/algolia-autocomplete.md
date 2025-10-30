# Algolia Autocomplete - Author Guide

## Overview

The **Algolia Autocomplete** block adds a powerful site-wide search experience to your page, letting users instantly search and navigate through indexed content using Algolia’s real-time autocomplete technology. It is ideal for search bars on marketing sites, product docs, or anywhere you want type-ahead search.

This guide covers creating and managing the Algolia Autocomplete block in AEM Universal Editor with Edge Delivery Services (EDS).

---

## How to Add a Algolia Autocomplete Block

### Creating Your First Algolia Autocomplete in Universal Editor

**Step 1: Add the Algolia Autocomplete Block**

1. Open your page in Universal Editor.
2. Click the "+" button to add a new component.
3. Search for or select **"Algolia Autocomplete"** from the block library.
4. The block will be inserted into your page.

**Step 2: Configure Algolia Settings**

1. Select the Algolia Autocomplete block in your page.
2. In the Properties panel, fill out the following required fields:
   - **Algolia App ID**: Your Algolia application ID (from your Algolia dashboard).
   - **Algolia Search-Only API Key**: Your Algolia search-only API key (keep this public, do not use Admin API Key).
   - **Algolia Index Name**: The name of the Algolia index you want to search in.
   - **Placeholder Text**: Placeholder for the search box (e.g., “Search…”).

**Step 3: Preview and Test**

1. Preview your page using the preview mode.
2. Enter a search term in the box and try out the autocomplete experience.
3. Verify that search results show as you type, and clicking a result navigates correctly.

**Step 4: Publish**

1. When you’re happy with the configuration, publish your page.

---

## Algolia Autocomplete Block Options

All configuration is available via the Universal Editor Properties panel:

### Algolia Configuration

- **Algolia App ID**: The unique identifier for your Algolia application.
- **Algolia Search-Only API Key**: The public API Key with search privileges.
- **Algolia Index Name**: The case-sensitive name of the Algolia search index.
- **Placeholder Text**: Text shown in the search input before the user types.

---

## Content Guidelines

### Required Information

- **Algolia Credentials**: You must have a valid Algolia account, search-only API key, and an accessible index.
- **Index Data**: Only records with a valid `url` and `title` attribute will display usefully.

### Best Practices

- Limit your hits per page (the block defaults to 5) for optimal performance.
- Set a helpful placeholder text to guide users.
- If your content is multi-lingual, be sure your index is configured accordingly.

---

## Writing Tips

### Do's ✅

- Use helpful search placeholder text suited to your content domain.
- Test your block thoroughly with published Algolia data.
- Coordinate with your developers/ops to ensure index security and API key configuration is correct.
- Encourage short and descriptive index titles for best UX.

### Don'ts ❌

- Never use your Algolia Admin API Key—you must use the public “search-only” key.
- Don’t publish unless you see the correct results in preview.
- Don’t leave the placeholder text generic if your content is specialized.

---

## How Users Will Experience Your Algolia Autocomplete

### Desktop Experience

- Users start typing in the input.
- Type-ahead suggestions and links appear in real-time.
- Users navigate with mouse or arrow keys and can press enter to instantly search or select.

### Mobile Experience

- Touch keyboard triggers and suggestions show beneath the input.
- Fully responsive styling, ensuring a seamless search experience on phones and tablets.

### Accessibility Features

- Keyboard navigation supported.
- High-contrast theming follows your project’s accessibility requirements.
- ARIA roles and live regions are managed by the Algolia Autocomplete library.

---

## Common Questions

### Q: The search returns no results—why?
**A:** Make sure your Algolia App ID, API key, and index name are correct, and the index contains items with valid `url` fields.

### Q: Where do I get the API Key and App ID?
**A:** From your [Algolia Dashboard](https://www.algolia.com/account/api-keys).

### Q: I’m seeing old results—how do I update them?
**A:** Refresh your Algolia index in your Algolia dashboard and republish your site.

### Q: The block does not render or is empty.
**A:** Make sure all config options are provided and your index is publicly searchable with your key.

### Q: Can I change the number of results shown?
**A:** The limit is hardcoded to 5 per query in the current JS, but you can change the JS and redeploy to adjust.

### Q: Is this block secure?
**A:** Yes, as long as you use the search-only key. Never use an Admin API Key for frontend search.

---

## Troubleshooting

### Problem 1: No results found for any search
**Check:**
- Are the API Key, App ID, and Index Name correct?
- Is the index populated?
- Are there any network errors in your browser console?
- Resolution: Double-check all config and your Algolia dashboard.

### Problem 2: Block fails to load (error in console)
**Check:**
- Are there any browser CSP or CDN loading issues?
- Is your browser blocking external scripts?

### Problem 3: Styling looks broken
**Check:**
- Make sure the theme CSS is loaded. This block loads the required CSS automatically, but some custom themes may require CSS overrides.

---

## Tips for Success

- Use meaningful placeholder text.
- Set up your Algolia index with relevant attributes.
- Publish only after live search is tested.
- Regularly review your Algolia dashboard for index health.
- Test on all device sizes.

---

## Quick Reference

- **Required:** Algolia App ID, Search-Only API Key, Index Name
- **Configurable:** Placeholder text
- **Default:** Shows 5 results as you type
- **Input type:** Single-line search, instant suggestions

---

*Last Updated: October 2025*  
*For technical documentation, see README.md*  
*For AEM Universal Editor support, contact your AEM administrator*
