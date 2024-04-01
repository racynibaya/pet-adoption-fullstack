import { NextFunction, Request, Response } from 'express';

import Pet from '../models/pet';
import IUser from '../types/user.type';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/app.error';

export const createPet = catchAsync(async (req: Request, res: Response) => {
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

export const addFavoriteToUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const currentUser = req.user as IUser;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return next(new AppError('Pet does not exist', 404));
    }

    if (!currentUser) {
      return next(new AppError('You need to login', 403));
    }

    currentUser.favorites.push(pet._id);
    currentUser.save();

    res.status(200).json({
      status: 'success',
      message: 'Pet is added to this user',
      pet,
    });
  }
);
