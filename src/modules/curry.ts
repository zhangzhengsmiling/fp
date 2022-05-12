/* eslint-disable */
import { FunctionType } from 'src/types';

type Tail<T extends any[]> =
  ((...args: T) => any) extends ((arg1: any, ...tail: infer A) => any) ? A : []

type Length<T extends any[]> = T['length']

type Prepend<E, T extends any[]> =
  ((arg: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T

type Drop<N extends number, T extends any[], I extends any[]=[]> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>,
  1: T
}[Length<I> extends N ? 1 : 0]

type Cast<X, Y> = X extends Y ? X : Y

type CurryFn<P extends any[], R> =
  <T extends any[]>(...args: Cast<T, Partial<P>>) =>
    Drop<Length<T>, P> extends [any, ...any[]]
      ? CurryFn<Drop<Length<T>, P> extends infer DT ? Cast<DT, any[]> : never, R>
      : R

const _curry = (fn: FunctionType, len = fn.length) => {
  return (...args: any[]) => {
    if (args.length >= len) {
      return fn(...args);
    }
    return _curry((...rest: any[]) => fn(...args, ...rest), len - args.length);
  };
};

const curry = (fn: FunctionType) => _curry(fn, fn.length);

export default curry as <FnType extends (...args: any[]) => any>(fn: FnType) => CurryFn<Parameters<FnType>, ReturnType<FnType>>;
