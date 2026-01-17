import { Express } from 'express';

import baseRouter from './health';
import adminRouter from './admin';

const configureRouters = (app: Express) => {
  app.use('/api/', baseRouter);
  app.use('/api/admin', adminRouter);
};

export default configureRouters;
