import { Mapper } from './../types.d';
import { compose } from '../modules';
import { identity } from '../combinator';
class Task<T> {
  __value: (resolve: Mapper<T, any>, reject: Mapper<Error, any>) => any;
  resolve = identity;
  reject = identity;
  constructor(fn: (resolve: Mapper<T, any>, reject: Mapper<Error, any>) => any, resolve = identity, reject = identity) {
    this.__value = fn;
    this.reject = reject;
    this.resolve = resolve;
  }

  static of<T>(fn: (resolve: Mapper<T, any>, reject: Mapper<Error, any>) => any) {
    return new Task<T>(fn);
  }

  map(fn: Mapper<any, any>) {
    return new Task(this.__value, compose<any, any>(fn,this.resolve), this.reject);
  }

  fail(fn: Mapper<any, any>) {
    return new Task(this.__value, this.resolve, compose<any, any>(fn, this.reject));
  }

  fork() {
    return this.__value(this.resolve, this.reject);
  }
}

export default Task;
