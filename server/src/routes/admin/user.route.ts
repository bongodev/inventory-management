import { Router, Request, Response } from 'express';

import { userController } from '@/modules/user';
import { NotImplementedError } from '@/common/errors';
import { validateRequestBody } from '@/middlewares';
import { CreateUserSchema } from '@/schemas';

const adminUserRouter = Router();

adminUserRouter.post(
  '/',
  validateRequestBody(CreateUserSchema),
  userController.createUser,
);
adminUserRouter.get('/', (_req: Request, _res: Response) => {
  throw new NotImplementedError();
});


adminUserRouter.get('/:id', userController.getUserById);

adminUserRouter.put('/:id', (_req: Request, _res: Response) => {
  throw new NotImplementedError();
});
adminUserRouter.delete('/:id', (_req: Request, _res: Response) => {
  throw new NotImplementedError();
});
adminUserRouter.patch('/:id/restore', (_req: Request, _res: Response) => {
  throw new NotImplementedError();
});
export default adminUserRouter;
