import chalk from 'chalk';
import { SkillStrategy } from './SkillStrategy.js';

export class DefenceBuffSkill extends SkillStrategy {
  execute(caster, target, skillData) {
    caster.defence += skillData.baseValue;
    return chalk.green(
      `${caster.name}의 방어력이 ${skillData.baseValue} 만큼 상승했습니다.`
    );
  }

  remove(target, skillData) {
    target.defence -= skillData.baseValue;
    return chalk.green(`방어력 버프가 종료되었습니다.`);
  }
}
