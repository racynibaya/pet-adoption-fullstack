import express from 'express';

import { protect } from '../controllers/auth.controller';

import { createPet, addFavoriteToUser } from '../controllers/pet.controller';

const router = express.Router();

router.route('/').post(createPet);

router.route('/:id').patch(protect, addFavoriteToUser);

export default router;
