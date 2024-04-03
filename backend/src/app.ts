import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRouter from './routes/user.router';
import petRouter from './routes/pet.router';

import globalErrorHandler from './controllers/error.controller';
import AppError from './utils/app.error';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

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

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`You're trying to access a route that doesn't exist`, 404));
});

app.use(globalErrorHandler);
export default app;
