import { FunctionType } from './../types.d';
class Left <T = any>{
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }

  static of<T = any>(value: T) {
    return new Left(value);
  }

  map(f: FunctionType) {
    return this;
  }
}

class Right<T = any> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }
  static of<T = any>(value: T) {
    return new Right(value);
  }
  map(f: FunctionType) {
    return Right.of(f(this.__value));
  }
}

export const either = (f: FunctionType, g: FunctionType, e: Left | Right) => {
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