import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/app.error';
import IUser from '../types/user.type';

interface DecodedType {
  id: string;
  iat: number;
  exp: number;
}

export const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let token: string | undefined;

    // check if there's an email and password
    if (!email || !password) {
      return next(new AppError('User not found', 404));
    }

    // check if user is existing
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // compare input and password in db
    const isPasswordMatched = await user.correctPassword(
      `${password}`,
      user.password
    );

    if (!isPasswordMatched) {
      return next(new AppError('Invalid email or password', 401));
    }

    const copiedUser = JSON.parse(JSON.stringify(user));
    delete copiedUser.password;
    // generate and send a token
    createAndSendToken(user, 200, res);
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = '';

    if (req.headers.authorization?.startsWith('Bearer'))
      token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return next(new AppError('Unauthorized', 403));
    }

    // const decoded: { id: string; iat: number; exp: number } = verifyToken(token);
    const decoded: DecodedType = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedType;

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError('No current user', 404));
    }

    if (currentUser.changePasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again', 401)
      );
    }
    req.user = currentUser;
    next();
  }
);

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 12);

  return hashPassword;
};

export const createAndSendToken = (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    message: 'success',
    token,
    data: {
      user,
    },
  });
};
