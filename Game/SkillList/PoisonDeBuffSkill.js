import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

export class PoisonDeBuffSkill extends SkillStrategy {
  execute(caster, target, skillData) {
    return chalk.green(
      `${target.name}이 독에 감염 되었습니다.`
    );
  }

  remove(target, skillData) {}

  apply(target, skillData) {
    target.hp -= skillData.baseValue;
    return chalk.green(
      `${target.name}이 ${skillData.baseValue} 독 데미지를 받았습니다.`
    );
  }
}
