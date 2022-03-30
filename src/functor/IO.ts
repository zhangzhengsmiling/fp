import { isMapperFunction } from './../utils/isMapperFunction';
import { Mapper } from './../types.d';
import compose from '../modules/compose';
import { Maybe } from '.';

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

  ap<InputType>(container: IO<InputType>) {
    const __value = this.__value();
    if (!isMapperFunction(__value)) return Maybe.of(null);
    return container.map(__value);
  }
}

export default IO;