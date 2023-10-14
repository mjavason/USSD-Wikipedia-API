import { Server } from 'http';
import 'express-async-errors';
import app from './app';
import logger from './helpers/logger';
import { initiateBot } from './controllers/robot.controller';
import { telegramController } from './controllers';

// setting up server
const PORT = process.env.PORT || 5000;

const server: Server = app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await initiateBot();
  telegramController.startBot();
});

// handle unhanled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(err);

  // close server
  server.close(() => process.exit(1));
});
