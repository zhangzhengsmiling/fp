class Left {
  __value: any;
  constructor(value: any) {
    this.__value = value;
  }

  static of(value: any) {
    return new Left(value)
  }

  map(f: Function) {
    return this;
  }
}

class Right {
  __value: any;
  constructor(value: any) {
    this.__value = value;
  }
  static of(value: any) {
    return new Right(value);
  }
  map(f: Function) {
    return Right.of(f(this.__value));
  }
}

export const either = (f: Function, g: Function, e: Left | Right) => {
  switch(e.constructor) {
    case Left:
      return f(e.__value);
    case Right:
      return g(e.__value);
  }
}

export default {
  Left,
  Right,
}