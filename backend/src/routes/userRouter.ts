import { Router, Request, Response } from 'express';
import UserModel from '../models/UserModel';

const router: Router = Router();

router.get('/user', async (req: Request, res: Response): Promise<void> => {
  const users = await UserModel.find();
  res.status(200).send(users);
});

export default router;
