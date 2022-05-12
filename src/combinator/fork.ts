import { Mapper, FnType } from "src/types";

type ForkType = <InputType, P, Q, RetType>
  (combine: FnType<[P, Q], RetType>, p: Mapper<InputType, P>, q: Mapper<InputType, Q>)
  => (v: InputType)
  => RetType;

const fork: ForkType = (combine, p, q) => (v) => combine(p(v), q(v));

export default fork;
