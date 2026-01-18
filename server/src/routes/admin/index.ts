import { Router } from 'express';

import adminUserRouter from './user.route';
import adminInstanceRouter from './instance.route';
import { authenticate, authorize } from '@/middlewares';

const adminRouter = Router();

adminRouter.use(authenticate, authorize(['admin']));

adminRouter.use('/users', adminUserRouter);
adminRouter.use('/instances', adminInstanceRouter);

export default adminRouter;
