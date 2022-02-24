import { FunctionType } from './../types.d';
const tap = <T = any>(f: FunctionType) => (v: T) => {
  f(v);
  return v;
};

export default tap;