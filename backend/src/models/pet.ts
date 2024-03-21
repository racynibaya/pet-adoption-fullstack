import mongoose, { Document, Model } from 'mongoose';

interface IPet extends Document {
  name: string;
  species: string;
  breed?: string;
  color?: string;
  gender: 'M' | 'F';
  age?: number;
  traits: string[];
  description?: string;
}
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
