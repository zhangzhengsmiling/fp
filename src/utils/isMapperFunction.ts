import { Mapper } from '../types';

export const isMapperFunction = (fn: any): fn is Mapper<Parameters<typeof fn>[0], ReturnType<typeof fn>> => {
  return typeof fn === 'function';
};
