import AppError from '../utils/app.error';

interface IError extends AppError {
  status: string;
  isOperational: boolean;
  message: string;
  statusCode: number;
}

export default IError;
