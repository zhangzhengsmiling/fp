
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

class Task {
  __value: any;
  __resolve = (data: any) => data;
  constructor(resolver: any) {
    this.__value = resolver
  }

  static of(resolver: any) {
    return new Task(resolver);
  }

  map(fn: Mapper<any, any>) {
    this.__resolve = compose(fn, this.__resolve)
  }

}

const mockResolve = (callback: any) => {
  setTimeout(() => {
    const rand = Math.round(Math.random() * 1000);
    if (rand & 1) {
      return callback(new Error('奇数：' + rand));
    } else {
      return callback(rand)
    }
  }, 1000)
}

mockResolve((error: Error, data: number) => {
  if(error) return console.log(error);
  console.log(data)
})

// Task.of()

// new Promise((resolve, reject) => {
//   fs.readFile('filename', (error, data) => {
//     if (error) return reject(error);
//     return resolve(data)
//   })
// })
// .then(data => {
//   return data.filter(t => t.name === 'asdf')
// })


// --------------------------------- BASE -----------------------------------

const add = (num1: number, num2: number) => (num: number) => num1 + num2 + num;

const fn = (value: number): number | null => {
  if (value < 100) return null;
  else return value;
};

interface Addr {
  province?: string;
  city?: string;
}

interface User {
  name: string;
  age: number;
  addr: Addr | null;
}

const user: User = {
  name: 'zhangzhengsmiling',
  age: 18,
  addr: {
    province: 'ZheJiang',
    city: 'TaiZhou',
  },
};

const io = IO.of(200).map(add(100, 200))
  .map(tap(console.log))
  .map(add(230, 23))
  .map(tap(console.log));

io.__value();

const toUpperCase = (str: string) => str.toUpperCase();

Maybe.of(null as any).map(toUpperCase)
  .map(tap(console.log))
