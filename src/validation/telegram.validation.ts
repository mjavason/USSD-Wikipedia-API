import { z } from 'zod';

class Validation {
  // Validation schema for updating an existing telegram
  analyze = {
    body: z.object({
      text: z.string(),
    }),
  };
}

export const telegramValidation = new Validation();
