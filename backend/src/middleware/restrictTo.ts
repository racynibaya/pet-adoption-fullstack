import { Request, Response, NextFunction } from 'express';

import IUser from '../types/user.type';
import User from '../models/user';

const restrictTo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const currentUser = req.user as IUser;
    const userToDelete = await User.findById(id);

    if (currentUser.role === 'admin') {
      req.user = null;
      return next();
    }

    if (currentUser._id.toString() === userToDelete?._id.toString()) {
      req.user = null;
      return next();
    }
    res.status(403).json({ message: 'Unable to delete user' });
  } catch (error) {
    next(error);
  }
};
export default restrictTo;
