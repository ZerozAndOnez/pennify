import { MD5 } from 'crypto-js';

export const hash = (value: string): string => {
  return MD5(value.trim().toLowerCase()).toString();
};
