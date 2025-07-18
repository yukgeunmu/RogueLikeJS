import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

// 플레이어 스몰힐 스킬
export class SmallHealSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const value = skillData.calculateValue(stage);
    target.hp += value;
    return chalk.blue(`${target.name}의 체력이 ${value}만큼 회복되었습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const value = skillData.calculateValue(stage);

    const script = chalk.greenBright(`<${value} 체력 회복>`);
    
    return script;
  }
}
