import express, { type Request, type Response } from "express";

const app = express();
const port = 6070;

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
