import { Mapper } from './../types.d';
import { compose } from '../modules';
import { identity } from '../combinator';
class Task<T> {
  __value: (resolve: Mapper<T, unknown>, reject: Mapper<Error, unknown>) => unknown;
  resolve: Mapper<T, unknown> = identity;
  reject: Mapper<Error, unknown> = (err: Error) => err;
  constructor(fn: (resolve: Mapper<T, unknown>, reject: Mapper<Error, unknown>) => void, resolve: Mapper<T, unknown> = identity, reject: Mapper<Error, unknown> = identity) {
    this.__value = fn;
    this.reject = reject;
    this.resolve = resolve;
  }

  static of<T>(fn: (resolve: Mapper<T, unknown>, reject: Mapper<Error, unknown>) => void) {
    return new Task<T>(fn);
  }

  map(fn: Mapper<unknown, unknown>) {
    return new Task(this.__value, compose<T, ReturnType<typeof fn>>(fn,this.resolve), this.reject);
  }

  fail(fn: Mapper<unknown, unknown>) {
    return new Task(this.__value, this.resolve, compose<Error, ReturnType<typeof fn>>(fn, this.reject));
  }

  fork() {
    return this.__value(this.resolve, this.reject);
  }
}

export default Task;
