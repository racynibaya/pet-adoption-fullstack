import { NextFunction, Request, Response } from 'express';

import User from '../models/user';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/app.error';
import { createAndSendToken, signToken } from './auth.controller';

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, confirmPassword, passwordChangedAt } = req.body;
    const user = await User.create({
      email,
      password,
      confirmPassword,
      passwordChangedAt,
    });

    createAndSendToken(user, 200, res);
  }
);

export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let queryObj = { ...req.query };

    // 1. Advance Filtering
    const excludeFields = ['sort', 'page', 'limit', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );

    let query = User.find(JSON.parse(queryString));

    // Sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting fields
    if (req.query.fields) {
      const fields = (req.query.fields as string).split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    // page=1&limit=10, page1: 1-10, page2: 11-20
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numOfUsers = await User.countDocuments();

      if (skip >= numOfUsers) {
        next(new AppError('This page does not exist', 404));
      }
    }

    const users = await query;

    res.status(200).json({
      message: 'success',
      data: {
        users,
      },
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById({ _id: id });

    if (!user) {
      next(new AppError('No existing user', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully get the user',
      user,
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      next(new AppError('No existing user', 404));
    }

    const deleteUser = await User.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      message: 'User sucessfully deleted',
      deleteUser,
    });
  }
);
