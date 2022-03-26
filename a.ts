const curry = (fn: any, len = fn.length) => {
  return (...args: any[]) => {
    if (args.length >= len) {
      return fn(...args);
    }
    return curry((...rest: any[]) => fn(...args, ...rest), len - args.length);
  };
};

const compose = (...fns: any[]) => {
  return (trigger?: any) => {
    return fns.reduceRight((prev, fn) => {
      return fn(prev);
    }, trigger);
  };
};

const pipe = (...fns: any[]) => {
  return (trigger?: any) => {
    return fns.reduce((prev, fn) => {
      return fn(prev);
    }, trigger);
  };
};

const tap = (fn: any) => {
  return (value: any) => {
    fn(value);
    return value;
  };
};

const fork = (f: any, g: any, combinator: any) => {
  return (value: any) => {
    return combinator(
      f(value),
      g(value)
    );
  };
};

const prop = (key: any) => {
  return (value: any) => {
    return value[key];
  };
};

class Container {
  __value: any;
  static of(value: any) {
    return new Container(value);
  }

  constructor(value: any) {
    this.__value = value;
  }

  map(fn: any) {
    return Container.of(fn(this.__value));
  }
}

class Maybe {
  __value: any;
  static of(value: any) {
    return new Maybe(value);
  }

  constructor(value: any) {
    this.__value = value;
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  map(fn: any) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.__value));
  }
}

class Left {
  __value: any;
  constructor(value: any) {
    this.__value = value;
  }

  static of(value: any) {
    return new Left(value);
  }

  map(fn: any) {
    return this;
  }

}

class Right {
  __value: any;
  constructor(value: any) {
    this.__value = value;
  }

  static of(value: any) {
    return new Right(value);
  }

  map(fn: any) {
    return Right.of(fn(this.__value));
  }
}

class IO {
  __value: any;
  constructor(value: any) {
    this.__value = value;
  }

  static of(value: any) {
    return new IO(() => value);
  }

  map(fn: any) {
    return new IO(compose(fn, this.__value));
  }
}


// --------------------------------- BASE -----------------------------------
declare const process: any;

const parseJSON = (json: string) => {
  try {
    const obj = JSON.parse(json);
    return Right.of(obj);
  } catch(error) {
    return Left.of({ message: 'parse json error!' })
  }
}

// const res = Container.of('asdf')
//   .map(parseJSON)
//   // .map(prop('name'))
//   // .map(tap(console.log))

// console.log(res)

parseJSON(JSON.stringify({
  name: 'zhangzhengsmiling',
  age: 18,
  hobby: 'coding...'
}))
  .map(prop('name'))
  .map(tap(console.log))

const r = IO.of(process)
  // map需要传入一个函数，函数需要接收一个参数，这个参数就是of中传递的参数process
  // 返回一下process中的execPath属性即当前node进程的执行路径
  .map((p: any) => p.execPath)
console.log(r.__value()) // IO { _value: [Function] }
