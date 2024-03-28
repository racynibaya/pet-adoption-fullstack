import express, { Request, Response, NextFunction } from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
} from '../controllers/userController';
import { login, protect } from '../controllers/auth';
import User from '../models/user';
import IUser from '../types/userType';

const router = express.Router();

router.route('/').post(createUser).get(protect, getAllUser);

router
  .route('/:id')
  .delete(
    protect,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const currentUser = req.user as IUser;
      const userToDelete = await User.findById(id);

      if (!userToDelete) {
        return res.status(404).json({ message: 'User dont exist' });
      }

      if (currentUser.id !== userToDelete.id) {
        return res.status(403).json({ message: `You can't delete this user` });
      }

      if (currentUser.id === userToDelete.id) {
        req.user = null;
      }

      next();
    },
    deleteUser
  )
  .get(getUser);

router.route('/login').post(login);

export default router;
