import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';

dotenv.config();

// process.env.NODE_ENV = 'production';
console.log(process.env.NODE_ENV);
const DB_STRING = process.env.DATABASE as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

mongoose
  .connect(DB_STRING.replace('<PASSWORD>', DB_PASSWORD))
  .then(() => console.log('Connected to the database'));

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
