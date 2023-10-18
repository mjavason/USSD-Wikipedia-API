/**
 * Removes special characters from a string, including square brackets and their content.
 *
 * @param {string} inputString - The input string containing special characters.
 * @returns {string} A cleaned string with special characters removed.
 */
export default function removeSpecialCharacters(inputString: string) {
  // Use a regular expression to replace special characters with an empty string
  return inputString.replace(/\[[^\]]*\]/g, '').replace(/[^a-zA-Z0-9\s,()\[\].;]/g, '');
}
