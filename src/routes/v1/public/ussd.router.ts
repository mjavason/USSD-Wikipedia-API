import express from 'express';
const router = express.Router();
import { ussdController } from '../../../controllers';

// router.post(
//   '/',
//   processRequestQuery(scrapeValidation.getSummary.query),
//   scrapeController.getSummary,
// );

router.post('/', ussdController.default);

export default router;
