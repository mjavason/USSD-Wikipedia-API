import { Router } from 'express';
import publicRoute from './public';
import { MESSAGES, STATUS_CODES } from '../../constants';

const router = Router();
router.get('/', (req, res) => {
  res
    .status(200)
    .send({ status_code: STATUS_CODES.SUCCESS, message: MESSAGES.WELCOME_V1, success: false });
  console.log(MESSAGES.WELCOME_V1);
});

router.use('/', publicRoute);

export default router;
