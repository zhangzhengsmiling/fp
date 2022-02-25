import { FunctionType } from './../types.d';
const map = (f: FunctionType) => (o: {map: FunctionType}) => {
  return o.map(f);
};

export default map;