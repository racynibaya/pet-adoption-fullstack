import { Types, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  confirmPassword?: string;
  role: 'admin' | 'user';
  favorites: [Types.ObjectId];
  //   testimonials: [Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
  correctPassword: (
    candidatePassword: string,
    hashPassword: string
  ) => Promise<boolean>;
  changePasswordAfter: (JWTTimestamp: number) => boolean;
  passwordChangedAt: Date;
}

export default IUser;
