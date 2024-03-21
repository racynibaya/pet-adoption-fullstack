import express, { Request, Response } from 'express';
import User from '../models/user';

const router = express.Router();

router
  .route('/')
  .post(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.create({
      email,
      password,
      confirmPassword: password,
    });
    res.status(200).json({
      message: 'User created',
      user,
    });
  })
  .get(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json({
      message: 'success',
      data: {
        users,
      },
    });
  });

export default router;
