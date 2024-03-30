import express, { Request, Response } from 'express';
import Pet from '../models/pet';

const router = express.Router();

router.route('/').post(async (req: Request, res: Response) => {
  const { name, species, breed, color, gender, traits, description } = req.body;
  const pet = await Pet.create({
    name,
    species,
    breed,
    color,
    gender,
    traits,
    description,
  });

  res.status(201).json({
    message: 'created',
    pet,
  });
});

export default router;
