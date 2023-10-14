import express, { Response } from 'express';
import { STATUS_CODES, LINKS, MESSAGES } from './constants';
import rootRoutes from './routes';
import preMiddleware from './middleware/pre.middleware';
import { SuccessMsgResponse } from './helpers/response';

const app = express();

preMiddleware(app);

//default response
app.get('/', (req, res) => SuccessMsgResponse(res, MESSAGES.DEFAULT));

//documentation redirect
app.get('/docs', (req, res) => {
  res.redirect(LINKS.API_DOCUMENTATION);
});

// importe all routes
app.use('/api', rootRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res
    .status(404)
    .send({ status_code: STATUS_CODES.FAILURE, message: MESSAGES.ROUTE_NOT_FOUND, success: false });
});

export default app;
