import { Mapper } from 'src/types';

type TapType = <T>(f: Mapper<T, void>) => (v: T) => T

const tap: TapType = (f) => (v) => {
  f(v);
  return v;
};

export default tap;
