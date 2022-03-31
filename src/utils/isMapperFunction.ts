import { Mapper } from '../types';

export const isMapperFunction = 
  // eslint-disable-next-line
  (fn: any): fn is Mapper<Parameters<typeof fn>[0], ReturnType<typeof fn>> => {
    return typeof fn === 'function';
  };
