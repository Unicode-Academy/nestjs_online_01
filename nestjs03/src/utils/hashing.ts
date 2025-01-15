import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, saltOrRounds);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
