// src/utils/stringUtils.js

/**
 * Converts a string to a hyphenized lowercase string
 * @param {string} str - The string to be hyphenized
 * @returns {string} - The hyphenized string
 */
const hyphenize = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '-')
}

export { hyphenize }
