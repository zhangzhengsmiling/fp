import { Mapper } from './../types.d';
import compose from '../modules/compose';

class IO<T> {
  __value: () => T;
  constructor(value: () => T) {
    this.__value = value;
  }

  static of<T>(value: T) {
    return new IO(() => value);
  }

  map<RetType>(fn: Mapper<T, RetType>) {
    return new IO<RetType>(compose(fn, this.__value));
  }

  flatten() {
    return this.__value();
  }

  ap(container: IO<any>) {
    return container.map(this.__value() as any)
  }
}

export default IO;