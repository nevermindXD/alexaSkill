import bodyParser from 'body-parser';
import helmet from 'helmet';

import { cors } from '../middleware';
import logger from 'morgan';

/**
 * Function to enable cors, logger, disable x-powered-by, urlencoded
 */
export const utils = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors);
  app.use(helmet());
  if(process.env.ENVIRONMENT === 'dev')
    app.use(logger('dev'));
  app.disable('x-powered-by');
  app.enable('trust proxy');
}