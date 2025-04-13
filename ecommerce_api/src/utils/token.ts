import * as crypto from 'crypto';

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999);
};

export const generateToken = () => {
  return crypto
    .createHash('md5')
    .update(generateOTP().toString())
    .digest('hex');
};
