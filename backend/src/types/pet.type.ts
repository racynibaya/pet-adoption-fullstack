import { Document } from 'mongodb';

export default interface IPet extends Document {
  name: string;
  species: string;
  breed?: string;
  color?: string;
  gender: 'M' | 'F';
  age?: number;
  traits: string[];
  description?: string;
}
