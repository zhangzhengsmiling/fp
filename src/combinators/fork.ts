const fork = (f: Function, g: Function, combine: Function) => (v: any) => {
  return combine(f(v), (v));
}

export default fork;