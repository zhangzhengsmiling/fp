const seq = (...fns: Function[]) => (v: any) => {
  fns.forEach(fn => fn(v));
}

export default seq;