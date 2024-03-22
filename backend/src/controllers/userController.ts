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

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No existing user',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully get the user',
    user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById({ id });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No existing user',
    });
  }

  const deleteUser = await User.findByIdAndDelete({ id });

  res.status(204).json({
    status: 'success',
    message: 'User sucessfully deleted',
    deleteUser,
  });
};
