import dotenv from "dotenv";
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

dotenv.config({
  path: '../.env',
});

const port:string = process.env.SERVER_PORT || "5000";

const app: Express = express();

app.use(cors({
  origin: ["*"]
}));

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello, World!");
})

app.listen(port, (): void => {
  console.log("Server started on port: " + port);
})