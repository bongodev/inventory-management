import { Express } from 'express';

import authRouter from './auth.route';

import baseRouter from './health';
import adminRouter from './admin';

const configureRouters = (app: Express) => {
  app.use('/auth', authRouter);

  app.use('/api', baseRouter);
  app.use('/api/admin', adminRouter);
};

export default configureRouters;
