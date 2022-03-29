import { isMapperFunction } from './../utils/isMapperFunction';
import { Mapper } from './../types.d';
import { Maybe } from '.';

class Left<T> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }

  static of<T>(value: T) {
    return new Left(value);
  }

  map<RetType>(fn: Mapper<T, RetType>) {
    return this;
  }

  flatten() {
    return this.__value;
  }
  ap<InputType>(container: Left<InputType>) {
    if (!isMapperFunction(this.__value)) return Maybe.of(null);
    return container.map(this.__value);
  }
}

class Right<T> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }

  static of<T>(value: T) {
    return new Right(value);
  }

  map<RetType>(fn: Mapper<T, RetType>) {
    return Right.of(fn(this.__value));
  }

  flatten() {
    return this.__value;
  }

  ap<InputType>(container: Right<InputType>) {
    if (!isMapperFunction(this.__value)) return Maybe.of(null);
    return container.map(this.__value);
  }
}

export const either = <T>(f: Mapper<T, any>, g: Mapper<T, any>, e: Left<T> | Right<T>) => {
  switch(e.constructor) {
    case Left:
      return f(e.__value);
    case Right:
      return g(e.__value);
  }
};

export default {
  Left,
  Right,
};