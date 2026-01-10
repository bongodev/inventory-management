import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequestBody = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
};
