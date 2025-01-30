import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import db from './config/db';
import userRouter from './routes/signUpRouter';

(async (): Promise<void> => {
  await db();
})();

dotenv.config();

const port: string = process.env.SERVER_PORT || '5000';

const app: Express = express();

app.use(
  cors({
    origin: ['*'],
  }),
);

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello, World!');
});

app.use('/v1', userRouter);

app.listen(port, (): void => {
  console.log('Server started on port: ' + port);
});
