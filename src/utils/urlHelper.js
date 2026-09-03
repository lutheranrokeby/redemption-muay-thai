/**
 * URL and Navigation Helper Utilities
 */

/**
 * Returns the appropriate URL path depending on whether the user is in Admin Mode.
 * @param {string} urlPath - The target relative path (e.g. '/coaches')
 * @param {boolean} isAdmin - Whether the current session is in Admin Mode
 * @returns {string} Formatted URL path
 */
export const getAdminHref = (urlPath, isAdmin = false) => {
  if (!isAdmin) return urlPath;
  if (urlPath === '/') return '/admin';
  return urlPath.startsWith('/admin') ? urlPath : `/admin${urlPath}`;
};

/**
 * Sanitizes editable text content from contenteditable element blur events.
 * @param {string} rawText - Raw innerText from event target
 * @returns {string} Sanitized clean text
 */
export const sanitizeEditText = (rawText) => {
  if (!rawText) return '';
  return rawText.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
};
