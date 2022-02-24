import { FunctionType } from "src/types";
const fork =
  <T = any>(f: FunctionType, g: FunctionType, combine: FunctionType) => 
  (v: T) => combine(f(v), g(v));

export default fork;