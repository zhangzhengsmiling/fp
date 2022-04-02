import { Container } from ".";

export default class SwitchCondition<ConditionType, ResultType> {

  _map: Map<ConditionType, ResultType>;

  constructor(map: Map<ConditionType, ResultType>) {
    this._map = map;
  }

  static of<ConditionType, ResultType>() {
    return new SwitchCondition(new Map<ConditionType, ResultType>());
  }

  case(condition: ConditionType, result: ResultType) {
    const _map = new Map(this._map);
    _map.set(condition, result);
    return new SwitchCondition(_map);
  }

  get(condition: ConditionType): Container<ResultType | undefined> {
    return Container.of(this._map.get(condition));
  }
}
