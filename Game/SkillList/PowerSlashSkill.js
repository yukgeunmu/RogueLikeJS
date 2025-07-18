import { SkillStrategy } from './SkillStrategy.js';
import chalk from 'chalk';


// 플레이어 파워 슬래시 스킬
export class PowerSlashSkill extends SkillStrategy {
  execute(caster, target, skillData, stage) {
    const damage = skillData.calculateValue(stage);
    target.hp -= damage;
    return chalk.green(`${target.name}이 ${damage}의 데미지를 받았습니다.`);
  }

  getEffectDescription(skillData, stage) {
    const value = skillData.calculateValue(stage);

    const script = chalk.greenBright(`<${value} 데미지>`);

    return script;
  }
}
