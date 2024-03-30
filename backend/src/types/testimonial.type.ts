import { Types, Document } from 'mongoose';

export default interface ITestimonial extends Document {
  user: Types.ObjectId;
  pet: Types.ObjectId;
  createdAt: Date;
  udpatedAt: Date;
}
