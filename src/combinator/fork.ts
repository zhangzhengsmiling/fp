import { Mapper, FnType } from "src/types";
const fork =
  <InputType, P, Q, RetType>( combine: FnType<[P, Q], RetType>, p: Mapper<InputType, P>, q: Mapper<InputType, Q>) => 
    (v: InputType) => combine(p(v), q(v));

export default fork;