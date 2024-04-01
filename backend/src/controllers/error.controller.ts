import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/app.error';

interface AppErrorType extends Error {
  status: string;
  isOperational: boolean;
  statusCode: number;
  stack: string;
}
interface DuplicateTypeError extends Error {
  index: number;
  code: number;
  keyPattern: { email: number };
  keyValue: { email: string };
}

interface ValidationTypeError extends Error {
  errors: ValidationEmailError | ValidationPasswordError;
}

type ValidationEmailError = {
  email: {
    name: string;
    message: string;
    kind: string;
    path: string;
    value: string;
  };
};

type ValidationPasswordError {}

const validatorErrorDB = (err: ValidationTypeError, res: Response) => {
  console.log(err);
  const { errors } = err;
  const message = `Invalid ${errors.email.path}: ${errors.email.value}`;
  return new AppError(message, 500);
};

const duplicateErrorDB = (err: DuplicateTypeError) => {
  const message = `Duplicate field value: ${err.keyValue.email}. Please use another email`;

  return new AppError(message, 500);
};

const developementError = (err: AppErrorType, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const productionError = (err: AppErrorType, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      error: err,
      message: 'Something went wrong',
      stack: err.stack,
    });
  }
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    let error = JSON.parse(JSON.stringify(err));
    developementError(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = JSON.parse(JSON.stringify(err));
    console.log(error);

    if (error.name === 'ValidationError') {
      error = validatorErrorDB(error, res);
    } else if (error.code === 11000) {
      error = duplicateErrorDB(error);
    }

    productionError(error, res);
  }
};
