import { FunctionType } from './../types.d';
const seq = <T = any>(...fns: FunctionType[]) => (v: T) => {
  fns.forEach(fn => fn(v));
};

export default seq;