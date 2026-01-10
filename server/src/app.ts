import cors from "cors";
import express, { type Request, type Response } from "express";

import { envConfig, connectDB } from "@/config";
import configureRouters from "@/routes";
import { errorHandler } from "@/middlewares";

connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: envConfig.CORS_ORIGIN,
    credentials: true,
  })
);

const port = envConfig.PORT;

configureRouters(app);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
