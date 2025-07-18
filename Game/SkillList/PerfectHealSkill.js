import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

// 플레이어 풀피 스킬
export class PerfectHealSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    target.hp = target.maxHp;
    return chalk.blue(`${target.name}의 체력이 모두 회복되었습니다.`);
  }

  getEffectDescription(skillData, stage) {
    return chalk.greenBright(`<풀피>`);
  }
}
