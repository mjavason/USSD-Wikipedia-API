import express from 'express';
const router = express.Router();
import ussdRouter from './ussd.router';

router.use('/ussd', ussdRouter);

export default router;
