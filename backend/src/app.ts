import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRouter from './routes/user.router';
import petRouter from './routes/pet.router';
import bookRouter from './routes/book.router';

import globalErrorHandler from './controllers/error.controller';
import AppError from './utils/app.error';

import { rateLimit } from 'express-rate-limit';

import mongoSantize from 'express-mongo-sanitize';

import helmet from 'helmet';

dotenv.config();
const app = express();

// Se
app.use(helmet());

// Body parser, reading data from req.body
app.use(express.json({ limit: '10kb' }));
app.use(cors());

// Data sanitization against NOSql injection
app.use(mongoSantize());

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(process.env.NODE_ENV);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server');
});

app.get('/health', (req: Request, res: Response) => {
  res.send('Healthy');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/books', bookRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`You're trying to access a route that doesn't exist`, 404));
});

app.use(globalErrorHandler);
export default app;
