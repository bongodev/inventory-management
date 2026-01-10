import { Router, Request, Response } from "express";

import { userController } from "@/modules/user";
import { NotImplementedError } from "@/common/errors";
import { validateRequestBody } from "@/middlewares";
import { CreateUserSchema } from "@/schemas";

const adminUserRouter = Router();

adminUserRouter.post(
  "/",
  validateRequestBody(CreateUserSchema),
  userController.createUser
);
adminUserRouter.get("/", (req: Request, res: Response) => {
  throw new NotImplementedError();
});
adminUserRouter.get("/:id", (req: Request, res: Response) => {
  throw new NotImplementedError();
});
adminUserRouter.put("/:id", (req: Request, res: Response) => {
  throw new NotImplementedError();
});
adminUserRouter.delete("/:id", (req: Request, res: Response) => {
  throw new NotImplementedError();
});
adminUserRouter.patch("/:id/restore", (req: Request, res: Response) => {
  throw new NotImplementedError();
});
export default adminUserRouter;
