import IUser from '../../src/types/userType';

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}
