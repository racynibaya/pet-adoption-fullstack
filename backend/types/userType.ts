import { Types, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'user';
  favorites: [Types.ObjectId];
  //   testimonials: [Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
