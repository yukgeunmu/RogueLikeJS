import chalk from 'chalk';
import { SkillStrategy } from './SkillStrategy.js';

export class AgilityBuffSkill extends SkillStrategy {
  execute(caster, target, skillData) {
    caster.agility += skillData.baseValue;
    return chalk.green(
      `${caster.name}의 민첩이 ${skillData.baseValue} 만큼 상승했습니다.`
    );
  }

  remove(target, skillData) {
    target.agility -= skillData.baseValue;
    return chalk.green(`민첩 버프가 종료되었습니다.`);
  }
}
