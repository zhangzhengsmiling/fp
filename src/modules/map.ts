import { Mapper } from './../types.d';

interface MappAble {
  map: Mapper<unknown, unknown>
}

type MapType = (map: Mapper<unknown, unknown>) => (o: MappAble) => unknown

const map: MapType = (f) => (o) => o.map(f);

export default map;
