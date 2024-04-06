import mongoose, { Model } from 'mongoose';
import IPet from '../types/pet.type';

const petSchema = new mongoose.Schema<IPet>({
  name: {
    type: String,
    minlength: 2,
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

petSchema.index({ name: 1, species: 1 }, { unique: true });

const Pet: Model<IPet> = mongoose.model<IPet>('Pet', petSchema);

export default Pet;
