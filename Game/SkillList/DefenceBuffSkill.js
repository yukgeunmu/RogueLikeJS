import chalk from 'chalk';
import { SkillStrategy } from './SkillStrategy.js';


// 플레이어 방어 버프 스킬
export class DefenceBuffSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const value = skillData.calculateValue(stage);
    skillData.appliedValue = value; // Store the calculated value

    if (!caster.buffs.includes(skillData)) {
      caster.defence += value;
      caster.buffs.push(skillData);
    } else {
      skillData.duration = skillData.InitDuration;
    }

    return chalk.greenBright(`${caster.name}의 방어력이 ${value} 만큼 상승했습니다.`);
  }

  apply(target, skillData) {
    return chalk.gray(`방어 버프가 ${skillData.duration}턴 남았습니다.`);
  }

  remove(target, skillData) {
    target.defence -= skillData.appliedValue;
    return chalk.yellowBright(`방어력 버프가 종료되었습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const value = skillData.calculateValue(stage);

    const script = chalk.greenBright(
      `<${skillData.duration}턴 간 ${value} 증가>`
    );

    return script;
  }
}
