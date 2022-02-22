
const pipe = (...fns: Function[]) => {
  return (trigger: any) => {
    return fns.reduce((temp, fn) => fn(temp), trigger);
  }
}

export default pipe
