import { Request, Response } from 'express';

import * as instanceService from './service';

export const createInstance = async (req: Request, res: Response) => {
  const newInstance = await instanceService.createInstance(req.body);
  res.status(201).json(newInstance);
};

export const getInstances = async (_req: Request, res: Response) => {
  const instances = await instanceService.getInstances();
  res.status(200).json(instances);
};

export const getInstancesById = async (req: Request, res: Response) => {
  //@ts-expect-error  req.params.id shows red underline
  const instance = await instanceService.getInstancesById(req.params.id);

  if (!instance) return res.status(404).json({ message: 'No instance found' });

  return res.status(200).json(instance);
};

export const updateInstanceById = async (req: Request, res: Response) => {
  const updatedInstance = await instanceService.updateInstanceById(
    //@ts-expect-error  req.params.id shows red underline
    req.params.id,
    req.body,
  );

  if (!updatedInstance)
    return res.status(404).json({ message: 'No instance found' });

  return res.status(200).json({
    instance: updatedInstance,
    message: 'Instance updated successfully',
  });
};

export const deleteInstanceById = async (req: Request, res: Response) => {
  const deletedInstance = await instanceService.deleteInstanceById(
   //@ts-expect-error  req.params.id shows red underline
    req.params.id,
  );

  if (!deletedInstance)
    return res.status(404).json({ message: 'No instance found' });

  return res.status(200).json({ message: 'Instance deleted successful' });
};

export const restoreInstance = async (req: Request, res: Response) => {
  //@ts-expect-error  req.params.id shows red underline
  const restoredInstance = await instanceService.restoreInstance(req.params.id);

  if (!restoredInstance)
    return res.status(404).json({ message: 'No instance found' });

  return res.status(201).json({
    instance: restoredInstance,
    message: 'Instance updated successfully',
  });
};


export const searchInstance = async (req: Request, res: Response) => {
  const users = await instanceService.searchInstance(req.body);
  return res.status(200).json(users);
};













