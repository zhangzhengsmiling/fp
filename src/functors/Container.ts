class Container {
  __value: any;

  constructor(value: any) {
    this.__value = value;
  }
  static of (value: any) {
    return new Container(value);
  }

  map(fn: (v: any) => any) {
    return Container.of(fn(this.__value));
  }
}

export default Container;