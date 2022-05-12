import { Mapper } from 'src/types';

interface FlattenAble {
  flatten: () => unknown;
}

interface MapAble {
  map: Mapper<unknown, FlattenAble>
}

type ChainType = (f: Mapper<unknown, unknown>) => (m: FlattenAble & MapAble) => unknown

const chain: ChainType = (f) => (m) => m.map(f).flatten();

export default chain;
