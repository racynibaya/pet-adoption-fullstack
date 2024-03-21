import mongoose, { Document, Types } from 'mongoose';

interface IBook extends Document {
  user: Types.ObjectId;
  pet: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;