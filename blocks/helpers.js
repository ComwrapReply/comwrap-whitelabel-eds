/**
 * Get the current country and language codes label by matching the current
 * location pathname to a regex.
 * @returns {string[]} The current country and language codes array on
 * success (e.g. ["us","en"]), array of two empty strings otherwise
 */

export function getCurrentCountryLanguage() {
  const match = window.location.pathname.match(/(?:^|\/)([a-z]{2})-([a-z]{2})(?:\.html|\/|$)/i);
  return match ? match.slice(1, 3) : ['', ''];
}

/** @param {string[]} classes */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**  @type {Promise<any> | null} */
let dictionaryPromise = null;
export async function getDictionary() {
  const lang = document.documentElement.lang.toLowerCase() || 'en-us';
  if (dictionaryPromise === null) {
    dictionaryPromise = fetch('/api/dictionary.json')
      .then((res) => res.json());
  }

  /** @type Array<{ key:string} & Record<string, string>> */
  const dictionary = (await dictionaryPromise).data;
  const dictionaryLangValues = dictionary.filter((item) => Object.keys(item).includes(lang));
  const dictionaryLang = dictionaryLangValues.map((item) => {
    const { key } = item;
    const value = item[lang];
    return [key, value];
  });

  // key is e.g. blogpost.backtotop and value is 'Back to top'. We are creatating a
  // new object split by '.' and creating nested objects.
  const dictionaryLangNested = dictionaryLang.reduce(
    (/** @type {Record<string, any>} */ acc, [key, value]) => {
      const keys = key.split('.');
      const last = keys.pop();
      if (!last) {
        return acc;
      }
      const obj = acc;
      // eslint-disable-next-line no-shadow
      keys.reduce((acc, k) => {
        if (!(k in acc)) {
          acc[k] = {};
        }
        return acc[k];
      }, obj);
      obj[last] = value;
      return acc;
    },
    {},
  );
  return dictionaryLangNested;
}

/**
 * Creates an HTML element with the specified tag name and attributes
 * @param {string} tag - The HTML tag name
 * @param {Object} [attributes] - Optional object containing element attributes
 * @returns {HTMLElement} The created HTML element
 */
export function createTag(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === true) element.setAttribute(key, '');
    else if (value !== false && value !== null && value !== '') {
      element.setAttribute(key, value);
    }
  });
  return element;
}
