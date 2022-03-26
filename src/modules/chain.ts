// import { FunctionType } from './../types.d';
// import compose from "./compose";
// import flatMap from "./flatMap";
// import map from './map';

// const chain = (f: any) => (v: any) => {
//   return compose(flatMap as FunctionType, map(f) as FunctionType)(v)
// };

const chain = (f: any) => (m: {flatMap: any; map: any;}) => {
  return m.map(f).flatMap();
};

export default chain;
