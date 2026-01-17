import { Router } from 'express';
import adminUserRouter from './user.route';

const adminRouter = Router();

adminRouter.use('/users', adminUserRouter);

export default adminRouter;
