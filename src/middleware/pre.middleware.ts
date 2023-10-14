import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CORS_ORIGIN } from '../constants';
import limiter from './rate_limiter.middleware';
import morgan from 'morgan';

function PreMiddleware(app: express.Application) {
  // Middleware to enable CORS
  app.use(cors());

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
  app.use(morgan('dev')); // 'combined', 'common', 'dev', 'tiny'

  //will return the real IP address even if behind proxy
  // app.set('trust proxy', true);

  //CORS RESTRICTED
  // app.use(
  //   cors({
  //     origin: CORS_ORIGIN,
  //     credentials: true,
  //   }),
  // );

  app.use(helmet());

  // app.use(limiter);

  return app;
}

export default PreMiddleware;
