import { Router, Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { signUpSchema, SignUp } from '../schemas/signUpSchema';
import bcrypt from 'bcrypt';

const router: Router = Router();

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const saltRounds: number = Number(process.env.SALT_ROUNDS) || 1;
  const signUp: SignUp = req.body;
  const signUpParse = signUpSchema.safeParse(signUp);
  const passwd: string = bcrypt.hashSync(signUpParse.data.password, saltRounds);

  const findUserExist = UserModel.findOne({
    where: {
      email: signUpParse.data.email,
    },
  });

  const isFindUserExist: boolean = !!findUserExist;

  try {
    const newUser = new UserModel({
      name: signUpParse.data.name,
      lastName: signUpParse.data.lastName,
      email: signUpParse.data.email,
      password: passwd,
    });

    if (!isFindUserExist) {
      const result = await newUser.save();

      res.status(200).send(result);
    } else {
      res.status(200).send({
        error: 'User already exist',
      });
    }
    console.log(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;
