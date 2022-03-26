import { FunctionType } from './../types.d';
class Container<T> {
  __value: T;

  constructor(value: T) {
    this.__value = value;
  }
  static of<T = any>(value: T) {
    return new Container(value);
  }

  map(fn: FunctionType) {
    return Container.of(fn(this.__value));
  }

  flatMap() {
    return this.__value;
  }

  ap(c: Container<T>) {
    return c.map(this.__value as any);
  }
}

export default Container;