import express, { Request, Response, NextFunction } from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
} from '../controllers/user.controller';
import { login, protect } from '../controllers/auth.controller';

import restrictTo from '../middleware/restrictTo';

const router = express.Router();

router.route('/').post(createUser).get(protect, getAllUser);

router.route('/:id').delete(protect, restrictTo, deleteUser).get(getUser);

router.route('/login').post(login);

export default router;
