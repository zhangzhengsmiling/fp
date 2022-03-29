import { isMapperFunction } from './../utils/isMapperFunction';
import {  Mapper } from './../types';
import { Maybe } from '.';
class Container<T> {
  __value: T;
  static of<T>(value: T) {
    return new Container(value);
  }

  constructor(value: T) {
    this.__value = value;
  }

  map<RetType>(fn: Mapper<T, RetType>) {
    return Container.of<RetType>(fn(this.__value));
  }

  flatten() {
    return this.__value;
  }

  ap<InputType>(container: Container<InputType>) {
    if (!isMapperFunction(this.__value)) return Maybe.of(null);
    return container.map(this.__value);
  }

}

export default Container;