import { Response, Request, Router } from 'express';
import { SignIn, signInSchema } from '../schemas/signInSchema';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'secret';

const router: Router = Router();

router.post('/signin', async (req: Request, res: Response): Promise<void> => {
  const signIn: SignIn = req.body;

  const signInParse = signInSchema.safeParse(signIn);

  if (!signInParse.success) {
    res.status(400).send({
      error: 'Invalid signIn',
    });
    return;
  }

  console.log(signInParse.data);

  const findUser: SignIn = await UserModel.findOne({
    email: signInParse.data.email,
  });

  const result: boolean = await bcrypt.compare(signInParse.data.password, findUser.password);

  if (!result) {
    res.status(400).send({
      error: 'Invalid signIn',
    });
    return;
  }

  res.status(200).send({
    success: true,
    token: jwt.sign(
      {
        id: findUser._id,
      },
      secretKey,
    ),
  });
});

export default router;
