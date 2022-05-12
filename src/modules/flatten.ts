interface FlattenAble {
  flatten: () => unknown;
}

type FlattenType = (v: FlattenAble) => unknown

const flatten: FlattenType = (v) => v.flatten();

export default flatten;
