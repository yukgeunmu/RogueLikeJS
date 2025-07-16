import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

export class PowerSlashSkill extends SkillStrategy {
  execute(caster, target, skillData) {
    target.hp -= skillData.baseValue;
    return chalk.green(
      `${target.name}이 ${skillData.baseValue}의 데미지를 받았습니다.`
    );
  }
}
