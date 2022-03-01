type FunctionType = (...args: any[]) => any;
const curry = function (f: FunctionType, len = f.length) {
  return function (...args: any[]) {
    if (len <= args.length) {
      return f(...args);
    }
    return curry(
      (...rest: any[]) => f(...args, ...rest),
      len - args.length
    );
  };
};

const tap = <T = any>(f: FunctionType) => (v: T) => {
  f(v);
  return v;
};

const compose = (...fns: FunctionType[]) => {
  return (trigger: any) => {
    return fns.reduceRight((temp, fn) => fn(temp), trigger);
  };
};


const identity = <T = any>(v: T) => v;

class Maybe<T = any> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }

  static of<T = any>(value: T) {
    return new Maybe(value);
  }

  isNothing() {
    return this.__value === undefined || this.__value === null;
  }

  map(f: FunctionType): Maybe {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }

  flatMap() {
    return this.isNothing() ? null : this.__value;
  }

  ap(m: Maybe) {
    return m.map(this.__value as any);
  }
}


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
  flatMap() {
    return this.__value();
  }

  ap(io: IO) {
    return io.map(this.__value())
  }
}

class Task {
  __value: any;
  resolve: any = identity;
  reject: any = identity;
  constructor(task: any) {
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
    return this.execute();
  }
}

const map: any = (f: FunctionType) => (o: {map: FunctionType}) => {
  return o.map(f);
};


const flatMap: any = (v: {flatMap: any}) => v.flatMap();

const maybe = curry((msg: any, f: FunctionType, m: Maybe) => {
  // console.log(m.isNothing(), msg)
  return m.isNothing() ? msg : f(m.__value);
});


const safeProp: any = curry(function (x: any, o: any) { return Maybe.of(o[x]); });
var user = {
  id: 2,
  name: "albert",
  address: {
    street: {
      number: 22,
      name: 'Walnut St'
    }
  }
};

var ex1 = compose(
  safeProp('name'),
  flatMap,
  safeProp('street'),
  flatMap,
  safeProp('address')
)

// console.log(ex1(user))


const fileName = 'this is filename';


var getFile = function() {
  return new IO(function(){ return fileName; });
}

var pureLog = function(x: any) {
  return new IO(function(){
    // console.log(x);
    return 'logged ' + x;
  });
}

const ex2: any = getFile()
  .map(pureLog)
  .map(flatMap)
  .map(tap(console.log))

  // ex2.__value()


// @TODO: 有问题的Task
// 练习 3
// ==========
// 使用 getPost() 然后以 post 的 id 调用 getComments()
var getPost = function(i:any) {
  return Task.of(function (resolve: any) {
    setTimeout(function () {
      resolve({ id: i, title: 'Love them tasks' });
    }, 300);
  });
}

var getComments = function(i: any) {
  return Task.of(function (resolve: any) {
    setTimeout(function () {
      resolve([
        {post_id: i, body: "This book should be illegal"},
        {post_id: i, body: "Monads are like smelly shallots"}
      ]);
    }, 300);
  });
}


var ex3 = getPost(1)
  .map((data: any) => data.id)
  .map(getComments)
  .map(tap(console.log))

// ex3.execute()


class Container<T> {
  __value: T;

  constructor(value: T) {
    this.__value = value;
  }
  static of<T = any>(value: T) {
    return new Container(value);
  }

  map(fn: FunctionType) {
    return Container.of(fn(this.__value));
  }

  flatMap() {
    return this.__value;
  }

  ap(c: Container<T>) {
    return c.map(this.__value as any)
  }

}

const add = curry((a: number, b: number) => a + b);


// partial apply
const v = Container.of(100).map(add).ap(Container.of(20))
  // .map(tap(console.log))

// console.log(Container.of(100).map(add(20)).__value === Container.of(add(20)).ap(Container.of(100)).__value)

// Maybe.of(add)
//   .ap(Maybe.of(100))
//   .ap(Maybe.of(200))
//   .map(tap(console.log))
// const render = curry((a, b, c) => {
//   return (
//     `div ${a}\n` + `div ${b}\n` + `div ${c}\n`
//   )
// })
// const d = Container.of(render)
//   .ap(Container.of(Math.random()) as any)
//   .ap(Container.of(Math.random()))
//   .ap(Maybe.of(null))

//   maybe('====', console.log, d)


  // console.log(d)


const signIn = curry((username: string, password: string) => {
  console.log('username', username);
  console.log('password', password);
  return username === 'zhangzhengsmiling' && password === 'zz';
})

const input = {
  username: 'zhangzheng',
  password: 'aa'
};

const logString = (v: any) => console.log(v.toString())

const inputIO = IO.of(input);

const login = Container.of(add)
  .ap(Container.of(1) as any)
  .ap(Container.of(2))


IO.of(100)
  .map(v => v + 50)
  .map(v => v * 2)
  .map(tap(console.log))
  .__value()

  const add100 = (v: number) => v + 100;

  const io = IO.of(add100)
    .ap(IO.of(10))
  console.log(io.__value())