import mongoose from 'mongoose';
import { IBook } from '../types';

// This schema is to book a visit a pet
const bookSchema = new mongoose.Schema<IBook>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.pre<IBook>('findOneAndUpdate', function (this: IBook, next) {
  this.updatedAt = new Date();
  next();
});

bookSchema.pre<IBook>(/^find/, async function (next) {
  const doc = await this.populate('user');
  doc.populate('pet');
  next();
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
