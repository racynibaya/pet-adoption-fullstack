import express from 'express';

import { protect } from '../controllers/auth.controller';

import {
  createPet,
  addFavoriteToUser,
  getAllPets,
  getPetById,
} from '../controllers/pet.controller';

const router = express.Router();

router.route('/').post(createPet).get(getAllPets);

router.route('/:id').get(getPetById).patch(protect, addFavoriteToUser);

export default router;
