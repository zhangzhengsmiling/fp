import Container from './Container';
import Either from './Either';
import Maybe from './Maybe';
const { Left, Right } = Either;

type MapFnType = (v: any) => any;

const compose = (...fns: Function[]) => {
  return (trigger: any) => {
    return fns.reduceRight((temp, fn) => fn(temp), trigger)
  }
}

const logger = (v: any) => {
  console.log(v);
  return v;
}
const addTen = (v: number) => v + 10;
const prop = (key: string) => (value: {[key:string]: any}) => value[key];

const maybe = (message: any, f: any) => {
  return (m: Maybe) => {
    return m.isNothing() ? message : f(m.__value)
  }
}

const getNameOfUser = (user: any) => {
  return Maybe.of(user).map(prop('name'))
}


const doSomethingMaybeError = () => {
  const random = Math.round(Math.random() * 1234);
  try {
    const u = random % 2 === 0 ? { name: 'zhangzhengsmiling' } : null;
    return Right.of(u).map(prop('name'))
  } catch {
    return Left.of({ message: 'parser error...' })
  }
}

const res = doSomethingMaybeError()

const post = {
  title: 'TITLE',
  timestamp: new Date().valueOf(),
  author: 'zz',
}

const split = (s: string) => s.split('')
const join = (seperator: string) => (data: string[]) => data.join(seperator)

// const postIO = IO.of(null);

// const parseTitle = (post: IO) => {
//   return post.map(compose(
//     join('-'),
//     split,
//     (s: string) => s.toLocaleLowerCase(),
//     prop('title'),
//     Maybe.of
//   ))
// }

// const v = parseTitle(postIO).__value()
// console.log(v, 168)

// 练习 3
// ==========
// 使用 safeProp 和 _.head 找到 user 的名字的首字母
var safeProp = (key: string) => {
  return (o: any) => Maybe.of(o[key]);
}

var user = { id: 2, name: "Albert" };
const head = (s: string) => {
  return s[0]
}

const map = (f: any) => (functor: any) => {
  return functor.map(f)
}

var ex3 = compose(
  maybe({message: 'error'}, head),
  map(compose(head, logger, safeProp('name'))),
  Maybe.of
)
console.log(ex3(user))
