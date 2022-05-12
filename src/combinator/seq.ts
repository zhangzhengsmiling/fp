import { Mapper } from 'src/types';

type SeqType = <InputType>(...fns: Mapper<InputType, unknown>[]) => (v: InputType) => void

const seq: SeqType = (...fns) => (v) => fns.forEach(fn => fn(v))

export default seq;
