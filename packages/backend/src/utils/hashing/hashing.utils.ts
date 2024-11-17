import * as crypto from 'crypto';

export const hash = (value: string): string => {
  return crypto.createHash('sha256').update(value).digest('hex');
};
