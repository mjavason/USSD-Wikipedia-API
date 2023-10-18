import { Request, Response } from 'express';
import { NETWORK_PROVIDER_PREFIX_MAP } from '../constants';

function getNetworkProvider(phoneNumber: string) {
  const prefixMap: { [key: string]: string } = NETWORK_PROVIDER_PREFIX_MAP;

  const cleanedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
  const prefix = cleanedNumber.slice(0, 6); // Extract the first 8 digits

  return prefixMap[prefix] || 'UNKNOWN';
}

function ussdMyAccount(res: Response, sessionId: string, phoneNumber: string, networkCode: string) {
  const networkProvider = getNetworkProvider(phoneNumber);
  const id = sessionId.substring(sessionId.length, -4);

  res.send(`END This is a free account.
  You are on the ${networkProvider} network.
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
  `);
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
      case '1':
        return ussdMyAccount(res, sessionId, phoneNumber, networkCode);
      case '2':
        return ussdPhoneNumber(res, phoneNumber);

      default:
        return ussdMainMenu(res);
    }
  }
}

export const scrapeController = new Controller();
