import { Request, Response } from 'express';
import { NETWORK_PROVIDER_PREFIX_MAP } from '../constants';
import { scrapeController } from './scrape.controller';

/**
 * Gets the network provider based on the prefix of a phone number.
 *
 * @param {string} phoneNumber - The phone number to determine the network provider for.
 * @returns {string} The network provider's name or 'UNKNOWN' if not found.
 */
function getNetworkProvider(phoneNumber: string) {
  const prefixMap: { [key: string]: string } = NETWORK_PROVIDER_PREFIX_MAP;

  // Remove non-numeric characters
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Extract the first 6 digits
  const prefix = cleanedNumber.slice(0, 6);

  return prefixMap[prefix] || 'UNKNOWN';
}

/**
 * Processes a USSD message to remove '0' and its preceding valid character(s).
 *
 * @param {string} message - The USSD message to process.
 * @returns {string} The processed USSD message.
 */
function processUSSDMessage(message: string) {
  const parts = message.split('*');
  const result = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '0' && result.length > 0) {
      result.pop();
    } else {
      result.push(parts[i]);
    }
  }

  return result.join('*');
}

function ussdMyAccount(res: Response, sessionId: string, phoneNumber: string, networkCode: string) {
  const networkProvider = getNetworkProvider(phoneNumber);
  const id = sessionId.substring(sessionId.length, sessionId.length - 4);

  res.send(`CON This is a free account.
  Phone Number: ${phoneNumber}
  Network Provider: ${networkProvider}
  Session ID: xxxxxx${id}.
  Network Code: ${networkCode}
  
  0. Go back`);
}

function ussdMainMenu(res: Response) {
  res.send(`CON Welcome to the Wikipedia USSD Service.

  1. My Account
  2. Wiki Summary
  3. Developer Section
  *. Exit`);
}

function ussdWikiSummary(res: Response) {
  res.send(`CON Enter a subject and we'll query the wikipedia website for a summary.

  0. Go back`);
}

async function ussdWikiSummaryHandler(res: Response, subject: string) {
  const summary = await scrapeController.getSummary(subject);

  if (!summary || summary.substring(summary.length, summary.length - 12) === 'may refer to') return res.send(`END '${subject}' subject not found on wikipedia.`);

  res.send(`CON ${summary}
  
  0. Go back`);
}

function ussdDevSection(res: Response) {
  res.send(`CON This is the dev hangout, made for testing and experimentation. Enjoy!

  1. USSD Text Count Limit
  0. Go back`);
}

function ussdTextCountLimit(res: Response) {
  res.send(
    `CON Enter as much text as you can. I'll return the number of characters that went through.

    0. Go back`,
  );
}

function ussdTextCountLimitHandler(res: Response, text: string) {
  res.send(`CON ${text.length} characters received.

  0. Go back
  `);
}

function ussdUnknownEntry(res: Response) {
  res.send(`CON Unknown command entered. Please try again.

  0. Go back
  `);
}

function ussdExit(res: Response) {
  res.send(`END Goodbye, until next time!.`);
}

class Controller {
  async default(req: Request, res: Response) {
    console.log(req.body);

    const phoneNumber = req.body.phoneNumber;
    const serviceCode = req.body.serviceCode;
    const text = processUSSDMessage(req.body.text);
    const sessionId = req.body.sessionId;
    const networkCode = req.body.networkCode;

    switch (text) {
      case '':
        return ussdMainMenu(res);
      case '1':
        return ussdMyAccount(res, sessionId, phoneNumber, networkCode);
      case '2':
        return ussdWikiSummary(res);
      case '3':
        return ussdDevSection(res);
      case '*':
        return ussdExit(res);
      case '3*1':
        return ussdTextCountLimit(res);

      default:
        if (text.startsWith('2*')) {
          return await ussdWikiSummaryHandler(res, text.slice(2));
        } else if (text.startsWith('3*1*')) {
          return ussdTextCountLimitHandler(res, text.slice(4));
        }
        return ussdUnknownEntry(res);
    }
  }
}

export const ussdController = new Controller();
