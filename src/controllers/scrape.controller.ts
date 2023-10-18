import { Request, Response } from 'express';
import { load } from 'cheerio';
import { decode } from 'html-entities';
import { SuccessResponse, NotFoundResponse, InternalErrorResponse } from '../helpers/response';
import ApiService from '../services/api.service';

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
        const cleanSummary = removeNewlines(summary);

        // Find the position of '[1]' in the summary
        const index = cleanSummary.indexOf('[1]');
        if (index !== -1) {
          // If '[1]' is found, extract the summary up to that point
          const truncatedSummary = cleanSummary.slice(0, index);

          return truncatedSummary;
        } else {
          return cleanSummary;
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
