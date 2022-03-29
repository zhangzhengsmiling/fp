import { FunctionType , Mapper } from "src/types";

class Maybe<T> {
  __value: T;
  static of<T>(value: T) {
    return new Maybe(value);
  }

  constructor(value: T) {
    this.__value = value;
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  map<RetType>(fn: Mapper<T, RetType>): Maybe<any> {
    return this.isNothing() ? Maybe.of(null) : Maybe.of<RetType>(fn(this.__value));
  }

  flatten() {
    return this.isNothing() ? null : this.__value;
  }

  ap(container: Maybe<any>) {
    return container.map(this.__value as any);
  }
}

export const maybe = <T = any>(msg: T, f: FunctionType, m: Maybe<T>) => {
  return m.isNothing() ? msg : f(m.__value);
};

export default Maybe;