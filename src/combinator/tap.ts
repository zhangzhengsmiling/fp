import { Mapper } from 'src/types';
const tap = <T>(f: Mapper<T, void>) => (v: T) => {
  f(v);
  return v;
};

export default tap;