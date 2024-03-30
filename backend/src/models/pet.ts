import mongoose, { Model } from 'mongoose';
import { IPet } from '../types';

const petSchema = new mongoose.Schema<IPet>({
  name: {
    type: String,
    min: 2,
    required: [true, 'Please provide name for pet'],
  },
  species: {
    type: String,
    required: [true, 'Species should be determined'],
  },
  breed: {
    type: String,
    default: 'Unspecified',
  },
  color: String,
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: [true, 'Please provide gender'],
  },
  age: Number,
  traits: [{ type: String }],
  description: String,
});

const Pet: Model<IPet> = mongoose.model<IPet>('Pet', petSchema);

export default Pet;
