class Maybe {
  __value: any;
  constructor(value: any) {
    this.__value = value;
  }

  static of(value: any) {
    return new Maybe(value);
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  map(f: Function) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }
}

export const maybe = (msg: any, f: Function, m: Maybe) => {
  return m.isNothing() ? msg : f(m.__value);
}

export default Maybe;