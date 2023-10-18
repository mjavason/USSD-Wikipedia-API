import { Request, Response } from 'express';
import { load } from 'cheerio';
import { decode } from 'html-entities';
import ApiService from '../services/api.service';
import removeSpecialCharacters from '../utils/removeSpecialCharacters';

function removeNewlines(inputString: string) {
  // Use the replace method with a regular expression to replace all newline characters with an empty string
  const modifiedString = inputString.replace(/\n/g, '');

  return modifiedString;
}

class Controller {
  async getSummary(subject: string) {
    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(subject)}`;
    const wikiApiService = new ApiService(url);

    try {
      // Make a request to the Wikipedia page
      const response = await wikiApiService.get('');

      // Use Cheerio to scrape the "p" element within the specified structure
      const $ = load(`${response}`);

      const summary = decode(
        $('#content #bodyContent .mw-body-content .mw-parser-output p').text(),
      );

      if (summary) {
        const cleanSummary = removeSpecialCharacters(removeNewlines(summary));

        if (cleanSummary.length <= 420) {
          // If the summary is within the character limit, return it as is
          return cleanSummary;
        } else {
          // Find the last full stop (period) within the first 420 characters
          const lastFullStopIndex = cleanSummary.lastIndexOf('.', 420);

          if (lastFullStopIndex > 0) {
            // Slice the summary up to the last full stop within the character limit
            return cleanSummary.slice(0, lastFullStopIndex + 1);
          } else {
            // If no full stop is found, return the first 420 characters
            return cleanSummary.slice(0, 420);
          }
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async default(req: Request, res: Response) {
    console.log(req);
    res.send(`END Welcome to the Wikipedia USSD Service. We'll be with you shortly.`);
  }
}

export const scrapeController = new Controller();
