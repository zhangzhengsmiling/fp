import { Mapper } from "src/types";

const alt = <InputType, F, G>(f: Mapper<InputType, F>, g: Mapper<InputType, G>) => 
  (v: InputType): F | G => {
    return f(v) || g(v);
  };

export default alt;