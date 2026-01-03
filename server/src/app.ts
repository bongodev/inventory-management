import express, { type Request, type Response } from "express";
import { envConfig } from "./config";


const app = express();
const port = envConfig

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
