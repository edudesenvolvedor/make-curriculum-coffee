import express, { Express, Request, Response } from 'express';

const port:string = process.env.PORT || "5000";

const app: Express = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello, World!");
})

app.listen(port, (): void => {
  console.log("Server started on port: " + port);
})