import { FunctionType } from './../types.d';

const pipe = (...fns: FunctionType[]) => {
  return (trigger: any) => {
    return fns.reduce((temp, fn) => fn(temp), trigger);
  };
};

export default pipe;
