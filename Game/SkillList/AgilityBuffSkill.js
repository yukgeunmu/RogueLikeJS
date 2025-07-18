import chalk from 'chalk';
import { SkillStrategy } from './SkillStrategy.js';


// 민첩 증가 버프 스킬
export class AgilityBuffSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const value = skillData.calculateValue(stage);
    skillData.appliedValue = value; // Store the calculated value

    if (!caster.buffs.includes(skillData)) {
      caster.agility += value;
      caster.buffs.push(skillData);
    } else {
      skillData.duration = skillData.InitDuration;
    }

    return chalk.yellow(`${caster.name}의 민첩이 ${value}만큼 증가합니다.`);
  }

  apply(target, skillData) {
    return chalk.redBright(`민첩 버프가 ${skillData.duration}턴 남았습니다.`);
  }

  remove(target, skillData) {
    target.agility -= skillData.appliedValue;
    return chalk.green(`민첩 버프가 종료되었습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const value = skillData.calculateValue(stage);

    const script = chalk(`<${skillData.duration}턴 간 ${value} 증가>`);

    return script;
  }
}
