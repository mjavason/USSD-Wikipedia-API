import { Request, Response } from 'express';
import { NETWORK_PROVIDER_PREFIX_MAP } from '../constants';
import startsWith from '../utils/startsWith';

function getNetworkProvider(phoneNumber: string) {
  const prefixMap: { [key: string]: string } = NETWORK_PROVIDER_PREFIX_MAP;

  const cleanedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
  const prefix = cleanedNumber.slice(0, 6); // Extract the first 6 digits

  return prefixMap[prefix] || 'UNKNOWN';
}

function ussdMyAccount(res: Response, sessionId: string, phoneNumber: string, networkCode: string) {
  const networkProvider = getNetworkProvider(phoneNumber);
  const id = sessionId.substring(sessionId.length, sessionId.length - 4);

  res.send(`END This is a free account.
  Network Provider: ${networkProvider}
  Session ID: xxxxxx${id}.
  Network Code: ${networkCode}`);
}

function ussdPhoneNumber(res: Response, phoneNumber: string) {
  res.send(`END ${phoneNumber}`);
}

function ussdMainMenu(res: Response) {
  res.send(`CON Welcome to the Wikipedia USSD Service.

  1. My Account
  2. My Phone Number
  3. Wiki Summary
  4. Developer Section
  `);
}

function ussdDevSection(res: Response) {
  res.send(`CON This is the dev hangout, made for testing and experimentation. Enjoy!
  1. USSD Text Count Limit
  `);
}

function ussdTextCountLimit(res: Response) {
  res.send(
    `CON Enter as much text as you can. I'll return the number of characters that went through.`,
  );
}

function ussdTextCountLimitHandler(res: Response, text: string) {
  res.send(`END ${text.length} characters received.`);
}

function ussdUnknownEntry(res: Response) {
  res.send(`END Unknown command entered. Please try again.`);
}

class Controller {
  async default(req: Request, res: Response) {
    console.log(req.body);

    const phoneNumber = req.body.phoneNumber;
    const serviceCode = req.body.serviceCode;
    const text = req.body.text;
    const sessionId = req.body.sessionId;
    const networkCode = req.body.networkCode;

    switch (text) {
      case '':
        return ussdMainMenu(res);
      case '1':
        return ussdMyAccount(res, sessionId, phoneNumber, networkCode);
      case '2':
        return ussdPhoneNumber(res, phoneNumber);
      case '4':
        return ussdDevSection(res);
      case '4*1':
        return ussdTextCountLimit(res);

      default:
        if (text.startsWith('4*1*')) {
          return ussdTextCountLimitHandler(res, text.slice(4));
        }
        return ussdUnknownEntry(res);
    }
  }
}

export const ussdController = new Controller();
