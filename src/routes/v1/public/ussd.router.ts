import express from 'express';
const router = express.Router();
import { scrapeController } from '../../../controllers';
import { scrapeValidation } from '../../../validation';
import { processRequestQuery } from 'zod-express-middleware';

// router.post(
//   '/',
//   processRequestQuery(scrapeValidation.getSummary.query),
//   scrapeController.getSummary,
// );

router.post('/', scrapeController.default);

export default router;
