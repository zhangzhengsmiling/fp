import { FunctionType } from 'src/types';
const curry = (fn: FunctionType, len = fn.length) => {
  return (...args: any[]) => {
    if (args.length >= len) {
      return fn(...args);
    }
    return curry((...rest: any[]) => fn(...args, ...rest), len - args.length);
  };
};

export default curry;

