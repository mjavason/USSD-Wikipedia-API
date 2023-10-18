import { z } from 'zod';

class Validation {
  // Validation schema for updating an existing scrape
  getSummary = {
    query: z.object({
      subject: z.string(),
    }),
  };
}

export const scrapeValidation = new Validation();
