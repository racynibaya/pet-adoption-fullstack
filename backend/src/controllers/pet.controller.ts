import { Request, Response } from 'express';

import Pet from '../models/pet';
import IUser from '../types/user.type';

export const createPet = async (req: Request, res: Response) => {
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
};

export const addFavoriteToUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const currentUser = req.user as IUser;

  const pet = await Pet.findOne({ _id: id });
  console.log(pet);

  if (!pet) {
    return res.status(404).json({ message: `Pet does not exist` });
  }

  if (!currentUser) {
    return res.status(403).json({ message: 'You need to login' });
  }

  currentUser.favorites.push(pet._id);
  currentUser.save();

  res.status(200).json({
    status: 'success',
    message: 'Pet is added to this user',
    pet,
  });
};
