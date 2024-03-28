import express from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
} from '../controllers/userController';
import { login, protect } from '../controllers/auth';

const router = express.Router();

router.route('/').post(createUser).get(protect, getAllUser);

router.route('/:id').delete(deleteUser).get(getUser);

router.route('/login').post(login);

export default router;
