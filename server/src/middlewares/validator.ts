import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequestBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };
};
