
const chain = (f: any) => (m: {flatMap: any; map: any;}) => {
  return m.map(f).flatMap();
};

export default chain;
