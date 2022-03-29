import { FunctionType, Mapper } from './../types.d';

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
  ap(container: Left<any>) {
    return container.map(this.__value as any);
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

  ap(container: Right<any>) {
    return container.map(this.__value as any);
  }
}

export const either = <T>(f: FunctionType, g: FunctionType, e: Left<T> | Right<T>) => {
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