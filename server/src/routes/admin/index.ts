import { Router } from "express";
import adminUserRouter from "./user.route";

const adminRouter = Router();

adminRouter.use("/user", adminUserRouter);

export default adminRouter;
