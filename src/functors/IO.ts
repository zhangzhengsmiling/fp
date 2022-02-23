import compose from '../modules/compose'

class IO {
  __value: any;
  constructor(f: any) {
    this.__value = f;
  }
  static of (f: any) {
    return new IO(function() {
      return f;
    }); 
  }
  map(f: any) {
    return new IO(compose(f, this.__value));
  }
}

export default IO;