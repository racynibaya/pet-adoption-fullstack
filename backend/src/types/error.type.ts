interface IError {
  status: string;
  isOperational: string;
  message: string;
  statusCode: number;
  stack: Error;
}

export default IError;
