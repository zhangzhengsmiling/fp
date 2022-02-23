const tap = (f: Function) => (v: any) => {
  f(v);
  return v;
};

export default tap;