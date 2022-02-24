import { FunctionType } from './../types.d';
import compose from '../modules/compose';

class IO {
  __value: FunctionType;
  constructor(f: FunctionType) {
    this.__value = f;
  }
  static of<T>(v: T) {
    return new IO(function() {
      return v;
    }); 
  }
  map(f: FunctionType) {
    return new IO(compose(f, this.__value));
  }
}

export default IO;