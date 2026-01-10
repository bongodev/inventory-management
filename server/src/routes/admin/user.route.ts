import { Router, Request, Response } from "express";

const adminUserRouter = Router();

adminUserRouter.post("/", (req: Request, res: Response) => {});
adminUserRouter.get("/", (req: Request, res: Response) => {});
adminUserRouter.get("/:id", (req: Request, res: Response) => {});
adminUserRouter.put("/:id", (req: Request, res: Response) => {});
adminUserRouter.delete("/:id", (req: Request, res: Response) => {});
adminUserRouter.patch("/:id/restore", (req: Request, res: Response) => {});
export default adminUserRouter;
