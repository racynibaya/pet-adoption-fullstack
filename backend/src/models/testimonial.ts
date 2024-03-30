import mongoose from 'mongoose';
import { ITestimonial } from '../types';

const testimonialSchema = new mongoose.Schema<ITestimonial>({
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
  udpatedAt: {
    type: Date,
    default: Date.now,
  },
});

testimonialSchema.pre<ITestimonial>('save', function (next) {
  this.udpatedAt = new Date();
  next();
});

testimonialSchema.pre<ITestimonial>('findOneAndUpdate', function (next) {
  this.udpatedAt = new Date();
  next();
});

testimonialSchema.pre<ITestimonial>(
  /^find/,
  async function (this: ITestimonial, next) {
    const testimonialPromise = await this.populate({
      path: 'user',
      select: '-__v',
    });
    testimonialPromise.populate({
      path: 'pet',
      select: '-__v',
    });
    next();
  }
);

const Testimonial = mongoose.model<ITestimonial>(
  'Testimonial',
  testimonialSchema
);

export default Testimonial;
