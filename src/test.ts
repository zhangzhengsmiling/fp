type Mapper<T, P> = (value: T) => P;
type FnType = (...args: any[]) => any;

const curry = (fn: FnType, len = fn.length) => {
  return (...args: any[]) => {
    if (args.length >= len) {
      return fn(...args);
    }
    return curry((...rest: any[]) => fn(...args, ...rest), len - args.length);
  };
};

const compose = <Param, RetType>(...fns: any[]) => {
  return (trigger?: Param) => {
    return fns.reduceRight((prev, fn) => {
      return fn(prev);
    }, trigger) as RetType;
  };
};

const pipe = <Param, RetType>(...fns: any[]) => {
  return (trigger?: Param) => {
    return fns.reduce((prev, fn) => {
      return fn(prev);
    }, trigger) as RetType;
  };
};

const tap = <T>(fn: FnType) => {
  return (value: T) => {
    fn(value);
    return value;
  };
};

const fork = <InType ,T, P, RetType>(f: Mapper<InType, T>, g: Mapper<InType, P>, combinator: (v1: T, v2: P) => RetType) => {
  return (value: InType) => {
    return combinator(
      f(value),
      g(value)
    );
  };
};

const identity = <T>(data: T) => data;

const props = <T>(key: keyof T) => {
  return (value: T) => {
    return value[key];
  };
};

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
}

class Maybe<T> {
  __value: T;
  static of<T>(value: T) {
    return new Maybe(value);
  }

  constructor(value: T) {
    this.__value = value;
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  map<RetType>(fn: Mapper<T, RetType>): Maybe<any> {
    return this.isNothing() ? Maybe.of(null) : Maybe.of<RetType>(fn(this.__value));
  }
}

class Left<T> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }

  static of<T>(value: T) {
    return new Left(value);
  }

  map<RetType>(fn: Mapper<T, RetType>) {
    return this;
  }

}

class Right<T> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }

  static of<T>(value: T) {
    return new Right(value);
  }

  map<RetType>(fn: Mapper<T, RetType>) {
    return Right.of(fn(this.__value));
  }
}

class IO<T> {
  __value: () => T;
  constructor(value: () => T) {
    this.__value = value;
  }

  static of<T>(value: T) {
    return new IO(() => value);
  }

  map<RetType>(fn: Mapper<T, RetType>) {
    return new IO<RetType>(compose(fn, this.__value));
  }
}


type ResolveFn<InType, RetType> = (data: InType) => RetType;
type RejectFn<InType, RetType> = (error: InType) => RetType;

class Task<T> {
  __value: (resolve: Mapper<T, any>, reject: Mapper<Error, any>) => any;
  resolve = identity;
  reject = identity;
  constructor(fn: (resolve: Mapper<T, any>, reject: Mapper<Error, any>) => any) {
    this.__value = fn
  }

  static of<T>(fn: (resolve: Mapper<T, any>, reject: Mapper<Error, any>) => any) {
    return new Task<T>(fn);
  }

  map(fn: Mapper<any, any>) {
    this.resolve = compose(fn, this.resolve);
    return this;
  }

  fail(fn: Mapper<any, any>) {
    this.reject = compose(fn, this.reject);
    return this;
  }

  fork() {
    return this.__value(this.resolve, this.reject)
  }
}

// --------------------------------- BASE -----------------------------------

const mockResolve = (callback: any) => {
  setTimeout(() => {
    const rand = Math.round(Math.random() * 1000);
    if (rand & 1) {
      return callback(new Error('奇数：' + rand), null);
    } else {
      return callback(null, rand)
    }
  }, 1000)
}

const task = Task.of((resolve: any, reject: any) => {
  return mockResolve((error: Error, data: any) => {
    if (error) return reject(error);
    resolve(data);
  })
})
  .map(tap(console.log))
  .fail(tap(console.log))
  .fork()
