export class Skill {
  constructor(
    id,
    name,
    type,
    appliedStat,
    skillValue,
    duration,
    maxUses,
    description
  ) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._appliedStat = appliedStat;
    this._skillValue = skillValue;
    this._duration = duration;
    this._maxUses = maxUses;
    this._description = description;
  }

  get id() {
    return this_id;
  }
  set id(value) {
    this_id = value;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get type() {
    return this._type;
  }

  get appliedStat() {
    return this._appliedStat;
  }

  get skillValue() {
    return this._skillValue;
  }
  set skillValue(value) {
    this._skillValue = value;
  }

  get duration() {
    return this._duration;
  }
  set duration(value) {
    this._duration = value;
  }

  get maxUses() {
    return this._maxUses;
  }
  set maxUses(value) {
    this._maxUses = value;
  }

  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }

  execute(caster, target) {
    throw new Error('execute() must be implemented');
  }
}
