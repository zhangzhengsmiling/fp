type FunctionType = (...args: any[]) => any;

const curry = (fn: FunctionType) => {
  return (...args: any[]) => {
    return (...rest: any[]) => {
      return fn(...args, ...rest);
    };
  };
};

export default curry;

