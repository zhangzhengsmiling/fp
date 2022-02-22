
const compose = (...fns: Function[]) => {
  return (trigger: any) => {
    return fns.reduceRight((temp, fn) => fn(temp), trigger)
  }
}

export default compose;
