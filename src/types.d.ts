export type FunctionType = (...args: any[]) => any;
export type Mapper<T, P> = (value: T) => P;
export type FnType<InputType extends any[], RetType> = (...input: InputType) => RetType;