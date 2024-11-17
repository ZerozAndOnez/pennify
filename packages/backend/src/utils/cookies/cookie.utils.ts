import { Response } from 'express';

interface CookieOptions {
  domain?: string;
  encode?: (val: string) => string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  secure?: boolean;
  signed?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
}

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  options = {
    ...options,
    secure: true,
    // TODO change this to strict in production
    sameSite: 'none',
    httpOnly: options.httpOnly ?? true,
  };
  res.cookie(name, value, options);
};
