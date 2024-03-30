import IUser from '../../src/types/user.type';

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}
