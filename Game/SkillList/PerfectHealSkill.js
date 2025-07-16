import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

export class PerfectHealSkill extends SkillStrategy {
  execute(caster, target, skillData) {
    target.hp = target.maxHp;
    return chalk.green(`${caster.name}의 체력이 전부 회복했습니다.`);
  }
}
