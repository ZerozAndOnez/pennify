import { hash } from '../../hashing/hashing.utils';

export const getGravatarUrl = (value: string): string => {
  // TODO TODOLuxury move out the api to config
  return `https://www.gravatar.com/avatar/${hash(value ?? '')}?d=identicon`;
};
