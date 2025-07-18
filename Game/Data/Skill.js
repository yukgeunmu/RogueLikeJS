import chalk from 'chalk';
import { skillStrategies } from '../SkillList/SkillStrategies.js';



// 스킬 클래스 스킬에 기본적인 설정을 담당
export class Skill {
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._type = data.type;
    this._classType = data.classType;
    this._baseValue = data.baseValue;
    this._stageCoefficient = data.stageCoefficient;
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

  get stageCoefficient(){
    return this._stageCoefficient;
  }

  // 스킬 데미지와 버프, 디버프 계산 메서드 스테이지 오를 수록 증가
  calculateValue(stage) {
    return this.baseValue + this._stageCoefficient * (stage - 1);
  }

  // 스킬 사용 메서드
  useSkill(caster, target, stage, monsters) {
    if (this.maxUses <= 0) return chalk.red(`사용횟수를 초과하였습니다.`);

    let log = this.usingSkill.execute(caster, target, this, stage, monsters);
    this.maxUses--;

    return log;
  }

  // 스킬 설명 출력
  getEffectDescription(stage){
    return this.usingSkill.getEffectDescription(this, stage)
  }

  // 스킬 턴수와 최대 사용 초기화 메서드
  Init() {
    this.duration = this.InitDuration;
    this.maxUses = this.InitMaxUses;
  }
}
