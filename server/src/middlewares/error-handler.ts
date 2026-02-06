import { ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.message,
    });
  }

  // Handle mongoose duplicate key error
  if (err.name === 'MongoServerError' && 'code' in err && err.code === 11000) {
    return res.status(409).json({
      error: 'Duplicate key error',
    });
  }

  // Handle mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err.name === 'BadRequestError') {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      error: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: err.message,
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      error: err.message,
    });
  }

  // Handle mongodb cast errors
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format',
    });
  }

  console.error('************************************');
  console.error(err);
  console.error('************************************');

  res.status(500).json({
    error: 'Internal Server Error',
  });
};
