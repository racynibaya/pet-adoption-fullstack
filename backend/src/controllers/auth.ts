import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 12);

  return hashPassword;
};
