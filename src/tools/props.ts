
type PropsType = <T>(key: keyof T) => (o: T) => T[keyof T];

const props: PropsType = (key) => (o) => o[key];

export default props;
