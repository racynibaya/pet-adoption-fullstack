import { Types, Document } from 'mongoose';

export default interface IBook extends Document {
  user: Types.ObjectId;
  pet: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
