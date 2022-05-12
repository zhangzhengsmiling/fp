import { FunctionType } from './../types.d';

type PipType = <InputType>(...fns: FunctionType[]) => (trigger: InputType) => unknown

const pipe: PipType = (...fns) => {
  return (trigger) => {
    return fns.reduce((temp, fn) => fn(temp), trigger);
  };
};

export default pipe;
