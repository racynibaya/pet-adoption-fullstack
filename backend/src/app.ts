import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './routes/userRouter';
import petRouter from './routes/petRouter';

const app = express();

app.use(express.json());
app.use(cors());

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server');
});

app.get('/health', (req: Request, res: Response) => {
  res.send('Hello from the server');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/pets', petRouter);

export default app;
