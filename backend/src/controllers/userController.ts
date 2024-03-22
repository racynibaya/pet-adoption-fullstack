import { Request, Response } from 'express';

import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  const user = await User.create({
    email,
    password,
    confirmPassword,
  });
  res.status(200).json({
    message: 'User created',
    user,
  });
};

export const getAllUser = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    message: 'success',
    data: {
      users,
    },
  });
};
