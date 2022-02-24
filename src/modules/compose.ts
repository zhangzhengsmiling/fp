import { FunctionType } from './../types.d';

const compose = (...fns: FunctionType[]) => {
  return (trigger: any) => {
    return fns.reduceRight((temp, fn) => fn(temp), trigger);
  };
};

export default compose;
