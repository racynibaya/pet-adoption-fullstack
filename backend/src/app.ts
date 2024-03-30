import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './routes/user.router';
import petRouter from './routes/pet.router';

const app = express();

app.use(express.json());
app.use(cors());

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Something went wrong');
  next(err);
});

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  res.status(500).json({ message: 'Something went wrong', err });
});
export default app;
