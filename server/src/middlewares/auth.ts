import { NextFunction, Request, Response } from 'express';

import { UserRole } from '@/types';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
};
