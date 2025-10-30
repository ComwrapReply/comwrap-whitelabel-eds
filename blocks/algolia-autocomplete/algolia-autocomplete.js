export default async function decorate(block) {
  // Dynamically import Algolia Autocomplete JS and Algolia Search Lite modules in parallel
  const [{ autocomplete, getAlgoliaResults }, algoliasearchModule] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.17.7/+esm'),
    import('https://cdn.jsdelivr.net/npm/algoliasearch@4.24.0/dist/algoliasearch-lite.esm.browser.js'),
  ]);

  // Retrieve the default export from the algoliasearch module
  const algoliasearch = algoliasearchModule.default || algoliasearchModule;

  // Load Algolia's autocomplete theme CSS dynamically if it hasn't already been loaded
  const cssUrl =
    'https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic@1.17.7/dist/theme.css';
  if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);
  }

  // Extract the block fields rendered by the Universal Editor (each field is wrapped in div > div > p)
  const appIdDiv = block.querySelector(':scope > div:nth-child(1) p');
  const searchKeyDiv = block.querySelector(':scope > div:nth-child(2) p');
  const indexNameDiv = block.querySelector(':scope > div:nth-child(3) p');
  const placeholderDiv = block.querySelector(':scope > div:nth-child(4) p');

  // Get the text content from each field and remove extra whitespace
  const ALGOLIA_APP_ID = appIdDiv?.textContent.trim();
  const ALGOLIA_SEARCH_KEY = searchKeyDiv?.textContent.trim();
  const ALGOLIA_INDEX_NAME = indexNameDiv?.textContent.trim();
  const PLACEHOLDER = placeholderDiv?.textContent.trim() || 'Search…'; // fallback placeholder

  // Ensure there is a container for the autocomplete widget
  let container = block.querySelector('.autocomplete-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'autocomplete-container';
    block.appendChild(container);
  } else {
    // Clear the container if it already exists
    container.innerHTML = '';
  }

  // Initialise Algolia search client
  const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

  // Initialise autocomplete on the container
  autocomplete({
    container,
    placeholder: PLACEHOLDER,
    openOnFocus: true, // automatically open suggestions when the input is focused
    getSources({ query }) {
      // If the query is empty, return no sources
      if (!query) return [];

      // Define the data source for the autocomplete
      return [
        {
          sourceId: 'pages',
          getItems() {
            // Use Algolia helper to fetch search results
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: ALGOLIA_INDEX_NAME,
                  params: { query, hitsPerPage: 5 }, // limit results to 5 hits
                },
              ],
            });
          },
          templates: {
            // Define how each autocomplete item is rendered
            item({ item, components, html }) {
              return html`
                <a class="aa-ItemLink" href="${item.url}">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemTitle">
                      ${components.Highlight({ hit: item, attribute: 'title' })}
                    </div>
                    <div class="aa-ItemPath">${item.url}</div>
                  </div>
                </a>
              `;
            },
            // Template for when no results are found
            noResults() {
              return '<div class="aa-Empty">No results found</div>';
            },
          },
          // Optional: specify the URL to navigate to when an item is selected
          getItemUrl({ item }) {
            return item.url;
          },
        },
      ];
    },
    // Handle form submission (pressing Enter or selecting the first item)
    onSubmit({ state }) {
      const first = state.collections[0]?.items?.[0];
      if (first?.url) window.location.href = first.url;
    },
  });
}
