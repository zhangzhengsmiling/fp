import curry from '../curry';
const map = (fn: (v: any) => any, array: any[]) => array.map(fn)
export default curry(map);
