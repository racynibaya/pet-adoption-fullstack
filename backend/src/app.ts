import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './routes/user.router';
import petRouter from './routes/pet.router';

import AppError from './utils/app.error';

const app = express();

app.use(express.json());
app.use(cors());

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

app.use((req: Request, res: Response, next: NextFunction) => {
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
  next(new AppError('Something went wrong', 404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: 'Something went wrong', err });
});
export default app;
