import express, { type Request, type Response } from "express";
import { envConfig } from "./config";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: envConfig.CORS_ORIGIN,
    credentials: true,
  })
);
const port = envConfig.PORT;

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
