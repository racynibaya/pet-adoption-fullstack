import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

import { encryptPassword } from '../controllers/auth.controller';
import IUser from '../types/user.type';

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
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: function (this: IUser) {
      return this.isModified('password');
    },
    validate: {
      //   This only works on CREATE and SAVE!!!
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
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
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (this.password) {
    console.log(this.password);
    this.password = await encryptPassword(this.password);
    this.confirmPassword = undefined;
  }

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

userSchema.methods.changePasswordAfter = function (
  this: IUser,
  JWTTimestamp: number
) {
  if (this.passwordChangedAt) {
    const currentTimeStamp = this.passwordChangedAt.getTime();
    const changedTimestamp = parseInt(`${currentTimeStamp / 1000}`, 10);

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
