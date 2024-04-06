import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/app.error';

import Pet from '../models/pet';
import Book from '../models/book';
import { catchAsync } from '../utils/catchAsync';

export const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { petId } = req.params;
    const currentUser = req.user;

    if (!petId) {
      return next(new AppError('Pet dont exist', 404));
    }

    if (!currentUser) {
      return next(new AppError('User dont exist', 404));
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
      return next(new AppError('Pet dont exist', 404));
    }

    const book = await Book.create({
      user: currentUser._id,
      pet: pet._id,
    });

    res.status(201).json({
      status: 'success',
      data: book,
    });
  }
);

export const getAllBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await Book.find().populate('user').populate('pet');

    if (!books.length) {
      return next(new AppError('No book available', 404));
    }

    res.status(200).json({
      status: 'success',
      data: books,
    });
  }
);
