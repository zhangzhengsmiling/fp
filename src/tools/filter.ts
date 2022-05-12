import { Mapper } from '../types';

type FilterType = <T>(fn: Mapper<T, boolean>) => (array: T[]) => T[];

const filter: FilterType = (map) => (v) => v.filter(map);

export default filter;
