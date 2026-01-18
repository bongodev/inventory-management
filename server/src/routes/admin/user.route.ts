import { Router } from 'express';

import { userController } from '@/modules/user';
import { validateRequestBody } from '@/middlewares';
import { CreateUserSchema } from '@/schemas';

const adminUserRouter = Router();

adminUserRouter.post(
  '/',
  validateRequestBody(CreateUserSchema),
  userController.createUser,
);

adminUserRouter.get('/', userController.getUsers);
adminUserRouter.get('/:id', userController.getUserById);
adminUserRouter.put('/:id', userController.updateUserById);
adminUserRouter.delete('/:id', userController.deleteUserById);
adminUserRouter.patch('/:id/restore', userController.restoreUser);

export default adminUserRouter;
