import { FunctionType } from './../types.d';
const curry = function (f: FunctionType, len = f.length) {
  return function (...args: any[]) {
    if (len <= args.length) {
      return f(...args);
    }
    return curry(
      (...rest: any[]) => f(...args, ...rest),
      len - args.length
    );
  };
};

export default curry;

