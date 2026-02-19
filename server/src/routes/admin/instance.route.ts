import { Router } from 'express';

import { validateRequestBody } from '@/middlewares';
import { instanceController } from '@/modules/instance';
import { CreateInstanceSchema, SearchInstanceFilterSchema, UpdateInstanceSchema } from '@/schemas';

const router = Router();

router.post(
  '/',
  validateRequestBody(CreateInstanceSchema),
  instanceController.createInstance,
);
router.get('/', instanceController.getInstances);
router.get('/:id', instanceController.getInstancesById);
router.put(
  '/:id',
  validateRequestBody(UpdateInstanceSchema),
  instanceController.updateInstanceById,
);
router.delete('/:id', instanceController.deleteInstanceById);
router.patch('/:id/restore', instanceController.restoreInstance);
router.post('/search', validateRequestBody(SearchInstanceFilterSchema), instanceController.searchInstance);

export default router;
