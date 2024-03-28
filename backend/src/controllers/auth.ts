import { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import IUser from '../types/userType';

interface RequestWithUser extends Request {
  user: IUser;
}
interface DecodedType {
  id: string;
  iat: number;
  exp: number;
}

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let token: string | undefined;

  try {
    // check if there's an email and password
    if (!email || !password) {
      return res.status(404).json({ message: 'User not found' });
    }

    // check if user is existing
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // compare input and password in db
    const isPasswordMatched = await user.correctPassword(
      `${password}`,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const copiedUser = JSON.parse(JSON.stringify(user));
    delete copiedUser.password;
    // generate a token
    token = signToken(user._id);

    res.status(200).json({ user: copiedUser, token });
  } catch (err) {
    console.log(err);
  }
  // send a token
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = '';

  if (req.headers.authorization?.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unathorized' });
  }

  // const decoded: { id: string; iat: number; exp: number } = verifyToken(token);
  const decoded: DecodedType = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as DecodedType;

  console.log(decoded);
  const currentUser = await User.findById(decoded.id);

  console.log(currentUser);

  if (!currentUser) {
    return res.status(401).json({
      message: 'No current user',
    });
  }

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return res.status(401).json({
      message: 'User recently changed password! Please log in again.',
    });
  }
  req.user = currentUser;
  next();
};

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 12);

  return hashPassword;
};
