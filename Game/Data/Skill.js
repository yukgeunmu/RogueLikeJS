import chalk from 'chalk';
import { skillStrategies } from '../SkillList/SkillStrategies.js';

export class Skill {
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._type = data.type;
    this._classType = data.classType;
    this._baseValue = data.baseValue;
    this._duration = data.duration;
    this._maxUses = data.maxUses;
    this._description = data.description;
    this.InitDuration = data.duration;
    this.InitMaxUses = data.maxUses;

    const SkillClass = skillStrategies[this._classType];

    if (!SkillClass) {
      console.error(
        `Error: Unknown strategy type for skill ${this._name}: ${this._classType}`
      );
    } else {
      this.usingSkill = new SkillClass();
    }
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
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

  get classType() {
    return this._classType;
  }

  get baseValue() {
    return this._baseValue;
  }
  set baseValue(value) {
    this._baseValue = value;
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

  useSkill(caster, target) {
    if (this.maxUses <= 0) return chalk.red(`사용횟수를 초과하였습니다.`);

    let log = this.usingSkill.execute(caster, target, this);
    this.maxUses--;

    return log;
  }

  Init() {
    this.duration = this.InitDuration;
    this.maxUses = this.InitMaxUses;
  }
}
