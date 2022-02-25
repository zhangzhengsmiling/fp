type FunctionType = (...args: unknown[]) => unknown;

const compose = (...fns: FunctionType[]) => {
  return (trigger: any) => {
    return fns.reduceRight((temp, fn) => fn(temp), trigger);
  };
};

const identity = <T = any>(v: T) => v;

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
    return this.__value(this.resolve, this.reject)
  }

  flatMap() {
    return this.__value();
  }
}

const task = Task.of((resolve: any, reject:any) => {
  console.log('start loading...')
  setTimeout(() => {
    return resolve(1234)
  }, 1234)
})
.map((v: any) => {
  console.log(v)
  console.log('end loading....')
  return v;
})
.fail((e: any) => {
  console.log('error', e)
})



console.log(task.execute())