import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';

// 다크나이트 스킬
export class DarkSlashSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const damage = skillData.calculateValue(stage);
    target.hp -= damage;
    return chalk.magenta(`${caster.name}이(가) 어둠의 참격으로 ${target.name}에게 ${damage}의 데미지를 입혔습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const damage = skillData.calculateValue(stage);
    return chalk.magentaBright(`<${damage} 데미지 (방어력 무시)>`);
  }
}
