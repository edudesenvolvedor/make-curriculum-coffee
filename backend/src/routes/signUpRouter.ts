import { Router, Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { signUpSchema, SignUp } from '../schemas/signUpSchema';
import bcrypt from 'bcrypt';

const router: Router = Router();

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const signUp: SignUp = req.body;
  const signUpParse = signUpSchema.safeParse(signUp);

  const passwdCrypt: string = await bcrypt.hash(signUpParse.data.password, 10);

  if (signUpParse.success) {
    const resultQuery = new UserModel({
      name: signUpParse.data.name,
      lastName: signUpParse.data.lastName,
      email: signUpParse.data.email,
      password: passwdCrypt,
    });

    try {
      const result = await resultQuery.save();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({});
    }
  }
});

export default router;
