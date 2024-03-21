import bcrypt from 'bcrypt';

import IUser from '../../types/userType';

import User from '../models/user';

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 12);

  return hashPassword;
};

export const decryptPassword = async (
  plainPassword: string,
  hashPass: string
) => {
  const result = await bcrypt.compare(plainPassword, hashPass);
  return result;
};
