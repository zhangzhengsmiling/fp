/* eslint-disable */
import { Mapper } from 'src/types';

const chain = (f: Mapper<unknown, unknown>) => (m: {flatten: () => unknown; map: any;}) => {
  return m.map(f).flatten();
};

export default chain;
