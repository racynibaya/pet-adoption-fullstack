import { NextFunction, Request, Response } from 'express';

import User from '../models/user';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/app.error';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password, confirmPassword, passwordChangedAt } = req.body;
  const user = await User.create({
    email,
    password,
    confirmPassword,
    passwordChangedAt,
  });

  res.status(200).json({
    message: 'User created',
    user,
  });
});

export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    if (!users) {
      next(new AppError('No user exist', 404));
    }

    res.status(200).json({
      message: 'success',
      data: {
        users,
      },
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById({ _id: id });

    if (!user) {
      next(new AppError('No existing user', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully get the user',
      user,
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      next(new AppError('No existing user', 404));
    }

    const deleteUser = await User.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      message: 'User sucessfully deleted',
      deleteUser,
    });
  }
);
