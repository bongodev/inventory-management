import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  // Logic to create a user
  console.log("User created:", req.body);
  res.status(201).send("User created");
};
