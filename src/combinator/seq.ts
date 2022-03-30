import { Mapper } from 'src/types';

const seq = <InputType>(...fns: Mapper<InputType, unknown>[]) => (v: InputType) => {
  fns.forEach(fn => fn(v));
};

export default seq;