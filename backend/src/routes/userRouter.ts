import express from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
} from '../controllers/userController';
import { login } from '../controllers/auth';

const router = express.Router();

router.route('/').post(createUser).get(getAllUser);

router.route('/:id').delete(deleteUser).get(getUser);

router.route('/login').post(login);

export default router;
