import { FunctionType } from './../types.d';
import { compose } from '../modules';
import { identity } from '../combinator';
class Task {
  __value: any;
  resolve: any = identity;
  reject: any = identity;
  constructor(task: FunctionType) {
    this.__value = task;
  }

  static of (task: any) {
    return new Task(task);
  }

  map(f: FunctionType) {
    this.resolve = compose(f, this.resolve);
    return this;
  }

  fail(f: FunctionType) {
    this.reject = compose(f, this.reject);
    return this;
  }

  execute() {
    return this.__value(this.resolve, this.reject);
  }

  flatMap() {
    return this.__value();
  }
}

export default Task;
