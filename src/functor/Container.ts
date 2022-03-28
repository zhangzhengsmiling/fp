import {  Mapper } from './../types.d';

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

  ap(container: Container<any>) {
    return container.map(this.__value as any)
  }

}


export default Container;