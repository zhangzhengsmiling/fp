const alt = (f: Function, g:Function) => (v: any) => {
  return f(v) || g(v);
}

export default alt;