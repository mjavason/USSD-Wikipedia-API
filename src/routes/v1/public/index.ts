import express from 'express';
const router = express.Router();
import { telegramValidation } from '../../../validation';
import { telegramController } from '../../../controllers';

router.get('/', telegramController.default);

export default router;
