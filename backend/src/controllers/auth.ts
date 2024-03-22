import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 12);

  return hashPassword;
};

export const checkPassword = async (
  plainPassword: string,
  hashPass: string
) => {
  const result = await bcrypt.compare(plainPassword, hashPass);
  return result;
};
