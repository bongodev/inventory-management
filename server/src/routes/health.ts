import { Router, Request, Response } from 'express';

const baseRouter = Router();

baseRouter.get('/status', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default baseRouter;
