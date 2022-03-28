const compose = <Param, RetType>(...fns: any[]) => {
  return (trigger?: Param) => {
    return fns.reduceRight((prev, fn) => {
      return fn(prev);
    }, trigger) as RetType;
  };
};

export default compose;
