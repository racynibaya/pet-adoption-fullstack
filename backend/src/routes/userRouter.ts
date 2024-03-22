import express from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
} from '../controllers/userController';

const router = express.Router();

router.route('/').post(createUser).get(getAllUser);

router.route('/:id').delete(deleteUser).get(getUser);

router.route('/login').post();

export default router;
