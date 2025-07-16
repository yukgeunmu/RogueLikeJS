import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

export class SmallHealSkill extends SkillStrategy {
  execute(caster, target, skillData) {
    caster.hp += skillData.baseValue;
    return chalk.green(`${caster.name}의 체력이 ${skillData.baseValue} 회복했습니다.`);
  }
}
