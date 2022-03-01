import { FunctionType } from "src/types";

class Maybe<T = any> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }

  static of<T = any>(value: T) {
    return new Maybe(value);
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  map(f: FunctionType): Maybe {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }

  flatMap() {
    return this.isNothing() ? null : this.__value;
  }

  ap(m: Maybe) {
    return m.map(this.__value as any);
  }
}

export const maybe = <T = any>(msg: T, f: FunctionType, m: Maybe) => {
  return m.isNothing() ? msg : f(m.__value);
};

export default Maybe;