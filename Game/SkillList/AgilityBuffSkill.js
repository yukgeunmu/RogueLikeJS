import chalk from 'chalk';
import { SkillStrategy } from './SkillStrategy.js';

export class AgilityBuffSkill extends SkillStrategy {
  execute(caster, target, skillData) {
    if (caster.buffs.length !== 0) {
      for (let i = caster.buffs.length - 1; i >= 0; i--) {
        if (caster.buffs[i].classType === skillData.classType) {
          caster.buffs[i].duration = skillData.InitDuration;
          return chalk.green(
            `${caster.name}의 민첩이 ${skillData.baseValue} 만큼 상승했습니다.`
          );
        } else {
          caster.agility += skillData.baseValue;
          caster.buffs.push(skillData);
          return chalk.green(
            `${caster.name}의 민첩이 ${skillData.baseValue} 만큼 상승했습니다.`
          );
        }
      }
    } else {
      caster.agility += skillData.baseValue;
      caster.buffs.push(skillData);
      return chalk.green(
        `${caster.name}의 민첩이 ${skillData.baseValue} 만큼 상승했습니다.`
      );
    }
  }

  remove(target, skillData) {
    target.agility -= skillData.baseValue;
    return chalk.green(`민첩 버프가 종료되었습니다.`);
  }
}
