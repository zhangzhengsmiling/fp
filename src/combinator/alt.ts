import { FunctionType } from "src/types";

const alt = <T = any>(f: FunctionType, g: FunctionType) => (v: T) => {
  return f(v) || g(v);
};

export default alt;