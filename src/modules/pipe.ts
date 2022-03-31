import { FunctionType } from './../types.d';

const pipe = <InputType>(...fns: FunctionType[]) => {
  return (trigger: InputType) => {
    return fns.reduce((temp, fn) => fn(temp), trigger);
  };
};

export default pipe;
