export default function removeSpecialCharacters(inputString: string) {
  // Use a regular expression to replace special characters with an empty string
  return inputString.replace(/[^a-zA-Z0-9\s,()\[\].;]/g, '');
}
