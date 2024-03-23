import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

import { encryptPassword } from '../controllers/auth';

import IUser from '../types/userType';

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    min: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //   This only works on CREATE and SAVE!!!
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await encryptPassword(this.password);
  this.confirmPassword = '';
  next();
});

userSchema.pre<IUser>('findOneAndUpdate', function (next) {
  this.updatedAt = new Date();
  next();
});

userSchema.pre<IUser>(/^find/, function (next) {
  this.populate('favorites');

  next();
});

userSchema.methods.correctPassword = async function (
  plainPassword: string,
  hashPass: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashPass);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
